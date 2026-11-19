'use client';

import { useState, type ReactNode } from 'react';
import { BookingSelectionProvider } from '@/features/booking';
import SiteFooter from './footer/SiteFooter';
import SiteHeader from './header/SiteHeader';
import MobileTabBar from './MobileTabBar';
import WhatsAppChat from './WhatsAppChat';

type Language = 'en' | 'ar';

/** Persistent chrome around every page: header, footer, WhatsApp chat and the mobile tab bar. */
export default function SiteShell({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const isArabic = lang === 'ar';
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <BookingSelectionProvider>
      <div
        dir={isArabic ? 'rtl' : 'ltr'}
        className="min-h-screen text-[#f4f4f6] overflow-x-hidden flex flex-col pb-[calc(4.75rem+env(safe-area-inset-bottom))] md:pb-0"
      >
        <SiteHeader isArabic={isArabic} onToggleLanguage={() => setLang(isArabic ? 'en' : 'ar')} />
        <main id="home" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppChat open={chatOpen} onOpenChange={setChatOpen} />
        <MobileTabBar chatOpen={chatOpen} onToggleChat={() => setChatOpen((o) => !o)} />
      </div>
    </BookingSelectionProvider>
  );
}
