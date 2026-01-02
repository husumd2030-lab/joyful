
import React, { useState } from 'react';
import { Page } from '../App';
import { Language, translations } from '../translations';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onEnrollClick: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onPageChange, onEnrollClick, lang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang].nav;

  const navItems: { name: string; id: Page }[] = [
    { name: t.home, id: 'home' },
    { name: t.programs, id: 'programs' },
    { name: t.about, id: 'about' },
    { name: t.gallery, id: 'gallery' },
    { name: t.portal, id: 'parent-portal' },
    { name: t.contact, id: 'contact' },
  ];

  const handleNavClick = (id: Page) => {
    onPageChange(id);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-white shadow-lg">
              <i className="fas fa-sun text-xl animate-pulse"></i>
            </div>
            <span className="text-2xl font-bold text-blue-600 font-heading tracking-tight">
              {translations[lang].siteName}
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm lg:text-base font-medium transition-all hover:text-blue-500 relative py-2 ${
                  currentPage === item.id 
                    ? 'text-blue-600 font-bold' 
                    : 'text-gray-600'
                }`}
              >
                {item.name}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400 rounded-full"></span>
                )}
              </button>
            ))}
            
            <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('am')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${lang === 'am' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500'}`}
              >
                አማ
              </button>
            </div>

            <button 
              onClick={onEnrollClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-bold shadow-md transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              {t.enroll}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
             <button 
                onClick={() => setLang(lang === 'en' ? 'am' : 'en')}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600"
              >
                {lang === 'en' ? 'አማ' : 'EN'}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-blue-500 p-2"
            >
              <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors ${
                currentPage === item.id ? 'bg-blue-50 text-blue-600 font-bold' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => { setIsOpen(false); onEnrollClick(); }}
            className="w-full bg-orange-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg mt-4"
          >
            {t.enroll}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
