'use client';

import { SERVICE_AREAS_DATA } from '@/features/services';
import { useBookingSelection } from '@/features/booking';
import { HOME_SECTIONS } from '@/config/routes';

/** Clickable area "stickers" that pre-select area + service in the booking ticket below. */
export default function ServiceAreasSection() {
  const { area: selectedArea, setArea, setService } = useBookingSelection();

  const handleStickerClick = (area: string, service: string) => {
    setArea(area);
    setService(service);
    document.getElementById(HOME_SECTIONS.booking)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="areas" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white leading-[1.02] tracking-tight">
            Service <span className="text-[#f27438]">Areas</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We provide professional window tint and marble protection services across{' '}
            <strong className="text-white">
              Doha, Lusail, Al Rayyan, Wakra, and surrounding areas
            </strong>
            . Get high-quality, heat-resistant, and UV-blocking tint solutions for your
            home or office today!
          </p>
          <p className="text-xs text-[#d9f941] font-mono">
            Press any location sticker to pre-select it in the 60-second booking form below
            →
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {SERVICE_AREAS_DATA.map((item, idx) => {
            const isSelected = selectedArea === item.area;
            return (
              <button
                key={`${item.title}-${idx}`}
                type="button"
                onClick={() => handleStickerClick(item.area, item.service)}
                className={`${item.bg} ${item.rotate} hover:rotate-0 hover:scale-[1.02] transition-transform text-left p-3.5 rounded-xl border-2 border-black shadow-[4px_4px_0px_#000] flex items-center gap-3 text-[#121118] cursor-pointer ${
                  isSelected ? 'ring-4 ring-white' : ''
                }`}
              >
                <span className="w-9 h-9 rounded-lg bg-black/10 border border-black/20 flex items-center justify-center text-lg shrink-0">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-display font-extrabold text-sm tracking-tight uppercase truncate">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-medium text-black/80 truncate">
                    {item.sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
