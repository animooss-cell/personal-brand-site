import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "صفحه پیدا نشد",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center" dir="rtl">
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30">
        <FileQuestion className="h-7 w-7" aria-hidden="true" />
      </div>
      <h1 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">صفحه پیدا نشد</h1>
      <p className="mb-7 text-sm leading-7 text-slate-500 dark:text-slate-400">
        صفحه‌ای که دنبالش بودید پیدا نشد. ممکن است جابه‌جا شده یا حذف شده باشد.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
        >
          صفحه اصلی
        </Link>
        <Link
          href="/blog"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          وبلاگ
        </Link>
        <Link
          href="/services"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-gray-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          خدمات
        </Link>
      </div>
    </div>
  );
}
