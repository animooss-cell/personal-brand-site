import Link from "next/link";
import { CONTACT_SOURCES } from "@/lib/contactSources";
import type { ContactSource } from "@/lib/types";
import { contactsHref, faNum, STATUS_FILTERS, type StatusFilter } from "@/components/admin/contactsHref";

// تب‌های دسته + فیلتر وضعیت. هر لینک صفحه را به ۱ برمی‌گرداند (page در href نمی‌آید).
export default function ContactsFilters({
  source,
  status,
  sourceCounts,
  statusCounts,
}: {
  source: ContactSource | "all";
  status: StatusFilter;
  sourceCounts: Record<string, number>;
  statusCounts: Record<string, number>;
}) {
  const tabs = [{ value: "all" as const, label: "همه" }, ...CONTACT_SOURCES];
  const pill = (active: boolean) =>
    `inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
      active
        ? "border-brand bg-brand text-cta-fg"
        : "border-gray-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700"
    }`;
  const count = (active: boolean) =>
    `rounded-full px-2 py-0.5 text-xs font-bold ${active ? "bg-white/70 text-cta-fg" : "bg-slate-100 text-slate-600"}`;

  return (
    <div className="mb-5 flex flex-col gap-3">
      <nav aria-label="دسته‌ی پیام" className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const active = tab.value === source;
          return (
            <Link
              key={tab.value}
              href={contactsHref({ source: tab.value, status })}
              aria-current={active ? "page" : undefined}
              className={pill(active)}
            >
              {tab.label}
              <span className={count(active)}>{faNum(sourceCounts[tab.value] ?? 0)}</span>
            </Link>
          );
        })}
      </nav>
      <nav aria-label="وضعیت خواندن" className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-slate-500">وضعیت:</span>
        {STATUS_FILTERS.map((st) => {
          const active = st.value === status;
          return (
            <Link
              key={st.value}
              href={contactsHref({ source, status: st.value })}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                active
                  ? "border-brand-dark bg-brand-dark text-white"
                  : "border-gray-200 bg-white text-slate-700 hover:border-brand-dark/40"
              }`}
            >
              {st.label}
              <span className={`text-xs ${active ? "text-white/80" : "text-slate-500"}`}>
                {faNum(statusCounts[st.value] ?? 0)}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
