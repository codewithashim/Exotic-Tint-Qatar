'use client';

import { ArrowRight } from 'lucide-react';
import { ALL_SERVICES } from '@/features/services';
import { SITE_CONFIG } from '@/config/site';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Bento grid of all 6 services; each card links to its detail page. */
export default function ServicesBentoSection() {
  const { openService: openServiceDetailPage } = useSiteNavigation();

  return (
    <section id="services" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-8 border-b border-white/15">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-5xl text-white tracking-tight">
            Our Premium Window Tinting &amp; Protection Services
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Click any service card below to open its interactive Service Details &amp;
            Simulator Page.
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-[#d9f941]">
          6 Specialized Pages →
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 01. Big Left Orange Feature Card: Automotive Window Tinting */}
        <article
          onClick={() => openServiceDetailPage(ALL_SERVICES[0].slug)}
          className="lg:col-span-5 lg:row-span-2 rounded-3xl bg-[#f27438] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden group cursor-pointer hover:translate-y-[-3px] transition-transform"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono font-extrabold text-sm">01</span>
            <span className="px-3 py-1 rounded-md bg-white border-2 border-black font-mono font-extrabold text-[10px] sm:text-[11px] uppercase shadow-[2px_2px_0px_#000]">
              {ALL_SERVICES[0].badge}
            </span>
          </div>

          <div className="my-5 rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] aspect-[16/10] bg-[#0d1117]">
            <img
              loading="lazy"
              decoding="async"
              src={ALL_SERVICES[0].image}
              alt={ALL_SERVICES[0].alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl leading-[1.02] tracking-tight">
              <SiteLink href={ROUTES.service(ALL_SERVICES[0].slug)} onClick={(e) => e.stopPropagation()}>
                {ALL_SERVICES[0].title}
              </SiteLink>
            </h3>
            <p className="text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
              {ALL_SERVICES[0].desc}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white group-hover:bg-[#d9f941] text-[#121118] font-extrabold text-xs border-2 border-black shadow-[4px_4px_0px_#000] transition-colors">
                <span>Explore Service Details &amp; Simulator →</span>
              </span>
            </div>
          </div>
        </article>

        {/* Right 2x2 Bento Sub-Grid for Services 02, 03, 04, 05 */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {ALL_SERVICES.slice(1, 5).map((service) => (
            <article
              key={service.id}
              onClick={() => openServiceDetailPage(service.slug)}
              className={`${service.bgClass} text-[#121118] rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] p-5 flex flex-col justify-between cursor-pointer hover:translate-y-[-3px] transition-transform group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono font-extrabold text-xs px-2 py-0.5 rounded bg-white border border-black">
                    {service.num}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white border-2 border-black font-mono font-extrabold text-[10px] uppercase shadow-[2px_2px_0px_#000]">
                    {service.badge}
                  </span>
                </div>

                <div className="mb-3.5 rounded-2xl overflow-hidden border-2 border-black shadow-[3px_3px_0px_#000] aspect-[16/10] bg-[#0d1117]">
                  <img
                    loading="lazy"
                    decoding="async"
                    src={service.image}
                    alt={service.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>

                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-extrabold text-xl leading-tight tracking-tight">
                    <SiteLink href={ROUTES.service(service.slug)} onClick={(e) => e.stopPropagation()}>
                      {service.title}
                    </SiteLink>
                  </h3>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" />
                </div>

                <p className="text-xs font-medium text-black/85 mt-1.5 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/15 flex items-center justify-between text-[11px] font-mono font-extrabold">
                <span>Service #{service.num}</span>
                <span className="underline">View Details &amp; Specs →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom 2 Wide Banner Cards: 06 Fabric Nano Coating + Direct Call Banner */}
      <div id="blogs" className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
        <article
          onClick={() => openServiceDetailPage(ALL_SERVICES[5].slug)}
          className="rounded-3xl bg-[#a78bfa] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:translate-y-[-2px] transition-transform group"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 min-w-0 w-full">
            <div className="w-full sm:w-36 aspect-[16/10] sm:aspect-[4/3] rounded-2xl bg-[#0d1117] border-2 border-black shadow-[3px_3px_0px_#000] overflow-hidden shrink-0">
              <img
                loading="lazy"
                decoding="async"
                src={ALL_SERVICES[5].image}
                alt={ALL_SERVICES[5].alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-mono font-extrabold text-[10px] sm:text-xs uppercase bg-white px-2 py-0.5 rounded border border-black">
                06 · {ALL_SERVICES[5].badge}
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-2xl tracking-tight mt-1">
                <SiteLink href={ROUTES.service(ALL_SERVICES[5].slug)} onClick={(e) => e.stopPropagation()}>
                  {ALL_SERVICES[5].title}
                </SiteLink>
              </h3>
              <p className="text-xs font-medium text-black/85 mt-1">
                {ALL_SERVICES[5].desc}
              </p>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform self-end sm:self-center" />
        </article>

        <a
          href={SITE_CONFIG.phone.href}
          className="rounded-2xl bg-[#4fd1c5] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6 flex items-center justify-between gap-4 hover:translate-y-[-2px] transition-transform group"
        >
          <div className="space-y-1">
            <span className="font-mono font-extrabold text-[10px] sm:text-xs uppercase bg-white px-2 py-0.5 rounded border border-black">
              CALL US! +974 31608423
            </span>
            <h3 className="font-display font-extrabold text-lg sm:text-2xl tracking-tight pt-1">
              Premium Tint &amp; Protection for Your Windows!
            </h3>
            <p className="text-xs font-medium text-black/85">
              Enhance Privacy, Block UV Rays &amp; Protect Your Surfaces with High-Quality
              Tint Solutions!
            </p>
          </div>
          <ArrowRight className="w-6 h-6 shrink-0 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
