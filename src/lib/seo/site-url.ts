/**
 * Resolves the public production origin used for canonical URLs, Open Graph URLs,
 * the sitemap and structured data.
 *
 * Precedence: `SITE_URL` → `APP_URL` (legacy) → DEFAULT_SITE_URL.
 * Invalid values (e.g. the `.env.example` placeholder) are ignored rather than crashing the build.
 *
 * Kept free of `@/` imports so it can be unit-tested with `node --test`.
 */
export const DEFAULT_SITE_URL = 'https://exotictintqatar.com';

type Env = Record<string, string | undefined>;

/** Returns the origin (`https://host[:port]`) of a URL string, or null if it is not an http(s) URL. */
export function normalizeSiteUrl(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    if (!url.hostname || url.username || url.password) return null;
    return url.origin;
  } catch {
    return null;
  }
}

export function resolveSiteUrl(env: Env): string {
  return normalizeSiteUrl(env.SITE_URL) ?? normalizeSiteUrl(env.APP_URL) ?? DEFAULT_SITE_URL;
}

/** True when this deployment must not be indexed (staging, previews). Set `SEO_NOINDEX=true`. */
export function isIndexingDisabled(env: Env): boolean {
  const flag = env.SEO_NOINDEX?.trim().toLowerCase();
  return flag === 'true' || flag === '1' || flag === 'yes';
}

// `process.env.X` is read explicitly (not as an object) so bundlers can inline it.
const ENV: Env = {
  SITE_URL: process.env.SITE_URL,
  APP_URL: process.env.APP_URL,
  SEO_NOINDEX: process.env.SEO_NOINDEX,
};

export const SITE_URL = resolveSiteUrl(ENV);
export const INDEXING_DISABLED = isIndexingDisabled(ENV);
