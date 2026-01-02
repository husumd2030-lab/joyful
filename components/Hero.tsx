
import React from 'react';
import { Language, translations } from '../translations';

interface HeroProps {
  onEnrollClick: () => void;
  lang: Language;
}

const Hero: React.FC<HeroProps> = ({ onEnrollClick, lang }) => {
  const t = translations[lang].hero;
  return (
    <section id="home" className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white overflow-hidden relative">
      <div className="absolute top-40 left-10 animate-bounce transition-all [animation-duration:3s] opacity-20 hidden lg:block">
        <i className="fas fa-cloud text-blue-200 text-6xl"></i>
      </div>
      <div className="absolute top-20 right-20 animate-bounce transition-all [animation-duration:4s] opacity-20 hidden lg:block">
        <i className="fas fa-sun text-yellow-400 text-7xl"></i>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full font-bold text-sm mb-4">
            {t.badge}
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-blue-900 leading-tight">
            {t.title} <br />
            <span className="text-orange-500">{t.titleHighlight}</span>
            {t.titleEnd}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={onEnrollClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all hover:-translate-y-1"
            >
              {t.cta1}
            </button>
            <button className="bg-white border-2 border-blue-100 hover:border-blue-600 text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg transition-all">
              {t.cta2}
            </button>
          </div>
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((n) => (
                <img key={n} src={`https://picsum.photos/seed/${n + 20}/100/100`} alt="Parent" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
              ))}
            </div>
            <p className="text-sm text-gray-500">
              <span className="font-bold text-blue-900">500+</span> {t.trust}
            </p>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl rotate-2 transition-transform hover:rotate-0 duration-500 group">
            <img 
              src="https://picsum.photos/seed/kids-learning/1200/900" 
              alt="Kids learning" 
              className="w-full h-auto transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
