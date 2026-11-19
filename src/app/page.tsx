import { HomePage } from '@/features/home';
import { ROUTES } from '@/config/routes';
import { SEO_CONFIG } from '@/lib/seo/config';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata = buildPageMetadata({
  title: SEO_CONFIG.defaultTitle,
  description: SEO_CONFIG.defaultDescription,
  path: ROUTES.home,
});

export default function Page() {
  return <HomePage />;
}
