import type { ContactSource } from "@/lib/types";

// دسته‌های پیام‌های تماس (ستون contacts.source؛ supabase/migration_contacts_source.sql).
export const CONTACT_SOURCES: { value: ContactSource; label: string; badge: string }[] = [
  { value: "contact", label: "تماس با ما", badge: "border-brand-200 bg-brand-50 text-brand-700" },
  {
    value: "course_registration",
    label: "ثبت‌نام دوره",
    badge: "border-brand-dark/20 bg-brand-dark/10 text-brand-dark",
  },
  { value: "waitlist", label: "لیست انتظار", badge: "border-brand bg-brand text-cta-fg" },
  { value: "other", label: "سایر", badge: "border-slate-200 bg-slate-100 text-slate-700" },
];

export function isContactSource(value: unknown): value is ContactSource {
  return CONTACT_SOURCES.some((s) => s.value === value);
}

export function contactSourceInfo(value: string) {
  return CONTACT_SOURCES.find((s) => s.value === value) ?? CONTACT_SOURCES[CONTACT_SOURCES.length - 1];
}
