import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Compass, 
  Phone, 
  Clock, 
  ExternalLink, 
  Copy, 
  Check, 
  Car,
  Bike
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface DirectionsLocationProps {
  language: Language;
  onShowToast: (message: string) => void;
}

export const DirectionsLocation: React.FC<DirectionsLocationProps> = ({
  language,
  onShowToast,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.plusCode);
    setCopiedCode(true);
    onShowToast(`Plus Code ${BUSINESS_INFO.plusCodeShort} copied to clipboard!`);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const openGoogleMapsDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        `${BUSINESS_INFO.name}, Arjundhara, Koshi Province 57205`
      )}&destination_place_id=${encodeURIComponent(BUSINESS_INFO.plusCodeShort)}`,
      '_blank'
    );
  };

  return (
    <section id="location" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Find Us on Google Maps' : 'गुगल म्याप्समा हामीलाई भेट्नुहोस्'}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>Plus Code: M2W8+J9</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {language === 'en' ? 'Visit Krishina Gai Farm in Arjundhara' : 'अर्जुनधारामा कृष्ण गाई फार्मको भ्रमण गर्नुहोस्'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-stone-600">
            {language === 'en'
              ? 'Conveniently located just minutes from Arjundhara Jaleshwar Dham and Birtamode in Koshi Province, Nepal.'
              : 'अर्जुनधारा जलेश्वर धाम र बिर्तामोडबाट केही मिनेटको दूरीमा शान्त वातावरणमा अवस्थित।'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Distance Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  {language === 'en' ? 'Official Location' : 'आधिकारिक ठेगाना'}
                </span>
                <h3 className="text-xl font-bold text-stone-900 mt-1">
                  {language === 'en' ? 'Krishina Gai Farm' : 'कृष्ण गाई फार्म'}
                </h3>
                <p className="text-sm text-stone-600 mt-1">
                  Arjundhara, Koshi Province 57205, Nepal
                </p>
              </div>

              {/* Plus code pill */}
              <div className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                    Google Plus Code
                  </span>
                  <span className="text-base font-bold text-stone-900 font-mono">
                    {BUSINESS_INFO.plusCodeShort}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Phone & hours */}
              <div className="space-y-3 pt-2 border-t border-stone-200 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-stone-700">
                    <Phone className="w-4 h-4 text-emerald-700" />
                    <span className="font-semibold">{BUSINESS_INFO.phone}</span>
                  </div>
                  <a
                    href={`tel:${BUSINESS_INFO.phone}`}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    {language === 'en' ? 'Call Directly' : 'सिधै फोन गर्नुहोस्'}
                  </a>
                </div>

                <div className="flex items-center gap-2.5 text-stone-700 text-xs sm:text-sm">
                  <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>{BUSINESS_INFO.openingHours}</strong> · Open 7 Days a Week
                  </span>
                </div>
              </div>

              {/* Primary Directions CTA */}
              <button
                onClick={openGoogleMapsDirections}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>{language === 'en' ? 'Get Directions on Google Maps' : 'गुगल म्याप्समा दिशा हेर्नुहोस्'}</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
              </button>
            </div>

            {/* Travel Distances */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {language === 'en' ? 'Nearby Landmarks & Travel Time' : 'नजिकका स्थानहरू र लाग्ने समय'}
              </h4>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                  <span className="font-medium text-stone-800">Arjundhara Jaleshwar Dham Mandir</span>
                  <span className="font-bold text-stone-900">1.5 km (~4 mins)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                  <span className="font-medium text-stone-800">Shanischare Bazaar</span>
                  <span className="font-bold text-stone-900">3.2 km (~8 mins)</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-stone-200/60">
                  <span className="font-medium text-stone-800">Birtamode Mukti Chowk</span>
                  <span className="font-bold text-stone-900">6.8 km (~15 mins)</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-stone-800">Damak Chowk (via Highway)</span>
                  <span className="font-bold text-stone-900">22 km (~40 mins)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Map Simulation Card with Map Pins */}
          <div className="lg:col-span-7 bg-stone-100 rounded-2xl border border-stone-200 overflow-hidden relative min-h-[420px] flex flex-col justify-between shadow-2xs">
            {/* Interactive Top map status bar */}
            <div className="bg-white/95 backdrop-blur-md p-4 border-b border-stone-200 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-800">
                  Interactive Map View · Arjundhara (M2W8+J9)
                </span>
              </div>
              <button
                onClick={openGoogleMapsDirections}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <span>View Fullscreen</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            {/* Stylized Map Canvas */}
            <div className="relative flex-1 bg-[#e8ece9] flex items-center justify-center p-6 overflow-hidden">
              {/* Map grid lines simulation */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(#15803d 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }} />

              {/* Roads graphic representation */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 400 300">
                <path d="M 0,150 Q 150,140 200,160 T 400,130" fill="none" stroke="#fff" strokeWidth="18" />
                <path d="M 200,0 L 200,300" fill="none" stroke="#fff" strokeWidth="14" />
                <path d="M 50,300 Q 180,220 200,160 T 350,0" fill="none" stroke="#fed7aa" strokeWidth="8" />
              </svg>

              {/* Krishina Gai Farm Map Marker Pin */}
              <div className="relative z-20 flex flex-col items-center animate-bounce-subtle cursor-pointer" onClick={openGoogleMapsDirections}>
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-stone-200 flex items-center gap-2 mb-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block leading-none">
                      Krishina gai farm
                    </span>
                    <span className="text-[10px] text-amber-600 font-semibold">
                      ★ 5.0 (8 Google Reviews)
                    </span>
                  </div>
                </div>

                {/* Pin Head */}
                <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl border-2 border-white">
                  <MapPin className="w-6 h-6 fill-current text-white" />
                </div>
                <div className="w-3 h-1.5 bg-black/30 rounded-full mt-0.5 filter blur-[1px]" />
              </div>

              {/* Nearby landmark indicators */}
              <div className="absolute top-10 left-8 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-700 shadow-2xs border border-stone-200">
                Arjundhara Dham Mandir (1.5 km)
              </div>
              <div className="absolute bottom-10 right-8 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-stone-700 shadow-2xs border border-stone-200">
                Towards Birtamode Chowk (6.8 km)
              </div>
            </div>

            {/* Bottom Actions footer */}
            <div className="bg-white p-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-stone-600 font-medium">
                GPS: 26.6854° N, 88.0021° E · Koshi Province 57205
              </span>
              <button
                onClick={openGoogleMapsDirections}
                className="px-4 py-2 font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
              >
                {language === 'en' ? 'Open in Google Maps Navigation' : 'गुगल म्याप्स नेभिगेसन खोल्नुहोस्'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
