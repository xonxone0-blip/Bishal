/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { DairyProducts } from './components/DairyProducts';
import { CoworkingSection } from './components/CoworkingSection';
import { FarmLifeSection } from './components/FarmLifeSection';
import { ReviewsSection } from './components/ReviewsSection';
import { PhotoGallery } from './components/PhotoGallery';
import { DirectionsLocation } from './components/DirectionsLocation';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { CoworkingBookingModal } from './components/CoworkingBookingModal';
import { ReviewModal } from './components/ReviewModal';
import { Toast } from './components/Toast';
import { REVIEWS, BUSINESS_INFO } from './data/farmData';
import { Product, Review, Language } from './types';
import { Phone, Navigation, ShoppingBag, Laptop } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderIsSubscription, setOrderIsSubscription] = useState(false);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ne' : 'en'));
    setToastMessage(language === 'en' ? 'नेपाली भाषामा परिवर्तन गरियो' : 'Switched to English');
  };

  const handleOpenOrderModal = (
    product?: Product,
    quantity: number = 1,
    isSubscription: boolean = false
  ) => {
    setSelectedProduct(product || null);
    setOrderQuantity(quantity);
    setOrderIsSubscription(isSubscription);
    setIsOrderModalOpen(true);
  };

  const handleAddReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleToggleLikeReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
    setToastMessage(language === 'en' ? 'Feedback marked as helpful' : 'समीक्षा उपयोगी चिन्ह लगाइयो');
  };

  const handleScrollToDirections = () => {
    const el = document.getElementById('location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 pb-16 md:pb-0">
      {/* Top Bar adhering to 3-Zone Contract */}
      <Navbar
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      <main className="flex-1">
        {/* Hero Section with Google Business Profile Integration */}
        <Hero
          language={language}
          onOpenOrderModal={() => handleOpenOrderModal()}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
          onOpenDirections={handleScrollToDirections}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
          onShowToast={(msg) => setToastMessage(msg)}
        />

        {/* Dairy Products & Daily Subscription Showcase */}
        <DairyProducts
          language={language}
          onSelectProductForOrder={(product, quantity, isSub) =>
            handleOpenOrderModal(product, quantity, isSub)
          }
        />

        {/* Coworking Space & Countryside Retreat (Directly from listing) */}
        <CoworkingSection
          language={language}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
        />

        {/* Farm Life, Happy Cows & Gau-Seva */}
        <FarmLifeSection
          language={language}
          onOpenBookingModal={() => setIsBookingModalOpen(true)}
        />

        {/* Photo Gallery & Real Farm Media */}
        <PhotoGallery language={language} />

        {/* Google Reviews Section (5.0 Stars, 8 Reviews) */}
        <ReviewsSection
          language={language}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
          reviews={reviews}
          onToggleLikeReview={handleToggleLikeReview}
        />

        {/* Location, Plus Code (M2W8+J9), Travel Times & Google Maps Directions */}
        <DirectionsLocation
          language={language}
          onShowToast={(msg) => setToastMessage(msg)}
        />
      </main>

      {/* Quiet Editorial Footer */}
      <Footer
        language={language}
        onOpenOrderModal={() => handleOpenOrderModal()}
        onOpenBookingModal={() => setIsBookingModalOpen(true)}
      />

      {/* Mobile Sticky Quick Action Bar (Under 15% Mobile Viewport Height) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${BUSINESS_INFO.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-bold"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-700" />
          <span>{language === 'en' ? 'Call' : 'कल'}</span>
        </a>

        <button
          onClick={handleScrollToDirections}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-stone-100 text-stone-800 text-xs font-bold"
        >
          <Navigation className="w-3.5 h-3.5 text-blue-600" />
          <span>{language === 'en' ? 'Directions' : 'नक्सा'}</span>
        </button>

        <button
          onClick={() => handleOpenOrderModal()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-emerald-800 text-white text-xs font-bold shadow-xs"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Order' : 'अर्डर'}</span>
        </button>
      </div>

      {/* Modals & Toast */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedProduct={selectedProduct}
        initialQuantity={orderQuantity}
        initialIsSubscription={orderIsSubscription}
        language={language}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      <CoworkingBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        language={language}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        language={language}
        onAddReview={handleAddReview}
        onShowToast={(msg) => setToastMessage(msg)}
      />

      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
