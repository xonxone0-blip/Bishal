import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Laptop, 
  Milk, 
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';
import { GoogleProfileCard } from './GoogleProfileCard';

interface HeroProps {
  language: Language;
  onOpenOrderModal: () => void;
  onOpenBookingModal: () => void;
  onOpenDirections: () => void;
  onOpenReviewModal: () => void;
  onShowToast: (message: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  language,
  onOpenOrderModal,
  onOpenBookingModal,
  onOpenDirections,
  onOpenReviewModal,
  onShowToast,
}) => {
  return (
    <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Subtle organic background tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100/60 via-amber-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Zero-Pill Clean Unboxed Metadata Kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium text-stone-600 mb-4">
          <span className="text-emerald-800 font-bold uppercase tracking-wider">
            {language === 'en' ? 'Organic Dairy Farm & Retreat' : 'अर्गानिक गाई फार्म तथा रिट्रिट'}
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span>Arjundhara, Koshi Province 57205</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-amber-700 font-semibold">5.0 ★ Google Rating (8 Reviews)</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Value proposition & actions */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 leading-[1.12] text-balance">
              {language === 'en' ? (
                <>
                  Pure Grass-Fed Dairy & <span className="text-emerald-800">Peaceful Countryside</span> Coworking
                </>
              ) : (
                <>
                  शुद्ध घाँसे गाईको दूध, घिउ र <span className="text-emerald-800">शान्त ग्रामीण काउवर्किङ</span> स्पेस
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal">
              {language === 'en' ? (
                'Nestled in the lush greenery of Arjundhara, Koshi Province, Krishina Gai Farm delivers 100% pure, unadulterated cow milk and traditional bilona ghee daily — while providing a tranquil rural coworking sanctuary with high-speed Wi-Fi, fresh milk tea, and panoramic pasture views.'
              ) : (
                'अर्जुनधाराको स्वच्छ हरियालीमा अवस्थित कृष्ण गाई फार्मबाट हरेक बिहान-साँझ १००% शुद्ध घाँसे गाईको दूध र परम्परागत मधानीले पारेको दानेदार घिउ उपलब्ध छ। साथै इन्टरनेट र शान्त वातावरणसहितको काउवर्किङ स्पेसमा बसेर काम गर्न सकिन्छ।'
              )}
            </p>

            {/* Quick Proof Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Pure & Unadulterated' : 'शुद्ध र रसायनरहित'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {language === 'en' ? 'Zero water dilution' : 'पानीको मिसावट नभएको'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Daily Doorstep Delivery' : 'दैनिक घरदैलो डेलिभरी'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {language === 'en' ? 'Arjundhara & Birtamode' : 'बिहान र साँझको समयमा'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Quiet Work Sanctuary' : 'शान्त काउवर्किङ ठाउँ'}
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    {language === 'en' ? 'High-speed Wi-Fi & tea' : 'इन्टरनेट र ताजा चिया'}
                  </p>
                </div>
              </div>
            </div>

            {/* Single-Line Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenOrderModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 transition-all shadow-sm active:scale-[0.98] whitespace-nowrap"
              >
                <Milk className="w-4 h-4" />
                <span>{language === 'en' ? 'Order Fresh Milk & Ghee' : 'दूध र घिउ अर्डर गर्नुहोस्'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl hover:bg-stone-50 hover:border-stone-400 transition-all shadow-2xs whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span>{language === 'en' ? 'Book Coworking / Day Pass' : 'काउवर्किङ वा फार्म भ्रमण बुकिङ'}</span>
              </button>
            </div>

            {/* Call prompt */}
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <span>{language === 'en' ? 'Prefer ordering by phone?' : 'सिधै फोनबाट अर्डर गर्न चाहनुहुन्छ?'}</span>
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="font-bold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>

          {/* Right Column: Google Profile Interactive Card */}
          <div className="lg:col-span-5 space-y-4">
            <GoogleProfileCard
              language={language}
              onOpenDirections={onOpenDirections}
              onOpenReviewModal={onOpenReviewModal}
              onShowToast={onShowToast}
            />

            {/* Visual Image Preview with Scrim */}
            <div className="relative rounded-2xl overflow-hidden shadow-xs border border-stone-200 group">
              <img
                src="/src/assets/images/hero_krishna_farm_1791108223496.jpg"
                alt="Krishina Gai Farm pastures in Arjundhara Nepal"
                className="w-full h-44 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-transparent flex items-end p-4">
                <div className="text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                    {language === 'en' ? 'Farm Location' : 'फार्मको वास्तविक दृश्य'}
                  </p>
                  <p className="text-sm font-medium text-stone-100">
                    {language === 'en' 
                      ? 'Lush grazing pastures & modern dairy barns in Arjundhara, Koshi' 
                      : 'अर्जुनधाराको स्वच्छ हरियालीमा अवस्थित कृष्ण गाई फार्म'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
