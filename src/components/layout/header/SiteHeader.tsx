'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { BrandLogo, BrandWordmark } from '@/components/ui/BrandLockup';
import SiteLink from '@/components/ui/SiteLink';
import { HOME_SECTIONS, PRIMARY_NAV, ROUTES, getActivePage, type PageKey } from '@/config/routes';
import { SITE_CONFIG } from '@/config/site';
import { useBookingSelection } from '@/features/booking';
import { useSiteNavigation } from '@/hooks/use-site-navigation';
import DesktopNav from './DesktopNav';
import HeaderActions from './HeaderActions';
import HeaderUtilityBar from './HeaderUtilityBar';
import MobileNavDrawer from './MobileNavDrawer';
import ServicesMegaMenu from './ServicesMegaMenu';

interface SiteHeaderProps {
  isArabic: boolean;
  onToggleLanguage: () => void;
}

/** Sticky site header: utility strip, brand, desktop nav + mega menu, mobile drawer. */
export default function SiteHeader({ isArabic, onToggleLanguage }: SiteHeaderProps) {
  const pathname = usePathname();
  const activePage = getActivePage(pathname);
  const nav = useSiteNavigation();
  const { setService, setArea } = useBookingSelection();
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenus = () => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  };

  /** Wraps a navigation action so any open menu closes first. */
  const closeMenusThen =
    <A extends unknown[]>(action: (...args: A) => void) =>
    (...args: A) => {
      setMegaMenuOpen(false);
      setMobileMenuOpen(false);
      action(...args);
    };

  const goToPage = closeMenusThen((page: PageKey) => {
    const item = PRIMARY_NAV.find((n) => n.key === page);
    if (item) nav.navigate(item.href);
  });

  return (
    <header
      onMouseLeave={() => setMegaMenuOpen(false)}
      className="sticky top-0 z-50 bg-[#121118]/95 backdrop-blur-xl border-b-2 border-black shadow-[0_6px_24px_rgba(0,0,0,0.65)]"
    >
      <HeaderUtilityBar />

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        <SiteLink
          href={ROUTES.home}
          onNavigate={closeMenus}
          className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer text-left"
        >
          <BrandLogo className="w-11 h-11 sm:w-12 sm:h-12 group-hover:-translate-y-0.5 transition-transform" />
          <div className="min-w-0">
            <BrandWordmark className="font-display font-extrabold text-sm sm:text-lg leading-none tracking-tight text-white block" />
            <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400 block mt-0.5 truncate">
              {SITE_CONFIG.tagline}
            </span>
          </div>
        </SiteLink>

        <DesktopNav
          activePage={activePage}
          megaMenuOpen={megaMenuOpen}
          onOpenMegaMenu={() => setMegaMenuOpen(true)}
          onToggleMegaMenu={() => setMegaMenuOpen((prev) => !prev)}
          onNavigate={closeMenus}
          onOpenReviews={closeMenusThen(() => nav.goToHomeSection(HOME_SECTIONS.reviews))}
        />

        <HeaderActions
          isArabic={isArabic}
          onToggleLanguage={onToggleLanguage}
          onBookNow={() => goToPage('contact')}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />
      </div>

      {megaMenuOpen && (
        <ServicesMegaMenu
          onNavigate={closeMenus}
          onQuickBook={closeMenusThen((serviceId: string) => {
            setService(serviceId);
            nav.goToHomeSection(HOME_SECTIONS.booking);
          })}
          onPickArea={(area) => {
            setArea(area);
            goToPage('contact');
          }}
        />
      )}

      {mobileMenuOpen && (
        <MobileNavDrawer activePage={activePage} onNavigate={closeMenus} />
      )}
    </header>
  );
}
