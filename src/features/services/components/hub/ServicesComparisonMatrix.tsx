'use client';

import { ALL_SERVICES } from '@/features/services/data/services-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Side-by-side comparison table across all services. */
export default function ServicesComparisonMatrix() {
  const { openService: onSelectService, openContact: onOpenContact } = useSiteNavigation();

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-6 sm:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-extrabold uppercase text-[#d9f941]">
              TECHNICAL SPECIFICATION OVERVIEW
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Compare All 6 Exotic Tint Qatar Solutions
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenContact}
            className="text-xs font-mono font-bold text-[#f27438] underline cursor-pointer"
          >
            Need a Multi-Service Villa or Office Package? Contact Us →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_SERVICES.map((s) => (
            <div
              key={s.slug}
              className="p-4 rounded-2xl bg-[#121118] border-2 border-black space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded font-mono font-extrabold text-[11px] ${s.bgClass} text-[#121118] border border-black`}
                  >
                    #{s.num} · {s.shortTitle}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {s.keyStats[0].value}
                  </span>
                </div>
                <p className="font-display font-extrabold text-base text-white">{s.title}</p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-200">Typical Time:</strong>{' '}
                  {s.estimatorOptions[0].duration}
                </p>
                <p className="text-xs text-slate-400">
                  <strong className="text-slate-200">Top Spec:</strong>{' '}
                  {s.estimatorOptions[0].popularFilm}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectService(s.slug)}
                className="w-full mt-2 py-2 px-3 rounded-xl bg-[#1a1922] hover:bg-[#d9f941] text-slate-200 hover:text-[#121118] font-mono font-extrabold text-xs border border-white/15 hover:border-black transition-colors cursor-pointer"
              >
                Launch #{s.num} Simulator →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
