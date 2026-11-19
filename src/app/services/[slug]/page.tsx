import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_SERVICES, ServiceDetailPage, getServiceBySlug } from '@/features/services';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata, notFoundMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  breadcrumbTrail,
  jsonLdGraph,
  serviceSchema,
} from '@/lib/seo/structured-data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only slugs from ALL_SERVICES exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return notFoundMetadata();
  return buildPageMetadata({
    // Matches the page's H1.
    title: service.seoHeadline,
    description: service.desc,
    path: ROUTES.service(service.slug),
    image: { url: service.image, alt: service.alt },
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          serviceSchema(service),
          breadcrumbSchema(
            breadcrumbTrail(
              { name: 'Services', path: ROUTES.services },
              { name: service.title, path: ROUTES.service(service.slug) }
            )
          )
        )}
      />
      {/* `key` resets simulator/estimator/booking state when switching services. */}
      <ServiceDetailPage key={slug} slug={slug} />
    </>
  );
}
