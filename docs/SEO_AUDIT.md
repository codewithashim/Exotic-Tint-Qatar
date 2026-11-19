# SEO Audit — Exotic Tint Qatar

Audit date: 2026-11-20 · Branch: `production` · Baseline commit: `4f03603`

## 1. Current architecture

| Item | Finding |
| --- | --- |
| Framework | Next.js **16.4.6** (App Router, Turbopack), React 19.3, TypeScript 5.9 (strict), Tailwind 4 |
| Rendering | Every route is statically pre-rendered (`○` / `●` SSG). `dynamicParams = false` on both dynamic routes, so unknown slugs return a real 404. |
| Content source | **No database or CMS.** Content is static TypeScript data in `src/features/*/data/*.ts` (6 services, 6 blog posts, gallery, testimonials, reels). |
| Auth / private areas | None. No admin, dashboard, auth, API routes, middleware or `proxy.ts`. |
| Deployment | `output: 'standalone'` Node server. `.env.example` mentions Google AI Studio / Cloud Run injecting `APP_URL`. `firebase-tools` is a dev dependency. |
| Components | Page shells and almost all sections are Client Components (`'use client'`), but they are still server-rendered to HTML at build time — body content, headings and image alts are present in the static HTML. |
| Images | 6 WebP service images (40–210 KB, 1000–1536 px) reused across the site; 1 PNG logo (90×90); 1 hero MP4 (2.5 MB). All rendered with plain `<img>`. |
| Fonts | Google Fonts loaded through a render-blocking `<link rel="stylesheet">` in `<head>` (3 families). |
| i18n | An EN/AR toggle exists but only flips `dir="rtl"`; there is **no Arabic content and no Arabic URL**. |

### Route inventory and classification

| Route | Type | Class |
| --- | --- | --- |
| `/` | static | A — indexable |
| `/about` | static | A — indexable |
| `/services` | static | A — indexable |
| `/services/[slug]` (6) | SSG from `ALL_SERVICES` | A + D — indexable, needs dynamic metadata |
| `/gallery` | static | A — indexable |
| `/blogs` | static (client-side `?category=` filter + search) | A — indexable; `?category=` variants are duplicates → canonicalise to `/blogs` |
| `/blogs/[slug]` (6) | SSG from `BLOG_POSTS` | A + D — indexable, needs dynamic metadata |
| `/contact` | static | A — indexable |
| `/_not-found`, unknown slugs | 404 | B — non-indexable |
| `/icon.png` | metadata asset | not a page |

There are no C-class (private/authenticated) routes.

## 2. Existing SEO implementation

- Root `layout.tsx`: `metadataBase`, title default + template, description, a basic `openGraph` and `twitter` block.
- Static pages export `title` + `description`.
- Dynamic routes use `generateMetadata` (title, description, OG image).
- `app/icon.png` favicon (90×90).
- One H1 per page, all headings server-rendered.
- All images have `alt` text.

## 3. Problems found

### Critical

| # | Problem | Evidence | Impact |
| --- | --- | --- | --- |
| C1 | **No crawlable internal links.** Header nav, mega-menu, mobile drawer, footer, service cards, blog cards, breadcrumbs and "related" links are all `<button onClick={router.push}>`. The whole site has one `<Link>` (on the 404 page). | Built HTML: 0–1 `<a href="/…">` per page (the only one is `/#booking`). | Crawlers do not click buttons. Every page except `/` is effectively an **orphan**: it can only be discovered through a sitemap — and there is no sitemap. No link equity flows to service or blog pages. |
| C2 | **No `sitemap.xml`.** | `/sitemap.xml` → 404 | Combined with C1, Google has no reliable way to discover inner pages. |
| C3 | **No `robots.txt`.** | `/robots.txt` → 404 | No sitemap reference; no crawler policy. |
| C4 | **No canonical URLs on any page.** | No `<link rel="canonical">` in built HTML | `/blogs?category=…`, `www` vs apex, Cloud Run / preview hosts and trailing-slash variants can all be indexed as duplicates. |
| C5 | **Canonical host depends on `APP_URL`, which the hosting platform may overwrite with the Cloud Run URL**, and `new URL(process.env.APP_URL)` throws if the value is not a URL (e.g. the `.env.example` placeholder `MY_APP_URL` breaks the build). | `src/config/site.ts`, `src/app/layout.tsx`, `.env.example` | Wrong canonical / OG host in production, or a failed build. |

### High

| # | Problem | Impact |
| --- | --- | --- |
| H1 | **Wrong Open Graph data on static pages.** `/about`, `/services`, `/gallery`, `/blogs`, `/contact` inherit the root `openGraph`, so every share shows the *home page* title and description. | Misleading social previews; duplicate OG titles. |
| H2 | No `og:image` on the home page or any static page; no `og:url`, `og:site_name`, `og:locale` anywhere. Dynamic pages set `openGraph` which *replaces* (shallow merge) the root block, dropping `siteName`/`type`. Twitter cards have no image on any page. | Poor or broken social previews. |
| H3 | **No structured data** (no Organization/LocalBusiness, WebSite, BreadcrumbList, Service or BlogPosting). | No eligibility for site name, breadcrumbs or article rich results; weaker entity understanding for a local business. |
| H4 | Generic / short titles on hubs (`Services`, `Blog`, `Work Gallery`) — no service or location terms. | Weak relevance signals for the main hub pages. |

### Medium

| # | Problem | Impact |
| --- | --- | --- |
| M1 | Google Fonts loaded via render-blocking third-party stylesheet (2 extra origins). | Slower FCP/LCP; font swap can cause CLS. `next/font` self-hosts and preloads. |
| M2 | No image `width`/`height`, no `loading="lazy"` on below-the-fold card images (only 6–9 lazy images on home/gallery), no `fetchpriority` on LCP images. | Extra bytes on first load, weaker LCP. |
| M3 | No web app manifest, no apple-touch-icon, no `theme-color`. | Minor; affects mobile/Bing presentation. |
| M4 | Footer social links point to `https://instagram.com` / `https://tiktok.com` (placeholders, not the business profiles). | Cannot be used as `sameAs` in schema; poor UX. |
| M5 | Blog dates are free text (`'March 2026'`), not machine-readable; no `<time>` element. | Article dates cannot be emitted precisely. |
| M6 | No `www` → apex redirect policy in the app. | Duplicate host risk if DNS serves both. |

### Low

| # | Problem |
| --- | --- |
| L1 | EN/AR toggle switches the page to RTL while the text stays English. No hreflang should be added until real Arabic URLs exist. |
| L2 | Several image alts are keyword-heavy (e.g. "Automotive Window Tinting – Car window tinting Qatar"). Not harmful; leave as content decision. |
| L3 | Testimonial and gallery client names look illustrative. They must **not** be used for `Review` / `AggregateRating` schema. |
| L4 | 4 pre-existing ESLint errors (`react-hooks/set-state-in-effect` in gallery files). Not SEO-related; `next build` passes. |
| L5 | Unused `@google/genai` dependency (README already notes this). Not shipped to the client, so no bundle impact. |
| L6 | Hero MP4 is 2.5 MB and autoplays. Poster image is the LCP candidate; video size affects data use, not LCP directly. |

## 4. Duplicate content risks

- `/blogs?category=<x>` — same HTML as `/blogs` (filter is client-side) → canonical to `/blogs`.
- `www.` vs apex, `http` vs `https` → host-level redirect + canonical.
- Platform hosts (`*.run.app`, `*.web.app`, preview URLs) → canonical always points to the configured production URL; non-production deployments can be set to `noindex`.
- `/services/[slug]` and `/blogs/[slug]` with `dynamicParams = false` → no duplicate or soft-404 risk.

## 5. Recommended improvements (summary)

1. Replace navigation buttons with real `<Link href>` elements (keeping identical styling and the existing smooth-scroll/menu-close behaviour).
2. Centralised SEO module: site URL resolution, canonical builder, metadata builder, JSON-LD builders.
3. `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
4. Per-page canonical + complete OG/Twitter metadata with a 1200×630 default share image.
5. JSON-LD: `LocalBusiness` + `WebSite` (site-wide), `BreadcrumbList` (inner pages), `Service` (service pages), `BlogPosting` (articles). No FAQ, Review or Offer markup.
6. `next/font` for the three font families.
7. Image loading hints (`fetchpriority`, `loading="lazy"`, `decoding`, intrinsic dimensions) on the important images.
8. Automated post-build SEO validation script + unit tests for the SEO utilities.
