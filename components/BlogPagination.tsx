import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function BlogPagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page <= 1 ? basePath : `${basePath}/page/${page}`);
  const prevHref = currentPage > 1 ? pageHref(currentPage - 1) : null;
  const nextHref = currentPage < totalPages ? pageHref(currentPage + 1) : null;

  return (
    <nav aria-label="صفحه‌بندی مقالات" className="mt-12 flex flex-wrap items-center justify-center gap-2" dir="rtl">
      {prevHref ? (
        <Link
          href={prevHref}
          className="flex h-9 cursor-pointer items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          صفحه قبل
        </Link>
      ) : (
        <span className="flex h-9 cursor-not-allowed items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-300 dark:text-slate-700">
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          صفحه قبل
        </span>
      )}

      <div className="flex flex-wrap items-center justify-center gap-1">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNumber = i + 1;
          const isActive = pageNumber === currentPage;
          return (
            <Link
              key={pageNumber}
              href={pageHref(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors duration-200 ${
                isActive
                  ? "bg-brand text-white"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {nextHref ? (
        <Link
          href={nextHref}
          className="flex h-9 cursor-pointer items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-600 transition-colors duration-200 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          صفحه بعد
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span className="flex h-9 cursor-not-allowed items-center gap-1 rounded-full px-3 text-sm font-semibold text-slate-300 dark:text-slate-700">
          صفحه بعد
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
