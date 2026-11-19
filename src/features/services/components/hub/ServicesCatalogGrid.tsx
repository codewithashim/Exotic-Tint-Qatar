'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ALL_SERVICES, type ServiceDetail } from '@/features/services/data/services-data';
import SiteLink from '@/components/ui/SiteLink';
import { ROUTES } from '@/config/routes';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface ServicesCatalogGridProps {
  filteredServices: ServiceDetail[];
  handleQuickBookService: (serviceTitle: string) => void;
}

/** Deep-dive bento card for every service in the active filter. */
export default function ServicesCatalogGrid({
  filteredServices,
  handleQuickBookService,
}: ServicesCatalogGridProps) {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-4">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase text-[#f27438]">
            COMPLETE SERVICE CATALOG
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-0.5">
            Showing {filteredServices.length} of {ALL_SERVICES.length} Specialized Services
          </h2>
        </div>
        <p className="text-xs font-mono text-[#d9f941]">
          Click any service card to launch its live Specification Lab →
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <article
            key={service.slug}
            className={`${service.bgClass} text-[#121118] rounded-3xl border-2 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-7 flex flex-col justify-between space-y-5 group`}
          >
            <div className="space-y-4">
              {/* Top Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#121118] text-white font-mono font-extrabold text-xs border border-black">
                  SERVICE #{service.num}
                </span>
                <span className="px-3 py-1 rounded-lg bg-white border-2 border-black font-mono font-extrabold text-[11px] uppercase shadow-[2px_2px_0px_#000]">
                  {service.badge}
                </span>
              </div>

              {/* Framed Widescreen Service Photo */}
              <div
                onClick={() => onSelectService(service.slug)}
                className="rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] aspect-[16/9] bg-[#0d1117] cursor-pointer relative"
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={service.image}
                  alt={service.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1 rounded-full bg-white text-[#121118] font-mono font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000]">
                    Interactive Lab Inside →
                  </span>
                </div>
              </div>

              {/* Title & Exact Description */}
              <div>
                <h3
                  onClick={() => onSelectService(service.slug)}
                  className="font-display font-extrabold text-2xl sm:text-3xl leading-tight tracking-tight cursor-pointer hover:underline"
                >
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-black/85 mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              {/* 4 Key Stats Mini Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {service.keyStats.map((st) => (
                  <div
                    key={st.label}
                    className="p-2.5 rounded-xl bg-white/90 border-2 border-black shadow-[2px_2px_0px_#000]"
                  >
                    <p className="font-mono font-extrabold text-xs sm:text-sm text-[#121118]">
                      {st.value}
                    </p>
                    <p className="text-[10px] font-bold text-black/70 truncate">{st.label}</p>
                  </div>
                ))}
              </div>

              {/* Key Benefits List */}
              <ul className="space-y-1.5 pt-1">
                {service.benefitsList.slice(0, 3).map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-xs font-bold text-[#121118]"
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dual Action Footer */}
            <div className="pt-4 border-t border-black/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <SiteLink
                href={ROUTES.service(service.slug)}
                className="flex-1 py-3 px-5 rounded-full bg-white hover:bg-[#121118] text-[#121118] hover:text-white font-display font-extrabold text-xs sm:text-sm border-2 border-black shadow-[4px_4px_0px_#000] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Explore {service.shortTitle} Page</span>
                <ArrowRight className="w-4 h-4" />
              </SiteLink>
              <button
                type="button"
                onClick={() => handleQuickBookService(service.title)}
                className="py-3 px-5 rounded-full bg-[#121118] hover:bg-black/85 text-white font-mono font-extrabold text-xs border-2 border-black cursor-pointer"
              >
                Quick Quote 🔥
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
