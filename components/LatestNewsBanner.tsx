import Link from "next/link";
import { Newspaper, ArrowLeft } from "lucide-react";
import { getLatestNews } from "@/lib/data";

export default async function LatestNewsBanner() {
  const [latest] = await getLatestNews(1);
  if (!latest) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-20" dir="rtl">
      <div className="fade-in-up flex flex-col items-start gap-5 rounded-3xl border border-gray-200 border-r-4 border-r-brand bg-white p-6 shadow-sm dark:border-slate-700 dark:border-r-brand sm:flex-row sm:items-center sm:justify-between dark:bg-slate-900">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 text-brand dark:border-brand-800 dark:bg-brand-900/30">
            <Newspaper className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <span className="mb-1 block text-xs font-semibold text-brand-600 dark:text-brand-300">
              آخرین ماهنامه هوش مصنوعی
            </span>
            <h3 className="text-base font-bold leading-6 text-slate-900 dark:text-white sm:text-lg">
              {latest.title}
            </h3>
            {latest.published_at && (
              <time className="mt-1 block text-xs text-slate-400 dark:text-slate-500">
                {new Date(latest.published_at).toLocaleDateString("fa-IR")}
              </time>
            )}
          </div>
        </div>

        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={`/news/${latest.slug}`}
            className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-cta px-5 py-2.5 text-sm font-semibold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            بخوانید
          </Link>
          <Link
            href="/news"
            className="inline-flex cursor-pointer items-center justify-center gap-1 text-xs font-medium text-brand-600 transition-colors duration-200 hover:text-brand-700 dark:text-brand-300"
          >
            همه اخبار
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
