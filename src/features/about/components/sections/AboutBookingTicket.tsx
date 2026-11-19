'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { createTicketNumber, validateContactDetails } from '@/features/booking';
import { ALL_SERVICES } from '@/features/services';

interface BookingSuccess {
  ticketNo: string;
  name: string;
  phone: string;
  service: string;
  zone: string;
}

interface AboutBookingTicketProps {
  activeZone: string;
  setActiveZone: (zone: string) => void;
  selectedService: string;
  setSelectedService: (service: string) => void;
}

/** Perforated cream consultation ticket (anchor: #about-booking-ticket). */
export default function AboutBookingTicket({
  activeZone,
  setActiveZone,
  selectedService,
  setSelectedService,
}: AboutBookingTicketProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<BookingSuccess | null>(null);

  const handleAboutBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactDetails(fullName, phone);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setFormError('');
    setBookingSuccess({
      ticketNo: createTicketNumber('ETQ-ABT', result.digits),
      name: result.name,
      phone: result.phone,
      service: selectedService,
      zone: activeZone,
    });
  };

  return (
    <section id="about-booking-ticket" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="inline-block px-3 py-1 rounded-full bg-[#121118] text-[#d9f941] font-mono text-xs font-bold">
              BOOK IN LESS THAN 60 SEC · FREE QATAR ESTIMATE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-[1.05]">
              Schedule Your Service with Exotic Tint Qatar
            </h2>
            <p className="text-xs sm:text-sm font-medium text-black/75">
              Fill in your details below and our Doha team will call you right back to confirm
              your flat-rate quote.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="p-6 rounded-2xl bg-[#6ee7b7] border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-black text-white font-mono text-xs font-bold">
                  TICKET #{bookingSuccess.ticketNo}
                </span>
                <span className="font-extrabold text-xs uppercase"> Priority Dispatch</span>
              </div>
              <h3 className="font-display font-extrabold text-xl">
                Thank you, {bookingSuccess.name}!
              </h3>
              <p className="text-xs font-semibold">
                We received your request for <strong>{bookingSuccess.service}</strong> in{' '}
                <strong>{bookingSuccess.zone}</strong>. Our specialist will contact{' '}
                <strong className="font-mono">{bookingSuccess.phone}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => setBookingSuccess(null)}
                className="px-4 py-2 rounded-full bg-[#121118] text-white text-xs font-bold cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form
              id="aboutBookingForm"
              onSubmit={handleAboutBookingSubmit}
              className="space-y-4"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="abtName"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="abtName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Mohammed Al-Thani"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="abtPhone"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="abtPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 31608423"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="abtService"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Select Service *
                  </label>
                  <select
                    id="abtService"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    {ALL_SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="abtZone"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Service Area in Qatar *
                  </label>
                  <select
                    id="abtZone"
                    value={activeZone}
                    onChange={(e) => setActiveZone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    <option value="Lusail">Lusail</option>
                    <option value="Pearl qatar">The Pearl-Qatar</option>
                    <option value="Doha">Doha</option>
                    <option value="Al kheesa">Al Kheesa</option>
                    <option value="Al garaffa">Al Gharrafa</option>
                    <option value="Al Rayyan">Al Rayyan</option>
                    <option value="Wakra">Al Wakrah</option>
                  </select>
                </div>
              </div>

              {formError && <p className="text-xs font-extrabold text-red-600">{formError}</p>}
            </form>
          )}
        </div>

        <div className="lg:col-span-5 p-6 sm:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-black/30 flex flex-col justify-between bg-[#f2e8d5]/60">
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase text-black/70">
              DIRECT DISPATCH · +974 31608423
            </p>
            <p className="text-xs font-semibold text-black/85 leading-relaxed">
              📞 Contact Exotic Tint Qatar today at{' '}
              <strong className="font-mono">+974 31608423</strong> for expert window tinting Qatar
              and surface protection services.{' '}
              <strong>Let us work while you unwind!</strong>
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <button
              type="submit"
              form="aboutBookingForm"
              className="w-full py-3.5 px-6 rounded-full bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] cursor-pointer"
            >
              Send Request
            </button>
            <a
              href={SITE_CONFIG.phone.href}
              className="block text-center py-3.5 px-6 rounded-full bg-[#121118] text-white font-extrabold text-sm border-2 border-black font-mono"
            >
              Call Us! +974 31608423
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
