import { SITE_CONFIG } from '@/config/site';

/** Top strip with opening hours, coverage areas and the hotline (md+ only). */
export default function HeaderUtilityBar() {
  return (
    <div className="hidden md:block bg-[#1a1922] border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-4 text-[11px] font-mono">
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#6ee7b7] text-[#121118] font-extrabold border border-black shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
            <span>OPEN 8:00 AM – 6:00 PM (7 DAYS)</span>
          </span>
          <span className="text-slate-300 truncate">
            Mobile Home Service &amp; Studio Installation: Doha · Lusail · The Pearl · Al Rayyan ·
            Wakra
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden xl:inline text-[#d9f941] font-bold">
            ★ 96% IR Heat Rejection · 99.9% UV Defense
          </span>
          <span className="hidden xl:inline text-white/20">|</span>
          <a
            href={SITE_CONFIG.phone.href}
            className="text-white hover:text-[#d9f941] font-extrabold transition-colors"
          >
            📞 {SITE_CONFIG.phone.display}
          </a>
        </div>
      </div>
    </div>
  );
}
