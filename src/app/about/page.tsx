import type { Metadata } from 'next';
import { AboutPage } from '@/features/about';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    "Meet Qatar's window tint and surface protection specialists — mobile and studio installation across Doha, Lusail, The Pearl, Al Rayyan and Wakra.",
};

export default function Page() {
  return <AboutPage />;
}
