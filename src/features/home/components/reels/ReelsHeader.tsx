import { ArrowUpRight, ChevronLeft, ChevronRight, Instagram } from 'lucide-react';

interface ReelsHeaderProps {
  activeIndex: number;
  handleSelectIndex: (index: number) => void;
}

/** Section title, follow CTA and prev/next arrows for the reels carousel. */
export default function ReelsHeader({ activeIndex, handleSelectIndex }: ReelsHeaderProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        {/* Left Header Content */}
        <div className="space-y-2.5 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1a1922] border-2 border-black shadow-[3px_3px_0px_#000]">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="font-mono font-extrabold text-[11px] uppercase tracking-wider text-[#d9f941]">
              Live Feed · ⚡ Behind The Scenes
            </span>
          </div>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-[1.04]">
            See Our Craftsmanship <span className="text-[#f27438]">In Motion</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Short studio &amp; on-site clips from Doha, Lusail, and The Pearl—so you can see how
            our nano-ceramic window tints, marble protection film, and sofa nano coating perform
            before you book.
          </p>
        </div>

        {/* Right Header Controls: Follow on Instagram CTA + Sleek Left/Right Circular Arrow Buttons */}
        <div className="flex flex-wrap items-center gap-3 self-start md:self-end">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f45b9a] via-[#f27438] to-[#fbbf24] text-[#121118] font-display font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-transform whitespace-nowrap"
          >
            <Instagram className="w-4 h-4 shrink-0" />
            <span>Follow @exotictintqatar</span>
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </a>

          {/* Sleek Circular Left / Right Arrow Buttons (Matching Reference Image) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectIndex(activeIndex - 1)}
              aria-label="Previous Reel"
              className="w-11 h-11 rounded-full bg-[#1a1922] hover:bg-[#d9f941] text-white hover:text-[#121118] border-2 border-white/25 hover:border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleSelectIndex(activeIndex + 1)}
              aria-label="Next Reel"
              className="w-11 h-11 rounded-full bg-[#1a1922] hover:bg-[#d9f941] text-white hover:text-[#121118] border-2 border-white/25 hover:border-black shadow-[3px_3px_0px_#000] flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
