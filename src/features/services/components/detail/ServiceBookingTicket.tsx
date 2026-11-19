'use client';

import React, { useState } from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import {
  DEFAULT_BOOKING_AREA,
  createTicketNumber,
  validateContactDetails,
} from '@/features/booking';
import { type EstimatorOption, type SimulatorOption } from '@/features/services/data/services-data';
import type { ServiceDetail } from '@/features/services/data/services-data';

type InstallMode = 'Mobile Home / On-Site' | 'Doha Studio';

interface BookingSuccess {
  ticketNo: string;
  name: string;
  phone: string;
  scopeLabel: string;
  shadeLabel: string;
  area: string;
  mode: string;
}

interface ServiceBookingTicketProps {
  service: ServiceDetail;
  activeSim: SimulatorOption;
  activeEst: EstimatorOption;
}

/** Perforated cream booking ticket for this service (anchor: #service-booking-ticket). */
export default function ServiceBookingTicket({
  service,
  activeSim,
  activeEst,
}: ServiceBookingTicketProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedArea, setSelectedArea] = useState(DEFAULT_BOOKING_AREA);
  const [installMode, setInstallMode] = useState<InstallMode>('Mobile Home / On-Site');
  const [formError, setFormError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState<BookingSuccess | null>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactDetails(fullName, phone);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setFormError('');
    setBookingSuccess({
      ticketNo: createTicketNumber(`ETQ-${service.num}`, result.digits),
      name: result.name,
      phone: result.phone,
      scopeLabel: activeEst.label,
      shadeLabel: activeSim.label,
      area: selectedArea,
      mode: installMode,
    });
  };

  return (
    <section id="service-booking-ticket" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Pre-Filled Service Booking Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 space-y-5">
          <div>
            <span className="inline-block px-3 py-0.5 rounded bg-[#f27438] text-black font-mono font-extrabold text-xs border border-black mb-2">
              BOOK IN LESS THAN 60 SEC · {service.title.toUpperCase()}
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
              Book Your {service.title} Today &amp; Get a Free Estimate!
            </h2>
            <p className="text-xs font-semibold text-black/75 mt-1">
              Selected Spec: <strong>{activeSim.label}</strong> · Scope:{' '}
              <strong>{activeEst.label}</strong>
            </p>
          </div>

          {bookingSuccess ? (
            <div className="p-5 rounded-2xl bg-[#d9f941] border-2 border-black shadow-[4px_4px_0px_#000] space-y-2">
              <div className="flex items-center gap-2 font-mono font-extrabold text-xs uppercase">
                <CheckCircle2 className="w-4 h-4" />
                <span>ESTIMATE CONFIRMED · {bookingSuccess.ticketNo}</span>
              </div>
              <p className="font-display font-extrabold text-xl">
                Thank you, {bookingSuccess.name}!
              </p>
              <p className="text-xs font-semibold text-black/85">
                Service: <strong>{service.title}</strong> ({bookingSuccess.shadeLabel}) · Scope:{' '}
                <strong>{bookingSuccess.scopeLabel}</strong> · Area:{' '}
                <strong>{bookingSuccess.area}</strong> ({bookingSuccess.mode})
              </p>
              <p className="text-xs font-mono font-bold text-black">
                Our Doha advisor will call {bookingSuccess.phone} within 15 minutes!
              </p>
              <button
                type="button"
                onClick={() => setBookingSuccess(null)}
                className="mt-2 px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold cursor-pointer"
              >
                Modify Request
              </button>
            </div>
          ) : (
            <form
              id="serviceDetailBookingForm"
              onSubmit={handleBookingSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="sdName"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Full Name *
                  </label>
                  <input
                    id="sdName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sdPhone"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="sdPhone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+974 31608423"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-mono font-bold text-[#121118]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="sdArea"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Service Area in Qatar *
                  </label>
                  <select
                    id="sdArea"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    <option value="Lusail">Lusail</option>
                    <option value="Al kheesa">Al kheesa</option>
                    <option value="Al garaffa">Al garaffa</option>
                    <option value="Pearl qatar">Pearl qatar</option>
                    <option value="Doha">Doha</option>
                    <option value="Al Rayyan">Al Rayyan</option>
                    <option value="Wakra">Wakra</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sdMode"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/70 mb-1"
                  >
                    Installation Location *
                  </label>
                  <select
                    id="sdMode"
                    value={installMode}
                    onChange={(e) =>
                      setInstallMode(
                        e.target.value as 'Mobile Home / On-Site' | 'Doha Studio'
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    <option value="Mobile Home / On-Site">
                      Mobile Home / On-Site Service
                    </option>
                    <option value="Doha Studio">Exotic Tint Qatar Studio</option>
                  </select>
                </div>
              </div>

              {formError && <p className="text-xs font-extrabold text-red-600">{formError}</p>}
            </form>
          )}
        </div>

        {/* Right Stub */}
        <div className="lg:col-span-5 p-6 sm:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-black/30 flex flex-col justify-between bg-[#f2e8d5]/60">
          <div className="space-y-3">
            <p className="font-mono text-xs font-bold uppercase text-black/70">
              PRIORITY DISPATCH · SERVICE #{service.num}
            </p>
            <p className="text-xs font-semibold text-black/85 leading-relaxed">
              📞 Contact Exotic Tint Qatar today at{' '}
              <strong className="font-mono">+974 31608423</strong> for expert{' '}
              <strong>{service.title}</strong> across Doha, Lusail, Al Rayyan, and Wakra.{' '}
              <strong>Let us work while you unwind!</strong>
            </p>
          </div>

          <div className="space-y-3 mt-6">
            <button
              type="submit"
              form="serviceDetailBookingForm"
              className="w-full py-3.5 px-6 rounded-full bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] cursor-pointer"
            >
              Send Request
            </button>
            <a
              href={SITE_CONFIG.phone.href}
              className="block text-center py-3.5 px-6 rounded-full bg-[#121118] text-white font-extrabold text-sm border-2 border-black"
            >
              Call Us! +974 31608423
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
