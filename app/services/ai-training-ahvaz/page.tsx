import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Building2, Users, CheckCircle2, ListChecks, MapPin } from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "آموزش هوش مصنوعی در اهواز | دوره‌های حضوری و سازمانی";
const description =
  "آموزش هوش مصنوعی در اهواز برای تیم‌ها و سازمان‌ها؛ دوره‌های حضوری و سازمانی با سرفصل عملی، بدون نیاز به دانش فنی قبلی. جلسه رایگان رزرو کنید.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-training-ahvaz" },
  openGraph: { title, description, url: "/services/ai-training-ahvaz" },
};

const curriculum = [
  "آشنایی با ابزارهای پرکاربرد هوش مصنوعی (مثل ChatGPT) و کاربرد واقعی هرکدام در کار روزمره",
  "نوشتن پرامپت مؤثر؛ چطور از هوش مصنوعی خروجی درست و قابل‌استفاده بگیریم",
  "استفاده از هوش مصنوعی برای تولید محتوا، ایمیل کاری و مستندات روزمره",
  "اتوماسیون ساده فرآیندهای تکراری، بدون نیاز به برنامه‌نویسی",
  "تحلیل سریع‌تر داده و گزارش‌گیری با کمک ابزارهای هوش مصنوعی",
  "نکات امنیت و محرمانگی داده هنگام استفاده سازمانی از ابزارهای هوش مصنوعی",
];

const trainingTracks = [
  { icon: Users, title: "تیم فروش و بازاریابی", desc: "استفاده از ابزارهای هوش مصنوعی برای شناسایی مشتری، تولید محتوای فروش و پاسخ‌گویی سریع‌تر." },
  { icon: Building2, title: "مدیران و تصمیم‌گیرندگان", desc: "درک کاربردهای عملی هوش مصنوعی برای تصمیم‌گیری و اولویت‌بندی سرمایه‌گذاری در AI." },
  { icon: GraduationCap, title: "دوره سازمانی اختصاصی", desc: "طراحی دوره متناسب با نیاز واقعی تیم شما، نه یک دوره عمومی و یکسان برای همه." },
];

const faqs = [
  {
    q: "آموزش هوش مصنوعی در اهواز حضوری برگزار می‌شود یا آنلاین؟",
    a: "دوره‌های حضوری در اهواز برگزار می‌شود؛ برای تیم‌های خارج از خوزستان دوره‌های آنلاین و سازمانی هم قابل برگزاری است.",
  },
  {
    q: "چرا آموزش هوش مصنوعی در اهواز را از یک مدرس محلی بگیرم، نه یک دوره آنلاین عمومی؟",
    a: "دوره‌های آنلاین عمومی معمولاً برای مخاطب گسترده و بدون توجه به صنعت شما طراحی شده‌اند. در آموزش حضوری اهواز، مثال‌ها و تمرین‌ها مستقیماً روی فرآیندها و ابزارهای واقعی تیم شما تنظیم می‌شوند و امکان پرسش و پاسخ زنده هم وجود دارد.",
  },
  {
    q: "هزینه آموزش هوش مصنوعی در اهواز چقدر است؟",
    a: "هزینه بسته به تعداد نفرات، تعداد جلسات و سطح سفارشی‌سازی دوره متفاوت است. بعد از یک تماس کوتاه برای شناخت نیاز تیم شما، پیشنهاد قیمت شفاف ارائه می‌شود.",
  },
  {
    q: "آیا سابقه آموزش سازمانی دارید؟",
    a: "بله؛ از جمله آموزش ابزارهای هوش مصنوعی برای تیم فروش و بازاریابی شرکت فولاد خوزستان و دوره هوش مصنوعی در خدمت روابط عمومی برای همین سازمان.",
  },
  {
    q: "دوره برای چه سطحی از دانش مناسب است؟",
    a: "دوره‌ها برای سطوح مقدماتی تا متوسط طراحی شده‌اند و نیازی به دانش فنی یا برنامه‌نویسی قبلی نیست.",
  },
  {
    q: "بعد از آموزش هوش مصنوعی در اهواز چه چیزی یاد می‌گیریم که واقعاً قابل استفاده باشد؟",
    a: "هر شرکت‌کننده با چند ابزار مشخص، چند پرامپت آماده برای کار روزمره خودش و یک برنامه عملی برای ادامه استفاده از هوش مصنوعی در نقش شغلی‌اش از دوره خارج می‌شود؛ نه فقط یک سری اسلاید تئوری.",
  },
];

export default async function AiTrainingAhvazPage() {
  const courses = await getPublishedCourses();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "آموزش هوش مصنوعی در اهواز",
    description,
    url: `${SITE_URL}/services/ai-training-ahvaz`,
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Online"],
      location: {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
      },
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "آموزش هوش مصنوعی در اهواز",
    serviceType: "آموزش هوش مصنوعی",
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">آموزش هوش مصنوعی در اهواز</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            آموزش کاربردی هوش مصنوعی برای تیم‌ها و سازمان‌ها — از کارگاه‌های حضوری تا دوره‌های سازمانی
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-16">
        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">چرا آموزش هوش مصنوعی در اهواز؟</h2>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          اکثر دوره‌های آنلاین هوش مصنوعی برای یک مخاطب عمومی طراحی شده‌اند و ربطی به واقعیت روزمره کسب‌وکار
          شما در خوزستان ندارند. آموزش هوش مصنوعی در اهواز برعکس این مسیر است: از همان جلسه اول با ابزارها و
          مثال‌های واقعی کار می‌کنیم، مستقیماً روی فرآیندهای تیم شما، و به زبان ساده — بدون نیاز به دانش فنی یا
          برنامه‌نویسی قبلی. چه یک کارگاه نیم‌روزه بخواهید چه یک دوره سازمانی چندجلسه‌ای، محتوا متناسب با صنعت
          و اندازه تیم شما طراحی می‌شود.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">دوره‌های آموزشی موجود</h2>

        {courses.length > 0 ? (
          <div className="mb-12 grid gap-6 sm:grid-cols-2">
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
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mb-12 text-center text-slate-400">هنوز دوره‌ای منتشر نشده است.</p>
        )}

        <div className="mx-auto mb-12 max-w-3xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <ListChecks className="h-6 w-6 text-brand-600" aria-hidden="true" />
            سرفصل دوره
          </h2>
          <ul className="space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {curriculum.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">این آموزش برای چه کسانی مناسب است؟</h2>
        <p className="mx-auto mb-6 max-w-3xl text-center text-sm leading-7 text-slate-600 dark:text-slate-300">
          آموزش هوش مصنوعی در اهواز برای هر تیمی که می‌خواهد کار روزمره‌اش را با AI سریع‌تر و ساده‌تر کند طراحی
          شده — از تیم‌های فروش و بازاریابی گرفته تا مدیرانی که می‌خواهند بدانند سرمایه‌گذاری روی هوش مصنوعی از
          کجا شروع می‌شود.
        </p>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {trainingTracks.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
            فرمت برگزاری
          </h2>
          <p className="mb-12 text-sm leading-7 text-slate-600 dark:text-slate-300">
            آموزش هوش مصنوعی در اهواز به‌صورت کارگاه‌های حضوری برگزار می‌شود؛ از یک نشست چند ساعته برای معرفی
            ابزارها تا دوره‌های سازمانی چندجلسه‌ای با تمرین عملی روی فرآیندهای واقعی تیم شما. برای تیم‌ها و
            سازمان‌های خارج از خوزستان، همین محتوا به‌صورت آنلاین و با همان کیفیت برگزار می‌شود. تعداد نفرات،
            مدت‌زمان و تعداد جلسات بر اساس نیاز واقعی تیم شما تنظیم می‌شود، نه یک قالب ثابت و یکسان برای همه.
          </p>

          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">سوابق تدریس</h2>
          <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li>— مشاور تیم هوش مصنوعی شرکت فولاد خوزستان</li>
            <li>— مدرس دوره هوش مصنوعی در خدمت روابط عمومی برای شرکت فولاد خوزستان</li>
            <li>— آموزش ابزارهای هوش مصنوعی برای فروش و بازاریابی شرکت فولاد خوزستان</li>
            <li>— مشاور کانتنت مارکتینگ با هوش مصنوعی برای سازمان بسیج رسانه استان خوزستان</li>
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">سوالات متداول</h2>
          <div className="mb-12 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-gray-200 p-5 dark:border-slate-700">
                <h3 className="mb-2 flex items-start gap-2 text-base font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  {f.q}
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{f.a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-brand-50/60 p-6 text-sm leading-7 text-slate-600 dark:bg-brand-900/20 dark:text-slate-300">
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
