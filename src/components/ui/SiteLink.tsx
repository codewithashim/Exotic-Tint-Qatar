'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

type SiteLinkProps = Omit<ComponentProps<typeof Link>, 'scroll' | 'href' | 'prefetch'> & {
  /** Internal path, e.g. ROUTES.service(slug). */
  href: string;
};

/**
 * Crawlable internal link (`<a href>`) with the site's navigation behaviour: client-side
 * transition, then a smooth scroll to the top — the same as `useSiteNavigation().navigate`.
 *
 * Use this instead of `<button onClick={navigate}>` for anything that leads to another page,
 * so search engines can discover and follow it. `onNavigate` only runs for in-app navigation
 * (not for ctrl/cmd-click or "open in new tab").
 *
 * Prefetching: Next's default viewport prefetch would fetch every page linked from the header,
 * footer and cards during page load (extra main-thread work → worse TBT/INP). Instead the route
 * is prefetched on intent — hover, keyboard focus or touch — which still makes navigation instant.
 */
export default function SiteLink({
  onNavigate,
  onMouseEnter,
  onFocus,
  onTouchStart,
  href,
  ...props
}: SiteLinkProps) {
  const router = useRouter();
  const prefetch = () => router.prefetch(href);

  return (
    <Link
      {...props}
      href={href}
      prefetch={false}
      scroll={false}
      onMouseEnter={(event) => {
        prefetch();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        prefetch();
        onFocus?.(event);
      }}
      onTouchStart={(event) => {
        prefetch();
        onTouchStart?.(event);
      }}
      onNavigate={(event) => {
        onNavigate?.(event);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
    />
  );
}
