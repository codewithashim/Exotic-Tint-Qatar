import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BLOG_POSTS, BlogPage, getBlogPostBySlug } from '@/features/blogs';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getBlogPostBySlug((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', images: [post.image] },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  if (!getBlogPostBySlug(slug)) notFound();
  return <BlogPage key={slug} slug={slug} />;
}
