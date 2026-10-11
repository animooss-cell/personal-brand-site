import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import { getPaginatedPosts, getPublishedPostsCount, BLOG_PAGE_SIZE } from "@/lib/data";
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

function parsePageParam(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null;
  return Number(raw);
}

export async function generateStaticParams() {
  const params: { category: string; page: string }[] = [];

  for (const c of BLOG_CATEGORIES) {
    const total = await getPublishedPostsCount(c.value);
    const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
    for (let p = 2; p <= totalPages; p++) {
      params.push({ category: c.value, page: String(p) });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: { category: string; page: string };
}): Promise<Metadata> {
  const category = findCategory(params.category);
  const page = parsePageParam(params.page);
  if (!category || !page || page === 1) return {};

  const title = `مقالات ${category.label} | صفحه ${page}`;
  const canonical = `/blog/category/${encodeURIComponent(category.value)}/page/${page}`;

  return {
    title,
    alternates: { canonical },
    openGraph: { title, url: canonical },
  };
}

export default async function BlogCategoryPaginatedPage({
  params,
}: {
  params: { category: string; page: string };
}) {
  const category = findCategory(params.category);
  if (!category) notFound();

  const page = parsePageParam(params.page);
  if (!page) notFound();

  const basePath = `/blog/category/${encodeURIComponent(category.value)}`;
  if (page === 1) permanentRedirect(basePath);

  const { posts, totalPages } = await getPaginatedPosts({ page, category: category.value });
  if (page > totalPages) notFound();

  return (
    <div dir="rtl">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            مقالات {category.label} — صفحه {page}
          </h1>
          <Link
            href="/blog"
            className="mt-4 inline-block text-sm text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200"
          >
            همه مقالات
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <BlogPagination currentPage={page} totalPages={totalPages} basePath={basePath} />
      </section>
    </div>
  );
}
