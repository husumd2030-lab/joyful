
import React, { useState, useEffect, useRef } from 'react';
import { ChildProfile } from '../types';
import { Language } from '../translations';

interface ParentPortalProps {
  lang: Language;
}

export default function ParentPortal({ lang }: ParentPortalProps) {
  const [profile, setProfile] = useState<ChildProfile>({
    name: lang === 'en' ? 'Little Explorer' : 'ትንሹ አሳሽ',
    birthDate: '',
    photoUrl: null,
    class: 'Toddler Nest'
  });
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('child_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved profile", e);
      }
    }
  }, []);

  const saveProfile = (newProfile: ChildProfile) => {
    setProfile(newProfile);
    localStorage.setItem('child_profile', JSON.stringify(newProfile));
    setIsEditing(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        saveProfile({ ...profile, photoUrl: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <section id="parent-portal" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 backdrop-blur-sm">
          <div className="bg-blue-600 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold font-heading">{lang === 'en' ? 'Parent Portal' : 'የወላጆች ፖርታል'}</h2>
              <p className="opacity-80">{lang === 'en' ? "Manage your child's information and daily journey." : 'የልጅዎን መረጃ እና የዕለት ተዕለት ጉዞ ያስተዳድሩ።'}</p>
            </div>
            <i className="fas fa-heart text-blue-500/30 text-9xl absolute -right-10 -bottom-10 rotate-12"></i>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
              <div className="relative group">
                <div className="w-48 h-48 rounded-[2rem] bg-blue-100 border-4 border-blue-50 overflow-hidden shadow-inner flex items-center justify-center relative">
                  {profile.photoUrl ? (
                    <img src={profile.photoUrl} alt="Child Profile" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-user text-6xl text-blue-300"></i>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={triggerUpload}>
                    <i className="fas fa-camera text-white text-3xl"></i>
                  </div>
                </div>
                
                <button 
                  onClick={triggerUpload}
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg hover:bg-yellow-500 transition-all active:scale-95 flex items-center gap-2 whitespace-nowrap"
                >
                  <i className="fas fa-upload"></i>
                  {lang === 'en' ? 'Update Photo' : 'ፎቶ ይቀይሩ'}
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handlePhotoUpload} 
                />
              </div>

              <div className="flex-1 space-y-6 w-full">
                {isEditing ? (
                  <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? "Child's Name" : 'የልጁ ስም'}</label>
                      <input 
                        type="text" 
                        value={profile.name} 
                        onChange={e => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? 'Date of Birth' : 'የትውልድ ቀን'}</label>
                        <input 
                          type="date" 
                          value={profile.birthDate} 
                          onChange={e => setProfile({...profile, birthDate: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-600 mb-1">{lang === 'en' ? 'Program' : 'ፕሮግራም'}</label>
                        <select 
                          value={profile.class} 
                          onChange={e => setProfile({...profile, class: e.target.value})}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option>Toddler Nest</option>
                          <option>Explorer Pre-K</option>
                          <option>Junior Kindergarten</option>
                          <option>After School Club</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button 
                        onClick={() => saveProfile(profile)}
                        className="bg-green-500 text-white px-6 py-2 rounded-xl font-bold shadow-md hover:bg-green-600"
                      >
                        {lang === 'en' ? 'Save Profile' : 'መረጃውን አስቀምጥ'}
                      </button>
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-300"
                      >
                        {lang === 'en' ? 'Cancel' : 'አቋርጥ'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-4xl font-bold text-gray-800">{profile.name}</h3>
                        <span className="inline-block bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold mt-2">
                          <i className="fas fa-graduation-cap mr-2"></i>
                          {profile.class}
                        </span>
                      </div>
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="text-blue-500 hover:text-blue-600 font-bold flex items-center gap-2"
                      >
                        <i className="fas fa-edit"></i> {lang === 'en' ? 'Edit' : 'አስተካክል'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
                      <div className="bg-orange-50 p-6 rounded-3xl border border-orange-100">
                        <i className="fas fa-calendar-alt text-orange-400 text-xl mb-3"></i>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Birth Date' : 'የትውልድ ቀን'}</p>
                        <p className="text-gray-800 font-bold text-lg">{profile.birthDate || (lang === 'en' ? 'Not specified' : 'አልተገለጸም')}</p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
                        <i className="fas fa-star text-green-400 text-xl mb-3"></i>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{lang === 'en' ? 'Attendance' : 'ተገኝነት'}</p>
                        <p className="text-gray-800 font-bold text-lg">{lang === 'en' ? '98% This Month' : '98% በዚህ ወር'}</p>
                      </div>
                    </div>

                    <div className="mt-10 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                        <i className="fas fa-bell"></i>
                      </div>
                      <div>
                        <p className="text-gray-800 font-bold">{lang === 'en' ? 'Upcoming: Pajama Day!' : 'መጪው ጊዜ፡ የፓጃማ ቀን!'}</p>
                        <p className="text-gray-500 text-sm">{lang === 'en' ? "Friday, Dec 15th - Don't forget their favorite stuffed toy." : 'አርብ፣ ታህሳስ 6 - ተወዳጅ አሻንጉሊታቸውን አይርሱ።'}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
