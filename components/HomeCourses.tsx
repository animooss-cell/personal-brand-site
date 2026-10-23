import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";

export default async function HomeCourses() {
  const courses = (await getPublishedCourses()).slice(0, 3);
  if (!courses.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20" dir="rtl">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          دوره‌های آموزشی هوش مصنوعی
        </h2>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {courses.map((course, idx) => (
          <Link
            key={course.id}
            href={`/services/courses/${course.slug}`}
            style={{ animationDelay: `${idx * 100}ms` }}
            className="fade-in-up flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
          >
            {course.audience && (
              <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {course.audience}
              </span>
            )}
            <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
            {course.description && (
              <p className="line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {course.description}
              </p>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          href="/services/ai-training-ahvaz"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border-2 border-brand px-6 py-2.5 text-sm font-bold text-brand transition-colors duration-200 hover:bg-brand hover:text-white"
        >
          همه دوره‌ها
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
