'use client';

import { type ZoneDispatchDetail } from '@/features/about/data/about-data';
import { SERVICE_AREAS_DATA } from '@/features/services';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface AboutZonesSectionProps {
  activeZone: string;
  setActiveZone: (zone: string) => void;
  setSelectedService: (service: string) => void;
  zoneInfo: ZoneDispatchDetail;
}

/** Interactive dispatch-zone hub with ETA and popular services. */
export default function AboutZonesSection({
  activeZone,
  setActiveZone,
  setSelectedService,
  zoneInfo,
}: AboutZonesSectionProps) {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section id="about-zones" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-xs font-mono font-extrabold uppercase text-[#f27438]">
            MOBILE &amp; ON-SITE COVERAGE ACROSS QATAR
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
            Where We Operate in Qatar
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We provide professional window tint and marble protection services across{' '}
            <strong className="text-white">
              Doha, Lusail, Al Rayyan, Wakra, and surrounding areas
            </strong>
            . Click any neighborhood sticker to inspect our local dispatch details:
          </p>

          {/* Active Zone Spotlight Card */}
          <div className="p-5 rounded-3xl bg-[#1a1922] border-2 border-[#d9f941] shadow-[6px_6px_0px_#000] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs border border-black">
                📍 {activeZone.toUpperCase()} DISPATCH
              </span>
              <span className="text-xs font-mono font-bold text-[#6ee7b7]">{zoneInfo.eta}</span>
            </div>
            <p className="font-display font-extrabold text-base text-white">
              Most Requested: {zoneInfo.popular}
            </p>
            <p className="text-xs text-slate-300">{zoneInfo.highlight}</p>
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onSelectService(zoneInfo.slug)}
                className="text-xs font-mono font-extrabold text-[#d9f941] underline cursor-pointer"
              >
                Explore Popular Service in {activeZone} →
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SERVICE_AREAS_DATA.map((item, idx) => {
            const isSelected = activeZone === item.area;
            return (
              <button
                key={`${item.title}-${idx}`}
                type="button"
                onClick={() => {
                  setActiveZone(item.area);
                  setSelectedService(item.service);
                }}
                className={`${item.bg} ${item.rotate} text-[#121118] p-4 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-3px] transition-all text-left flex items-center gap-3.5 cursor-pointer ${
                  isSelected ? 'ring-4 ring-white' : ''
                }`}
              >
                <span className="w-10 h-10 rounded-xl bg-white/90 border-2 border-black flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-extrabold text-sm sm:text-base uppercase tracking-tight truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-semibold text-black/80 truncate">{item.sub}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
