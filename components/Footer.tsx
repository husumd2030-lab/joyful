
import React, { useState } from 'react';
import { Page } from '../App';
import { Language, translations } from '../translations';

interface FooterProps {
  onPageChange: (page: Page) => void;
  lang: Language;
}

const Footer: React.FC<FooterProps> = ({ onPageChange, lang }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const t = translations[lang];

  const handleSubscribe = () => {
    if (email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const menuItems: { name: string; id: Page }[] = [
    { name: t.nav.home, id: 'home' },
    { name: t.nav.programs, id: 'programs' },
    { name: t.nav.gallery, id: 'gallery' },
    { name: t.nav.portal, id: 'parent-portal' },
    { name: t.nav.about, id: 'about' },
    { name: t.nav.contact, id: 'contact' },
  ];

  return (
    <footer className="bg-blue-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white">
              <i className="fas fa-sun text-xl"></i>
            </div>
            <span className="text-2xl font-bold font-heading">{t.siteName}</span>
          </div>
          <p className="text-blue-100/70 leading-relaxed">
            {t.footer.tagline}
          </p>
          <div className="flex gap-4">
            {['facebook-f', 'instagram', 'twitter', 'linkedin-in'].map(icon => (
              <a key={icon} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-yellow-400 transition-colors">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">{lang === 'en' ? 'Explore' : 'ያስሱ'}</h4>
          <ul className="space-y-4 text-blue-100/70">
            {menuItems.map(item => (
              <li key={item.id}>
                <button onClick={() => onPageChange(item.id)} className="hover:text-yellow-400 transition-colors">
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">{t.footer.contact}</h4>
          <ul className="space-y-4 text-blue-100/70">
            <li className="flex gap-3">
              <i className="fas fa-map-marker-alt text-yellow-400 pt-1"></i>
              <span>{lang === 'en' ? '123 Sunshine Lane, Happy Valley, CA 90210' : '123 የፀሐይ ብርሃን መንገድ፣ ፒያሳ፣ አዲስ አበባ'}</span>
            </li>
            <li className="flex gap-3">
              <i className="fas fa-phone-alt text-yellow-400 pt-1"></i>
              <span>+251 91 123 4567</span>
            </li>
            <li className="flex gap-3">
              <i className="fas fa-envelope text-yellow-400 pt-1"></i>
              <span>hello@joyfulkids.edu</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-bold mb-6">{t.footer.newsletter}</h4>
          <p className="text-blue-100/70 mb-4 text-sm">{lang === 'en' ? 'Get the latest news and parenting tips!' : 'አዳዲስ ዜናዎችን እና የወላጅነት ምክሮችን ያግኙ!'}</p>
          <div className="relative">
            {subscribed ? (
              <div className="bg-green-500/20 text-green-400 p-3 rounded-xl border border-green-500/30 flex items-center gap-2 text-sm animate-in slide-in-from-bottom-2">
                <i className="fas fa-check-circle"></i> {lang === 'en' ? 'Thanks for joining!' : 'ስለተቀላቀሉ እናመሰግናለን!'}
              </div>
            ) : (
              <>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'en' ? 'Your Email' : 'ኢሜልዎ'} 
                  className="w-full bg-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 border border-white/10"
                />
                <button 
                  onClick={handleSubscribe}
                  className="absolute right-1 top-1 bottom-1 px-4 bg-yellow-400 text-blue-900 rounded-lg font-bold text-sm hover:bg-yellow-500 transition-colors"
                >
                  {t.footer.subscribe}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-100/50 text-sm">
        <p>© 2024 Joyful Kids Care. {lang === 'en' ? 'All rights reserved.' : 'መብቱ በህግ የተጠበቀ ነው።'}</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">{lang === 'en' ? 'Privacy Policy' : 'የግላዊነት ፖሊሲ'}</a>
          <a href="#" className="hover:text-white">{lang === 'en' ? 'Terms of Service' : 'የአገልግሎት ውሎች'}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
