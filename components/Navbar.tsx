"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "خانه" },
  { href: "/about", label: "درباره من" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/contact", label: "تماس" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
        <Link href="/" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="عبدالله احمدیان" style={{ height: "40px", width: "auto" }} />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden cursor-pointer rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 md:inline-block"
        >
          رزرو جلسه رایگان
        </Link>

        <button
          type="button"
          aria-label={open ? "بستن منو" : "باز کردن منو"}
          className="cursor-pointer rounded-lg p-2 text-slate-700 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg bg-brand px-3 py-2 text-center text-base font-semibold text-white"
              >
                رزرو جلسه رایگان
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
