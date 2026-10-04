import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/farmData';
import { GalleryItem, Language } from '../types';
import { Eye, X, ZoomIn, Camera } from 'lucide-react';

interface PhotoGalleryProps {
  language: Language;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'farm' | 'dairy' | 'coworking' | 'cows'>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Photos & Videos' : 'तस्बिर तथा भिडियो'}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Google Maps Archive</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Explore Life at Krishina Gai Farm' : 'कृष्ण गाई फार्मको एक झलक'}
          </h2>
          <p className="mt-2 text-sm text-stone-600">
            {language === 'en'
              ? 'Real glimpses of our pastures, pure bilona ghee preparation, healthy livestock, and the peaceful rural coworking space.'
              : 'हाम्रो चरन क्षेत्र, परम्परागत घिउ मन्थन, स्वस्थ गाईहरू र शान्त काउवर्किङ रिट्रिटका वास्तविक तस्बिरहरू।'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl max-w-fit mb-8">
          {[
            { id: 'all', label: language === 'en' ? 'All Photos' : 'सबै तस्बिर' },
            { id: 'farm', label: language === 'en' ? 'Pastures & Barns' : 'फार्म तथा चरन' },
            { id: 'dairy', label: language === 'en' ? 'Pure Milk & Ghee' : 'दूध र घिउ' },
            { id: 'coworking', label: language === 'en' ? 'Coworking Retreat' : 'काउवर्किङ स्पेस' },
            { id: 'cows', label: language === 'en' ? 'Our Cows' : 'हाम्रा गाईहरू' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-2xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={language === 'en' ? item.title : item.nepaliTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-stone-900 flex items-center justify-center shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    {language === 'en' ? item.title : item.nepaliTitle}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                    {language === 'en' ? item.caption : item.nepaliCaption}
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-emerald-800 mt-2 block">
                  {language === 'en' ? 'Click to view' : 'हेर्न क्लिक गर्नुहोस्'} →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={activePhoto.image}
                  alt={language === 'en' ? activePhoto.title : activePhoto.nepaliTitle}
                  className="w-full max-h-[70vh] object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-lg font-bold text-stone-900">
                  {language === 'en' ? activePhoto.title : activePhoto.nepaliTitle}
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  {language === 'en' ? activePhoto.caption : activePhoto.nepaliCaption}
                </p>
                <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>Location: Arjundhara, Koshi Province 57205</span>
                  <span>Plus Code: M2W8+J9</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
