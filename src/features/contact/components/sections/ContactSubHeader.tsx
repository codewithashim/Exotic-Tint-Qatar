'use client';

import { ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Breadcrumb bar with quick-jump links. */
export default function ContactSubHeader() {
  const { goHome: onBackHome } = useSiteNavigation();

  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        {/* Row 1 */}
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
              Contact &amp; Fast 60s Booking
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#121118] border border-white/15 font-mono text-[11px] font-bold text-[#6ee7b7] whitespace-nowrap">
              ● OPEN 8:00 AM – 6:00 PM (7 DAYS)
            </span>
            <a
              href={SITE_CONFIG.phone.href}
              className="px-3 py-1 rounded-md bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-extrabold hover:bg-[#f27438] transition-colors whitespace-nowrap"
            >
              Call +974 31608423
            </a>
          </div>
        </div>

        {/* Row 2: 4-Column Quick Jump Grid (Zero Scrollbar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <a
            href="#contact-channels"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>01. Direct Hotline</span>
            <span className="text-[#f27438] font-mono">📞</span>
          </a>
          <a
            href="#contact-ticket-module"
            className="px-3 py-2 rounded-xl bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>02. 60s Quote Ticket</span>
            <span className="font-mono">🔥</span>
          </a>
          <a
            href="#contact-zones"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>03. Service Areas</span>
            <span className="text-[#6ee7b7] font-mono">📍</span>
          </a>
          <a
            href="#contact-faqs"
            className="px-3 py-2 rounded-xl bg-[#121118] hover:bg-[#23222e] text-slate-200 border-2 border-black text-xs font-extrabold flex items-center justify-between transition-colors"
          >
            <span>04. Booking FAQs</span>
            <span className="text-[#a78bfa] font-mono">?</span>
          </a>
        </div>
      </div>
    </div>
  );
}
