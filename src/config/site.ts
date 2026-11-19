import { SITE_URL } from '@/lib/seo/site-url';

/**
 * Business-wide constants: contact details, opening hours, socials and service zones.
 * Change a phone number or social link here and it updates across the whole site.
 */
export const SITE_CONFIG = {
  name: 'Exotic Tint Qatar',
  tagline: 'Window Tint & Surface Shield',
  /** Public production origin — see `src/lib/seo/site-url.ts` (SITE_URL → APP_URL → default). */
  url: SITE_URL,
  description:
    'Commercial and residential sun control window film, surface protection film, frosted and decorative film, fabric nano coating, wallpaper, smart film and safety film across Doha, Qatar.',
  phone: {
    display: '+974 31608423',
    href: 'tel:+97431608423',
  },
  /** WhatsApp chat link (same number as the phone). Use `whatsappLink(message)` to pre-fill text. */
  whatsapp: 'https://wa.me/97431608423',
  hours: {
    label: '8:00 AM – 6:00 PM',
    days: 'Open 7 Days a Week',
    /** Machine-readable form of the label above (24h, every day). Used in structured data. */
    opens: '08:00',
    closes: '18:00',
  },
  /** Official profiles (tracking parameters removed). Also published as schema.org `sameAs`. */
  socials: {
    facebook: 'https://www.facebook.com/exotics.window.tintin/',
    instagram: 'https://www.instagram.com/exotic_tint_qatar',
    tiktok: 'https://www.tiktok.com/@exotic_window_tinting_qa',
  },
} as const;

/** WhatsApp chat URL, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  return message ? `${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(message)}` : SITE_CONFIG.whatsapp;
}

/** Areas customers can pick in booking forms (value === label). */
export const BOOKING_AREAS = [
  'Lusail',
  'Al kheesa',
  'Al garaffa',
  'Pearl qatar',
  'Doha',
  'Al Rayyan',
  'Wakra',
] as const;

export type BookingArea = (typeof BOOKING_AREAS)[number];

/** Zones shown as quick links in the site footer. */
export const FOOTER_SERVICE_ZONES = [
  'Doha',
  'Lusail',
  'The Pearl',
  'West Bay',
  'Al Rayyan',
  'Al Wakrah',
] as const;
