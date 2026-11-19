import type { Metadata } from 'next';
import { ASSET_DIMENSIONS } from '@/config/assets';
import { absoluteAssetUrl, absoluteUrl } from './canonical';
import { SEO_CONFIG } from './config';
import { truncateText } from './text';

export interface SeoImage {
  /** Internal path (`/images/...`) or absolute http(s) URL. */
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PageSeoInput {
  title: string;
  description: string;
  /** Internal path of the page, e.g. `/services/automotive-window-tinting`. */
  path: string;
  image?: SeoImage;
  type?: 'website' | 'article';
  /** ISO 8601 date for articles. */
  publishedTime?: string;
  /** Article section/category. */
  section?: string;
  noindex?: boolean;
}

const ROBOTS_NOINDEX: Metadata['robots'] = { index: false, follow: false };
const ROBOTS_INDEX: Metadata['robots'] = {
  index: true,
  follow: true,
  googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
};

export function resolveRobots(noindex = false): Metadata['robots'] {
  return noindex || SEO_CONFIG.indexingDisabled ? ROBOTS_NOINDEX : ROBOTS_INDEX;
}

function resolveImage(image: SeoImage | undefined) {
  const source = image ?? SEO_CONFIG.defaultImage;
  const url = absoluteAssetUrl(source.url);
  if (!url) return resolveImage(undefined);
  const dims = source.width && source.height ? source : ASSET_DIMENSIONS[source.url];
  return {
    url,
    alt: source.alt,
    ...(dims ? { width: dims.width, height: dims.height } : {}),
  };
}

/**
 * Builds complete, self-contained metadata for one page: title, description, canonical,
 * Open Graph, Twitter card and robots. Page metadata replaces (shallow merge) the root
 * `openGraph`/`twitter` blocks, so every field is set here instead of relying on inheritance.
 */
export function buildPageMetadata(input: PageSeoInput): Metadata {
  const url = absoluteUrl(input.path);
  const description = truncateText(input.description, SEO_CONFIG.maxDescriptionLength);
  const image = resolveImage(input.image);
  const fitsWithSuffix =
    input.title.length + SEO_CONFIG.titleSuffix.length <= SEO_CONFIG.maxTitleLength;
  const type = input.type ?? 'website';

  return {
    title: fitsWithSuffix ? input.title : { absolute: input.title },
    description,
    alternates: { canonical: url },
    robots: resolveRobots(input.noindex),
    openGraph: {
      type,
      url,
      siteName: SEO_CONFIG.siteName,
      locale: SEO_CONFIG.ogLocale,
      title: input.title,
      description,
      images: [image],
      ...(type === 'article'
        ? {
            ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
            ...(input.section ? { section: input.section } : {}),
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/** Metadata for a slug that does not exist (rendered alongside a 404 response). */
export function notFoundMetadata(): Metadata {
  return { title: 'Page not found', robots: ROBOTS_NOINDEX };
}
