'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import type { ServiceDetail } from '@/features/services/data/services-data';

interface ServiceFaqAccordionProps {
  service: ServiceDetail;
}

/** Service-specific FAQ accordion. */
export default function ServiceFaqAccordion({ service }: ServiceFaqAccordionProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-extrabold text-[#d9f941] uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
              Common Questions About {service.title}
            </h2>
          </div>
          <a
            href={SITE_CONFIG.phone.href}
            className="text-xs font-mono font-bold text-[#f27438] hover:underline"
          >
            Have another question? Call +974 31608423 →
          </a>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#121118] border-2 border-black overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display font-extrabold text-sm sm:text-base text-white hover:text-[#d9f941] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#f27438] transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
