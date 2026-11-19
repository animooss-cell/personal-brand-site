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
  Compass,
  Layers,
  ChevronLeft,
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
  "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی و رشد کسب‌وکار در اهواز. سابقه ۵ دوره هوش مصنوعی برای فولاد خوزستان و اکسین، داور استارتاپ ویکندها با بیش از یک دهه سابقه عملیاتی.";

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

const solutionPillars = [
  {
    icon: Brain,
    title: "آموزش هوش مصنوعی سازمانی و مهندسی پرامپت",
    description: "کارگاه‌های عملی و کاربردی ویژه مدیران و کارشناسان صنایع (فولاد، انرژی، بازرگانی) جهت تسلط بر هوش مصنوعی مولد بدون نیاز به پیش‌نیاز برنامه‌نویسی.",
    deliverables: ["مهندسی پرامپت پیشرفته", "تحلیل داده‌ها و گزارش‌نویسی هوشمند", "سناریونویسی و تولید محتوا"],
    link: "/services/corporate-ai-training",
  },
  {
    icon: Cpu,
    title: "اتوماسیون فرایندهای کاری با هوش مصنوعی",
    description: "شناسایی گلوگاه‌های تکراری و اداری در سازمان، و پیاده‌سازی سیستم‌های خودکارساز جهت افزایش سرعت و کاهش خطای انسانی.",
    deliverables: ["جریان‌های کاری No-Code", "اتوماسیون ایمیل و اسناد", "یکپارچه‌سازی ابزارهای هوش مصنوعی"],
    link: "/services/ai-business-consulting",
  },
  {
    icon: Megaphone,
    title: "استراتژی محتوا، برندسازی و روابط عمومی هوشمند",
    description: "طراحی سناریوهای تولید محتوای چندرسانه‌ای، تحلیل افکار عمومی و ارتقای تصویر برند با بهره‌گیری از ابزارهای نسل جدید هوش مصنوعی.",
    deliverables: ["تولید محتوای صوتی و تصویری", "پایش رسانه‌ای و افکارسنجی", "کمپین‌های داده‌محور"],
    link: "/services/ai-content-generation",
  },
  {
    icon: Rocket,
    title: "مدل‌سازی کسب‌وکار و رشد استارتاپ‌ها",
    description: "مشاوره تخصصی اعتبارسنجی ایده، طراحی بوم مدل کسب‌وکار (BMC)، تدوین استراتژی درآمدی و منتورینگ تیم‌های نوپا جهت جذب سرمایه.",
    deliverables: ["طراحی بوم مدل کسب‌وکار", "استراتژی بازاریابی و فروش", "آمادگی جذب سرمایه و ارائه"],
    link: "/services/ai-growth-consulting",
  },
];

export default async function AboutPage() {
  const {
    fullName,
    roleTitle,
    avatarImage,
    shortBio,
    fullBio,
    activities,
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
    { value: "+۱۰ سال", label: "سابقه اکوسیستم و استارتاپ‌ها", sub: "منتورینگ، داوری و راه‌اندازی از سال ۹۲" },
    { value: "۵+ دوره", label: "هوش مصنوعی سازمانی", sub: "مدرس دوره‌های فولاد خوزستان و اکسین" },
    { value: "۵ شهر", label: "داوری استارتاپ ویکندها", sub: "اهواز، تهران، کرج، کرمانشاه، شوشتر" },
    { value: "۱۰۰٪ بومی", label: "کاربردی و بدون کدنویسی", sub: "سازگار با زیرساخت واقعی ایران" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50/60 dark:bg-slate-950 text-slate-800 dark:text-slate-100">
      {/* اسکیماهای ساختاریافته گوگل */}
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
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-8">
        <nav aria-label="مسیر راهنما" className="text-xs text-slate-500 dark:text-slate-400">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                خانه
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300 dark:text-slate-700">/</li>
            <li className="font-semibold text-slate-700 dark:text-slate-200">درباره عبدالله احمدیان</li>
          </ol>
        </nav>
      </div>

      {/* بخش هیرو لوکس و دونمایی (Executive 2-Column Hero) */}
      <section className="px-4 pt-4 md:px-8">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-6 text-white shadow-2xl md:p-12 lg:p-16 border border-brand-500/20">
          {/* افکت نورپردازی محو در پس‌زمینه (Brand Glow Mesh) */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand-300/10 blur-3xl" />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-12">
            {/* ستون متن و معرفی (ستون راست در راست‌به‌چپ) */}
            <div className="order-2 lg:order-1 lg:col-span-7 text-right">
              {/* نشان زنده و معتبر */}
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold text-brand-300 backdrop-blur-md mb-5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400"></span>
                </span>
                مدرس و مشاور هوش مصنوعی سازمانی در اهواز
              </div>

              <h1 className="text-3xl font-black leading-tight text-white md:text-5xl lg:text-5xl">
                {fullName}
              </h1>

              <p className="mt-3 text-lg font-bold text-brand-300 md:text-xl">
                {roleTitle}
              </p>

              {/* گزاره هویتی رسمی */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-200 backdrop-blur-sm md:text-base md:leading-8">
                {ENTITY_STATEMENT_FA}
              </div>

              {/* نقاط تمایز کلیدی */}
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5 text-xs md:text-sm text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>۵ دوره تخصصی در فولاد خوزستان و اکسین</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>۱۰+ سال تجربه عملیاتی در اکوسیستم نوآوری</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-brand-400 shrink-0" />
                  <span>راهکارهای کاربردی بدون نیاز به کدنویسی</span>
                </div>
              </div>

              {/* دکمه‌های اقدام اصلی (Hero CTAs) */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-7 py-4 text-sm font-bold text-cta-fg shadow-lg shadow-brand-500/25 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
                >
                  درخواست جلسه ارزیابی ۴۵ دقیقه‌ای (رایگان)
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/case-studies"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
                >
                  مشاهده نمونه‌کارهای سازمانی
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* ستون پرتره و کارت تصویر با بج‌های شناور (ستون چپ در راست‌به‌چپ) */}
            <div className="order-1 lg:order-2 lg:col-span-5">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                {/* کادر عکس اصلی */}
                <div className="relative overflow-hidden rounded-[2rem] border-2 border-brand-400/30 bg-gradient-to-t from-slate-900 via-transparent to-transparent shadow-2xl">
                  <Image
                    src={avatarImage}
                    alt={fullName}
                    width={600}
                    height={700}
                    className="h-[360px] w-full object-cover object-top md:h-[450px]"
                    priority
                  />
                  {/* سایه ملایم پایین عکس برای خوانایی بج‌ها */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071E33] via-transparent to-transparent opacity-80" />
                </div>

                {/* بج شناور ۱: سال‌های تجربه */}
                <div className="absolute -top-3 -right-3 sm:-right-5 rounded-2xl border border-white/15 bg-slate-900/85 p-3.5 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">+۱۰ سال سابقه</div>
                      <div className="text-[10px] text-slate-300">اکوسیستم و استارتاپ‌ها</div>
                    </div>
                  </div>
                </div>

                {/* بج شناور ۲: سابقه صنعتی فولاد */}
                <div className="absolute -bottom-4 -left-3 sm:-left-5 rounded-2xl border border-white/15 bg-slate-900/85 p-3.5 shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">فولاد خوزستان و اکسین</div>
                      <div className="text-[10px] text-brand-300">مدرس ۵ دوره هوش مصنوعی</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* نوار سنجه‌ها و شاخص‌های اقتدار (Integrated Authority Strip) */}
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
              <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400 leading-5">
                {kpi.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* بخش داستان مسیر حرفه‌ای و منشور کاری (Story & Core Principles) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* ستون راست: روایت داستان و جهان‌بینی */}
          <div className="lg:col-span-7 rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-3">
              <Compass className="h-4 w-4" />
              جهان‌بینی و رویکرد اجرایی
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white md:text-3xl mb-5">
              هوش مصنوعی؛ اهرم سودآوری ملموس، نه ترندهای زودگذر
            </h2>

            <div className="space-y-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
              <p className="font-semibold text-slate-800 dark:text-slate-100 leading-8">
                {shortBio}
              </p>

              {fullBio ? (
                <div className="whitespace-pre-line leading-8">{fullBio}</div>
              ) : (
                <p>
                  در طول بیش از یک دهه حضور در متن اکوسیستم کارآفرینی کشور — از مدیریت رویدادهایی چون الکام‌استارز و هکاتون سلامت کیش تا مربی‌گری و داوری استارتاپ ویکندها در ۵ استان — چالش‌های گوناگون تیم‌ها را از نزدیک لمس کرده‌ام. امروز رسالت من پیوند زدن ظرفیت‌های نوآورانه هوش مصنوعی با نیازهای واقعی صنایع مادر و کسب‌وکارهای در حال توسعه است.
                </p>
              )}

              {/* جعبه نقل‌قول برجسته */}
              <div className="mt-6 rounded-2xl border-r-4 border-brand-500 bg-brand-50/70 p-5 dark:bg-brand-950/30">
                <p className="text-sm font-semibold italic text-slate-800 dark:text-slate-200 leading-7">
                  «هوش مصنوعی زمانی ارزش پیدا می‌کند که در گزارش‌نویسی، تحلیل افکار عمومی، فروش و اتوماسیون فرایندها، ساعت‌ها کار دستی را آزاد کند و اثر ریالی مستقیم بر سودآوری سازمان بگذارد.»
                </p>
                <div className="mt-2 text-xs font-bold text-brand-700 dark:text-brand-300">
                  — عبدالله احمدیان
                </div>
              </div>
            </div>
          </div>

          {/* ستون چپ: ۳ اصل و منشور کاری */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-white to-slate-50/80 p-7 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:p-8">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 mb-2">
                <ShieldCheck className="h-4 w-4" />
                منشور و تعهدات کاری
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                ۳ اصل تخطی‌ناپذیر در همکاری با سازمان‌ها
              </h3>

              <div className="space-y-4">
                {WORK_PRINCIPLES.map((principle, idx) => (
                  <div
                    key={principle.title}
                    className="rounded-2xl border border-gray-150 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/90"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-xs">
                        {idx + 1}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {principle.title}
                      </h4>
                    </div>
                    <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 pr-11">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* بخش نمونه‌کارهای برجسته سازمانی (Enterprise Case Studies Showcase) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-6 text-white shadow-xl md:p-10 lg:p-12 border border-brand-500/20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-300 uppercase tracking-wider">
                <Layers className="h-4 w-4" />
                سوابق اجرایی در صنایع مادر
              </span>
              <h2 className="text-2xl font-black text-white md:text-3xl mt-2">
                تجربه‌های عملیاتی در فولاد خوزستان و صنایع پیشرو
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/20 hover:border-white/40 shrink-0"
            >
              مشاهده تمامی نمونه‌کارها با شاخص‌های عددی
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {CASE_STUDIES.slice(0, 4).map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-200 hover:bg-white/10 hover:border-brand-400/40 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-block rounded-full bg-brand-500/20 px-3 py-1 text-xs font-semibold text-brand-300 border border-brand-500/30">
                      {study.courseName || "پروژه هوش مصنوعی"}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{study.client.name}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-brand-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-300 line-clamp-2">
                    {study.summary}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-300 group-hover:translate-x-[-4px] transition-transform">
                  مطالعه مستندات و دستاوردها
                  <ArrowLeft className="h-3.5 w-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* نوار دعوت به همکاری سازمانی */}
          <div className="mt-8 rounded-2xl border border-brand-400/30 bg-brand-500/15 p-5 text-center md:flex md:items-center md:justify-between md:text-right backdrop-blur-sm">
            <div>
              <div className="text-sm font-bold text-white">نیاز به برگزاری دوره اختصاصی یا اتوماسیون در سازمان خود دارید؟</div>
              <div className="text-xs text-slate-300 mt-1">سرفصل‌ها و فرآیندهای آموزشی بر اساس دغدغه‌های سازمانی شما طراحی می‌شوند.</div>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-cta px-6 py-2.5 text-xs font-bold text-cta-fg transition-all hover:bg-cta-hover shadow-md md:mt-0"
            >
              درخواست جلسه نیازسنجی سازمانی
            </Link>
          </div>
        </div>
      </section>

      {/* محورهای تخصصی و ۴ ستون راهکار (4 Solution Pillars) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">حیطه‌های تخصصی</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            محورهای مداخله و خدمات هوش مصنوعی
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            راهکارهایی با تمرکز بر ارزش افزوده اقتصادی، کاهش زمان چرخه کار و اتوماسیون هوشمند
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {solutionPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="group flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-brand-500/50 dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-6">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs leading-6 text-slate-600 dark:text-slate-400 mb-5">
                    {pillar.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {pillar.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={pillar.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  مشاهده سرفصل‌ها و توضیحات تکمیلی
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
          >
            مشاهده سبد کامل خدمات و دوره‌های آموزشی
            <ArrowLeft className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* فعالیت‌های جاری و مسئولیت‌ها */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          فعالیت‌های جاری و مسئولیت‌ها
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((text, idx) => {
            const Icon = activityIcons[idx % activityIcons.length];
            return (
              <div
                key={text}
                className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300 font-medium">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* مدارک و تاییدیه‌های تخصصی */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <div className="rounded-3xl bg-brand-50/70 p-6 dark:bg-brand-950/20 border border-brand-200/80 dark:border-brand-900/60 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
              مدارک و تاییدیه‌های تخصصی
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">مدارک مدیریتی و حرفه‌ای معتبر بین‌المللی و ملی</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {specialties.map((text) => (
              <span
                key={text}
                className="inline-flex items-center gap-2.5 rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-800 shadow-sm dark:border-brand-800 dark:bg-slate-900 dark:text-brand-300"
              >
                <Award className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* مسیر تجربیات و ردپای زمانی (Timeline) */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">سوابق اجرایی</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            نقاط عطف و مسیر تجربیات
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            سوابق مدیریت رویدادهای ملی، داوری استارتاپ‌ها و برگزاری دوره‌های صنعتی
          </p>
        </div>

        <div className="relative border-r-2 border-brand-300 pr-8 dark:border-brand-900 space-y-6">
          {timelineItems.map((item) => (
            <div
              key={"id" in item ? item.id : item.title}
              className="relative group"
            >
              <span className="absolute -right-[2.55rem] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-brand-100 dark:ring-brand-950 transition-transform group-hover:scale-125" />
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-1 text-xs text-brand-700 dark:text-brand-300 font-medium">{item.place}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* سازمان‌ها و نهادهای همکار (Ecosystem Partners) */}
      <section className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          سازمان‌ها، دانشگاه‌ها و نهادهای همکار
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {collaborations.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors hover:border-brand-500/40"
            >
              <Handshake className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* بخش سوالات متداول (FAQ Accordion with Schema) */}
      <section className="mx-auto max-w-4xl px-4 py-12 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">شفافیت پیش از رزرو</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white md:text-3xl mt-1">
            سوالات متداول مدیران و مراجعان
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            پاسخ شفاف به پرتکرارترین پرسش‌ها پیرامون جلسات مشاوره، امنیت داده‌ها و دوره‌ها
          </p>
        </div>

        <FaqAccordion items={ABOUT_FAQ} />
      </section>

      {/* هاب تبدیل نهایی (Ultimate High-Converting CTA Card) */}
      <section className="mx-auto max-w-5xl px-4 pt-8 pb-12 md:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] via-[#0F4C81] to-[#0A2540] p-8 text-white shadow-2xl md:p-14 border border-brand-500/30 text-center">
          {/* جلوه نوری محو */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-96 rounded-full bg-brand-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-400/15 border border-brand-400/30 px-4 py-1.5 text-xs font-bold text-brand-300 mb-4 backdrop-blur-md">
              <Clock className="h-3.5 w-3.5 text-brand-400" />
              ظرفیت محدود جلسات مشاوره هفتگی
            </span>

            <h2 className="text-2xl font-black md:text-4xl text-white leading-tight">
              آماده‌اید هوش مصنوعی را به اهرم رشد کسب‌وکارتان تبدیل کنید؟
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-200 md:text-base">
              در یک جلسه ۴۵ دقیقه‌ای رایگان و بدون تعهد، چالش‌های فرایندی تیم شما را بررسی کرده و راهکارهای قابل پیاده‌سازی هوش مصنوعی را ترسیم می‌کنیم.
            </p>

            {/* کلیدهای تبدیل اصلی */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-fg shadow-xl shadow-brand-500/30 transition-all duration-200 hover:bg-cta-hover hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg"
              >
                رزرو وقت جلسه رایگان ارزیابی
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>

              {socialLinks.whatsapp && (
                <a
                  href={toWhatsappHref(socialLinks.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-7 py-4 text-sm font-bold text-emerald-300 backdrop-blur-sm transition-all duration-200 hover:bg-emerald-500/30"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  گفتگوی مستقیم در واتساپ
                </a>
              )}
            </div>

            {/* راه‌های ارتباط مستقیم */}
            <div className="mt-10 border-t border-white/10 pt-6">
              <div className="text-xs font-medium text-slate-300 mb-4">راه‌های تماس و شبکه‌های اجتماعی:</div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {phoneNumbers.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    dir="ltr"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
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
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-brand-500 hover:text-white transition-colors"
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

      {/* فرم ارسال پیام سریع درون‌صفحه */}
      <section className="mx-auto max-w-3xl px-4 pb-16 md:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-10">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              ارسال پیام مستقیم برای عبدالله احمدیان
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              پیام شما مستقیماً دریافت شده و ظرف کمتر از ۲۴ ساعت کاری بررسی و پاسخ داده می‌شود.
            </p>
          </div>
          <AboutContactForm />
        </div>
      </section>
    </div>
  );
}
