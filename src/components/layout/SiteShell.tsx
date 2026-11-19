'use client';

import { useState, type ReactNode } from 'react';
import { BookingSelectionProvider } from '@/features/booking';
import SiteFooter from './footer/SiteFooter';
import SiteHeader from './header/SiteHeader';
import MobileActionBar from './MobileActionBar';

type Language = 'en' | 'ar';

/** Persistent chrome around every page: header, footer and mobile action bar. */
export default function SiteShell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const isArabic = lang === 'ar';

  return (
    <BookingSelectionProvider>
      <div
        dir={isArabic ? 'rtl' : 'ltr'}
        className="min-h-screen text-[#f4f4f6] overflow-x-hidden flex flex-col pb-16 sm:pb-0"
      >
        <SiteHeader isArabic={isArabic} onToggleLanguage={() => setLang(isArabic ? 'en' : 'ar')} />
        <main id="home" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </div>
    </BookingSelectionProvider>
  );
}
