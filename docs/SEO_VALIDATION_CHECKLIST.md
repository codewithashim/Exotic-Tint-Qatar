# SEO Validation Checklist

Run before every production deploy. Items marked **auto** are covered by `npm test` or
`npm run seo:validate`; the rest are manual.

## 1. Build & code

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` — no new errors (4 pre-existing `react-hooks/set-state-in-effect` errors in `src/features/gallery/` are known)
- [ ] `npm test` — SEO utility unit tests pass (**auto**, Node ≥ 22.6)
- [ ] `npm run build` passes and lists `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`
- [ ] `SITE_URL` is set to the production origin in the **build** environment (pages are static, so it is read at build time)
- [ ] `SEO_NOINDEX` is **not** set for the production build (and **is** set for staging/preview builds)

## 2. Automated end-to-end check

```bash
npm run build && npm run start           # terminal 1
npm run seo:validate                     # terminal 2 (SEO_BASE_URL defaults to http://localhost:3000)
```

`scripts/validate-seo.mjs` checks (**auto**):

- [ ] `/robots.txt` 200, has a `Sitemap:` line on the sitemap's host, does not block `/_next`
- [ ] `/sitemap.xml` 200, valid `<urlset>`, no duplicate URLs, valid `lastmod` values
- [ ] Every sitemap URL returns 200
- [ ] Exactly one `<title>`, unique across the site
- [ ] Meta description present, ≤ 160 chars, unique across the site
- [ ] Exactly one robots meta tag; no `noindex` on indexable pages
- [ ] Exactly one canonical, equal to the sitemap URL
- [ ] `og:title`, `og:description`, `og:url` (= canonical), absolute `og:image`, `og:type`, `og:site_name`
- [ ] `twitter:card = summary_large_image` and `twitter:image`
- [ ] Exactly one non-empty `<h1>`; no empty headings
- [ ] Every JSON-LD block parses, uses `https://schema.org`, and contains no rating/review/offer/price
- [ ] Every `<img>` has an `alt` attribute
- [ ] Every image and `og:image` returns 200
- [ ] No orphan pages; no broken internal links
- [ ] `/services/<unknown>`, `/blogs/<unknown>` and `/<unknown>` return **404** with `noindex`
- [ ] `/blogs?category=…` canonicalises to `/blogs`
- [ ] `/manifest.webmanifest` returns 200

## 3. Manual checks (after deploy)

- [ ] `curl -sI https://www.<domain>/` → `308` to `https://<domain>/` (only if DNS serves `www`)
- [ ] `curl -sI http://<domain>/` → redirects to `https://` (hosting platform setting)
- [ ] [Rich Results Test](https://search.google.com/test/rich-results): one service URL, one blog URL — Breadcrumb and Article detected, no errors
- [ ] [Schema Markup Validator](https://validator.schema.org/): home page — LocalBusiness + WebSite, no errors
- [ ] Share preview: paste a service URL and the home URL into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) / LinkedIn Post Inspector
- [ ] Lighthouse (mobile) on `/`, one service page, one blog page — SEO = 100
- [ ] Search Console → URL Inspection → "Test live URL" on the home page, a service page and a blog post: page is indexable, canonical = user-declared canonical
- [ ] Search Console → Sitemaps: `sitemap.xml` status "Success", discovered URL count = 18 (or current total)

## 4. When content changes

| Change | Also do |
| --- | --- |
| New service in `services-data.ts` | Nothing — page, metadata, sitemap entry and Service schema are generated. Add its image size to `ASSET_DIMENSIONS`. |
| New blog post in `blogs-data.ts` | Same as above. Optionally set `publishedAt: 'YYYY-MM-DD'` for an exact date. |
| New static page under `src/app/` | Export `metadata = buildPageMetadata({...})`, add the route to `getSitemapEntries()` in `src/lib/seo/sitemap.ts`, link to it with `<SiteLink>`. |
| Replaced an image | Update its entry in `ASSET_DIMENSIONS` (`src/config/assets.ts`). |
| Real Instagram/TikTok profile URLs | Set them in `SITE_CONFIG.socials` — they are then emitted as `sameAs` automatically. |
| Street address available | Add `streetAddress`/`postalCode` to `localBusinessSchema()` in `src/lib/seo/structured-data.ts`. |
