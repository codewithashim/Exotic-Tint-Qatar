import { ShieldCheck, Sun, ThermometerSnowflake, Zap } from 'lucide-react';

/** "Why customers trust us" — four key benefit cards. */
export default function TrustBenefitsSection() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="mb-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
            Qatar’s Top Window Tint &amp; Protection Experts
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            At Exotic Tint Qatar, we’re proud to be the leading provider of window tinting
            Qatar services. Here’s why customers trust us:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
            <span className="w-10 h-10 rounded-xl bg-[#f27438] border-2 border-black flex items-center justify-center text-black">
              <ThermometerSnowflake className="w-5 h-5" />
            </span>
            <h3 className="font-display font-extrabold text-lg text-white">
              Heat Reduction
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Keep spaces cool and comfortable with our heat rejection window film.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
            <span className="w-10 h-10 rounded-xl bg-[#d9f941] border-2 border-black flex items-center justify-center text-black">
              <Sun className="w-5 h-5" />
            </span>
            <h3 className="font-display font-extrabold text-lg text-white">
              99% UV Protection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Safeguard interiors and skin with privacy window tinting solutions.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
            <span className="w-10 h-10 rounded-xl bg-[#6ee7b7] border-2 border-black flex items-center justify-center text-black">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="font-display font-extrabold text-lg text-white">
              Privacy &amp; Security
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enjoy added peace of mind with vehicle window tinting near me and house window
              tinting.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#1a1922] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
            <span className="w-10 h-10 rounded-xl bg-[#f45b9a] border-2 border-black flex items-center justify-center text-black">
              <Zap className="w-5 h-5" />
            </span>
            <h3 className="font-display font-extrabold text-lg text-white">
              Energy Savings
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Lower AC costs and reduce electricity bills with commercial window tinting
              Doha and home window tinting Qatar.
            </p>
          </div>
        </div>
    </section>
  );
}
