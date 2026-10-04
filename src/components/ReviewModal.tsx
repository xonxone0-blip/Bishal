import React, { useState } from 'react';
import { X, Star, Send, ShieldCheck } from 'lucide-react';
import { Review, Language } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onAddReview: (review: Review) => void;
  onShowToast: (message: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  language,
  onAddReview,
  onShowToast,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [userType, setUserType] = useState<Review['userType']>('Local Customer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) {
      onShowToast(language === 'en' ? 'Please provide your name and review text.' : 'कृपया नाम र समीक्षा लेख्नुहोस्।');
      return;
    }

    const initials = author
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      nepaliAuthor: author.trim(),
      rating,
      date: 'Just now',
      nepaliDate: 'भर्खरै',
      comment: comment.trim(),
      nepaliComment: comment.trim(),
      userType,
      avatarInitials: initials || 'KG',
      likes: 1,
    };

    onAddReview(newReview);
    onShowToast(language === 'en' ? 'Thank you! Your 5.0 review was posted.' : 'धन्यवाद! तपाईंको समीक्षा प्रकाशित भयो।');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base sm:text-lg">
              {language === 'en' ? 'Write a Google Review' : 'गुगल समीक्षा लेख्नुहोस्'}
            </h3>
            <p className="text-xs text-stone-300">
              Krishina Gai Farm · Arjundhara, Koshi
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Star selector */}
          <div className="text-center py-2 bg-stone-50 rounded-xl border border-stone-100">
            <span className="text-xs font-semibold text-stone-500 block mb-2">
              {language === 'en' ? 'Tap stars to rate your experience' : 'अनुभव अनुसार तारा छान्नुहोस्'}
            </span>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 text-stone-300 transition-transform hover:scale-110 focus:outline-hidden"
                >
                  <Star
                    className={`w-7 h-7 ${
                      (hoverRating || rating) >= star
                        ? 'text-amber-400 fill-current'
                        : 'text-stone-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-700 mt-1 block">
              {rating === 5 ? '5.0 / 5.0 (Exceptional)' : `${rating}.0 / 5.0`}
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {language === 'en' ? 'Your Name *' : 'तपाईंको नाम *'}
            </label>
            <input
              type="text"
              required
              placeholder={language === 'en' ? 'e.g. Bipin Dahal' : 'उदा. बिपिन दाहाल'}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {language === 'en' ? 'Your Experience Type' : 'तपाईंको अनुभवको प्रकार'}
            </label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value as any)}
              className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
            >
              <option value="Local Customer">Local Dairy Customer (स्थानीय दूध ग्राहक)</option>
              <option value="Coworker / Digital Nomad">Coworker / Remote Worker (काउवर्किङ पाहुना)</option>
              <option value="Farm Visitor">Farm Visitor & Gau-Seva (फार्म भ्रमण)</option>
              <option value="Tea Farmer">Farmer / Organic Agriculture (किसान)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              {language === 'en' ? 'Your Review *' : 'तपाईंको समीक्षा *'}
            </label>
            <textarea
              required
              rows={4}
              placeholder={language === 'en' 
                ? 'Share details about the milk freshness, Danedar ghee, cow welfare, or quiet coworking environment...'
                : 'दूधको शुद्धता, दानेदार घिउ, गाईहरूको स्याहार वा काउवर्किङको शान्त वातावरण बारे लेख्नुहोस्...'}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold rounded-lg text-stone-600 hover:bg-stone-100 transition-colors"
            >
              {language === 'en' ? 'Cancel' : 'रद्द गर्नुहोस्'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Post Review' : 'समीक्षा पेश गर्नुहोस्'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
