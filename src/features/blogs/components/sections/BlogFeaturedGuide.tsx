'use client';

import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/features/blogs/data/blogs-data';

interface BlogFeaturedGuideProps {
  handleOpenPost: (slug: string) => void;
}

/** Featured flagship guide card. */
export default function BlogFeaturedGuide({ handleOpenPost }: BlogFeaturedGuideProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div
        onClick={() => handleOpenPost(BLOG_POSTS[0].slug)}
        className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group hover:translate-y-[-3px] transition-transform"
      >
        <div className="lg:col-span-6 aspect-[16/10] lg:aspect-auto bg-[#0d1117] border-b-2 lg:border-b-0 lg:border-r-2 border-black overflow-hidden relative">
          <img
            src={BLOG_POSTS[0].image}
            alt={BLOG_POSTS[0].alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-[#f27438] text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000]">
              ★ FEATURED QATAR GUIDE
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 p-6 sm:p-9 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2 text-xs font-mono font-extrabold text-black/70">
              <span>{BLOG_POSTS[0].category.toUpperCase()}</span>
              <span>
                {BLOG_POSTS[0].readTime} · {BLOG_POSTS[0].publishDate}
              </span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl leading-tight">
              {BLOG_POSTS[0].title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-black/80 leading-relaxed">
              {BLOG_POSTS[0].excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-black/15">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121118] group-hover:bg-[#f27438] text-white group-hover:text-[#121118] font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] transition-colors">
              <span>Read Full Technical Guide</span>
              <ArrowRight className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-bold text-black/70">
              By {BLOG_POSTS[0].author}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
