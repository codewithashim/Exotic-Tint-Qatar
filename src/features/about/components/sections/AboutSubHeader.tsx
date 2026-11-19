'use client';

import { ArrowLeft } from 'lucide-react';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Breadcrumb bar with quick-jump links. */
export default function AboutSubHeader() {
  const { goHome: onBackHome } = useSiteNavigation();

  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-bold">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#d9f941] transition-colors cursor-pointer font-extrabold whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span>Back to Home</span>
            </button>
            <span className="text-slate-600 font-mono">/</span>
            <span className="text-[#d9f941] font-extrabold whitespace-nowrap">
              About Exotic Tint Qatar
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#121118] border border-white/15 font-mono text-[11px] font-bold text-slate-300 whitespace-nowrap">
              OPEN 8:00 AM – 6:00 PM · 7 DAYS
            </span>
            <a
              href="#about-booking-ticket"
              className="px-3 py-1 rounded-md bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-extrabold hover:bg-[#f27438] transition-colors whitespace-nowrap"
            >
              Book Free Estimate ↓
            </a>
          </div>
        </div>

        {/* Quick Jump Row (Zero Scrollbar, Responsive Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <a
            href="#about-story"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>01. Our Qatar Story</span>
            <span className="text-[#f27438] font-mono">↓</span>
          </a>
          <a
            href="#about-heat-lab"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>02. Solar Heat &amp; ROI Lab</span>
            <span className="text-[#d9f941] font-mono">↓</span>
          </a>
          <a
            href="#about-zones"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>03. Dispatch Zones</span>
            <span className="text-[#6ee7b7] font-mono">↓</span>
          </a>
          <a
            href="#about-booking-ticket"
            className="px-3 py-2 rounded-xl bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>04. Book in 60 Sec</span>
            <span className="font-mono">🔥</span>
          </a>
        </div>
      </div>
    </div>
  );
}
