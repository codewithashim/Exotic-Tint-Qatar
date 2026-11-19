# SEO Implementation Report — Exotic Tint Qatar

Date: 2026-11-20 · Next.js 16.4.6 (App Router) · Baseline: commit `4f03603`

See [SEO_AUDIT.md](SEO_AUDIT.md) for the full findings and [SEO_IMPLEMENTATION_PLAN.md](SEO_IMPLEMENTATION_PLAN.md)
for the decisions. Pre-deploy steps: [SEO_VALIDATION_CHECKLIST.md](SEO_VALIDATION_CHECKLIST.md).

## 1. Initial problems (summary)

| Priority | Problem | Status |
| --- | --- | --- |
| Critical | No crawlable internal links — all navigation was `<button onClick={router.push}>`; every inner page was an orphan | **Fixed** |
| Critical | No `sitemap.xml` | **Fixed** |
| Critical | No `robots.txt` | **Fixed** |
| Critical | No canonical URLs | **Fixed** |
| Critical | Canonical host tied to `APP_URL` (may be the Cloud Run URL; invalid value crashed the build) | **Fixed** |
| High | Static pages shared the home page's Open Graph title/description | **Fixed** |
| High | No `og:image` / `og:url` / `twitter:image` on most pages | **Fixed** |
| High | No structured data | **Fixed** |
| High | Generic hub titles ("Services", "Blog") | **Fixed** |
| Medium | Render-blocking Google Fonts stylesheet | **Fixed** (`next/font`) |
| Medium | No image priority / lazy-loading hints | **Fixed** on key images |
| Medium | No manifest / theme colour | **Fixed** |
| Medium | Placeholder social links (`https://instagram.com`) | Excluded from schema; **needs real URLs** |
| Medium | Blog dates not machine-readable | **Fixed** (month precision; optional exact date field) |
| Medium | No www/apex policy | **Fixed** (308 redirect) |
| Medium | 90×90 px logo (below Google's 112 px logo minimum; no proper favicons/manifest icons) | **Fixed** — new brand logo, see §4a |
| Low | Lint errors in gallery, long article titles, AR toggle without content | Documented in §13 |

## 2. Implemented features

- Centralised SEO module (`src/lib/seo/`) with environment-aware production URL.
- Per-page metadata for all 18 indexable URLs: unique title, unique description (≤ 160 chars),
  absolute canonical, full Open Graph + Twitter card with image and dimensions, robots.
- `notFound` / unknown slugs: real HTTP 404 + single `noindex` robots tag.
- `app/sitemap.ts` (18 URLs, image sitemap entries, real `lastmod` for posts only),
  `app/robots.ts`, `app/manifest.ts`.
- JSON-LD: `LocalBusiness` + `WebSite` (site-wide), `BreadcrumbList` (all inner pages),
  `CollectionPage`/`ItemList` (services hub, blog hub), `Service` (6), `BlogPosting` (6).
- ~40 navigation buttons converted to real links via `<SiteLink>` (header, mega menu, mobile
  drawer, footer, home service cards, services hub, service sub-header, blog cards, featured
  guide, article breadcrumbs, related posts, related services). Same classes, same behaviour.
- Staging switch `SEO_NOINDEX=true` (robots disallow + `noindex` everywhere + empty sitemap).
- `www` ↔ apex 308 redirect to the configured host.
- Self-hosted fonts (`next/font`), LCP image priority hints, lazy-loading for below-the-fold
  card images, hero poster preload, 1200×630 default share image (93 KB).
- Unit tests (20) and an end-to-end validator script (no new dependencies).

## 3. Files created

| File | Purpose |
| --- | --- |
| `src/lib/seo/site-url.ts` | `SITE_URL` → `APP_URL` → default resolution, validation, `SEO_NOINDEX` |
| `src/lib/seo/canonical.ts` | `normalizePath`, `absoluteUrl`, `absoluteAssetUrl` |
| `src/lib/seo/config.ts` | `SEO_CONFIG` (title template, limits, default image, locale), verified social profiles |
| `src/lib/seo/metadata.ts` | `buildPageMetadata()`, `resolveRobots()`, `notFoundMetadata()` |
| `src/lib/seo/structured-data.ts` | Schema.org builders |
| `src/lib/seo/json-ld.ts` | `serializeJsonLd()` — script-safe JSON |
| `src/lib/seo/text.ts` | `toIsoDate()`, `truncateText()` |
| `src/lib/seo/sitemap.ts` | `getSitemapEntries()` |
| `src/components/seo/JsonLd.tsx` | JSON-LD `<script>` Server Component |
| `src/components/ui/SiteLink.tsx` | Crawlable internal link with the site's navigation behaviour |
| `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts` | Metadata routes |
| `public/og/default.jpg` | 1200×630 default share image |
| `tests/seo-utils.test.ts` | Unit tests (`npm test`) |
| `scripts/validate-seo.mjs` | End-to-end validator (`npm run seo:validate`) |
| `docs/SEO_*.md` | Audit, plan, this report, checklist |

## 4. Files modified

| File | Change |
| --- | --- |
| `src/app/layout.tsx` | Full root metadata, `viewport`, `next/font`, site-wide JSON-LD; removed Google Fonts `<link>` |
| `src/app/globals.css` | Font CSS variables point to `next/font` variables |
| `src/app/page.tsx`, `about`, `contact`, `gallery`, `services`, `blogs` pages | `buildPageMetadata()` + breadcrumb / collection JSON-LD |
| `src/app/services/[slug]/page.tsx`, `src/app/blogs/[slug]/page.tsx` | `generateMetadata` via builder, `notFoundMetadata()`, Service / BlogPosting JSON-LD |
| `src/app/not-found.tsx` | Explicit `noindex` metadata (removed duplicate robots tag) |
| `src/config/site.ts` | `url` uses `SITE_URL`; machine-readable opening hours |
| `src/config/assets.ts` | `og.default` asset; `ASSET_DIMENSIONS` |
| `src/features/blogs/data/blogs-data.ts` | Optional `publishedAt` field (type only — no content changed) |
| `next.config.ts` | Canonical-host redirect |
| Header: `SiteHeader`, `DesktopNav`, `ServicesMegaMenu`, `MobileNavDrawer`; `SiteFooter` | Buttons → `<SiteLink>`; props simplified to a single `onNavigate` (close menus) |
| `ServicesBentoSection`, `HeroSection`, `ServicesCatalogGrid`, `ServicesHubSubHeader`, `ServiceDetailSubHeader`, `OtherServicesStrip`, `BlogPage`, `BlogSubHeader`, `BlogArticleReader`, `BlogPostGrid`, `BlogFeaturedGuide` | Links and image hints |
| `GallerySpotlightHero`, `ServiceHeroSimulator` | `fetchPriority="high"` on the LCP image |
| `package.json` | `test` and `seo:validate` scripts (no dependencies added) |
| `.env.example`, `README.md`, `ARCHITECTURE.md` | `SITE_URL` / `SEO_NOINDEX`, conventions |

UI copy changes: page `<title>`s for the hub pages only (see §6). No visible text, layout or
styling was changed.

## 4a. Brand logo and icons

Generated from the supplied transparent logo (no upscaling beyond the 570 px source):

| File | Size | Used for |
| --- | --- | --- |
| `public/brand/logo.webp` | 320², transparent | Full logo in large UI spots (About page card) |
| `public/brand/logo-mark.webp` | 256², transparent | Icon mark (buildings + roofs, no lettering): header lockup, footer, small avatars |
| `public/brand/logo.png` | 512² | `LocalBusiness.logo` in structured data (meets Google's ≥ 112 px rule) |
| `src/app/favicon.ico` | 16/32/48 | Favicon (icon mark) |
| `src/app/icon.png` | 192² | `<link rel="icon">` (icon mark) |
| `src/app/apple-icon.png` | 180², white | iOS home screen (full logo) |
| `public/brand/icons/icon-192.png`, `icon-512.png`, `maskable-512.png` | | Web app manifest |
| `public/og/default.jpg` | 1200×630 | Default share image (regenerated with the new mark) |

The full logo's lettering is unreadable below ~80 px and repeats the "Exotic Tint Qatar" text
beside it in the header, so small placements use the icon mark. Favicons rely on Next's file
conventions; `metadata.icons` is intentionally not set (setting it suppresses those links).

## 5. Architecture

```
SITE_URL / APP_URL / SEO_NOINDEX (build env)
        │
  lib/seo/site-url.ts ──► config/site.ts (SITE_CONFIG.url)
        │
  lib/seo/canonical.ts ── absoluteUrl(path), absoluteAssetUrl(src)
        │
  lib/seo/config.ts ───── SEO_CONFIG (+ business facts from SITE_CONFIG)
        │
        ├── lib/seo/metadata.ts ──────── buildPageMetadata() ──► app/**/page.tsx (metadata / generateMetadata)
        ├── lib/seo/structured-data.ts ─ schema builders ──────► components/seo/JsonLd ──► layout + pages
        └── lib/seo/sitemap.ts ───────── getSitemapEntries() ──► app/sitemap.ts
                                                                  app/robots.ts, app/manifest.ts
```

- Content (services, posts) stays in the existing `features/*/data` files; SEO reads from it, so
  metadata, rendered content and schema can never drift apart.
- `site-url.ts`, `canonical.ts`, `json-ld.ts` and `text.ts` have no `@/` imports, so Node can
  test them directly.

## 6. Metadata details

- Root layout: `metadataBase`, title default + template `%s | Exotic Tint Qatar`, description,
  `applicationName`, `authors`/`creator`/`publisher`, `category`, robots (`max-image-preview:large`),
  `formatDetection`, icons, manifest (automatic), default OG/Twitter with image;
  `viewport.themeColor` + `colorScheme`.
- `buildPageMetadata()` always emits a **complete** `openGraph` and `twitter` object, because
  Next.js merges metadata shallowly (a page's `openGraph` replaces the layout's entirely).
- Titles longer than 70 characters (with suffix) are emitted without the `| Exotic Tint Qatar`
  suffix. Descriptions are trimmed to 160 characters on a word boundary.
- Service pages use `seoHeadline` as the title (it is the page's H1). Blog pages use the post
  title (its H1).
- New titles for hub pages: About → "About Us – Window Tint Specialists in Doha"; Services →
  "Window Tinting & Protection Services in Qatar"; Gallery → "Window Tinting Project Gallery –
  Before & After"; Blog → "Window Tinting & Heat Protection Blog"; Contact → "Contact & Book
  Window Tinting in Doha". The blog hub description was expanded slightly; other descriptions are unchanged.

## 7. Dynamic SEO

The site has no database: services and posts are static TypeScript data. Both dynamic routes use
`generateStaticParams` + `dynamicParams = false`, so only known slugs exist and anything else is a
real 404 (verified). `generateMetadata` and the page call the same synchronous getter, so no
duplicate data fetching occurs. There is no draft/unpublished concept in the data; if one is added,
filter it in `generateStaticParams`, `getSitemapEntries()` and pass `noindex: true`.

## 8. Sitemap and robots

- `/sitemap.xml`: 6 static pages, 6 services, 6 posts; absolute canonical URLs; one image per
  service/post; `lastmod` only for posts (from their publish month). Static pages have no tracked
  edit date, so `lastmod` is omitted instead of faked. No `priority`/`changefreq` (ignored by Google).
  Under 50,000 URLs, so no sitemap index.
- `/robots.txt`: `Allow: /` + `Sitemap:`. Nothing blocked (the site has no private areas;
  `/_next/` must stay crawlable for rendering).

## 9. Structured data

| Page | Types |
| --- | --- |
| Every page | `LocalBusiness` (`#business`) + `WebSite` (`#website`) |
| `/about`, `/contact`, `/gallery` | `BreadcrumbList` |
| `/services`, `/blogs` | `CollectionPage` + `ItemList`, `BreadcrumbList` |
| `/services/[slug]` | `Service` (provider → `#business`), `BreadcrumbList` |
| `/blogs/[slug]` | `BlogPosting` (publisher → `#business`, about → service), `BreadcrumbList` |

Only facts in the codebase are used: name, description, phone, hours (8:00–18:00, 7 days), Doha/QA,
service areas, logo, images, post dates (month), author team names. **Not emitted** (no verified
source): street address, geo coordinates, ratings, reviews, prices, offers, `sameAs`.
`FAQPage` is not used (Google limits FAQ rich results to government/health sites).
All JSON-LD is serialised with `<`, `>`, `&`, U+2028/9 escaped.

## 10. Performance

Changes: `next/font` self-hosting (removes a render-blocking third-party stylesheet and two
origins), mono font not preloaded, `fetchPriority="high"` on the service-page, article and gallery
LCP images, hero poster preload, `loading="lazy"`/`decoding="async"` on below-the-fold card images
and footer logo, links prefetch on hover/focus/touch instead of on viewport (viewport prefetch of
~14 routes measurably increased TBT during load).

**Lighthouse 12, mobile, simulated throttling, local production server — median of 3 runs.**
Baseline = original commit `4f03603` built and measured on the same machine in the same session.

| Page | Version | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | baseline | 81 | 96 | 100 | 100 | 1.7 s | 4.6 s | 155 ms | 0 |
| `/` | new | 84 | 96 | 100 | 100 | 1.3 s | 3.8 s | 335 ms | 0 |
| `/services/automotive-window-tinting` | baseline | 83 | 100 | 100 | 100 | 1.6 s | 4.4 s | 120 ms | 0 |
| `/services/automotive-window-tinting` | new | 86 | 100 | 100 | 100 | 1.3 s | 4.0 s | 144 ms | 0 |
| `/blogs/best-car-window-tinting-…` | baseline | 88 | 100 | 100 | 100 | 1.6 s | 3.6 s | 121 ms | 0 |
| `/blogs/best-car-window-tinting-…` | new | 88 | 100 | 100 | 100 | 1.1 s | 3.8 s | 90 ms | 0 |
| `/gallery` | baseline | 79 | 96 | 96 | 100 | 2.8 s | 4.2 s | 155 ms | 0 |
| `/gallery` | new | 77 | 96 | 96 | 100 | 1.2 s | 4.9 s | 254 ms | 0 |

Reading the numbers honestly:

- **FCP improved on every page** (fonts) and CLS stays 0.
- **LCP improved on `/` and service pages**, is roughly flat on the blog post, and is **worse on
  `/gallery`** (4.2 → 4.9 s). On the gallery ~75 % of LCP is render delay from client-side
  JavaScript (pre-existing). The added part is load delay: self-hosted fonts now download early and
  compete with the spotlight image. Not resolved in this pass.
- TBT varies a lot between runs on this machine (the *same* baseline build measured 116–388 ms on
  one page), so differences under ~150 ms are not meaningful.
- These are lab numbers on a local server. Real-user Core Web Vitals (CrUX / Search Console) were
  **not available**. The site has no field data yet.
- Gallery Best Practices 96 is pre-existing (same in baseline).

## 11. Tests executed

| Check | Result |
| --- | --- |
| `npx tsc --noEmit` | Pass |
| `npm run lint` | 4 errors, 34 warnings — **identical to baseline** (pre-existing; no new issues) |
| `npm test` | 20 / 20 pass |
| `npm run build` | Pass — 24 static routes incl. `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` |
| `npm run seo:validate` (production server) | **0 errors**; 7 warnings (titles > 70 chars, see §13) |
| `SEO_NOINDEX=true` build | robots `Disallow: /`, empty sitemap, `noindex, nofollow` on pages — verified |
| `SITE_URL=https://staging.example.com` build | canonicals use that host — verified |
| Host redirect | `Host: www.exotictintqatar.com` → 308 to apex; apex and `*.run.app` → 200 — verified |
| 404s | `/services/x`, `/blogs/x`, `/x` → 404 with single `noindex` — verified |

## 12. Validation results

- 18 / 18 sitemap URLs: 200, one canonical (= sitemap URL), unique title and description, complete
  OG/Twitter, exactly one H1, valid JSON-LD, all images with `alt`, no broken links or images,
  no orphan pages.
- Internal links per page: from **0–1** (baseline) to **12–15** unique crawlable targets.
- Lighthouse SEO: **100** on all tested pages (see §10).

## 13. Remaining issues / recommendations

| Priority | Item | Owner |
| --- | --- | --- |
| High | Set `SITE_URL` in the production **build** environment and confirm the preferred host (apex vs `www`). | Deploy |
| High | Replace `SITE_CONFIG.socials` placeholders with the real Instagram/TikTok profile URLs (then they appear in schema `sameAs` automatically). | Business |
| Medium | Add the studio's street address (if customers may visit) to `localBusinessSchema()` — required for Google local business rich results. Also create/verify a Google Business Profile. | Business |
| Medium | Blog `<title>`s are 74–87 chars (they equal the H1). Consider an optional `seoTitle` ≤ 60 chars per post. | Content |
| Medium | Add exact `publishedAt: 'YYYY-MM-DD'` dates to posts. | Content |
| Medium | `/gallery` LCP regressed 4.2 → 4.9 s (lab). Try `preload: false` on the display font for that route or a server-rendered spotlight image. | Dev |
| Medium | Performance: most LCP time is render delay from client-side JavaScript — nearly every section is a Client Component that ships its data to the browser. Converting static sections (text, specs, FAQs) to Server Components is the biggest remaining CWV lever. | Dev |
| Low | Optional: migrate `<img>` to `next/image` for responsive `srcset` (biggest win: the 1536 px marble image on mobile). | Dev |
| Low | The EN/AR toggle switches to RTL with English text. Add hreflang only once real Arabic URLs exist (e.g. `/ar/...`). | Dev/Content |
| Low | 4 pre-existing ESLint errors (`react-hooks/set-state-in-effect`) in gallery components. | Dev |
| Low | Unused `@google/genai` dependency. | Dev |

## 14. Deployment

1. In the build environment set `SITE_URL=https://exotictintqatar.com` (or the confirmed host).
   Pages are pre-rendered, so changing it later requires a rebuild.
2. For staging/preview builds set `SEO_NOINDEX=true`.
3. Build and run as before (`npm run build`, standalone server — see README).
4. Ensure the platform redirects `http://` → `https://`. Point both apex and `www` DNS at the app
   if you want the built-in `www` → apex redirect to apply.
5. Run `npm run seo:validate` against the deployed URL:
   `SEO_BASE_URL=https://exotictintqatar.com npm run seo:validate`.

## 15. Google Search Console setup

No credentials were configured — these steps need the site owner's Google account.

1. Go to <https://search.google.com/search-console> → **Add property** → **Domain** →
   enter `exotictintqatar.com` → add the shown `TXT` record at the DNS provider → **Verify**.
   (Domain properties cover `www`, apex, `http` and `https`.)
   *Alternative:* URL-prefix property with an HTML meta tag — add
   `verification: { google: '<token>' }` to `metadata` in `src/app/layout.tsx`.
2. **Sitemaps** → submit `https://exotictintqatar.com/sitemap.xml`.
3. **URL Inspection** → inspect the home page, one service and one post → **Request indexing**.
4. After a few days check **Pages** (indexing report) for "Duplicate without user-selected canonical",
   "Crawled – currently not indexed" and 404s, and **Core Web Vitals** once field data is available.
5. Bing: <https://www.bing.com/webmasters> → **Import from Google Search Console** (or add the site
   and submit the same sitemap). Bing also uses `<meta name="msvalidate.01">` → `verification.other`.
6. Google Business Profile (separate from Search Console) is the main driver for local "near me"
   results — create/verify it with the same name, phone and hours as the website.

No indexing or ranking outcome is guaranteed by these changes; they remove technical barriers.
