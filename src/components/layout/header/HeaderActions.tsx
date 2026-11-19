'use client';

import { Menu, Phone, X } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';

interface HeaderActionsProps {
  isArabic: boolean;
  onToggleLanguage: () => void;
  onBookNow: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

/** Right side of the header: language toggle, call buttons, booking CTA, drawer toggle. */
export default function HeaderActions({
  isArabic,
  onToggleLanguage,
  onBookNow,
  mobileMenuOpen,
  onToggleMobileMenu,
}: HeaderActionsProps) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
      <button
        type="button"
        onClick={onToggleLanguage}
        aria-label="Toggle language"
        className="px-2.5 py-2 rounded-xl border-2 border-black bg-[#1a1922] hover:border-[#d9f941] text-[11px] font-mono font-extrabold text-white shadow-[2px_2px_0px_#000] flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap"
      >
        <span>{isArabic ? 'AR ▼' : 'EN ▼'}</span>
      </button>

      {/* Compact call icon (< md) */}
      <a
        href={SITE_CONFIG.phone.href}
        aria-label={`Call ${SITE_CONFIG.phone.display}`}
        className="md:hidden w-9 h-9 rounded-xl bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0"
      >
        <Phone className="w-4 h-4" />
      </a>

      {/* Phone pill (md+) */}
      <a
        href={SITE_CONFIG.phone.href}
        className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1a1922] hover:bg-[#d9f941] text-white hover:text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] transition-colors tabular-nums whitespace-nowrap"
      >
        <Phone className="w-3.5 h-3.5 text-[#d9f941] group-hover:text-black" />
        <span>{SITE_CONFIG.phone.display}</span>
      </a>

      <button
        type="button"
        onClick={onBookNow}
        className="hidden sm:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-all cursor-pointer whitespace-nowrap"
      >
        <span>Book in 60s</span>
        <span>🔥</span>
      </button>

      {/* Drawer toggle (< lg) */}
      <button
        type="button"
        onClick={onToggleMobileMenu}
        aria-label="Toggle Navigation Menu"
        aria-expanded={mobileMenuOpen}
        className={`lg:hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] font-mono font-extrabold text-xs transition-colors cursor-pointer ${
          mobileMenuOpen ? 'bg-[#d9f941] text-[#121118]' : 'bg-[#1a1922] text-white hover:border-[#d9f941]'
        }`}
      >
        {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        <span className="hidden xs:inline sm:inline">{mobileMenuOpen ? 'Close' : 'Menu'}</span>
      </button>
    </div>
  );
}
