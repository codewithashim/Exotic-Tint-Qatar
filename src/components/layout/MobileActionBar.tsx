'use client';

import { Phone } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { HOME_SECTIONS, getActiveServiceSlug } from '@/config/routes';
import { SITE_CONFIG } from '@/config/site';

/** Sticky bottom call / book bar shown only on phones. */
export default function MobileActionBar() {
  const pathname = usePathname();
  const bookingAnchor = getActiveServiceSlug(pathname)
    ? '#service-booking-ticket'
    : `/#${HOME_SECTIONS.booking}`;

  return (
    <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-[#121118]/95 backdrop-blur-md border-t-2 border-black px-3 py-2 flex items-center gap-2">
      <a
        href={SITE_CONFIG.phone.href}
        className="flex-1 py-2.5 px-3 rounded-full bg-white text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-extrabold text-xs text-center flex items-center justify-center gap-1"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>{SITE_CONFIG.phone.display}</span>
      </a>
      <a
        href={bookingAnchor}
        className="flex-1 py-2.5 px-3 rounded-full bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-display font-extrabold text-xs text-center"
      >
        Book In &lt; 60 Sec 🔥
      </a>
    </div>
  );
}
