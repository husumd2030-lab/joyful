
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Teachers from './components/Teachers';
import Gallery from './components/Gallery';
import ParentPortal from './components/ParentPortal';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Contact from './components/Contact';
import About from './components/About';
import { Language, translations } from './translations';

export type Page = 'home' | 'programs' | 'about' | 'gallery' | 'parent-portal' | 'contact';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [lang, setLang] = useState<Language>('en');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', childName: '', program: 'Toddler Nest' });

  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleEnrollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnrollSuccess(true);
    setTimeout(() => {
      setIsEnrollModalOpen(false);
      setEnrollSuccess(false);
      setFormData({ name: '', email: '', childName: '', program: 'Toddler Nest' });
    }, 3000);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onEnrollClick={() => setIsEnrollModalOpen(true)} lang={lang} />
            <section className="py-12 bg-white/80 backdrop-blur-sm relative border-y border-gray-50">
              <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16">
                {[
                  { icon: 'fa-shield-heart', text: lang === 'en' ? 'Safety First' : 'ደህንነት ቀዳሚ', color: 'text-red-500' },
                  { icon: 'fa-apple-whole', text: lang === 'en' ? 'Organic Meals' : 'ተፈጥሯዊ ምግቦች', color: 'text-green-500' },
                  { icon: 'fa-bus', text: lang === 'en' ? 'Safe Transport' : 'አስተማማኝ ትራንስፖርት', color: 'text-yellow-500' },
                  { icon: 'fa-camera-retro', text: lang === 'en' ? 'Live Monitoring' : 'ቀጥታ ክትትል', color: 'text-blue-500' }
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 hover:scale-105 transition-transform cursor-default">
                    <i className={`fas ${f.icon} text-2xl ${f.color}`}></i>
                    <span className="font-bold text-gray-700">{f.text}</span>
                  </div>
                ))}
              </div>
            </section>
            <Programs preview lang={lang} />
            <About preview lang={lang} />
            <Gallery preview lang={lang} />
          </>
        );
      case 'programs':
        return <Programs lang={lang} />;
      case 'about':
        return <About lang={lang} />;
      case 'gallery':
        return <Gallery lang={lang} />;
      case 'parent-portal':
        return <ParentPortal lang={lang} />;
      case 'contact':
        return <Contact lang={lang} />;
      default:
        return <Hero onEnrollClick={() => setIsEnrollModalOpen(true)} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-yellow-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <Navbar 
        currentPage={currentPage}
        onPageChange={setCurrentPage} 
        onEnrollClick={() => setIsEnrollModalOpen(true)} 
        lang={lang}
        setLang={setLang}
      />
      
      <main className="relative z-10">
        {renderPage()}

        {currentPage !== 'contact' && (
          <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="grid grid-cols-6 gap-4 transform -rotate-12 translate-y-20">
                {[...Array(24)].map((_, i) => <i key={i} className="fas fa-star text-4xl text-white"></i>)}
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-white text-center md:text-left">
                <h2 className="text-4xl font-bold mb-3">{lang === 'en' ? 'Enrollments Open for 2024!' : 'ለ2016 ምዝገባ ተከፍቷል!'}</h2>
                <p className="text-xl text-orange-50">{lang === 'en' ? 'Join our community of happy explorers today.' : 'ዛሬውኑ የደስተኛ ቤተሰባችን አባል ይሁኑ።'}</p>
              </div>
              <button 
                onClick={() => setIsEnrollModalOpen(true)}
                className="bg-white text-orange-600 px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:bg-orange-50 transition-all hover:scale-105 active:scale-95"
              >
                {lang === 'en' ? 'Request Prospectus' : 'መረጃ ይጠይቁ'}
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer onPageChange={setCurrentPage} lang={lang} />
      <ChatBot lang={lang} />

      <Modal isOpen={isEnrollModalOpen} onClose={() => setIsEnrollModalOpen(false)} title={lang === 'en' ? 'Start Your Journey' : 'ጉዞዎን ይጀምሩ'}>
        {enrollSuccess ? (
          <div className="text-center py-10 space-y-4 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
              <i className="fas fa-check"></i>
            </div>
            <h4 className="text-2xl font-bold text-gray-800">{lang === 'en' ? 'Application Received!' : 'ማመልከቻዎ ደርሶናል!'}</h4>
            <p className="text-gray-500">{lang === 'en' ? 'Sunny and the team will contact you within 24 hours.' : 'ሳኒ እና ቡድኑ በ24 ሰዓታት ውስጥ ያነጋግሩዎታል።'}</p>
          </div>
        ) : (
          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? 'Parent Name' : 'የወላጅ ስም'}</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? 'Email Address' : 'የኢሜል አድራሻ'}</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? "Child's Name" : 'የልጁ ስም'}</label>
              <input required type="text" value={formData.childName} onChange={e => setFormData({...formData, childName: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? 'Program of Interest' : 'የሚፈልጉት ፕሮግራም'}</label>
              <select value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Toddler Nest</option>
                <option>Explorer Pre-K</option>
                <option>Junior Kindergarten</option>
                <option>After School Club</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors mt-4">
              {lang === 'en' ? 'Submit Interest' : 'ፍላጎትዎን ይግለጹ'}
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default App;
