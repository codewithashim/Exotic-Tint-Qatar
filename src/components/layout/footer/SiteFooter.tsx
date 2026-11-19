'use client';

import { ArrowUpRight, Phone } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import { FOOTER_SERVICE_ZONES, SITE_CONFIG } from '@/config/site';
import { ALL_SERVICES } from '@/features/services';
import { HOME_SECTIONS, ROUTES } from '@/config/routes';
import { BrandWordmark } from '@/components/ui/BrandLockup';
import SiteLink from '@/components/ui/SiteLink';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Site-wide footer: CTA ticket, brand column, navigation, services, dispatch info, socials. */
export default function SiteFooter() {
  const { goToHomeSection, openContact: openContactPage } = useSiteNavigation();

  /** Page links are real `<a href>` (crawlable); in-page anchors use `onClick`. */
  const FOOTER_NAV: { label: string; href?: string; onClick?: () => void; badge?: string }[] = [
    { label: 'Home', href: ROUTES.home },
    { label: 'About Us', href: ROUTES.about },
    { label: 'Services Hub', href: ROUTES.services },
    { label: 'Work Gallery', href: ROUTES.gallery, badge: 'HD' },
    { label: 'Client Reviews', onClick: () => goToHomeSection(HOME_SECTIONS.reviews) },
    { label: 'Qatar Heat Blog', href: ROUTES.blogs },
    { label: 'Contact & Dispatch', href: ROUTES.contact },
  ];

  return (
    <footer
      id="contact"
      className="relative bg-[#0d1322] text-[#f4f4f6] border-t-4 border-black pt-12 sm:pt-16 pb-10 overflow-hidden"
    >
      {/* Top Accent Multi-Color Neo-Brutalist Strip */}
      <div className="absolute top-0 inset-x-0 h-1.5 grid grid-cols-6">
        <div className="bg-[#f27438]" />
        <div className="bg-[#d9f941]" />
        <div className="bg-[#6ee7b7]" />
        <div className="bg-[#fbbf24]" />
        <div className="bg-[#f45b9a]" />
        <div className="bg-[#a78bfa]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
        {/* 1. Smart Perforated Cream Ticket CTA Banner Inside Footer */}
        <div className="relative rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-8 overflow-hidden">
          {/* Ticket Side Perforation Notches (Desktop) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d1322] border-2 border-black"
          />
          <div
            aria-hidden="true"
            className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d1322] border-2 border-black"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121118] text-[#6ee7b7] font-mono font-extrabold text-[11px] border border-black">
                <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-ping" />
                <span>SAME-DAY MOBILE VAN &amp; STUDIO DISPATCH · QATAR</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-[1.02] text-[#121118]">
                Ready to Beat Qatar’s 50°C Heat &amp; Protect Your Surfaces?
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-black/75 max-w-xl leading-relaxed">
                Book sun control, frosted, smart or safety film, surface protection, sofa nano
                coating or wallpaper in under 60 seconds.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-3">
              <SiteLink
                href={ROUTES.contact}
                className="px-5 py-3.5 rounded-2xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Book In Less Than 60 Sec</span>
                <span>🔥</span>
              </SiteLink>

              <a
                href={SITE_CONFIG.phone.href}
                className="px-5 py-3.5 rounded-2xl bg-[#121118] hover:bg-[#6ee7b7] text-white hover:text-[#121118] font-mono font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#d9f941] shrink-0" />
                <span>+974 31608423</span>
              </a>
            </div>
          </div>
        </div>

        {/* 2. Main 12-Column Smart Architectural Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b-2 border-white/10">
          {/* Column 1: Brand Identity, Official Crest & Verified Telemetry (4 Cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center shrink-0">
                <img
                  loading="lazy"
                  decoding="async"
                  src={ASSETS.brand.logoMark}
                  alt="Exotic Tint Qatar logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <BrandWordmark className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white block leading-none" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#6ee7b7] block mt-1">
                  Window Tint &amp; Surface Shield
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Qatar’s specialist in commercial &amp; residential sun control film, surface
              protection film, frosted &amp; decorative film, fabric nano coating, wallpaper,
              smart film and safety &amp; security film.
            </p>

            {/* 3 Performance Telemetry Mini-Boxes */}
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded-xl bg-[#161f33] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="font-display font-extrabold text-base sm:text-lg text-[#d9f941] block leading-none">
                  96%
                </span>
                <span className="font-mono text-[9px] uppercase text-slate-300 mt-1 block">
                  IR Heat Block
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161f33] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="font-display font-extrabold text-base sm:text-lg text-[#6ee7b7] block leading-none">
                  99.9%
                </span>
                <span className="font-mono text-[9px] uppercase text-slate-300 mt-1 block">
                  UV Rejection
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#161f33] border-2 border-black shadow-[3px_3px_0px_#000]">
                <span className="font-display font-extrabold text-base sm:text-lg text-[#f27438] block leading-none">
                  10-Yr
                </span>
                <span className="font-mono text-[9px] uppercase text-slate-300 mt-1 block">
                  Qatar Warranty
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation Dock (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <p className="font-mono font-extrabold text-xs uppercase tracking-wider text-[#d9f941] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#d9f941]" />
              <span>Navigation</span>
            </p>
            <ul className="space-y-2 font-display font-bold text-sm">
              {FOOTER_NAV.map((item) => {
                const className = `${
                  item.badge ? 'text-white' : 'text-slate-300'
                } hover:text-[#d9f941] inline-flex items-center gap-1.5 transition-colors cursor-pointer`;
                const content = (
                  <>
                    <span>{item.label}</span>
                    {item.badge ? (
                      <span className="px-1.5 py-0.2 rounded bg-[#6ee7b7] text-[#121118] font-mono text-[9px] font-extrabold border border-black">
                        {item.badge}
                      </span>
                    ) : (
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    )}
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <SiteLink href={item.href} className={className}>
                        {content}
                      </SiteLink>
                    ) : (
                      <button type="button" onClick={item.onClick} className={className}>
                        {content}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: service links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono font-extrabold text-xs uppercase tracking-wider text-[#6ee7b7] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#6ee7b7]" />
              <span>{ALL_SERVICES.length} Specialized Solutions</span>
            </p>
            <ul className="space-y-2">
              {ALL_SERVICES.map((s) => (
                <li key={s.slug}>
                  <SiteLink
                    href={ROUTES.service(s.slug)}
                    className="group w-full p-2 rounded-xl bg-[#161f33] hover:bg-[#1f2b47] border border-white/10 hover:border-[#d9f941] flex items-center justify-between gap-2 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#0d1322] text-[#d9f941] border border-white/10 shrink-0">
                        {s.num}
                      </span>
                      <span className="font-display font-bold text-xs text-slate-200 group-hover:text-white truncate">
                        {s.title}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#d9f941] shrink-0" />
                  </SiteLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Dispatch Hotline, Working Hours & Qatar Zones (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono font-extrabold text-xs uppercase tracking-wider text-[#f27438] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f27438]" />
              <span>Doha Dispatch Center</span>
            </p>

            <div className="p-4 rounded-2xl bg-[#161f33] border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-400 block">
                  Direct Hotline &amp; WhatsApp
                </span>
                <a
                  href={SITE_CONFIG.phone.href}
                  className="font-mono font-extrabold text-lg sm:text-xl text-[#d9f941] hover:underline block mt-0.5 tabular-nums"
                >
                  +974 31608423
                </a>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Working Hours:</span>
                <span className="font-bold text-[#6ee7b7] font-mono">8:00 AM – 6:00 PM</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Schedule:</span>
                <span className="font-bold text-white font-mono">Open 7 Days a Week</span>
              </div>
            </div>

            {/* Clickable Qatar Dispatch Zone Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[10px] uppercase text-slate-400 block">
                Active Mobile Service Zones:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {FOOTER_SERVICE_ZONES.map(
                  (zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => openContactPage()}
                      className="px-2.5 py-1 rounded-lg bg-[#161f33] hover:bg-[#d9f941] text-slate-300 hover:text-[#121118] font-mono font-bold text-[10px] border border-white/10 hover:border-black transition-colors cursor-pointer"
                    >
                      📍 {zone}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Copyright, Social Pills & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left font-medium">
            Copyright © {new Date().getFullYear()} <strong className="text-white">Exotic Tint Qatar</strong> – Premium
            Tint &amp; Protective Films | Powered by{' '}
            <span className="text-[#d9f941] font-bold">Codewithashim</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <a
              href={SITE_CONFIG.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#161f33] hover:bg-[#6ee7b7] text-slate-200 hover:text-[#121118] font-mono font-extrabold text-[11px] border border-white/10 hover:border-black transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={SITE_CONFIG.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#161f33] hover:bg-[#049adb] text-slate-200 hover:text-[#121118] font-mono font-extrabold text-[11px] border border-white/10 hover:border-black transition-colors"
            >
              Facebook
            </a>
            <a
              href={SITE_CONFIG.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#161f33] hover:bg-[#f45b9a] text-slate-200 hover:text-[#121118] font-mono font-extrabold text-[11px] border border-white/10 hover:border-black transition-colors"
            >
              Instagram
            </a>
            <a
              href={SITE_CONFIG.socials.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#161f33] hover:bg-[#d9f941] text-slate-200 hover:text-[#121118] font-mono font-extrabold text-[11px] border border-white/10 hover:border-black transition-colors"
            >
              TikTok
            </a>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-3 py-1.5 rounded-xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-mono font-extrabold text-[11px] border border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
