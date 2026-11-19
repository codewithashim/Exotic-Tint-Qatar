import { ALL_SERVICES, ServicesHubPage } from '@/features/services';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  breadcrumbTrail,
  collectionPageSchema,
  jsonLdGraph,
} from '@/lib/seo/structured-data';

const TITLE = 'Window Tinting & Protection Services in Qatar';
const DESCRIPTION =
  'Sun control window film, surface protection film, frosted & decorative film, fabric nano coating, wallpaper, smart film and safety & security film in Qatar.';

export const metadata = buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: ROUTES.services });

export default function Page() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          collectionPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: ROUTES.services,
            items: ALL_SERVICES.map((s) => ({ name: s.title, path: ROUTES.service(s.slug) })),
          }),
          breadcrumbSchema(breadcrumbTrail({ name: 'Services', path: ROUTES.services }))
        )}
      />
      <ServicesHubPage />
    </>
  );
}
