"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Post } from "@/lib/types";

type SlidePost = Pick<Post, "slug" | "title" | "excerpt" | "category" | "featured_image">;

const AUTOPLAY_MS = 5000;

export default function BlogHeroSlider({ posts }: { posts: SlidePost[] }) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback(
    (i: number) => setIndex(((i % posts.length) + posts.length) % posts.length),
    [posts.length]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (posts.length < 2) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, posts.length]);

  if (!posts.length) return null;

  return (
    <section className="relative h-[300px] overflow-hidden md:h-[500px]" dir="rtl">
      {posts.map((post, i) => (
        <div
          key={post.slug}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 cursor-pointer" aria-label={post.title}>
            {post.featured_image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.featured_image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            )}
          </Link>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 px-6 pb-10 md:px-16 md:pb-14">
            <div className="mx-auto max-w-6xl">
              {post.category && (
                <span className="mb-3 inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              )}
              <Link href={`/blog/${post.slug}`} className="cursor-pointer">
                <h2 className="mb-3 max-w-2xl text-xl font-bold leading-8 text-white transition-colors duration-200 hover:text-brand-200 md:text-3xl md:leading-10">
                  {post.title}
                </h2>
              </Link>
              <p className="mb-5 hidden max-w-xl text-sm leading-7 text-white/85 md:block">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
              >
                بخوان
              </Link>
            </div>
          </div>
        </div>
      ))}

      {posts.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="اسلاید قبلی"
            className="absolute right-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="اسلاید بعدی"
            className="absolute left-4 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur transition-colors duration-200 hover:bg-white/30"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {posts.map((post, i) => (
              <button
                key={post.slug}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`اسلاید ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-brand" : "w-2 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
