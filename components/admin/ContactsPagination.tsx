import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ContactSource } from "@/lib/types";
import { contactsHref, faNum, type StatusFilter } from "@/components/admin/contactsHref";

// شماره‌ی صفحه‌ها: اول، آخر، و دو صفحه دور صفحه‌ی فعلی؛ بقیه «…».
function pageList(page: number, totalPages: number): (number | "gap")[] {
  const pages = new Set([1, totalPages, page - 1, page, page + 1].filter((p) => p >= 1 && p <= totalPages));
  const sorted = Array.from(pages).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
    out.push(p);
  });
  return out;
}

export default function ContactsPagination({
  source,
  status,
  page,
  totalPages,
  total,
}: {
  source: ContactSource | "all";
  status: StatusFilter;
  page: number;
  totalPages: number;
  total: number;
}) {
  if (total === 0) return null;
  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded-xl border px-3 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600";
  const idle = "border-gray-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700";
  const disabled = "pointer-events-none border-gray-100 bg-gray-50 text-slate-400";

  return (
    <nav aria-label="صفحه‌بندی پیام‌ها" className="mt-6 flex flex-col items-center gap-3">
      <p className="text-sm text-slate-500">
        صفحه‌ی {faNum(page)} از {faNum(totalPages)}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {page > 1 ? (
          <Link href={contactsHref({ source, status, page: page - 1 })} rel="prev" className={`${base} ${idle}`}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            قبلی
          </Link>
        ) : (
          <span aria-disabled="true" className={`${base} ${disabled}`}>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            قبلی
          </span>
        )}
        {pageList(page, totalPages).map((p, i) =>
          p === "gap" ? (
            <span key={`gap-${i}`} className="px-1 text-slate-400" aria-hidden="true">
              …
            </span>
          ) : (
            <Link
              key={p}
              href={contactsHref({ source, status, page: p })}
              aria-current={p === page ? "page" : undefined}
              aria-label={`صفحه‌ی ${faNum(p)}`}
              className={`${base} ${p === page ? "border-brand bg-brand font-bold text-cta-fg" : idle}`}
            >
              {faNum(p)}
            </Link>
          ),
        )}
        {page < totalPages ? (
          <Link href={contactsHref({ source, status, page: page + 1 })} rel="next" className={`${base} ${idle}`}>
            بعدی
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        ) : (
          <span aria-disabled="true" className={`${base} ${disabled}`}>
            بعدی
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
}
