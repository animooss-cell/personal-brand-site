import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DownloadsGrid from "@/components/DownloadsGrid";

const downloadsTitle = "منابع دانلودی | پرامپت، کتاب و اسکیل هوش مصنوعی";
const downloadsDescription =
  "پرامپت‌های آماده، کتاب‌ها و اسکیل‌های هوش مصنوعی برای دانلود رایگان؛ منابع عملی برای پیاده‌سازی هوش مصنوعی در کسب‌وکار شما.";

export const metadata: Metadata = {
  title: downloadsTitle,
  description: downloadsDescription,
  alternates: {
    canonical: "/downloads",
  },
  openGraph: {
    title: downloadsTitle,
    description: downloadsDescription,
    url: "/downloads",
  },
};

export const revalidate = 300;

export default async function DownloadsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const supabase = createClient();
  const { data: categoryRows } = await supabase
    .from("downloads")
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
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">منابع دانلودی</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            پرامپت‌های آماده، کتاب‌ها و اسکیل‌های عملی برای پیاده‌سازی هوش مصنوعی — رایگان و قابل دانلود
          </p>
        </div>
      </section>

      {categories.length > 0 && (
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-2 px-6">
          <Link
            href="/downloads"
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
              href={`/downloads?category=${encodeURIComponent(c)}`}
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

      <DownloadsGrid category={category} />
    </div>
  );
}
