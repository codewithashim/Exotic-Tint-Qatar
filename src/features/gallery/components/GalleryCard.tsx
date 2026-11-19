'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowUpRight,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  Film,
  Image as ImageIcon,
  List,
  MapPin,
  Heart,
  Eye,
} from 'lucide-react';
import { type GalleryItem } from '@/features/gallery/data/gallery-data';
import type { LayoutMode } from '@/features/gallery/types';

interface GalleryCardProps {
  item: GalleryItem;
  layoutMode: LayoutMode;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onOpenLightbox: (item: GalleryItem) => void;
  onSelectService: (slug: string) => void;
}

export default function GalleryCard({
  item,
  layoutMode,
  isSaved,
  onToggleSave,
  onOpenLightbox,
  onSelectService,
}: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [hoverProgress, setHoverProgress] = useState(0);

  const aspectClass = useMemo(() => {
    if (layoutMode === 'list') return 'aspect-[16/10] sm:aspect-square md:aspect-[4/3]';
    if (layoutMode === 'masonry') {
      if (item.aspectRatio === '16:9') return 'aspect-video';
      if (item.aspectRatio === '1:1') return 'aspect-square';
      if (item.aspectRatio === '4:3') return 'aspect-[4/3]';
      return 'aspect-[4/3]';
    }
    return 'aspect-[4/3]';
  }, [item.aspectRatio, layoutMode]);

  // Smooth hover-autoplay timeline simulation for video cards
  useEffect(() => {
    if (!isVideoPlaying || item.mediaType !== 'video') {
      setHoverProgress(0);
      return;
    }
    const durationSec = item.durationSec || 32;
    const interval = setInterval(() => {
      setHoverProgress((prev) => {
        const next = prev + 100 / (durationSec * 10);
        return next >= 100 ? 0 : next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isVideoPlaying, item.mediaType, item.durationSec]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (item.mediaType === 'video') {
      setIsVideoPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (item.mediaType === 'video') {
      setIsVideoPlaying(false);
      setHoverProgress(0);
    }
  };

  const toggleHoverMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoMuted((prev) => !prev);
  };

  // Horizontal Case-Study List View Mode
  if (layoutMode === 'list') {
    return (
      <article
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpenLightbox(item)}
        className="group rounded-2xl bg-[#1a1922] border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[7px_7px_0px_#000] hover:border-[#d9f941] transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 md:grid-cols-12"
      >
        {/* Left Media Thumbnail (4 cols) */}
        <div className="md:col-span-4 relative aspect-video md:aspect-auto min-h-[210px] bg-[#0d1117] overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-105' : 'scale-100'
            }`}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              style={{ backgroundColor: item.accentColor || '#d9f941' }}
              className="px-2.5 py-1 rounded-full text-[#121118] font-mono font-extrabold text-[10px] uppercase border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1"
            >
              {item.mediaType === 'video' ? (
                <>
                  <Film className="w-3 h-3" />
                  <span>VIDEO · {item.durationFormatted || '00:34'}</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3 h-3" />
                  <span>HD PHOTO</span>
                </>
              )}
            </span>
          </div>

          {item.mediaType === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-[#d9f941] text-[#121118] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Right Case Study Details (8 cols) */}
        <div className="md:col-span-8 p-5 sm:p-6 flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#6ee7b7] font-extrabold">
                  {item.clientOrProject || item.location}
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">{item.publishedAt}</span>
              </div>

              <button
                type="button"
                onClick={(e) => onToggleSave(item.id, e)}
                aria-label={isSaved ? 'Remove from saved shortlist' : 'Save to shortlist'}
                className={`px-2.5 py-1 rounded-xl border-2 border-black font-mono text-[11px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-[#f45b9a] text-[#121118] shadow-[2px_2px_0px_#000]'
                    : 'bg-[#121118] text-slate-300 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-[#d9f941] transition-colors">
              {item.title}
            </h3>

            {item.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t border-white/10">
            {item.specs && item.specs.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {item.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="p-2 rounded-xl bg-[#121118] border border-white/10"
                  >
                    <span className="font-mono text-[9px] uppercase text-slate-400 block truncate">
                      {spec.label}
                    </span>
                    <span className="font-display font-extrabold text-xs text-[#d9f941] block">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                {item.tags.map((tag, i) => (
                  <React.Fragment key={tag}>
                    {i > 0 && <span>·</span>}
                    <span className="text-slate-300 font-semibold">#{tag}</span>
                  </React.Fragment>
                ))}
              </div>

              <div className="flex items-center gap-2">
                {item.serviceSlug && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectService(item.serviceSlug!);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-[#121118] hover:bg-[#d9f941] text-white hover:text-[#121118] font-mono font-extrabold text-xs border border-white/20 transition-colors cursor-pointer"
                  >
                    Service Spec →
                  </button>
                )}
                <span className="px-3.5 py-1.5 rounded-xl bg-[#f27438] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{item.mediaType === 'video' ? 'Play Reel' : 'Inspect HD'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Standard Bento Grid or Masonry Card View
  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenLightbox(item)}
      className="group relative rounded-2xl bg-[#1a1922] border-2 border-black shadow-[5px_5px_0px_#000] hover:shadow-[8px_8px_0px_#000] hover:border-[#d9f941] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
    >
      {/* Media Container with Aspect Ratio Lock to Prevent CLS */}
      <div className={`relative w-full ${aspectClass} bg-[#0d1117] overflow-hidden border-b-2 border-black`}>
        {/* Shimmer Placeholder Before Image Loads */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#23212d] via-[#1a1922] to-[#121118] animate-pulse flex items-center justify-center">
            <span className="font-mono text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Loading Deliverable...
            </span>
          </div>
        )}

        {/* Optimized Lazy-Loaded Poster / Motion Video Preview Frame */}
        <img
          src={item.thumbnailUrl}
          alt={item.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          style={
            isVideoPlaying
              ? {
                  transform: `scale(${1.06 + (hoverProgress / 100) * 0.08}) translate(${
                    Math.sin((hoverProgress / 100) * Math.PI * 2) * 6
                  }px, 0px)`,
                }
              : undefined
          }
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
          } ${!isVideoPlaying && isHovered ? 'scale-105' : 'scale-100'}`}
        />

        {/* Video Active Hover HUD & Bottom Progress Bar */}
        {item.mediaType === 'video' && isVideoPlaying && (
          <>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/70 via-transparent to-black/30" />
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/70 z-30">
              <div
                style={{
                  width: `${hoverProgress}%`,
                  backgroundColor: item.accentColor || '#d9f941',
                }}
                className="h-full transition-all duration-100"
              />
            </div>
          </>
        )}

        {/* Top Left: Media Type & Primary Tag Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 flex-wrap pr-12">
          <span
            style={{ backgroundColor: item.accentColor || '#d9f941' }}
            className="px-2.5 py-1 rounded-full text-[#121118] font-mono font-extrabold text-[10px] uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] flex items-center gap-1"
          >
            {item.mediaType === 'video' ? (
              <>
                <Film className="w-3 h-3" />
                <span>{isVideoPlaying ? 'PREVIEWING' : `VIDEO · ${item.durationFormatted || '00:34'}`}</span>
              </>
            ) : (
              <>
                <ImageIcon className="w-3 h-3" />
                <span>HD PHOTO</span>
              </>
            )}
          </span>
        </div>

        {/* Top Right: Save / Shortlist Bookmark Heart Button */}
        <button
          type="button"
          onClick={(e) => onToggleSave(item.id, e)}
          aria-label={isSaved ? 'Remove from saved shortlist' : 'Save to shortlist'}
          title={isSaved ? 'Saved to Shortlist' : 'Save Project to Shortlist'}
          className={`absolute top-3 right-3 z-30 w-8 h-8 rounded-full border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center transition-all cursor-pointer ${
            isSaved
              ? 'bg-[#f45b9a] text-[#121118] scale-110'
              : 'bg-[#121118]/90 text-white hover:bg-[#d9f941] hover:text-[#121118]'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Center Play Indicator for Videos */}
        {item.mediaType === 'video' && !isVideoPlaying && (
          <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-[#d9f941] text-[#121118] border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-5 h-5 fill-current ml-0.5" />
            </div>
          </div>
        )}

        {/* Video Hover Mute/Unmute Quick Button when Autoplaying */}
        {item.mediaType === 'video' && isVideoPlaying && (
          <button
            type="button"
            onClick={toggleHoverMute}
            aria-label={isVideoMuted ? 'Unmute video preview' : 'Mute video preview'}
            className="absolute bottom-3 left-3 z-30 w-8 h-8 rounded-full bg-[#121118]/90 text-white border border-white/30 flex items-center justify-center hover:bg-[#d9f941] hover:text-[#121118] transition-colors"
          >
            {isVideoMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Smooth Hover Overlay with Description & Quick Action */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#121118] via-[#121118]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-2">
            {item.description && (
              <p className="text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
                {item.description}
              </p>
            )}
            <div className="pt-1 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#d9f941] text-[#121118] font-display font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000]">
                <Maximize2 className="w-3 h-3" />
                <span>{item.mediaType === 'video' ? 'Open Video Player' : 'Inspect Full HD'}</span>
              </span>

              {item.serviceSlug && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(item.serviceSlug!);
                  }}
                  className="px-2.5 py-1.5 rounded-xl bg-[#121118] hover:bg-[#f27438] text-white hover:text-[#121118] font-mono font-extrabold text-[10px] border border-white/25 transition-colors cursor-pointer"
                >
                  Simulator →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Body Footer (Always Visible for Effortless Mobile & Desktop Scannability) */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-3 bg-[#1a1922]">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <span className="truncate text-[#6ee7b7] font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">{item.location || item.clientOrProject}</span>
            </span>
            <span className="shrink-0 tabular-nums">{item.publishedAt}</span>
          </div>

          <h3 className="font-display font-extrabold text-sm sm:text-base text-white group-hover:text-[#d9f941] transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h3>
        </div>

        {/* Always-Visible Key Performance Telemetry Strip */}
        {item.specs && item.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-1.5">
            {item.specs.slice(0, 2).map((spec) => (
              <div
                key={spec.label}
                className="px-2.5 py-1.5 rounded-lg bg-[#121118] border border-white/10 truncate"
              >
                <span className="font-mono text-[9px] text-slate-400 uppercase block truncate">
                  {spec.label}
                </span>
                <span className="font-mono font-extrabold text-[11px] text-[#d9f941] block truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Clean Metadata Tags & Quick Expand Trigger */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 truncate">
            {item.tags.slice(0, 2).map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span className="text-slate-300 font-semibold">{tag}</span>
              </React.Fragment>
            ))}
          </div>

          <span className="font-mono font-extrabold text-[11px] text-[#f27438] group-hover:translate-x-0.5 transition-transform shrink-0 flex items-center gap-0.5">
            <span>{item.mediaType === 'video' ? 'Watch' : 'Inspect'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
