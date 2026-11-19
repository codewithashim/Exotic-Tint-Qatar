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
    'Premier automotive window tinting, residential and commercial solar control film, custom frosted glass, marble protection, and fabric nano-coating across Doha, Qatar.',
  phone: {
    display: '+974 31608423',
    href: 'tel:+97431608423',
  },
  whatsapp: 'https://wa.me/97431608423',
  hours: {
    label: '8:00 AM – 6:00 PM',
    days: 'Open 7 Days a Week',
    /** Machine-readable form of the label above (24h, every day). Used in structured data. */
    opens: '08:00',
    closes: '18:00',
  },
  socials: {
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
  },
} as const;

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
