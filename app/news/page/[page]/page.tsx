import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import { getPaginatedPosts, getPublishedPostsCount, BLOG_PAGE_SIZE } from "@/lib/data";
import { NEWS_CATEGORY } from "@/lib/categories";

export const revalidate = 300;

const newsDescription =
  "تازه‌ترین اخبار و رویدادهای هوش مصنوعی، به‌روزرسانی ابزارها و تحولات این حوزه.";

function parsePageParam(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null;
  return Number(raw);
}

export async function generateStaticParams() {
  const total = await getPublishedPostsCount(NEWS_CATEGORY.value);
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { page: string };
}): Promise<Metadata> {
  const page = parsePageParam(params.page);
  if (!page || page === 1) return {};

  const title = `اخبار هوش مصنوعی | صفحه ${page}`;

  return {
    title,
    description: newsDescription,
    alternates: { canonical: `/news/page/${page}` },
    openGraph: {
      title,
      description: newsDescription,
      url: `/news/page/${page}`,
    },
  };
}

export default async function NewsPaginatedPage({ params }: { params: { page: string } }) {
  const page = parsePageParam(params.page);
  if (!page) notFound();
  if (page === 1) permanentRedirect("/news");

  const { posts, totalPages } = await getPaginatedPosts({ page, category: NEWS_CATEGORY.value });
  if (page > totalPages) notFound();

  return (
    <div dir="rtl">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
            اخبار هوش مصنوعی — صفحه {page}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{newsDescription}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} basePath="/news" />
          ))}
        </div>

        <BlogPagination currentPage={page} totalPages={totalPages} basePath="/news" />
      </section>
    </div>
  );
}
