import type { Metadata } from 'next';
import { BlogPage } from '@/features/blogs';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Expert guides on window tinting, heat rejection and surface protection in Qatar.',
};

export default function Page() {
  return <BlogPage />;
}
