'use client';

import { SERVICE_AREAS_DATA } from '@/features/services';

interface ContactZonesSectionProps {
  selectedArea: string;
  handleZoneClick: (area: string, defaultService: string) => void;
}

/** Clickable service-area directory that pre-fills the booking form. */
export default function ContactZonesSection({
  selectedArea,
  handleZoneClick,
}: ContactZonesSectionProps) {
  return (
    <section id="contact-zones" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase text-[#d9f941]">
            WE COME TO YOUR DOOR ACROSS QATAR
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-1">
            Click Your Area to Pre-Select Local Dispatch
          </h2>
        </div>
        <p className="text-xs text-slate-400">
          Serving Doha, Lusail, The Pearl, Al Kheesa, Al Gharrafa, Al Rayyan &amp; Wakra
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SERVICE_AREAS_DATA.map((item, idx) => {
          const isSelected = selectedArea === item.area;
          return (
            <button
              key={`${item.title}-${idx}`}
              type="button"
              onClick={() => handleZoneClick(item.area, item.service)}
              className={`${item.bg} text-[#121118] p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-3px] transition-all text-left flex flex-col justify-between cursor-pointer ${
                isSelected ? 'ring-4 ring-white' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-white border-2 border-black flex items-center justify-center text-lg">
                  {item.icon}
                </span>
                <span className="px-2.5 py-0.5 rounded bg-white border border-black font-mono font-extrabold text-[10px] uppercase">
                  FAST DISPATCH
                </span>
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-black/80 mt-1">{item.sub}</p>
              </div>
              <span className="mt-4 pt-2.5 border-t border-black/15 text-[11px] font-mono font-extrabold underline">
                Select {item.title} in Form ↑
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
