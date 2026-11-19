import { AboutPage } from '@/features/about';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, breadcrumbTrail, jsonLdGraph } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata({
  title: 'About Us – Window Tint Specialists in Doha',
  description:
    "Meet Qatar's window tint and surface protection specialists — mobile and studio installation across Doha, Lusail, The Pearl, Al Rayyan and Wakra.",
  path: ROUTES.about,
});

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbTrail({ name: 'About Us', path: ROUTES.about })))} />
      <AboutPage />
    </>
  );
}
