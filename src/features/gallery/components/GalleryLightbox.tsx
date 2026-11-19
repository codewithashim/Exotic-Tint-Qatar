'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  Columns,
  MapPin,
  Calendar,
  Move,
  Heart,
  SplitSquareVertical,
  MessageCircle,
} from 'lucide-react';
import { whatsappLink } from '@/config/site';
import { type GalleryItem } from '@/features/gallery/data/gallery-data';
import { isDirectVideoFile } from '@/features/gallery/lib/media';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface GalleryLightboxProps {
  items: GalleryItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string, e?: React.MouseEvent) => void;
}

/**
 * Fullscreen lightbox with zoom/pan, before/after split view, custom video controls,
 * keyboard + swipe navigation and a thumbnail filmstrip. Mount only while open.
 */
export default function GalleryLightbox({
  items: filteredItems,
  index: lightboxIndex,
  onIndexChange,
  onClose: closeLightbox,
  savedIds,
  onToggleSave: handleToggleSave,
}: GalleryLightboxProps) {
  const { openService: onSelectService, openContact: onOpenContact } = useSiteNavigation();
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingPan, setIsDraggingPan] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [lightboxSplitMode, setLightboxSplitMode] = useState<boolean>(false);
  const [lightboxSplitPos, setLightboxSplitPos] = useState<number>(50);

  // Custom Video Player States inside Lightbox
  const videoStageRef = useRef<HTMLDivElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [videoSourceError, setVideoSourceError] = useState<boolean>(false);
  const [modalVideoPlaying, setModalVideoPlaying] = useState<boolean>(true);
  const [modalVideoMuted, setModalVideoMuted] = useState<boolean>(false);
  const [modalVideoVolume, setModalVideoVolume] = useState<number>(0.8);
  const [modalVideoProgress, setModalVideoProgress] = useState<number>(0);
  const [modalVideoDuration, setModalVideoDuration] = useState<number>(34);
  const [modalPlaybackRate, setModalPlaybackRate] = useState<number>(1);

  // Touch Swipe Tracking for Mobile Lightbox
  const touchStartXRef = useRef<number | null>(null);

  const activeLightboxItem = filteredItems[lightboxIndex];

  const hasNativeVideoStream = Boolean(
    activeLightboxItem.mediaType === 'video' &&
      isDirectVideoFile(activeLightboxItem.mediaUrl) &&
      !videoSourceError
  );

  // Reset player state whenever the shown item changes
  useEffect(() => {
    setVideoSourceError(false);
    setModalVideoDuration(activeLightboxItem.durationSec || 34);
    setModalVideoProgress(0);
    setModalVideoPlaying(true);
    setLightboxSplitMode(false);
  }, [activeLightboxItem]);

  // Simulated progress for items without a native video stream
  useEffect(() => {
    if (activeLightboxItem.mediaType !== 'video' || hasNativeVideoStream || !modalVideoPlaying) {
      return;
    }

    const durationSec = modalVideoDuration || 34;
    const stepMs = 100;
    const increment = ((stepMs / 1000) * modalPlaybackRate * 100) / durationSec;

    const timer = setInterval(() => {
      setModalVideoProgress((prev) => {
        const next = prev + increment;
        return next >= 100 ? 0 : next;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [activeLightboxItem, hasNativeVideoStream, modalVideoPlaying, modalVideoDuration, modalPlaybackRate]);

  const resetLightboxTransform = useCallback(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsDraggingPan(false);
  }, []);

  const setLightboxIndex = (index: number) => onIndexChange(index);

  const goToOffset = useCallback(
    (offset: number) => {
      if (filteredItems.length === 0) return;
      resetLightboxTransform();
      setModalVideoPlaying(true);
      setModalVideoProgress(0);
      onIndexChange((lightboxIndex + offset + filteredItems.length) % filteredItems.length);
    },
    [filteredItems.length, lightboxIndex, onIndexChange, resetLightboxTransform]
  );
  const goNextLightbox = useCallback(() => goToOffset(1), [goToOffset]);
  const goPrevLightbox = useCallback(() => goToOffset(-1), [goToOffset]);

  // Keyboard: Esc closes, arrows navigate, +/- zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        goNextLightbox();
      } else if (e.key === 'ArrowLeft') {
        goPrevLightbox();
      } else if (e.key === '+' || e.key === '=') {
        setZoomLevel((z) => Math.min(z + 0.5, 3));
      } else if (e.key === '-') {
        setZoomLevel((z) => {
          const next = Math.max(z - 0.5, 1);
          if (next === 1) setPanOffset({ x: 0, y: 0 });
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeLightbox, goNextLightbox, goPrevLightbox]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleMouseDownPan = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    e.preventDefault();
    setIsDraggingPan(true);
    dragStartRef.current = {
      x: e.clientX - panOffset.x,
      y: e.clientY - panOffset.y,
    };
  };

  const handleMouseMovePan = (e: React.MouseEvent) => {
    if (!isDraggingPan || zoomLevel <= 1) return;
    setPanOffset({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUpPan = () => {
    setIsDraggingPan(false);
  };

  const toggleModalVideoPlay = () => {
    if (hasNativeVideoStream && modalVideoRef.current) {
      const vid = modalVideoRef.current;
      if (vid.paused) {
        vid.play().catch(() => setVideoSourceError(true));
        setModalVideoPlaying(true);
      } else {
        vid.pause();
        setModalVideoPlaying(false);
      }
    } else {
      setModalVideoPlaying((prev) => !prev);
    }
  };

  const toggleModalVideoMute = () => {
    const nextMuted = !modalVideoMuted;
    setModalVideoMuted(nextMuted);
    if (hasNativeVideoStream && modalVideoRef.current) {
      modalVideoRef.current.muted = nextMuted;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setModalVideoVolume(val);
    setModalVideoMuted(val === 0);
    if (hasNativeVideoStream && modalVideoRef.current) {
      modalVideoRef.current.volume = val;
      modalVideoRef.current.muted = val === 0;
    }
  };

  const handleVideoScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setModalVideoProgress(val);
    if (hasNativeVideoStream && modalVideoRef.current && modalVideoDuration > 0) {
      modalVideoRef.current.currentTime = (val / 100) * modalVideoDuration;
    }
  };

  const cyclePlaybackSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextSpeed = speeds[(speeds.indexOf(modalPlaybackRate) + 1) % speeds.length];
    setModalPlaybackRate(nextSpeed);
    if (hasNativeVideoStream && modalVideoRef.current) {
      modalVideoRef.current.playbackRate = nextSpeed;
    }
  };

  const requestVideoFullscreen = () => {
    const targetEl = modalVideoRef.current || videoStageRef.current;
    if (targetEl && targetEl.requestFullscreen) {
      targetEl.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (sec: number) => {
    if (!sec || Number.isNaN(sec)) return '00:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={activeLightboxItem.title}
      onTouchStart={(e) => {
        touchStartXRef.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartXRef.current === null) return;
        const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
        if (deltaX > 60) goPrevLightbox();
        if (deltaX < -60) goNextLightbox();
        touchStartXRef.current = null;
      }}
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex flex-col justify-between p-2 sm:p-4 overflow-y-auto"
    >
      {/* Top Bar inside Lightbox */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between gap-2 bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] rounded-2xl px-3.5 py-2.5 z-30 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            style={{ backgroundColor: activeLightboxItem.accentColor || '#d9f941' }}
            className="px-2.5 py-1 rounded-lg text-[#121118] font-mono font-extrabold text-[10px] uppercase border border-black shrink-0"
          >
            {activeLightboxItem.mediaType === 'video' ? 'VIDEO REEL' : 'HD IMAGE'} ·{' '}
            {lightboxIndex + 1}/{filteredItems.length}
          </span>
          <h2 className="font-display font-extrabold text-xs sm:text-base text-white truncate">
            {activeLightboxItem.title}
          </h2>
        </div>

        {/* Right Controls: Split Compare Toggle + Zoom Controls + Save + Download + Close */}
        <div className="flex items-center gap-1.5 shrink-0">
          {activeLightboxItem.mediaType === 'image' && (
            <>
              <button
                type="button"
                onClick={() => {
                  setLightboxSplitMode((prev) => !prev);
                  resetLightboxTransform();
                }}
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-mono font-extrabold text-[11px] border transition-colors cursor-pointer ${
                  lightboxSplitMode
                    ? 'bg-[#d9f941] text-[#121118] border-black'
                    : 'bg-[#121118] text-slate-300 border-white/15 hover:text-white'
                }`}
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>Before/After Lens</span>
              </button>

              {!lightboxSplitMode && (
                <div className="hidden sm:flex items-center gap-1 bg-[#121118] border border-white/15 rounded-xl p-1">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    title="Zoom Out (-)"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="font-mono font-extrabold text-[11px] text-[#d9f941] px-1.5 tabular-nums">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    title="Zoom In (+)"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  {zoomLevel > 1 && (
                    <button
                      type="button"
                      onClick={resetLightboxTransform}
                      title="Reset Zoom"
                      className="p-1.5 rounded-lg text-[#f27438] hover:text-white cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={(e) => handleToggleSave(activeLightboxItem.id, e)}
            title="Save to Shortlist"
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              savedIds.includes(activeLightboxItem.id)
                ? 'bg-[#f45b9a] text-[#121118] border-black'
                : 'bg-[#121118] text-white border-white/20 hover:border-[#f45b9a]'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                savedIds.includes(activeLightboxItem.id) ? 'fill-current' : ''
              }`}
            />
          </button>

          <a
            href={activeLightboxItem.thumbnailUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            title="Download Original Media"
            className="p-2 rounded-xl bg-[#121118] hover:bg-[#d9f941] text-white hover:text-[#121118] border border-white/20 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Close Lightbox"
            className="px-3 py-2 rounded-xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs border-2 border-black flex items-center gap-1 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">ESC</span>
          </button>
        </div>
      </div>

      {/* Center Viewport: Media Stage + Left/Right Prev/Next Arrows + Project Details Sidebar */}
      <div className="max-w-6xl w-full mx-auto my-auto py-2.5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Media Stage (8 Columns on Desktop) */}
        <div
          ref={videoStageRef}
          className="lg:col-span-8 relative rounded-2xl bg-[#0d1117] border-2 border-black shadow-[6px_6px_0px_#000] overflow-hidden flex items-center justify-center min-h-[260px] sm:min-h-[390px] max-h-[62dvh]"
        >
          {/* Previous Button (←) */}
          <button
            type="button"
            onClick={goPrevLightbox}
            aria-label="Previous item"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#121118]/90 hover:bg-[#d9f941] text-white hover:text-[#121118] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Button (→) */}
          <button
            type="button"
            onClick={goNextLightbox}
            aria-label="Next item"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#121118]/90 hover:bg-[#d9f941] text-white hover:text-[#121118] border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {activeLightboxItem.mediaType === 'image' ? (
            lightboxSplitMode ? (
              /* Interactive Before/After Split Lens inside Lightbox */
              <div className="relative w-full h-[58dvh] overflow-hidden select-none flex items-center justify-center">
                <img
                  src={activeLightboxItem.thumbnailUrl}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div
                  style={{ clipPath: `inset(0 ${100 - lightboxSplitPos}% 0 0)` }}
                  className="absolute inset-0 overflow-hidden"
                >
                  <img
                    src={activeLightboxItem.thumbnailUrl}
                    alt="Untreated simulation"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover brightness-125 contrast-75 sepia-[0.3]"
                  />
                </div>
                <div
                  style={{ left: `${lightboxSplitPos}%` }}
                  className="absolute inset-y-0 w-1 bg-[#d9f941] pointer-events-none"
                />
                <div className="absolute bottom-4 inset-x-12 z-30 bg-[#121118]/90 border border-white/20 rounded-xl px-4 py-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] text-amber-300 font-bold">BEFORE</span>
                  <input
                    type="range"
                    min={5}
                    max={95}
                    value={lightboxSplitPos}
                    onChange={(e) => setLightboxSplitPos(Number(e.target.value))}
                    className="flex-1 accent-[#d9f941] cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-[#6ee7b7] font-bold">
                    EXOTIC PROTECTED
                  </span>
                </div>
              </div>
            ) : (
              <div
                onMouseDown={handleMouseDownPan}
                onMouseMove={handleMouseMovePan}
                onMouseUp={handleMouseUpPan}
                onMouseLeave={handleMouseUpPan}
                onDoubleClick={() => {
                  if (zoomLevel > 1) {
                    resetLightboxTransform();
                  } else {
                    setZoomLevel(2);
                  }
                }}
                className={`w-full h-full flex items-center justify-center overflow-hidden select-none ${
                  zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
              >
                <img
                  src={activeLightboxItem.thumbnailUrl}
                  alt={activeLightboxItem.title}
                  referrerPolicy="no-referrer"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${
                      panOffset.y / zoomLevel
                    }px)`,
                  }}
                  className="max-h-[58dvh] w-auto object-contain transition-transform duration-150"
                />

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#121118]/90 border border-white/20 text-[10px] font-mono text-slate-300 flex items-center gap-1.5 pointer-events-none">
                  <Move className="w-3 h-3 text-[#d9f941]" />
                  <span>
                    {zoomLevel > 1
                      ? 'Drag to pan · Double-click to reset'
                      : 'Double-click to zoom 200%'}
                  </span>
                </div>
              </div>
            )
          ) : (
            /* Custom Video Player with Scrubber, Volume, Speed & Fullscreen */
            <div className="relative w-full h-full flex flex-col justify-between bg-black">
              <div
                onClick={toggleModalVideoPlay}
                className="relative flex-1 overflow-hidden flex items-center justify-center cursor-pointer min-h-[240px] sm:min-h-[340px]"
              >
                {hasNativeVideoStream ? (
                  <video
                    ref={modalVideoRef}
                    src={activeLightboxItem.mediaUrl}
                    poster={activeLightboxItem.thumbnailUrl}
                    autoPlay
                    playsInline
                    onError={() => setVideoSourceError(true)}
                    onTimeUpdate={(e) => {
                      const vid = e.currentTarget;
                      if (vid.duration) {
                        setModalVideoDuration(vid.duration);
                        setModalVideoProgress((vid.currentTime / vid.duration) * 100);
                      }
                    }}
                    onLoadedMetadata={(e) => {
                      setModalVideoDuration(e.currentTarget.duration);
                    }}
                    className="max-h-[48dvh] w-full object-contain mx-auto"
                  />
                ) : (
                  <div className="relative w-full h-[48dvh] overflow-hidden flex items-center justify-center bg-[#0d1117]">
                    <img
                      src={activeLightboxItem.thumbnailUrl}
                      alt={activeLightboxItem.title}
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `scale(${
                          1.04 + (modalVideoProgress / 100) * 0.14
                        }) translate(${
                          Math.sin((modalVideoProgress / 100) * Math.PI * 2) * 12
                        }px, ${
                          Math.cos((modalVideoProgress / 100) * Math.PI) * 6
                        }px)`,
                      }}
                      className="w-full h-full object-cover transition-transform duration-150"
                    />

                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#121118]/90 border border-white/20 font-mono text-[10px] text-[#6ee7b7] flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          modalVideoPlaying ? 'bg-[#6ee7b7] animate-ping' : 'bg-[#f27438]'
                        }`}
                      />
                      <span>
                        {modalVideoPlaying
                          ? `STREAMING · ${modalPlaybackRate}x`
                          : 'PAUSED'}
                      </span>
                    </div>

                    {!modalVideoPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#d9f941] text-[#121118] border-2 border-black shadow-[4px_4px_0px_#000] flex items-center justify-center">
                          <Play className="w-7 h-7 fill-current ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Custom Video Control Bar */}
              <div className="bg-[#121118] border-t-2 border-black p-3 space-y-2 z-20">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] text-slate-300 tabular-nums">
                    {formatTime((modalVideoProgress / 100) * modalVideoDuration)}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={0.1}
                    value={modalVideoProgress}
                    onChange={handleVideoScrub}
                    aria-label="Seek video timeline"
                    className="flex-1 accent-[#d9f941] h-1.5 bg-white/20 rounded-lg cursor-pointer"
                  />
                  <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                    {formatTime(modalVideoDuration)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={toggleModalVideoPlay}
                      className="px-3 py-1.5 rounded-lg bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      {modalVideoPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleModalVideoMute}
                      className="p-1.5 rounded-lg bg-[#1a1922] text-white border border-white/15 cursor-pointer"
                    >
                      {modalVideoMuted ? (
                        <VolumeX className="w-4 h-4 text-[#f27438]" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-[#6ee7b7]" />
                      )}
                    </button>

                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={modalVideoMuted ? 0 : modalVideoVolume}
                      onChange={handleVolumeChange}
                      aria-label="Video volume"
                      className="hidden sm:block w-20 accent-[#6ee7b7] h-1 bg-white/20 rounded cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={cyclePlaybackSpeed}
                      className="px-2.5 py-1 rounded-lg bg-[#1a1922] text-slate-200 font-mono font-bold text-[11px] border border-white/15 cursor-pointer"
                    >
                      {modalPlaybackRate}x
                    </button>

                    <button
                      type="button"
                      onClick={requestVideoFullscreen}
                      title="Fullscreen Video"
                      className="p-1.5 rounded-lg bg-[#1a1922] hover:bg-[#d9f941] text-white hover:text-[#121118] border border-white/15 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Project Metadata & Action Sidebar (4 Columns on Desktop) */}
        <div className="lg:col-span-4 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-4 sm:p-5 space-y-3.5">
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1 text-[#6ee7b7] font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeLightboxItem.location || 'Doha, Qatar'}</span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{activeLightboxItem.publishedAt}</span>
              </span>
            </div>

            <h3 className="font-display font-extrabold text-base sm:text-lg text-white leading-snug">
              {activeLightboxItem.title}
            </h3>

            {activeLightboxItem.clientOrProject && (
              <p className="font-mono text-xs font-bold text-[#d9f941]">
                {activeLightboxItem.clientOrProject}
              </p>
            )}
          </div>

          {activeLightboxItem.description && (
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeLightboxItem.description}
            </p>
          )}

          {activeLightboxItem.specs && activeLightboxItem.specs.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {activeLightboxItem.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="p-2 rounded-xl bg-[#121118] border border-white/10"
                >
                  <span className="font-mono text-[9px] uppercase text-slate-400 block truncate">
                    {spec.label}
                  </span>
                  <span className="font-display font-extrabold text-xs text-white block mt-0.5">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pt-1 space-y-2">
            {activeLightboxItem.serviceSlug && (
              <button
                type="button"
                onClick={() => {
                  const slug = activeLightboxItem.serviceSlug!;
                  closeLightbox();
                  onSelectService(slug);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-[#d9f941] hover:bg-white text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Explore {activeLightboxItem.serviceTitle}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  closeLightbox();
                  onOpenContact();
                }}
                className="py-2.5 px-3 rounded-xl bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] text-center cursor-pointer"
              >
                Book in 60s 🔥
              </button>

              <a
                href={whatsappLink(
                  `Hi Exotic Tint Qatar! I want a quote similar to "${activeLightboxItem.title}" (${activeLightboxItem.id}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#6ee7b7] hover:bg-white text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] flex items-center justify-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Thumbnail Filmstrip Scrubber */}
      <div className="max-w-6xl w-full mx-auto bg-[#1a1922] border-2 border-black rounded-2xl p-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        {filteredItems.map((thumb, idx) => {
          const isCurrent = idx === lightboxIndex;
          return (
            <button
              key={thumb.id}
              type="button"
              onClick={() => {
                resetLightboxTransform();
                setLightboxIndex(idx);
              }}
              className={`relative w-16 h-11 sm:w-20 sm:h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                isCurrent
                  ? 'border-[#d9f941] scale-105 shadow-[2px_2px_0px_#000]'
                  : 'border-black opacity-55 hover:opacity-100'
              }`}
            >
              <img
                src={thumb.thumbnailUrl}
                alt={thumb.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {thumb.mediaType === 'video' && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <Play className="w-3 h-3 text-[#d9f941] fill-current" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
