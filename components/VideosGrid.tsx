"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Video } from "@/lib/types";
import { platformLabel } from "@/lib/videoTypes";

const PAGE_SIZE = 9;

type VideoSummary = Pick<
  Video,
  "id" | "slug" | "title" | "category" | "video_platform" | "thumbnail" | "created_at"
>;

export default function VideosGrid({ category }: { category?: string }) {
  const supabase = createClient();

  const [videos, setVideos] = useState<VideoSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("videos")
      .select("id, slug, title, category, video_platform, thumbnail, created_at", { count: "exact" })
      .eq("published", true);

    if (category) {
      query = query.eq("category", category);
    }

    query
      .order("created_at", { ascending: false })
      .range(from, to)
      .then(({ data, count }) => {
        if (!active) return;
        setVideos((data ?? []) as VideoSummary[]);
        setTotal(count ?? 0);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [page, category, supabase]);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16" dir="rtl">
      {category && (
        <div className="mb-8 flex items-center justify-center gap-2">
          <span className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            {category}
          </span>
          <Link href="/videos" className="text-sm text-slate-400 underline hover:text-slate-600 dark:hover:text-slate-200">
            حذف فیلتر
          </Link>
        </div>
      )}

      {loading ? (
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100 dark:bg-slate-800" />
          ))}
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          {videos.map((item, idx) => (
            <Link
              key={item.id}
              href={`/videos/${item.slug}`}
              style={{ animationDelay: `${(idx % PAGE_SIZE) * 60}ms` }}
              className="fade-in-up flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="relative h-40 w-full bg-slate-100 dark:bg-slate-800">
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <PlayCircle className="h-10 w-10 text-slate-300 dark:text-slate-600" aria-hidden="true" />
                  </div>
                )}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  <PlayCircle className="h-3 w-3" aria-hidden="true" />
                  {platformLabel(item.video_platform)}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7 text-right">
                {item.category && (
                  <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                    {item.category}
                  </span>
                )}
                <h3 className="mb-3 text-lg font-bold leading-7 text-slate-900 dark:text-white">{item.title}</h3>
                {item.created_at && (
                  <time className="mt-auto text-xs text-slate-400">
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </time>
                )}
              </div>
            </Link>
          ))}

          {!videos.length && (
            <p className="col-span-3 text-center text-slate-400">
              {category ? "ویدیویی در این دسته‌بندی منتشر نشده است." : "هنوز ویدیویی منتشر نشده است."}
            </p>
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
                  pageNumber === page ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
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
