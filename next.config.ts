import type { NextConfig } from 'next';
import { LEGACY_REDIRECTS } from './src/config/legacy-redirects.ts';
import { SITE_URL } from './src/lib/seo/site-url.ts';

/**
 * 308-redirects the `www.` / apex twin of SITE_URL to SITE_URL, so only one host is indexed.
 * Matches that single host only — platform hosts (Cloud Run, previews, localhost) are untouched.
 * HTTP → HTTPS is left to the hosting platform / load balancer.
 */
function canonicalHostRedirects() {
  const { hostname } = new URL(SITE_URL);
  if (hostname === 'localhost' || !hostname.includes('.') || /^[\d.]+$/.test(hostname)) return [];
  const twin = hostname.startsWith('www.') ? hostname.slice(4) : `www.${hostname}`;
  return [
    {
      source: '/:path*',
      has: [{ type: 'host' as const, value: twin }],
      destination: `${SITE_URL}/:path*`,
      permanent: true,
    },
  ];
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  async redirects() {
    return [
      ...canonicalHostRedirects(),
      ...LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
