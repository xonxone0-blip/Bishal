import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Phone, Send, Check, ShieldCheck, Truck, Milk } from 'lucide-react';
import { PRODUCTS, BUSINESS_INFO } from '../data/farmData';
import { Product, Language } from '../types';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProduct?: Product | null;
  initialQuantity?: number;
  initialIsSubscription?: boolean;
  language: Language;
  onShowToast: (message: string) => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  selectedProduct,
  initialQuantity = 1,
  initialIsSubscription = false,
  language,
  onShowToast,
}) => {
  const [product, setProduct] = useState<Product>(selectedProduct || PRODUCTS[0]);
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isSubscription, setIsSubscription] = useState<boolean>(initialIsSubscription);
  const [deliveryShift, setDeliveryShift] = useState<'morning' | 'evening' | 'both'>('morning');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (selectedProduct) {
      setProduct(selectedProduct);
    }
    setQuantity(initialQuantity);
    setIsSubscription(initialIsSubscription);
  }, [selectedProduct, initialQuantity, initialIsSubscription]);

  if (!isOpen) return null;

  const calculateTotal = () => {
    if (isSubscription) {
      const timesPerDay = deliveryShift === 'both' ? 2 : 1;
      return product.price * quantity * timesPerDay * 30;
    }
    return product.price * quantity;
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      onShowToast(language === 'en' ? 'Please fill in your name, phone, and delivery address.' : 'कृपया नाम, फोन र ठेगाना भर्नुहोस्।');
      return;
    }

    const orderType = isSubscription 
      ? `30-Day Daily Subscription (${deliveryShift.toUpperCase()})` 
      : 'One-time Order';

    const message = encodeURIComponent(
      `*Krishina Gai Farm Order*\n` +
      `-------------------------\n` +
      `*Item:* ${product.name} (${product.nepaliName})\n` +
      `*Type:* ${orderType}\n` +
      `*Quantity:* ${quantity} ${product.unit} ${isSubscription ? '/ day' : ''}\n` +
      `*Total Price:* रू ${calculateTotal().toLocaleString()}\n\n` +
      `*Customer Details:*\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `*Address:* ${customerAddress}\n` +
      (notes ? `*Special Notes:* ${notes}\n` : '') +
      `-------------------------\n` +
      `Order sent from website for Arjundhara / Koshi delivery.`
    );

    window.open(`https://wa.me/${BUSINESS_INFO.whatsapp}?text=${message}`, '_blank');
    onShowToast(language === 'en' ? 'Order dispatched via WhatsApp!' : 'अर्डर ह्वाट्सएपमार्फत पठाइयो!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full my-8 overflow-hidden shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-700 shrink-0 bg-white">
              <img
                src={BUSINESS_INFO.logo}
                alt="Krishina Gai Farm Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                {language === 'en' ? 'Order Fresh Farm Dairy' : 'ताजा दुग्ध उत्पादन अर्डर'}
              </h3>
              <p className="text-xs text-emerald-200">
                Krishina Gai Farm · Arjundhara, Koshi · 981-5945847
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleWhatsAppOrder} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Select Product */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              {language === 'en' ? 'Select Product' : 'सामान छान्नुहोस्'}
            </label>
            <select
              value={product.id}
              onChange={(e) => {
                const found = PRODUCTS.find((p) => p.id === e.target.value);
                if (found) setProduct(found);
              }}
              className="w-full text-sm font-semibold p-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
            >
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} (रू {p.price.toLocaleString()} / {p.unit})
                </option>
              ))}
            </select>
          </div>

          {/* Mode: One-time vs Subscription (if milk) */}
          {product.category === 'milk' && (
            <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-2">
              <span className="text-xs font-bold text-emerald-900 block">
                {language === 'en' ? 'Order Frequency' : 'अर्डरको प्रकार'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubscription(false)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    !isSubscription
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {language === 'en' ? 'One-time Delivery' : 'एक पटकको अर्डर'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscription(true)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    isSubscription
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {language === 'en' ? 'Daily 30-Day Subscription' : 'मासिक दैनिक सदस्यता'}
                </button>
              </div>

              {isSubscription && (
                <div className="pt-2">
                  <label className="text-[11px] font-medium text-emerald-900 block mb-1">
                    {language === 'en' ? 'Preferred Delivery Shift' : 'डेलिभरी समय'}
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {(['morning', 'evening', 'both'] as const).map((shift) => (
                      <button
                        key={shift}
                        type="button"
                        onClick={() => setDeliveryShift(shift)}
                        className={`py-1.5 rounded-md border text-[11px] font-medium transition-all ${
                          deliveryShift === shift
                            ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                            : 'bg-white text-stone-600 border-stone-300'
                        }`}
                      >
                        {shift.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quantity Selector */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              {language === 'en' ? 'Quantity' : 'परिमाण'} ({product.unit} {isSubscription ? '/ day' : ''})
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-lg flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="text-lg font-bold text-stone-900 w-12 text-center tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-lg flex items-center justify-center transition-colors"
              >
                +
              </button>
              <div className="ml-auto text-right">
                <span className="text-xs text-stone-500 block">Subtotal</span>
                <span className="text-base font-bold text-emerald-800">
                  रू {calculateTotal().toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Customer info fields */}
          <div className="space-y-3 pt-2 border-t border-stone-200">
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Your Name *' : 'तपाईंको पूरा नाम *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'en' ? 'e.g. Ramesh Adhikari' : 'उदा. रमेश अधिकारी'}
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
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
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Delivery Address (Arjundhara / Jhapa / Koshi) *' : 'डेलिभरी गर्ने ठेगाना *'}
              </label>
              <input
                type="text"
                required
                placeholder={language === 'en' ? 'e.g. Arjundhara Ward-2, near school' : 'उदा. अर्जुनधारा वडा नं २, मन्दिर नजिक'}
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                {language === 'en' ? 'Special Instructions / Notes (Optional)' : 'थप जानकारी (ऐच्छिक)'}
              </label>
              <textarea
                rows={2}
                placeholder={language === 'en' ? 'e.g. Ring bell at morning, or call before arrival' : 'उदा. बिहान घण्टी बजाउनुहोला'}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-sm p-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:outline-hidden resize-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-sm shadow-xs transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>
                {language === 'en' 
                  ? `Send Order via WhatsApp (रू ${calculateTotal().toLocaleString()})` 
                  : `ह्वाट्सएपमार्फत अर्डर पठाउनुहोस् (रू ${calculateTotal().toLocaleString()})`}
              </span>
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{language === 'en' ? `Or Call to Order: ${BUSINESS_INFO.phone}` : `वा सिधै फोन गर्नुहोस्: ${BUSINESS_INFO.phone}`}</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
