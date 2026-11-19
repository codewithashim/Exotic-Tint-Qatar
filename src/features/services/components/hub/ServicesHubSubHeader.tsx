'use client';

import { ArrowLeft } from 'lucide-react';
import { ALL_SERVICES } from '@/features/services/data/services-data';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';

/** Breadcrumb bar with a quick switcher to each service page. */
export default function ServicesHubSubHeader() {
  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        {/* Row 1: Back to Home + Breadcrumb + Quick Actions */}
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
            <span className="text-[#d9f941] font-extrabold whitespace-nowrap">
              Our {ALL_SERVICES.length} Premium Services
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#121118] border border-white/15 font-mono text-[11px] font-bold text-slate-300 whitespace-nowrap">
              ALL {ALL_SERVICES.length} QATAR SOLUTIONS
            </span>
            <a
              href="#services-hub-booking"
              className="px-3 py-1 rounded-md bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-extrabold hover:bg-[#f27438] transition-colors whitespace-nowrap"
            >
              Book in 60s ↓
            </a>
          </div>
        </div>

        {/* Row 2: service quick-jump grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {ALL_SERVICES.map((item) => (
            <SiteLink
              key={item.slug}
              href={ROUTES.service(item.slug)}
              className="px-3 py-2 rounded-xl text-left border-2 border-black bg-[#121118] text-slate-200 hover:bg-[#23222e] hover:border-[#d9f941] transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span
                className={`w-5 h-5 rounded-md font-mono text-[10px] font-extrabold flex items-center justify-center shrink-0 border border-black ${item.bgClass} text-[#121118]`}
              >
                {item.num}
              </span>
              <span className="text-[11px] font-extrabold leading-tight truncate group-hover:text-[#d9f941]">
                {item.shortTitle}
              </span>
            </SiteLink>
          ))}
        </div>
      </div>
    </div>
  );
}
