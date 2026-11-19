/** Every internal URL in the app. Use these instead of string literals. */
export const ROUTES = {
  home: '/',
  about: '/about',
  services: '/services',
  service: (slug: string) => `/services/${slug}`,
  gallery: '/gallery',
  blogs: '/blogs',
  blogPost: (slug: string) => `/blogs/${slug}`,
  contact: '/contact',
} as const;

/** In-page anchors on the home page. */
export const HOME_SECTIONS = {
  booking: 'booking',
  reviews: 'reviews',
  services: 'services',
  areas: 'areas',
} as const;

export type PageKey = 'home' | 'about' | 'services' | 'gallery' | 'blogs' | 'contact';

export interface NavItem {
  key: PageKey;
  label: string;
  href: string;
}

/** Primary site pages, in navigation order. */
export const PRIMARY_NAV: NavItem[] = [
  { key: 'home', label: 'Home', href: ROUTES.home },
  { key: 'about', label: 'About Us', href: ROUTES.about },
  { key: 'services', label: 'Services Hub', href: ROUTES.services },
  { key: 'gallery', label: 'Gallery', href: ROUTES.gallery },
  { key: 'blogs', label: 'Blogs', href: ROUTES.blogs },
  { key: 'contact', label: 'Contact', href: ROUTES.contact },
];

/** Resolves which primary page a pathname belongs to (service detail pages count as `services`). */
export function getActivePage(pathname: string): PageKey {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/') return 'home';
  const first = path.split('/')[1] as PageKey;
  return PRIMARY_NAV.some((item) => item.key === first) ? first : 'home';
}

/** Returns the service slug when on `/services/[slug]`, otherwise null. */
export function getActiveServiceSlug(pathname: string): string | null {
  return pathname.replace(/\/+$/, '').match(/^\/services\/([^/]+)$/)?.[1] ?? null;
}
