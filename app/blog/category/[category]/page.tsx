import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import { getPaginatedPosts } from "@/lib/data";
import { BLOG_CATEGORIES } from "@/lib/categories";

export const revalidate = 300;

// در رندر استاتیک (generateStaticParams) مقدار params فارسی هنوز percent-encode
// شده به کامپوننت می‌رسد (یک رفتار خاص Next.js برای پارام‌های غیر-ASCII)، در حالی
// که در درخواست‌های معمولی دیکد شده است؛ هر دو حالت را پوشش می‌دهیم.
function findCategory(raw: string) {
  let decoded = raw;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    // raw از قبل دیکد شده یا معتبر نیست؛ همان را نگه می‌داریم
  }
  return BLOG_CATEGORIES.find((c) => c.value === raw || c.value === decoded);
}

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ category: c.value }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = findCategory(params.category);
  if (!category) return {};

  const title = `مقالات ${category.label}`;
  const description = `مجموعه مقالات وبلاگ در دسته‌بندی ${category.label}.`;
  const canonical = `/blog/category/${encodeURIComponent(category.value)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical },
  };
}

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = findCategory(params.category);
  if (!category) notFound();

  const { posts, totalPages } = await getPaginatedPosts({ page: 1, category: category.value });
  const basePath = `/blog/category/${encodeURIComponent(category.value)}`;

  return (
    <div dir="rtl">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">مقالات {category.label}</h1>
          <Link
            href="/blog"
            className="mt-4 inline-block text-sm text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200"
          >
            همه مقالات
          </Link>
        </div>

        {posts.length ? (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">پستی در این دسته‌بندی منتشر نشده است.</p>
        )}

        <BlogPagination currentPage={1} totalPages={totalPages} basePath={basePath} />
      </section>
    </div>
  );
}
