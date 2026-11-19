import { SITE_URL } from './site-url.ts';

/**
 * URL policy (matches Next.js `trailingSlash: false`):
 *  - absolute `https://<SITE_URL host><path>`
 *  - no query string or hash (no query parameter currently changes server-rendered content)
 *  - no trailing slash, duplicate slashes collapsed
 *  - path case is preserved (slugs are already lowercase)
 */
export function normalizePath(path: string): string {
  const withoutQuery = path.split(/[?#]/, 1)[0] ?? '';
  const collapsed = `/${withoutQuery}`.replace(/\/{2,}/g, '/');
  const trimmed = collapsed.length > 1 ? collapsed.replace(/\/+$/, '') : collapsed;
  return trimmed || '/';
}

/** Absolute canonical URL for an internal path. The home page is the bare origin. */
export function absoluteUrl(path = '/', base: string = SITE_URL): string {
  const normalized = normalizePath(path);
  return normalized === '/' ? base : `${base}${normalized}`;
}

/**
 * Absolute URL for an asset (image, video). Internal paths are prefixed with the site origin;
 * absolute http(s) URLs are returned unchanged; anything else (javascript:, data:) is rejected.
 */
export function absoluteAssetUrl(src: string, base: string = SITE_URL): string | null {
  if (src.startsWith('/') && !src.startsWith('//')) return `${base}${src}`;
  try {
    const url = new URL(src);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
  } catch {
    return null;
  }
}
