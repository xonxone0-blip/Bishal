import React, { useState } from 'react';
import { Phone, MapPin, Globe, Menu, X, ShoppingBag } from 'lucide-react';
import { BUSINESS_INFO } from '../data/farmData';
import { Language } from '../types';

interface NavbarProps {
  language: Language;
  onToggleLanguage: () => void;
  onOpenOrderModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onToggleLanguage,
  onOpenOrderModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#products', label: language === 'en' ? 'Dairy Products' : 'दूध तथा घिउ' },
    { href: '#coworking', label: language === 'en' ? 'Coworking Space' : 'काउवर्किङ स्पेस' },
    { href: '#farm-life', label: language === 'en' ? 'Farm & Cows' : 'फार्म तथा गाई' },
    { href: '#reviews', label: language === 'en' ? 'Reviews (5.0★)' : 'प्रतिक्रिया (५.०★)' },
    { href: '#location', label: language === 'en' ? 'Location & Map' : 'स्थान र नक्सा' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Zone 1: Single text wordmark */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-800/20 shadow-xs group-hover:border-emerald-700 transition-colors shrink-0 bg-white">
              <img
                src={BUSINESS_INFO.logo}
                alt="Krishina Gai Farm Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors leading-tight">
                {language === 'en' ? 'Krishina Gai Farm' : 'कृष्ण गाई फार्म'}
              </span>
              <span className="text-[11px] font-medium text-stone-500 tracking-wide">
                Arjundhara, Koshi
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-600">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-emerald-800 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-700 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-colors"
              title="Toggle Language / भाषा बदल्नुहोस्"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-semibold">{language === 'en' ? 'नेपाली' : 'English'}</span>
            </button>

            {/* Direct Call Button */}
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg hover:bg-emerald-100 border border-emerald-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            {/* Primary Action Button */}
            <button
              onClick={onOpenOrderModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-all shadow-xs active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Order Dairy' : 'अर्डर गर्नुहोस्'}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-150">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-stone-700 hover:bg-stone-50 hover:text-emerald-800"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <a
              href={`tel:${BUSINESS_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 rounded-lg border border-emerald-300 bg-emerald-50 text-emerald-900 text-sm font-semibold"
            >
              <Phone className="w-4 h-4 text-emerald-700" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
            <div className="text-xs text-center text-stone-500 flex items-center justify-center gap-1 pt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>Arjundhara, Koshi Province 57205</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
