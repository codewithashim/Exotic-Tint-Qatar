'use client';

import { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS, SPOTLIGHT_COMPARISONS } from '@/features/gallery/data/gallery-data';
import { type CategoryFilter } from '@/features/gallery/types';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface GallerySpotlightHeroProps {
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  totalImagesCount: number;
  totalVideosCount: number;
}

/** Hero with the interactive before/after split-slider lab. */
export default function GallerySpotlightHero({
  categoryFilter,
  setCategoryFilter,
  totalImagesCount,
  totalVideosCount,
}: GallerySpotlightHeroProps) {
  const { openService: onSelectService, openContact: onOpenContact } = useSiteNavigation();
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState<number>(0);
  const [compareSliderPos, setCompareSliderPos] = useState<number>(54);
  const activeSpotlight = SPOTLIGHT_COMPARISONS[activeSpotlightIdx];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-8 lg:p-10 space-y-8">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 -rotate-1 bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>QATAR WORK PORTFOLIO · REAL PHOTOS, REELS &amp; SPLIT COMPARE</span>
            </div>

            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] tracking-tight text-white leading-[0.98]">
              See The <span className="text-[#f27438]">Optical Clarity</span> &amp;{' '}
              <span className="text-[#6ee7b7]">Protection In Action.</span>
            </h1>

            <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Slide the interactive <strong className="text-white">Before / After</strong> lens
              below, filter by service or media format, bookmark your favorite inspirations, and
              inspect every Doha, Lusail, and The Pearl deliverable in full HD.
            </p>
          </div>

          {/* Summary Counter Pills */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                categoryFilter === 'all'
                  ? 'bg-[#d9f941] text-[#121118] shadow-[3px_3px_0px_#000]'
                  : 'bg-[#121118] text-white hover:border-white/30'
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase opacity-75 block">
                All Work
              </span>
              <span className="font-display font-extrabold text-xl sm:text-2xl">
                {GALLERY_ITEMS.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('images')}
              className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                categoryFilter === 'images'
                  ? 'bg-[#6ee7b7] text-[#121118] shadow-[3px_3px_0px_#000]'
                  : 'bg-[#121118] text-white hover:border-white/30'
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase opacity-75 block">
                HD Photos
              </span>
              <span className="font-display font-extrabold text-xl sm:text-2xl">
                {totalImagesCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('videos')}
              className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                categoryFilter === 'videos'
                  ? 'bg-[#f27438] text-[#121118] shadow-[3px_3px_0px_#000]'
                  : 'bg-[#121118] text-white hover:border-white/30'
              }`}
            >
              <span className="font-mono text-[10px] font-bold uppercase opacity-75 block">
                Video Reels
              </span>
              <span className="font-display font-extrabold text-xl sm:text-2xl">
                {totalVideosCount}
              </span>
            </button>
          </div>
        </div>

        {/* Interactive Before / After Split-Comparison Showcase */}
        <div className="rounded-2xl bg-[#121118] border-2 border-black shadow-[5px_5px_0px_#000] p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Interactive Split Viewport (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-black bg-[#0d1117] select-none">
              {/* Base Layer: AFTER (Exotic Tint Protected - Crisp & Cool) */}
              <img
                fetchPriority="high"
                src={activeSpotlight.image}
                alt={activeSpotlight.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Clipped Layer: BEFORE (Untreated - Simulated Solar Glare / Raw Surface) */}
              <div
                style={{ clipPath: `inset(0 ${100 - compareSliderPos}% 0 0)` }}
                className="absolute inset-0 overflow-hidden"
              >
                <img
                  src={activeSpotlight.image}
                  alt={`${activeSpotlight.title} Before`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-125 contrast-75 sepia-[0.28]"
                />
                <div className="absolute inset-0 bg-amber-500/15 pointer-events-none" />
              </div>

              {/* Vertical Divider Handle */}
              <div
                style={{ left: `${compareSliderPos}%` }}
                className="absolute inset-y-0 w-1 bg-[#d9f941] shadow-[0_0_12px_rgba(0,0,0,0.9)] pointer-events-none"
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-mono font-extrabold text-xs">
                  ↔
                </div>
              </div>

              {/* Top Left & Top Right Labels */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/85 text-amber-300 font-mono font-extrabold text-[10px] border border-amber-400/40">
                BEFORE: {activeSpotlight.beforeLabel}
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#d9f941] text-[#121118] font-mono font-extrabold text-[10px] border border-black shadow-[2px_2px_0px_#000]">
                AFTER: {activeSpotlight.afterLabel}
              </div>
            </div>

            {/* Range Slider Control */}
            <div className="flex items-center gap-3 px-1">
              <span className="font-mono text-[10px] font-bold text-amber-300 uppercase shrink-0">
                Untreated
              </span>
              <input
                type="range"
                min={5}
                max={95}
                value={compareSliderPos}
                onChange={(e) => setCompareSliderPos(Number(e.target.value))}
                aria-label="Slide to compare before and after installation"
                className="flex-1 accent-[#d9f941] h-2 bg-white/15 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-[10px] font-bold text-[#6ee7b7] uppercase shrink-0">
                Exotic Protected
              </span>
            </div>
          </div>

          {/* Right Spotlight Selector & Quick Action (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1.5">
              <span className="font-mono text-[11px] font-extrabold text-[#f27438] uppercase tracking-wider block">
                ★ Interactive Before / After Inspector
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-snug">
                {activeSpotlight.title}
              </h2>
              <p className="font-mono text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#6ee7b7]" />
                <span>{activeSpotlight.location}</span>
              </p>
            </div>

            {/* Switch Between 4 Flagship Case Studies */}
            <div className="grid grid-cols-2 gap-2">
              {SPOTLIGHT_COMPARISONS.map((spot, idx) => (
                <button
                  key={spot.id}
                  type="button"
                  onClick={() => setActiveSpotlightIdx(idx)}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer flex items-center gap-2 ${
                    activeSpotlightIdx === idx
                      ? 'bg-[#d9f941] text-[#121118] border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#1a1922] text-slate-300 border-black hover:border-white/30'
                  }`}
                >
                  <img
                    src={spot.image}
                    alt={spot.badge}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-lg object-cover border border-black shrink-0"
                  />
                  <span className="font-mono font-extrabold text-[10px] leading-tight line-clamp-2">
                    {spot.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Verified Performance Pills */}
            <div className="flex flex-wrap gap-1.5">
              {activeSpotlight.metrics.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded-lg bg-[#1a1922] text-[#6ee7b7] font-mono text-[10px] font-extrabold border border-white/10"
                >
                  ✓ {m}
                </span>
              ))}
            </div>

            <div className="pt-1 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onSelectService(activeSpotlight.serviceSlug)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer text-center"
              >
                Open Service Simulator →
              </button>
              <button
                type="button"
                onClick={onOpenContact}
                className="py-2.5 px-4 rounded-xl bg-[#1a1922] hover:bg-white text-white hover:text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] transition-colors cursor-pointer"
              >
                Get Quote 🔥
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
