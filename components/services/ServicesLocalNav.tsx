"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NAV_SECTIONS } from "@/components/services/sections";

// نوار ناوبری چسبان صفحه‌ی خدمات؛ درست زیر هدر شناور سایت (top-4 + ارتفاع ۶۶px = ۸۲px) می‌چسبد و بخش در دید را مشخص می‌کند.
// ۸px بالای آن (pt-2) فاصله‌ی زیر هدر را می‌پوشاند تا محتوا از لای آن دیده نشود.
export default function ServicesLocalNav() {
  // مثل مرجع، تا وقتی هیچ بخشی در دید نیست، اولین بخش فعال نشان داده می‌شود.
  const [active, setActive] = useState<string>(NAV_SECTIONS[0].id);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = NAV_SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-170px 0px -55% 0px" }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // روی موبایل لینک‌ها در یک ردیف افقی اسکرول می‌شوند؛ لینک فعال را در دید نگه می‌داریم.
  useEffect(() => {
    const scroller = scrollerRef.current;
    const link = scroller?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!scroller || !link || scroller.scrollWidth <= scroller.clientWidth) return;
    // با مختصات صفحه حساب می‌شود تا در جهت راست‌به‌چپ (scrollLeft منفی) هم درست کار کند.
    const s = scroller.getBoundingClientRect();
    const l = link.getBoundingClientRect();
    scroller.scrollBy({ left: l.left + l.width / 2 - (s.left + s.width / 2), behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="بخش‌های این صفحه"
      className="sticky top-[82px] z-40 border-b pt-2 border-[var(--svc-line)] bg-[var(--svc-nav)] backdrop-blur-md"
    >
      <div className="mx-auto flex min-h-[60px] max-w-[1240px] items-center justify-between gap-3 px-8 sm:flex-wrap">
        <div
          ref={scrollerRef}
          className="flex min-w-0 flex-1 gap-x-[26px] gap-y-1 overflow-x-auto whitespace-nowrap text-sm font-medium [scrollbar-width:none] sm:flex-none sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {NAV_SECTIONS.map(({ id, navLabel }) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center transition-colors duration-200 hover:text-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)] ${
                active === id ? "text-[var(--svc-ink)]" : "text-[var(--svc-ink5)]"
              }`}
            >
              {navLabel}
            </a>
          ))}
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-cta px-[18px] text-sm font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
        >
          جلسه رایگان
        </Link>
      </div>
    </nav>
  );
}
