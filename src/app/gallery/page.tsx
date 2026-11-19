import { GalleryPage } from '@/features/gallery';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema, breadcrumbTrail, jsonLdGraph } from '@/lib/seo/structured-data';

export const metadata = buildPageMetadata({
  title: 'Window Tinting Project Gallery – Before & After',
  description:
    'Before/after photos and videos of villa and office sun control film, frosted glass, safety film, marble protection and sofa nano coating projects in Qatar.',
  path: ROUTES.gallery,
});

export default function Page() {
  return (
    <>
      <JsonLd data={jsonLdGraph(breadcrumbSchema(breadcrumbTrail({ name: 'Gallery', path: ROUTES.gallery })))} />
      <GalleryPage />
    </>
  );
}
