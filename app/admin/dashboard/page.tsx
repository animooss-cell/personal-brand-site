import { createClient } from "@/lib/supabase/server";
import { Newspaper, Mail, Briefcase, FileEdit } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = createClient();

  const [{ count: publishedCount }, { count: draftCount }, { count: contactCount }, { count: serviceCount }] =
    await Promise.all([
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
    ]);

  const cards = [
    { label: "پست‌های منتشرشده", value: publishedCount ?? 0, icon: Newspaper, href: "/admin/blog" },
    { label: "پیش‌نویس‌ها", value: draftCount ?? 0, icon: FileEdit, href: "/admin/blog" },
    { label: "پیام‌های تماس", value: contactCount ?? 0, icon: Mail, href: "/admin/contacts" },
    { label: "کارت‌های خدمات", value: serviceCount ?? 0, icon: Briefcase, href: "/admin/services" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">داشبورد</h1>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-2xl border border-gray-200 bg-white p-6 transition-shadow duration-200 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="mt-1 text-sm text-slate-500">{card.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
