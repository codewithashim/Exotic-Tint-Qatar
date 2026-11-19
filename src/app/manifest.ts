import type { MetadataRoute } from 'next';
import { ASSETS } from '@/config/assets';
import { SITE_CONFIG } from '@/config/site';
import { SEO_CONFIG } from '@/lib/seo/config';

/** `/manifest.webmanifest`. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: 'Exotic Tint',
    description: SITE_CONFIG.description,
    start_url: '/',
    display: 'browser',
    background_color: SEO_CONFIG.themeColor,
    theme_color: SEO_CONFIG.themeColor,
    lang: SEO_CONFIG.language,
    icons: [
      { src: ASSETS.brand.icons.icon192, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: ASSETS.brand.icons.icon512, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: ASSETS.brand.icons.maskable512, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
