import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/site";
import { BLOG_PAGE_SIZE, getPublishedPostsCount } from "@/lib/data";
import { BLOG_ARTICLE_CATEGORIES, NEWS_CATEGORY } from "@/lib/categories";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const [
    { data: posts },
    { data: courses },
    { data: downloads },
    totalBlogPosts,
    totalNewsPosts,
    categoryCounts,
  ] = await Promise.all([
    supabase.from("posts").select("slug, category, updated_at").eq("status", "published"),
    supabase.from("courses").select("slug, updated_at").eq("status", "published"),
    supabase.from("downloads").select("slug, updated_at").eq("published", true),
    getPublishedPostsCount(undefined, NEWS_CATEGORY.value),
    getPublishedPostsCount(NEWS_CATEGORY.value),
    Promise.all(BLOG_ARTICLE_CATEGORIES.map((category) => getPublishedPostsCount(category.value))),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ai-business-consulting`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ai-growth-consulting`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ai-training-ahvaz`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/ai-content-generation`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/news`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/downloads`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const blogPosts = (posts ?? []).filter((post) => post.category !== NEWS_CATEGORY.value);
  const newsPosts = (posts ?? []).filter((post) => post.category === NEWS_CATEGORY.value);

  const postRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsRoutes: MetadataRoute.Sitemap = newsPosts.map((post) => ({
    url: `${SITE_URL}/news/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const courseRoutes: MetadataRoute.Sitemap = (courses ?? [])
    .filter((course) => course.slug)
    .map((course) => ({
      url: `${SITE_URL}/services/courses/${course.slug}`,
      lastModified: course.updated_at,
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  const downloadRoutes: MetadataRoute.Sitemap = (downloads ?? []).map((item) => ({
    url: `${SITE_URL}/downloads/${item.slug}`,
    lastModified: item.updated_at,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogTotalPages = Math.max(1, Math.ceil(totalBlogPosts / BLOG_PAGE_SIZE));
  const blogPageRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, blogTotalPages - 1) },
    (_, i) => ({
      url: `${SITE_URL}/blog/page/${i + 2}`,
      changeFrequency: "daily",
      priority: 0.6,
    })
  );

  const newsTotalPages = Math.max(1, Math.ceil(totalNewsPosts / BLOG_PAGE_SIZE));
  const newsPageRoutes: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, newsTotalPages - 1) },
    (_, i) => ({
      url: `${SITE_URL}/news/page/${i + 2}`,
      changeFrequency: "daily",
      priority: 0.6,
    })
  );

  const categoryRoutes: MetadataRoute.Sitemap = [];
  BLOG_ARTICLE_CATEGORIES.forEach((category, i) => {
    const basePath = `${SITE_URL}/blog/category/${category.slug}`;
    categoryRoutes.push({ url: basePath, changeFrequency: "daily", priority: 0.6 });

    const count = categoryCounts[i];
    const categoryTotalPages = Math.max(1, Math.ceil(count / BLOG_PAGE_SIZE));
    for (let page = 2; page <= categoryTotalPages; page++) {
      categoryRoutes.push({ url: `${basePath}/page/${page}`, changeFrequency: "daily", priority: 0.5 });
    }
  });

  return [
    ...staticRoutes,
    ...blogPageRoutes,
    ...newsPageRoutes,
    ...categoryRoutes,
    ...postRoutes,
    ...newsRoutes,
    ...courseRoutes,
    ...downloadRoutes,
  ];
}
