'use client';

import { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SiteLink from '@/components/ui/SiteLink';
import { PRIMARY_NAV, ROUTES, type PageKey } from '@/config/routes';
import { SITE_CONFIG } from '@/config/site';
import { ALL_SERVICES } from '@/features/services';

interface MobileNavDrawerProps {
  activePage: PageKey;
  /** Called when a link in the drawer is followed (closes the drawer). */
  onNavigate: () => void;
}

/** Slide-down navigation drawer for phones and tablets (< lg). */
export default function MobileNavDrawer({
  activePage,
  onNavigate,
}: MobileNavDrawerProps) {
  const [servicesExpanded, setServicesExpanded] = useState(true);

  return (
    <div className="lg:hidden bg-[#1a1922] border-t-2 border-black px-4 sm:px-6 py-4 space-y-3.5 text-xs font-semibold max-h-[calc(100dvh-3.75rem)] overflow-y-auto overscroll-contain">
      {/* Status strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-[#121118] border border-white/10 font-mono text-[11px]">
        <span className="text-[#6ee7b7] font-extrabold">● OPEN 8:00 AM – 6:00 PM (7 DAYS)</span>
        <span className="text-slate-400">Doha · Lusail · The Pearl · Wakra</span>
      </div>

      {/* Primary pages */}
      <div className="grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-3 gap-2">
        {PRIMARY_NAV.map((item, idx) => (
          <SiteLink
            key={item.key}
            href={item.href}
            onNavigate={onNavigate}
            aria-current={activePage === item.key ? 'page' : undefined}
            className={`p-2.5 rounded-xl border-2 text-left font-display font-extrabold transition-colors ${
              activePage === item.key
                ? 'bg-[#d9f941] text-[#121118] border-black shadow-[2px_2px_0px_#000]'
                : 'bg-[#121118] border-black text-slate-200 hover:border-white/30'
            }`}
          >
            {String(idx + 1).padStart(2, '0')}. {item.label}
          </SiteLink>
        ))}
      </div>

      {/* Services accordion */}
      <div className="rounded-2xl bg-[#121118] border-2 border-black p-3.5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setServicesExpanded((prev) => !prev)}
            className="flex items-center gap-1.5 font-display font-extrabold text-sm text-[#d9f941]"
          >
            <span>Explore All {ALL_SERVICES.length} Service Simulators</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${servicesExpanded ? 'rotate-180' : ''}`}
            />
          </button>
          <SiteLink
            href={ROUTES.services}
            onNavigate={onNavigate}
            className="px-2.5 py-1 rounded-lg bg-[#d9f941] text-[#121118] font-mono font-extrabold text-[10px] border border-black"
          >
            Catalog →
          </SiteLink>
        </div>

        {servicesExpanded && (
          <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-2 pt-1">
            {ALL_SERVICES.map((s) => (
              <SiteLink
                key={s.slug}
                href={ROUTES.service(s.slug)}
                onNavigate={onNavigate}
                className={`${s.bgClass} text-[#121118] p-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] text-left flex items-center justify-between gap-2`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-black bg-[#0d1117] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono font-extrabold text-[9px] uppercase block">
                      #{s.num} · {s.badge}
                    </span>
                    <span className="font-display font-extrabold text-xs sm:text-sm truncate block">
                      {s.title}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </SiteLink>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-2.5 pt-1">
        <SiteLink
          href={ROUTES.contact}
          onNavigate={onNavigate}
          className="py-3 px-4 rounded-xl bg-[#f27438] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] text-center"
        >
          Book In Less Than 60 Sec 🔥
        </SiteLink>
        <a
          href={SITE_CONFIG.phone.href}
          className="py-3 px-4 rounded-xl bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] text-center"
        >
          Call Us! {SITE_CONFIG.phone.display} 📞
        </a>
      </div>
    </div>
  );
}
