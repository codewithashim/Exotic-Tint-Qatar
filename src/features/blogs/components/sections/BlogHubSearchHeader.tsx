'use client';

import { Search } from 'lucide-react';

interface BlogHubSearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

/** Blog hub title and search input. */
export default function BlogHubSearchHeader({
  searchQuery,
  setSearchQuery,
}: BlogHubSearchHeaderProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-block -rotate-1 bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs px-3.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
            EXOTIC TINT QATAR KNOWLEDGE HUB · 2026 GUIDES
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-[1.03] tracking-tight">
            Qatar Window Tinting &amp;{' '}
            <span className="text-[#f27438]">Surface Protection</span> Blogs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Expert insights on beating 50°C Doha heat, lowering Kahramaa AC bills, choosing
            privacy films for offices and villas, and protecting luxury marble countertops and
            Majlis sofas.
          </p>
        </div>

        {/* Instant Search Input */}
        <div className="w-full lg:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides (e.g. Lusail, Marble, UV)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#d9f941]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
