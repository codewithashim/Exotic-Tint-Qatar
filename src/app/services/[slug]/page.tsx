import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ALL_SERVICES, ServiceDetailPage, getServiceBySlug } from '@/features/services';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.desc,
    openGraph: { title: service.title, description: service.desc, images: [service.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!getServiceBySlug(slug)) notFound();
  // `key` resets simulator/estimator/booking state when switching services.
  return <ServiceDetailPage key={slug} slug={slug} />;
}
