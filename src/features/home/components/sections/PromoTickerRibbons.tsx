/** Two crisscrossing diagonal promo ribbons. */
export default function PromoTickerRibbons() {
  return (
    <div className="relative py-5 sm:py-6 overflow-hidden select-none my-2">
      <div className="bg-[#f45b9a] text-[#121118] border-y-2 border-black py-2 sm:py-2.5 -rotate-1 scale-105 shadow-md">
        <div className="flex items-center justify-around gap-6 text-[11px] sm:text-sm font-extrabold tracking-tight whitespace-nowrap overflow-hidden px-4">
          <span>
            • Affordable Flat-Rate Pricing: No hidden fees—just premium-quality tint and
            protection
          </span>
          <span className="hidden md:inline">
            • Fast &amp; Easy Online Booking: Get a quote and schedule your service in
            minutes!
          </span>
          <span>• Call Us! +974 31608423</span>
        </div>
      </div>
      <div className="bg-[#d9f941] text-[#121118] border-y-2 border-black py-2 sm:py-2.5 rotate-1 scale-105 -mt-2.5 sm:-mt-3 shadow-lg">
        <div className="flex items-center justify-around gap-6 text-[11px] sm:text-sm font-extrabold tracking-tight whitespace-nowrap overflow-hidden px-4">
          <span>• Premium Tint &amp; Protection for Your Windows!</span>
          <span className="hidden md:inline">
            • Enhance Privacy, Block UV Rays &amp; Protect Your Surfaces with High-Quality
            Tint Solutions!
          </span>
          <span>• Let us work while you unwind!</span>
        </div>
      </div>
    </div>
  );
}
