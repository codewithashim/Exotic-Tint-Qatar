'use client';

import { ChevronDown } from 'lucide-react';
import type { PageKey } from '@/config/routes';
import { ALL_SERVICES } from '@/features/services';

const PILL_BASE =
  'px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer';
const PILL_ACTIVE = 'bg-[#d9f941] text-[#121118] border border-black shadow-[2px_2px_0px_#000]';
const PILL_IDLE = 'text-slate-200 hover:text-white hover:bg-white/5';

interface DesktopNavProps {
  activePage: PageKey;
  megaMenuOpen: boolean;
  onToggleMegaMenu: () => void;
  onOpenMegaMenu: () => void;
  onNavigate: (page: PageKey) => void;
  onOpenReviews: () => void;
}

function NavPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${PILL_BASE} ${active ? PILL_ACTIVE : PILL_IDLE}`}
    >
      {label}
    </button>
  );
}

/** Segmented pill navigation dock with the Services mega-menu trigger (lg+). */
export default function DesktopNav({
  activePage,
  megaMenuOpen,
  onToggleMegaMenu,
  onOpenMegaMenu,
  onNavigate,
  onOpenReviews,
}: DesktopNavProps) {
  const servicesHighlighted = megaMenuOpen || activePage === 'services';

  return (
    <nav
      aria-label="Primary Navigation"
      className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000]"
    >
      <NavPill label="Home" active={activePage === 'home'} onClick={() => onNavigate('home')} />
      <NavPill label="About" active={activePage === 'about'} onClick={() => onNavigate('about')} />

      {/* Services hub button + mega menu toggle */}
      <div className="relative" onMouseEnter={onOpenMegaMenu}>
        <div
          className={`inline-flex items-center rounded-full transition-all ${
            servicesHighlighted
              ? 'bg-[#f27438] text-[#121118] border border-black font-extrabold shadow-[2px_2px_0px_#000]'
              : 'text-slate-200 hover:text-white hover:bg-white/5 font-extrabold'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className="pl-3.5 pr-1.5 py-1.5 text-xs whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <span>Service</span>
            <span
              className={`px-1.5 py-0.2 rounded-full font-mono text-[10px] font-extrabold border ${
                servicesHighlighted
                  ? 'bg-white text-[#121118] border-black'
                  : 'bg-[#121118] text-[#d9f941] border-white/15'
              }`}
            >
              {String(ALL_SERVICES.length).padStart(2, '0')}
            </span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleMegaMenu();
            }}
            aria-label="Toggle Services Mega Menu"
            aria-expanded={megaMenuOpen}
            className="pr-3 pl-1 py-1.5 cursor-pointer flex items-center"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                megaMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <NavPill
        label="Gallery"
        active={activePage === 'gallery'}
        onClick={() => onNavigate('gallery')}
      />
      <NavPill label="Reviews" onClick={onOpenReviews} />
      <NavPill label="Blogs" active={activePage === 'blogs'} onClick={() => onNavigate('blogs')} />
      <NavPill
        label="Contact"
        active={activePage === 'contact'}
        onClick={() => onNavigate('contact')}
      />
    </nav>
  );
}
