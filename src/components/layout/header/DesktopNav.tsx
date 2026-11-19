'use client';

import { ChevronDown } from 'lucide-react';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES, type PageKey } from '@/config/routes';
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
  /** Called when one of the page links is followed (closes menus). */
  onNavigate: () => void;
  onOpenReviews: () => void;
}

function NavPill({
  label,
  active,
  href,
  onClick,
}: {
  label: string;
  active?: boolean;
  /** Page link (crawlable). Omit for in-page actions. */
  href?: string;
  onClick: () => void;
}) {
  const className = `${PILL_BASE} ${active ? PILL_ACTIVE : PILL_IDLE}`;
  if (href) {
    return (
      <SiteLink
        href={href}
        onNavigate={onClick}
        className={className}
        aria-current={active ? 'page' : undefined}
      >
        {label}
      </SiteLink>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
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
      <NavPill label="Home" href={ROUTES.home} active={activePage === 'home'} onClick={onNavigate} />
      <NavPill label="About" href={ROUTES.about} active={activePage === 'about'} onClick={onNavigate} />

      {/* Services hub button + mega menu toggle */}
      <div className="relative" onMouseEnter={onOpenMegaMenu}>
        <div
          className={`inline-flex items-center rounded-full transition-all ${
            servicesHighlighted
              ? 'bg-[#f27438] text-[#121118] border border-black font-extrabold shadow-[2px_2px_0px_#000]'
              : 'text-slate-200 hover:text-white hover:bg-white/5 font-extrabold'
          }`}
        >
          <SiteLink
            href={ROUTES.services}
            onNavigate={onNavigate}
            aria-current={activePage === 'services' ? 'page' : undefined}
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
          </SiteLink>
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
        href={ROUTES.gallery}
        active={activePage === 'gallery'}
        onClick={onNavigate}
      />
      <NavPill label="Reviews" onClick={onOpenReviews} />
      <NavPill label="Blogs" href={ROUTES.blogs} active={activePage === 'blogs'} onClick={onNavigate} />
      <NavPill
        label="Contact"
        href={ROUTES.contact}
        active={activePage === 'contact'}
        onClick={onNavigate}
      />
    </nav>
  );
}
