import { ASSETS, ASSET_DIMENSIONS } from '@/config/assets';
import { ROUTES } from '@/config/routes';
import { SITE_CONFIG } from '@/config/site';
import type { BlogPost } from '@/features/blogs';
import {
  SERVICE_CATEGORY_LABELS,
  type ServiceDetail,
} from '@/features/services/data/services-data';
import { absoluteAssetUrl, absoluteUrl } from './canonical';
import { SEO_CONFIG, getVerifiedSocialProfiles } from './config';
import { toIsoDate } from './text';

/**
 * Schema.org builders. Rules:
 *  - Only facts that exist in SITE_CONFIG or the content data are emitted.
 *  - No ratings, reviews, prices, offers or street address (none are verified).
 *  - The business and website entities are defined once (root layout) and referenced by `@id`.
 */
type JsonLdNode = Record<string, unknown>;

const SITE = SEO_CONFIG.siteUrl;
export const BUSINESS_ID = `${SITE}/#business`;
export const WEBSITE_ID = `${SITE}/#website`;

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function imageObject(src: string, caption?: string): JsonLdNode | undefined {
  const url = absoluteAssetUrl(src);
  if (!url) return undefined;
  const dims = ASSET_DIMENSIONS[src];
  return {
    '@type': 'ImageObject',
    url,
    ...(dims ? { width: dims.width, height: dims.height } : {}),
    ...(caption ? { caption } : {}),
  };
}

function areaServed(): JsonLdNode[] {
  return [
    // Mix of cities and districts, so the generic Place type is used.
    ...SEO_CONFIG.areaServed.map((name) => ({ '@type': 'Place', name })),
    { '@type': 'Country', name: 'Qatar' },
  ];
}

/** The business itself. Rendered once, site-wide. */
export function localBusinessSchema(): JsonLdNode {
  const sameAs = getVerifiedSocialProfiles();
  return {
    '@type': 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE,
    logo: imageObject(ASSETS.brand.logoPng),
    image: absoluteAssetUrl(ASSETS.og.default),
    telephone: SITE_CONFIG.phone.href.replace(/^tel:/, ''),
    address: { '@type': 'PostalAddress', addressLocality: 'Doha', addressCountry: 'QA' },
    areaServed: areaServed(),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ALL_DAYS,
        opens: SITE_CONFIG.hours.opens,
        closes: SITE_CONFIG.hours.closes,
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_CONFIG.name,
    url: SITE,
    inLanguage: SEO_CONFIG.language,
    publisher: { '@id': BUSINESS_ID },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Standard trail: Home → (section) → (page). */
export function breadcrumbTrail(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ name: 'Home', path: ROUTES.home }, ...items];
}

export function serviceSchema(service: ServiceDetail): JsonLdNode {
  const url = absoluteUrl(ROUTES.service(service.slug));
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: service.title,
    serviceType: service.title,
    category: SERVICE_CATEGORY_LABELS[service.category],
    description: service.longDescription,
    url,
    image: imageObject(service.image, service.alt),
    provider: { '@id': BUSINESS_ID },
    areaServed: areaServed(),
  };
}

export function blogPostingSchema(post: BlogPost): JsonLdNode {
  const url = absoluteUrl(ROUTES.blogPost(post.slug));
  const datePublished = toIsoDate(post.publishedAt ?? post.publishDate);
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title.length > 110 ? `${post.title.slice(0, 109)}…` : post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    image: imageObject(post.image, post.alt),
    ...(datePublished ? { datePublished } : {}),
    articleSection: post.category,
    inLanguage: SEO_CONFIG.language,
    // Articles are credited to an in-house team, not a named person.
    author: { '@type': 'Organization', name: post.author, url: SITE },
    publisher: { '@id': BUSINESS_ID },
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': `${absoluteUrl(ROUTES.service(post.relatedServiceSlug))}#service` },
  };
}

export function collectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items: { name: string; path: string }[];
}): JsonLdNode {
  const url = absoluteUrl(input.path);
  return {
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    name: input.name,
    description: input.description,
    url,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: input.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: absoluteUrl(item.path),
      })),
    },
  };
}

/** Wraps nodes into one `@graph` document. */
export function jsonLdGraph(...nodes: JsonLdNode[]): JsonLdNode {
  return { '@context': 'https://schema.org', '@graph': nodes };
}
