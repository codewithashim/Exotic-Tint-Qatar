# SEO Implementation Plan

Based on [SEO_AUDIT.md](SEO_AUDIT.md). Each step ends with `tsc`, `next build` and the SEO validation script.

## Architectural decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Production URL source | New `SITE_URL` env var → falls back to `APP_URL` → `https://exotictintqatar.com`. Invalid values are ignored instead of crashing the build. | The hosting platform may inject `APP_URL` with an internal host. SEO URLs must not depend on where the server runs. |
| Canonical policy | Absolute `https://<host><path>`, no trailing slash (Next default `trailingSlash: false`), no query string. Home = `https://<host>`. | One URL per page. No current query parameter changes server-rendered content. |
| Staging / preview | `SEO_NOINDEX=true` → `robots.txt` disallows everything and every page gets `noindex, nofollow`. Default is indexable. | Defaulting to noindex risks de-indexing production if the variable is forgotten. |
| Host redirect | `next.config.ts` redirects the `www.`/apex twin of `SITE_URL` to `SITE_URL` (308). Only matches that one exact host. | Removes host duplicates without touching Cloud Run / preview hosts. |
| Internal links | Shared `<SiteLink>` client component: `next/link` + `scroll={false}` + smooth scroll-to-top in `onNavigate` (exactly what `useSiteNavigation().navigate` does today). Same classes as the current buttons. | Crawlable `<a href>` with zero visual or behavioural change; also enables middle-click / open-in-new-tab. |
| Structured data | `LocalBusiness` (+ `WebSite`) rendered once in the root layout with stable `@id`s; page schemas reference them by `@id`. | Avoids duplicate entities. Only facts already in `SITE_CONFIG` / content data are used. |
| FAQ markup | **Not added.** | Google limits FAQ rich results to authoritative government/health sites since 2023. |
| Reviews / ratings / prices | **Not added.** | No verifiable source; Google disallows self-serving LocalBusiness review markup. |
| hreflang | **Not added.** | No Arabic URLs or content exist. |
| OG image | One static 1200×630 PNG (`public/og/default.png`) as fallback; service/blog pages use their own image. | Dynamic `opengraph-image.tsx` adds runtime cost with no benefit for 14 static pages. |
| Tests | No new dependencies. `node --test` (Node 23 strips TS natively) for utilities; `scripts/validate-seo.mjs` checks the built HTML. | Rule: no unnecessary dependencies. |
| `next/image` migration | **Not done** in this pass. Native `<img>` with correct hints instead. | Images are already compressed WebP of 40–210 KB; switching 30+ call sites inside interactive client components carries layout-regression risk for a modest gain. Documented as a follow-up. |

## Steps

1. **SEO core** — `src/lib/seo/{site-url,canonical,metadata,structured-data}.ts`, `src/components/seo/JsonLd.tsx`. `SITE_CONFIG.url` uses the new resolver.
2. **Root metadata** — `metadataBase`, title template, defaults for OG/Twitter (with image), robots, icons, manifest, `viewport.themeColor`, `applicationName`, `category`, `formatDetection`.
3. **Page metadata** — every `page.tsx` uses `buildPageMetadata({ title, description, path, image })`. Dynamic routes use it in `generateMetadata` and return `noindex` for a missing slug.
4. **sitemap.ts / robots.ts / manifest.ts**.
5. **Structured data** — layout (LocalBusiness + WebSite), service pages (Service + BreadcrumbList), blog pages (BlogPosting + BreadcrumbList), hubs (BreadcrumbList / CollectionPage).
6. **Crawlable links** — header logo, desktop nav, mega menu, mobile drawer, footer, home service cards, services hub cards, other-services strip, blog cards / featured / related posts, sub-header breadcrumbs.
7. **Performance** — `next/font`, image hints on LCP and below-the-fold images, remove font `<link>` preconnects.
8. **Host redirect** in `next.config.ts`.
9. **Validation** — unit tests, `scripts/validate-seo.mjs`, `tsc`, ESLint, `next build`, Lighthouse.
10. **Docs** — implementation report and validation checklist; README env table updated.
