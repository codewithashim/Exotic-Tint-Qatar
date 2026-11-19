'use client';

import { CheckCircle2, Phone, SlidersHorizontal } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { type SimulatorOption } from '@/features/services/data/services-data';
import type { ServiceDetail } from '@/features/services/data/services-data';

interface ServiceHeroSimulatorProps {
  service: ServiceDetail;
  selectedSimIdx: number;
  setSelectedSimIdx: (index: number) => void;
  activeSim: SimulatorOption;
}

/** Service hero with the interactive film / protection simulator and key stats. */
export default function ServiceHeroSimulator({
  service,
  selectedSimIdx,
  setSelectedSimIdx,
  activeSim,
}: ServiceHeroSimulatorProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Service Overview & Benefits */}
        <div className="lg:col-span-6 space-y-5">
          <div
            className={`inline-block -rotate-1 ${service.bgClass} text-[#121118] font-mono font-extrabold text-xs px-3.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000]`}
          >
            SERVICE #{service.num} · {service.badge}
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.02] tracking-tight text-white">
            {service.seoHeadline}
          </h1>

          <p className="font-display font-extrabold text-base sm:text-xl text-[#f27438] leading-snug">
            → {service.heroSubheadline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {service.longDescription}
          </p>

          {/* 4 Key Bullet Points */}
          <div className="p-5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2.5">
            <p className="font-mono font-extrabold text-xs uppercase text-[#d9f941]">
              Why Choose Exotic Tint Qatar for {service.title}:
            </p>
            <ul className="space-y-2">
              {service.benefitsList.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#6ee7b7] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dual CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <a
              href="#service-booking-ticket"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f27438] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-transform whitespace-nowrap"
            >
              <span>Book {service.shortTitle} in 60s</span>
              <span>🔥</span>
            </a>
            <a
              href={SITE_CONFIG.phone.href}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#1a1922] text-white font-bold text-sm border border-white/30 hover:border-[#d9f941] transition-colors whitespace-nowrap font-mono"
            >
              <Phone className="w-4 h-4 text-[#d9f941]" />
              <span>Call Us! +974 31608423</span>
            </a>
          </div>
        </div>

        {/* Right Column: Smart Interactive Film / Protection Simulator */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-[11px] font-mono font-extrabold uppercase text-[#d9f941] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Interactive Specification Lab</span>
                </span>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-white mt-0.5">
                  {service.simulatorTitle}
                </h2>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white text-[#121118] font-mono font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000] shrink-0">
                LIVE SPEC
              </span>
            </div>

            {/* Visual Preview Frame */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] bg-[#0d1117]">
              <img
                fetchPriority="high"
                src={service.image}
                alt={service.alt}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-all duration-300 ${activeSim.previewTintOpacity}`}
              />
              {/* Top Floating Spec Pill */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full bg-white text-[#121118] font-mono font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000]">
                  {activeSim.vltOrFinish}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${service.bgClass} text-[#121118] font-mono font-extrabold text-[11px] border-2 border-black shadow-[2px_2px_0px_#000]`}
                >
                  {activeSim.irRejection}
                </span>
              </div>

              {/* Bottom Overlay Info */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4">
                <p className="font-display font-extrabold text-sm sm:text-base text-white">
                  {activeSim.label}
                </p>
                <p className="text-xs text-slate-300 mt-0.5">{activeSim.bestFor}</p>
              </div>
            </div>

            {/* Shade / Option Selector Buttons */}
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-400">
                {service.simulatorSubtitle}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.simulatorOptions.map((opt, idx) => {
                  const isSelected = idx === selectedSimIdx;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedSimIdx(idx)}
                      className={`p-3 rounded-xl border-2 border-black text-left transition-all cursor-pointer ${
                        isSelected
                          ? `${service.bgClass} text-[#121118] font-extrabold shadow-[3px_3px_0px_#000]`
                          : 'bg-[#121118] text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      <p className="text-xs font-display font-extrabold truncate">{opt.label}</p>
                      <p
                        className={`text-[11px] font-mono mt-0.5 ${
                          isSelected ? 'text-black/80 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {opt.irRejection} · {opt.uvBlock}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4 Live Spec Mini-Meters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-[#121118] border border-white/10 text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Heat / Thermal</p>
                <p className="font-mono font-extrabold text-xs sm:text-sm text-[#f27438] mt-0.5">
                  {activeSim.irRejection}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121118] border border-white/10 text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase">UV Defense</p>
                <p className="font-mono font-extrabold text-xs sm:text-sm text-[#d9f941] mt-0.5">
                  {activeSim.uvBlock}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121118] border border-white/10 text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Protection</p>
                <p className="font-mono font-extrabold text-xs sm:text-sm text-[#6ee7b7] mt-0.5">
                  {activeSim.glareOrStainReduction}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-[#121118] border border-white/10 text-center">
                <p className="text-[10px] font-mono text-slate-400 uppercase">Warranty</p>
                <p className="font-mono font-extrabold text-xs sm:text-sm text-[#a78bfa] mt-0.5">
                  {activeSim.warranty}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Key Stats Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {service.keyStats.map((stat, idx) => {
          const colors = ['bg-[#f27438]', 'bg-[#d9f941]', 'bg-[#6ee7b7]', 'bg-[#f45b9a]'];
          return (
            <div
              key={stat.label}
              className={`${colors[idx % colors.length]} text-[#121118] p-5 rounded-2xl border-2 border-black shadow-[4px_4px_0px_#000]`}
            >
              <p className="text-[11px] font-mono font-extrabold uppercase text-black/70">
                {stat.label}
              </p>
              <p className="font-display font-extrabold text-2xl sm:text-3xl mt-1 font-mono tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs font-bold text-black/80 mt-0.5">{stat.sub}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
