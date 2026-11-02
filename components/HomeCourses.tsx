import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";

// اعداد لاتین (مثلاً «16 ساعت» در فیلد مدت دوره) را فارسی می‌کند.
const toPersianDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

// تعداد ستون‌ها بر اساس تعداد دوره‌ها؛ موبایل همیشه یک ستون.
const GRID_COLS: Record<number, string> = {
  1: "md:grid-cols-1 md:max-w-md md:mx-auto",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export default async function HomeCourses() {
  const courses = (await getPublishedCourses()).slice(0, 4);
  if (!courses.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20" dir="rtl">
      {/* سرتیتر: عنوان سمت راست، دکمه «همه دوره‌ها» سمت چپ؛ در موبایل زیر هم */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold text-brand-600 dark:text-brand-400">
            دوره‌های آموزشی هوش مصنوعی
          </p>
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white md:text-5xl">
            آموزش روی کار واقعی خودتان،{" "}
            <span className="text-slate-400 lg:block dark:text-slate-500">نه مثال‌های کتابی</span>
          </h2>
        </div>

        <Link
          href="/services/ai-training-ahvaz"
          className="inline-flex min-h-11 w-fit shrink-0 items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-slate-800 transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-cta-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-slate-600 dark:text-slate-100 dark:hover:border-brand dark:hover:text-cta-fg dark:focus-visible:outline-brand-400"
        >
          همه دوره‌ها
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* کارت‌های تصویری؛ کل کارت لینک صفحه‌ی دوره است */}
      <div className={`grid gap-5 ${GRID_COLS[courses.length]}`}>
        {courses.map((course, idx) => (
          <Link
            key={course.id}
            href={`/services/courses/${course.slug}`}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="fade-in-up group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-[2rem] bg-brand-900 shadow-sm ring-1 ring-slate-900/5 transition-shadow duration-300 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 dark:ring-white/10 dark:focus-visible:outline-brand-400 md:min-h-[36rem]"
          >
            {course.image ? (
              <Image
                src={course.image}
                alt={course.title}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="-z-10 object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-700 to-brand-dark" aria-hidden="true" />
            )}

            {/* لایه سبز تیره: پایین کاملاً مات، تا وسط کارت شفاف */}
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-900 to-transparent to-50%"
              aria-hidden="true"
            />

            {course.duration && (
              <span className="absolute right-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-sm font-bold text-slate-900 shadow">
                {toPersianDigits(course.duration)}
              </span>
            )}

            {/* پشت متن همیشه تیره است، حتی اگر عنوان بلند باشد یا عکس روشن */}
            <div className="bg-gradient-to-t from-brand-900 from-35% via-brand-900/60 via-65% to-transparent p-6 pt-32 lg:p-7 lg:pt-32">
              <h3 className="mb-3 text-2xl font-extrabold leading-snug text-white">{course.title}</h3>
              {course.description && (
                <p className="mb-4 line-clamp-3 text-sm leading-7 text-white/85">{course.description}</p>
              )}
              {course.audience && (
                <p className="text-sm font-medium text-brand-300">{course.audience}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
