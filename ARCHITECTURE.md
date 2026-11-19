# Architecture

Next.js App Router site, organised by **feature**. Routes are thin; each feature owns its
page, sections, data and helpers. All source code lives in `src/`; `@/*` maps to `src/*`.

```
src/
  app/                         Routes only: metadata, static params, render a feature page
    layout.tsx                 <html>, fonts, wraps everything in <SiteShell>
    page.tsx                   → features/home
    about/ services/ services/[slug]/ gallery/ blogs/ blogs/[slug]/ contact/
    not-found.tsx, icon.png    404 page + favicon

  components/                  Shared, feature-agnostic UI
    layout/                    SiteShell, header/*, footer/*, MobileActionBar (rendered once)
    ui/                        Small primitives (BrandLogo, BrandWordmark)

  config/                      Single sources of truth
    assets.ts                  Every /public file path (ASSETS.services.automotive, ...)
    site.ts                    Phone, WhatsApp, hours, socials, booking areas
    routes.ts                  ROUTES, PRIMARY_NAV, HOME_SECTIONS, active-page helpers

  features/<name>/
    <Name>Page.tsx             Page composition + state shared between its sections
    components/                Feature components (sections/, or hub/ + detail/ for services)
    data/                      Static content for this feature
    lib/, types.ts             Feature-only helpers and types (when needed)
    index.ts                   Public API — import from '@/features/<name>' outside the feature

    booking/                   Cross-cutting: selected service/area context, form validation,
                               ticket numbers, <BookingAreaOptions/>
    home/ about/ services/ gallery/ blogs/ contact/

  hooks/use-site-navigation.ts  navigate(), openService(slug), goToHomeSection(id), ...
  lib/utils.ts                  cn() class merge helper

public/                      Served files only (see src/config/assets.ts)
  brand/  images/services/  videos/
```

## Conventions

- **Routes stay thin.** A `page.tsx` exports `metadata` and renders one feature page.
- **No navigation props.** Components call `useSiteNavigation()` instead of receiving
  `onBackHome` / `onSelectService` callbacks.
- **No hard-coded asset paths, phone numbers or URLs.** Use `ASSETS`, `SITE_CONFIG`, `ROUTES`.
- **Booking forms** validate with `validateContactDetails()` and build ticket ids with
  `createTicketNumber()`. Use `useBookingSelection()` to read/pre-fill the visitor's chosen
  service and area across pages.
- **Cross-feature imports** go through the feature's `index.ts`.
- **Adding an image:** export a WebP (~1024px, quality ~80) into `public/images/...` and register the
  path in `src/config/assets.ts`.
