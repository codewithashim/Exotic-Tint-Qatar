import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BlogPage, getBlogPostBySlug } from '@/features/blogs';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata, notFoundMetadata } from '@/lib/seo/metadata';
import {
  blogPostingSchema,
  breadcrumbSchema,
  breadcrumbTrail,
  jsonLdGraph,
} from '@/lib/seo/structured-data';
import { toIsoDate } from '@/lib/seo/text';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only slugs from BLOG_POSTS exist; anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug((await params).slug);
  if (!post) return notFoundMetadata();
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: ROUTES.blogPost(post.slug),
    image: { url: post.image, alt: post.alt },
    type: 'article',
    publishedTime: toIsoDate(post.publishedAt ?? post.publishDate),
    section: post.category,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          blogPostingSchema(post),
          breadcrumbSchema(
            breadcrumbTrail(
              { name: 'Blog', path: ROUTES.blogs },
              { name: post.title, path: ROUTES.blogPost(post.slug) }
            )
          )
        )}
      />
      <BlogPage key={slug} slug={slug} />
    </>
  );
}
