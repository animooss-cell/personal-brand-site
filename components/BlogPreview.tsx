import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { posts } from "@/lib/posts";

export default function BlogPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">آخرین مقالات</h2>
          <p className="mt-3 text-base text-slate-600">
            یادداشت‌هایی درباره هوش مصنوعی، استارتاپ و رشد کسب‌وکار.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-brand-600 transition-colors duration-200 hover:text-brand-700"
        >
          همه مقالات
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {posts.slice(0, 3).map((post, idx) => (
          <article
            key={post.slug}
            style={{ animationDelay: `${idx * 120}ms` }}
            className="fade-in-up flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <span className="mb-4 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {post.tag}
            </span>
            <h3 className="mb-3 text-lg font-bold leading-7 text-slate-900">{post.title}</h3>
            <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
            <time className="mt-auto text-xs text-slate-400">{post.date}</time>
          </article>
        ))}
      </div>
    </section>
  );
}
