import type { Metadata } from "next";
import BlogPostCard from "@/components/BlogPostCard";
import BlogPagination from "@/components/BlogPagination";
import { getPaginatedPosts } from "@/lib/data";
import { NEWS_CATEGORY } from "@/lib/categories";

const newsTitle = "اخبار هوش مصنوعی";
const newsDescription =
  "تازه‌ترین اخبار و رویدادهای هوش مصنوعی، به‌روزرسانی ابزارها و تحولات این حوزه.";

export const metadata: Metadata = {
  title: newsTitle,
  description: newsDescription,
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: newsTitle,
    description: newsDescription,
    url: "/news",
  },
};

export const revalidate = 300;

export default async function NewsPage() {
  const { posts, totalPages } = await getPaginatedPosts({ page: 1, category: NEWS_CATEGORY.value });

  return (
    <div dir="rtl">
      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">اخبار هوش مصنوعی</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{newsDescription}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {posts.length ? (
          <div className="grid gap-8 md:grid-cols-3">
            {posts.map((post, idx) => (
              <BlogPostCard key={post.id} post={post} priority={idx < 3} basePath="/news" />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">هنوز خبری منتشر نشده است.</p>
        )}

        <BlogPagination currentPage={1} totalPages={totalPages} basePath="/news" />
      </section>
    </div>
  );
}
