'use client';

import React, { useState } from 'react';
import { CheckCircle2, Phone } from 'lucide-react';
import { SITE_CONFIG } from '@/config/site';
import { createTicketNumber, validateContactDetails } from '@/features/booking';
import { REQUEST_MODES } from '@/features/contact/data/contact-data';
import { ALL_SERVICES } from '@/features/services';

interface SubmittedTicket {
  ticketNo: string;
  mode: string;
  name: string;
  phone: string;
  primaryService: string;
  comboService: string;
  area: string;
  timeSlot: string;
}

interface ContactBookingTicketProps {
  primaryService: string;
  setPrimaryService: (service: string) => void;
  selectedArea: string;
  setSelectedArea: (area: string) => void;
}

/** The main booking & dispatch form (anchor: #contact-ticket-module). */
export default function ContactBookingTicket({
  primaryService,
  setPrimaryService,
  selectedArea,
  setSelectedArea,
}: ContactBookingTicketProps) {
  const [requestMode, setRequestMode] = useState<string>('Fast 60-Second Quote');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [comboService, setComboService] = useState('None (Single Service)');
  const [preferredTime, setPreferredTime] = useState('Morning (8:00 AM – 12:00 PM)');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<SubmittedTicket | null>(null);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateContactDetails(fullName, phone);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    setFormError('');
    setSubmittedTicket({
      ticketNo: createTicketNumber('ETQ-CNT', result.digits),
      mode: requestMode,
      name: result.name,
      phone: result.phone,
      primaryService,
      comboService,
      area: selectedArea,
      timeSlot: preferredTime,
    });
  };

  return (
    <section id="contact-ticket-module" className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="rounded-3xl bg-[#f7efe1] text-[#121118] border-2 border-black shadow-[8px_8px_0px_#000] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left 7 Cols: Interactive Multi-Mode Form */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-[#121118] text-[#d9f941] font-mono text-xs font-bold">
                BOOK IN LESS THAN 60 SEC
              </span>
              <span className="text-xs font-mono font-extrabold text-black/70">
                NO HIDDEN FEES · FLAT-RATE QUOTE
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-[1.05]">
              Schedule Your Tint or Surface Protection
            </h2>

            {/* Request Mode Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              {REQUEST_MODES.map((m) => {
                const isActive = requestMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setRequestMode(m.id)}
                    className={`p-3 rounded-2xl border-2 border-black text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d9f941] text-[#121118] shadow-[3px_3px_0px_#000]'
                        : 'bg-white text-black/80 hover:bg-white/90'
                    }`}
                  >
                    <p className="font-display font-extrabold text-xs leading-snug">{m.label}</p>
                    <p className="text-[10px] font-medium text-black/70 mt-0.5 line-clamp-2">
                      {m.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {submittedTicket ? (
            <div className="p-6 rounded-2xl bg-[#6ee7b7] border-2 border-black shadow-[4px_4px_0px_#000] space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-black text-white font-mono text-xs font-bold">
                  DISPATCH TICKET #{submittedTicket.ticketNo}
                </span>
                <span className="font-extrabold text-xs uppercase">✓ Priority Logged</span>
              </div>
              <h3 className="font-display font-extrabold text-2xl">
                Thank you, {submittedTicket.name}!
              </h3>
              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                We have registered your <strong>{submittedTicket.mode}</strong> for{' '}
                <strong>{submittedTicket.primaryService}</strong>
                {submittedTicket.comboService !== 'None (Single Service)'
                  ? ` + ${submittedTicket.comboService}`
                  : ''}{' '}
                in <strong>{submittedTicket.area}</strong> ({submittedTicket.timeSlot}). Our Doha
                specialist will call <strong className="font-mono">{submittedTicket.phone}</strong>{' '}
                shortly!
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2 rounded-full bg-[#121118] text-white text-xs font-bold cursor-pointer"
                >
                  Submit Another Booking
                </button>
                <a
                  href={SITE_CONFIG.phone.href}
                  className="px-4 py-2 rounded-full bg-white text-[#121118] border border-black text-xs font-extrabold font-mono"
                >
                  Call +974 31608423 Now
                </a>
              </div>
            </div>
          ) : (
            <form
              id="contactPageForm"
              onSubmit={handleContactSubmit}
              className="space-y-4"
              noValidate
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="cpName"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Your Full Name *
                  </label>
                  <input
                    id="cpName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Abdullah Al-kuwari"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cpPhone"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="cpPhone"
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
                    htmlFor="cpPrimaryService"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Primary Service *
                  </label>
                  <select
                    id="cpPrimaryService"
                    value={primaryService}
                    onChange={(e) => setPrimaryService(e.target.value)}
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
                    htmlFor="cpComboService"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Add Second Service (Optional)
                  </label>
                  <select
                    id="cpComboService"
                    value={comboService}
                    onChange={(e) => setComboService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    <option value="None (Single Service)">None (Single Service)</option>
                    {ALL_SERVICES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        + {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="cpArea"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Location in Qatar *
                  </label>
                  <select
                    id="cpArea"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
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

                <div>
                  <label
                    htmlFor="cpTime"
                    className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                  >
                    Preferred Time Window *
                  </label>
                  <select
                    id="cpTime"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-bold text-[#121118]"
                  >
                    <option value="Morning (8:00 AM – 12:00 PM)">
                      Morning (8:00 AM – 12:00 PM)
                    </option>
                    <option value="Afternoon (12:00 PM – 3:00 PM)">
                      Afternoon (12:00 PM – 3:00 PM)
                    </option>
                    <option value="Late Afternoon (3:00 PM – 6:00 PM)">
                      Late Afternoon (3:00 PM – 6:00 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cpNotes"
                  className="block text-[11px] font-extrabold uppercase tracking-wider text-black/80 mb-1"
                >
                  Vehicle Model / Villa or Office Details (Optional)
                </label>
                <input
                  id="cpNotes"
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., Land Cruiser 2026 in Lusail garage / 4-bedroom villa windows"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-black text-sm font-semibold text-[#121118]"
                />
              </div>

              {formError && <p className="text-xs font-extrabold text-red-600">{formError}</p>}
            </form>
          )}
        </div>

        {/* Right 5 Cols: Perforated Ticket Stub */}
        <div className="lg:col-span-5 p-6 sm:p-10 border-t-2 lg:border-t-0 lg:border-l-2 border-dashed border-black/30 flex flex-col justify-between bg-[#f2e8d5]/60">
          <div className="space-y-4">
            <p className="font-mono text-xs font-bold tracking-widest uppercase text-black/70">
              PRIORITY DISPATCH STUB · +974 31608423
            </p>

            <div className="p-4 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_#000] space-y-2">
              <p className="font-mono font-extrabold text-[11px] uppercase text-black/60">
                YOUR SELECTED CONFIGURATION:
              </p>
              <p className="font-display font-extrabold text-base text-[#121118]">
                {primaryService}
              </p>
              {comboService !== 'None (Single Service)' && (
                <p className="text-xs font-extrabold text-[#f27438]">+ {comboService}</p>
              )}
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black/75 pt-2 border-t border-black/10">
                <span>Area: {selectedArea}</span>
                <span>{requestMode.split(' ')[1]} Mode</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs font-bold text-black/85">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Affordable Flat-Rate Pricing — No hidden fees</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Mobile Home Service &amp; On-Site Villa/Office Teams</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Open 8:00 AM – 6:00 PM · 7 Days a Week</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 mt-6">
            <button
              type="submit"
              form="contactPageForm"
              className="w-full py-3.5 px-6 rounded-full bg-[#f27438] hover:bg-[#ff854d] text-[#121118] font-extrabold text-sm border-2 border-black shadow-[4px_4px_0px_#000] transition-transform active:translate-y-0.5 cursor-pointer"
            >
              Send Request Now 🔥
            </button>

            <a
              href={SITE_CONFIG.phone.href}
              className="block w-full py-3.5 px-6 rounded-full bg-[#121118] hover:bg-black/85 text-white font-extrabold text-sm text-center border-2 border-black font-mono"
            >
              Call Us! +974 31608423
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
