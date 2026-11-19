/**
 * Single source of truth for every static file served from `/public`.
 *
 * Never hard-code `/brand/...`, `/images/...` or `/videos/...` strings in components or data —
 * import from here so renames and format changes happen in one place.
 *
 * Folder conventions (public/):
 *   brand/            logo marks and brand identity files
 *   images/services/  one hero image per service (WebP, ~1024px)
 *   videos/           background / showcase video
 */
export const ASSETS = {
  brand: {
    /** Full logo (mark + "Exotic Tint Qatar" lettering), transparent. For placements ≥ ~80px. */
    logo: '/brand/logo.webp',
    /** Icon mark only (buildings + roofs), transparent. For small placements next to text. */
    logoMark: '/brand/logo-mark.webp',
    /** Full logo as 512×512 PNG — structured data / external consumers. */
    logoPng: '/brand/logo.png',
    /** Web app manifest icons (full logo on white). Favicons live in src/app (file conventions). */
    icons: {
      icon192: '/brand/icons/icon-192.png',
      icon512: '/brand/icons/icon-512.png',
      maskable512: '/brand/icons/maskable-512.png',
    },
  },
  videos: {
    heroStudio: '/videos/hero-tinting-studio.mp4',
  },
  services: {
    automotive: '/images/services/automotive-window-tinting.webp',
    commercial: '/images/services/commercial-window-tinting.webp',
    residential: '/images/services/residential-window-tinting.webp',
    frostedFilm: '/images/services/frosted-film-custom-cut.webp',
    marbleProtection: '/images/services/marble-protection-film.webp',
    fabricNanoCoating: '/images/services/fabric-nano-coating.webp',
  },
  og: {
    /** 1200×630 fallback share image for pages without their own image. */
    default: '/og/default.jpg',
  },
} as const;

/**
 * Intrinsic pixel size of each image. Used for Open Graph `width`/`height`, structured data
 * and `<img width height>` (prevents layout shift). Update when an image file is replaced.
 */
export const ASSET_DIMENSIONS: Record<string, { width: number; height: number }> = {
  [ASSETS.brand.logo]: { width: 320, height: 320 },
  [ASSETS.brand.logoMark]: { width: 256, height: 256 },
  [ASSETS.brand.logoPng]: { width: 512, height: 512 },
  [ASSETS.services.automotive]: { width: 1024, height: 1024 },
  [ASSETS.services.commercial]: { width: 1024, height: 1024 },
  [ASSETS.services.residential]: { width: 1024, height: 1024 },
  [ASSETS.services.frostedFilm]: { width: 1024, height: 1024 },
  [ASSETS.services.marbleProtection]: { width: 1536, height: 815 },
  [ASSETS.services.fabricNanoCoating]: { width: 1000, height: 667 },
  [ASSETS.og.default]: { width: 1200, height: 630 },
};
