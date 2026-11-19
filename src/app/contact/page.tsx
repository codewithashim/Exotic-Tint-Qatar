import { ContactPage } from '@/features/contact';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, breadcrumbTrail, jsonLdGraph } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata({
  title: 'Contact & Book Window Tinting in Doha',
  description:
    'Book window tinting or surface protection in under 60 seconds. Mobile home service and studio installation across Qatar, open 7 days.',
  path: ROUTES.contact,
});

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbTrail({ name: 'Contact', path: ROUTES.contact })))} />
      <ContactPage />
    </>
  );
}
