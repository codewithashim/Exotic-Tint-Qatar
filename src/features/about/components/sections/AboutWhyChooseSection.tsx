

/** Three signature promises. */
export default function AboutWhyChooseSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-[#f27438] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 space-y-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-white border-2 border-black font-mono font-extrabold text-xs shadow-[2px_2px_0px_#000]">
            PROMISE 01
          </span>
          <h3 className="font-display font-extrabold text-2xl leading-tight">
            Affordable Flat-Rate Pricing
          </h3>
          <p className="text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
            No hidden fees—just premium-quality tint and protection for your car, villa, office,
            marble countertops, and sofas across Qatar.
          </p>
        </div>

        <div className="rounded-3xl bg-[#d9f941] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 space-y-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-white border-2 border-black font-mono font-extrabold text-xs shadow-[2px_2px_0px_#000]">
            PROMISE 02
          </span>
          <h3 className="font-display font-extrabold text-2xl leading-tight">
            Fast &amp; Easy Online Booking
          </h3>
          <p className="text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
            Get a quote and schedule your mobile home service or studio appointment in under 60
            seconds—7 days a week from 8:00 AM to 6:00 PM.
          </p>
        </div>

        <div className="rounded-3xl bg-[#6ee7b7] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] p-6 space-y-3">
          <span className="inline-block px-3 py-1 rounded-lg bg-white border-2 border-black font-mono font-extrabold text-xs shadow-[2px_2px_0px_#000]">
            PROMISE 03
          </span>
          <h3 className="font-display font-extrabold text-2xl leading-tight">
            Advanced Tint &amp; Protection Solutions
          </h3>
          <p className="text-xs sm:text-sm font-medium text-black/85 leading-relaxed">
            Enhance privacy, UV protection, and surface durability with genuine nano-ceramic
            window films, CNC frosted vinyl, TPU stone armor, and SiO2 textile coating.
          </p>
        </div>
      </div>
    </section>
  );
}
