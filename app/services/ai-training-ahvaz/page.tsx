import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  ListChecks,
  MapPin,
  Briefcase,
} from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import FaqAccordion from "@/components/FaqAccordion";

export const revalidate = 300;

const title = "آموزش هوش مصنوعی در اهواز | دوره و کلاس حضوری";
const description =
  "آموزش هوش مصنوعی در اهواز با دوره و کلاس حضوری برای تیم‌ها و سازمان‌ها؛ سرفصل عملی و متناسب با نقش‌های شغلی تیم شما، بدون نیاز به دانش فنی قبلی.";

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

const trainingSteps = [
  {
    title: "شناخت نیاز تیم",
    desc: "یک گفت‌وگوی اولیه برای شناخت سطح دانش فعلی تیم شما و فرآیندهایی که قرار است با هوش مصنوعی ساده‌تر شوند.",
  },
  {
    title: "طراحی سرفصل اختصاصی",
    desc: "تنظیم سرفصل دوره بر اساس نقش‌های شغلی حاضر در جلسه، نه یک برنامه‌ی عمومی و یکسان برای همه.",
  },
  {
    title: "برگزاری دوره",
    desc: "برگزاری کارگاه یا دوره‌ی سازمانی، حضوری در اهواز یا آنلاین، با تمرین عملی روی ابزارها و مثال‌های واقعی.",
  },
  {
    title: "تمرین و پرسش‌وپاسخ زنده",
    desc: "تمرین مستقیم شرکت‌کنندگان با ابزارها در طول دوره و پاسخ به سؤال‌های واقعی‌شان، نه فقط پخش اسلاید.",
  },
  {
    title: "پیگیری پس از دوره",
    desc: "در دسترس بودن برای پرسش‌های تیم شما در هفته‌های اول استفاده‌ی عملی از آنچه آموزش دیده‌اند.",
  },
];

const trainingDeliverables = [
  "سرفصل دوره، متناسب با نقش‌های شغلی شرکت‌کنندگان",
  "چند ابزار هوش مصنوعی مشخص برای استفاده‌ی روزمره هر شرکت‌کننده",
  "چند پرامپت آماده برای کار روزمره هر نقش شغلی",
  "یک برنامه‌ی عملی برای ادامه‌ی استفاده از هوش مصنوعی بعد از پایان دوره",
  "کانال ارتباطی برای پرسش‌های تیم شما در هفته‌های اول پس از دوره",
];

const relatedArticles = [
  { href: "/blog/modares-hoosh-masnooei-ahvaz", label: "مدرس هوش مصنوعی در اهواز چه کمکی به تیم شما می‌کند؟" },
  {
    href: "/blog/onsite-vs-online-ai-training-ahvaz",
    label: "آموزش حضوری یا آنلاین هوش مصنوعی در اهواز؛ کدام را انتخاب کنیم؟",
  },
  { href: "/blog/chatgpt-for-business-10-prompts", label: "۱۰ پرامپت کاربردی چت‌جی‌پی‌تی برای کسب‌وکار" },
  { href: "/blog/ai-excel-consultant-ahvaz", label: "استفاده از هوش مصنوعی در اکسل برای کسب‌وکارهای اهواز" },
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
    a: "بله؛ از جمله آموزش هوش مصنوعی برای شرکت فولاد خوزستان، از جمله دوره‌ی داشبوردسازی مالی برای مدیران مالی این شرکت، و همکاری با بسیج رسانه خوزستان در آموزش و به‌کارگیری هوش مصنوعی.",
  },
  {
    q: "دوره برای چه سطحی از دانش مناسب است؟",
    a: "دوره‌ها برای سطوح مقدماتی تا متوسط طراحی شده‌اند و نیازی به دانش فنی یا برنامه‌نویسی قبلی نیست.",
  },
  {
    q: "بعد از آموزش هوش مصنوعی در اهواز چه چیزی یاد می‌گیریم که واقعاً قابل استفاده باشد؟",
    a: "هر شرکت‌کننده با چند ابزار مشخص، چند پرامپت آماده برای کار روزمره خودش و یک برنامه عملی برای ادامه استفاده از هوش مصنوعی در نقش شغلی‌اش از دوره خارج می‌شود؛ نه فقط یک سری اسلاید تئوری.",
  },
  {
    q: "کلاس هوش مصنوعی در اهواز به‌صورت حضوری برگزار می‌شود؟",
    a: "بله؛ کلاس‌ها به‌صورت حضوری در اهواز برگزار می‌شوند و برای تیم‌های خارج از خوزستان نسخه‌ی آنلاین با همان سرفصل ارائه می‌شود. برای هماهنگی زمان و جزئیات برگزاری، از طریق صفحه‌ی تماس در ارتباط باشید.",
  },
  {
    q: "این دوره‌ها با آموزشگاه‌های عمومی هوش مصنوعی چه فرقی دارند؟",
    a: "در آموزشگاه‌های عمومی معمولاً یک سرفصل یکسان به همه آموزش داده می‌شود. در این دوره‌ها، سرفصل و مثال‌ها بر اساس نقش‌های شغلی و فرآیندهای واقعی تیم شما طراحی می‌شوند، نه یک برنامه‌ی از پیش آماده و یکسان برای همه.",
  },
  {
    q: "دوره هوش مصنوعی اهواز برای چه کسانی مناسب است؟",
    a: "برای تیم‌های فروش و بازاریابی، مدیران و تصمیم‌گیرندگانی که می‌خواهند بدانند سرمایه‌گذاری روی هوش مصنوعی از کجا شروع می‌شود، و سازمان‌هایی که دنبال یک دوره‌ی اختصاصی متناسب با نیاز خودشان هستند.",
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
    // بدون price ساختگی؛ هزینه بر اساس نیاز هر تیم شفاف‌سازی می‌شود (رجوع
    // کنید به بخش «نحوه‌ی همکاری و قیمت‌گذاری» در همین صفحه).
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
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

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
    { name: "آموزش هوش مصنوعی در اهواز", path: "/services/ai-training-ahvaz" },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">آموزش هوش مصنوعی در اهواز</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            دوره‌ها و کلاس‌های حضوری هوش مصنوعی در اهواز، برای تیم‌ها و سازمان‌هایی که می‌خواهند از همان جلسه‌ی اول روی کار واقعی خودشان تمرین کنند
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-16">
        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">چرا یک دوره‌ی هوش مصنوعی محلی در اهواز؟</h2>
        <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
          اکثر دوره‌های آنلاین هوش مصنوعی برای یک مخاطب عمومی طراحی شده‌اند و ربطی به واقعیت روزمره کسب‌وکار
          شما در خوزستان ندارند. آموزش هوش مصنوعی در اهواز برعکس این مسیر است: از همان جلسه اول با ابزارها و
          مثال‌های واقعی کار می‌کنیم، مستقیماً روی فرآیندهای تیم شما، و به زبان ساده — بدون نیاز به دانش فنی یا
          برنامه‌نویسی قبلی. چه یک کارگاه نیم‌روزه بخواهید چه یک دوره سازمانی چندجلسه‌ای، محتوا متناسب با صنعت
          و اندازه تیم شما طراحی می‌شود.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">دوره‌های هوش مصنوعی در اهواز</h2>

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

        <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          این دوره برای چه کسانی مناسب است؟
        </h2>
        <p className="mx-auto mb-6 max-w-3xl text-center text-sm leading-7 text-slate-600 dark:text-slate-300">
          این دوره برای هر تیمی که می‌خواهد کار روزمره‌اش را با AI سریع‌تر و ساده‌تر کند طراحی شده — از
          تیم‌های فروش و بازاریابی گرفته تا مدیرانی که می‌خواهند بدانند سرمایه‌گذاری روی هوش مصنوعی از کجا
          شروع می‌شود.
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

        <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          برای چه کسانی مناسب نیست؟
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-sm leading-7 text-slate-600 dark:text-slate-300">
          اگر دنبال توسعه‌ی مدل اختصاصی هوش مصنوعی یا راهکارهای فنی پیچیده برای تیم مهندسی هستید، این دوره
          مناسب شما نیست؛ تمرکز این آموزش روی استفاده‌ی عملی از ابزارهای موجود در کار روزمره است، نه
          برنامه‌نویسی یا توسعه‌ی مدل. همچنین اگر تیم شما از قبل به‌طور حرفه‌ای با این ابزارها کار می‌کند،
          احتمالاً به یک دوره‌ی پیشرفته‌تر و تخصصی‌تر نیاز دارید.
        </p>

        <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          چرا به‌جای آموزشگاه عمومی، دوره‌ی تخصصی کسب‌وکار؟
        </h2>
        <div className="mx-auto mb-12 max-w-3xl space-y-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
          <p>
            در بسیاری از آموزشگاه‌های عمومی هوش مصنوعی، همه‌ی شرکت‌کنندگان یک سرفصل یکسان را می‌گذرانند، صرف‌نظر
            از اینکه در چه صنعتی کار می‌کنند یا با چه مسئله‌ای روبه‌رو هستند. این روش برای آشنایی کلی خوب است،
            اما وقتی هدف شما استفاده‌ی عملی از هوش مصنوعی در کار روزمره‌ی تیم‌تان باشد، معمولاً کافی نیست.
          </p>
          <p>
            در یک دوره‌ی تخصصی کسب‌وکار، نقطه‌ی شروع برعکس است: ابتدا فرآیندها و ابزارهای واقعی تیم شما بررسی
            می‌شود، و بعد سرفصل و تمرین‌ها بر همان اساس طراحی می‌شوند. همین تفاوت باعث می‌شود چیزی که در کلاس
            یاد گرفته می‌شود، همان روز بعد قابل استفاده در کار واقعی باشد، نه فقط یک مفهوم تئوری.
          </p>
          <p>
            اگر دنبال یک معرفی کلی و عمومی از هوش مصنوعی هستید، یک آموزشگاه عمومی می‌تواند نقطه‌ی شروع خوبی
            باشد؛ اما اگر می‌خواهید همین حالا هوش مصنوعی را وارد فرآیندهای کاری تیم‌تان کنید، دوره‌ی تخصصی مسیر
            سریع‌تری است.
          </p>
        </div>

        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          فرآیند برگزاری دوره‌ی هوش مصنوعی در اهواز
        </h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {trainingSteps.map((step, i) => (
            <div key={step.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="mb-2 block text-xs font-bold text-brand-600">{`گام ${i + 1}`}</span>
              <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <ListChecks className="h-6 w-6 text-brand-600" aria-hidden="true" />
          خروجی‌هایی که تیم شما تحویل می‌گیرد
        </h2>
        <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {trainingDeliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <Briefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />
          نحوه‌ی همکاری و قیمت‌گذاری
        </h2>
        <p className="mb-12 text-sm leading-7 text-slate-600 dark:text-slate-300">
          هزینه‌ی دوره عدد ثابتی ندارد و به چند عامل بستگی دارد: تعداد نفرات، تعداد جلسات و میزان
          سفارشی‌سازی سرفصل برای نقش‌های شغلی تیم شما. به همین دلیل، یک تماس کوتاه اولیه برای شناخت نیاز
          تیم‌تان همیشه رایگان است؛ بعد از همان تماس، پیشنهاد قیمت شفاف و متناسب با دامنه‌ی دوره ارائه
          می‌شود.
        </p>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
            کلاس حضوری، آنلاین یا درون‌سازمانی؟
          </h2>
          <p className="mb-12 text-sm leading-7 text-slate-600 dark:text-slate-300">
            این دوره‌ها به‌صورت کارگاه حضوری در اهواز برگزار می‌شوند؛ از یک نشست چند ساعته برای معرفی ابزارها تا
            دوره‌های سازمانی چندجلسه‌ای با تمرین عملی روی فرآیندهای واقعی تیم شما. برای تیم‌ها و سازمان‌های خارج
            از خوزستان، همین محتوا به‌صورت آنلاین و با همان کیفیت برگزار می‌شود. تعداد نفرات، مدت‌زمان و تعداد
            جلسات بر اساس نیاز واقعی تیم شما تنظیم می‌شود، نه یک قالب ثابت و یکسان برای همه. اگر هنوز مطمئن
            نیستید کدام فرمت برای تیم شما بهتر است،{" "}
            <Link href="/blog/onsite-vs-online-ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline">
              مقایسه‌ی کلاس حضوری و آنلاین هوش مصنوعی
            </Link>{" "}
            را بخوانید.
          </p>

          <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <Building2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
            سوابق همکاری
          </h2>
          <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              آموزش هوش مصنوعی برای شرکت فولاد خوزستان، از جمله دوره‌ی داشبوردسازی مالی برای مدیران مالی این شرکت
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              همکاری با بسیج رسانه خوزستان در آموزش و به‌کارگیری هوش مصنوعی
            </li>
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">مقالات مرتبط</h2>
          <ul className="mb-12 space-y-2 text-sm leading-7">
            {relatedArticles.map((article) => (
              <li key={article.href}>
                <Link href={article.href} className="font-semibold text-brand-700 hover:underline">
                  {article.label}
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">سوالات متداول</h2>
          <div className="mb-12">
            <FaqAccordion items={faqs.map((f) => ({ question: f.q, answer: f.a }))} />
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
          <h2 className="text-2xl font-bold text-white md:text-3xl">دوره سازمانی سفارشی می‌خواهید؟</h2>
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
