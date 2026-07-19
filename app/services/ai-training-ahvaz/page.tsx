import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Building2, Users, CheckCircle2 } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "مدرس هوش مصنوعی در اهواز | دوره‌های حضوری و آنلاین";
const description =
  "آموزش هوش مصنوعی توسط مدرس هوش مصنوعی در اهواز؛ دوره‌های حضوری و سازمانی برای تیم‌های فروش، بازاریابی و مدیریت. با تجربه آموزش در فولاد خوزستان و سازمان‌های استان.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-training-ahvaz" },
  openGraph: { title, description, url: "/services/ai-training-ahvaz" },
};

const trainingTracks = [
  { icon: Users, title: "تیم فروش و بازاریابی", desc: "استفاده از ابزارهای هوش مصنوعی برای شناسایی مشتری، تولید محتوای فروش و پاسخ‌گویی سریع‌تر." },
  { icon: Building2, title: "مدیران و تصمیم‌گیرندگان", desc: "درک کاربردهای عملی هوش مصنوعی برای تصمیم‌گیری و اولویت‌بندی سرمایه‌گذاری در AI." },
  { icon: GraduationCap, title: "دوره سازمانی اختصاصی", desc: "طراحی دوره متناسب با نیاز واقعی تیم شما، نه یک دوره عمومی و یکسان برای همه." },
];

const faqs = [
  {
    q: "دوره‌ها حضوری برگزار می‌شود یا آنلاین؟",
    a: "دوره‌های حضوری در اهواز برگزار می‌شود؛ برای تیم‌های خارج از خوزستان دوره‌های آنلاین و سازمانی هم قابل برگزاری است.",
  },
  {
    q: "آیا سابقه آموزش سازمانی دارید؟",
    a: "بله؛ از جمله آموزش ابزارهای هوش مصنوعی برای تیم فروش و بازاریابی شرکت فولاد خوزستان و دوره هوش مصنوعی در خدمت روابط عمومی برای همین سازمان.",
  },
  {
    q: "دوره برای چه سطحی از دانش مناسب است؟",
    a: "دوره‌ها برای سطوح مقدماتی تا متوسط طراحی شده‌اند و نیازی به دانش فنی یا برنامه‌نویسی قبلی نیست.",
  },
];

export default async function AiTrainingAhvazPage() {
  const courses = await getPublishedCourses();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "آموزش هوش مصنوعی",
    provider: { "@type": "Person", name: "عبدالله احمدیان" },
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}/services/ai-training-ahvaz`,
    description,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">مدرس هوش مصنوعی در اهواز</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            آموزش کاربردی هوش مصنوعی برای تیم‌ها و سازمان‌ها — از کارگاه‌های حضوری تا دوره‌های سازمانی
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">دوره‌های آموزشی موجود</h2>

        {courses.length > 0 ? (
          <div className="mb-12 grid gap-6 sm:grid-cols-2">
            {courses.map((course, idx) => (
              <Link
                key={course.id}
                href={`/services/courses/${course.slug}`}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="fade-in-up flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
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
                    <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                      {course.audience}
                    </span>
                  )}
                  <h3 className="mb-2 text-lg font-bold text-slate-900">{course.title}</h3>
                  {course.description && (
                    <p className="text-sm leading-6 text-slate-600">{course.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mb-12 text-center text-slate-400">هنوز دوره‌ای منتشر نشده است.</p>
        )}

        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 md:text-3xl">مسیرهای آموزشی</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {trainingTracks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">سوابق تدریس</h2>
          <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600">
            <li>— مشاور تیم هوش مصنوعی شرکت فولاد خوزستان</li>
            <li>— مدرس دوره هوش مصنوعی در خدمت روابط عمومی برای شرکت فولاد خوزستان</li>
            <li>— آموزش ابزارهای هوش مصنوعی برای فروش و بازاریابی شرکت فولاد خوزستان</li>
            <li>— مشاور کانتنت مارکتینگ با هوش مصنوعی برای سازمان بسیج رسانه استان خوزستان</li>
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-slate-900">سوالات متداول</h2>
          <div className="mb-12 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-200 p-5">
                <h3 className="mb-2 flex items-start gap-2 text-base font-bold text-slate-900">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {f.q}
                </h3>
                <p className="text-sm leading-6 text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-brand-50/60 p-6 text-sm leading-7 text-slate-600">
            دنبال مشاوره برای پیاده‌سازی هوش مصنوعی در کسب‌وکارتان هستید، نه فقط آموزش تیم؟ سراغ{" "}
            <Link href="/services/ai-business-consulting" className="font-semibold text-brand-700 hover:underline">
              مشاور کسب‌وکار با هوش مصنوعی
            </Link>{" "}
            بروید.
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">دوره سازمانی سفارشی می‌خوای؟</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            برای تیم‌ها و سازمان‌ها دوره اختصاصی طراحی می‌کنم
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
          >
            باهام در تماس باش
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
