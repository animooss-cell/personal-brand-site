"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/lib/types";

const PAGE_SIZE = 9;

type PostSummary = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at"
>;

export default function BlogPageGrid() {
  const supabase = createClient();

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    let active = true;
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    supabase
      .from("posts")
      .select("id, slug, title, excerpt, category, featured_image, published_at", { count: "exact" })
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        if (!active) return;
        setPosts((data ?? []) as PostSummary[]);
        setTotal(count ?? 0);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, supabase]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16" dir="rtl">
      {loading ? (
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              style={{ animationDelay: `${(idx % PAGE_SIZE) * 60}ms` }}
              className="fade-in-up flex cursor-pointer flex-col rounded-3xl border border-gray-200 bg-white p-7 text-right shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {post.featured_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featured_image}
                  alt={post.title}
                  loading="lazy"
                  decoding="async"
                  className="mb-4 h-36 w-full rounded-2xl object-cover"
                />
              )}
              {post.category && (
                <span className="mb-4 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {post.category}
                </span>
              )}
              <h3 className="mb-3 text-lg font-bold leading-7 text-slate-900">{post.title}</h3>
              <p className="mb-5 line-clamp-3 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              {post.published_at && (
                <time className="mt-auto text-xs text-slate-400">
                  {new Date(post.published_at).toLocaleDateString("fa-IR")}
                </time>
              )}
            </Link>
          ))}

          {!posts.length && (
            <p className="col-span-3 text-center text-slate-400">هنوز پستی منتشر نشده است.</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`h-9 w-9 cursor-pointer rounded-full text-sm font-semibold transition-colors duration-200 ${
                  pageNumber === page ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
