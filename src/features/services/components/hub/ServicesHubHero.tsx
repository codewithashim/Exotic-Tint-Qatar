'use client';

import { Sparkles } from 'lucide-react';
import { ALL_SERVICES, type ServiceDetail } from '@/features/services/data/services-data';
import {
  FILTER_TABS,
  QUICK_MATCHER_OPTIONS,
  type ServicesFilterTab,
} from '@/features/services/data/services-hub-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface ServicesHubHeroProps {
  activeTab: ServicesFilterTab;
  setActiveTab: (tab: ServicesFilterTab) => void;
  selectedMatcherSlug: string;
  setSelectedMatcherSlug: (slug: string) => void;
  matchedService: ServiceDetail;
  handleQuickBookService: (serviceTitle: string) => void;
}

/** Hero with category filter tabs and the 60-second "solution matcher". */
export default function ServicesHubHero({
  activeTab,
  setActiveTab,
  selectedMatcherSlug,
  setSelectedMatcherSlug,
  matchedService,
  handleQuickBookService,
}: ServicesHubHeroProps) {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Services Overview */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-block -rotate-1 bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs px-3.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
            OUR PREMIUM WINDOW TINTING &amp; PROTECTION SERVICES
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.35rem] leading-[1.02] tracking-tight text-white">
            {ALL_SERVICES.length} Specialized Solutions for{' '}
            <span className="text-[#f27438]">Villas, Homes &amp; Offices</span> in Qatar
          </h1>

          <p className="font-display font-extrabold text-base sm:text-xl text-[#6ee7b7] leading-snug">
            → Enhance Privacy, Block 99% UV Rays &amp; Protect Your Surfaces with High-Quality
            Tint Solutions!
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whether you need <strong className="text-white">sun control window film</strong>{' '}
            for your villa or office,{' '}
            <strong className="text-white">surface protection film</strong> for marble, stone,
            steel and wood, <strong className="text-white">frosted &amp; decorative film</strong>,{' '}
            <strong className="text-white">fabric nano coating</strong>,{' '}
            <strong className="text-white">premium wallpaper</strong>,{' '}
            <strong className="text-white">smart film</strong> or{' '}
            <strong className="text-white">safety &amp; security film</strong>, Exotic Tint Qatar
            delivers certified craftsmanship across Doha, Lusail, The Pearl, Al
            Kheesa, Al Gharrafa, Al Rayyan, and Wakra.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-2 space-y-2">
            <p className="text-xs font-mono font-bold uppercase text-slate-400">
              Filter Service Directory:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {FILTER_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-extrabold border-2 border-black transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#f27438] text-[#121118] shadow-[3px_3px_0px_#000] -translate-y-0.5'
                        : 'bg-[#1a1922] text-slate-200 hover:border-white/30'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Solution Matcher */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono font-extrabold uppercase text-[#d9f941] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SMART SOLUTION FINDER</span>
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-0.5">
                  What Would You Like to Protect Today?
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white text-[#121118] font-mono font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
                INSTANT MATCH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {QUICK_MATCHER_OPTIONS.map((opt) => {
                const isSelected = selectedMatcherSlug === opt.slug;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedMatcherSlug(opt.slug)}
                    className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#d9f941] text-[#121118] shadow-[3px_3px_0px_#000]'
                        : 'bg-[#121118] text-slate-200 hover:border-white/30'
                    }`}
                  >
                    <p className="font-display font-extrabold text-xs sm:text-sm leading-tight">
                      {opt.label}
                    </p>
                    <p
                      className={`text-[11px] mt-1 line-clamp-1 ${
                        isSelected ? 'text-black/80 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {opt.goal}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Matched Service Spotlight Box */}
            <div
              className={`rounded-2xl ${matchedService.bgClass} text-[#121118] border-2 border-black shadow-[4px_4px_0px_#000] p-4 sm:p-5 space-y-3`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-full sm:w-32 aspect-[16/10] rounded-xl overflow-hidden border-2 border-black bg-[#0d1117] shrink-0">
                  <img
                    src={matchedService.image}
                    alt={matchedService.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="px-2 py-0.5 rounded bg-white border border-black font-mono font-extrabold text-[10px] uppercase">
                    RECOMMENDED · SERVICE #{matchedService.num}
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl leading-tight">
                    {matchedService.title}
                  </h3>
                  <p className="text-xs font-medium text-black/85 line-clamp-2">
                    {matchedService.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-black/15">
                <button
                  type="button"
                  onClick={() => onSelectService(matchedService.slug)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-white hover:bg-[#121118] text-[#121118] hover:text-white font-display font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer text-center"
                >
                  Open Interactive Simulator &amp; Specs →
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickBookService(matchedService.title)}
                  className="py-2.5 px-4 rounded-xl bg-[#121118] text-white font-display font-extrabold text-xs border-2 border-black cursor-pointer"
                >
                  Book in 60s 🔥
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
