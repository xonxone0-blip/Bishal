import React from 'react';
import { 
  Wifi, 
  Coffee, 
  Trees, 
  SunMedium, 
  Calendar, 
  Check, 
  Sparkles, 
  BatteryCharging,
  ArrowRight,
  Laptop
} from 'lucide-react';
import { COWORKING_FEATURES, BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface CoworkingSectionProps {
  language: Language;
  onOpenBookingModal: () => void;
}

export const CoworkingSection: React.FC<CoworkingSectionProps> = ({
  language,
  onOpenBookingModal,
}) => {
  return (
    <section id="coworking" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual feature */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-stone-200 group">
              <img
                src="/src/assets/images/farm_coworking_patio_1791108252213.jpg"
                alt="Krishina Gai Farm Coworking Space in Arjundhara"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Laptop className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'en' ? 'Verified Google Coworking Space' : 'गुगलमा प्रमाणित काउवर्किङ स्पेस'}</span>
              </div>
            </div>

            {/* Quick pricing tier grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'en' ? 'Day Pass' : 'दैनिक पास'}
                </span>
                <span className="text-base sm:text-lg font-bold text-stone-900">रू २५०</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  {language === 'en' ? 'Full day + Tea' : 'दिनभर + चिया'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center relative">
                <span className="text-[11px] font-bold text-emerald-800 block">
                  {language === 'en' ? 'Weekly Pass' : 'साप्ताहिक पास'}
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-900">रू १,४००</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">
                  {language === 'en' ? 'Best value' : 'उत्तम बचत'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center">
                <span className="text-[11px] font-medium text-stone-500 block">
                  {language === 'en' ? 'Student / Scholar' : 'विद्यार्थी छुट'}
                </span>
                <span className="text-base sm:text-lg font-bold text-stone-900">रू १५०</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  {language === 'en' ? 'Valid ID card' : 'परिचयपत्रसहित'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial story & feature checklist */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              {/* Zero-Pill metadata kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <span>{language === 'en' ? 'Work From Nature' : 'प्रकृतिको काखमा काम'}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Arjundhara, Koshi Province</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                {language === 'en' 
                  ? 'Koshi’s Most Peaceful Coworking Space & Farm Retreat' 
                  : 'कोशी प्रदेशकै शान्त तथा मौलिक कृषि काउवर्किङ रिट्रिट'}
              </h2>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {language === 'en' ? (
                'Escape concrete cubicles and city traffic. Krishina Gai Farm offers outdoor covered desks, reliable high-speed fiber internet with solar backup, fresh morning cow milk tea, and panoramic views of peaceful grazing pastures in Arjundhara.'
              ) : (
                'सहरको धूवाँ-धुलो र कोलाहलबाट टाढा, स्वच्छ हावा र चराहरूको चिरबिरका बीच शान्तिसँग आफ्नो कम्प्युटरमा काम गर्नुहोस् वा अध्ययन गर्नुहोस्। यहाँ सोलार ब्याकअपसहितको फास्ट इन्टरनेट र अर्गानिक ताजा दूधको चिया उपलब्ध छ।'
              )}
            </p>

            {/* Feature list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {COWORKING_FEATURES.map((feat, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{language === 'en' ? feat.title : feat.nepaliTitle}</span>
                  </h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed pl-5">
                    {language === 'en' ? feat.desc : feat.nepaliDesc}
                  </p>
                </div>
              ))}
            </div>

            {/* Single primary CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-800 rounded-xl hover:bg-emerald-900 transition-colors shadow-2xs active:scale-[0.98]"
              >
                <Calendar className="w-4 h-4" />
                <span>{language === 'en' ? 'Reserve Your Work Desk / Day Pass' : 'काउवर्किङ डेस्क सिट बुकिङ गर्नुहोस्'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
