'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ASSETS } from '@/config/assets';
import { HOME_SECTIONS } from '@/config/routes';
import { useBookingSelection } from '@/features/booking';
import { REELS_ITEMS, type ReelSlide } from '@/features/home/data/reels-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';
import ReelFullscreenModal from './ReelFullscreenModal';
import ReelsHeader from './ReelsHeader';
import {
  Heart,
  MessageCircle,
  Share2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Instagram,
} from 'lucide-react';

/** 9:16 Instagram-style reels carousel on the home page. */
export default function InstagramReelsShowreel() {
  const { openService: onSelectService } = useSiteNavigation();
  const { setService } = useBookingSelection();
  const onQuickBookService = (serviceTitle: string) => {
    setService(serviceTitle);
    document.getElementById(HOME_SECTIONS.booking)?.scrollIntoView({ behavior: 'smooth' });
  };
  // Default to index 2 (center card in the 5/6 card row, just like the reference screenshot!)
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [elapsedSec, setElapsedSec] = useState<number>(8);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});
  const [activeCommentModal, setActiveCommentModal] = useState<string | null>(null);
  const [fullscreenReel, setFullscreenReel] = useState<ReelSlide | null>(null);
  const [showQualityToast, setShowQualityToast] = useState<boolean>(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const activeReel = REELS_ITEMS[activeIndex] || REELS_ITEMS[0];

  // Center the active card horizontally inside the carousel container
  const scrollToCard = (index: number) => {
    const container = trackRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const scrollLeftTarget =
      container.scrollLeft +
      (cardRect.left - containerRect.left) -
      containerRect.width / 2 +
      cardRect.width / 2;

    container.scrollTo({
      left: scrollLeftTarget,
      behavior: 'smooth',
    });
  };

  const handleSelectIndex = (index: number) => {
    const clamped = (index + REELS_ITEMS.length) % REELS_ITEMS.length;
    setActiveIndex(clamped);
    setElapsedSec(1);
    setIsPlaying(true);
    setActiveCommentModal(null);
    scrollToCard(clamped);
  };

  // Auto-advance timer for active reel playback
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setElapsedSec((prev) => {
        if (prev >= activeReel.durationSec) {
          const nextIdx = (activeIndex + 1) % REELS_ITEMS.length;
          setActiveIndex(nextIdx);
          scrollToCard(nextIdx);
          return 1;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, activeIndex, activeReel.durationSec]);

  // Initial scroll centering on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollToCard(2);
    }, 120);
    return () => clearTimeout(timeout);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const progressPercent = Math.min(
    100,
    Math.round((elapsedSec / activeReel.durationSec) * 100)
  );

  return (
    <section
      id="instagram-reels-showreel"
      className="relative py-12 sm:py-16 overflow-hidden border-b border-white/10"
    >
      <ReelsHeader activeIndex={activeIndex} handleSelectIndex={handleSelectIndex} />

      {/* FULL-BLEED HORIZONTAL SNAP-SCROLL CAROUSEL WITH PEEK EDGES & ELEVATED CENTER REEL */}
      <div className="relative w-full">
        {/* Left & Right Subtle Peek Edge Vignettes on Desktop */}
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#121118] to-transparent z-20" />
        <div className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#121118] to-transparent z-20" />

        <div
          ref={trackRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-6 sm:px-12 lg:px-24 py-8 snap-x snap-mandatory scroll-smooth"
        >
          {REELS_ITEMS.map((reel, idx) => {
            const isActive = idx === activeIndex;
            const isLiked = !!likedIds[reel.id];
            const displayLikes = reel.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={reel.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                onClick={() => handleSelectIndex(idx)}
                className={`snap-center shrink-0 relative aspect-[9/16] rounded-[24px] overflow-hidden cursor-pointer select-none transition-all duration-500 ${
                  isActive
                    ? 'w-[285px] sm:w-[320px] md:w-[335px] scale-105 z-10 border-2 border-white/90 shadow-[0_24px_50px_rgba(0,0,0,0.85),0_0_0_3px_#000]'
                    : 'w-[240px] sm:w-[265px] md:w-[275px] scale-95 opacity-60 hover:opacity-90 hover:scale-[0.98] border-2 border-white/15 shadow-xl'
                }`}
              >
                {/* Reel Visual / Video Canvas */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-1000 ${
                    isActive && isPlaying ? 'scale-110' : 'scale-100'
                  }`}
                />

                {/* IF INACTIVE CARD: Frosted Dim Overlay + Centered White Play Circle (Exact Match to Reference Image!) */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/35 group/inactive flex flex-col justify-between p-4 transition-colors hover:bg-black/20">
                    {/* Top subtle badge on hover */}
                    <div className="flex items-center justify-between opacity-0 group-hover/inactive:opacity-100 transition-opacity duration-200">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/75 text-white font-mono text-[10px] font-bold">
                        {reel.views} views
                      </span>
                      <span className="w-7 h-7 rounded-full bg-black/75 text-white flex items-center justify-center">
                        <Instagram className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Centered Circular White Play Button */}
                    <div className="my-auto mx-auto w-12 h-12 rounded-full bg-white/95 text-[#121118] shadow-lg flex items-center justify-center group-hover/inactive:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>

                    {/* Bottom Caption Snippet on Hover */}
                    <div className="space-y-1">
                      <span
                        className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-extrabold text-[#121118] border border-black"
                        style={{ backgroundColor: reel.accentColor }}
                      >
                        {reel.badgeText}
                      </span>
                      <p className="font-display font-extrabold text-xs sm:text-sm text-white line-clamp-2 drop-shadow">
                        {reel.title}
                      </p>
                    </div>
                  </div>
                )}

                {/* IF ACTIVE CENTER CARD: Full Native Player Chrome (Exact Match to Reference Image!) */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90 flex flex-col justify-between p-4">
                    {/* Animated Subtle Scanline when Playing */}
                    {isPlaying && (
                      <div
                        className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#d9f941] to-transparent opacity-75 pointer-events-none"
                        style={{ top: `${progressPercent}%` }}
                      />
                    )}

                    {/* Top Bar: Avatar + Brand Name + Handle on Left | Reels/Social Badge on Right */}
                    <div className="relative z-10 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-[#d9f941] border-2 border-black p-0.5 flex items-center justify-center shrink-0 shadow-md">
                          <img
                            src={ASSETS.brand.logoMark}
                            alt="Exotic Tint Qatar"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-extrabold text-xs sm:text-sm text-white leading-tight truncate drop-shadow">
                            Exotic Tint Qatar
                          </p>
                          <p className="font-mono text-[10px] text-white/80 truncate">
                            exotictintqatar
                          </p>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-black/55 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0">
                        <Instagram className="w-4 h-4 text-[#f45b9a]" />
                      </div>
                    </div>

                    {/* Comment Drawer Popover (If Comment Icon Clicked) */}
                    {activeCommentModal === reel.id && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-20 mx-1 p-3 rounded-2xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-extrabold text-[10px] uppercase bg-[#d9f941] px-2 py-0.5 rounded border border-black">
                            VERIFIED CLIENT COMMENT
                          </span>
                          <button
                            type="button"
                            onClick={() => setActiveCommentModal(null)}
                            className="text-xs font-extrabold px-1 cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                        <p className="font-mono font-extrabold text-xs">
                          {reel.topComment.author}
                        </p>
                        <p className="text-xs font-semibold text-black/85">
                          “{reel.topComment.text}”
                        </p>
                      </div>
                    )}

                    {/* Quality Toast */}
                    {showQualityToast && (
                      <div className="relative z-20 mx-auto px-3 py-1.5 rounded-full bg-black/85 border border-white/20 text-[11px] font-mono text-[#d9f941]">
                        ✓ 1080p HD · 60 FPS Doha Studio Feed
                      </div>
                    )}

                    {/* Middle-Right Floating Action Rail + Bottom Info & Scrubber Controls */}
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-end justify-between gap-2">
                        {/* Left Caption & Service Quick-Book Tag */}
                        <div className="space-y-2 flex-1 min-w-0 pr-2">
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-md font-mono font-extrabold text-[10px] text-[#121118] border border-black shadow-[2px_2px_0px_#000]"
                            style={{ backgroundColor: reel.accentColor }}
                          >
                            {reel.badgeText}
                          </span>
                          <h3 className="font-display font-extrabold text-sm sm:text-base text-white leading-snug drop-shadow">
                            {reel.title}
                          </h3>
                          <p className="text-[11px] text-white/85 line-clamp-2 leading-relaxed">
                            {reel.caption}
                          </p>

                          <div className="flex items-center gap-1.5 pt-0.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onQuickBookService(reel.serviceTitle);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-[11px] border border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
                            >
                              Book in 60s 🔥
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectService(reel.serviceSlug);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-[#121118] font-mono font-extrabold text-[10px] border border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
                            >
                              Specs ↗
                            </button>
                          </div>
                        </div>

                        {/* Right Floating Social Icons (Heart, Comment, Share — Exact Match to Reference Image!) */}
                        <div className="flex flex-col items-center gap-3 shrink-0 pb-1">
                          <button
                            type="button"
                            onClick={(e) => toggleLike(reel.id, e)}
                            className="flex flex-col items-center gap-0.5 cursor-pointer group/like"
                          >
                            <Heart
                              className={`w-6 h-6 transition-transform active:scale-125 drop-shadow ${
                                isLiked
                                  ? 'text-rose-500 fill-rose-500'
                                  : 'text-white group-hover/like:text-rose-400'
                              }`}
                            />
                            <span className="font-mono font-extrabold text-[11px] text-white drop-shadow">
                              {displayLikes}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCommentModal(
                                activeCommentModal === reel.id ? null : reel.id
                              );
                            }}
                            className="flex flex-col items-center gap-0.5 cursor-pointer hover:text-[#d9f941]"
                          >
                            <MessageCircle className="w-6 h-6 text-white drop-shadow" />
                            <span className="font-mono font-extrabold text-[11px] text-white drop-shadow">
                              {reel.comments}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFullscreenReel(reel);
                            }}
                            className="flex flex-col items-center gap-0.5 cursor-pointer"
                          >
                            <Share2 className="w-5 h-5 text-white drop-shadow" />
                            <span className="font-mono font-extrabold text-[11px] text-white drop-shadow">
                              {reel.shares}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* BOTTOM PLAYER SCRUBBER & MEDIA CONTROLS BAR (Exact Match to Reference Image!) */}
                      <div
                        onClick={(e) => e.stopPropagation()}
                        className="pt-1 space-y-2"
                      >
                        {/* Scrubber Progress Line */}
                        <div
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const clickRatio = Math.max(
                              0,
                              Math.min(1, (e.clientX - rect.left) / rect.width)
                            );
                            setElapsedSec(
                              Math.max(1, Math.round(clickRatio * reel.durationSec))
                            );
                          }}
                          className="w-full h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                        >
                          <div
                            className="h-full bg-rose-500 transition-all duration-300"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>

                        {/* Player Bottom Control Row: Play/Pause, Mute, 00:08/00:45, Settings, Fullscreen */}
                        <div className="flex items-center justify-between text-white">
                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => setIsPlaying((prev) => !prev)}
                              aria-label={isPlaying ? 'Pause' : 'Play'}
                              className="w-6 h-6 flex items-center justify-center hover:text-[#d9f941] transition-colors cursor-pointer"
                            >
                              {isPlaying ? (
                                <Pause className="w-4 h-4 fill-current" />
                              ) : (
                                <Play className="w-4 h-4 fill-current" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => setIsMuted((prev) => !prev)}
                              aria-label={isMuted ? 'Unmute' : 'Mute'}
                              className="w-6 h-6 flex items-center justify-center hover:text-[#d9f941] transition-colors cursor-pointer"
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4 text-[#d9f941]" />
                              )}
                            </button>

                            <span className="font-mono text-[11px] font-semibold tracking-tight text-white/95 tabular-nums">
                              {formatTime(elapsedSec)}/{reel.durationFormatted}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5">
                            <button
                              type="button"
                              onClick={() => {
                                setShowQualityToast(true);
                                setTimeout(() => setShowQualityToast(false), 1800);
                              }}
                              aria-label="Video Quality"
                              className="w-6 h-6 flex items-center justify-center hover:text-[#d9f941] transition-colors cursor-pointer"
                            >
                              <Settings className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setFullscreenReel(reel)}
                              aria-label="Fullscreen"
                              className="w-6 h-6 flex items-center justify-center hover:text-[#d9f941] transition-colors cursor-pointer"
                            >
                              <Maximize2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM POSITION DOTS & ACTIVE SERVICE CONVERSION PILL */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {REELS_ITEMS.map((item, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectIndex(idx)}
                aria-label={`Go to Reel ${item.num}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer border border-black ${
                  isCurrent
                    ? 'w-9 bg-[#d9f941] shadow-[2px_2px_0px_#000]'
                    : 'w-2.5 bg-white/30 hover:bg-white/60'
                }`}
              />
            );
          })}
        </div>

        {/* Active Reel Service Conversion Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs">
          <span className="font-mono text-slate-400">
            Playing #{activeReel.num}:{' '}
            <strong className="text-white">{activeReel.serviceTitle}</strong> ({activeReel.location})
          </span>
          <button
            type="button"
            onClick={() => onSelectService(activeReel.serviceSlug)}
            className="px-3.5 py-1.5 rounded-full bg-[#1a1922] hover:bg-[#d9f941] text-[#d9f941] hover:text-[#121118] font-mono font-extrabold text-[11px] border border-[#d9f941]/40 hover:border-black transition-colors cursor-pointer"
          >
            Open {activeReel.serviceTitle} Simulator →
          </button>
        </div>
      </div>

      {/* FULLSCREEN REELS VIEWER MODAL */}
      {fullscreenReel && (
        <ReelFullscreenModal
          reel={fullscreenReel}
          onClose={() => setFullscreenReel(null)}
          onSelectService={onSelectService}
          onQuickBookService={onQuickBookService}
        />
      )}
    </section>
  );
}
