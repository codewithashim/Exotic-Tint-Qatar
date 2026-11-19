'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BOOKING_AREAS } from '@/config/site';
import { ALL_SERVICES, type ServiceDetail } from '@/features/services';

interface ServicesMegaMenuProps {
  onOpenService: (slug: string) => void;
  onOpenServicesHub: () => void;
  onQuickBook: (serviceId: string) => void;
  onPickArea: (area: string) => void;
}

const windowTintServices = ALL_SERVICES.filter((s) => s.category === 'window-tinting');
const surfaceProtectionServices = ALL_SERVICES.filter((s) => s.category === 'surface-protection');

function MegaMenuServiceItem({
  item,
  isHovered,
  onHover,
  onClick,
}: {
  item: ServiceDetail;
  isHovered: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onClick={onClick}
      className={`w-full p-2.5 xl:p-3 rounded-2xl border-2 text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
        isHovered
          ? `${item.bgClass} text-[#121118] border-black shadow-[3px_3px_0px_#000]`
          : 'bg-[#121118] text-white border-black/60 hover:border-white/30'
      }`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`font-mono font-extrabold text-[10px] px-1.5 py-0.5 rounded border border-black ${
              isHovered ? 'bg-white text-black' : `${item.bgClass} text-black`
            }`}
          >
            {item.num}
          </span>
          <p className="font-display font-extrabold text-sm truncate">{item.title}</p>
        </div>
        <p
          className={`text-[11px] mt-1 line-clamp-1 ${
            isHovered ? 'text-black/80 font-semibold' : 'text-slate-400'
          }`}
        >
          {item.badge} · Click for full specs &amp; simulator
        </p>
      </div>
      <ArrowRight className="w-4 h-4 shrink-0 mt-1" />
    </button>
  );
}

function ServiceColumn({
  heading,
  headingClass,
  meta,
  services,
  hovered,
  onHover,
  onOpenService,
}: {
  heading: string;
  headingClass: string;
  meta: string;
  services: ServiceDetail[];
  hovered: ServiceDetail;
  onHover: (s: ServiceDetail) => void;
  onOpenService: (slug: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className={`font-mono font-extrabold text-[11px] uppercase ${headingClass}`}>
          {heading}
        </span>
        <span className="text-[10px] font-mono text-slate-400">{meta}</span>
      </div>
      <div className="space-y-2">
        {services.map((item) => (
          <MegaMenuServiceItem
            key={item.slug}
            item={item}
            isHovered={hovered.slug === item.slug}
            onHover={() => onHover(item)}
            onClick={() => onOpenService(item.slug)}
          />
        ))}
      </div>
    </div>
  );
}

/** 3-column desktop services mega menu with a live "spotlight" card (lg+). */
export default function ServicesMegaMenu({
  onOpenService,
  onOpenServicesHub,
  onQuickBook,
  onPickArea,
}: ServicesMegaMenuProps) {
  const [hovered, setHovered] = useState<ServiceDetail>(ALL_SERVICES[0]);

  return (
    <div className="hidden lg:block border-t-2 border-black bg-[#121118]/98 backdrop-blur-2xl py-5 px-6 shadow-2xl max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
      <div className="max-w-6xl mx-auto rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-5 xl:p-6 grid grid-cols-12 gap-5 xl:gap-6">
        {/* Column 1: Window & glass tinting (01–04) */}
        <div className="col-span-4">
          <ServiceColumn
            heading="01–04 · Window & Glass Tinting"
            headingClass="text-[#f27438]"
            meta="96% IR · 99% UV"
            services={windowTintServices}
            hovered={hovered}
            onHover={setHovered}
            onOpenService={onOpenService}
          />
        </div>

        {/* Column 2: Surface protection (05–06) + dispatch zones */}
        <div className="col-span-4 flex flex-col justify-between space-y-3">
          <ServiceColumn
            heading="05–06 · Surface & Fabric Shield"
            headingClass="text-[#d9f941]"
            meta="Stone · Wood · Sofa"
            services={surfaceProtectionServices}
            hovered={hovered}
            onHover={setHovered}
            onOpenService={onOpenService}
          />

          <div className="p-3.5 rounded-2xl bg-[#121118] border-2 border-black space-y-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono font-extrabold text-[10px] uppercase text-[#6ee7b7]">
                QATAR DISPATCH ZONES
              </p>
              <button
                type="button"
                onClick={onOpenServicesHub}
                className="text-[10px] font-mono font-extrabold text-[#d9f941] underline cursor-pointer"
              >
                View All {ALL_SERVICES.length} Services Page →
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {BOOKING_AREAS.map((area) => (
                <button
                  key={area}
                  type="button"
                  onClick={() => onPickArea(area)}
                  className="px-2 py-1 rounded-md bg-[#1a1922] hover:bg-[#f27438] hover:text-black text-[10px] font-mono font-bold text-slate-200 border border-white/15 transition-colors cursor-pointer"
                >
                  📍 {area}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Spotlight card for the hovered service */}
        <div className="col-span-4">
          <div
            className={`${hovered.bgClass} text-[#121118] h-full rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000] p-4 xl:p-5 flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="px-2.5 py-0.5 rounded bg-white border-2 border-black font-mono font-extrabold text-[10px] uppercase">
                  SPOTLIGHT #{hovered.num}
                </span>
                <span className="font-mono font-extrabold text-[10px] uppercase">
                  {hovered.badge}
                </span>
              </div>

              <div className="aspect-[16/9] rounded-xl overflow-hidden border-2 border-black bg-[#0d1117] mb-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hovered.image}
                  alt={hovered.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-display font-extrabold text-lg xl:text-xl leading-tight">
                {hovered.title}
              </h3>
              <p className="text-xs font-medium text-black/85 mt-1 line-clamp-2 leading-relaxed">
                {hovered.desc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-black/20">
              <button
                type="button"
                onClick={() => onOpenService(hovered.slug)}
                className="py-2 px-3 rounded-xl bg-white hover:bg-[#d9f941] text-[#121118] font-display font-extrabold text-xs border-2 border-black shadow-[2px_2px_0px_#000] transition-colors cursor-pointer text-center"
              >
                Service Page →
              </button>
              <button
                type="button"
                onClick={() => onQuickBook(hovered.id)}
                className="py-2 px-3 rounded-xl bg-[#121118] hover:bg-black/85 text-white font-display font-extrabold text-xs border-2 border-black transition-colors cursor-pointer text-center"
              >
                Book in 60s 🔥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
