'use client';

import { CheckCircle2, Clock } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { BLOG_POSTS, type BlogPost } from '@/features/blogs/data/blogs-data';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';

interface BlogArticleReaderProps {
  activePost: BlogPost;
}

/** Full article view: hero, key takeaways, sections, sidebar and related posts. */
export default function BlogArticleReader({ activePost }: BlogArticleReaderProps) {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
      {/* Article Hero Card */}
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`px-3.5 py-1 rounded-full ${activePost.bgClass} text-[#121118] font-mono font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000]`}
          >
            GUIDE #{activePost.num} · {activePost.category.toUpperCase()}
          </span>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#d9f941]" />
              {activePost.readTime}
            </span>
            <span>·</span>
            <span>{activePost.publishDate}</span>
          </div>
        </div>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white leading-[1.06] tracking-tight">
          {activePost.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {activePost.excerpt}
        </p>

        {/* Author & Linked Service Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#121118] border-2 border-black p-1 flex items-center justify-center shrink-0">
              <img
                src={ASSETS.brand.logoMark}
                alt="Exotic Tint Qatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <p className="font-display font-extrabold text-xs sm:text-sm text-white">
                {activePost.author}
              </p>
              <p className="text-[11px] font-mono text-slate-400">{activePost.authorRole}</p>
            </div>
          </div>

          <SiteLink
            href={ROUTES.service(activePost.relatedServiceSlug)}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full ${activePost.bgClass} text-[#121118] font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] transition-transform cursor-pointer`}
          >
            <span>Open {activePost.relatedServiceTitle} Simulator →</span>
          </SiteLink>
        </div>

        {/* Featured Widescreen Image */}
        <div className="rounded-2xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#000] aspect-[16/9] bg-[#0d1117]">
          <img
            fetchPriority="high"
            src={activePost.image}
            alt={activePost.alt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Key Takeaways Bento Box */}
      <div
        className={`rounded-3xl ${activePost.bgClass} text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 space-y-4`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="px-3 py-1 rounded-md bg-white border-2 border-black font-mono font-extrabold text-xs shadow-[2px_2px_0px_#000]">
            KEY TAKEAWAYS FOR QATAR OWNERS
          </span>
          <span className="font-mono font-extrabold text-xs">EXOTIC TINT QATAR LAB</span>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {activePost.keyTakeaways.map((point) => (
            <li
              key={point}
              className="p-3.5 rounded-2xl bg-white/90 border-2 border-black shadow-[2px_2px_0px_#000] flex items-start gap-2.5 text-xs sm:text-sm font-bold text-[#121118]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Deep-Dive Article Sections + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Editorial Content */}
        <div className="lg:col-span-8 space-y-6">
          {activePost.sections.map((sec) => (
            <div
              key={sec.heading}
              className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 space-y-4"
            >
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white leading-snug">
                {sec.heading}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 leading-relaxed">{sec.body}</p>
              {sec.proTip && (
                <div className="p-4 rounded-2xl bg-[#121118] border-l-4 border-[#d9f941] space-y-1">
                  <p className="font-mono font-extrabold text-[11px] uppercase text-[#d9f941]">
                    💡 QATAR PRO-TIP FROM OUR INSTALLERS:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">{sec.proTip}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sticky Spec Comparison & Direct Booking Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 space-y-4">
            <span className="px-2.5 py-1 rounded bg-[#121118] text-[#d9f941] font-mono font-extrabold text-[11px]">
              PERFORMANCE COMPARISON
            </span>
            <h3 className="font-display font-extrabold text-xl leading-tight">
              With vs. Without Exotic Tint Qatar
            </h3>
            <div className="space-y-3">
              {activePost.quickSpecComparison.map((row) => (
                <div
                  key={row.metric}
                  className="p-3.5 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] space-y-1.5"
                >
                  <p className="font-mono font-extrabold text-[10px] uppercase text-black/60">
                    {row.metric}
                  </p>
                  <p className="text-xs font-extrabold text-emerald-800">
                    ✓ {row.withExoticTint}
                  </p>
                  <p className="text-[11px] font-semibold text-rose-700">
                    ✕ {row.withoutProtection}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2.5">
              <SiteLink
                href={ROUTES.service(activePost.relatedServiceSlug)}
                className="w-full py-3 px-4 rounded-full bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-extrabold text-xs border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
              >
                Book {activePost.relatedServiceTitle} in 60s →
              </SiteLink>
              <a
                href={SITE_CONFIG.phone.href}
                className="block w-full py-3 px-4 rounded-full bg-[#121118] text-white text-center font-mono font-extrabold text-xs border-2 border-black"
              >
                Call Us! +974 31608423
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* More Articles Strip */}
      <div className="pt-6 border-t border-white/15 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-extrabold text-2xl text-white">
            More Qatar Window Tinting &amp; Protection Guides
          </h2>
          <SiteLink
            href={ROUTES.blogs}
            className="text-xs font-mono font-bold text-[#d9f941] underline cursor-pointer"
          >
            View All 6 Guides →
          </SiteLink>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {BLOG_POSTS.filter((p) => p.slug !== activePost.slug)
            .slice(0, 3)
            .map((item) => (
              <SiteLink
                key={item.slug}
                href={ROUTES.blogPost(item.slug)}
                className={`${item.bgClass} text-[#121118] p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-left flex flex-col justify-between hover:translate-y-[-3px] transition-transform cursor-pointer group`}
              >
                <div>
                  <div className="mb-3 rounded-xl overflow-hidden border-2 border-black aspect-[16/10] bg-[#0d1117]">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={item.image}
                      alt={item.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <span className="font-mono font-extrabold text-[10px] px-2 py-0.5 rounded bg-white border border-black">
                    {item.category}
                  </span>
                  <h3 className="font-display font-extrabold text-sm sm:text-base mt-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
                <span className="text-xs font-mono font-extrabold underline mt-3 inline-block">
                  Read Guide ({item.readTime}) →
                </span>
              </SiteLink>
            ))}
        </div>
      </div>
    </article>
  );
}
