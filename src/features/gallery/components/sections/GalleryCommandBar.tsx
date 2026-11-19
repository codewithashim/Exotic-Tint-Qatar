'use client';

import {
  ArrowUpDown,
  Columns,
  Film,
  Heart,
  LayoutGrid,
  List,
  Search,
  SlidersHorizontal,
  Image as ImageIcon,
  X,
} from 'lucide-react';
import { GALLERY_FILTER_TAGS, GALLERY_ITEMS, type GalleryItem } from '@/features/gallery/data/gallery-data';
import type { CategoryFilter, LayoutMode, SortMode } from '@/features/gallery/types';

interface GalleryCommandBarProps {
  categoryFilter: CategoryFilter;
  setCategoryFilter: (filter: CategoryFilter) => void;
  activeTag: string;
  setActiveTag: (tag: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  savedIds: string[];
  tagCounts: Record<string, number>;
  filteredItems: GalleryItem[];
  visibleItems: GalleryItem[];
  hasActiveFilters: boolean;
  totalImagesCount: number;
  totalVideosCount: number;
}

/** Sticky command bar: media filter, tag pills, sort, search and layout switch. */
export default function GalleryCommandBar({
  categoryFilter,
  setCategoryFilter,
  activeTag,
  setActiveTag,
  searchQuery,
  setSearchQuery,
  sortMode,
  setSortMode,
  layoutMode,
  setLayoutMode,
  savedIds,
  tagCounts,
  filteredItems,
  visibleItems,
  hasActiveFilters,
  totalImagesCount,
  totalVideosCount,
}: GalleryCommandBarProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
      <div className="rounded-2xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-4 sm:p-5 space-y-4">
        {/* Row 1: Media Type Tabs + Search Input + Sort & View Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Media Type Segmented Buttons (Including Saved Board) */}
          <div
            role="group"
            aria-label="Filter by media type"
            className="flex items-center flex-wrap p-1.5 rounded-xl bg-[#121118] border-2 border-black gap-1"
          >
            <button
              type="button"
              onClick={() => setCategoryFilter('all')}
              className={`px-3 py-2 rounded-lg font-display font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === 'all'
                  ? 'bg-[#d9f941] text-[#121118] border border-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <span>All Media</span>
              <span className="font-mono text-[10px] opacity-80">({GALLERY_ITEMS.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('images')}
              className={`px-3 py-2 rounded-lg font-display font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === 'images'
                  ? 'bg-[#6ee7b7] text-[#121118] border border-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Photos</span>
              <span className="font-mono text-[10px] opacity-80">({totalImagesCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('videos')}
              className={`px-3 py-2 rounded-lg font-display font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === 'videos'
                  ? 'bg-[#f27438] text-[#121118] border border-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Videos</span>
              <span className="font-mono text-[10px] opacity-80">({totalVideosCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setCategoryFilter('saved')}
              className={`px-3 py-2 rounded-lg font-display font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                categoryFilter === 'saved'
                  ? 'bg-[#f45b9a] text-[#121118] border border-black shadow-[2px_2px_0px_#000]'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${savedIds.length > 0 ? 'fill-current text-[#f45b9a]' : ''}`} />
              <span>Saved</span>
              <span className="font-mono text-[10px] opacity-80">({savedIds.length})</span>
            </button>
          </div>

          {/* Search Input + Sort Selector + Layout Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 lg:max-w-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Lusail, villa, marble, Majlis, West Bay..."
                aria-label="Search gallery items"
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#121118] border-2 border-black text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#d9f941] font-medium"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-[#121118] border-2 border-black rounded-xl px-2.5 py-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#d9f941] mr-1.5 shrink-0" />
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                aria-label="Sort portfolio deliverables"
                className="bg-transparent font-mono font-extrabold text-[11px] text-white focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured" className="bg-[#121118]">
                  Sort: Featured
                </option>
                <option value="newest" className="bg-[#121118]">
                  Sort: Newest First
                </option>
                <option value="videos-first" className="bg-[#121118]">
                  Sort: Videos First
                </option>
                <option value="photos-first" className="bg-[#121118]">
                  Sort: Photos First
                </option>
              </select>
            </div>

            {/* 3-Way View Mode Toggle (Grid / Masonry / Case-Study List) */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#121118] border-2 border-black self-end sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode('bento')}
                title="Uniform Bento Grid"
                className={`px-2.5 py-1.5 rounded-lg font-mono font-extrabold text-[11px] flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'bento'
                    ? 'bg-[#d9f941] text-[#121118]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('masonry')}
                title="Editorial Masonry Layout"
                className={`px-2.5 py-1.5 rounded-lg font-mono font-extrabold text-[11px] flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'masonry'
                    ? 'bg-[#d9f941] text-[#121118]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Masonry</span>
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('list')}
                title="Detailed Case-Study List"
                className={`px-2.5 py-1.5 rounded-lg font-mono font-extrabold text-[11px] flex items-center gap-1 cursor-pointer ${
                  layoutMode === 'list'
                    ? 'bg-[#d9f941] text-[#121118]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Service Category Filter Pills with Live Item Counts */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-mono text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-[#f27438]" />
              <span>Service Category:</span>
            </span>

            {(['All', ...GALLERY_FILTER_TAGS] as const).map((tag) => {
              const active = activeTag.toLowerCase() === tag.toLowerCase();
              const count = tagCounts[tag] ?? 0;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#f27438] text-[#121118] border-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#121118] text-slate-300 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span>{tag}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      active ? 'bg-black/20 text-[#121118]' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Reset & Results Counter */}
          <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter('all');
                  setActiveTag('All');
                  setSearchQuery('');
                }}
                className="text-[#f45b9a] hover:underline font-extrabold cursor-pointer"
              >
                Reset Filters ×
              </button>
            )}
            <span>
              Showing <strong className="text-[#d9f941]">{visibleItems.length}</strong> of{' '}
              <strong className="text-white">{filteredItems.length}</strong> deliverables
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
