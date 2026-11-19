import { ASSETS, ASSET_DIMENSIONS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { INDEXING_DISABLED, SITE_URL } from './site-url';

/** Central SEO settings. Business facts come from SITE_CONFIG — do not duplicate them here. */
export const SEO_CONFIG = {
  siteUrl: SITE_URL,
  siteName: SITE_CONFIG.name,
  indexingDisabled: INDEXING_DISABLED,
  /** `<html lang>` and schema `inLanguage`. */
  language: 'en',
  /** Open Graph locale (language_TERRITORY). */
  ogLocale: 'en_QA',
  defaultTitle: `${SITE_CONFIG.name} | Nano-Ceramic Window Tinting & Surface Protection in Doha`,
  titleSuffix: ` | ${SITE_CONFIG.name}`,
  /** Titles longer than this (including the suffix) are rendered without the suffix. */
  maxTitleLength: 70,
  maxDescriptionLength: 160,
  defaultDescription: SITE_CONFIG.description,
  defaultImage: {
    url: ASSETS.og.default,
    ...ASSET_DIMENSIONS[ASSETS.og.default],
    alt: `${SITE_CONFIG.name} — window tinting and surface protection in Doha, Qatar`,
  },
  themeColor: '#121118',
  /** Cities shown in the site's service-area content. Used for `areaServed`. */
  areaServed: ['Doha', 'Lusail', 'The Pearl-Qatar', 'West Bay', 'Al Rayyan', 'Al Wakrah'],
} as const;

/**
 * Social profile URLs that are safe to publish as schema `sameAs`.
 * Bare domains such as `https://instagram.com` are placeholders, not the business profile,
 * so they are filtered out until real profile URLs are set in SITE_CONFIG.socials.
 */
export function getVerifiedSocialProfiles(): string[] {
  return Object.values(SITE_CONFIG.socials).filter((href) => {
    try {
      return new URL(href).pathname.replace(/\/+$/, '').length > 0;
    } catch {
      return false;
    }
  });
}
