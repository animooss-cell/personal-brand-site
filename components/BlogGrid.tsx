"use client";

import { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Post } from "@/lib/types";
import BlockRenderer from "@/components/BlockRenderer";

const PAGE_SIZE = 9;

type PostSummary = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at"
>;

export default function BlogGrid() {
  const supabase = createClient();

  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loadingPost, setLoadingPost] = useState(false);

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

  const openPost = useCallback(
    async (id: string) => {
      setLoadingPost(true);
      const { data } = await supabase.from("posts").select("*").eq("id", id).single();
      setSelectedPost(data as Post);
      setLoadingPost(false);
    },
    [supabase]
  );

  const closePost = useCallback(() => setSelectedPost(null), []);

  useEffect(() => {
    if (!selectedPost) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closePost();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedPost, closePost]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" dir="rtl">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">آخرین مقالات</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          یادداشت‌هایی درباره هوش مصنوعی، استارتاپ و رشد کسب‌وکار.
        </p>
      </div>

      {loading ? (
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => openPost(post.id)}
              className="fade-in-up flex cursor-pointer flex-col rounded-3xl border border-gray-200 bg-white p-7 text-right shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {post.featured_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.featured_image}
                  alt={post.title}
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
            </button>
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
                  pageNumber === page
                    ? "bg-brand text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 z-50 flex justify-end" dir="rtl">
          <div
            className="absolute inset-0 bg-slate-900/50"
            onClick={closePost}
            aria-hidden="true"
          />

          <div className="relative flex h-full w-full max-w-xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <span className="text-sm font-semibold text-slate-500">مطلب وبلاگ</span>
              <button
                onClick={closePost}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                aria-label="بستن"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-8">
              {loadingPost ? (
                <p className="text-center text-slate-400">در حال بارگذاری...</p>
              ) : (
                <article>
                  <div className="mb-6">
                    {selectedPost.category && (
                      <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                        {selectedPost.category}
                      </span>
                    )}
                    <h1 className="text-2xl font-bold leading-tight text-slate-900">
                      {selectedPost.title}
                    </h1>
                    {selectedPost.published_at && (
                      <time className="mt-3 block text-sm text-slate-400">
                        {new Date(selectedPost.published_at).toLocaleDateString("fa-IR")}
                      </time>
                    )}
                  </div>

                  {selectedPost.featured_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedPost.featured_image}
                      alt={selectedPost.title}
                      className="mb-8 w-full rounded-2xl"
                    />
                  )}

                  <BlockRenderer blocks={selectedPost.content} />

                  {selectedPost.tags?.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
