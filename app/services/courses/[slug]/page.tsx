import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Course } from "@/lib/types";

async function getCourse(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Course | null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = await getCourse(params.slug);
  if (!course) return {};

  return {
    title: `${course.title} | دوره آموزشی`,
    description: course.description || undefined,
    alternates: { canonical: `/services/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: course.description || undefined,
      url: `/services/courses/${course.slug}`,
      images: course.image ? [course.image] : undefined,
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourse(params.slug);
  if (!course) notFound();

  return (
    <div dir="rtl">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-8 text-center">
          {course.audience && (
            <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              {course.audience}
            </span>
          )}
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            {course.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            {course.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {course.duration}
              </span>
            )}
            {course.level && (
              <span className="inline-flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {course.level}
              </span>
            )}
          </div>
        </div>

        {course.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.image} alt={course.title} className="mb-10 w-full rounded-3xl" />
        )}

        {course.description && (
          <p className="mb-10 text-base leading-8 text-slate-600">{course.description}</p>
        )}

        {course.outline.length > 0 && (
          <div className="mb-10 rounded-3xl border border-gray-200 bg-slate-50 p-7">
            <h2 className="mb-4 text-lg font-bold text-slate-900">سرفصل‌های آموزشی</h2>
            <ul className="flex flex-col gap-3">
              {course.outline.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose-content" dir="rtl" dangerouslySetInnerHTML={{ __html: course.content }} />
      </article>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            علاقه‌مند به برگزاری این دوره برای تیم خودتید؟
          </h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            یه جلسه رایگان با من داشته باش — بدون تعهد
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
          >
            رزرو جلسه / تماس
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
