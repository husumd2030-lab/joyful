
import React, { useState } from 'react';
import { Program } from '../types';
import Modal from './Modal';
import { Language, translations } from '../translations';

interface ProgramsProps {
  preview?: boolean;
  lang: Language;
}

const getPrograms = (lang: Language): Program[] => [
  {
    id: '1',
    title: lang === 'en' ? 'Toddler Nest' : 'የታዳጊዎች ቤት',
    age: lang === 'en' ? '1.5 - 2.5 Years' : '1.5 - 2.5 ዓመታት',
    description: lang === 'en' ? 'Exploration through sensory play, music, and gentle socialization in a safe environment.' : 'ደህንነቱ በተጠበቀ አካባቢ ውስጥ በስሜት ህዋሳት ጨዋታ፣ በሙዚቃ እና በለሰለሰ ማህበራዊ ግንኙነት ምርምር።',
    icon: 'fa-baby',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: '2',
    title: lang === 'en' ? 'Explorer Pre-K' : 'አሳሽ ቅድመ-መደበኛ',
    age: lang === 'en' ? '2.5 - 4 Years' : '2.5 - 4 ዓመታት',
    description: lang === 'en' ? 'Building language, motor skills, and creative confidence through structured activities.' : 'በተዋቀሩ ተግባራት የቋንቋ፣ የሞተር ክህሎቶች እና የፈጠራ እምነትን መገንባት።',
    icon: 'fa-puzzle-piece',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: '3',
    title: lang === 'en' ? 'Junior Kindergarten' : 'ጀማሪ ኪንደርጋርተን',
    age: lang === 'en' ? '4 - 6 Years' : '4 - 6 ዓመታት',
    description: lang === 'en' ? 'Preparing for formal school with literacy, math concepts, and team-based projects.' : 'ለደበኛ ትምህርት ቤት በመሰረታዊ ትምህርት፣ በሂሳብ ፅንሰ-ሃሳቦች እና በቡድን ስራ ዝግጅት።',
    icon: 'fa-graduation-cap',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: '4',
    title: lang === 'en' ? 'After School Club' : 'ከትምህርት በኋላ ክለብ',
    age: lang === 'en' ? '6 - 10 Years' : '6 - 10 ዓመታት',
    description: lang === 'en' ? 'Homework support, sports, and creative workshops for a balanced afternoon.' : 'ለትምህርት እገዛ፣ ለስፖርት እና ለፈጠራ ወርክሾፖች የተመጣጠነ ከሰዓት።',
    icon: 'fa-palette',
    color: 'bg-orange-100 text-orange-600',
  }
];

const Programs: React.FC<ProgramsProps> = ({ preview, lang }) => {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const t = translations[lang].programs;
  const programs = getPrograms(lang);

  return (
    <section id="programs" className={`py-24 ${preview ? 'bg-white' : 'pt-32 bg-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            {preview ? t.title : t.fullTitle}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="p-8 rounded-[2.5rem] bg-white border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all group flex flex-col h-full cursor-pointer"
              onClick={() => setSelectedProgram(program)}
            >
              <div className={`w-16 h-16 rounded-2xl ${program.color} flex items-center justify-center text-3xl mb-6 transition-transform group-hover:scale-110`}>
                <i className={`fas ${program.icon}`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{program.title}</h3>
              <p className="text-sm font-bold text-blue-500 mb-4">{program.age}</p>
              <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>
              <button className="text-blue-600 font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                {t.learnMore} <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          ))}
        </div>

        {!preview && (
          <div className="mt-20 p-12 bg-white rounded-[3rem] shadow-xl border border-blue-50">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">{lang === 'en' ? 'Curriculum Standards' : 'የስርዓተ ትምህርት ደረጃዎች'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className="fas fa-book"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{lang === 'en' ? 'Cognitive Growth' : 'የእውቀት እድገት'}</h4>
                <p className="text-gray-500 text-sm">{lang === 'en' ? 'Focusing on critical thinking, puzzles, and early literacy skills.' : 'በትንታኔ አስተሳሰብ፣ በእንቆቅልሾች እና በመሰረታዊ የመፃፍ ክህሎቶች ላይ ማተኮር።'}</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className="fas fa-heart"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{lang === 'en' ? 'Social Awareness' : 'ማህበራዊ ግንዛቤ'}</h4>
                <p className="text-gray-500 text-sm">{lang === 'en' ? 'Learning empathy, collaboration, and sharing in group settings.' : 'ርህራሄን፣ ትብብርን እና በቡድን ውስጥ መጋራትን መማር።'}</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  <i className="fas fa-running"></i>
                </div>
                <h4 className="font-bold text-gray-800 mb-2">{lang === 'en' ? 'Physical Activity' : 'አካላዊ እንቅስቃሴ'}</h4>
                <p className="text-gray-500 text-sm">{lang === 'en' ? 'Daily outdoor exploration and gross motor skill development.' : 'ዕለታዊ የውጪ ፍለጋ እና የአካላዊ ብቃት እድገት።'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Modal 
        isOpen={!!selectedProgram} 
        onClose={() => setSelectedProgram(null)} 
        title={selectedProgram?.title || ''}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-2xl ${selectedProgram?.color} flex items-center justify-center text-3xl`}>
              <i className={`fas ${selectedProgram?.icon}`}></i>
            </div>
            <div>
              <p className="text-blue-600 font-bold">{selectedProgram?.age}</p>
              <p className="text-gray-500">{lang === 'en' ? 'Program Enrollment Open' : 'የፕሮግራም ምዝገባ ተከፍቷል'}</p>
            </div>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{selectedProgram?.description}</p>
            <h4 className="font-bold text-gray-800 border-b pb-2">{lang === 'en' ? "What's Included:" : 'ምን ይካተታል፡'}</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> {lang === 'en' ? 'Expert Staff' : 'ባለሙያ ሰራተኞች'}</li>
              <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> {lang === 'en' ? 'Daily Meals' : 'ዕለታዊ ምግቦች'}</li>
              <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> {lang === 'en' ? 'Creative Play' : 'ፈጠራዊ ጨዋታ'}</li>
              <li className="flex items-center gap-2"><i className="fas fa-check text-green-500"></i> {lang === 'en' ? 'Safe Environment' : 'አስተማማኝ አካባቢ'}</li>
            </ul>
          </div>
          <button onClick={() => setSelectedProgram(null)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold mt-4 shadow-lg hover:bg-orange-600 transition-colors">
            {lang === 'en' ? 'Close Details' : 'ዝርዝሮችን ዝጋ'}
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default Programs;
