import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/farmData';
import { Review, Language } from '../types';

interface ReviewsSectionProps {
  language: Language;
  onOpenReviewModal: () => void;
  reviews: Review[];
  onToggleLikeReview: (id: string) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  language,
  onOpenReviewModal,
  reviews,
  onToggleLikeReview,
}) => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
              <span>{language === 'en' ? 'Community Trust' : 'ग्राहकको विश्वास'}</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>{language === 'en' ? 'Verified Google Reviews' : 'गुगलमा प्रमाणित समीक्षा'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
              {language === 'en' ? 'Rated 5.0 out of 5 Stars' : '५.० तारा उत्कृष्ट मूल्यांकन'}
            </h2>
            <p className="mt-2 text-sm text-stone-600 max-w-xl">
              {language === 'en'
                ? `Direct feedback from our local milk subscribers, pure ghee lovers, and coworking guests across Jhapa and Koshi Province.`
                : 'झापा तथा कोशी प्रदेशका हाम्रा दूध ग्राहक, घिउ पारखी र काउवर्किङ पाहुनाहरूका वास्तविक अनुभवहरू।'}
            </p>
          </div>

          {/* Action to write a review */}
          <button
            onClick={onOpenReviewModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs whitespace-nowrap self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>{language === 'en' ? 'Write a Google Review' : 'समीक्षा थप्नुहोस्'}</span>
          </button>
        </div>

        {/* Rating Summary Scorecard */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Score box */}
            <div className="md:col-span-4 text-center md:text-left md:border-r md:border-stone-200 md:pr-8">
              <div className="text-5xl font-black text-stone-900 tracking-tight">5.0</div>
              <div className="flex items-center justify-center md:justify-start text-amber-400 gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-stone-600 font-medium">
                {language === 'en'
                  ? `Based on ${reviews.length} Google Reviews`
                  : `${reviews.length} वटा गुगल समीक्षाहरूमा आधारित`}
              </p>
              <div className="mt-2 flex items-center justify-center md:justify-start gap-1.5 text-xs text-emerald-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>100% 5-Star Recommendation</span>
              </div>
            </div>

            {/* Stars Breakdown */}
            <div className="md:col-span-8 space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = stars === 5 ? 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 text-stone-600 font-medium">{stars} stars</span>
                    <div className="flex-1 h-2.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-stone-500 text-right tabular-nums">
                      {stars === 5 ? reviews.length : 0}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-900 font-bold text-sm flex items-center justify-center border border-emerald-200">
                      {rev.avatarInitials}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {language === 'en' ? rev.author : rev.nepaliAuthor}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-stone-500">
                        <span>{language === 'en' ? rev.userType : rev.userType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{language === 'en' ? rev.date : rev.nepaliDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Comment body */}
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed pt-1">
                  "{language === 'en' ? rev.comment : rev.nepaliComment}"
                </p>
              </div>

              {/* Card Footer: Helpful button */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] text-stone-400">Google Verified Profile</span>
                <button
                  onClick={() => onToggleLikeReview(rev.id)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:bg-stone-100 text-stone-600 hover:text-emerald-800 transition-colors"
                  title="Mark as helpful"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
