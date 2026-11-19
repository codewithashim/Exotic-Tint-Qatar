'use client';

import { useEffect, useState } from 'react';
import { BLOG_POSTS, BlogPost } from '@/features/blogs/data/blogs-data';

import BlogSubHeader from './components/sections/BlogSubHeader';
import BlogArticleReader from './components/sections/BlogArticleReader';
import BlogHubSearchHeader from './components/sections/BlogHubSearchHeader';
import BlogFeaturedGuide from './components/sections/BlogFeaturedGuide';
import BlogPostGrid from './components/sections/BlogPostGrid';
import { ROUTES } from '@/config/routes';
import { BLOG_CATEGORIES } from '@/features/blogs/data/blog-categories';
import { getBlogPostBySlug } from '@/features/blogs/data/blogs-data';
import { useSiteNavigation } from '@/hooks/use-site-navigation';

interface BlogPageProps {
  /** When set, the article with this slug is shown instead of the hub. */
  slug?: string;
}

/** Blog hub (`/blogs`) and article reader (`/blogs/[slug]`). */
export default function BlogPage({ slug }: BlogPageProps) {
  const { navigate, openBlogs, openBlogPost } = useSiteNavigation();
  const [selectedCategory, setCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const activePost: BlogPost | undefined = slug ? getBlogPostBySlug(slug) : undefined;

  // Apply `?category=` (set when leaving an article via a category tab) after hydration,
  // so the page itself stays fully static / server-rendered.
  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get('category');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (category) setCategory(category);
  }, []);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Guides' || post.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    const matchesQuery =
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.category.toLowerCase().includes(q) ||
      post.keyTakeaways.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  const handleOpenPost = (postSlug: string) => openBlogPost(postSlug);
  const closePost = () => {
    if (activePost) openBlogs();
  };
  /** On an article, picking a category goes back to the hub with that filter applied. */
  const setSelectedCategory = (category: string) => {
    if (activePost) navigate(`${ROUTES.blogs}?category=${encodeURIComponent(category)}`);
    else setCategory(category);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-14">
      <BlogSubHeader
        activePost={activePost}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        closePost={closePost}
      />

      {/* IF AN ARTICLE IS SELECTED: FULL INTERACTIVE ARTICLE READER */}
      {activePost ? (
        <BlogArticleReader
          activePost={activePost}
          handleOpenPost={handleOpenPost}
          closePost={closePost}
        />
      ) : (
        /* BLOG HUB OVERVIEW: HERO + SEARCH + FEATURED POST + BENTO BLOG GRID */
        <>
          <BlogHubSearchHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          {/* Featured Flagship Guide Bento Card (Shown when on All Guides without search filter) */}
          {selectedCategory === 'All Guides' && !searchQuery.trim() && (
            <BlogFeaturedGuide handleOpenPost={handleOpenPost} />
          )}

          <BlogPostGrid
            filteredPosts={filteredPosts}
            handleOpenPost={handleOpenPost}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSelectedCategory={setSelectedCategory}
          />
        </>
      )}
    </div>
  );
}
