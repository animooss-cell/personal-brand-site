import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Layers,
  Award,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { personRef } from "@/lib/schema";
import {
  CASE_STUDIES,
  CASE_STUDIES_FAQ,
  CASE_STUDIES_HUB,
  IMPLEMENTATION_STEPS,
  OVERALL_METRICS,
  caseStudyPath,
  caseStudyUrl,
} from "@/lib/case-studies";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import FaqAccordion from "@/components/FaqAccordion";

const h = CASE_STUDIES_HUB;

export const metadata: Metadata = {
  title: { absolute: h.metaTitle },
  description: h.metaDescription,
  alternates: { canonical: h.path },
  openGraph: {
    title: h.metaTitle,
    description: h.metaDescription,
    url: h.path,
    type: "website",
  },
};

export default function CaseStudiesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: h.title,
    description: h.metaDescription,
    url: `${SITE_URL}${h.path}`,
    author: personRef,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: CASE_STUDIES.map((c, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: caseStudyUrl(c.slug),
        name: c.title,
      })),
    },
    hasPart: CASE_STUDIES.map((c) => ({
      "@type": "Article",
      "@id": `${caseStudyUrl(c.slug)}#article`,
      url: caseStudyUrl(c.slug),
      name: c.title,
    })),
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CASE_STUDIES_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: h.title, path: h.path },
  ]);

  return (
    <div dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />

      {/* Hero Header */}
      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:px-12 md:py-20">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-brand-200">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            سابقه اجرای عملیاتی در صنایع مادر و سازمان‌ها
          </span>
          <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {h.title}
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            {h.intro}
          </p>
        </div>
      </section>

      {/* Overall Trackable KPI Metrics */}
      <section className="mx-auto -mt-8 max-w-6xl px-6 md:-mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OVERALL_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-gray-200/80 bg-white/95 p-6 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/95"
            >
              <div className="text-3xl font-extrabold text-brand-600 dark:text-brand-400">
                {metric.value}
              </div>
              <div className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                {metric.label}
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Case Studies Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center md:text-right">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
            گزارش پروژه‌ها و نتایج ملموس در صنایع
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 md:text-base">
            برای مشاهده سرفصل‌ها، چالش‌ها و نتایج دقیق هر پروژه روی آن کلیک کنید.
          </p>
        </div>

        <div className="grid gap-8">
          {CASE_STUDIES.map((c) => (
            <article
              key={c.slug}
              className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-brand-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-700 md:p-9"
            >
              {/* Header Badges */}
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                  {c.client.name}
                </span>
                {c.industry && (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {c.industry}
                  </span>
                )}
              </div>

              {/* Title & Summary */}
              <h3 className="mb-3 text-xl font-bold leading-snug text-slate-900 transition-colors duration-200 group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400 md:text-2xl">
                <Link href={caseStudyPath(c.slug)} className="focus:outline-none">
                  {c.title}
                </Link>
              </h3>
              <p className="mb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
                {c.summary}
              </p>

              {/* Impact Metrics Bar */}
              {c.impactStats && c.impactStats.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60 sm:grid-cols-4">
                  {c.impactStats.map((stat, sIdx) => (
                    <div key={sIdx} className="text-right">
                      <div className="text-lg font-black text-brand-700 dark:text-brand-300 md:text-xl">
                        {stat.value}
                      </div>
                      <div className="mt-0.5 text-xs font-medium text-slate-600 dark:text-slate-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Before & After Comparison Snapshot */}
              {(c.challenge || c.result) && (
                <div className="mb-6 grid gap-4 rounded-2xl border border-gray-100 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/60 sm:grid-cols-2">
                  {c.challenge && (
                    <div className="border-b border-gray-100 pb-3 dark:border-slate-800 sm:border-b-0 sm:border-l sm:pb-0 sm:pl-4">
                      <span className="mb-1 block text-xs font-bold text-amber-600 dark:text-amber-400">
                        مسئله و چالش اولیه:
                      </span>
                      <p className="text-xs leading-6 text-slate-600 dark:text-slate-300">
                        {c.challenge}
                      </p>
                    </div>
                  )}
                  {c.result && (
                    <div className="sm:pr-2">
                      <span className="mb-1 block text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        دستاورد و نتیجه سنجیده‌شده:
                      </span>
                      <p className="text-xs leading-6 text-slate-600 dark:text-slate-300">
                        {c.result}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Highlights Checklist */}
              {c.highlights && c.highlights.length > 0 && (
                <ul className="mb-6 space-y-2">
                  {c.highlights.map((hItem, hIdx) => (
                    <li
                      key={hIdx}
                      className="flex items-start gap-2 text-xs leading-6 text-slate-700 dark:text-slate-300 md:text-sm"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400"
                        aria-hidden="true"
                      />
                      <span>{hItem}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Card Footer Link */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-5 dark:border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {c.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href={caseStudyPath(c.slug)}
                  className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-bold text-brand-700 transition-colors duration-200 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
                >
                  مشاهده سرفصل‌ها و مستندات دوره
                  <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4-Step Methodology: How We Measure & Deliver */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="mb-3 inline-block rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              فرآیند اجرای اثربخش
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
              دوره‌های سازمانی چطور سنجیده و پیاده‌سازی می‌شوند؟
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400 md:text-base">
              از نیازسنجی تا پایش خروجی؛ هر مرحله با خروجی‌های ملموس و قابل ارزیابی همراه است.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IMPLEMENTATION_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="mb-4 text-3xl font-black text-brand-600/30 dark:text-brand-400/30">
                  {step.step}
                </span>
                <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 md:text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Target Industries */}
      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          سازمان‌ها و صنایعی که این دوره‌ها برای آن‌ها طراحی شده‌اند
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            صنایع سنگین، فولاد و متالورژی
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            پتروشیمی، نفت و گاز
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            دپارتمان‌های روابط عمومی و رسانه
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            مدیریت‌های مالی و بازرگانی
          </span>
          <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            دفاتر مدیریت ارشد و کارشناسان اداری
          </span>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl">
            پرسش‌های متداول کارفرمایان و مدیران منابع انسانی
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            پاسخ به سوالات متداول درباره نحوه برگزاری، محرمانگی و سنجش اثربخشی دوره‌ها.
          </p>
        </div>

        <FaqAccordion items={CASE_STUDIES_FAQ} />
      </section>

      {/* High-Converting CTA Box */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 p-8 text-center text-white md:p-14">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-2xl font-black md:text-4xl">
              می‌خواهید چنین نتایجی را در سازمان خود تکرار کنید؟
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-100 md:text-base">
              پیش از هر تصمیمی، یک جلسه ارزیابی نیازسنجی اختصاصی برگزار می‌کنیم تا گلوگاه‌های کاری تیم شما را بررسی و مناسب‌ترین سرفصل را طراحی کنیم.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
              >
                درخواست دوره و مشاوره سازمانی
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services/ai-training-ahvaz"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                مشاهده همه دوره‌های هوش مصنوعی
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
