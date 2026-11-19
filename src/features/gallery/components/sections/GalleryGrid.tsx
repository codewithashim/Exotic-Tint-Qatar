'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import GalleryCard from '@/features/gallery/components/GalleryCard';
import { GALLERY_ITEMS, GalleryItem } from '@/features/gallery/data/gallery-data';
import { type CategoryFilter, type LayoutMode } from '@/features/gallery/types';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface GalleryGridProps {
  filteredItems: GalleryItem[];
  visibleItems: GalleryItem[];
  visibleCount: number;
  layoutMode: LayoutMode;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  setActiveTag: (tag: string) => void;
  setSearchQuery: (query: string) => void;
  savedIds: string[];
  handleToggleSave: (id: string, e?: React.MouseEvent) => void;
  openLightboxForItem: (item: GalleryItem) => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  handleLoadMore: () => void;
  loadMoreTriggerRef: React.RefObject<HTMLDivElement | null>;
}

/** Bento / masonry / list grid with infinite scroll and empty state. */
export default function GalleryGrid({
  filteredItems,
  visibleItems,
  visibleCount,
  layoutMode,
  categoryFilter,
  setCategoryFilter,
  setActiveTag,
  setSearchQuery,
  savedIds,
  handleToggleSave,
  openLightboxForItem,
  hasMore,
  isLoadingMore,
  handleLoadMore,
  loadMoreTriggerRef,
}: GalleryGridProps) {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      {filteredItems.length === 0 ? (
        <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-12 text-center space-y-4">
          <p className="font-display font-extrabold text-2xl text-white">
            {categoryFilter === 'saved'
              ? 'Your Saved Shortlist is Empty'
              : 'No matching portfolio deliverables found'}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            {categoryFilter === 'saved'
              ? 'Tap the heart icon (♥) on any photo or video card to bookmark your favorite tint or protection styles.'
              : 'Try clearing your search query or switching the media category filter back to All Media.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('all');
              setActiveTag('All');
              setSearchQuery('');
            }}
            className="px-5 py-2.5 rounded-xl bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
          >
            Show All {GALLERY_ITEMS.length} Projects
          </button>
        </div>
      ) : (
        <>
          <div
            className={
              layoutMode === 'list'
                ? 'space-y-4'
                : layoutMode === 'masonry'
                ? 'columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5'
                : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
            }
          >
            {visibleItems.map((item) => (
              <div
                key={item.id}
                className={layoutMode === 'masonry' ? 'break-inside-avoid' : ''}
              >
                <GalleryCard
                  item={item}
                  layoutMode={layoutMode}
                  isSaved={savedIds.includes(item.id)}
                  onToggleSave={handleToggleSave}
                  onOpenLightbox={openLightboxForItem}
                  onSelectService={onSelectService}
                />
              </div>
            ))}

            {/* Skeleton Loaders while loading more batches (Prevents CLS) */}
            {isLoadingMore &&
              Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="rounded-2xl bg-[#1a1922] border-2 border-black shadow-[5px_5px_0px_#000] overflow-hidden animate-pulse"
                >
                  <div className="aspect-[4/3] bg-[#252330] border-b-2 border-black" />
                  <div className="p-4 space-y-2.5">
                    <div className="h-3 w-1/2 bg-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-white/15 rounded" />
                    <div className="h-3 w-2/3 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
          </div>

          {/* Infinite Scroll Sentinel & Manual Load More Controls */}
          <div ref={loadMoreTriggerRef} className="pt-10 flex flex-col items-center gap-3">
            {hasMore ? (
              <button
                type="button"
                onClick={handleLoadMore}
                disabled={isLoadingMore}
                className="px-6 py-3 rounded-full bg-[#d9f941] hover:bg-[#f27438] text-[#121118] font-display font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] transition-colors cursor-pointer"
              >
                {isLoadingMore
                  ? 'Loading Deliverables...'
                  : `Load More Deliverables (${filteredItems.length - visibleCount} Remaining)`}
              </button>
            ) : (
              <div className="px-4 py-2 rounded-full bg-[#1a1922] border-2 border-black text-slate-400 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#6ee7b7]" />
                <span>All {filteredItems.length} matching deliverables displayed</span>
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}
