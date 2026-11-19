'use client';

import { useState } from 'react';
import { CONTACT_FAQS } from '@/features/contact/data/contact-data';

/** Booking & dispatch FAQ accordion. */
export default function ContactFaqSection() {
  const [openFaqIdx, setOpenFaqIdx] = useState<number>(0);

  return (
    <section id="contact-faqs" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#1a1922] border-2 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-10 space-y-6">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase text-[#d9f941]">
            COMMON BOOKING &amp; DISPATCH QUESTIONS
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
            Everything You Need to Know Before Booking
          </h2>
        </div>

        <div className="space-y-3">
          {CONTACT_FAQS.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-[#121118] border-2 border-black overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIdx(isOpen ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="font-display font-extrabold text-sm sm:text-base text-white">
                    {faq.q}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-[#f27438] text-[#121118] border border-black flex items-center justify-center font-mono font-extrabold text-sm shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
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
