import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLatestPosts } from "@/lib/data";
import { NEWS_CATEGORY } from "@/lib/categories";
import BlogPostCard from "@/components/BlogPostCard";

export default async function BlogGrid() {
  const posts = await getLatestPosts(3, NEWS_CATEGORY.value);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" dir="rtl">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">آخرین مقالات</h2>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          یادداشت‌هایی درباره هوش مصنوعی، استارتاپ و رشد کسب‌وکار.
        </p>
      </div>

      {posts.length ? (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, idx) => (
            <BlogPostCard key={post.id} post={post} priority={idx === 0} />
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-400">هنوز پستی منتشر نشده است.</p>
      )}

      <div className="mt-8 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-brand px-6 py-2.5 text-sm font-bold text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
        >
          همه مقالات
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
