'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ALL_SERVICES } from '@/features/services';
import {
  BookingAreaOptions,
  createTicketNumber,
  useBookingSelection,
  validateContactDetails,
} from '@/features/booking';
import { HAPPY_CLIENTS_DATA } from '@/features/home/data/testimonials';
import { SITE_CONFIG } from '@/config/site';

interface BookingResult {
  ticketNo: string;
  name: string;
  phone: string;
  service: string;
  area: string;
}

/** Perforated cream "Book in less than 60 sec" ticket (anchor: #booking). */
export default function QuickBookingSection() {
  const {
    service: selectedService,
    setService: setSelectedService,
    area: selectedArea,
    setArea: setSelectedArea,
  } = useBookingSelection();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [bookingResult, setBookingResult] = useState<BookingResult | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const activeReview = HAPPY_CLIENTS_DATA[reviewIndex];

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev + 1) % HAPPY_CLIENTS_DATA.length);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactDetails(fullName, phone);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setFormError('');
    setBookingResult({
      ticketNo: createTicketNumber('ETQ', result.digits),
      name: result.name,
      phone: result.phone,
      service: selectedService,
      area: selectedArea,
    });
  };

  return (
    <section id="booking" className="max-w-6xl mx-auto px-4 sm:px-6 pb-14 sm:pb-24">
      <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-5">
          <div>
            <span className="inline-block px-3 py-0.5 rounded bg-[#f27438] text-black font-mono font-extrabold text-xs border border-black mb-2">
              BOOK IN LESS THAN 60 SEC
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-[1.08] tracking-tight text-[#121118]">
              Book Your Window Tinting Service Today &amp; Get a Free Estimate!
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs font-semibold text-black/80">
              <li>
                • <strong>Affordable Flat-Rate Pricing:</strong> No hidden fees—just
                premium-quality tint and protection.
              </li>
              <li>
                • <strong>Fast &amp; Easy Online Booking:</strong> Get a quote and schedule
                your service in minutes!
              </li>
              <li>
                • <strong>Advanced Tint &amp; Protection Solutions:</strong> Enhance
                privacy, UV protection, and energy efficiency for homes and offices.
              </li>
            </ul>
          </div>

          {bookingResult ? (
            <div className="p-5 rounded-2xl bg-[#d9f941] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
              <div className="flex items-center gap-2 font-mono font-extrabold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>REQUEST SENT · {bookingResult.ticketNo}</span>
              </div>
              <p className="font-display font-extrabold text-xl">
                Thank you, {bookingResult.name}!
              </p>
              <p className="text-xs font-semibold text-black/80">
                Service: {bookingResult.service} · Area: {bookingResult.area} · Phone:{' '}
                {bookingResult.phone}
              </p>
              <button
                type="button"
                onClick={() => setBookingResult(null)}
                className="mt-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold cursor-pointer"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form
              id="fastBookingForm"
              onSubmit={handleBookingSubmit}
              className="space-y-3.5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="ticketName"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="ticketName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f27438]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="ticketPhone"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="ticketPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 31608423"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-mono font-bold text-[#121118] placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-[#f27438]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="ticketService"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Select Service *
                  </label>
                  <select
                    id="ticketService"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118] focus:outline-none focus:ring-2 focus:ring-[#f27438]"
                  >
                    {ALL_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="ticketArea"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Service Area *
                  </label>
                  <select
                    id="ticketArea"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118] focus:outline-none focus:ring-2 focus:ring-[#f27438]"
                  >
                    <BookingAreaOptions />
                  </select>
                </div>
              </div>

              {formError && (
                <p className="text-xs font-extrabold text-red-600">{formError}</p>
              )}
            </form>
          )}

          <div className="pt-3 border-t border-black/15">
            <p className="font-display font-extrabold text-sm sm:text-base text-[#121118]">
              “ {activeReview.quote} ”
            </p>
            <p className="text-xs font-mono font-bold text-black/70 mt-1">
              — {activeReview.name} ({activeReview.service})
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 p-6 sm:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-black/30 flex flex-col justify-between bg-[#f2e8d5]/60">
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold tracking-widest uppercase text-black/70">
              FREE ESTIMATE TICKET · +974 31608423
            </p>
            <p className="text-xs font-semibold text-black/85 leading-relaxed">
              📞 Contact Exotic Tint Qatar today at{' '}
              <strong className="font-mono">+974 31608423</strong> for expert window tinting
              Qatar and surface protection services. Whether you need sun control film for
              your villa or office, frosted, smart or safety film, surface protection, fabric
              nano coating or premium wallpaper, we’ve got you covered.{' '}
              <strong>Let us work while you unwind!</strong>
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <button
              type="submit"
              form="fastBookingForm"
              className="w-full py-3.5 px-6 rounded-full bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              Send Request
            </button>

            <button
              type="button"
              onClick={handleNextReview}
              className="w-full py-3.5 px-6 rounded-full bg-[#121118] hover:bg-black/85 text-white font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#f27438] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              Next Happy Client Review ★
            </button>

            <div className="text-center pt-1">
              <a
                href={SITE_CONFIG.phone.href}
                className="inline-block text-xs font-extrabold text-[#121118] underline underline-offset-4 hover:text-[#f27438] font-mono"
              >
                Call Us! +974 31608423 →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
