import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ContactsTable from "@/components/admin/ContactsTable";
import ContactsFilters from "@/components/admin/ContactsFilters";
import ContactsPagination from "@/components/admin/ContactsPagination";
import { CONTACT_SOURCES, isContactSource } from "@/lib/contactSources";
import { ContactMessage, type ContactSource } from "@/lib/types";
import {
  CONTACTS_PAGE_SIZE as PAGE_SIZE,
  contactsHref,
  STATUS_FILTERS,
  type StatusFilter,
} from "@/components/admin/contactsHref";

const STATUSES: StatusFilter[] = STATUS_FILTERS.map((s) => s.value);

type SearchParams = { source?: string; status?: string; page?: string };

export default async function AdminContactsPage({ searchParams }: { searchParams: SearchParams }) {
  const source: ContactSource | "all" = isContactSource(searchParams.source) ? searchParams.source : "all";
  const status: StatusFilter = STATUSES.includes(searchParams.status as StatusFilter)
    ? (searchParams.status as StatusFilter)
    : "all";
  const requestedPage = Math.max(1, Math.floor(Number(searchParams.page)) || 1);

  const supabase = createClient();

  // شمارنده‌ها سمت سرور با count (بدون آوردن ردیف‌ها): هر تب دسته با فیلتر وضعیت فعلی، و هر دکمه‌ی وضعیت با دسته‌ی فعلی.
  const countWhere = (s: ContactSource | "all", st: StatusFilter) => {
    let q = supabase.from("contacts").select("id", { count: "exact", head: true });
    if (s !== "all") q = q.eq("source", s);
    if (st !== "all") q = q.eq("read", st === "read");
    return q.then(({ count }) => count ?? 0);
  };
  const [sourceCounts, statusCounts] = await Promise.all([
    Promise.all((["all", ...CONTACT_SOURCES.map((s) => s.value)] as const).map((s) => countWhere(s, status))),
    Promise.all(STATUSES.map((st) => countWhere(source, st))),
  ]);

  const total = statusCounts[STATUSES.indexOf(status)];
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  // صفحه‌ی بیش از آخرین صفحه (مثلاً بعد از حذف آخرین پیام یک صفحه) → آخرین صفحه‌ی موجود
  if (requestedPage > totalPages) redirect(contactsHref({ source, status, page: totalPages }));
  const page = requestedPage;

  // صفحه‌بندی سمت سرور: فقط همین ۱۰ پیام از دیتابیس خوانده می‌شود، جدیدترین اول.
  let query = supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })
    .order("id", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (source !== "all") query = query.eq("source", source);
  if (status !== "all") query = query.eq("read", status === "read");
  const { data: contacts, error } = await query;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">پیام‌های تماس</h1>
      <ContactsFilters
        source={source}
        status={status}
        sourceCounts={Object.fromEntries(
          (["all", ...CONTACT_SOURCES.map((s) => s.value)] as const).map((s, i) => [s, sourceCounts[i]]),
        )}
        statusCounts={Object.fromEntries(STATUSES.map((st, i) => [st, statusCounts[i]]))}
      />
      {error ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">
          خواندن پیام‌ها با خطا مواجه شد. اگر migration ستون source هنوز اجرا نشده، اول
          supabase/migration_contacts_source.sql را اجرا کنید.
        </p>
      ) : (
        <ContactsTable contacts={(contacts ?? []) as ContactMessage[]} />
      )}
      <ContactsPagination source={source} status={status} page={page} totalPages={totalPages} total={total} />
    </div>
  );
}
