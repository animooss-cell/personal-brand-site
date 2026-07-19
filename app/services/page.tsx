import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  Rocket,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  TrendingUp,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import { getServices, getPublishedCourses } from "@/lib/data";

export const revalidate = 300;

const servicesTitle = "خدمات و آموزش هوش مصنوعی | عبدالله احمدیان";
const servicesDescription =
  "مشاوره کسب‌وکار، مشاوره رشد، آموزش هوش مصنوعی و تولید محتوا با AI — همه خدمات در یک نگاه.";

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

function resolveIcon(name: string): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon || Rocket;
}

const dedicatedServices = [
  {
    href: "/services/ai-business-consulting",
    icon: Briefcase,
    title: "مشاور کسب‌وکار با هوش مصنوعی",
    desc: "برای شروع پیاده‌سازی و اتوماسیون هوش مصنوعی در کسب‌وکارتان.",
  },
  {
    href: "/services/ai-growth-consulting",
    icon: TrendingUp,
    title: "مشاور توسعه و رشد کسب‌وکار",
    desc: "برای کسب‌وکارهایی که راه افتاده‌اند و دنبال مقیاس‌پذیری هستند.",
  },
  {
    href: "/services/ai-training-ahvaz",
    icon: GraduationCap,
    title: "مدرس هوش مصنوعی در اهواز",
    desc: "دوره‌های حضوری و سازمانی برای تیم و سازمان شما.",
  },
  {
    href: "/services/ai-content-generation",
    icon: PenTool,
    title: "تولید محتوا با هوش مصنوعی",
    desc: "محتوای شبکه‌های اجتماعی، وبسایت و کمپین‌های تبلیغاتی.",
  },
];

export default async function ServicesPage() {
  const [services, courses] = await Promise.all([getServices(), getPublishedCourses()]);

  return (
    <div dir="rtl">
      {/* هدر */}
      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">خدمات و آموزش</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            از مشاوره تا آموزش — همه چیز برای رشد کسب‌وکارت با هوش مصنوعی
          </p>
        </div>
      </section>

      {/* خلاصه ۴ خدمت اصلی */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">همه خدمات</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dedicatedServices.map(({ href, icon: Icon, title, desc }, idx) => (
            <Link
              key={href}
              href={href}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="fade-in-up flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
              <p className="mb-4 text-sm leading-6 text-slate-600">{desc}</p>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                بیشتر بدانید
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* بخش ۱ — خدمات مشاوره */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          خدمات مشاوره
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = resolveIcon(service.icon);
            return (
              <div
                key={service.id}
                style={{ animationDelay: `${idx * 120}ms` }}
                className={`fade-in-up relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md ${
                  service.featured
                    ? "border-2 border-brand md:-translate-y-3 md:shadow-lg"
                    : "border-gray-200"
                }`}
              >
                {service.featured && (
                  <span className="absolute -top-3 right-8 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white shadow">
                    تخصص کلیدی
                  </span>
                )}

                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                    service.featured ? "bg-brand text-white" : "bg-brand-50 text-brand-600"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>

                <h3 className="mb-1 text-xl font-bold text-slate-900">{service.title}</h3>
                {service.subtitle && (
                  <p className="mb-4 text-sm font-medium text-brand-600">{service.subtitle}</p>
                )}
                {service.description && (
                  <p className="mb-5 text-sm leading-6 text-slate-600">{service.description}</p>
                )}

                <div className="mb-6 flex flex-wrap gap-2">
                  {service.audience.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {service.steps.length > 0 && (
                  <>
                    <p className="mb-2 text-xs font-bold text-slate-500">فرآیند کار</p>
                    <div className="mb-6 grid grid-cols-2 gap-3">
                      {service.steps.map((step, i) => (
                        <div
                          key={step}
                          className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-700"
                        >
                          <span className="mb-1 block font-bold text-brand-600">{`گام ${i + 1}`}</span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </>
                )}

                <Link
                  href="/contact"
                  className={`mt-auto inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                    service.featured
                      ? "bg-brand text-white hover:bg-brand-600"
                      : "bg-slate-900 text-white hover:bg-slate-700"
                  }`}
                >
                  جلسه رایگان رزرو کن
                </Link>
                <p className="mt-3 text-center text-xs text-slate-400">
                  بدون تعهد — فقط یه مکالمه صادقانه
                </p>
              </div>
            );
          })}

          {!services.length && (
            <p className="col-span-3 text-center text-slate-400">هنوز کارت خدماتی ثبت نشده است.</p>
          )}
        </div>
      </section>

      {/* بخش ۲ — آموزش‌ها */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">آموزش‌ها</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            آموزش‌های تخصصی ابزارهای هوش مصنوعی برای رشد سازمان‌ها و کسب‌وکارها
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
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
                  {(course.duration || course.level) && (
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
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
        <div className="fade-in-up mt-8 rounded-3xl border border-dashed border-brand-200 bg-brand-50/40 p-8 text-center">
          <p className="text-base font-medium text-brand-700">
            دوره‌های جدید به زودی اضافه می‌شوند
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
          >
            در لیست انتظار ثبت‌نام کن
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* CTA */}
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
