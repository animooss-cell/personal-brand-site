import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Rocket,
  PenTool,
  CalendarDays,
  GraduationCap,
  Building2,
  Brain,
  Cpu,
  Megaphone,
  Radio,
  Award,
  Handshake,
  Instagram,
  Send,
  MessageCircle,
  Twitter,
  Phone,
  Target,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Clock,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import AboutContactForm from "@/components/AboutContactForm";
import FaqAccordion from "@/components/FaqAccordion";
import { ENTITY_STATEMENT_FA, SITE_URL } from "@/lib/site";
import { getAboutPageData, ABOUT_FAQ, WORK_PRINCIPLES } from "@/lib/about";
import { buildPersonJsonLd, buildAboutProfilePageJsonLd } from "@/lib/schema";
import { toWhatsappHref } from "@/lib/social";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, serializeJsonLd } from "@/lib/post-content";
import { CASE_STUDIES } from "@/lib/case-studies";

export const revalidate = 300;

const aboutTitle = "درباره عبدالله احمدیان | مشاور و مدرس هوش مصنوعی در اهواز";
const aboutDescription =
  "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی و رشد کسب‌وکار در اهواز. ۵ دوره هوش مصنوعی برای فولاد خوزستان و اکسین، داور استارتاپ ویکندها با بیش از یک دهه سابقه عملیاتی.";

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutDescription,
  keywords: [
    "عبدالله احمدیان",
    "مشاور هوش مصنوعی در اهواز",
    "مدرس هوش مصنوعی در اهواز",
    "آموزش هوش مصنوعی سازمانی",
    "مشاوره کسب و کار اهواز",
    "اتوماسیون کسب و کار با هوش مصنوعی",
    "هوش مصنوعی فولاد خوزستان",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: "/about",
    type: "profile",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "عبدالله احمدیان - مشاور و مدرس هوش مصنوعی",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: aboutTitle,
    description: aboutDescription,
  },
};

const activityIcons = [Briefcase, Rocket, PenTool, CalendarDays, GraduationCap, Building2];
const expertiseIcons = [Brain, Cpu, Megaphone, Radio, Zap];
const principleIcons = [Target, ShieldCheck, Zap];

export default async function AboutPage() {
  const {
    fullName,
    roleTitle,
    avatarImage,
    shortBio,
    fullBio,
    activities,
    aiExpertise,
    specialties,
    collaborations,
    timelineItems,
    socialLinks,
    phoneNumbers,
  } = await getAboutPageData();

  const socialItems = [
    { key: "instagram", label: "اینستاگرام", icon: Instagram, href: socialLinks.instagram },
    { key: "telegram", label: "تلگرام", icon: Send, href: socialLinks.telegram },
    {
      key: "whatsapp",
      label: "واتساپ",
      icon: MessageCircle,
      href: socialLinks.whatsapp ? toWhatsappHref(socialLinks.whatsapp) : "",
    },
    { key: "twitter", label: "ایکس", icon: Twitter, href: socialLinks.twitter },
  ].filter((item) => item.href);

  // Structured Data Schemas
  const personJsonLd = buildPersonJsonLd({ jobTitle: roleTitle, image: avatarImage });
  const profilePageJsonLd = buildAboutProfilePageJsonLd();
  const faqJsonLd = buildFaqJsonLd(ABOUT_FAQ);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "درباره عبدالله احمدیان", path: "/about" },
  ]);

  const kpis = [
    { value: "+۱۰ سال", label: "سابقه اکوسیستم و استارتاپ‌ها", sub: "از سال ۱۳۹۲ تا کنون" },
    { value: "۵+ دوره", label: "هوش مصنوعی سازمانی", sub: "فولاد خوزستان و اکسین" },
    { value: "۵ شهر", label: "داوری استارتاپ ویکندها", sub: "اهواز، تهران، کرج، کرمانشاه، شوشتر" },
    { value: "۱۰۰٪ بومی", label: "کاربردی و بدون کدنویسی", sub: "پایدار و سازگار با ایران" },
  ];

  return (
    <div dir="rtl" className="pb-16">
      {/* اسکیماهای استاندارد موتور جستجوی گوگل */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(profilePageJsonLd) }}
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
      <nav aria-label="مسیر راهنما" className="mx-auto max-w-6xl px-6 pt-6 text-xs text-slate-500 dark:text-slate-400">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-brand-600 transition-colors">
              خانه
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-semibold text-slate-800 dark:text-slate-200">درباره عبدالله احمدیان</li>
        </ol>
      </nav>

      {/* بخش هیرو و هویت تخصصی */}
      <section className="px-4 pt-4 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-8 text-center text-white shadow-xl md:p-16">
          <div className="mx-auto mb-6 relative h-36 w-36 overflow-hidden rounded-full border-4 border-brand-400/30 shadow-2xl md:h-44 md:w-44">
            <Image
              src={avatarImage}
              alt={fullName}
              width={176}
              height={176}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-500/10 px-4 py-1.5 text-xs font-medium text-brand-300 backdrop-blur-sm mb-4">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            مشاور و مدرس هوش مصنوعی در اهواز و خوزستان
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">{fullName}</h1>
          <p className="mt-3 text-base font-medium text-brand-200 md:text-xl">{roleTitle}</p>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-slate-300 md:text-base md:leading-8">
            {ENTITY_STATEMENT_FA}
          </p>

          {/* کال تو اکشن‌های بالای صفحه */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-sm font-semibold text-cta-fg shadow-lg transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
            >
              درخواست جلسه ارزیابی ۴۵ دقیقه‌ای (رایگان)
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
            >
              مشاهده نمونه‌کارهای سازمانی
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* نوار سنجه‌ها و شاخص‌های اقتدار (KPIs) */}
      <section className="mx-auto max-w-6xl px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4 md:gap-6 md:p-7">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="text-center">
              <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 md:text-3xl">{kpi.value}</div>
              <div className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-100 md:text-sm">{kpi.label}</div>
              <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">{kpi.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* داستان مسیر حرفه‌ای و رویکرد اجرایی */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-10">
        <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-slate-50 p-7 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
            <Users className="h-4 w-4" />
            مسیر حرفه‌ای و جهان‌بینی کاری
          </div>
          <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            هوش مصنوعی به عنوان اهرم سودآوری، نه ترندهای زودگذر
          </h2>
          <div className="space-y-4 text-base leading-8 text-slate-600 dark:text-slate-300">
            <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 leading-8">
              {shortBio}
            </p>
            {fullBio ? (
              <div className="whitespace-pre-line leading-8">{fullBio}</div>
            ) : (
              <p>
                در طول یک دهه فعالیت در خط مقدم اکوسیستم کارآفرینی و استارتاپی ایران، تجربه برگزاری و هدایت رویدادها، داوری ایده‌ها و هدایت تیم‌ها را داشته‌ام. امروز تمرکز اصلی من بر توانمندسازی سازمان‌های صنعتی، تولیدی و کسب‌وکارهای در حال رشد با هوش مصنوعی کاربردی است؛ دانشی که مستقیماً ساعات اضافه کاری را حذف می‌کند، خطاهای انسانی را به حداقل می‌رساند و تصمیم‌گیری مدیران ارشد را مبتنی بر داده و سرعت می‌سازد.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* بخش ویژه: نمونه‌کارهای سازمانی شاخص (Internal Link to /case-studies) */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-slate-900 p-8 text-white dark:bg-slate-900/90 md:p-12 border border-slate-800 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">سوابق برجسته سازمانی</span>
              <h2 className="text-2xl font-bold text-white md:text-3xl mt-2">
                تجربه‌های عملی در صنایع سنگین و سازمان‌های بزرگ
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-white transition-colors"
            >
              مشاهده تمامی نمونه‌کارها با شاخص‌های عددی
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.slice(0, 4).map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/10 hover:border-brand-500/40"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300">
                    {study.courseName || "پروژه هوش مصنوعی"}
                  </span>
                  <span className="text-xs text-slate-400">{study.client.name}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                  {study.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-slate-300 line-clamp-2">
                  {study.summary}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-brand-400 group-hover:translate-x-[-4px] transition-transform">
                  مطالعه جزئیات پروژه و دستاوردها
                  <ArrowLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5 text-center md:flex md:items-center md:justify-between md:text-right">
            <div>
              <div className="text-sm font-bold text-white">نیاز به اجرای دوره یا اتوماسیون مشابه در سازمان خود دارید؟</div>
              <div className="text-xs text-slate-300 mt-1">سرفصل‌ها و سناریوهای آموزشی متناسب با ساختار سازمانی شما تدوین می‌شود.</div>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-brand-500 px-5 py-2.5 text-xs font-bold text-slate-950 transition-colors hover:bg-brand-400 md:mt-0"
            >
              هماهنگی جلسه نیازسنجی سازمانی
            </Link>
          </div>
        </div>
      </section>

      {/* محورهای تخصص هوش مصنوعی */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">حیطه‌های مداخله</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl mt-1">
            محورهای تخصصی هوش مصنوعی و رشد
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            خدمات متمرکز بر ارزش اقتصادی مستقیم، کاهش زمان انجام وظایف و خودکارسازی فرآیندها
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aiExpertise.map((text, idx) => {
            const Icon = expertiseIcons[idx % expertiseIcons.length];
            return (
              <div
                key={text}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-6">{text}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">پیاده‌سازی متناسب با مقیاس و نیازهای داده‌ای سازمان</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            مشاهده تمامی سرفصل‌های خدمات و دوره‌ها
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* اصول و منشور کاری (Work Principles) */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 md:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">منشور همکاری</span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl mt-1">
              اصول کاری من در پروژه‌ها
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              تعهدات بنیادینی که در هر جلسه مشاوره و پروژه پیاده‌سازی به آنها پایبندم
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {WORK_PRINCIPLES.map((p, idx) => {
              const Icon = principleIcons[idx % principleIcons.length];
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-gray-100 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-400">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* فعالیت‌های جاری */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          فعالیت‌های جاری و مسئولیت‌ها
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((text, idx) => {
            const Icon = activityIcons[idx % activityIcons.length];
            return (
              <div
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 font-medium">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* مدارک و تاییدیه‌های تخصصی */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="rounded-3xl bg-brand-50/60 p-8 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900">
          <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            مدارک و تاییدیه‌های حرفه‌ای
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {specialties.map((text) => (
              <span
                key={text}
                className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-medium text-brand-800 shadow-sm dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300"
              >
                <Award className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* مسیر تجربه و سوابق اجرایی (Timeline) */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">ردپای زمانی</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl mt-1">
            نقاط عطف و مسیر تجربیات
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            سوابق مدیریت رویدادها، داوری استارتاپ‌ها و برگزاری دوره‌های ملی
          </p>
        </div>

        <div className="relative border-r-2 border-brand-200 pr-8 dark:border-brand-900 space-y-8">
          {timelineItems.map((item) => (
            <div
              key={"id" in item ? item.id : item.title}
              className="relative group"
            >
              <span className="absolute -right-[2.55rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-brand-100 dark:ring-brand-950 transition-transform group-hover:scale-125" />
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-brand-700 dark:text-brand-300 font-medium">{item.place}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* همکاری‌ها و نهادهای اکوسیستم */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          سازمان‌ها، دانشگاه‌ها و نهادهای همکار
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collaborations.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <Handshake className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* سوالات متداول (FAQ Accordion with Schema) */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">شفافیت پیش از همکاری</span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl mt-1">
            سوالات متداول مراجعان و سازمان‌ها
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            پاسخ به پرتکرارترین پرسش‌ها درباره نحوه مشاوره، برگزاری دوره‌ها و محرمانگی داده‌ها
          </p>
        </div>

        <FaqAccordion items={ABOUT_FAQ} />
      </section>

      {/* مرکز تبدیل و اقدام نهایی (High-Converting Conversion Hub) */}
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-6">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-8 text-white shadow-2xl md:p-14">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/20 px-4 py-1 text-xs font-semibold text-brand-300 mb-3">
              <Clock className="h-3.5 w-3.5" />
              ظرفیت محدود جلسات هفتگی
            </span>
            <h2 className="text-2xl font-black md:text-4xl text-white">
              آماده‌اید هوش مصنوعی را به مزیت رقابتی کسب‌وکارتان تبدیل کنید؟
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300 md:text-base">
              در یک جلسه ۴۵ دقیقه‌ای رایگان و بدون تعهد، چالش‌های فرایندی تیم شما را بررسی کرده و راهکارهای قابل پیاده‌سازی هوش مصنوعی را ترسیم می‌کنیم.
            </p>

            {/* کلیدهای اقدام اصلی */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-fg shadow-xl transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
              >
                رزرو وقت جلسه رایگان ارزیابی
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              {socialLinks.whatsapp && (
                <a
                  href={toWhatsappHref(socialLinks.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/20 px-6 py-4 text-sm font-bold text-emerald-300 backdrop-blur-sm transition-all duration-200 hover:bg-emerald-500/30"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  پیام مستقیم در واتساپ
                </a>
              )}
            </div>

            {/* شبکه‌های اجتماعی و تلفن‌ها */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="text-xs font-semibold text-slate-400 mb-4">راه‌های ارتباطی مستقیم:</div>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    dir="ltr"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-white/10 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
                    {phone}
                  </a>
                ))}
                {socialItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.key}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-brand hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* فرم ارسال پیام سریع مستقیم */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              ارسال پیام مستقیم برای عبدالله احمدیان
            </h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              پیام شما مستقیماً دریافت شده و حداکثر ظرف ۲۴ ساعت کاری بررسی و پاسخ داده می‌شود.
            </p>
          </div>
          <AboutContactForm />
        </div>
      </section>
    </div>
  );
}
