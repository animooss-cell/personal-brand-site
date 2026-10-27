import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import ServicesHero from "@/components/services/ServicesHero";
import ProofStrip from "@/components/services/ProofStrip";
import ServicesLocalNav from "@/components/services/ServicesLocalNav";
import ServiceChapters from "@/components/services/ServiceChapters";
import servicesTheme from "@/components/services/servicesTheme.module.css";

export const revalidate = 300;

const servicesTitle = "خدمات مشاوره و آموزش هوش مصنوعی در اهواز";
const servicesDescription =
  "مشاوره کسب‌وکار، مشاوره رشد، آموزش هوش مصنوعی و تولید محتوا با AI برای کسب‌وکارهای اهواز و خوزستان — همه‌ی خدمات در یک نگاه، با جلسه‌ی اول رایگان.";

export const metadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: servicesTitle,
    description: servicesDescription,
    url: "/services",
  },
};

// فهرست صفحه‌های اختصاصی خدمات؛ فقط برای اسکیمای ItemList (عنوان و آدرس‌ها بدون تغییر).
const dedicatedServices = [
  { href: "/services/ai-business-consulting", title: "مشاور کسب‌وکار با هوش مصنوعی" },
  { href: "/services/ai-growth-consulting", title: "مشاور توسعه و رشد کسب‌وکار" },
  { href: "/services/ai-training-ahvaz", title: "آموزش هوش مصنوعی در اهواز" },
  { href: "/services/ai-content-generation", title: "تولید محتوا با هوش مصنوعی" },
];

export default async function ServicesPage() {
  const courses = await getPublishedCourses();

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: dedicatedServices.map((service, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: service.title,
      url: `${SITE_URL}${service.href}`,
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
  ]);

  return (
    // توکن‌های طراحی جدید فقط روی همین صفحه فعال‌اند؛ هدف لینک‌های داخلی زیر هدر و نوار چسبان قرار می‌گیرد.
    <div dir="rtl" className={`${servicesTheme.root} [&_[id]]:scroll-mt-[170px]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <ServicesHero title={servicesTitle} />
      <ProofStrip />
      <ServicesLocalNav />

      <section className="px-4 pt-10 md:px-8">
        <p className="fade-in-up mx-auto max-w-3xl text-center text-base leading-7 text-slate-600 dark:text-slate-300">
          اینجا خدمات مشاوره و آموزش هوش مصنوعی برای کسب‌وکارهای اهواز و خوزستان را در یک نگاه می‌بینید: از
          اولین قدم در پیاده‌سازی هوش مصنوعی تا مشاوره‌ی رشد، تولید محتوا و آموزش تیم شما. هر خدمت صفحه‌ی
          مستقل خودش را دارد تا دقیقاً ببینید فرآیند کار، خروجی‌ها و نحوه‌ی همکاری در هرکدام چگونه است. از
          جمله‌ی همکاری‌های اخیر، می‌توان به آموزش هوش مصنوعی برای فولاد خوزستان و همکاری با بسیج رسانه
          خوزستان در آموزش و به‌کارگیری هوش مصنوعی اشاره کرد. اگر هنوز نمی‌دانید کدام خدمت متناسب با وضعیت
          فعلی کسب‌وکار شماست، می‌توانید مستقیم یک جلسه‌ی رایگان رزرو کنید تا با هم مسیر درست را پیدا کنیم.
        </p>
      </section>

      <ServiceChapters />

      {/* بخش ۲ — آموزش‌ها */}
      <section id="training" className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">آموزش‌ها</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
            آموزش‌های تخصصی ابزارهای هوش مصنوعی برای رشد سازمان‌ها و کسب‌وکارها
          </p>
          {/* لینک داخلی صفحه‌ی آموزش (قبلاً در کارت‌های «همه خدمات» بود) تا فصل آموزش جایگزین این بخش شود. */}
          <Link
            href="/services/ai-training-ahvaz"
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:underline dark:text-brand-300"
          >
            جزئیات کامل: آموزش هوش مصنوعی در اهواز
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {courses.map((course, idx) => (
              <Link
                key={course.id}
                href={`/services/courses/${course.slug}`}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="fade-in-up flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                {course.image && (
                  <div className="relative h-44 w-full">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7">
                  {course.audience && (
                    <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                      {course.audience}
                    </span>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">{course.title}</h3>
                  {course.description && (
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{course.description}</p>
                  )}
                  {(course.duration || course.level) && (
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500 dark:text-slate-400">
                      {course.duration && <span>{course.duration}</span>}
                      {course.level && <span>{course.level}</span>}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400">هنوز دوره‌ای منتشر نشده است.</p>
        )}

        {/* دوره‌های در راه */}
        <div className="fade-in-up mt-8 rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-8 text-center dark:border-brand-800 dark:bg-brand-900/10">
          <p className="text-base font-medium text-brand-700 dark:text-brand-300">
            دوره‌های جدید به زودی اضافه می‌شوند
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-6 py-3 text-sm font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            در لیست انتظار ثبت‌نام کن
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">دوره سازمانی سفارشی می‌خواهید؟</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            برای تیم‌ها و سازمان‌ها دوره اختصاصی طراحی می‌کنم
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            باهام در تماس باش
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
