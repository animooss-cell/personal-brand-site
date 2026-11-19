import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  GraduationCap,
  Building2,
  Users,
  CheckCircle2,
  ListChecks,
  MapPin,
  Briefcase,
  Sparkles,
  Clock,
  ShieldCheck,
  Award,
  MessageCircle,
  Phone,
  ChevronLeft,
  Factory,
  BarChart3,
  HelpCircle,
  Layers,
  Check,
  X,
  Target,
  Compass,
  Zap,
} from "lucide-react";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { personRef } from "@/lib/schema";
import { aiTrainingAhvaz } from "@/lib/content/services/ai-training-ahvaz";
import RichText from "@/components/RichText";
import EntityBio from "@/components/EntityBio";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import { toWhatsappHref } from "@/lib/social";
import FaqAccordion from "@/components/FaqAccordion";

export const revalidate = 300;

const c = aiTrainingAhvaz;
const { title, description } = c;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "آموزش هوش مصنوعی در اهواز",
    "کلاس هوش مصنوعی در اهواز",
    "دوره هوش مصنوعی در اهواز",
    "مدرس هوش مصنوعی در اهواز",
    "آموزش سازمانی هوش مصنوعی خوزستان",
    "کارگاه هوش مصنوعی اهواز",
    "آموزش چت جی پی تی در اهواز",
  ],
  alternates: { canonical: c.path },
  openGraph: {
    title,
    description,
    url: c.path,
    type: "website",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "آموزش هوش مصنوعی در اهواز - عبدالله احمدیان",
      },
    ],
  },
};

const trackIcons = [Users, Building2, GraduationCap];

export default async function AiTrainingAhvazPage() {
  const courses = await getPublishedCourses();

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description,
    url: `${SITE_URL}${c.path}`,
    provider: personRef,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Online"],
      location: {
        "@type": "Place",
        name: "اهواز",
        address: { "@type": "PostalAddress", addressLocality: "اهواز", addressRegion: "خوزستان", addressCountry: "IR" },
      },
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.name,
    serviceType: c.serviceType,
    provider: personRef,
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}${c.path}`,
    description,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
    { name: c.name, path: c.path },
  ]);

  const kpis = [
    { value: "+۱۰ سال", label: "سابقه اکوسیستم و کسب‌وکار", sub: "منتور و مدرس از سال ۱۳۹۲" },
    { value: "۵+ دوره", label: "برگزارشده برای فولاد خوزستان", sub: "مدیران تولید، مالی، بازرگانی و روابط عمومی" },
    { value: "صفر پیش‌نیاز", label: "بدون نیاز به برنامه‌نویسی", sub: "آموزش روان و کاملاً کاربردی" },
    { value: "اهواز و آنلاین", label: "حضوری در استان خوزستان", sub: "کارگاه پشت سیستم با سناریوی واقعی" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100 pb-16">
      {/* اسکیماهای استاندارد گوگل برای دوره و خدمات محلی اهواز */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

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
            <li>
              <Link href="/services" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                خدمات
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-700 dark:text-slate-200">{c.name}</li>
          </ol>
        </nav>
      </div>

      {/* هیرو بخش آموزش در اهواز با چیدمان دونمایی لوکس (Executive 2-Column Hero) */}
      <section className="px-4 pt-4 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-6 text-white shadow-2xl md:p-12 lg:p-16 border border-brand-500/20">
          {/* افکت نوری محو در پس‌زمینه */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-300/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* ستون راست: متن، ارزش پیشنهادی و دکمه‌ها */}
            <div className="lg:col-span-7 text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400"></span>
                </span>
                آموزش حضوری در اهواز و استان خوزستان + دسترسی آنلاین
              </div>

              <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
                {c.hero.title}
              </h1>

              <p className="mt-4 text-base leading-8 text-slate-200 md:text-lg">
                {c.hero.lead}
              </p>

              {/* نشان‌های اعتماد و مشخصات دوره‌ها */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-xs md:text-sm text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>مدرس ۵ دوره برای فولاد خوزستان و اکسین</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>آموزش پشت سیستم با تمرین کار واقعی</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>بدون نیاز به کدنویسی یا پیش‌نیاز فنی</span>
                </div>
              </div>

              {/* کلیدهای اقدام اصلی هیرو */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 text-sm font-bold text-cta-fg shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
                >
                  درخواست ارزیابی رایگان و رزرو دوره
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

            {/* ستون چپ: کارت ویترین مدرس و دوره‌های سازمانی خوزستان */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-white/15 bg-slate-900/80 p-6 md:p-8 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-5">
                  <div className="relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-brand-400/40 shrink-0">
                    <Image
                      src="/profile.png"
                      alt="عبدالله احمدیان"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">عبدالله احمدیان</h3>
                    <p className="text-xs text-brand-300 mt-0.5">مدرس دوره‌های هوش مصنوعی فولاد خوزستان</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-1">
                      <MapPin className="h-3 w-3 text-brand-400" />
                      <span>اهواز، خوزستان</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-200 leading-6">
                  <div className="flex items-start gap-2 rounded-xl bg-white/5 p-3 border border-white/10">
                    <Sparkles className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                    <span>تمرین مستقیم روی ابزارهای کاربردی (ChatGPT، NotebookLM و...) بدون تئوری‌بافی</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-white/5 p-3 border border-white/10">
                    <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>رعایت کامل امنیت داده‌ها و حریم خصوصی اسناد و مکاتبات شرکتی</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-white/5 p-3 border border-white/10">
                    <Award className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>ارائه پرامپت‌ها و قالب‌های آماده اختصاصی متناسب با نقش شغلی پرسنل شما</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 text-center">
                  <Link
                    href="/case-studies"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 hover:text-white transition-colors"
                  >
                    مشاهده سوابق برگزاری دوره‌ها در فولاد خوزستان و اکسین
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* نوار سنجه‌ها و شاخص‌های اقتدار محلی (Bento Strip) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900 text-center"
            >
              <div className="text-2xl font-black text-brand-600 dark:text-brand-400 md:text-3xl">
                {kpi.value}
              </div>
              <div className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-100">
                {kpi.label}
              </div>
              <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-5">
                {kpi.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* بخش: چرا یک دوره محلی در اهواز؟ */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-[2.5rem] border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-12">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-2">
                <Compass className="h-4 w-4" />
                تفاوت آموزش اختصاصی با دوره‌های عمومی
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mb-4">
                {c.why.heading}
              </h2>
              <p className="text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
                {c.why.text}
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-900/60 dark:bg-brand-950/30 flex-1 min-w-[240px]">
                  <div className="text-xs font-bold text-brand-800 dark:text-brand-300 mb-1">حل چالش‌های بومی</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-6">شناخت بافت صنعتی، تجاری و اداری استان خوزستان و تنظیم تمرین‌ها بر همان مبنا.</div>
                </div>
                <div className="rounded-2xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-900/60 dark:bg-brand-950/30 flex-1 min-w-[240px]">
                  <div className="text-xs font-bold text-brand-800 dark:text-brand-300 mb-1">رفع اشکال زنده و حضوری</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-6">پاسخ مستقیم به ابهامات پرسنل هنگام کار عملی با سیستم و اصلاح پرامپت‌ها در همان جلسه.</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-3xl bg-slate-900 p-7 text-white dark:bg-slate-950 border border-slate-800 shadow-xl">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-brand-400" />
                خروجی روز اول؛ نه تئوری آینده
              </h3>
              <p className="text-xs leading-6 text-slate-300 mb-4">
                شما وقت تلف‌کردن روی مفاهیم انتزاعی ریاضی یا الگوریتم‌های پیچیده را ندارید. هدف ما تسلط سریع پرسنل بر ابزارهایی است که از فردای کارگاه:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>سرعت نگارش گزارش‌ها و نامه‌های اداری را ۳ برابر کند</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>خطاهای آماری و دوباره‌کاری‌های اکسل را به صفر برساند</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>تولید محتوا و روابط عمومی بدون نیاز به طراح بیرونی انجام شود</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* دوره‌های منتشر شده (Published Courses Grid) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">سرفصل‌های آماده</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            {c.coursesHeading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            دوره‌های تخصصی طراحی‌شده بر اساس نقش‌های شغلی واقعی در سازمان‌ها
          </p>
        </div>

        {courses.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/services/courses/${course.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-lg hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  {course.image && (
                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {course.audience && (
                      <span className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                        {course.audience}
                      </span>
                    )}
                    <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    {course.description && (
                      <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 line-clamp-3">
                        {course.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between mt-4">
                  <span className="text-xs font-bold text-brand-600 dark:text-brand-400">
                    مشاهده سرفصل‌ها و جزئیات
                  </span>
                  <ChevronLeft className="h-4 w-4 text-brand-600 dark:text-brand-400 group-hover:translate-x-[-4px] transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-sm text-slate-500 dark:border-slate-700">
            سرفصل‌های دوره‌ها به‌صورت سفارشی متناسب با نیاز سازمان شما طراحی می‌شوند.
          </div>
        )}
      </section>

      {/* سرفصل‌های جامع دوره هوش مصنوعی در اهواز (Curriculum Bento Box) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-white to-slate-50 border border-gray-200 p-7 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">سرفصل‌های کارگاهی</span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
              {c.curriculumHeading}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              سرفصل‌های عملیاتی که در پایان دوره به خروجی روزمره و ملموس تبدیل می‌شوند
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.curriculum.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-brand-500/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 font-black text-xs shrink-0">
                  {idx + 1}
                </div>
                <p className="text-xs leading-6 text-slate-700 dark:text-slate-300 font-medium">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* بخش: این دوره برای چه کسانی مناسب است و برای چه کسانی نیست؟ (Fit & Not Fit) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">مخاطبان هدف</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            {c.fit.heading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            {c.fit.text}
          </p>
        </div>

        {/* ۳ تِرک مخاطبان */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {c.tracks.map(({ title: trackTitle, desc }, i) => {
            const Icon = trackIcons[i];
            return (
              <div
                key={trackTitle}
                className="flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all hover:shadow-md hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400 mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{trackTitle}</h3>
                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">{desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>آموزش متناسب با نقش</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* جعبه شفافیت: این دوره برای چه کسانی مناسب نیست؟ */}
        <div className="rounded-3xl border border-rose-200 bg-rose-50/50 p-6 dark:border-rose-900/40 dark:bg-rose-950/20 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 shrink-0">
              <X className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                {c.notFit.heading}
              </h3>
              <p className="text-xs leading-6 text-slate-600 dark:text-slate-300">
                {c.notFit.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* بخش مقایسه: دوره تخصصی کسب‌وکار در اهواز در برابر آموزشگاه‌های عمومی */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-7 text-white shadow-xl md:p-12 border border-brand-500/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">تمایز کلیدی</span>
            <h2 className="text-2xl font-black text-white md:text-3xl mt-1">
              {c.versus.heading}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-3">
                <X className="h-4 w-4" />
                آموزشگاه‌های عمومی و دوره‌های آنلاین ضبط‌شده
              </div>
              <ul className="space-y-3 text-xs leading-6 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>سرفصل‌های یکسان برای همگان بدون توجه به تفاوت صنایع</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>مثال‌های کلیشه‌ای که ربطی به فرآیندهای مالی، تولیدی و بازرگانی ندارند</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>عدم امکان تمرین روی داده‌ها و نبود پشتیبانی اختصاصی پس از دوره</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-400/40 bg-brand-500/15 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-brand-300 font-bold text-sm mb-3">
                <Check className="h-4 w-4" />
                دوره‌های تخصصی هوش مصنوعی عبدالله احمدیان
              </div>
              <ul className="space-y-3 text-xs leading-6 text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-brand-300 font-bold">•</span>
                  <span>نیازسنجی اولیه و طراحی سناریوها بر مبنای اسناد و وظایف واقعی تیم شما</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-300 font-bold">•</span>
                  <span>کارگاه حضوری پشت سیستم با رفع اشکال زنده و تمرین عملی</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-300 font-bold">•</span>
                  <span>پروتکل‌های محرمانگی داده‌ها و پشتیبانی مستقیم پس از پایان دوره</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center text-xs text-slate-300">
            {c.versus.paragraphs[2]}
          </div>
        </div>
      </section>

      {/* فرآیند ۵ مرحله‌ای برگزاری دوره در اهواز (Connected Step Roadmap) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">مراحل همکاری</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            {c.stepsHeading}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            مسیری شفاف از گفتگوی اولیه تا تسلط پرسنل بر هوش مصنوعی
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {c.steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <span className="mb-2 block text-xs font-black text-brand-600 dark:text-brand-400">
                  {`گام ۰${i + 1}`}
                </span>
                <h3 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* خروجی‌هایی که تیم شما تحویل می‌گیرد (Deliverables) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              {c.deliverablesHeading}
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {c.deliverables.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-2xl border border-gray-150 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50"
              >
                <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-6 text-slate-700 dark:text-slate-300 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قیمت‌گذاری، قالب برگزاری و سوابق سازمانی خوزستان */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* قیمت‌گذاری شفاف */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{c.pricing.heading}</h3>
            </div>
            <p className="text-xs leading-7 text-slate-600 dark:text-slate-300">{c.pricing.text}</p>
          </div>

          {/* فرمت برگزاری در اهواز و آنلاین */}
          <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="h-5 w-5 text-brand-600 dark:text-brand-400" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{c.format.heading}</h3>
            </div>
            <div className="text-xs leading-7 text-slate-600 dark:text-slate-300">
              <RichText parts={c.format.text} />
            </div>
          </div>
        </div>

        {/* سوابق همکاری صنعتی در خوزستان */}
        <div className="mt-6 rounded-3xl bg-brand-50/70 p-6 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-brand-600 dark:text-brand-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{c.collaborationsHeading}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {c.collaborations.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* معرفی مدرس دوره و پیوندهای داخلی مرتبط (Instructor Bio & Internal Silo Links) */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        <EntityBio />

        <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            راهنماها و مقالات مرتبط با آموزش هوش مصنوعی در اهواز
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {c.relatedArticles.map((article) => (
              <Link
                key={article.href}
                href={article.href}
                className="flex items-center justify-between gap-2 rounded-xl p-3 text-xs font-semibold text-slate-700 hover:bg-brand-50 hover:text-brand-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-300 transition-colors"
              >
                <span>{article.label}</span>
                <ChevronLeft className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* بخش پرسش‌های متداول (FAQ Accordion with Schema) */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">پاسخ به سوالات</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            سوالات متداول آموزش هوش مصنوعی در اهواز
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            پاسخ به پرتکرارترین پرسش‌ها پیرامون کلاس‌های حضوری، هزینه و سرفصل‌ها
          </p>
        </div>

        <FaqAccordion items={c.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
      </section>

      {/* هاب تبدیل نهایی (High-Converting Conversion Hub) */}
      <section className="mx-auto max-w-5xl px-4 pt-8 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-8 text-white shadow-2xl md:p-14 border border-brand-500/30 text-center">
          {/* جلوه نوری محو */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-400/15 border border-brand-400/30 px-4 py-1.5 text-xs font-bold text-brand-300 mb-4 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-brand-400" />
              جلسه اولیه رایگان و بدون تعهد
            </span>

            <h2 className="text-2xl font-black md:text-4xl text-white leading-tight">
              {c.cta.heading}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-200 md:text-base">
              {c.cta.text} — در یک تماس کوتاه نیازهای کاری تیم شما را ارزیابی کرده و سرفصل‌های متناسب با اهداف سازمان‌تان را طراحی می‌کنم.
            </p>

            {/* کلیدهای تبدیل اصلی */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-fg shadow-xl shadow-brand-500/30 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
              >
                درخواست جلسه نیازسنجی و رزرو دوره
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
              <div className="text-xs font-medium text-slate-300 mb-3">تماس تلفنی مستقیم برای هماهنگی دوره‌های اهواز:</div>
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
                  href="/services/corporate-ai-training"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-brand-300 hover:bg-white/10 transition-colors"
                >
                  مشاهده نسخه دوره سازمانی سراسری
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
