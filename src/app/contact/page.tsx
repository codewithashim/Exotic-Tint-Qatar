import type { Metadata } from 'next';
import { ContactPage } from '@/features/contact';

export const metadata: Metadata = {
  title: 'Contact & Booking',
  description:
    'Book window tinting or surface protection in under 60 seconds. Mobile home service and studio installation across Qatar, open 7 days.',
};

export default function Page() {
  return <ContactPage />;
}
