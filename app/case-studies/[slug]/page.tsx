import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { personRef } from "@/lib/schema";
import { getCourseBySlug } from "@/lib/data";
import {
  CASE_STUDIES,
  CASE_STUDIES_HUB,
  CASE_STUDY_COURSE_LINK_LABEL,
  CASE_STUDY_SECTIONS,
  caseStudyPath,
  caseStudyUrl,
  getCaseStudy,
} from "@/lib/case-studies";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";

// همه‌ی نمونه‌کارها از lib/case-studies.ts می‌آیند و در زمان build ساخته می‌شوند (SSG)؛ لینک صفحه‌ی دوره‌ی مرتبط
// از دیتابیس خوانده می‌شود و هر ۵ دقیقه تازه می‌شود.
export const dynamicParams = false;
export const revalidate = 300;

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return {};
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: caseStudyPath(c.slug) },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: caseStudyPath(c.slug), type: "article" },
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();
  // فقط وقتی صفحه‌ی دوره واقعاً منتشر شده باشد لینک داده می‌شود
  const course = c.courseSlug ? await getCourseBySlug(c.courseSlug) : null;

  const url = caseStudyUrl(c.slug);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: c.title,
    description: c.metaDescription,
    url,
    mainEntityOfPage: url,
    inLanguage: "fa",
    author: personRef,
    publisher: personRef,
    about: { "@type": "Organization", name: c.client.name, ...(c.client.alternateName ? { alternateName: c.client.alternateName } : {}) },
    // نام رسمی دوره‌ها (برای نمونه‌کار چنددوره‌ای همه‌ی دوره‌ها)
    ...(c.courses || c.courseName
      ? { mentions: (c.courses?.map((k) => k.title) ?? [c.courseName as string]).map((name) => ({ "@type": "Course", name })) }
      : {}),
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: CASE_STUDIES_HUB.title, path: CASE_STUDIES_HUB.path },
    { name: c.title, path: caseStudyPath(c.slug) },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <p className="mb-4 text-sm font-medium text-brand-200">
            <Link href={CASE_STUDIES_HUB.path} className="hover:underline">
              {CASE_STUDIES_HUB.title}
            </Link>
            {" · "}
            {c.client.name}
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{c.title}</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-12 text-lg leading-9 text-slate-700 dark:text-slate-200">{c.summary}</p>

        {c.courses && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{CASE_STUDY_SECTIONS.courses}</h2>
            <ul className="mb-10 grid gap-4">
              {c.courses.map((k) => (
                <li key={k.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {k.slug ? (
                      <Link href={caseStudyPath(k.slug)} className="text-brand-700 hover:underline dark:text-brand-300">
                        {k.title}
                      </Link>
                    ) : (
                      k.title
                    )}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">برای {k.audience}</p>
                  {k.facts && <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{k.facts}</p>}
                </li>
              ))}
            </ul>
          </>
        )}

        {c.challenge && (
          <>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{CASE_STUDY_SECTIONS.challenge}</h2>
            <p className="mb-10 text-base leading-8 text-slate-600 dark:text-slate-300">{c.challenge}</p>
          </>
        )}

        {c.curriculum && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{CASE_STUDY_SECTIONS.curriculum}</h2>
            <ul className="mb-10 space-y-2 text-base leading-7 text-slate-600 dark:text-slate-300">
              {c.curriculum.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}

        {c.details && (
          <>
            <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">{CASE_STUDY_SECTIONS.details}</h2>
            <dl className="mb-10 grid gap-4 sm:grid-cols-3">
              {c.details.map((d) => (
                <div key={d.label} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
                  <dt className="mb-1 text-sm font-bold text-slate-900 dark:text-white">{d.label}</dt>
                  <dd className="text-sm leading-6 text-slate-600 dark:text-slate-300">{d.value}</dd>
                </div>
              ))}
            </dl>
          </>
        )}

        {course && (
          <p className="mb-10 text-base leading-8 text-slate-600 dark:text-slate-300">
            {CASE_STUDY_COURSE_LINK_LABEL}:{" "}
            <Link href={`/services/courses/${course.slug}`} className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
              {course.title}
            </Link>
          </p>
        )}

        {c.result && (
          <>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{CASE_STUDY_SECTIONS.result}</h2>
            <p className="mb-10 text-base leading-8 text-slate-600 dark:text-slate-300">{c.result}</p>
          </>
        )}

        <div className="rounded-2xl bg-brand-50/60 p-6 text-base leading-8 text-slate-600 dark:bg-brand-900/20 dark:text-slate-300">
          برای سازمان خودتان دوره‌ی مشابهی می‌خواهید؟ جزئیات دوره‌ها را در{" "}
          <Link href="/services/ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
            آموزش هوش مصنوعی در اهواز
          </Link>{" "}
          و{" "}
          <Link href="/services/corporate-ai-training" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
            دوره هوش مصنوعی سازمانی
          </Link>{" "}
          ببینید.
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
          >
            درخواست دوره برای سازمان شما
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </div>
  );
}
