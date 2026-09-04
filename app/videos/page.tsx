import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import VideosGrid from "@/components/VideosGrid";

const videosTitle = "ویدیوها | آموزش‌ها و محتوای ویدیویی هوش مصنوعی";
const videosDescription =
  "ویدیوهای آموزشی و محتوای عملی درباره هوش مصنوعی و کسب‌وکار، از یوتیوب، آپارات و سایر پلتفرم‌ها در یک جا.";

export const metadata: Metadata = {
  title: videosTitle,
  description: videosDescription,
  alternates: {
    canonical: "/videos",
  },
  openGraph: {
    title: videosTitle,
    description: videosDescription,
    url: "/videos",
  },
};

export const revalidate = 300;

export default async function VideosPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const supabase = createClient();
  const { data: categoryRows } = await supabase
    .from("videos")
    .select("category")
    .eq("published", true)
    .not("category", "is", null);

  const categories = Array.from(
    new Set((categoryRows ?? []).map((row) => row.category as string).filter(Boolean))
  );

  return (
    <div dir="rtl">
      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">ویدیوها</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            ویدیوهای آموزشی و محتوای عملی درباره هوش مصنوعی و کسب‌وکار — از هر پلتفرمی
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-2 px-6">
          <Link
            href="/videos"
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
              !category
                ? "bg-brand text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/videos?category=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
                category === c
                  ? "bg-brand text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      <VideosGrid category={category} />
    </div>
  );
}
