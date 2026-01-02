
import React from 'react';
import { Language } from '../translations';

interface TeachersProps {
  lang: Language;
}

const getTeachers = (lang: Language) => [
  { 
    name: lang === 'en' ? 'Ms. Emily' : 'ወይዘሮ ኤሚሊ', 
    role: lang === 'en' ? 'Head of Montessori' : 'የሞንቴሶሪ ኃላፊ', 
    bio: lang === 'en' ? '15 years of experience in early childhood development.' : 'በመጀመሪያ ልጅነት እድገት የ15 ዓመት ልምድ ያላቸው።', 
    color: 'border-blue-400', 
    img: 'https://picsum.photos/seed/emily/300/300' 
  },
  { 
    name: lang === 'en' ? 'Mr. Julian' : 'አቶ ጁሊያን', 
    role: lang === 'en' ? 'Music & Arts Director' : 'የሙዚቃ እና ጥበብ ዳይሬክተር', 
    bio: lang === 'en' ? 'Believes every child is a natural born artist and musician.' : 'እያንዳንዱ ልጅ የተፈጥሮ አርቲስት እና ሙዚቀኛ መሆኑን ያምናሉ።', 
    color: 'border-orange-400', 
    img: 'https://picsum.photos/seed/julian/300/300' 
  },
  { 
    name: lang === 'en' ? 'Ms. Sarah' : 'ወይዘሮ ሳራ', 
    role: lang === 'en' ? 'Preschool Educator' : 'የቅድመ መደበኛ አስተማሪ', 
    bio: lang === 'en' ? 'Specialist in language acquisition and storytelling.' : 'በቋንቋ ትምህርት እና ተረት ተረት ላይ የተካኑ።', 
    color: 'border-green-400', 
    img: 'https://picsum.photos/seed/sarah/300/300' 
  },
  { 
    name: lang === 'en' ? 'Coach Mike' : 'አሰልጣኝ ማይክ', 
    role: lang === 'en' ? 'Physical Education' : 'የአካል ብቃት እንቅስቃሴ', 
    bio: lang === 'en' ? 'Promoting healthy habits through fun and movement.' : 'በጨዋታ እና በእንቅስቃሴ ጤናማ ልምዶችን ማስተዋወቅ።', 
    color: 'border-purple-400', 
    img: 'https://picsum.photos/seed/mike/300/300' 
  },
];

const Teachers: React.FC<TeachersProps> = ({ lang }) => {
  const teachers = getTeachers(lang);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">{lang === 'en' ? 'Meet Our Educators' : 'አስተማሪዎቻችንን ያግኙ'}</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-16">{lang === 'en' ? 'Our team is dedicated to providing a warm, supportive, and stimulating environment for your little ones.' : 'ቡድናችን ለልጆቻችሁ ሞቅ ያለ፣ ደጋፊ እና አበረታች አካባቢን ለመስጠት ቁርጠኛ ነው።'}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className={`w-48 h-48 rounded-full border-8 ${teacher.color} overflow-hidden mb-6 transition-transform group-hover:scale-105 shadow-xl`}>
                <img src={teacher.img} alt={teacher.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{teacher.name}</h3>
              <p className="text-blue-600 font-semibold mb-3">{teacher.role}</p>
              <p className="text-gray-500 text-sm">{teacher.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
