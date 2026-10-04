import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  Compass, 
  Bookmark, 
  Share2, 
  Smartphone, 
  Clock, 
  Eye, 
  Check, 
  ExternalLink,
  Info,
  Navigation,
  Sparkles
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface GoogleProfileCardProps {
  language: Language;
  onOpenDirections: () => void;
  onOpenReviewModal: () => void;
  onShowToast: (message: string) => void;
}

export const GoogleProfileCard: React.FC<GoogleProfileCardProps> = ({
  language,
  onOpenDirections,
  onOpenReviewModal,
  onShowToast,
}) => {
  const [isSaved, setIsSaved] = useState(true);
  const [savedCount, setSavedCount] = useState(24);
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleToggleSave = () => {
    if (isSaved) {
      setIsSaved(false);
      setSavedCount((prev) => prev - 1);
      onShowToast(language === 'en' ? 'Removed from Starred places' : 'तपाईंको सेभ गरिएको सूचीबाट हटाइयो');
    } else {
      setIsSaved(true);
      setSavedCount((prev) => prev + 1);
      onShowToast(language === 'en' ? 'Saved to Starred places on Google Maps' : 'गुगल म्याप्समा सेभ गरियो!');
    }
  };

  const handleCopyPlusCode = () => {
    navigator.clipboard.writeText(BUSINESS_INFO.plusCodeShort);
    setCopiedPlusCode(true);
    onShowToast(`Plus Code ${BUSINESS_INFO.plusCodeShort} copied to clipboard!`);
    setTimeout(() => setCopiedPlusCode(false), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Krishina Gai Farm - Arjundhara',
      text: 'Krishina Gai Farm in Arjundhara, Koshi Province (5.0★ Google rating, Coworking space & Pure Cow Dairy). Phone: 981-5945847',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled or unsupported
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      onShowToast(language === 'en' ? 'Farm link copied to clipboard!' : 'लिङ्क कपी गरियो!');
    }
  };

  const handleSendToPhone = () => {
    const message = encodeURIComponent(
      `Krishina gai farm\nRating: 5.0 (8 reviews)\nCoworking space & Dairy Farm\nLocation: Arjundhara, Koshi Province 57205\nPhone: 981-5945847\nPlus Code: M2W8+J9\nWebsite: ${window.location.href}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm overflow-hidden text-stone-800">
      {/* Google Business Profile Header Header Bar */}
      <div className="bg-stone-50 px-5 py-3 border-b border-stone-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Google "G" themed badge */}
          <div className="w-5 h-5 rounded-full bg-white shadow-xs flex items-center justify-center font-bold text-xs">
            <span className="text-blue-600">G</span>
          </div>
          <span className="text-xs font-semibold text-stone-600 uppercase tracking-wider">
            Google Business Profile
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
          <Eye className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-stone-700">{BUSINESS_INFO.views}</span> views
        </div>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Title, Category & Ratings */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-stone-200 shadow-xs shrink-0 bg-white">
            <img
              src={BUSINESS_INFO.logo}
              alt="Krishina Gai Farm Logo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-tight">
                {BUSINESS_INFO.name}
              </h2>
            </div>
            <p className="text-sm text-stone-500 font-medium mt-0.5">
              {language === 'ne' ? BUSINESS_INFO.nepaliName : 'Krishna Cow Dairy & Agro-Coworking'}
            </p>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded text-amber-900 font-bold text-sm">
                <span className="font-bold text-amber-700">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <button
                onClick={onOpenReviewModal}
                className="text-xs text-stone-600 hover:text-emerald-800 font-medium underline underline-offset-2"
              >
                ({BUSINESS_INFO.reviewCount} {language === 'en' ? 'reviews' : 'समीक्षा'})
              </button>
              <span className="text-stone-300">·</span>
              <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                {language === 'en' ? 'Coworking space' : 'काउवर्किङ स्पेस'}
              </span>
            </div>
          </div>
        </div>

        {/* Google Primary Action Grid (Directions, Saved, Share, Send to phone) */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2 border-t border-b border-stone-100 py-3">
          <button
            onClick={onOpenDirections}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
              <Navigation className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-700 mt-1.5">
              {language === 'en' ? 'Directions' : 'दिशा'}
            </span>
          </button>

          <button
            onClick={handleToggleSave}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors group text-center"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
              isSaved 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-stone-100 text-stone-600 group-hover:bg-amber-50 group-hover:text-amber-600'
            }`}>
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </div>
            <span className="text-xs font-semibold text-stone-700 mt-1.5">
              {isSaved ? (language === 'en' ? 'Saved' : 'सेभ गरिएको') : (language === 'en' ? 'Save' : 'सेभ')}
            </span>
          </button>

          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-700 mt-1.5">
              {language === 'en' ? 'Call' : 'कल'}
            </span>
          </a>

          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center group-hover:bg-stone-800 group-hover:text-white transition-all shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-700 mt-1.5">
              {language === 'en' ? 'Share' : 'शेयर'}
            </span>
          </button>

          <button
            onClick={handleSendToPhone}
            className="hidden sm:flex flex-col items-center justify-center p-2 rounded-xl hover:bg-stone-50 transition-colors group text-center"
          >
            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-700 flex items-center justify-center group-hover:bg-violet-700 group-hover:text-white transition-all shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-stone-700 mt-1.5 whitespace-nowrap">
              {language === 'en' ? 'Send to phone' : 'फोनमा पठाउनुहोस्'}
            </span>
          </button>
        </div>

        {/* Location & Metadata Details */}
        <div className="space-y-3 text-sm text-stone-600">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <span className="font-semibold text-stone-900 block">
                {BUSINESS_INFO.address}
              </span>
              <span className="text-xs text-stone-500">
                {language === 'en' ? 'Jhapa District, Eastern Nepal' : 'झापा जिल्ला, पूर्वाञ्चल नेपाल'}
              </span>
            </div>
          </div>

          {/* Plus Code */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-stone-400 shrink-0" />
              <div>
                <span className="font-semibold text-stone-900">{BUSINESS_INFO.plusCodeShort}</span>
                <span className="text-stone-500 text-xs ml-1.5">Arjundhara, Koshi</span>
              </div>
            </div>
            <button
              onClick={handleCopyPlusCode}
              className="text-xs font-medium px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            >
              {copiedPlusCode ? 'Copied!' : 'Copy Code'}
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-stone-400 shrink-0" />
              <a
                href={`tel:${BUSINESS_INFO.phone}`}
                className="font-semibold text-stone-900 hover:text-emerald-700 transition-colors"
              >
                {BUSINESS_INFO.phone}
              </a>
            </div>
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="text-xs text-emerald-800 font-semibold hover:underline"
            >
              {language === 'en' ? 'Call Now' : 'अहिले कल गर्नुहोस्'}
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-stone-400 shrink-0" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                Open Now
              </span>
              <span className="text-stone-700 text-xs">
                {BUSINESS_INFO.openingHours} · {BUSINESS_INFO.openDays}
              </span>
            </div>
          </div>
        </div>

        {/* Suggest edit & Review CTA */}
        <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
          <button
            onClick={onOpenReviewModal}
            className="font-medium text-emerald-800 hover:underline flex items-center gap-1"
          >
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>{language === 'en' ? 'Write a review' : 'समीक्षा लेख्नुहोस्'}</span>
          </button>
          <span className="text-stone-400">
            {isSaved ? '★ Saved in Starred places' : 'Save for offline access'}
          </span>
        </div>
      </div>
    </div>
  );
};
