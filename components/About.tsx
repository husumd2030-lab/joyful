
import React from 'react';
import Teachers from './Teachers';
import { Language, translations } from '../translations';

interface AboutProps {
  preview?: boolean;
  lang: Language;
}

const About: React.FC<AboutProps> = ({ preview, lang }) => {
  const t = translations[lang].about;
  return (
    <section id="about" className={`py-24 ${preview ? 'bg-white' : 'pt-32 bg-blue-50'}`}>
      <div className="max-w-7xl mx-auto px-4">
        {!preview && (
          <div className="mb-20 text-center space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">{t.title}</h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">{t.subtitle}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="rounded-[3rem] overflow-hidden shadow-2xl relative z-10 aspect-video lg:aspect-square">
              <img src="https://picsum.photos/seed/school-building/800/800" alt="School Environment" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400 rounded-full -z-1 opacity-20"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-400 rounded-full -z-1 opacity-10"></div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-blue-900">{t.whyTitle}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {lang === 'en' 
                ? "We believe that early childhood is the most critical stage of development. Our philosophy is rooted in child-led exploration, where our role is to provide the tools, environment, and encouragement for children to find their own paths of discovery."
                : "የመጀመሪያ የልጅነት ጊዜ የእድገት በጣም ወሳኝ ደረጃ መሆኑን እናምናለን። የእኛ ፍልስፍና በልጆች በሚመራ አሰሳ ላይ የተመሰረተ ነው፣ የእኛ ሚና ልጆች የራሳቸውን የግኝት ጎዳና እንዲያገኙ መሳሪያዎችን፣ አካባቢን እና ማበረታቻን መስጠት ነው።"}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: lang === 'en' ? 'Play-Based' : 'በጨዋታ ላይ የተመሰረተ', icon: 'fa-gamepad', color: 'bg-orange-100 text-orange-600' },
                { title: lang === 'en' ? 'Safe Haven' : 'አስተማማኝ መጠጊያ', icon: 'fa-house-lock', color: 'bg-blue-100 text-blue-600' },
                { title: lang === 'en' ? 'Creative Art' : 'የፈጠራ ጥበብ', icon: 'fa-palette', color: 'bg-pink-100 text-pink-600' },
                { title: lang === 'en' ? 'Nature Walks' : 'ተፈጥሮ ጉዞዎች', icon: 'fa-tree', color: 'bg-green-100 text-green-600' }
              ].map((val, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-50">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${val.color}`}>
                    <i className={`fas ${val.icon}`}></i>
                  </div>
                  <span className="font-bold text-gray-800">{val.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Teachers lang={lang} />

        {!preview && (
          <div className="mt-24 bg-white rounded-[3rem] p-12 shadow-xl border border-blue-50">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900">{t.rhythm}</h2>
              <p className="text-gray-500 mt-2">{lang === 'en' ? 'A balanced mix of activity, rest, and learning.' : 'የእንቅስቃሴ፣ የዕረፍት እና የትምህርት ሚዛናዊ ድብልቅ።'}</p>
            </div>
            <div className="space-y-6">
              {[
                { time: '08:00 AM', activity: lang === 'en' ? 'Arrival & Free Choice Play' : 'መድረሻ እና ነፃ ምርጫ ጨዋታ' },
                { time: '09:30 AM', activity: lang === 'en' ? 'Morning Circle & Story Time' : 'የጠዋት ክበብ እና የታሪክ ጊዜ' },
                { time: '10:30 AM', activity: lang === 'en' ? 'Outdoor Exploration & Physical Play' : 'የውጪ ፍለጋ እና አካላዊ ጨዋታ' },
                { time: '12:00 PM', activity: lang === 'en' ? 'Nutritious Organic Lunch' : 'ጠቃሚ ተፈጥሯዊ ምሳ' },
                { time: '01:30 PM', activity: lang === 'en' ? 'Quiet Time / Nap Period' : 'የእረፍት ጊዜ / እንቅልፍ' },
                { time: '03:00 PM', activity: lang === 'en' ? 'Creative Workshops (Music/Art)' : 'የፈጠራ ወርክሾፖች (ሙዚቃ/ጥበብ)' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-8 group">
                  <div className="w-24 text-blue-600 font-bold">{item.time}</div>
                  <div className="flex-1 h-px bg-gray-100 group-hover:bg-blue-200 transition-colors"></div>
                  <div className="w-1/2 text-gray-700 font-medium">{item.activity}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
