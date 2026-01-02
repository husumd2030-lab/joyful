
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { getGeminiChatResponse, generateArtProject } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Language, translations } from '../translations';

interface ChatBotProps {
  lang: Language;
}

export default function ChatBot({ lang }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'art' | 'voice'>('chat');
  const t = translations[lang].chat;
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [artResult, setArtResult] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Update welcome message on language change
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([{ role: 'model', text: t.welcome }]);
    }
  }, [lang, t.welcome]);

  // Live API Refs
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const activeSessionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, artResult]);

  const cleanupVoice = () => {
    if (activeSessionRef.current) {
      activeSessionRef.current = null;
    }
    sourcesRef.current.forEach(s => {
      try { s.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    setIsListening(false);
    nextStartTimeRef.current = 0;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    if (mode === 'art') {
      const img = await generateArtProject(userMsg);
      if (img) {
        setArtResult(img);
        setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "Here is the art project I imagined for you! 🎨" : "የገመትኩት የጥበብ ፕሮጀክት ይኸው! 🎨" }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "Oh no, my crayons broke! Let's try another idea." : "ውይ፣ የኔ መፃፊያ ተሰበረ! ሌላ ሃሳብ እንሞክር።" }]);
      }
    } else {
      const response = await getGeminiChatResponse(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    }
    setIsLoading(false);
  };

  const startVoiceSession = async () => {
    if (isListening) {
      cleanupVoice();
      return;
    }
    setIsListening(true);
    setMode('voice');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) throw new Error("AudioContext not supported");
      
      const inputCtx = new AudioContextClass({ sampleRate: 16000 });
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });
      inputAudioContextRef.current = inputCtx;
      outputAudioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (!isListening) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const bytes = new Uint8Array(int16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
              
              sessionPromise.then(session => {
                activeSessionRef.current = session;
                session.sendRealtimeInput({ media: { data: btoa(binary), mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64) {
              const binaryString = atob(base64);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
              const dataInt16 = new Int16Array(bytes.buffer);
              const buffer = outputCtx.createBuffer(1, dataInt16.length, 24000);
              const channelData = buffer.getChannelData(0);
              for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;

              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => { console.error("Live error:", e); cleanupVoice(); },
          onclose: () => cleanupVoice()
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: `You are Sunny, a cheerful school mascot for Joyful Kids Care. You are bilingual in Amharic and English. Speak warmly and keep responses helpful for parents.`
        }
      });
    } catch (err) {
      console.error("Voice fail:", err);
      cleanupVoice();
    }
  };

  const handleModeChange = (newMode: 'chat' | 'art' | 'voice') => {
    if (mode === 'voice') cleanupVoice();
    setMode(newMode);
    if (newMode === 'voice') startVoiceSession();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-2xl flex items-center justify-center text-white text-3xl transition-transform hover:scale-110 active:scale-95 border-4 border-white"
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-sun animate-spin-slow"></i>}
      </button>

      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl ${isListening ? 'animate-pulse' : ''}`}>☀️</div>
              <div>
                <h4 className="font-bold text-lg leading-none">{lang === 'en' ? 'Sunny Mascot' : 'ሳኒ ሳን'}</h4>
                <p className="text-xs text-white/80">{mode === 'voice' ? (isListening ? (lang === 'en' ? 'Listening...' : 'እያዳመጥኩ ነው...') : (lang === 'en' ? 'Connecting...' : 'እየተገናኘሁ ነው...')) : (lang === 'en' ? 'Ready to help!' : 'ለመርዳት ዝግጁ ነኝ!')}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleModeChange('chat')} title={t.modeChat} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mode === 'chat' ? 'bg-white text-orange-500' : 'hover:bg-white/20'}`}><i className="fas fa-comment"></i></button>
              <button onClick={() => handleModeChange('art')} title={t.modeArt} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mode === 'art' ? 'bg-white text-orange-500' : 'hover:bg-white/20'}`}><i className="fas fa-palette"></i></button>
              <button onClick={() => handleModeChange('voice')} title={t.modeVoice} className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${mode === 'voice' ? 'bg-white text-orange-500' : 'hover:bg-white/20'}`}><i className="fas fa-microphone"></i></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {artResult && mode === 'art' && (
              <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-lg animate-in zoom-in-95">
                <img src={artResult} alt="Art Project" className="rounded-xl w-full" />
                <button onClick={() => { setArtResult(null); setMessages(prev => [...prev, { role: 'model', text: lang === 'en' ? "What else should we draw?" : "ሌላ ምን እንሳል?" }]) }} className="w-full mt-2 text-blue-500 text-xs font-bold uppercase hover:bg-blue-50 py-2 rounded-lg transition-colors">
                  {lang === 'en' ? 'New Drawing' : 'አዲስ ስዕል'}
                </button>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl flex gap-1"><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div><div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div></div>
              </div>
            )}
            {mode === 'voice' && (
              <div className="flex flex-col items-center justify-center h-32 space-y-4 bg-white/50 rounded-3xl border-2 border-dashed border-orange-200 p-4">
                <div className="flex gap-2">
                   {[...Array(5)].map((_, i) => (
                     <div key={i} className={`w-1 bg-orange-400 rounded-full ${isListening ? 'animate-waveform' : 'h-2'}`} style={{ animationDelay: `${i * 0.1}s`, height: isListening ? 'auto' : '8px' }}></div>
                   ))}
                </div>
                <button onClick={cleanupVoice} className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-red-200 transition-colors">{t.stopVoice}</button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={mode === 'art' ? t.artPlaceholder : t.placeholder}
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button onClick={handleSend} disabled={isLoading || !input.trim()} className="w-10 h-10 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full flex items-center justify-center transition-colors shadow-md disabled:opacity-50">
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
      <style>{`
        .animate-spin-slow { animation: spin 10s linear infinite; } 
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-waveform { animation: waveform 1s ease-in-out infinite; }
        @keyframes waveform { 
          0%, 100% { height: 8px; } 
          50% { height: 24px; } 
        }
      `}</style>
    </div>
  );
}
