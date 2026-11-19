import type { Metadata } from 'next';
import { GalleryPage } from '@/features/gallery';

export const metadata: Metadata = {
  title: 'Work Gallery',
  description:
    'Before/after photos and videos of car tinting, villa and office solar film, frosted glass, marble protection and sofa nano coating projects in Qatar.',
};

export default function Page() {
  return <GalleryPage />;
}
