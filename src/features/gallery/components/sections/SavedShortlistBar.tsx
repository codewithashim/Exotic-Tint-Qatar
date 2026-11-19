'use client';

import { type CategoryFilter } from '@/features/gallery/types';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface SavedShortlistBarProps {
  savedIds: string[];
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
}

/** Floating bar summarising bookmarked projects. */
export default function SavedShortlistBar({
  savedIds,
  categoryFilter,
  setCategoryFilter,
}: SavedShortlistBarProps) {
  const { openContact: onOpenContact } = useSiteNavigation();

  return (
    <div className="fixed bottom-16 sm:bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[calc(100%-2rem)] bg-[#1a1922]/95 backdrop-blur-xl border-2 border-black shadow-[6px_6px_0px_#000] rounded-2xl p-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="w-8 h-8 rounded-xl bg-[#f45b9a] text-[#121118] border border-black font-mono font-extrabold text-xs flex items-center justify-center shrink-0">
          {savedIds.length}
        </span>
        <div className="min-w-0">
          <p className="font-display font-extrabold text-xs sm:text-sm text-white truncate">
            Saved Project Shortlist
          </p>
          <p className="font-mono text-[10px] text-slate-400 truncate">
            Ready to discuss or quote with our Doha team
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          onClick={() =>
            setCategoryFilter(categoryFilter === 'saved' ? 'all' : 'saved')
          }
          className="px-3 py-1.5 rounded-xl bg-[#121118] hover:bg-[#d9f941] text-white hover:text-[#121118] font-mono font-extrabold text-[11px] border border-white/20 transition-colors cursor-pointer"
        >
          {categoryFilter === 'saved' ? 'Show All' : 'View Saved'}
        </button>
        <button
          type="button"
          onClick={onOpenContact}
          className="px-3 py-1.5 rounded-xl bg-[#f27438] text-[#121118] font-display font-extrabold text-[11px] border border-black shadow-[2px_2px_0px_#000] cursor-pointer"
        >
          Quote Saved 🔥
        </button>
      </div>
    </div>
  );
}
