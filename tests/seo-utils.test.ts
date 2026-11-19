/**
 * Unit tests for the framework-free SEO utilities.
 * Run: npm test   (Node ≥ 22.6 — uses Node's built-in TypeScript type stripping, no dependencies)
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { absoluteAssetUrl, absoluteUrl, normalizePath } from '../src/lib/seo/canonical.ts';
import { serializeJsonLd } from '../src/lib/seo/json-ld.ts';
import { isIndexingDisabled, normalizeSiteUrl, resolveSiteUrl } from '../src/lib/seo/site-url.ts';
import { toIsoDate, truncateText } from '../src/lib/seo/text.ts';

const BASE = 'https://example.com';

describe('normalizeSiteUrl / resolveSiteUrl', () => {
  it('returns the origin of a valid URL', () => {
    assert.equal(normalizeSiteUrl('https://example.com/some/path/'), 'https://example.com');
    assert.equal(normalizeSiteUrl(' https://www.example.com '), 'https://www.example.com');
  });
  it('rejects placeholders and non-http protocols', () => {
    assert.equal(normalizeSiteUrl('MY_APP_URL'), null);
    assert.equal(normalizeSiteUrl('javascript:alert(1)'), null);
    assert.equal(normalizeSiteUrl('ftp://example.com'), null);
    assert.equal(normalizeSiteUrl(''), null);
    assert.equal(normalizeSiteUrl(undefined), null);
  });
  it('rejects URLs with credentials', () => {
    assert.equal(normalizeSiteUrl('https://user:pass@example.com'), null);
  });
  it('prefers SITE_URL, then APP_URL, then the default', () => {
    assert.equal(resolveSiteUrl({ SITE_URL: 'https://a.com', APP_URL: 'https://b.com' }), 'https://a.com');
    assert.equal(resolveSiteUrl({ SITE_URL: 'bad', APP_URL: 'https://b.com' }), 'https://b.com');
    assert.equal(resolveSiteUrl({ APP_URL: 'MY_APP_URL' }), 'https://exotictintqatar.com');
  });
  it('reads SEO_NOINDEX', () => {
    assert.equal(isIndexingDisabled({ SEO_NOINDEX: 'true' }), true);
    assert.equal(isIndexingDisabled({ SEO_NOINDEX: '1' }), true);
    assert.equal(isIndexingDisabled({ SEO_NOINDEX: 'false' }), false);
    assert.equal(isIndexingDisabled({}), false);
  });
});

describe('normalizePath / absoluteUrl', () => {
  it('removes trailing slashes, query strings and hashes', () => {
    assert.equal(normalizePath('/blogs/'), '/blogs');
    assert.equal(normalizePath('/blogs?category=Automotive'), '/blogs');
    assert.equal(normalizePath('/services/x#faq'), '/services/x');
    assert.equal(normalizePath('//services///x//'), '/services/x');
  });
  it('treats empty and root paths as the home page', () => {
    assert.equal(normalizePath(''), '/');
    assert.equal(normalizePath('/'), '/');
    assert.equal(normalizePath('?x=1'), '/');
  });
  it('adds a leading slash and preserves case', () => {
    assert.equal(normalizePath('about'), '/about');
    assert.equal(normalizePath('/Blogs/Post'), '/Blogs/Post');
  });
  it('builds absolute URLs; home is the bare origin', () => {
    assert.equal(absoluteUrl('/', BASE), BASE);
    assert.equal(absoluteUrl('/about/', BASE), `${BASE}/about`);
    assert.equal(absoluteUrl('/blogs?category=a', BASE), `${BASE}/blogs`);
  });
});

describe('absoluteAssetUrl', () => {
  it('prefixes internal paths', () => {
    assert.equal(absoluteAssetUrl('/og/default.jpg', BASE), `${BASE}/og/default.jpg`);
  });
  it('keeps absolute http(s) URLs', () => {
    assert.equal(absoluteAssetUrl('https://cdn.example.com/a.jpg', BASE), 'https://cdn.example.com/a.jpg');
  });
  it('rejects unsafe or protocol-relative values', () => {
    assert.equal(absoluteAssetUrl('javascript:alert(1)', BASE), null);
    assert.equal(absoluteAssetUrl('data:image/png;base64,AAAA', BASE), null);
    assert.equal(absoluteAssetUrl('//evil.com/a.jpg', BASE), null);
  });
});

describe('serializeJsonLd', () => {
  it('cannot be broken out of a <script> tag', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>', x: 'a & b' });
    assert.ok(!out.includes('<'));
    assert.ok(!out.includes('>'));
    assert.ok(!out.includes('&'));
  });
  it('escapes U+2028/U+2029', () => {
    const out = serializeJsonLd({ t: 'a b c' });
    assert.ok(!out.includes(' ') && !out.includes(' '));
  });
  it('still round-trips to the same data', () => {
    const data = { '@type': 'Thing', name: '</script> & <b>', n: 1, list: ['ü', ' '] };
    assert.deepEqual(JSON.parse(serializeJsonLd(data)), data);
  });
});

describe('toIsoDate', () => {
  it('converts "Month YYYY" to an ISO month', () => {
    assert.equal(toIsoDate('March 2026'), '2026-03');
    assert.equal(toIsoDate('january 2026'), '2026-01');
  });
  it('keeps ISO dates', () => {
    assert.equal(toIsoDate('2026-03-14'), '2026-03-14');
    assert.equal(toIsoDate('2026-03'), '2026-03');
  });
  it('returns undefined instead of guessing', () => {
    assert.equal(toIsoDate('Spring 2026'), undefined);
    assert.equal(toIsoDate('yesterday'), undefined);
    assert.equal(toIsoDate(undefined), undefined);
  });
});

describe('truncateText', () => {
  it('leaves short text alone (whitespace collapsed)', () => {
    assert.equal(truncateText('  hello   world ', 160), 'hello world');
  });
  it('cuts on a word boundary and stays within the limit', () => {
    const long = 'word '.repeat(60);
    const out = truncateText(long, 160);
    assert.ok(out.length <= 160);
    assert.ok(out.endsWith('…'));
    assert.ok(!out.includes('wor…'));
  });
});
