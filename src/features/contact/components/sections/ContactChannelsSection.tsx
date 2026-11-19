import { ArrowRight, Clock, Phone, Truck } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';

/** Hero plus the four direct contact channel cards. */
export default function ContactChannelsSection() {
  return (
    <section id="contact-channels" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="max-w-3xl space-y-3">
        <div className="inline-block -rotate-1 bg-[#f27438] text-[#121118] font-mono font-extrabold text-xs px-3.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
          GET IN TOUCH · EXOTIC TINT QATAR DISPATCH DESK
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.4rem] text-white leading-[1.02] tracking-tight">
          Contact <span className="text-[#d9f941]">Exotic Tint Qatar</span> Today!
        </h1>
        <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
          📞 Contact Exotic Tint Qatar today at{' '}
          <strong className="text-white font-mono">+974 31608423</strong> for expert window
          tinting Qatar and surface protection services. Whether you need car window tinting
          Qatar, commercial window tinting Doha, residential window tinting near me, or nano
          coating for sofa, we’ve got you covered.{' '}
          <strong className="text-[#f27438]">Let us work while you unwind!</strong>
        </p>
      </div>

      {/* 4 Direct Channel Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Direct Phone */}
        <a
          href={SITE_CONFIG.phone.href}
          className="rounded-3xl bg-[#f27438] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between hover:translate-y-[-3px] transition-transform group"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#121118]" />
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white border border-black font-mono font-extrabold text-[10px] uppercase">
                DIRECT LINE
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl leading-tight">
              Call Us Directly
            </h2>
            <p className="font-mono font-extrabold text-xl sm:text-2xl tracking-tight underline">
              +974 31608423
            </p>
            <p className="text-xs font-semibold text-black/80">
              Instant phone quotes &amp; same-day mobile dispatch across Qatar.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-black/20 text-xs font-mono font-extrabold flex items-center justify-between">
            <span>Tap to Call Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </a>

        {/* Card 2: Operating Hours */}
        <div className="rounded-3xl bg-[#d9f941] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#121118]" />
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white border border-black font-mono font-extrabold text-[10px] uppercase">
                7 DAYS A WEEK
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl leading-tight">
              Business Hours
            </h2>
            <p className="font-display font-extrabold text-2xl tracking-tight">
              8:00 AM – 6:00 PM
            </p>
            <p className="text-xs font-semibold text-black/80">
              Open every day including weekends for villa, car &amp; commercial bookings.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-black/20 text-xs font-mono font-extrabold">
            Same-Day &amp; Next-Day Slots
          </span>
        </div>

        {/* Card 3: Coverage Areas */}
        <a
          href="#contact-zones"
          className="rounded-3xl bg-[#6ee7b7] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between hover:translate-y-[-3px] transition-transform"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="w-11 h-11 rounded-2xl bg-white border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center">
                <Truck className="w-5 h-5 text-[#121118]" />
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white border border-black font-mono font-extrabold text-[10px] uppercase">
                MOBILE + STUDIO
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl leading-tight">
              Qatar Service Areas
            </h2>
            <p className="font-display font-extrabold text-base leading-snug">
              Doha · Lusail · The Pearl · Al Rayyan · Wakra
            </p>
            <p className="text-xs font-semibold text-black/80">
              Plus Al Kheesa, Al Gharrafa &amp; all surrounding Qatar neighborhoods.
            </p>
          </div>
          <span className="mt-4 pt-3 border-t border-black/20 text-xs font-mono font-extrabold">
            Select Your Area Below ↓
          </span>
        </a>

        {/* Card 4: Official Brand & Socials */}
        <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#121118] border-2 border-black p-1 flex items-center justify-center">
                <img
                  src={ASSETS.brand.logoMark}
                  alt="Exotic Tint Qatar Shield"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="px-2.5 py-0.5 rounded bg-[#f45b9a] border border-black font-mono font-extrabold text-[10px] uppercase">
                SOCIAL CHANNELS
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl leading-tight">
              Follow &amp; Review Us
            </h2>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-[#121118] text-white font-mono text-[11px] font-bold">
                Facebook-f
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#121118] text-white font-mono text-[11px] font-bold">
                Instagram
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#121118] text-white font-mono text-[11px] font-bold">
                Tiktok
              </span>
            </div>
          </div>
          <span className="mt-4 pt-3 border-t border-black/20 text-xs font-mono font-extrabold">
            ★ 5.0 Rated Across Qatar
          </span>
        </div>
      </div>
    </section>
  );
}
