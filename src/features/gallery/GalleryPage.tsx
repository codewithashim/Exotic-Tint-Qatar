'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GALLERY_FILTER_TAGS,
  GalleryItem,
} from '@/features/gallery/data/gallery-data';
import GallerySubHeader from './components/sections/GallerySubHeader';
import GallerySpotlightHero from './components/sections/GallerySpotlightHero';
import GalleryCommandBar from './components/sections/GalleryCommandBar';
import GalleryGrid from './components/sections/GalleryGrid';
import SavedShortlistBar from './components/sections/SavedShortlistBar';
import GalleryLightbox from './components/GalleryLightbox';
import type { CategoryFilter, LayoutMode, SortMode } from './types';

const INITIAL_BATCH_SIZE = 9;
const LOAD_MORE_STEP = 6;

/** Work gallery: before/after lab, filterable portfolio grid and lightbox. */
export default function GalleryPage() {
  // Filter, Sort & Search States
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortMode, setSortMode] = useState<SortMode>('featured');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('bento');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [copiedShareUrl, setCopiedShareUrl] = useState(false);

  // Pagination / Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  // Lightbox Modal States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 1. Read URL Query Parameters & LocalStorage Saved Items on Initial Mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = window.localStorage.getItem('etq_saved_gallery');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setSavedIds(parsed);
      }
    } catch {
      // ignore storage errors
    }

    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category')?.toLowerCase();
    const tagParam = params.get('tag');
    const qParam = params.get('q');
    const itemParam = params.get('item');

    if (
      catParam === 'images' ||
      catParam === 'videos' ||
      catParam === 'all' ||
      catParam === 'saved'
    ) {
      setCategoryFilter(catParam);
    }
    if (tagParam) {
      setActiveTag(tagParam);
    }
    if (qParam) {
      setSearchQuery(qParam);
    }
    if (itemParam) {
      const idx = GALLERY_ITEMS.findIndex((g) => g.id === itemParam);
      if (idx !== -1) {
        setLightboxIndex(idx);
      }
    }
  }, []);

  const handleToggleSave = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        window.localStorage.setItem('etq_saved_gallery', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, []);

  // 2. Filtered & Sorted Portfolio Items
  const filteredItems = useMemo(() => {
    const base = GALLERY_ITEMS.filter((item) => {
      if (categoryFilter === 'images' && item.mediaType !== 'image') return false;
      if (categoryFilter === 'videos' && item.mediaType !== 'video') return false;
      if (categoryFilter === 'saved' && !savedIds.includes(item.id)) return false;

      if (
        activeTag !== 'All' &&
        !item.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())
      ) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q) || false;
        const matchClient = item.clientOrProject?.toLowerCase().includes(q) || false;
        const matchLocation = item.location?.toLowerCase().includes(q) || false;
        const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchClient || matchLocation || matchTags;
      }

      return true;
    });

    if (sortMode === 'newest') {
      return [...base].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }
    if (sortMode === 'videos-first') {
      return [...base].sort((a, b) =>
        a.mediaType === b.mediaType ? 0 : a.mediaType === 'video' ? -1 : 1
      );
    }
    if (sortMode === 'photos-first') {
      return [...base].sort((a, b) =>
        a.mediaType === b.mediaType ? 0 : a.mediaType === 'image' ? -1 : 1
      );
    }
    return base;
  }, [categoryFilter, activeTag, searchQuery, sortMode, savedIds]);

  // Compute Tag Counts for User-Friendly Pills
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = { All: GALLERY_ITEMS.length };
    GALLERY_FILTER_TAGS.forEach((tag) => {
      counts[tag] = GALLERY_ITEMS.filter((item) =>
        item.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
      ).length;
    });
    return counts;
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_BATCH_SIZE);
  }, [categoryFilter, activeTag, searchQuery, sortMode]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const hasMore = visibleCount < filteredItems.length;

  // 3. Sync Active Filters to URL Query Parameters for Shareability
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    if (categoryFilter !== 'all') params.set('category', categoryFilter);
    if (activeTag !== 'All') params.set('tag', activeTag);
    if (searchQuery.trim() !== '') params.set('q', searchQuery.trim());
    if (lightboxIndex !== null && filteredItems[lightboxIndex]) {
      params.set('item', filteredItems[lightboxIndex].id);
    }

    const queryString = params.toString();
    const basePath = window.location.pathname;
    const newUrl = queryString ? `${basePath}?${queryString}` : basePath;
    window.history.replaceState({}, '', newUrl);
  }, [categoryFilter, activeTag, searchQuery, lightboxIndex, filteredItems]);

  // 4. Infinite Scroll via IntersectionObserver with Skeleton Loaders
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + LOAD_MORE_STEP, filteredItems.length));
      setIsLoadingMore(false);
    }, 280);
  }, [isLoadingMore, hasMore, filteredItems.length]);

  useEffect(() => {
    const node = loadMoreTriggerRef.current;
    if (!node || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingMore) {
          handleLoadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, handleLoadMore]);

  // 5. Lightbox open/close (the lightbox component owns zoom/pan/video state)
  const openLightboxForItem = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((i) => i.id === item.id);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const handleCopyShareUrl = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShareUrl(true);
    setTimeout(() => setCopiedShareUrl(false), 2500);
  };

  const totalImagesCount = GALLERY_ITEMS.filter((i) => i.mediaType === 'image').length;
  const totalVideosCount = GALLERY_ITEMS.filter((i) => i.mediaType === 'video').length;
  const hasActiveFilters =
    categoryFilter !== 'all' || activeTag !== 'All' || searchQuery.trim() !== '';

  return (
    <div className="min-h-screen text-[#f4f4f6] pb-24">
      <GallerySubHeader copiedShareUrl={copiedShareUrl} handleCopyShareUrl={handleCopyShareUrl} />

      <GallerySpotlightHero
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        totalImagesCount={totalImagesCount}
        totalVideosCount={totalVideosCount}
      />

      <GalleryCommandBar
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortMode={sortMode}
        setSortMode={setSortMode}
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
        savedIds={savedIds}
        tagCounts={tagCounts}
        filteredItems={filteredItems}
        visibleItems={visibleItems}
        hasActiveFilters={hasActiveFilters}
        totalImagesCount={totalImagesCount}
        totalVideosCount={totalVideosCount}
      />

      <GalleryGrid
        filteredItems={filteredItems}
        visibleItems={visibleItems}
        visibleCount={visibleCount}
        layoutMode={layoutMode}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        setActiveTag={setActiveTag}
        setSearchQuery={setSearchQuery}
        savedIds={savedIds}
        handleToggleSave={handleToggleSave}
        openLightboxForItem={openLightboxForItem}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        handleLoadMore={handleLoadMore}
        loadMoreTriggerRef={loadMoreTriggerRef}
      />

      {/* FLOATING SAVED SHORTLIST BAR (When User Bookmarks Projects) */}
      {savedIds.length > 0 && lightboxIndex === null && (
        <SavedShortlistBar
          savedIds={savedIds}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
      )}

      {/* FULLSCREEN LIGHTBOX (zoom, split compare, video controls, filmstrip) */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <GalleryLightbox
          items={filteredItems}
          index={lightboxIndex}
          onIndexChange={setLightboxIndex}
          onClose={closeLightbox}
          savedIds={savedIds}
          onToggleSave={handleToggleSave}
        />
      )}
    </div>
  );
}
