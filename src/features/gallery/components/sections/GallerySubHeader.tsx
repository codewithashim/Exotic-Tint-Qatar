'use client';

import { ArrowLeft, Share2 } from 'lucide-react';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface GallerySubHeaderProps {
  copiedShareUrl: boolean;
  handleCopyShareUrl: () => void;
}

/** Breadcrumb bar with share + quote actions. */
export default function GallerySubHeader({
  copiedShareUrl,
  handleCopyShareUrl,
}: GallerySubHeaderProps) {
  const { goHome: onBackHome, openContact: onOpenContact } = useSiteNavigation();

  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-xs font-mono">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fbbf24] hover:bg-[#d9f941] text-[#121118] font-extrabold border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
          <span className="text-slate-500">/</span>
          <span className="text-[#d9f941] font-extrabold uppercase tracking-wider">
            Work Portfolio Gallery
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyShareUrl}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121118] hover:border-[#d9f941] text-white font-mono font-bold text-xs border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#d9f941]" />
            <span>{copiedShareUrl ? 'Filter Link Copied!' : 'Share Gallery View'}</span>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f27438] hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer"
          >
            <span>Book Your Project 🔥</span>
          </button>
        </div>
      </div>
    </div>
  );
}
