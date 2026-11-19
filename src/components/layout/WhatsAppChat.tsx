'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, X } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { ASSETS } from '@/config/assets';
import { getActiveServiceSlug } from '@/config/routes';
import { SITE_CONFIG, whatsappLink } from '@/config/site';
import { getServiceBySlug } from '@/features/services/data/services-data';

const WHATSAPP_GREEN = '#25D366';

interface WhatsAppChatProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * WhatsApp chat widget: a floating launcher (md+) and a panel with pre-filled quick messages.
 * On phones the launcher lives in the bottom tab bar instead (see MobileTabBar).
 */
export default function WhatsAppChat({ open, onOpenChange }: WhatsAppChatProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const service = getServiceBySlug(getActiveServiceSlug(pathname) ?? '');

  const quickMessages = [
    service
      ? {
          label: `Get a quote for ${service.title}`,
          text: `Hello Exotic Tint Qatar, I'd like a quote for ${service.title}.`,
        }
      : {
          label: 'Get a free quote',
          text: "Hello Exotic Tint Qatar, I'd like a free quote.",
        },
    {
      label: 'Book a free site visit',
      text: "Hello Exotic Tint Qatar, I'd like to book a free site visit.",
    },
    {
      label: 'Ask a question',
      text: 'Hello Exotic Tint Qatar, I have a question about your services.',
    },
  ];

  // Close on Escape and on clicks outside the panel / launchers.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false);
    const onPointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (panelRef.current?.contains(target) || target.closest('[data-whatsapp-launcher]')) return;
      onOpenChange(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, onOpenChange]);

  // Close when navigating to another page.
  useEffect(() => {
    onOpenChange(false);
  }, [pathname, onOpenChange]);

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          id="whatsapp-chat-panel"
          role="dialog"
          aria-label="Chat with Exotic Tint Qatar on WhatsApp"
          className="fixed z-50 right-3 left-3 md:left-auto md:right-6 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] md:bottom-24 md:w-[360px] rounded-3xl overflow-hidden border-2 border-black shadow-[6px_6px_0px_#000] bg-[#f7efe1] text-[#121118]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: '#075E54' }}>
            <div className="w-10 h-10 rounded-full bg-white p-1 shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ASSETS.brand.logoMark} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display font-extrabold text-sm leading-tight">{SITE_CONFIG.name}</p>
              <p className="text-[11px] text-white/80">
                {SITE_CONFIG.hours.days} · {SITE_CONFIG.hours.label}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close WhatsApp chat"
              className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <div className="inline-block max-w-[85%] rounded-2xl rounded-tl-sm bg-white border border-black/10 px-3.5 py-2.5 text-sm shadow-sm">
              Hi there 👋 How can we help? Pick a topic below to start a WhatsApp chat with our team.
            </div>

            <ul className="space-y-2">
              {quickMessages.map((m) => (
                <li key={m.label}>
                  <a
                    href={whatsappLink(m.text)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-2 w-full px-3.5 py-2.5 rounded-2xl bg-white hover:bg-[#dcf8c6] border-2 border-black font-display font-extrabold text-sm transition-colors"
                  >
                    <span>{m.label}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-display font-extrabold text-sm border-2 border-black shadow-[3px_3px_0px_#000] hover:-translate-y-0.5 transition-transform"
              style={{ backgroundColor: WHATSAPP_GREEN }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Open WhatsApp Chat</span>
            </a>
            <p className="text-[11px] text-center text-black/60 font-mono">
              WhatsApp {SITE_CONFIG.phone.display}
            </p>
          </div>
        </div>
      )}

      {/* Floating launcher (tablet & desktop) */}
      <button
        type="button"
        data-whatsapp-launcher
        onClick={() => onOpenChange(!open)}
        aria-label={open ? 'Close WhatsApp chat' : 'Chat with us on WhatsApp'}
        aria-expanded={open}
        aria-controls="whatsapp-chat-panel"
        className="hidden md:flex fixed z-50 right-6 bottom-6 w-14 h-14 rounded-full items-center justify-center text-white border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-0.5 transition-transform cursor-pointer"
        style={{ backgroundColor: WHATSAPP_GREEN }}
      >
        {open ? <X className="w-6 h-6" /> : <WhatsAppIcon className="w-7 h-7" />}
      </button>
    </>
  );
}
