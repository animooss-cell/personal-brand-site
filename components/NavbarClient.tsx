"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import type { BlogCategoryWithCount } from "@/lib/data";

function BlogDesktopMenu({ categories }: { categories: BlogCategoryWithCount[] }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex cursor-pointer items-center gap-1 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
      >
        وبلاگ
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-10 mt-3 w-56 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <Link
            href="/blog"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
          >
            همه‌ی مقالات
          </Link>
          {categories.length > 0 && (
            <>
              <span className="my-1 block h-px bg-gray-100 dark:bg-slate-800" />
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/blog/category/${category.slug}`}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
                >
                  {category.label}
                </Link>
              ))}
            </>
          )}
        </div>
      )}
    </li>
  );
}

function BlogMobileAccordion({
  categories,
  onNavigate,
}: {
  categories: BlogCategoryWithCount[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <li>
      <div className="flex items-center justify-between rounded-lg px-3 py-2 text-slate-700 dark:text-slate-300">
        <Link
          href="/blog"
          onClick={onNavigate}
          className="text-base font-medium hover:text-brand-700 dark:hover:text-brand-300"
        >
          وبلاگ
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "بستن دسته‌بندی‌های وبلاگ" : "نمایش دسته‌بندی‌های وبلاگ"}
          onClick={() => setOpen((v) => !v)}
          className="cursor-pointer rounded-lg p-1.5 text-slate-500 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      </div>
      {open && categories.length > 0 && (
        <ul className="mr-3 flex flex-col gap-1 border-r border-gray-200 py-1 pr-3 dark:border-slate-700">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                onClick={onNavigate}
                className="block rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                {category.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NavbarClient({ blogCategories }: { blogCategories: BlogCategoryWithCount[] }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-4 md:mx-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-gray-200 bg-white px-5 py-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-mark-light.png"
            alt="عبدالله احمدیان"
            width={718}
            height={160}
            priority
            className="h-8 w-auto dark:hidden md:h-9"
          />
          <Image
            src="/logo-mark-dark.png"
            alt="عبدالله احمدیان"
            width={718}
            height={160}
            priority
            className="hidden h-8 w-auto dark:block md:h-9"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              خانه
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              درباره من
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              خدمات
            </Link>
          </li>
          <li>
            <Link
              href="/services/ai-training-ahvaz"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              دوره‌ها
            </Link>
          </li>
          <BlogDesktopMenu categories={blogCategories} />
          <li>
            <Link
              href="/downloads"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              دانلود رایگان
            </Link>
          </li>
          <li>
            <Link
              href="/news"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              اخبار هوش مصنوعی
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-400"
            >
              تماس
            </Link>
          </li>
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="cursor-pointer rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
          >
            رزرو جلسه رایگان
          </Link>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className="cursor-pointer rounded-lg p-2 text-slate-700 dark:text-slate-300"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:hidden">
          <ul className="flex flex-col gap-1">
            <li>
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                خانه
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                درباره من
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                خدمات
              </Link>
            </li>
            <li>
              <Link
                href="/services/ai-training-ahvaz"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                دوره‌ها
              </Link>
            </li>
            <BlogMobileAccordion categories={blogCategories} onNavigate={() => setOpen(false)} />
            <li>
              <Link
                href="/downloads"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                دانلود رایگان
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                اخبار هوش مصنوعی
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
              >
                تماس
              </Link>
            </li>
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
