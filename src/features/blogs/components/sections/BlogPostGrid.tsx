'use client';

import { ArrowRight } from 'lucide-react';
import { type BlogPost } from '@/features/blogs/data/blogs-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface BlogPostGridProps {
  filteredPosts: BlogPost[];
  handleOpenPost: (slug: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
}

/** Grid of all posts matching the current filters. */
export default function BlogPostGrid({
  filteredPosts,
  handleOpenPost,
  searchQuery,
  setSearchQuery,
  setSelectedCategory,
}: BlogPostGridProps) {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      {filteredPosts.length === 0 ? (
        <div className="rounded-3xl bg-[#1a1922] border-2 border-black p-10 text-center space-y-3">
          <p className="font-display font-extrabold text-xl text-white">
            No guides matched “{searchQuery}”
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Guides');
            }}
            className="px-5 py-2.5 rounded-full bg-[#d9f941] text-[#121118] font-extrabold text-xs border-2 border-black cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              onClick={() => handleOpenPost(post.slug)}
              className={`${post.bgClass} text-[#121118] rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6 flex flex-col justify-between cursor-pointer hover:translate-y-[-4px] transition-transform group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-md bg-white border-2 border-black font-mono font-extrabold text-[10px] uppercase shadow-[2px_2px_0px_#000]">
                    {post.category}
                  </span>
                  <span className="font-mono font-extrabold text-[11px] bg-black/10 px-2 py-0.5 rounded">
                    {post.readTime}
                  </span>
                </div>

                <div className="mb-4 rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] aspect-[16/10] bg-[#0d1117]">
                  <img
                    src={post.image}
                    alt={post.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <h3 className="font-display font-extrabold text-xl leading-snug tracking-tight">
                  {post.title}
                </h3>

                <p className="text-xs font-medium text-black/85 mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-black/20 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white group-hover:bg-[#121118] text-[#121118] group-hover:text-white font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(post.relatedServiceSlug);
                  }}
                  className="text-[11px] font-mono font-extrabold underline hover:text-black/70 cursor-pointer"
                >
                  Service Spec →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
