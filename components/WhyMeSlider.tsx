"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft } from "lucide-react";

export type WhyMeSlide = {
  title: string;
  description: string;
  image: string;
  // بخشی از عنوان که با گرادیان رنگ می‌شود (باید عیناً داخل title باشد)
  highlight?: string;
};

const AUTOPLAY_MS = 6000;
const SWIPE_MIN_PX = 40;

const toPersianDigits = (n: number) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

function Title({ title, highlight }: { title: string; highlight?: string }) {
  const at = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || at === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, at)}
      <span className="bg-gradient-to-l from-brand-600 to-brand-dark bg-clip-text text-transparent dark:from-brand-300 dark:to-brand-500">
        {highlight}
      </span>
      {title.slice(at + highlight.length)}
    </>
  );
}

// دکمه‌ی گرد سفید با حاشیه و آیکون brand-dark (برای قبلی و بعدی)
const roundButton =
  "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark bg-white text-brand-dark transition-colors duration-200 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark dark:focus-visible:outline-brand-300 md:h-14 md:w-14";

export default function WhyMeSlider({ slides, label }: { slides: WhyMeSlide[]; label: string }) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((to: number) => setIndex(((to % count) + count) % count), [count]);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const autoplay = count > 1 && !reducedMotion && !hovered && !focused;

  // هر بار که اسلاید عوض می‌شود (خودکار یا دستی) شمارش ۶ ثانیه از نو شروع می‌شود.
  useEffect(() => {
    if (!autoplay) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [autoplay, index, next]);

  // راست‌به‌چپ: اسلاید بعدی سمت چپ است.
  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      prev();
    }
  }

  function onTouchStart(e: TouchEvent<HTMLDivElement>) {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  }

  function onTouchEnd(e: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy)) return;
    // کشیدن به راست اسلاید سمت چپ (بعدی) را می‌آورد.
    if (dx > 0) next();
    else prev();
  }

  const motion = reducedMotion ? "" : "transition-[opacity,transform] duration-500 ease-out";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="relative rounded-[2.5rem] border border-white/60 bg-white/50 p-4 shadow-2xl shadow-brand-dark/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/30 sm:p-6 md:p-10 lg:p-12"
    >
      {/* همه‌ی اسلایدها روی هم در یک خانه‌ی grid؛ ارتفاع پنل همیشه به اندازه‌ی بلندترین اسلاید است و نمی‌پرد. */}
      <div
        className="grid"
        aria-live={autoplay ? "off" : "polite"}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${toPersianDigits(i + 1)} از ${toPersianDigits(count)}`}
              aria-hidden={active ? undefined : true}
              // اسلاید غیرفعال inert است تا چیزی از آن focus نگیرد (React 18 این ویژگی را مستقیم نمی‌پذیرد).
              ref={(el) => {
                if (el) el.inert = !active;
              }}
              className={`col-start-1 row-start-1 grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_40%] md:gap-10 lg:gap-14 ${motion} ${
                active ? "z-10 translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"
              }`}
            >
              {/* عکس: در دسکتاپ ستون چپ (۴۰٪)، در موبایل بالا و تمام‌عرض */}
              <div className="relative [--btn:3rem] md:order-2 md:[--btn:3.5rem]">
                <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/60 [-webkit-mask-image:radial-gradient(circle_at_calc(100%-var(--btn)/2)_calc(100%-var(--btn)/2),transparent_calc(var(--btn)/2+0.5rem),black_calc(var(--btn)/2+0.5rem+1px))] [mask-image:radial-gradient(circle_at_calc(100%-var(--btn)/2)_calc(100%-var(--btn)/2),transparent_calc(var(--btn)/2+0.5rem),black_calc(var(--btn)/2+0.5rem+1px))] dark:border-white/10">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1152px) 420px, (min-width: 768px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
                {/* دکمه‌ی گرد در بریدگی گوشه‌ی پایین-راست عکس: اسلاید قبلی */}
                <button
                  type="button"
                  onClick={prev}
                  tabIndex={active ? 0 : -1}
                  aria-label="اسلاید قبلی"
                  className={`absolute bottom-0 right-0 ${roundButton}`}
                >
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* متن: در دسکتاپ ستون راست */}
              <div className="flex h-full flex-col justify-center md:order-1">
                <h3 className="text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl md:text-4xl">
                  <Title title={slide.title} highlight={slide.highlight} />
                </h3>
                <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300 md:mt-5">{slide.description}</p>
                {/* جای خالی هم‌اندازه‌ی ردیف کنترل‌ها تا متن هیچ‌وقت زیر آن نرود */}
                <div className="mt-6 h-12 shrink-0 md:mt-8 md:h-14" aria-hidden="true" />
              </div>
            </div>
          );
        })}
      </div>

      {/* کنترل‌ها: پایین سمت راست پنل (موبایل: وسط‌چین زیر متن) */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 flex items-center justify-center gap-4 sm:inset-x-6 sm:bottom-6 md:inset-x-10 md:bottom-10 md:justify-start lg:inset-x-12 lg:bottom-12">
        <button type="button" onClick={next} aria-label="اسلاید بعدی" className={`pointer-events-auto ${roundButton}`}>
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="pointer-events-auto flex items-center">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => go(i)}
              aria-label={`رفتن به اسلاید ${toPersianDigits(i + 1)}`}
              aria-current={i === index ? "true" : undefined}
              className="group/dot inline-flex h-8 min-w-[1.75rem] items-center justify-center rounded-full px-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand-dark dark:focus-visible:outline-brand-300"
            >
              <span
                className={`block h-2.5 rounded-full ${reducedMotion ? "" : "transition-all duration-300"} ${
                  i === index ? "w-8 bg-brand" : "w-2.5 bg-brand-200 group-hover/dot:bg-brand-300 dark:bg-brand-200/40"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
