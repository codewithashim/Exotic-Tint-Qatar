'use client';

import { useEffect, useRef, useState } from 'react';
import { preload } from 'react-dom';
import { ArrowUpRight, Pause, Phone, Play } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';
import { SITE_CONFIG } from '@/config/site';
import { ALL_SERVICES } from '@/features/services';

/** Poster shown until the video plays (and the LCP image). */
const HERO_POSTER = ASSETS.services.residential;

/** Full-screen video hero with headline, primary CTAs and headline stats. */
export default function HeroSection() {
  // The poster is the first thing painted (LCP candidate): fetch it with high priority.
  preload(HERO_POSTER, { as: 'image', fetchPriority: 'high' });
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  // Mirrors the <video> element's real state via its play/pause events.
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(true);

  // Respect "reduce motion": keep the still poster instead of an autoplaying video.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      heroVideoRef.current?.pause();
    }
  }, []);

  const toggleHeroVideo = () => {
    const vid = heroVideoRef.current;
    if (!vid) return;
    if (vid.paused) vid.play().catch(() => {});
    else vid.pause();
  };

  return (
    <section className="relative w-full min-h-[calc(100dvh-4.25rem)] flex flex-col justify-between overflow-hidden border-b-4 border-black bg-[#07090e]">
      {/* Full-screen background video (decorative, muted) */}
      <video
        ref={heroVideoRef}
        src={ASSETS.videos.heroStudio}
        poster={HERO_POSTER}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        onPlay={() => setHeroVideoPlaying(true)}
        onPause={() => setHeroVideoPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Clean Multi-Stop Architectural Contrast Scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#07090e]/90 via-[#07090e]/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#07090e]/85 via-transparent to-[#07090e]/35"
      />

      {/* Top bar */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 sm:pt-7 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="-rotate-1 bg-[#d9f941] text-[#121118] font-mono font-extrabold text-[11px] sm:text-xs px-3 py-1 rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] uppercase tracking-wider">
            Qatar’s #1 Window Tint &amp; Protection Studio
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 font-mono text-[11px] font-bold text-[#6ee7b7]">
            <span className="w-2 h-2 rounded-full bg-[#6ee7b7] animate-ping" />
            <span>Doha · Lusail · The Pearl · Al Rayyan · Wakra</span>
          </span>
        </div>

        <button
          type="button"
          onClick={toggleHeroVideo}
          aria-label={heroVideoPlaying ? 'Pause background video' : 'Play background video'}
          aria-pressed={!heroVideoPlaying}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-[#d9f941] text-white hover:text-[#121118] backdrop-blur-md border border-white/25 hover:border-black font-mono font-extrabold text-[11px] transition-colors cursor-pointer"
        >
          {heroVideoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>LIVE STUDIO VIDEO</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY STUDIO VIDEO</span>
            </>
          )}
        </button>
      </div>

      {/* Center Vertically-Aligned Hero Content over the background video */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 my-auto">
        <div className="max-w-2xl space-y-5 sm:space-y-6">
          <div className="space-y-2.5">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[4.6rem] leading-[0.94] tracking-tight text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]">
              <span className="block">Top Window</span>
              <span className="inline-flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-[#d9f941]">Tinting Qatar</span>
                <span className="inline-flex items-center gap-1 text-[#f27438] text-xl sm:text-3xl font-mono select-none -translate-y-1 sm:-translate-y-2">
                  <span>/</span>
                  <span>|</span>
                  <span>\</span>
                </span>
              </span>
              <span className="block text-white mt-0.5">
                Best {ALL_SERVICES.length} Solutions!
              </span>
            </h1>

            <p className="font-display font-extrabold text-base sm:text-2xl text-[#f27438] tracking-tight drop-shadow">
              → Enhance Privacy, Block 99.9% UV Rays &amp; Protect Your Surfaces!
            </p>
          </div>

          <p className="text-xs sm:text-base text-slate-100 max-w-xl leading-relaxed drop-shadow">
            Get{' '}
            <span className="text-white font-bold border-b-2 border-[#f27438] pb-0.5">
              premium-quality window tinting Qatar
            </span>{' '}
            and protective films for villas, apartments, offices, and commercial towers with{' '}
            <strong className="text-white">Exotic Tint Qatar</strong>. From sun control,
            smart and safety films to frosted designs, surface protection for marble, steel
            and wood, fabric nano coating, and premium wallpaper.
          </p>

          {/* Clean Primary & Secondary CTA Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href="#booking"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <span>Book In Less Than 60 Sec</span>
              <span>🔥</span>
            </a>

            <a
              href={SITE_CONFIG.phone.href}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#d9f941] hover:bg-white text-[#121118] font-mono font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-all whitespace-nowrap tabular-nums"
            >
              <Phone className="w-4 h-4" />
              <span>+974 31608423</span>
            </a>

            <SiteLink
              href={ROUTES.gallery}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-black/70 hover:bg-white/15 text-white font-display font-extrabold text-sm border-2 border-white/30 backdrop-blur-md transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Work Gallery</span>
              <ArrowUpRight className="w-4 h-4 text-[#d9f941]" />
            </SiteLink>
          </div>

          {/* Clean 3-Stat Telemetry Strip */}
          <div className="pt-2 grid grid-cols-3 gap-2.5 max-w-lg">
            <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[#d9f941] block leading-none">
                96%
              </span>
              <span className="font-mono text-[10px] uppercase text-slate-200 mt-1 block">
                IR Heat Rejected
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[#6ee7b7] block leading-none">
                99.9%
              </span>
              <span className="font-mono text-[10px] uppercase text-slate-200 mt-1 block">
                UV Ray Shield
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20">
              <span className="font-display font-extrabold text-xl sm:text-2xl text-[#f27438] block leading-none">
                10-Yr
              </span>
              <span className="font-mono text-[10px] uppercase text-slate-200 mt-1 block">
                Qatar Warranty
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Live Operating Strip Inside Full-Screen Hero */}
      <div className="relative z-20 w-full bg-black/65 backdrop-blur-md border-t border-white/15 py-2.5 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-300">
          <span>
            ★ <strong className="text-[#d9f941]">Exotic Tint Qatar</strong> — Let us
            work while you unwind!
          </span>
          <span className="text-[#6ee7b7] font-bold">
            Open 8:00 AM – 6:00 PM · 7 Days a Week · Mobile &amp; Studio
          </span>
        </div>
      </div>
    </section>
  );
}
