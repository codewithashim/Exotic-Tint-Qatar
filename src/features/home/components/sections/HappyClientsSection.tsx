import { HAPPY_CLIENTS_DATA } from '@/features/home/data/testimonials';

/** Three testimonial cards (anchor: #reviews). */
export default function HappyClientsSection() {
  return (
    <section id="reviews" className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 mb-8 border-b border-white/15">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Our Happy Clients
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Reviews from home and commercial clients across Qatar.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
          <span className="text-slate-400">Review Us On:</span>
          <a
            href="#contact"
            className="px-3 py-1 rounded-full bg-[#f27438] text-black border border-black font-extrabold hover:bg-[#d9f941] transition-colors"
          >
            Facebook-f
          </a>
          <a
            href="#contact"
            className="px-3 py-1 rounded-full bg-[#f45b9a] text-black border border-black font-extrabold hover:bg-[#d9f941] transition-colors"
          >
            Instagram
          </a>
          <a
            href="#contact"
            className="px-3 py-1 rounded-full bg-[#4fd1c5] text-black border border-black font-extrabold hover:bg-[#d9f941] transition-colors"
          >
            Tiktok
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {HAPPY_CLIENTS_DATA.map((client, i) => {
          const cardColors = ['bg-[#f7efe1]', 'bg-[#d9f941]', 'bg-[#6ee7b7]'];
          return (
            <blockquote
              key={client.id}
              className={`${cardColors[i % cardColors.length]} text-[#121118] rounded-3xl border-2 border-black shadow-[6px_6px_0px_#000] p-6 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-mono font-extrabold text-xs px-2.5 py-0.5 rounded bg-white border border-black">
                    ★ ★ ★ ★ ★ 5.0
                  </span>
                  <span className="font-mono text-xs font-bold text-black/60">
                    Verified Client
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-black/90">
                  “{client.quote}”
                </p>
              </div>
              <footer className="mt-5 pt-3 border-t border-black/20">
                <p className="font-display font-extrabold text-base">{client.name}</p>
                <p className="text-[11px] font-mono font-bold text-black/70">
                  {client.service}
                </p>
              </footer>
            </blockquote>
          );
        })}
      </div>
    </section>
  );
}
