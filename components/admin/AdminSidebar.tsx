"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  UserCircle,
  Mail,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/admin/blog", label: "وبلاگ", icon: Newspaper },
  { href: "/admin/services", label: "خدمات", icon: Briefcase },
  { href: "/admin/about", label: "درباره من", icon: UserCircle },
  { href: "/admin/contacts", label: "پیام‌ها", icon: Mail },
  { href: "/admin/settings", label: "تنظیمات", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 flex-shrink-0 flex-col border-l border-gray-200 bg-white px-4 py-6">
      <div className="mb-8 px-2 text-lg font-extrabold text-brand-700">پنل ادمین</div>

      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname?.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                active
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={handleLogout}
        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50"
      >
        <LogOut className="h-4 w-4" aria-hidden="true" />
        خروج
      </button>
    </aside>
  );
}
