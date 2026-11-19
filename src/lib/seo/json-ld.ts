/**
 * Serialises structured data for a `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` alone is not safe inside a script element: a string containing `</script>`
 * would close the tag. `<`, `>` and `&` are escaped to their \u forms (still valid JSON), and
 * U+2028 / U+2029 are escaped because some parsers treat them as line terminators.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(new RegExp('\\u2028', 'g'), '\\u2028')
    .replace(new RegExp('\\u2029', 'g'), '\\u2029');
}
