'use client';

import { type EstimatorOption } from '@/features/services/data/services-data';
import type { ServiceDetail } from '@/features/services/data/services-data';

interface ServiceScopeEstimatorProps {
  service: ServiceDetail;
  selectedEstIdx: number;
  setSelectedEstIdx: (index: number) => void;
  activeEst: EstimatorOption;
}

/** Project scope estimator plus technical comparison table. */
export default function ServiceScopeEstimator({
  service,
  selectedEstIdx,
  setSelectedEstIdx,
  activeEst,
}: ServiceScopeEstimatorProps) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Left: Smart Project Scope & Time Estimator */}
        <div className="lg:col-span-6 rounded-3xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded bg-[#d9f941] text-[#121118] font-mono font-extrabold text-xs border border-black">
                SMART PROJECT CALCULATOR
              </span>
              <span className="text-xs font-mono text-slate-400">Flat-Rate Pricing</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {service.estimatorTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Select your project size below to see estimated installation time, recommended
              package, and coverage details:
            </p>

            {/* Scope Selector Buttons */}
            <div className="space-y-2.5 pt-1">
              {service.estimatorOptions.map((opt, idx) => {
                const isCurrent = idx === selectedEstIdx;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedEstIdx(idx)}
                    className={`w-full p-4 rounded-2xl border-2 border-black text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-[#f27438] text-[#121118] shadow-[4px_4px_0px_#000]'
                        : 'bg-[#121118] text-slate-200 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <p className="font-display font-extrabold text-sm sm:text-base">
                        {opt.label}
                      </p>
                      <p
                        className={`text-xs font-mono mt-0.5 ${
                          isCurrent ? 'text-black/85 font-bold' : 'text-slate-400'
                        }`}
                      >
                        Est. Time: {opt.duration}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-extrabold border border-black shrink-0 ${
                        isCurrent ? 'bg-white text-black' : 'bg-[#1a1922] text-[#d9f941]'
                      }`}
                    >
                      {isCurrent ? 'Selected ✓' : 'Select'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Scope Details Output */}
            <div className="p-5 rounded-2xl bg-[#121118] border-2 border-black space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">ESTIMATED DURATION:</span>
                <span className="text-[#d9f941] font-extrabold">{activeEst.duration}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">RECOMMENDED SPEC:</span>
                <span className="text-[#6ee7b7] font-extrabold">{activeEst.popularFilm}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-slate-300">
                  <strong className="text-white">Coverage:</strong> {activeEst.coverage}
                </p>
                <p className="text-xs text-[#f27438] font-semibold mt-1">
                  ★ {activeEst.benefitSummary}
                </p>
              </div>
            </div>
          </div>

          <a
            href="#service-booking-ticket"
            className="w-full py-3.5 px-6 rounded-full bg-[#d9f941] hover:bg-[#e5ff54] text-[#121118] font-display font-extrabold text-xs sm:text-sm text-center border-2 border-black shadow-[4px_4px_0px_#000] transition-colors"
          >
            Lock In “{activeEst.label}” &amp; Get Free Estimate →
          </a>
        </div>

        {/* Right: Technical Comparison Table */}
        <div className="lg:col-span-6 rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <span className="px-3 py-1 rounded bg-[#121118] text-white font-mono font-extrabold text-xs">
              SIDE-BY-SIDE PROOF
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#121118] mt-3">
              Exotic Tint Qatar vs. Ordinary Films
            </h2>
            <p className="text-xs sm:text-sm font-medium text-black/75 mt-1">
              See why villa owners and businesses in Doha trust our premium
              materials:
            </p>

            <div className="mt-6 space-y-3">
              {service.comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000]"
                >
                  <p className="font-mono font-extrabold text-xs uppercase text-black/60">
                    {row.feature}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#121118]">
                      <span className="w-5 h-5 rounded-full bg-[#6ee7b7] border border-black flex items-center justify-center text-xs shrink-0">
                        ✓
                      </span>
                      <span>{row.exoticTint}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-black/60 font-semibold">
                      <span className="w-5 h-5 rounded-full bg-rose-200 border border-black/40 flex items-center justify-center text-xs shrink-0">
                        ✕
                      </span>
                      <span>{row.standardOption}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified client quote — only shown when the service has a real review */}
          {service.clientReview && (
            <div className="p-4 rounded-2xl bg-[#d9f941] border-2 border-black">
              <p className="text-xs font-extrabold text-[#121118]">
                “{service.clientReview.quote}”
              </p>
              <p className="text-[11px] font-mono font-bold text-black/80 mt-1">
                — {service.clientReview.name} ({service.clientReview.role})
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
