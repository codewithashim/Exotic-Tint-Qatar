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
    logoMark: '/brand/logo-mark.png',
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
} as const;
