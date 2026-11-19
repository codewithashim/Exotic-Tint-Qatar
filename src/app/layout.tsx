import type { Metadata } from 'next';
import SiteShell from '@/components/layout/SiteShell';
import { SITE_CONFIG } from '@/config/site';
import './globals.css';

const DEFAULT_TITLE = `${SITE_CONFIG.name} | Nano-Ceramic Window Tinting & Surface Protection in Doha`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: { default: DEFAULT_TITLE, template: `%s | ${SITE_CONFIG.name}` },
  description: SITE_CONFIG.description,
  openGraph: { title: DEFAULT_TITLE, description: SITE_CONFIG.description, type: 'website' },
  twitter: { card: 'summary_large_image', title: DEFAULT_TITLE, description: SITE_CONFIG.description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#121118] text-[#f4f4f6] font-sans antialiased selection:bg-[#d9f941] selection:text-[#121118]"
      >
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
