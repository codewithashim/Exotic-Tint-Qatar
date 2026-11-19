import type { Metadata } from 'next';
import { ServicesHubPage } from '@/features/services';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Automotive, commercial and residential window tinting, custom frosted film, marble protection film and fabric nano coating in Qatar.',
};

export default function Page() {
  return <ServicesHubPage />;
}
