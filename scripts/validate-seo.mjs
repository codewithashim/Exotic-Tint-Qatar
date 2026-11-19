#!/usr/bin/env node
/**
 * End-to-end SEO validation against a running server (no dependencies).
 *
 *   npm run build && npm run start          # in one terminal
 *   npm run seo:validate                    # in another (defaults to http://localhost:3000)
 *   SEO_BASE_URL=https://staging.example.com npm run seo:validate
 *
 * Pages are discovered from /sitemap.xml. Sitemap URLs use the production origin; they are
 * fetched from SEO_BASE_URL instead, and canonical/OG URLs are compared to the sitemap URL.
 * Exits with code 1 when any error is found.
 */
const BASE = (process.env.SEO_BASE_URL || 'http://localhost:3000').replace(/\/+$/, '');
const MAX_TITLE = 70;
const MAX_DESCRIPTION = 160;

const errors = [];
const warnings = [];
const error = (where, msg) => errors.push(`✖ ${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`⚠ ${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return m ? decode(m[1]) : null;
};
const metaContent = (html, key, value) => {
  const tags = html.match(/<meta\s[^>]*>/g) || [];
  const tag = tags.find((t) => attr(t, key) === value);
  return tag ? attr(tag, 'content') : null;
};
const allMeta = (html, key, value) =>
  (html.match(/<meta\s[^>]*>/g) || []).filter((t) => attr(t, key) === value);
/** Only the <head> part rendered by the metadata API (before the RSC payload scripts). */
const headOf = (html) => html.slice(0, html.indexOf('</head>') + 7);
const stripTags = (s) => decode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

async function get(path, { redirect = 'manual' } = {}) {
  const res = await fetch(`${BASE}${path}`, { redirect });
  return { status: res.status, text: await res.text(), headers: res.headers };
}

async function main() {
  console.log(`SEO validation against ${BASE}\n`);

  // ---- robots.txt
  const robots = await get('/robots.txt');
  if (robots.status !== 200) error('/robots.txt', `HTTP ${robots.status}`);
  const sitemapLine = robots.text.match(/^Sitemap:\s*(\S+)/im)?.[1];
  const noindexDeployment = /Disallow:\s*\/\s*$/im.test(robots.text);
  if (noindexDeployment) warn('/robots.txt', 'disallows everything (SEO_NOINDEX deployment)');
  else if (!sitemapLine) error('/robots.txt', 'no Sitemap: line');
  if (/Disallow:\s*\/_next/i.test(robots.text)) error('/robots.txt', 'blocks /_next (JS/CSS)');

  // ---- sitemap.xml
  const sitemap = await get('/sitemap.xml');
  if (sitemap.status !== 200) error('/sitemap.xml', `HTTP ${sitemap.status}`);
  if (!sitemap.text.startsWith('<?xml') || !sitemap.text.includes('<urlset'))
    error('/sitemap.xml', 'not a <urlset> XML document');
  const opened = (sitemap.text.match(/<url>/g) || []).length;
  const closed = (sitemap.text.match(/<\/url>/g) || []).length;
  if (opened !== closed) error('/sitemap.xml', 'unbalanced <url> tags');
  const locs = [...sitemap.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => decode(m[1]));
  if (!locs.length && !noindexDeployment) error('/sitemap.xml', 'no URLs');
  if (new Set(locs).size !== locs.length) error('/sitemap.xml', 'duplicate URLs');
  for (const m of sitemap.text.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
    if (!/^\d{4}-\d{2}(-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2})?)?)?$/.test(m[1]))
      error('/sitemap.xml', `invalid lastmod "${m[1]}"`);
  }
  const origin = locs[0] ? new URL(locs[0]).origin : null;
  if (sitemapLine && origin && !sitemapLine.startsWith(origin))
    error('/robots.txt', `Sitemap host ${sitemapLine} differs from sitemap URLs (${origin})`);

  // ---- pages
  const pagePaths = new Set(locs.map((loc) => new URL(loc).pathname.replace(/\/+$/, '') || '/'));
  const titles = new Map();
  const descriptions = new Map();
  const inbound = new Map([...pagePaths].map((p) => [p, 0]));
  const linkedPaths = new Set();
  const assetUrls = new Set();

  for (const loc of locs) {
    const path = new URL(loc).pathname.replace(/\/+$/, '') || '/';
    const res = await get(path);
    if (res.status !== 200) {
      error(path, `HTTP ${res.status}`);
      continue;
    }
    const html = res.text;
    const head = headOf(html);

    // title
    const titleTags = head.match(/<title>([^<]*)<\/title>/g) || [];
    if (titleTags.length !== 1) error(path, `${titleTags.length} <title> tags`);
    const title = titleTags[0] ? decode(titleTags[0].replace(/<\/?title>/g, '')) : '';
    if (!title) error(path, 'empty title');
    if (title.length > MAX_TITLE) warn(path, `title is ${title.length} chars (> ${MAX_TITLE})`);
    titles.set(title, [...(titles.get(title) || []), path]);

    // description
    const description = metaContent(head, 'name', 'description');
    if (!description) error(path, 'missing meta description');
    else {
      if (description.length > MAX_DESCRIPTION)
        error(path, `description is ${description.length} chars (> ${MAX_DESCRIPTION})`);
      descriptions.set(description, [...(descriptions.get(description) || []), path]);
    }

    // robots
    const robotsTags = allMeta(head, 'name', 'robots').map((t) => attr(t, 'content'));
    if (robotsTags.length !== 1) error(path, `${robotsTags.length} robots meta tags`);
    if (!noindexDeployment && robotsTags.some((c) => /noindex/.test(c)))
      error(path, 'indexable page sends noindex');

    // canonical
    const canonicals = (head.match(/<link\s[^>]*rel="canonical"[^>]*>/g) || []).map((t) =>
      attr(t, 'href')
    );
    if (canonicals.length !== 1) error(path, `${canonicals.length} canonical links`);
    else if (canonicals[0] !== loc) error(path, `canonical ${canonicals[0]} ≠ sitemap ${loc}`);

    // Open Graph / Twitter
    for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name']) {
      if (!metaContent(head, 'property', prop)) error(path, `missing ${prop}`);
    }
    const ogUrl = metaContent(head, 'property', 'og:url');
    if (ogUrl && ogUrl !== loc) error(path, `og:url ${ogUrl} ≠ ${loc}`);
    const ogImage = metaContent(head, 'property', 'og:image');
    if (ogImage && !/^https?:\/\//.test(ogImage)) error(path, `og:image not absolute: ${ogImage}`);
    if (ogImage) assetUrls.add(ogImage);
    if (!metaContent(head, 'property', 'og:image:width')) warn(path, 'og:image has no width');
    if (metaContent(head, 'name', 'twitter:card') !== 'summary_large_image')
      error(path, 'twitter:card is not summary_large_image');
    if (!metaContent(head, 'name', 'twitter:image')) error(path, 'missing twitter:image');

    // headings
    const h1s = html.match(/<h1[\s>][\s\S]*?<\/h1>/g) || [];
    if (h1s.length !== 1) error(path, `${h1s.length} <h1> elements`);
    else if (!stripTags(h1s[0])) error(path, 'empty <h1>');
    for (const h of html.match(/<h[2-6][\s>][\s\S]*?<\/h[2-6]>/g) || []) {
      if (!stripTags(h)) warn(path, `empty heading ${h.slice(0, 60)}`);
    }

    // JSON-LD
    const scripts = [
      ...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g),
    ];
    if (!scripts.length) error(path, 'no JSON-LD');
    for (const [, body] of scripts) {
      try {
        const data = JSON.parse(body);
        if (data['@context'] !== 'https://schema.org') error(path, 'JSON-LD without schema.org @context');
        const json = JSON.stringify(data);
        for (const bad of ['aggregateRating', '"review"', '"offers"', '"price"'])
          if (json.includes(bad)) error(path, `JSON-LD contains unverified ${bad}`);
      } catch (e) {
        error(path, `invalid JSON-LD: ${e.message}`);
      }
    }

    // images
    for (const img of html.match(/<img\s[^>]*>/g) || []) {
      if (attr(img, 'alt') === null) error(path, `<img> without alt: ${img.slice(0, 80)}`);
      const src = attr(img, 'src');
      if (src) assetUrls.add(src.startsWith('/') ? src : src);
    }

    // internal links
    const pageLinks = new Set();
    for (const a of html.match(/<a\s[^>]*>/g) || []) {
      const href = attr(a, 'href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) continue;
      const target = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
      pageLinks.add(target);
      linkedPaths.add(target);
    }
    for (const target of pageLinks) {
      if (target !== path && inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
    }
    if (pageLinks.size < 3) warn(path, `only ${pageLinks.size} internal link targets`);
  }

  for (const [title, paths] of titles)
    if (paths.length > 1) error('titles', `"${title}" used on ${paths.join(', ')}`);
  for (const [d, paths] of descriptions)
    if (paths.length > 1) error('descriptions', `"${d.slice(0, 50)}…" used on ${paths.join(', ')}`);
  for (const [p, count] of inbound)
    if (count === 0 && p !== '/') error(p, 'orphan page (no internal links from other pages)');

  // broken internal links
  for (const target of linkedPaths) {
    if (pagePaths.has(target)) continue;
    const res = await get(target);
    if (res.status >= 400) error('links', `${target} → HTTP ${res.status}`);
    else if (res.status === 200) warn('links', `${target} is linked but not in the sitemap`);
  }

  // broken images
  for (const src of assetUrls) {
    const path = src.startsWith('/') ? src : origin && src.startsWith(origin) ? src.slice(origin.length) : null;
    if (!path) continue; // external host
    const res = await fetch(`${BASE}${path}`, { method: 'HEAD' });
    if (res.status !== 200) error('images', `${src} → HTTP ${res.status}`);
  }

  // 404 handling and duplicate-parameter canonicalisation
  for (const missing of ['/services/__missing__', '/blogs/__missing__', '/__missing__']) {
    const res = await get(missing);
    if (res.status !== 404) error(missing, `expected 404, got ${res.status}`);
    else if (!/<meta name="robots" content="noindex/.test(headOf(res.text)))
      error(missing, '404 page is not noindex');
  }
  const filtered = await get('/blogs?category=Automotive%20Tinting');
  const filteredCanonical = filtered.text.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (origin && filteredCanonical !== `${origin}/blogs`)
    error('/blogs?category=…', `canonical is ${filteredCanonical}`);

  const manifest = await get('/manifest.webmanifest');
  if (manifest.status !== 200) error('/manifest.webmanifest', `HTTP ${manifest.status}`);

  console.log(`Checked ${locs.length} sitemap URLs, ${linkedPaths.size} link targets, ${assetUrls.size} images.\n`);
  if (warnings.length) console.log(warnings.join('\n') + '\n');
  if (errors.length) {
    console.log(errors.join('\n'));
    console.log(`\n${errors.length} error(s).`);
    process.exit(1);
  }
  console.log('✔ No SEO errors.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
