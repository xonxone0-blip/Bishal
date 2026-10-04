import React from 'react';
import { Heart, Sparkles, Shield, Users, Sun, CheckCircle } from 'lucide-react';
import { Language } from '../types';

interface FarmLifeSectionProps {
  language: Language;
  onOpenBookingModal: () => void;
}

export const FarmLifeSection: React.FC<FarmLifeSectionProps> = ({
  language,
  onOpenBookingModal,
}) => {
  return (
    <section id="farm-life" className="py-16 sm:py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Story & Practices */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
                <span>{language === 'en' ? 'Ethical Dairy & Gau-Seva' : 'गौ-सेवा तथा मर्यादित पशुपालन'}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Arjundhara</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight leading-tight">
                {language === 'en'
                  ? 'Healthy, Happy Cows Grazing on Natural Napier Grass'
                  : 'प्राकृतिक वातावरणमा हुर्किएका स्वस्थ, सुखी र मायालु गाईहरू'}
              </h2>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {language === 'en' ? (
                'At Krishina Gai Farm, we practice humane, non-industrial dairy farming. Our cows are never tied down for endless hours or injected with hormones. They graze freely, listen to soothing devotional music, and are fed fresh green grass, organic oil-cake, and mineral supplements.'
              ) : (
                'हाम्रो फार्ममा गाईहरूलाई कुनै प्रकारको केमिकल वा हर्मोन सुई दिइँदैन। हरियो नेपियर घाँस, चोकर, पिना र सफा पिउने पानीका साथ तिनीहरूको स्याहार गरिन्छ। यहाँ दूध दुहुनुअघि बाच्छाबाच्छीलाई पेटभरि दूध चुस्न दिइन्छ।'
              )}
            </p>

            {/* Principles */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/80">
                <Heart className="w-4 h-4 text-rose-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Calves Fed First (बाच्छाबाच्छीको पहिलो अधिकार)' : 'बाच्छाबाच्छीलाई पहिले दूध'}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'en'
                      ? 'Calves are nourished first until satisfied before any morning or evening milk collection.'
                      : 'बाच्छाबाच्छीलाई अघाउञ्जेल दूध खान दिएर मात्र बाँकी दूध संकलन गरिन्छ।'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/80">
                <Sun className="w-4 h-4 text-amber-500 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Open Pasture Grazing' : 'खुला चरन र स्वच्छ हावा'}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'en'
                      ? 'Ample sunlight, clean bedding, rubber mats, and fresh mountain breezes from the Koshi foothills.'
                      : 'उज्यालो, सफा र हावादार गोठमा रबर म्याट तथा खुला चरनको सुविधा।'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-stone-200/80">
                <Users className="w-4 h-4 text-emerald-600 mt-1 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-stone-900">
                    {language === 'en' ? 'Family & Student Farm Visits' : 'पारिवारिक तथा शैक्षिक भ्रमण'}
                  </h4>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    {language === 'en'
                      ? 'Bring your children to touch the cows, understand agriculture, and experience authentic village life.'
                      : 'बालबालिकालाई गाई फार्म देखाउन, घाँस खुवाउन र कृषि प्रणाली बुझाउन स्वागत छ।'}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBookingModal}
                className="px-5 py-2.5 text-xs font-semibold rounded-lg bg-stone-900 text-white hover:bg-stone-800 transition-colors"
              >
                {language === 'en' ? 'Schedule a Farm Visit' : 'फार्म भ्रमणको समय तालिका बनाउनुहोस्'}
              </button>
            </div>
          </div>

          {/* Right Column: Visual photo of healthy cows */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-sm border border-stone-200 group">
              <img
                src="/src/assets/images/healthy_cows_barn_1791108272513.jpg"
                alt="Healthy cows at Krishina Gai Farm Arjundhara"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <p className="text-xs uppercase tracking-wider font-semibold text-amber-300">
                    {language === 'en' ? 'Arjundhara, Koshi' : 'अर्जुनधारा, कोशी'}
                  </p>
                  <p className="text-sm font-medium">
                    {language === 'en' 
                      ? 'Jersey & local crossbred cows enjoying green grass feeds' 
                      : 'स्वस्थ र दुधिला गाईहरू पोसिलो हरियो घाँस खाँदै'}
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
