'use client';

import { ALL_SERVICES } from '@/features/services/data/services-data';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';
import type { ServiceDetail } from '@/features/services/data/services-data';

interface OtherServicesStripProps {
  service: ServiceDetail;
}

/** Links to the other services. */
export default function OtherServicesStrip({ service }: OtherServicesStripProps) {
  const otherServices = ALL_SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
          Explore Our Other Protection Solutions
        </h2>
        <SiteLink
          href={ROUTES.home}
          className="text-xs font-mono font-bold text-[#d9f941] hover:underline cursor-pointer"
        >
          ← View All on Home Page
        </SiteLink>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {otherServices.map((item) => (
          <SiteLink
            key={item.slug}
            href={ROUTES.service(item.slug)}
            className={`${item.bgClass} text-[#121118] p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] text-left flex flex-col justify-between hover:translate-y-[-3px] transition-transform cursor-pointer group`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono font-extrabold text-[10px] px-2 py-0.5 rounded bg-white border border-black">
                  #{item.num}
                </span>
                <span className="font-mono font-bold text-[9px] uppercase text-black/75 truncate">
                  {item.shortTitle}
                </span>
              </div>
              <div className="mb-2.5 rounded-xl overflow-hidden border-2 border-black shadow-[2px_2px_0px_#000] aspect-[16/10] bg-[#0d1117]">
                <img
                  loading="lazy"
                  decoding="async"
                  src={item.image}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="font-display font-extrabold text-sm sm:text-base leading-tight">
                {item.title}
              </h3>
            </div>
            <span className="text-[11px] font-mono font-extrabold underline mt-3 inline-block">
              Open Service Page →
            </span>
          </SiteLink>
        ))}
      </div>
    </section>
  );
}
