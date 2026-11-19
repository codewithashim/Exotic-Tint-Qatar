'use client';

import { X } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import type { ReelSlide } from '@/features/home/data/reels-data';

interface ReelFullscreenModalProps {
  reel: ReelSlide;
  onClose: () => void;
  onSelectService: (slug: string) => void;
  onQuickBookService: (serviceTitle: string) => void;
}

/** Full-screen viewer for a single reel with booking / service CTAs. */
export default function ReelFullscreenModal({
  reel: fullscreenReel,
  onClose,
  onSelectService,
  onQuickBookService,
}: ReelFullscreenModalProps) {
  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[380px] aspect-[9/16] max-h-[90vh] rounded-[28px] overflow-hidden border-2 border-white shadow-2xl bg-[#0d1117] flex flex-col justify-between p-5"
      >
        <img
          src={fullscreenReel.image}
          alt={fullscreenReel.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/15 to-black/95 pointer-events-none" />

        {/* Modal Top Header */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#d9f941] border-2 border-black p-0.5 flex items-center justify-center">
              <img
                src={ASSETS.brand.logoMark}
                alt="Exotic Tint Qatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-display font-extrabold text-sm text-white">
                Exotic Tint Qatar
              </p>
              <p className="font-mono text-[10px] text-[#d9f941]">
                📍 {fullscreenReel.location}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onClose()}
            className="w-9 h-9 rounded-full bg-white text-[#121118] border-2 border-black flex items-center justify-center font-extrabold cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Bottom Details & CTA */}
        <div className="relative z-10 space-y-3.5">
          <span
            className="inline-block px-3 py-1 rounded-md font-mono font-extrabold text-xs text-[#121118] border border-black"
            style={{ backgroundColor: fullscreenReel.accentColor }}
          >
            {fullscreenReel.badgeText}
          </span>
          <h3 className="font-display font-extrabold text-xl text-white leading-tight">
            {fullscreenReel.title}
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed">{fullscreenReel.caption}</p>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={() => {
                const title = fullscreenReel.serviceTitle;
                onClose();
                onQuickBookService(title);
              }}
              className="py-3 px-4 rounded-xl bg-[#f27438] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              Book in 60s 🔥
            </button>
            <button
              type="button"
              onClick={() => {
                const slug = fullscreenReel.serviceSlug;
                onClose();
                onSelectService(slug);
              }}
              className="py-3 px-4 rounded-xl bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              View Service Page →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
