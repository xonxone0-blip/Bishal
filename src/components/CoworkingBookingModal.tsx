import React, { useState } from 'react';
import { X, Calendar, Laptop, Users, Send, Phone, Check, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface CoworkingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onShowToast: (message: string) => void;
}

export const CoworkingBookingModal: React.FC<CoworkingBookingModalProps> = ({
  isOpen,
  onClose,
  language,
  onShowToast,
}) => {
  const [passType, setPassType] = useState<'day' | 'weekly' | 'student' | 'tour'>('day');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [guests, setGuests] = useState(1);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const prices = {
    day: 250,
    weekly: 1400,
    student: 150,
    tour: 100,
  };

  const passLabels = {
    day: language === 'en' ? 'Coworking Day Pass (रू 250/day)' : 'काउवर्किङ दैनिक पास (रू २५०)',
    weekly: language === 'en' ? 'Weekly Work Pass (रू 1,400/wk)' : 'साप्ताहिक पास (रू १,४००)',
    student: language === 'en' ? 'Student Scholar Pass (रू 150/day)' : 'विद्यार्थी पास (रू १५०)',
    tour: language === 'en' ? 'Guided Farm Tour & Gau-Seva (रू 100/person)' : 'फार्म भ्रमण तथा गौ-सेवा (रू १००)',
  };

  const totalPrice = prices[passType] * guests;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorPhone) {
      onShowToast(language === 'en' ? 'Please fill in your name and phone number.' : 'कृपया नाम र फोन नम्बर प्रविष्ट गर्नुहोस्।');
      return;
    }

    const message = encodeURIComponent(
      `*Krishina Gai Farm - Visit / Coworking Reservation*\n` +
      `------------------------------------------\n` +
      `*Booking Type:* ${passLabels[passType]}\n` +
      `*Date of Visit:* ${date}\n` +
      `*Number of Guests:* ${guests}\n` +
      `*Total Estimated:* रू ${totalPrice.toLocaleString()}\n\n` +
      `*Guest Name:* ${visitorName}\n` +
      `*Phone Number:* ${visitorPhone}\n` +
      (notes ? `*Special Requirements:* ${notes}\n` : '') +
      `------------------------------------------\n` +
      `Location: Arjundhara, Koshi Province 57205 (Plus Code: M2W8+J9)`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`, '_blank');
    onShowToast(language === 'en' ? 'Reservation submitted via WhatsApp!' : 'बुकिङ विवरण पठाइयो!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full my-8 overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-600/40 shrink-0 bg-white">
              <img
                src={BUSINESS_INFO.logo}
                alt="Krishina Gai Farm Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'en' ? 'Reserve Workspace / Farm Visit' : 'काउवर्किङ वा फार्म भ्रमण बुकिङ'}
              </h3>
              <p className="text-xs text-stone-300">
                Krishina Gai Farm · Arjundhara (Open 6 AM – 7 PM)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleBooking} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Select Pass Type */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
              {language === 'en' ? 'Select Experience' : 'अनुभव छान्नुहोस्'}
            </label>
            <div className="space-y-2">
              {(['day', 'weekly', 'student', 'tour'] as const).map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    passType === type
                      ? 'border-emerald-700 bg-emerald-50/70 font-semibold text-emerald-950'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                    <input
                      type="radio"
                      name="passType"
                      checked={passType === type}
                      onChange={() => setPassType(type)}
                      className="text-emerald-700 focus:ring-emerald-700"
                    />
                    <span>{passLabels[type]}</span>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    रू {prices[type].toLocaleString()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Date & Guests */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Date of Visit *' : 'भ्रमण मिति *'}
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Number of Guests' : 'पाहुना संख्या'}
              </label>
              <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="w-9 h-10 bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-xs sm:text-sm tabular-nums">
                  {guests}
                </span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => g + 1)}
                  className="w-9 h-10 bg-stone-100 text-stone-700 font-bold hover:bg-stone-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Guest Name & Phone */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Your Name *' : 'तपाईंको नाम *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'en' ? 'e.g. Anup Nepal' : 'उदा. अनुप नेपाल'}
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Phone Number *' : 'सम्पर्क नम्बर *'}
              </label>
              <input
                type="tel"
                required
                placeholder="98XXXXXXXX"
                value={visitorPhone}
                onChange={(e) => setVisitorPhone(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Notes or Inquiries (Optional)' : 'थप जिज्ञासा वा अनुरोध'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'en' ? 'e.g. Need quiet corner for Zoom call' : 'उदा. बैठकका लागि शान्त स्थान आवश्यक'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs sm:text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Total & Submit */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-stone-500 block">Total Est.</span>
              <span className="text-lg font-bold text-stone-900">
                रू {totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 py-2.5 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'en' ? 'Confirm Reservation' : 'बुकिङ सुरक्षित गर्नुहोस्'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
