import type { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo/config';
import { getSitemapEntries } from '@/lib/seo/sitemap';

/** `/sitemap.xml` — static at build time. Under 50,000 URLs, so no sitemap index is needed. */
export default function sitemap(): MetadataRoute.Sitemap {
  return SEO_CONFIG.indexingDisabled ? [] : getSitemapEntries();
}
