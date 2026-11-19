import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/canonical';
import { SEO_CONFIG } from '@/lib/seo/config';

/**
 * `/robots.txt`. The site has no private areas, so everything is crawlable — including
 * `/_next/` JS/CSS and `/images`, which Google needs to render pages.
 * robots.txt is not access control; with `SEO_NOINDEX=true` (staging) everything is disallowed
 * and every page also sends `noindex`.
 */
export default function robots(): MetadataRoute.Robots {
  if (SEO_CONFIG.indexingDisabled) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
