import Link from "next/link";
import { BLOG_ARTICLE_CATEGORIES } from "@/lib/categories";

// دکمه‌های فیلتر دسته‌بندی بالای لیست مقالات؛ دقیقاً با همان الگوی بصری
// chips در app/downloads/page.tsx (رنگ فعال/غیرفعال، rounded-full) هماهنگ
// است تا رفتار سایت یکدست بماند — با این تفاوت که اینجا هر دسته یک مسیر
// مستقل (/blog/category/<slug>) دارد، نه یک query param، چون این الگو از
// قبل برای وبلاگ ساخته شده (SSG + canonical/title مستقل برای هر دسته).
export default function BlogCategoryChips({ activeSlug }: { activeSlug?: string }) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2 px-6">
      <Link
        href="/blog"
        className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
          !activeSlug
            ? "bg-brand text-white"
            : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
        }`}
      >
        همه
      </Link>
      {BLOG_ARTICLE_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors duration-200 ${
            activeSlug === category.slug
              ? "bg-brand text-white"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          }`}
        >
          {category.label}
        </Link>
      ))}
    </div>
  );
}
