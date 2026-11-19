import { serializeJsonLd } from '@/lib/seo/json-ld';

/**
 * Renders structured data as a native `<script type="application/ld+json">` (Server Component).
 * Content is escaped by `serializeJsonLd`, so `</script>` in any string cannot break out.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />
  );
}
