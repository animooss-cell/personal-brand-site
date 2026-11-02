import type { ContactSource } from "@/lib/types";

export type StatusFilter = "all" | "unread" | "read";
export const CONTACTS_PAGE_SIZE = 10;
export const STATUS_FILTERS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "unread", label: "خوانده‌نشده" },
  { value: "read", label: "خوانده‌شده" },
];

// فیلترها در URL می‌مانند (?source=…&status=…&page=…) تا با رفرش از دست نروند؛ مقدار پیش‌فرض در URL نوشته نمی‌شود.
export function contactsHref(params: { source: ContactSource | "all"; status: StatusFilter; page?: number }) {
  const q = new URLSearchParams();
  if (params.source !== "all") q.set("source", params.source);
  if (params.status !== "all") q.set("status", params.status);
  if (params.page && params.page > 1) q.set("page", String(params.page));
  const s = q.toString();
  return s ? `/admin/contacts?${s}` : "/admin/contacts";
}

export const faNum = (n: number) => n.toLocaleString("fa-IR");
