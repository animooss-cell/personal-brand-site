import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { getCourseBySlug } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import {
  normalizeContentLinks,
  fillEmptyImageAlt,
  extractFaq,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
  serializeJsonLd,
  wrapFaqAccordion,
  optimizeContentImages,
} from "@/lib/post-content";

export const revalidate = 300;

const DIGIT_MAP: Record<string, string> = {
  "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9",
  "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9",
};

// عدد ساعت را از متن آزاد duration (مثلاً «۱۶ ساعت») درمی‌آورد و به قالب ISO 8601
// (مثلاً PT16H) برمی‌گرداند. فقط عددی که مستقیماً قبل از «ساعت» بیاید حساب می‌شود
// (تا «۲ روز» یا «۴ ساعته» اشتباهاً ساعت کل حساب نشود)؛ اگر پیدا نشد، undefined.
function durationToIsoWorkload(duration: string | null): string | undefined {
  if (!duration) return undefined;
  const normalized = duration.replace(/[۰-۹٠-٩]/g, (d) => DIGIT_MAP[d]).replace(/٫/g, ".");
  const match = normalized.match(/(\d+(?:\.\d+)?)\s*ساعت(?![\u0600-\u06FF])/);
  if (!match) return undefined;
  const hours = Number(match[1]);
  return hours > 0 ? `PT${match[1]}H` : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  if (!course) return {};

  const trimmedDescription = course.description?.trim() || undefined;

  return {
    title: course.title,
    description: trimmedDescription,
    alternates: { canonical: `/services/courses/${course.slug}` },
    openGraph: {
      title: course.title,
      description: trimmedDescription,
      url: `/services/courses/${course.slug}`,
      images: course.image ? [course.image] : undefined,
    },
  };
}

export default async function CourseDetailPage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  if (!course) notFound();

  // ترتیب مهم است: اول extractFaq روی HTML اصلی برای JSON-LD، بعد نرمال‌سازی
  // لینک‌ها و alt تصویرها، و در آخر wrapFaqAccordion فقط برای نمایش.
  const faqItems = extractFaq(course.content);
  const faqJsonLd = buildFaqJsonLd(faqItems);
  const normalizedContent = wrapFaqAccordion(
    fillEmptyImageAlt(optimizeContentImages(normalizeContentLinks(course.content)), course.title)
  );

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description?.trim() || undefined,
    url: `${SITE_URL}/services/courses/${course.slug}`,
    inLanguage: "fa",
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Onsite",
      courseWorkload: durationToIsoWorkload(course.duration),
      location: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
      },
    },
    // بدون price ساختگی؛ هزینه‌ی هر دوره بعد از شناخت نیاز تیم شفاف می‌شود.
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
    { name: course.title, path: `/services/courses/${course.slug}` },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      )}
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <div className="mb-8 text-center">
          {course.audience && (
            <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
              {course.audience}
            </span>
          )}
          <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
            {course.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
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
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-3xl">
            <Image
              src={course.image}
              alt={course.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {course.description?.trim() && (
          <p className="mb-10 text-base leading-8 text-slate-600 dark:text-slate-300">{course.description.trim()}</p>
        )}

        {course.outline.length > 0 && (
          <div className="mb-10 rounded-3xl border border-gray-200 bg-slate-50 p-7 dark:border-slate-700 dark:bg-slate-800/60">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">سرفصل‌های آموزشی</h2>
            <ul className="flex flex-col gap-3">
              {course.outline.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="prose-content" dir="rtl" dangerouslySetInnerHTML={{ __html: normalizedContent }} />
      </article>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            علاقه‌مندید این دوره را برای تیم خودتان برگزار کنید؟
          </h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            یک جلسه هماهنگی رایگان با من داشته باشید، بدون تعهد.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            رزرو جلسه / تماس
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
