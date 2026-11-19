# Exotic Tint Qatar

Marketing and booking website for **Exotic Tint Qatar**: sun control window film (commercial &
residential), surface protection film, frosted & decorative film, fabric nano coating, wallpaper &
wall finishing, smart film and safety & security film in Doha, Qatar.

Built with **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript** and **Tailwind CSS 4**.
Every page is statically pre-rendered at build time.

## Pages

| Route | Content |
| --- | --- |
| `/` | Image hero, benefits, Instagram reels, service areas, 60-second booking form, services grid, reviews |
| `/about` | Company story, heat & ROI lab, dispatch zones, consultation form |
| `/services` | All services, solution matcher, comparison table, booking form |
| `/services/[slug]` | One page per service (7), with simulator, estimator, FAQ and booking form |
| `/gallery` | Before/after slider, filterable photo/video portfolio, lightbox |
| `/blogs`, `/blogs/[slug]` | Blog hub with category filter and search, plus one page per article (5) |
| `/contact` | Contact channels, full booking form, service areas, FAQ |

## Getting started

**Requirements:** Node.js 20.9 or newer, npm.

```bash
npm install
cp .env.example .env.local   # then edit the values (see below)
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Production build (type-checks and pre-renders all pages) |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Unit tests for the SEO utilities (Node ≥ 22.6) |
| `npm run seo:validate` | End-to-end SEO check against a running server (`npm run start` first) |

### Environment variables

| Variable | Used for |
| --- | --- |
| `SITE_URL` | The site's public production URL (e.g. `https://exotictintqatar.com`). Base for canonical URLs, Open Graph, `sitemap.xml`, `robots.txt` and structured data. **Read at build time.** |
| `SEO_NOINDEX` | Set to `true` on staging/preview builds: `robots.txt` disallows everything and every page is `noindex`. Leave unset in production. |
| `APP_URL` | Legacy fallback for `SITE_URL` (the hosting platform may set it to an internal URL — set `SITE_URL` instead). If neither is a valid URL, `https://exotictintqatar.com` is used. |
| `GEMINI_API_KEY` | Not used by the current code. It is left over from the Google AI Studio template, and so is the `@google/genai` dependency. |

## Project structure

All source code is in `src/`, and the `@/` import alias points there.

```
src/
  app/          Routes only: page metadata + render one feature page
  components/   Site-wide UI: header, mega menu, footer, mobile bar, brand logo
  config/       assets.ts, site.ts (phone, hours, socials, areas), routes.ts
  features/     One folder per feature: home, about, services, gallery, blogs, contact, booking
  hooks/        useSiteNavigation()
  lib/          Small utilities
public/         Static files: brand/, images/services/, videos/
```

Each feature folder has a page component (`HomePage.tsx`, `GalleryPage.tsx`, ...), its sections
in `components/`, its content in `data/`, and an `index.ts` that other code imports from.

See **[ARCHITECTURE.md](ARCHITECTURE.md)** for the full layout and the coding conventions, and
**[docs/](docs/)** for the SEO audit, implementation report and pre-deploy checklist.

## Common edits

| To change… | Edit |
| --- | --- |
| Phone number, WhatsApp, opening hours, social links | `src/config/site.ts` |
| Areas offered in booking forms | `BOOKING_AREAS` in `src/config/site.ts` |
| Services (text, specs, simulator, FAQ, images) | `src/features/services/data/services-data.ts` |
| Redirects for removed/renamed URLs | `src/config/legacy-redirects.ts` |
| Blog articles | `src/features/blogs/data/blogs-data.ts` |
| Gallery projects and before/after comparisons | `src/features/gallery/data/gallery-data.ts` |
| Client reviews | `src/features/home/data/testimonials.ts` |
| Instagram reels | `src/features/home/data/reels-data.ts` |
| Header / footer navigation | `src/config/routes.ts` and `src/components/layout/` |
| Page titles and descriptions (SEO) | `buildPageMetadata({...})` in each `src/app/**/page.tsx` — see [docs/SEO_IMPLEMENTATION_REPORT.md](docs/SEO_IMPLEMENTATION_REPORT.md) |
| SEO settings, structured data, sitemap | `src/lib/seo/` |

New services and blog posts get their own page automatically. Their URL comes from the `slug` field.

### Adding images and videos

1. Export images as **WebP** (about 1024px wide, quality around 80) and put them in
   `public/images/...`. Videos go in `public/videos/`.
2. Register the path in `src/config/assets.ts`.
3. Use it in code or data as `ASSETS.services.automotive` etc. Never hard-code `/images/...` strings.

## Booking forms

The booking forms validate the name and phone number and show a confirmation ticket.
**They do not send the request anywhere yet:** there is no backend, email or WhatsApp
integration. Customers can still reach the business through the call and WhatsApp buttons.

## Deployment

`next.config.ts` uses `output: 'standalone'`, so the build creates a self-contained Node server:

```bash
npm run build
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
node .next/standalone/server.js   # PORT=3000 by default
```

It also works on any platform that supports Next.js, such as Vercel, without changes.
