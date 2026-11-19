'use client';

import { ArrowLeft } from 'lucide-react';
import { ALL_SERVICES } from '@/features/services/data/services-data';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';
import type { ServiceDetail } from '@/features/services/data/services-data';

interface ServiceDetailSubHeaderProps {
  service: ServiceDetail;
}

/** Breadcrumb bar with a switcher between all service pages. */
export default function ServiceDetailSubHeader({ service }: ServiceDetailSubHeaderProps) {
  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        {/* Top Row: Back to Home + Full Breadcrumb + Quick Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-bold">
            <SiteLink
              href={ROUTES.home}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#d9f941] transition-colors cursor-pointer font-extrabold whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Back to Home</span>
            </SiteLink>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-slate-400 whitespace-nowrap">Service Details</span>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-[#d9f941] font-extrabold whitespace-nowrap">
              {service.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#121118] border border-white/15 font-mono text-[11px] font-bold text-slate-300 whitespace-nowrap">
              SOLUTION {service.num} OF {String(ALL_SERVICES.length).padStart(2, '0')}
            </span>
            <a
              href="#service-booking-ticket"
              className="px-3 py-1 rounded-md bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-extrabold hover:bg-[#f27438] transition-colors whitespace-nowrap"
            >
              Fast 60s Quote ↓
            </a>
          </div>
        </div>

        {/* Bottom row: switcher between all service pages */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {ALL_SERVICES.map((item) => {
            const isCurrent = item.slug === service.slug;
            return (
              <SiteLink
                key={item.slug}
                href={ROUTES.service(item.slug)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`px-3 py-2 rounded-xl text-left border-2 border-black transition-all cursor-pointer flex items-center gap-2 ${
                  isCurrent
                    ? `${item.bgClass} text-[#121118] shadow-[3px_3px_0px_#000] -translate-y-0.5`
                    : 'bg-[#121118] text-slate-300 hover:text-white hover:bg-[#23222e] hover:border-white/30'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-md font-mono text-[10px] font-extrabold flex items-center justify-center shrink-0 border ${
                    isCurrent
                      ? 'bg-white text-[#121118] border-black'
                      : 'bg-[#1a1922] text-[#d9f941] border-white/15'
                  }`}
                >
                  {item.num}
                </span>
                <span className="text-[11px] font-extrabold leading-tight truncate">
                  {item.shortTitle}
                </span>
              </SiteLink>
            );
          })}
        </div>
      </div>
    </div>
  );
}
