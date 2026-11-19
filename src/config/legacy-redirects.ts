/**
 * Permanent (308) redirects for URLs that no longer exist, so old links and search results
 * land on the closest current page. Loaded by next.config.ts — keep this file free of `@/` imports.
 */
export const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Nov 2026 service catalogue update
  { source: '/services/automotive-window-tinting', destination: '/services/sun-control-window-film' },
  { source: '/services/commercial-window-tinting', destination: '/services/sun-control-window-film' },
  { source: '/services/residential-window-tinting', destination: '/services/sun-control-window-film' },
  { source: '/services/customized-cut-frosted-film', destination: '/services/frosted-decorative-film' },
  { source: '/services/marble-protection-film', destination: '/services/surface-protection-film' },
  { source: '/services/fabric-nano-coating-service', destination: '/services/fabric-nano-coating' },
  { source: '/blogs/best-car-window-tinting-qatar-nano-ceramic-guide', destination: '/blogs' },
];
