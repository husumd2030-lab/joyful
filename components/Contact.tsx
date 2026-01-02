
import React, { useState } from 'react';
import { Language } from '../translations';

// Define the props interface to include the lang property
interface ContactProps {
  lang: Language;
}

// Update the component to accept the lang prop and handle bilingual text
const Contact: React.FC<ContactProps> = ({ lang }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <section id="contact" className="pt-32 pb-24 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
            {lang === 'en' ? 'Get in Touch' : 'እውቂያ'}
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Have questions? We'd love to hear from you. Visit our campus or drop a message!" 
              : "ጥያቄዎች አሉዎት? ከእርስዎ መስማት እንወዳለን። ግቢያችንን ይጎብኙ ወይም መልእክት ይላኩ!"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-blue-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              {lang === 'en' ? 'Send us a Message' : 'መልእክት ይላኩልን'}
            </h2>
            
            {formStatus === 'sent' ? (
              <div className="py-12 text-center animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-6">
                  <i className="fas fa-paper-plane"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  {lang === 'en' ? 'Message Sent!' : 'መልእክት ተልኳል!'}
                </h3>
                <p className="text-gray-500 mt-2">
                  {lang === 'en' ? "Thank you for reaching out. We'll get back to you shortly." : "ስላነጋገሩን እናመሰግናለን። በቅርቡ ምላሽ እንሰጥዎታለን።"}
                </p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-blue-600 font-bold hover:underline"
                >
                  {lang === 'en' ? 'Send another message' : 'ሌላ መልእክት ላክ'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">
                      {lang === 'en' ? 'Full Name' : 'ሙሉ ስም'}
                    </label>
                    <input required type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-600 mb-2">
                      {lang === 'en' ? 'Email Address' : 'የኢሜል አድራሻ'}
                    </label>
                    <input required type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    {lang === 'en' ? 'Subject' : 'ርዕሰ ጉዳይ'}
                  </label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all">
                    <option>{lang === 'en' ? 'General Inquiry' : 'አጠቃላይ ጥያቄ'}</option>
                    <option>{lang === 'en' ? 'Admissions & Enrollment' : 'መግቢያ እና ምዝገባ'}</option>
                    <option>{lang === 'en' ? 'Career Opportunities' : 'የስራ እድሎች'}</option>
                    <option>{lang === 'en' ? 'Events & Workshops' : 'ክስተቶች እና ወርክሾፖች'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    {lang === 'en' ? 'Your Message' : 'መልእክትዎ'}
                  </label>
                  <textarea required rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {formStatus === 'sending' ? (
                    <><i className="fas fa-circle-notch animate-spin"></i> {lang === 'en' ? 'Sending...' : 'በመላክ ላይ...'}</>
                  ) : (
                    <><i className="fas fa-send"></i> {lang === 'en' ? 'Send Message' : 'መልእክት ላክ'}</>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Map Placeholder */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-blue-50">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {lang === 'en' ? 'Our Campus' : 'ግቢያችን'}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl shrink-0">
                    <i className="fas fa-location-dot"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {lang === 'en' ? 'Main Office' : 'ዋና ቢሮ'}
                    </h4>
                    <p className="text-gray-500">
                      {lang === 'en' ? '123 Sunshine Lane, Happy Valley, CA 90210' : '123 የፀሐይ ብርሃን መንገድ፣ ፒያሳ፣ አዲስ አበባ'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl shrink-0">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {lang === 'en' ? 'Direct Line' : 'ቀጥታ መስመር'}
                    </h4>
                    <p className="text-gray-500">
                      {lang === 'en' ? '+1 (555) 123-4567 (Mon-Fri, 8AM-6PM)' : '+251 91 123 4567 (ከሰኞ-አርብ፣ ከ2-12 ሰዓት)'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center text-xl shrink-0">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {lang === 'en' ? 'Email Us' : 'ኢሜል ይላኩልን'}
                    </h4>
                    <p className="text-gray-500">hello@joyfulkids.edu</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Interactive Map */}
            <div className="bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-inner h-[300px] relative group border-4 border-white">
              <img 
                src="https://picsum.photos/seed/map/1000/600" 
                alt="Map Placeholder" 
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700" 
              />
              <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-lg whitespace-nowrap">
                    {lang === 'en' ? 'We are here!' : 'እዚህ ነን!'}
                  </div>
                </div>
              </div>
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-white transition-colors flex items-center gap-2"
              >
                {lang === 'en' ? 'Open in Google Maps' : 'በጎግል ካርታ ይክፈቱ'} <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
