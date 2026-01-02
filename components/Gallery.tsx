
import React, { useState } from 'react';
import { Language } from '../translations';

interface GalleryProps {
  preview?: boolean;
  lang: Language;
}

const Gallery: React.FC<GalleryProps> = ({ preview, lang }) => {
  const categoriesEn = ['All', 'Learning', 'Playground', 'Events', 'Food'];
  const categoriesAm = ['ሁሉም', 'ትምህርት', 'መጫወቻ', 'ክስተቶች', 'ምግብ'];
  
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const images = [
    { url: 'https://picsum.photos/seed/learn1/600/400', categoryEn: 'Learning', categoryAm: 'ትምህርት', titleEn: 'Art Workshop', titleAm: 'የጥበብ ወርክሾፕ' },
    { url: 'https://picsum.photos/seed/play1/600/400', categoryEn: 'Playground', categoryAm: 'መጫወቻ', titleEn: 'Outdoor Fun', titleAm: 'የውጪ ጨዋታ' },
    { url: 'https://picsum.photos/seed/food1/600/400', categoryEn: 'Food', categoryAm: 'ምግብ', titleEn: 'Healthy Lunch', titleAm: 'ጤናማ ምሳ' },
    { url: 'https://picsum.photos/seed/event1/600/400', categoryEn: 'Events', categoryAm: 'ክስተቶች', titleEn: 'Annual Day', titleAm: 'አመታዊ ቀን' },
    { url: 'https://picsum.photos/seed/learn2/600/400', categoryEn: 'Learning', categoryAm: 'ትምህርት', titleEn: 'Science Day', titleAm: 'የሳይንስ ቀን' },
    { url: 'https://picsum.photos/seed/play2/600/400', categoryEn: 'Playground', categoryAm: 'መጫወቻ', titleEn: 'Sand Pit Fun', titleAm: 'የአሸዋ ጨዋታ' },
    { url: 'https://picsum.photos/seed/learn3/600/400', categoryEn: 'Learning', categoryAm: 'ትምህርት', titleEn: 'Music Class', titleAm: 'የሙዚቃ ክፍል' },
    { url: 'https://picsum.photos/seed/event2/600/400', categoryEn: 'Events', categoryAm: 'ክስተቶች', titleEn: 'Graduation', titleAm: 'ምረቃ' },
    { url: 'https://picsum.photos/seed/food2/600/400', categoryEn: 'Food', categoryAm: 'ምግብ', titleEn: 'Fruit Snack', titleAm: 'የፍራፍሬ መክሰስ' },
  ];

  const activeCatEn = categoriesEn[activeTabIdx];
  const displayImages = preview ? images.slice(0, 6) : (
    activeCatEn === 'All' ? images : images.filter(img => img.categoryEn === activeCatEn)
  );

  return (
    <section id="gallery" className={`py-24 ${preview ? 'bg-blue-50' : 'pt-32 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900">
            {preview ? (lang === 'en' ? 'Life at Joyful Kids' : 'በደስተኛ ልጆች ህይወት') : (lang === 'en' ? 'Campus Gallery' : 'የግቢ ጋለሪ')}
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {lang === 'en' ? 'Glimpses of daily joy, discovery, and growth in our vibrant campus.' : 'በደማቅ ግቢያችን ውስጥ የዕለት ተዕለት ደስታ፣ ግኝት እና እድገት እይታዎች።'}
          </p>
          
          {!preview && (
            <div className="flex flex-wrap justify-center gap-2 pt-6">
              {categoriesEn.map((cat, idx) => (
                <button
                  key={cat}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${
                    activeTabIdx === idx 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                      : 'bg-white text-gray-600 hover:bg-blue-100 border border-gray-100'
                  }`}
                >
                  {lang === 'en' ? cat : categoriesAm[idx]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((img, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden rounded-[2.5rem] bg-white shadow-md aspect-[4/3] cursor-pointer"
            >
              <img 
                src={img.url} 
                alt={lang === 'en' ? img.titleEn : img.titleAm} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-1">{lang === 'en' ? img.categoryEn : img.categoryAm}</span>
                <h4 className="text-white text-xl font-bold">{lang === 'en' ? img.titleEn : img.titleAm}</h4>
              </div>
            </div>
          ))}
        </div>

        {preview && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-6 italic">{lang === 'en' ? 'And many more magical moments...' : 'እና ሌሎች ብዙ አስማታዊ ጊዜያት...'}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
