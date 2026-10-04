import React, { useState } from 'react';
import { 
  Milk, 
  ShoppingBag, 
  Check, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Truck,
  ShieldCheck 
} from 'lucide-react';
import { PRODUCTS, BUSINESS_INFO } from '../data/farmData';
import { Product, Language } from '../types';

interface DairyProductsProps {
  language: Language;
  onSelectProductForOrder: (product: Product, quantity?: number, isSubscription?: boolean) => void;
}

export const DairyProducts: React.FC<DairyProductsProps> = ({
  language,
  onSelectProductForOrder,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'milk' | 'ghee' | 'dairy' | 'manure'>('all');
  const [subLiters, setSubLiters] = useState<number>(1);
  const [subTime, setSubTime] = useState<'morning' | 'evening' | 'both'>('morning');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const calculateMonthly = () => {
    const dailyPrice = 90 * subLiters * (subTime === 'both' ? 2 : 1);
    return dailyPrice * 30;
  };

  return (
    <section id="products" className="py-16 sm:py-20 bg-stone-50 border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-2">
            <span>{language === 'en' ? 'Direct Farm Produce' : 'फार्मको ताजा उत्पादनहरू'}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{language === 'en' ? 'Purity Guaranteed' : '१००% शुद्धताको ग्यारेन्टी'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {language === 'en' 
              ? 'Pure Grass-Fed Milk, Traditional Ghee & Dairy' 
              : 'घाँसे गाईको ताजा दूध, दानेदार घिउ तथा दुग्ध परिकार'}
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'All products are produced directly at our farm in Arjundhara under hygienic conditions with zero chemicals, zero artificial additives, and zero water dilution.'
              : 'हाम्रो फार्ममा पालिएका स्वस्थ गाईहरूबाट उत्पादित दूध र परम्परागत मधानीले मन्थन गरिएको दानेदार घिउ। कुनै रसायन वा मिसावटविहीन।'}
          </p>
        </div>

        {/* Filter Tabs - Functional Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-xl max-w-fit mb-8">
          {[
            { id: 'all', label: language === 'en' ? 'All Products' : 'सबै सामान' },
            { id: 'milk', label: language === 'en' ? 'Fresh Cow Milk' : 'गाईको दूध' },
            { id: 'ghee', label: language === 'en' ? 'Vedic Bilona Ghee' : 'दानेदार घिउ' },
            { id: 'dairy', label: language === 'en' ? 'Curd & Paneer' : 'दही र पनिर' },
            { id: 'manure', label: language === 'en' ? 'Organic Fertilizers' : 'गोबर तथा जैविक मल' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                activeCategory === tab.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image slot with styled fallback container */}
                <div className="relative h-48 bg-stone-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={language === 'en' ? product.name : product.nepaliName}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md">
                    रू {product.price.toLocaleString()} <span className="text-[10px] font-normal text-stone-200">/ {language === 'en' ? product.unit : product.nepaliUnit}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900 leading-snug">
                      {language === 'en' ? product.name : product.nepaliName}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'en' ? product.description : product.nepaliDescription}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 pt-2 border-t border-stone-100 text-xs text-stone-600">
                    {(language === 'en' ? product.features : product.nepaliFeatures).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action footer */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectProductForOrder(product, 1, false)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-xl transition-colors shadow-2xs active:scale-[0.98]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>
                    {language === 'en' 
                      ? (product.category === 'milk' ? 'Order / Subscribe Daily' : 'Order Now') 
                      : (product.category === 'milk' ? 'अर्डर / मासिक सदस्यता' : 'अर्डर गर्नुहोस्')}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Milk Subscription Feature Card */}
        <div className="mt-12 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Milk className="w-4 h-4" />
                <span>{language === 'en' ? 'Daily Fresh Milk Subscription' : 'दैनिक ताजा दूध मासिक सदस्यता'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                {language === 'en' 
                  ? 'Never Run Out of Pure Milk — Delivered to Your Door Every Morning' 
                  : 'हरेक बिहान घरमै शुद्ध गाईको दूध — सहज मासिक सदस्यता'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'en'
                  ? 'We deliver fresh warm milk within Arjundhara, Shanischare, and Birtamode. Milked fresh at dawn and delivered in sterile stainless-steel cans or glass bottles by 6:45 AM.'
                  : 'अर्जुनधारा, शनिश्चरे र बिर्तामोड क्षेत्रमा बिहान ६:४५ बजेभित्र सफा भाँडा वा बोतलमा घरदैलो डेलिभरी। कुनै दिन अनुपस्थित हुँदा १ दिनअघि सजिलै स्थगित गर्न सकिन्छ।'}
              </p>

              {/* Delivery Highlights */}
              <div className="flex flex-wrap gap-4 pt-1 text-xs text-stone-600 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Morning: 6:00 AM – 7:30 AM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Evening: 4:30 PM – 6:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Free doorstep delivery within local radius</span>
                </div>
              </div>
            </div>

            {/* Interactive Subscription Calculator */}
            <div className="lg:col-span-5 bg-stone-50 rounded-xl p-5 border border-stone-200/80 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                {language === 'en' ? 'Subscription Calculator' : 'मासिक खर्च हिसाब गर्नुहोस्'}
              </h4>

              {/* Quantity Selector */}
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  {language === 'en' ? 'Daily Quantity (Liters)' : 'दैनिक आवश्यक परिमाण (लिटर)'}
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 5].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setSubLiters(amt)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg border transition-all ${
                        subLiters === amt
                          ? 'bg-emerald-800 text-white border-emerald-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {amt} L
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Shift */}
              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1.5">
                  {language === 'en' ? 'Delivery Time' : 'डेलिभरी समय'}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => setSubTime('morning')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      subTime === 'morning'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {language === 'en' ? 'Morning' : 'बिहान'}
                  </button>
                  <button
                    onClick={() => setSubTime('evening')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      subTime === 'evening'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {language === 'en' ? 'Evening' : 'साँझ'}
                  </button>
                  <button
                    onClick={() => setSubTime('both')}
                    className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                      subTime === 'both'
                        ? 'bg-emerald-800 text-white border-emerald-800'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {language === 'en' ? 'Both' : 'दुबै समय'}
                  </button>
                </div>
              </div>

              {/* Estimated monthly total */}
              <div className="pt-2 border-t border-stone-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block">
                    {language === 'en' ? 'Est. Monthly Total (30 Days)' : 'अनुमानित मासिक शुल्क (३० दिन)'}
                  </span>
                  <span className="text-xl font-bold text-stone-900">
                    रू {calculateMonthly().toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const milkProduct = PRODUCTS.find((p) => p.id === 'fresh-milk') || PRODUCTS[0];
                    onSelectProductForOrder(milkProduct, subLiters, true);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors shadow-2xs whitespace-nowrap"
                >
                  {language === 'en' ? 'Start Subscription' : 'सदस्यता सुरु गर्नुहोस्'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
