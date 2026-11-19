import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import SiteShell from '@/components/layout/SiteShell';
import JsonLd from '@/components/seo/JsonLd';
import { absoluteAssetUrl } from '@/lib/seo/canonical';
import { SEO_CONFIG } from '@/lib/seo/config';
import { resolveRobots } from '@/lib/seo/metadata';
import { jsonLdGraph, localBusinessSchema, websiteSchema } from '@/lib/seo/structured-data';
import './globals.css';

// Self-hosted by next/font: no render-blocking third-party stylesheet, no layout shift on swap.
const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-bricolage',
});
const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
});
const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  // Only used for small labels — not preloaded so it doesn't compete with the LCP image/text.
  preload: false,
  variable: '--font-jetbrains',
});

const defaultImage = {
  url: absoluteAssetUrl(SEO_CONFIG.defaultImage.url) ?? SEO_CONFIG.defaultImage.url,
  width: SEO_CONFIG.defaultImage.width,
  height: SEO_CONFIG.defaultImage.height,
  alt: SEO_CONFIG.defaultImage.alt,
};

/**
 * Site-wide defaults. Every page overrides title/description/canonical/openGraph/twitter
 * through `buildPageMetadata()`; these values are the fallback.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  title: { default: SEO_CONFIG.defaultTitle, template: `%s${SEO_CONFIG.titleSuffix}` },
  description: SEO_CONFIG.defaultDescription,
  applicationName: SEO_CONFIG.siteName,
  authors: [{ name: SEO_CONFIG.siteName, url: SEO_CONFIG.siteUrl }],
  creator: SEO_CONFIG.siteName,
  publisher: SEO_CONFIG.siteName,
  category: 'Home & Commercial Services',
  robots: resolveRobots(),
  formatDetection: { telephone: false, email: false, address: false },
  // Icons come from file conventions: app/favicon.ico (16/32/48), app/icon.png (192),
  // app/apple-icon.png (180). Do not set `icons` here — it would suppress those links.
  openGraph: {
    type: 'website',
    siteName: SEO_CONFIG.siteName,
    locale: SEO_CONFIG.ogLocale,
    url: SEO_CONFIG.siteUrl,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.defaultDescription,
    images: [{ url: defaultImage.url, alt: defaultImage.alt }],
  },
};

export const viewport: Viewport = {
  themeColor: SEO_CONFIG.themeColor,
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={SEO_CONFIG.language}
      className={`dark scroll-smooth ${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#121118] text-[#f4f4f6] font-sans antialiased selection:bg-[#d9f941] selection:text-[#121118]"
      >
        <JsonLd data={jsonLdGraph(localBusinessSchema(), websiteSchema())} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
