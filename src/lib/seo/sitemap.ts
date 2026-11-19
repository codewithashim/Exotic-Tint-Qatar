import type { MetadataRoute } from 'next';
import { ROUTES } from '@/config/routes';
import { BLOG_POSTS } from '@/features/blogs';
import { ALL_SERVICES } from '@/features/services';
import { absoluteAssetUrl, absoluteUrl } from './canonical';
import { toIsoDate } from './text';

/**
 * Every indexable URL. Add a route here when you add a public page.
 *
 * `lastModified` is only emitted when the content has a real date (blog `publishDate`).
 * Static pages have no tracked edit date, so it is omitted rather than faked with `new Date()`.
 * `changeFrequency`/`priority` are omitted: Google ignores them.
 */
export function getSitemapEntries(): MetadataRoute.Sitemap {
  const staticPages = [
    ROUTES.home,
    ROUTES.about,
    ROUTES.services,
    ROUTES.gallery,
    ROUTES.blogs,
    ROUTES.contact,
  ].map((path) => ({ url: absoluteUrl(path) }));

  const services = ALL_SERVICES.map((service) => ({
    url: absoluteUrl(ROUTES.service(service.slug)),
    images: [absoluteAssetUrl(service.image)].filter((src): src is string => Boolean(src)),
  }));

  const posts = BLOG_POSTS.map((post) => {
    const lastModified = toIsoDate(post.publishedAt ?? post.publishDate);
    return {
      url: absoluteUrl(ROUTES.blogPost(post.slug)),
      ...(lastModified ? { lastModified } : {}),
      images: [absoluteAssetUrl(post.image)].filter((src): src is string => Boolean(src)),
    };
  });

  // De-duplicate defensively (e.g. two content entries sharing a slug).
  const seen = new Set<string>();
  return [...staticPages, ...services, ...posts].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
