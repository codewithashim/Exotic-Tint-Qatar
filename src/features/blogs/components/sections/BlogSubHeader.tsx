'use client';

import { ArrowLeft } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { BLOG_CATEGORIES } from '@/features/blogs/data/blog-categories';
import { type BlogPost } from '@/features/blogs/data/blogs-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface BlogSubHeaderProps {
  activePost: BlogPost | undefined;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  closePost: () => void;
}

/** Breadcrumb bar plus category filter tabs. */
export default function BlogSubHeader({
  activePost,
  selectedCategory,
  setSelectedCategory,
  closePost,
}: BlogSubHeaderProps) {
  const { goHome: onBackHome } = useSiteNavigation();

  return (
    <div className="bg-[#1a1922] border-b-2 border-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-3.5">
        {/* Row 1: Back Button + Breadcrumb + Quick Status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-bold">
            {activePost ? (
              <button
                type="button"
                onClick={() => closePost()}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d9f941] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#f27438] transition-colors cursor-pointer font-extrabold whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>All Blog Guides</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] hover:bg-[#d9f941] transition-colors cursor-pointer font-extrabold whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                <span>Back to Home</span>
              </button>
            )}

            <span className="text-slate-600 font-mono">/</span>
            <button
              type="button"
              onClick={() => closePost()}
              className="text-slate-300 hover:text-white whitespace-nowrap cursor-pointer"
            >
              Blogs &amp; Qatar Tinting Guides
            </button>
            {activePost && (
              <>
                <span className="text-slate-600 font-mono">/</span>
                <span className="text-[#d9f941] font-extrabold truncate max-w-[220px] sm:max-w-md">
                  {activePost.title}
                </span>
              </>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-[#121118] border border-white/15 font-mono text-[11px] font-bold text-slate-300 whitespace-nowrap">
              6 EXPERT QATAR GUIDES
            </span>
            <a
              href={SITE_CONFIG.phone.href}
              className="px-3 py-1 rounded-md bg-[#f27438] text-[#121118] border-2 border-black shadow-[2px_2px_0px_#000] font-mono text-[11px] font-extrabold hover:bg-[#d9f941] transition-colors whitespace-nowrap"
            >
              Call +974 31608423
            </a>
          </div>
        </div>

        {/* Row 2: Responsive Category Filter Grid (Zero Horizontal Scrollbar) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 pt-1">
          {BLOG_CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category && !activePost;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-2 rounded-xl text-xs font-extrabold border-2 border-black transition-all cursor-pointer text-center truncate ${
                  isSelected
                    ? 'bg-[#d9f941] text-[#121118] shadow-[3px_3px_0px_#000] -translate-y-0.5'
                    : 'bg-[#121118] text-slate-300 hover:text-white hover:bg-[#23222e]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
