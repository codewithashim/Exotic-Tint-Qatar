'use client';

import { useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/config/routes';

/**
 * App-wide navigation actions. Components call this instead of receiving
 * `onBackHome` / `onSelectService` / ... callbacks through props.
 */
export function useSiteNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = useCallback(
    (href: string) => {
      router.push(href, { scroll: false });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [router]
  );

  /** Scrolls to a section on the home page, navigating there first if needed. */
  const goToHomeSection = useCallback(
    (sectionId: string) => {
      const scroll = () =>
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      if (pathname === ROUTES.home) {
        scroll();
        return;
      }
      router.push(`${ROUTES.home}#${sectionId}`, { scroll: false });
      setTimeout(scroll, 120);
    },
    [pathname, router]
  );

  return useMemo(
    () => ({
      navigate,
      goToHomeSection,
      goHome: () => navigate(ROUTES.home),
      openAbout: () => navigate(ROUTES.about),
      openServices: () => navigate(ROUTES.services),
      openService: (slug: string) => navigate(ROUTES.service(slug)),
      openGallery: () => navigate(ROUTES.gallery),
      openBlogs: () => navigate(ROUTES.blogs),
      openBlogPost: (slug: string) => navigate(ROUTES.blogPost(slug)),
      openContact: () => navigate(ROUTES.contact),
    }),
    [navigate, goToHomeSection]
  );
}
