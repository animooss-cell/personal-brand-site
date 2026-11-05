import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { HOME_COURSES_SECTION } from "@/lib/home";

// اعداد لاتین (مثلاً «16 ساعت» در فیلد مدت دوره) را فارسی می‌کند.
const toPersianDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

// تعداد ستون‌ها بر اساس تعداد دوره‌ها؛ موبایل همیشه یک ستون.
const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1 md:max-w-md md:mx-auto",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

// عرض واقعی هر ستون (محتوای بخش حداکثر ۱۲۳۲px، فاصله‌ی ستون‌ها ۲۰px) برای انتخاب اندازه‌ی تصویر.
const IMAGE_SIZES: Record<number, string> = {
  1: "(min-width: 768px) 448px, 100vw",
  2: "(min-width: 1280px) 606px, (min-width: 768px) 50vw, 100vw",
  3: "(min-width: 1280px) 397px, (min-width: 768px) 33vw, 100vw",
  4: "(min-width: 1280px) 293px, (min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
};

export default async function HomeCourses() {
  const courses = (await getPublishedCourses()).slice(0, 4);
  if (!courses.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20" dir="rtl">
      {/* سرتیتر: عنوان و زیرعنوان سمت راست، دکمه «همه دوره‌ها» سمت چپ؛ در موبایل زیر هم */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl">
            {HOME_COURSES_SECTION.heading}
          </h2>
          <p className="mt-3 text-lg font-medium text-slate-500 dark:text-slate-400 md:text-xl">
            {HOME_COURSES_SECTION.lead}
          </p>
        </div>

        <Link
          href={HOME_COURSES_SECTION.allHref}
          className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-slate-800 transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-cta-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-slate-600 dark:text-slate-100 dark:hover:border-brand dark:hover:text-cta-fg dark:focus-visible:outline-brand-400"
        >
          {HOME_COURSES_SECTION.allLabel}
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* کارت‌ها؛ کل کارت لینک صفحه‌ی دوره است و کارت‌های هم‌ردیف هم‌قد می‌شوند */}
      <div className={`grid gap-5 ${GRID_COLS[courses.length]}`}>
        {courses.map((course, idx) => (
          <Link
            key={course.id}
            href={`/services/courses/${course.slug}`}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="fade-in-up group flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand-900 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 dark:ring-white/10 dark:focus-visible:outline-brand-400"
          >
            {/* تصویر شاخص افقی دوره در قاب هم‌نسبت خودش (۱۶:۹) تا متن روی عکس بریده نشود */}
            <div className="relative isolate aspect-[16/9] overflow-hidden">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  sizes={IMAGE_SIZES[courses.length]}
                  className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-700 to-brand-dark" aria-hidden="true" />
              )}

              {/* محو نرم پایین عکس در بدنه‌ی کارت */}
              <div
                className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-transparent to-brand-900"
                aria-hidden="true"
              />

              {course.duration && (
                <span className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-bold text-slate-900 shadow">
                  {toPersianDigits(course.duration)}
                </span>
              )}
            </div>

            <div className="flex flex-1 flex-col px-5 pb-6 pt-3 xl:px-7 xl:pb-7">
              <h3 className="mb-3 line-clamp-2 text-xl font-extrabold leading-snug text-white">{course.title}</h3>
              {course.description && (
                <p className="mb-5 line-clamp-3 text-sm leading-7 text-white/85">{course.description}</p>
              )}
              {course.audience && (
                <p className="mt-auto text-sm font-medium text-brand-300">{course.audience}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
