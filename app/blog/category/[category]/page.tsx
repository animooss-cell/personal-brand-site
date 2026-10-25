import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import BlogCategoryChips from "@/components/BlogCategoryChips";
import { getPaginatedPosts } from "@/lib/data";
import { BLOG_ARTICLE_CATEGORIES, NEWS_CATEGORY } from "@/lib/categories";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";

export const revalidate = 300;

function findCategory(slug: string) {
  return BLOG_ARTICLE_CATEGORIES.find((c) => c.slug === slug);
}

export async function generateStaticParams() {
  return BLOG_ARTICLE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = findCategory(params.category);
  if (!category) return {};

  const canonical = `/blog/category/${category.slug}`;

  if (category.landing) {
    const { title, description } = category.landing;
    // تا وقتی هیچ پستی در این دسته منتشر نشده، صفحه‌ی خالی ایندکس نشود؛ با
    // انتشار اولین پست (حداکثر بعد از revalidate) این خودکار برداشته می‌شود.
    const { total } = await getPaginatedPosts({ page: 1, category: category.value });
    return {
      title,
      description,
      alternates: { canonical },
      robots: total === 0 ? { index: false, follow: true } : undefined,
      openGraph: { title, description, url: canonical },
    };
  }

  const title = `مقالات ${category.label}`;
  const description = `مجموعه مقالات وبلاگ در دسته‌بندی ${category.label}.`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  if (params.category === NEWS_CATEGORY.slug) {
    permanentRedirect("/news");
  }

  const category = findCategory(params.category);
  if (!category) notFound();

  const { posts, totalPages } = await getPaginatedPosts({ page: 1, category: category.value });
  const basePath = `/blog/category/${category.slug}`;
  const { landing } = category;

  return (
    <div dir="rtl">
      {landing && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(
              buildBreadcrumbJsonLd([
                { name: "خانه", path: "/" },
                { name: "وبلاگ", path: "/blog" },
                { name: category.label, path: basePath },
              ])
            ),
          }}
        />
      )}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            {landing ? landing.heading : <>مقالات {category.label}</>}
          </h1>
          {landing && (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {landing.intro.map((part, i) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <Link
                    key={i}
                    href={part.href}
                    className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {part.label}
                  </Link>
                )
              )}
            </p>
          )}
          <Link
            href="/blog"
            className="mt-4 inline-block text-sm text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200"
          >
            همه مقالات
          </Link>
        </div>

        <BlogCategoryChips activeSlug={category.slug} />

        {posts.length ? (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">
            {landing ? landing.emptyMessage : "پستی در این دسته‌بندی منتشر نشده است."}
          </p>
        )}

        <BlogPagination currentPage={1} totalPages={totalPages} basePath={basePath} />
      </section>
    </div>
  );
}
