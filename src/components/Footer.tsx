import React from 'react';
import { MapPin, Phone, Clock, Compass, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenOrderModal: () => void;
  onOpenBookingModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenOrderModal,
  onOpenBookingModal,
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-600/40 shrink-0 bg-white">
                <img
                  src={BUSINESS_INFO.logo}
                  alt="Krishina Gai Farm Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {language === 'en' ? 'Krishina Gai Farm' : 'कृष्ण गाई फार्म'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              {language === 'en'
                ? '5.0-star rated organic cow dairy and peaceful rural coworking retreat in Arjundhara, Koshi Province, Nepal. Grass-fed milk, traditional bilona ghee, and mindful work in nature.'
                : 'अर्जुनधारामा अवस्थित ५.० मूल्याङ्कन प्राप्त गाई फार्म तथा काउवर्किङ स्पेस। शुद्ध घाँसे दूध, परम्परागत मधानीले पारेको दानेदार घिउ र शान्त ग्रामीण वातावरण।'}
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>★ 5.0 Google Business Rating</span>
              <span className="text-stone-600">·</span>
              <span>8 Verified Reviews</span>
            </div>
          </div>

          {/* Col 2: Navigation mirror */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'en' ? 'Navigation' : 'मुख्य लिङ्कहरू'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  {language === 'en' ? 'Dairy Products' : 'दूध तथा घिउ'}
                </a>
              </li>
              <li>
                <a href="#coworking" className="hover:text-emerald-400 transition-colors">
                  {language === 'en' ? 'Coworking Space' : 'काउवर्किङ स्पेस'}
                </a>
              </li>
              <li>
                <a href="#farm-life" className="hover:text-emerald-400 transition-colors">
                  {language === 'en' ? 'Our Cows & Gau-Seva' : 'गाई र गौ-सेवा'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-400 transition-colors">
                  {language === 'en' ? 'Google Reviews' : 'ग्राहक समीक्षा'}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-emerald-400 transition-colors">
                  {language === 'en' ? 'Location & Directions' : 'स्थान र नक्सा'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Services & Booking */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'en' ? 'Services' : 'सेवाहरू'}
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={onOpenOrderModal}
                  className="hover:text-emerald-400 text-left transition-colors"
                >
                  {language === 'en' ? 'Daily Milk Doorstep Delivery' : 'दैनिक बिहानको दूध डेलिभरी'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenOrderModal}
                  className="hover:text-emerald-400 text-left transition-colors"
                >
                  {language === 'en' ? 'Pure Bilona Ghee Orders' : 'दानेदार घिउ अर्डर'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookingModal}
                  className="hover:text-emerald-400 text-left transition-colors"
                >
                  {language === 'en' ? 'Coworking Day Pass (रू 250)' : 'काउवर्किङ दिन पास (रू २५०)'}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookingModal}
                  className="hover:text-emerald-400 text-left transition-colors"
                >
                  {language === 'en' ? 'School & Family Farm Tours' : 'शैक्षिक तथा पारिवारिक भ्रमण'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Google Profile Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              {language === 'en' ? 'Google Profile Details' : 'गुगल प्रोफाइल विवरण'}
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Plus Code: <strong className="text-stone-200">{BUSINESS_INFO.plusCodeShort}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="hover:text-white transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{BUSINESS_INFO.openingHours} (Open Daily)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Krishina Gai Farm. All rights reserved. Arjundhara, Koshi Province, Nepal.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Pure Dairy Guaranteed</span>
            <span aria-hidden="true">·</span>
            <span>Eco-Agrotourism Retreat</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
