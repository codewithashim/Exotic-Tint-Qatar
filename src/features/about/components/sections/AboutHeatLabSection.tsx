'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { HEAT_LAB_SCENARIOS } from '@/features/about/data/about-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Interactive Qatar heat & ROI lab comparing protected vs unprotected scenarios. */
export default function AboutHeatLabSection() {
  const { openService: onSelectService, openBlogs: onOpenBlogs } = useSiteNavigation();
  const [selectedLabIdx, setSelectedLabIdx] = useState(0);
  const activeLab = HEAT_LAB_SCENARIOS[selectedLabIdx] || HEAT_LAB_SCENARIOS[0];

  return (
    <section id="about-heat-lab" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <span className="text-xs font-mono font-extrabold uppercase text-[#d9f941] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>INTERACTIVE QATAR CLIMATE PERFORMANCE LAB</span>
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-1">
              See How Our Films Beat Qatar’s Extreme Heat &amp; Stains
            </h2>
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Select a scenario below to compare untreated glass/surfaces against Exotic Tint
            Qatar’s nano-ceramic &amp; TPU armor:
          </p>
        </div>

        {/* Scenario Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HEAT_LAB_SCENARIOS.map((item, idx) => {
            const isSelected = idx === selectedLabIdx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedLabIdx(idx)}
                className={`p-4 rounded-2xl border-2 border-black text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? `${item.bgClass} text-[#121118] shadow-[4px_4px_0px_#000] -translate-y-0.5`
                    : 'bg-[#121118] text-slate-200 hover:border-white/30'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-display font-extrabold text-sm sm:text-base mt-2 leading-snug">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Scenario Output Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          <div className="lg:col-span-5 rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] aspect-[16/10] bg-[#0d1117] relative">
            <img
              src={activeLab.image}
              alt={activeLab.label}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span
                className={`px-3 py-1 rounded-full ${activeLab.bgClass} text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000]`}
              >
                {activeLab.irRejected}
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-rose-950/50 border-2 border-rose-500/40">
                <p className="text-[11px] font-mono font-bold uppercase text-rose-300">
                  ✕ WITHOUT EXOTIC TINT QATAR
                </p>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
                  {activeLab.unprotectedTemp}
                </p>
                <p className="text-xs text-rose-200/80 mt-0.5">
                  High UV damage, glare &amp; AC overload
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/50 border-2 border-[#6ee7b7]">
                <p className="text-[11px] font-mono font-bold uppercase text-[#6ee7b7]">
                  ✓ WITH EXOTIC TINT QATAR
                </p>
                <p className="font-display font-extrabold text-xl sm:text-2xl text-white mt-1">
                  {activeLab.protectedTemp}
                </p>
                <p className="text-xs text-emerald-200/90 mt-0.5">
                  {activeLab.uvBlocked} · {activeLab.energySaved}
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-[#121118] p-4 rounded-2xl border border-white/10">
              {activeLab.summary}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectService(activeLab.recommendedSlug)}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-full ${activeLab.bgClass} text-[#121118] font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-transform cursor-pointer`}
              >
                <span>Explore {activeLab.recommendedTitle} Details →</span>
              </button>
              <button
                type="button"
                onClick={onOpenBlogs}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#121118] text-white font-bold text-xs sm:text-sm border border-white/25 hover:border-[#d9f941] transition-colors cursor-pointer"
              >
                <span>Read Our Technical Guides →</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
