import { BLOG_POSTS, BlogPage } from '@/features/blogs';
import JsonLd from '@/components/seo/JsonLd';
import { ROUTES } from '@/config/routes';
import { buildPageMetadata } from '@/lib/seo/metadata';
import {
  breadcrumbSchema,
  breadcrumbTrail,
  collectionPageSchema,
  jsonLdGraph,
} from '@/lib/seo/structured-data';

const TITLE = 'Window Tinting & Heat Protection Blog';
const DESCRIPTION =
  'Expert guides on car and home window tinting, heat rejection, frosted film, marble protection and fabric nano coating in Qatar.';

// `?category=` only filters on the client; the canonical stays `/blogs` for every variant.
export const metadata = buildPageMetadata({ title: TITLE, description: DESCRIPTION, path: ROUTES.blogs });

export default function Page() {
  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          collectionPageSchema({
            name: TITLE,
            description: DESCRIPTION,
            path: ROUTES.blogs,
            items: BLOG_POSTS.map((p) => ({ name: p.title, path: ROUTES.blogPost(p.slug) })),
          }),
          breadcrumbSchema(breadcrumbTrail({ name: 'Blog', path: ROUTES.blogs }))
        )}
      />
      <BlogPage />
    </>
  );
}
