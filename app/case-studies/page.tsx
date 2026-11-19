import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Users,
  ShieldCheck,
  Layers,
  Award,
  Factory,
  Flame,
  Megaphone,
  BarChart3,
  Rocket,
  MessageCircle,
  Phone,
  FileSpreadsheet,
  ChevronLeft,
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
import { toWhatsappHref } from "@/lib/social";
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
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "نمونه‌کارهای هوش مصنوعی عبدالله احمدیان",
      },
    ],
  },
};

const TARGET_INDUSTRIES = [
  { name: "صنایع سنگین، فولاد و متالورژی", desc: "اتوماسیون گزارش‌ها و پایش تولید", icon: Factory },
  { name: "پتروشیمی، نفت و انرژی", desc: "خلاصه‌سازی اسناد فنی و صورت‌جلسات", icon: Flame },
  { name: "روابط عمومی، رسانه و برند", desc: "تولید خبر، سناریو و تحلیل افکار عمومی", icon: Megaphone },
  { name: "مدیریت‌های مالی و بازرگانی", desc: "داشبوردسازی و پردازش اسناد و داده", icon: BarChart3 },
  { name: "دفاتر مدیریت ارشد و هلدینگ‌ها", desc: "تصمیم‌گیری سریع مبتنی بر سنتز اطلاعات", icon: Building2 },
  { name: "استارتاپ‌ها و شرکت‌های دانش‌بنیان", desc: "طراحی بوم مدل کسب‌وکار و رشد", icon: Rocket },
];

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

  const featuredStudy = CASE_STUDIES[0];
  const otherStudies = CASE_STUDIES.slice(1);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16">
      {/* اسکیماهای ساختاریافته گوگل */}
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

      {/* مسیر صفحه (Breadcrumb) */}
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-8">
        <nav aria-label="مسیر راهنما" className="text-xs text-slate-500 dark:text-slate-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                خانه
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-700 dark:text-slate-200">{h.title}</li>
          </ol>
        </nav>
      </div>

      {/* هیرو بخش نمونه‌کارها با چیدمان دونمایی لوکس (Executive 2-Column Hero) */}
      <section className="px-4 pt-4 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-6 text-white shadow-2xl md:p-12 lg:p-16 border border-brand-500/20">
          {/* افکت نوری محو در پس‌زمینه */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-300/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* ستون راست: متن و پیام ارزش */}
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400"></span>
                </span>
                سابقه اجرای عملیاتی در صنایع مادر و سازمان‌ها
              </div>

              <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
                {h.title}
              </h1>

              <p className="mt-4 text-base leading-8 text-slate-200 md:text-lg">
                {h.intro}
              </p>

              {/* نشان‌های اعتماد و مشخصات دوره‌ها */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-xs md:text-sm text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>تولید، مالی، بازرگانی و روابط عمومی</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>سرفصل‌های ۱۰۰٪ سفارشی و بومی‌شده</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>پروتکل‌های محرمانگی داده‌های صنعتی</span>
                </div>
              </div>

              {/* کلیدهای اقدام اصلی هیرو */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 text-sm font-bold text-cta-fg shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
                >
                  درخواست ارزیابی برای سازمان شما
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>

                <a
                  href={toWhatsappHref("09161002550")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-6 py-4 text-sm font-bold text-emerald-300 backdrop-blur-sm transition-all duration-200 hover:bg-emerald-500/25"
                >
                  <MessageCircle className="h-4 w-4" />
                  مشاوره فوری در واتساپ
                </a>
              </div>
            </div>

            {/* ستون چپ: ویترین کارت آماری برجسته */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 bg-slate-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-md">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="text-xs font-bold text-brand-300 uppercase tracking-wider">
                    شاخص‌های تجمعی پروژه‌ها
                  </div>
                  <span className="rounded-full bg-brand-500/20 px-2.5 py-1 text-[11px] font-semibold text-brand-400">
                    مستند و سنجیده‌شده
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-brand-400">۸۰٪</div>
                    <div className="mt-1 text-xs font-semibold text-white">تسریع در گزارش‌نویسی</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">صرفه‌جویی ساعت کاری پرسنل</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-brand-400">۵+</div>
                    <div className="mt-1 text-xs font-semibold text-white">دوره سازمانی برگزارشده</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">فولاد خوزستان و اکسین</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-brand-400">۱۰۰+</div>
                    <div className="mt-1 text-xs font-semibold text-white">مدیر و کارشناس</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">آموزش‌دیده پشت سیستم</div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                    <div className="text-3xl font-black text-brand-400">۳۲+</div>
                    <div className="mt-1 text-xs font-semibold text-white">ساعت کارگاه عملی</div>
                    <div className="mt-0.5 text-[10px] text-slate-400">روی سناریوهای واقعی</div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-center">
                  <p className="text-[11px] text-slate-300">
                    تعهد ما: هیچ ابزار لوکس و بدون کاربرد آموزش داده نمی‌شود؛ تمرکز بر بازدهی اقتصادی مستقیم است.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* نوار سنجه‌های عملکردی قابل اندازه‌گیری (KPI Bento Strip) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {OVERALL_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900 text-center"
            >
              <div className="text-3xl font-black text-brand-600 dark:text-brand-400">
                {metric.value}
              </div>
              <div className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                {metric.label}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-5">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* پروژه ویژه و شاخص: مجموعه ۵ دوره فولاد خوزستان (Featured Spotlight Project) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">پروژه شاخص سازمانی</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            تجربه پیاده‌سازی در فولاد خوزستان
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            جامع‌ترین برنامه توانمندسازی هوش مصنوعی سازمانی برای دپارتمان‌های کلیدی صنایع فولاد
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-500/30 bg-gradient-to-br from-white via-brand-50/20 to-white p-7 shadow-xl dark:border-brand-500/30 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-950 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Factory className="h-6 w-6" />
              </div>
              <div>
                <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  {featuredStudy.industry}
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white md:text-2xl mt-1">
                  {featuredStudy.title}
                </h3>
              </div>
            </div>

            <span className="rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-bold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {featuredStudy.client.name}
            </span>
          </div>

          <p className="text-sm leading-8 text-slate-700 dark:text-slate-300 md:text-base mb-8">
            {featuredStudy.summary}
          </p>

          {/* نوار آماری ۴ تایی این پروژه */}
          {featuredStudy.impactStats && (
            <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {featuredStudy.impactStats.map((stat, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl border border-gray-150 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-slate-800/80"
                >
                  <div className="text-2xl font-black text-brand-600 dark:text-brand-400">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* دوره‌های زیرمجموعه این پروژه */}
          {featuredStudy.courses && (
            <div className="mb-8 rounded-2xl border border-gray-200/80 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                ۵ دوره برگزارشده برای دپارتمان‌های مختلف شرکت:
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {featuredStudy.courses.map((course, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-5">
                        {course.title}
                      </div>
                      <div className="mt-1 text-[11px] text-brand-700 dark:text-brand-300">
                        مخاطبان: {course.audience}
                      </div>
                    </div>
                    {course.facts && (
                      <div className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
                        {course.facts}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* برجستگی‌ها و دستاوردهای کلیدی */}
          {featuredStudy.highlights && (
            <div className="mb-8 space-y-2.5">
              {featuredStudy.highlights.map((hItem, hIdx) => (
                <div key={hIdx} className="flex items-start gap-2.5 text-xs leading-6 text-slate-700 dark:text-slate-300 md:text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600 dark:text-brand-400" />
                  <span>{hItem}</span>
                </div>
              ))}
            </div>
          )}

          {/* کلید اقدام و برچسب‌ها */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {featuredStudy.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  #{t}
                </span>
              ))}
            </div>

            <Link
              href={caseStudyPath(featuredStudy.slug)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-6 py-3 text-xs font-bold text-cta-fg shadow-md transition-all hover:bg-cta-hover hover:scale-105"
            >
              مشاهده جزئیات کامل و سرفصل‌های دوره
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* سایر پروژه‌های مستند شده (Bento Grid of Other Case Studies) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">سایر سوابق شاخص</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            سایر پروژه‌ها و کارگاه‌های عملیاتی
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            از فولاد اکسین و رسانه تا سازمان‌های تهران و هکاتون‌های بین‌المللی
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {otherStudies.map((c) => (
            <article
              key={c.slug}
              className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                {/* برچسب‌های بالای کارت */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    <Building2 className="h-3.5 w-3.5" />
                    {c.client.name}
                  </span>
                  {c.industry && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {c.industry}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug mb-3">
                  <Link href={caseStudyPath(c.slug)} className="focus:outline-none">
                    {c.title}
                  </Link>
                </h3>

                <p className="text-xs leading-6 text-slate-600 dark:text-slate-300 mb-5 line-clamp-3">
                  {c.summary}
                </p>

                {/* آمارهای تأثیرگذاری این پروژه */}
                {c.impactStats && c.impactStats.length > 0 && (
                  <div className="mb-5 grid grid-cols-2 gap-2.5 rounded-2xl bg-slate-50 p-3.5 dark:bg-slate-800/60">
                    {c.impactStats.slice(0, 4).map((stat, sIdx) => (
                      <div key={sIdx} className="text-right">
                        <div className="text-base font-black text-brand-600 dark:text-brand-400">
                          {stat.value}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* مقایسه چالش و نتیجه */}
                {(c.challenge || c.result) && (
                  <div className="mb-5 space-y-2 rounded-2xl border border-gray-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/40 text-xs">
                    {c.challenge && (
                      <div>
                        <span className="font-bold text-amber-600 dark:text-amber-400">مسئله: </span>
                        <span className="text-slate-600 dark:text-slate-300">{c.challenge}</span>
                      </div>
                    )}
                    {c.result && (
                      <div>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">دستاورد: </span>
                        <span className="text-slate-600 dark:text-slate-300">{c.result}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* پایین کارت و لینک جزئیات */}
              <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {c.tags?.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <Link
                  href={caseStudyPath(c.slug)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  مشاهده سرفصل‌ها
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* متدولوژی ۴ مرحله‌ای پیاده‌سازی و سنجش اثربخشی (4-Step Connected Workflow) */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-b from-white to-slate-50 border border-gray-200 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">متدولوژی اختصاصی</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
              دوره‌های سازمانی چطور سنجیده و پیاده‌سازی می‌شوند؟
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              از نیازسنجی دقیق تا پایش خروجی؛ هر گام با خروجی ملموس و قابل ارزیابی همراه است.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {IMPLEMENTATION_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 font-black text-sm">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">مرحله {step.step}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-6">
                    {step.title}
                  </h3>

                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>تضمین خروجی کاربردی</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* صنایع تحت پوشش (Target Industries Cards) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">سازگاری صنعتی</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            صنایع و سازمان‌های هدف این دوره‌ها
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            راهکارهایی بومی‌سازی شده برای متناسب‌ترین صنایع با نیاز به اتوماسیون داده و گزارش
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TARGET_INDUSTRIES.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.name}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-500/40 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {ind.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-5">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* بخش پرسش‌های متداول (FAQ Accordion with Schema) */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">پاسخ به سوالات</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            پرسش‌های متداول مدیران و کارفرمایان
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            پاسخ شفاف به سوالات پیرامون سفارشی‌سازی سرفصل‌ها، محرمانگی اسناد و نحوه سنجش بازدهی
          </p>
        </div>

        <FaqAccordion items={CASE_STUDIES_FAQ} />
      </section>

      {/* هاب تبدیل نهایی سازمانی (Enterprise Conversion Hub) */}
      <section className="mx-auto max-w-5xl px-4 pt-8 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-8 text-white shadow-2xl md:p-14 border border-brand-500/30 text-center">
          {/* جلوه نوری محو */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-400/15 border border-brand-400/30 px-4 py-1.5 text-xs font-bold text-brand-300 mb-4 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-brand-400" />
              جلسه اختصاصی نیازسنجی دپارتمان‌ها
            </span>

            <h2 className="text-2xl font-black md:text-4xl text-white leading-tight">
              می‌خواهید چنین نتایجی را در سازمان خود تکرار کنید؟
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-200 md:text-base">
              پیش از هر تصمیم یا هزینه‌کردی، در یک جلسه ۴۵ دقیقه‌ای رایگان گلوگاه‌های کاری تیم شما را بررسی کرده و سرفصل‌های اختصاصی سازمان‌تان را طراحی می‌کنیم.
            </p>

            {/* کلیدهای تبدیل */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-fg shadow-xl shadow-brand-500/30 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
              >
                درخواست دوره و مشاوره سازمانی
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>

              <a
                href={toWhatsappHref("09161002550")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-7 py-4 text-sm font-bold text-emerald-300 backdrop-blur-sm transition-all duration-200 hover:bg-emerald-500/30"
              >
                <MessageCircle className="h-4 w-4" />
                گفتگوی مستقیم با مدرس در واتساپ
              </a>
            </div>

            {/* راه‌های ارتباط مستقیم */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="text-xs font-medium text-slate-300 mb-3">تماس مستقیم با مدیریت دوره‌ها:</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:09161002550"
                  dir="ltr"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-400" />
                  0916 100 2550
                </a>
                <a
                  href="tel:09163070748"
                  dir="ltr"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-400" />
                  0916 307 0748
                </a>
                <Link
                  href="/services/ai-training-ahvaz"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-brand-300 hover:bg-white/10 transition-colors"
                >
                  مشاهده همه دوره‌های هوش مصنوعی
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
