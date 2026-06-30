import type { Metadata } from "next";
import Link from "next/link";
import { Briefcase, GraduationCap, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";
import BlogHeroSlider from "@/components/BlogHeroSlider";
import BlogPageGrid from "@/components/BlogPageGrid";

const blogTitle = "وبلاگ | آموزش هوش مصنوعی خوزستان و مشاوره کسب و کار اهواز";
const blogDescription =
  "مقالات و یادداشت‌هایی درباره آموزش هوش مصنوعی خوزستان، اتوماسیون کسب و کار با هوش مصنوعی، مشاوره کسب و کار اهواز و رشد استارتاپ‌ها.";

export const metadata: Metadata = {
  title: blogTitle,
  description: blogDescription,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: blogTitle,
    description: blogDescription,
    url: "/blog",
  },
};

export const revalidate = 300;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const supabase = createClient();
  const { data: latestPosts } = await supabase
    .from("posts")
    .select("slug, title, excerpt, category, featured_image")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(4);

  const slides = (latestPosts ?? []) as Pick<
    Post,
    "slug" | "title" | "excerpt" | "category" | "featured_image"
  >[];

  return (
    <div dir="rtl">
      <BlogHeroSlider posts={slides} />

      <BlogPageGrid category={category} />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="fade-in-up flex flex-col items-start rounded-3xl bg-brand-dark p-8 text-white md:p-10">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Briefcase className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-3 text-2xl font-bold">آماده‌ای کسب‌وکارت را متحول کنی؟</h2>
            <p className="mb-7 text-sm leading-7 text-white/85">
              مشاوره کسب‌وکار و پیاده‌سازی هوش مصنوعی متناسب با نیاز شما.
            </p>
            <Link
              href="/services"
              className="mt-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
            >
              مشاهده خدمات
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div
            style={{ animationDelay: "100ms" }}
            className="fade-in-up flex flex-col items-start rounded-3xl border-2 border-brand bg-white p-8 md:p-10"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <GraduationCap className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900">دوره‌های آموزشی هوش مصنوعی</h2>
            <p className="mb-7 text-sm leading-7 text-slate-600">
              آموزش‌های تخصصی و کاربردی ابزارهای هوش مصنوعی برای تیم و سازمان شما.
            </p>
            <Link
              href="/services"
              className="mt-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-700"
            >
              مشاهده دوره‌ها
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
