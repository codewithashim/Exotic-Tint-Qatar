'use client';

import { Phone, ShieldCheck, Sun, ThermometerSnowflake, Zap } from 'lucide-react';
import { ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

/** Company story, credentials and project photo collage. */
export default function AboutStorySection() {
  const { openService: onSelectService } = useSiteNavigation();

  return (
    <section id="about-story" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Brand Story & Core Pillars */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-block -rotate-1 bg-[#f45b9a] text-[#121118] font-mono font-extrabold text-xs px-3.5 py-1 border-2 border-black shadow-[3px_3px_0px_#000]">
            ABOUT EXOTIC TINT QATAR · DOHA’S PREMIER SPECIALISTS
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[3.4rem] leading-[1.02] tracking-tight text-white">
            Qatar’s Top Window Tint &amp;{' '}
            <span className="text-[#d9f941]">Surface Protection</span> Experts
          </h1>

          <p className="font-display font-extrabold text-base sm:text-xl text-[#f27438] leading-snug">
            → Engineered for 50°C Gulf Summers. Installed at Your Home, Office, or Our Doha
            Studio!
          </p>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            At <strong className="text-white">Exotic Tint Qatar</strong>, we’re proud to be the
            leading provider of <strong className="text-white">window tinting Qatar</strong> and
            advanced surface protection services. We specialize in{' '}
            <strong className="text-white">
              car window tinting Qatar, commercial window tinting Doha, residential window tinting
              near me, customized cut frosted window film designs, marble protection film, and
              fabric nano coating Qatar
            </strong>
            . Whether you drive a supercar in Lusail, manage a corporate tower in West Bay, or own
            a family villa in Al Rayyan, our mission is simple:{' '}
            <span className="text-[#d9f941] font-bold">
              reduce heat, block 99.9% of UV rays, enhance privacy, and protect your most valuable
              surfaces.
            </span>
          </p>

          {/* 4 Core Trust Pillars from User Copy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-4 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#f27438] border-2 border-black flex items-center justify-center text-black shrink-0">
                  <ThermometerSnowflake className="w-4 h-4" />
                </span>
                <h2 className="font-display font-extrabold text-base text-white">
                  Heat Reduction
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Keep spaces cool and comfortable with our heat rejection window film.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#d9f941] border-2 border-black flex items-center justify-center text-black shrink-0">
                  <Sun className="w-4 h-4" />
                </span>
                <h2 className="font-display font-extrabold text-base text-white">
                  99% UV Protection
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Safeguard interiors and skin with privacy window tinting solutions.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#6ee7b7] border-2 border-black flex items-center justify-center text-black shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <h2 className="font-display font-extrabold text-base text-white">
                  Privacy &amp; Security
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enjoy added peace of mind with vehicle window tinting near me and house window
                tinting.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-[#f45b9a] border-2 border-black flex items-center justify-center text-black shrink-0">
                  <Zap className="w-4 h-4" />
                </span>
                <h2 className="font-display font-extrabold text-base text-white">
                  Energy Savings
                </h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Lower AC costs and reduce electricity bills with commercial window tinting Doha
                and home window tinting Qatar.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            <a
              href="#about-booking-ticket"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f27438] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-y-[-2px] transition-transform whitespace-nowrap"
            >
              <span>Book Free On-Site Audit</span>
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

        {/* Right Column: Official Brand Crest + Real Photography Bento Mosaic */}
        <div className="lg:col-span-6 space-y-4">
          {/* Top Official Brand Card */}
          <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 rounded-2xl bg-[#121118] border-2 border-black shadow-[4px_4px_0px_#000] p-2 flex items-center justify-center shrink-0">
              <img
                src={ASSETS.brand.logoMark}
                alt="Exotic Tint Qatar Shield Crest"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="px-2.5 py-0.5 rounded bg-[#d9f941] border border-black font-mono font-extrabold text-[10px] uppercase">
                OFFICIAL QATAR SPECIALISTS
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
                Let Us Work While You Unwind!
              </h2>
              <p className="text-xs font-medium text-black/80 leading-relaxed">
                From mobile car tinting in your private villa garage to commercial curtain walls,
                marble kitchen islands, and Majlis sofa nano coating—we bring certified quality
                straight to your door.
              </p>
            </div>
          </div>

          {/* 2x2 Real Project Photo Mosaic */}
          <div className="grid grid-cols-2 gap-4">
            <div
              onClick={() => onSelectService('automotive-window-tinting')}
              className="rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] bg-[#1a1922] cursor-pointer group relative aspect-[16/11]"
            >
              <img
                src={ASSETS.services.automotive}
                alt="Automotive Window Tinting Qatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <span className="px-2 py-0.5 rounded bg-[#f27438] text-[#121118] font-mono font-extrabold text-[10px] border border-black">
                  01 · CAR TINTING
                </span>
              </div>
            </div>

            <div
              onClick={() => onSelectService('commercial-window-tinting')}
              className="rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] bg-[#1a1922] cursor-pointer group relative aspect-[16/11]"
            >
              <img
                src={ASSETS.services.commercial}
                alt="Commercial Window Tinting Doha"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <span className="px-2 py-0.5 rounded bg-[#d9f941] text-[#121118] font-mono font-extrabold text-[10px] border border-black">
                  02 · COMMERCIAL DOHA
                </span>
              </div>
            </div>

            <div
              onClick={() => onSelectService('marble-protection-film')}
              className="rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] bg-[#1a1922] cursor-pointer group relative aspect-[16/11]"
            >
              <img
                src={ASSETS.services.marbleProtection}
                alt="Marble Protection Film Qatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <span className="px-2 py-0.5 rounded bg-[#f45b9a] text-[#121118] font-mono font-extrabold text-[10px] border border-black">
                  05 · MARBLE SHIELD
                </span>
              </div>
            </div>

            <div
              onClick={() => onSelectService('fabric-nano-coating-service')}
              className="rounded-2xl overflow-hidden border-2 border-black shadow-[4px_4px_0px_#000] bg-[#1a1922] cursor-pointer group relative aspect-[16/11]"
            >
              <img
                src={ASSETS.services.fabricNanoCoating}
                alt="Fabric Nano Coating Sofa Qatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3">
                <span className="px-2 py-0.5 rounded bg-[#a78bfa] text-[#121118] font-mono font-extrabold text-[10px] border border-black">
                  06 · SOFA NANO COAT
                </span>
              </div>
            </div>
          </div>

          {/* 4 Authority Numbers Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
              <p className="font-display font-extrabold text-xl text-[#d9f941]">96%</p>
              <p className="text-[10px] font-mono text-slate-300 uppercase">Max IR Heat Block</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
              <p className="font-display font-extrabold text-xl text-[#6ee7b7]">99.9%</p>
              <p className="text-[10px] font-mono text-slate-300 uppercase">UV Ray Defense</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
              <p className="font-display font-extrabold text-xl text-[#f27438]">7 Days</p>
              <p className="text-[10px] font-mono text-slate-300 uppercase">8AM–6PM Dispatch</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[3px_3px_0px_#000] text-center">
              <p className="font-display font-extrabold text-xl text-[#f45b9a]">10 Yrs</p>
              <p className="text-[10px] font-mono text-slate-300 uppercase">Film Warranty</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
