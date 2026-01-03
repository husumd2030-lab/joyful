
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "Sunny", the cheerful and wise sun mascot for "Joyful Kids Care School".
Your tone is incredibly friendly, encouraging, and supportive. 
You answer questions for parents about early childhood education, nutrition, play-based learning, and general childcare advice.
You emphasize the school's core values: Safety, Creativity, and Kindness.
If asked about enrollment, tell them to visit our "Admissions" section or click the "Enroll Now" button.
Keep responses concise and easy for busy parents to read.

LANGUAGE SUPPORT:
You are fully bilingual in English and Amharic. 
- If the user speaks in Amharic, respond in Amharic.
- If the user speaks in English, respond in English.
- Use warm, culturally appropriate greetings for both languages.
`;

// Helper for exponential backoff retry logic
const withRetry = async <T>(fn: () => Promise<T>, maxRetries = 3, initialDelay = 1000): Promise<T> => {
  let lastError: any;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      // Retry on 429 (Rate Limit) or 5xx (Server Error)
      const status = error?.status || error?.response?.status;
      const isRetryable = status === 429 || (status >= 500 && status < 600);
      
      if (!isRetryable || attempt === maxRetries - 1) break;
      
      const delay = initialDelay * Math.pow(2, attempt);
      console.warn(`Gemini API attempt ${attempt + 1} failed (status: ${status}). Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw lastError;
};

export const getGeminiChatResponse = async (userMessage: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
        },
      });
    });

    return { text: response.text || "...", error: false };
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const status = error?.status || error?.response?.status;
    return { 
      text: status === 429 
        ? "Wow, so many people are talking to me! ☀️ I need a tiny break. Can you wait a minute?" 
        : "Oops! My rays are a bit dimmed. Let me try to recharge. (Connection Issue)", 
      error: true,
      type: status === 429 ? 'rate-limit' : 'network'
    };
  }
};

export const generateArtProject = async (prompt: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await withRetry(async () => {
      return await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: `A vibrant, kid-friendly, playful illustration for a preschool art project: ${prompt}` }]
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1"
          }
        }
      });
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return { data: `data:image/png;base64,${part.inlineData.data}`, error: false };
      }
    }
    return { data: null, error: true };
  } catch (error: any) {
    console.error("Image Generation Error:", error);
    return { data: null, error: true };
  }
};
