import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, serializeJsonLd } from "@/lib/post-content";
import { STARTUP_WEEKEND_CITIES, STARTUP_WEEKEND_ROLE, joinFa } from "@/lib/site";
import { CONTACT_WHATSAPP_URL, CONTACT_TELEGRAM_URL } from "@/lib/contactInfo";
import { SERVICES_FAQ } from "@/components/services/faq";
import {
  ArrowLeft,
  Bot,
  TrendingUp,
  Megaphone,
  GraduationCap,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Calendar,
  FileText,
  BarChart3,
  Plus,
  Star,
  Zap,
  Shield,
  Users,
} from "lucide-react";

export const revalidate = 300;

const servicesTitle = "خدمات مشاوره و آموزش هوش مصنوعی در اهواز";
const servicesDescription =
  "مشاوره کسب‌وکار، مشاوره رشد، آموزش هوش مصنوعی و تولید محتوا با AI برای کسب‌وکارهای اهواز و خوزستان — همه‌ی خدمات در یک نگاه، با جلسه‌ی اول رایگان.";

export const metadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    title: servicesTitle,
    description: servicesDescription,
    url: "/services",
  },
};

const dedicatedServices = [
  { href: "/services/ai-business-consulting", title: "مشاور کسب‌وکار با هوش مصنوعی" },
  { href: "/services/ai-growth-consulting", title: "مشاور توسعه و رشد کسب‌وکار" },
  { href: "/services/ai-training-ahvaz", title: "آموزش هوش مصنوعی در اهواز" },
  { href: "/services/ai-content-generation", title: "تولید محتوا با هوش مصنوعی" },
];

const SERVICES_GRID = [
  {
    id: "consulting",
    number: "۰۱",
    icon: Bot,
    href: "/services/ai-business-consulting",
    title: "مشاوره کسب‌وکار با هوش مصنوعی",
    subtitle: "نه فقط تکنولوژی — نتیجه واقعی",
    description:
      "پیدا می‌کنیم هوش مصنوعی کجای فرایندهایتان وقت و هزینه کم می‌کند، ابزار مناسب انتخاب می‌کنیم و همراه تیم پیاده‌اش می‌کنیم.",
    for: ["صاحبان کسب‌وکار", "تیم‌های مدیریتی", "سازمان‌های صنعتی"],
    deliverables: ["فهرست فرصت‌های هوش مصنوعی", "پیاده‌سازی ابزارها با تیم", "گزارش سنجش نتایج"],
    accent: "#00C389",
    size: "large",
  },
  {
    id: "growth",
    number: "۰۲",
    icon: TrendingUp,
    href: "/services/ai-growth-consulting",
    title: "مشاوره رشد و استارتاپ",
    subtitle: "از ایده تا مدل درآمدی پایدار",
    description:
      "ایده و بازار را اعتبارسنجی می‌کنیم، مدل درآمدی می‌سازیم و مسیر شش ماه آینده را قدم‌به‌قدم می‌چینیم.",
    for: ["صاحبان ایده", "استارتاپ‌های اولیه", "کسب‌وکارهای نوپا"],
    deliverables: ["مدل درآمدی واقع‌بینانه", "نقشه‌ی راه ۶ ماهه", "آمادگی برای سرمایه‌گذار"],
    accent: "#0F4C81",
    size: "medium",
  },
  {
    id: "content",
    number: "۰۳",
    icon: Megaphone,
    href: "/services/ai-content-generation",
    title: "محتوا و بازاریابی با AI",
    subtitle: "جذب مشتری، نه فقط فالوور",
    description:
      "قیف فروش و تقویم محتوا طراحی می‌کنیم و با هوش مصنوعی محتوایی می‌سازیم که به فروش برسد.",
    for: ["کسب‌وکارهای آنلاین", "برندها", "فروشگاه‌های اینستاگرامی"],
    deliverables: ["تقویم محتوای ماهانه", "محتوای آماده‌ی نشر", "گزارش و بهینه‌سازی"],
    accent: "#00C389",
    size: "medium",
  },
  {
    id: "training",
    number: "۰۴",
    icon: GraduationCap,
    href: "/services/ai-training-ahvaz",
    title: "آموزش هوش مصنوعی",
    subtitle: "حضوری در اهواز · آنلاین · سازمانی",
    description:
      "دوره‌های اختصاصی برای مدیران و تیم‌های سازمانی؛ عملی، متناسب با نیاز شما، با پشتیبانی پس از دوره.",
    for: ["مدیران ارشد", "تیم‌های سازمانی", "کارکنان متخصص"],
    deliverables: ["دوره‌ی اختصاصی ۱۶ ساعته", "منابع آموزشی کامل", "پشتیبانی پس از دوره"],
    accent: "#0F4C81",
    size: "large",
  },
];

const STATS = [
  { value: "+۱۰", unit: "سال", label: "تجربه در رشد کسب‌وکار", icon: Star },
  { value: "+۴۰", unit: "نفر", label: "مدیر و کارشناس آموزش‌دیده", icon: Users },
  { value: "+۳۲", unit: "ساعت", label: "آموزش سازمانی اجرا شده", icon: GraduationCap },
  { value: "۱۰۰٪", unit: "", label: "شفافیت در قرارداد و هزینه", icon: Shield },
];

const PARTNERS = [
  "فولاد خوزستان",
  "فولاد اکسین خوزستان",
  "بسیج رسانه خوزستان",
  "هکاتون سلامت کیش",
  "استارتاپ ویکند",
  "طرح ملی رویش",
];

const PROCESS = [
  {
    step: "۱",
    icon: Calendar,
    title: "جلسه‌ی رایگان",
    desc: "یک گفت‌وگوی کوتاه درباره‌ی وضعیت و هدف شما؛ بدون تعهد و کاملاً رایگان.",
  },
  {
    step: "۲",
    icon: FileText,
    title: "پیشنهاد مکتوب",
    desc: "دامنه‌ی کار، زمان‌بندی و هزینه را شفاف و مکتوب دریافت می‌کنید.",
  },
  {
    step: "۳",
    icon: Zap,
    title: "اجرا و پیشرفت",
    desc: "کار را با هم پیش می‌بریم؛ نتیجه را منظم گزارش می‌کنیم.",
  },
  {
    step: "۴",
    icon: BarChart3,
    title: "سنجش و بهینه‌سازی",
    desc: "نتایج را اندازه می‌گیریم، اشکالات را برطرف می‌کنیم و مسیر را بهینه می‌کنیم.",
  },
];

const WHY_POINTS = [
  { icon: Shield, text: "هزینه شفاف و مکتوب — بدون هزینه‌ی پنهان" },
  { icon: Zap, text: "نتیجه‌محور — نه فقط مشاوره روی کاغذ" },
  { icon: Users, text: "همراهی تا پیاده‌سازی واقعی در تیم شما" },
  { icon: Star, text: "سابقه‌ی کار با بزرگ‌ترین سازمان‌های خوزستان" },
  { icon: Sparkles, text: "آپدیت مداوم با جدیدترین ابزارهای هوش مصنوعی" },
  { icon: MessageCircle, text: "پشتیبانی آنلاین پس از پروژه در واتس‌اپ و تلگرام" },
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

  const faqJsonLd = buildFaqJsonLd(SERVICES_FAQ);

  return (
    <div dir="rtl" className="overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      )}

      {/* ═══════════════════════════════════════════════════════════
          HERO — Full-bleed gradient with glow orbs and service pills
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative -mt-[82px] min-h-[90vh] overflow-hidden bg-[#071E33] text-white">
        {/* Mesh gradient background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 10%, rgba(0,195,137,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(15,76,129,0.5) 0%, transparent 60%), linear-gradient(160deg, #071E33 0%, #0A2540 50%, #071E33 100%)",
          }}
        />
        {/* Glow orbs */}
        <div
          aria-hidden="true"
          className="absolute left-[60%] top-[15%] h-[500px] w-[500px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "#00C389" }}
        />
        <div
          aria-hidden="true"
          className="absolute left-[10%] top-[55%] h-[350px] w-[350px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "#0F4C81" }}
        />

        <div className="relative mx-auto flex max-w-[1240px] flex-col items-start gap-10 px-6 pb-24 pt-[160px]">
          {/* Breadcrumb */}
          <nav aria-label="مسیر" className="flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="transition-colors hover:text-white/80">خانه</Link>
            <span>/</span>
            <span className="text-white/80">خدمات</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00C389]/30 bg-[#00C389]/10 px-4 py-1.5 text-sm font-medium text-[#00C389]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00C389] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00C389]" />
            </span>
            پذیرش پروژه‌ی جدید — جلسه‌ی اول رایگان
          </div>

          {/* Title */}
          <div className="max-w-[820px]">
            <h1 className="text-[clamp(38px,5.5vw,80px)] font-extrabold leading-[1.2] tracking-tight">
              هوش مصنوعی برای{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, #00C389 0%, #5fe3b5 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                کسب‌وکار واقعی
              </span>
            </h1>
            <p className="mt-5 max-w-[640px] text-[18px] leading-[2] text-white/65">
              از مشاوره و پیاده‌سازی تا آموزش تیم و تولید محتوا — همه‌ی آن‌چه برای استفاده از هوش مصنوعی در کسب‌وکارتان نیاز دارید، در اهواز و خوزستان.
            </p>
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[56px] items-center rounded-full bg-[#00C389] px-8 text-[17px] font-bold text-[#071E33] shadow-[0_0_40px_rgba(0,195,137,0.4)] transition-all duration-300 hover:bg-[#00d49a] hover:shadow-[0_0_60px_rgba(0,195,137,0.5)]"
            >
              رزرو جلسه‌ی رایگان
            </Link>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[56px] items-center gap-2 rounded-full border border-white/20 px-7 text-[16px] font-medium text-white/90 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              واتس‌اپ
            </a>
          </div>

          {/* Quick nav pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            {[
              { label: "مشاوره کسب‌وکار", id: "#consulting" },
              { label: "مشاوره رشد", id: "#growth" },
              { label: "تولید محتوا", id: "#content" },
              { label: "آموزش AI", id: "#training" },
              { label: "روند همکاری", id: "#process" },
            ].map(({ label, id }) => (
              <a
                key={id}
                href={id}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-[#00C389]/50 hover:bg-[#00C389]/10 hover:text-[#00C389]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--background, #fff))",
          }}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BENTO STRIP
      ═══════════════════════════════════════════════════════════ */}
      <section aria-label="آمار و سوابق" className="relative z-10 bg-white dark:bg-slate-900">
        <div className="mx-auto max-w-[1240px] px-6 py-16">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {STATS.map(({ value, unit, label, icon: Icon }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-[1.5rem] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 transition-all duration-300 hover:border-[#00C389]/30 hover:shadow-[0_8px_30px_rgba(0,195,137,0.1)] dark:border-slate-800 dark:from-slate-800 dark:to-slate-900 dark:hover:border-[#00C389]/30"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00C389]/10 text-[#00C389]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-[2rem] font-extrabold text-slate-900 dark:text-white">
                  {value}
                  {unit && <span className="mr-1 text-[1rem] font-medium text-slate-500 dark:text-slate-400">{unit}</span>}
                </div>
                <p className="mt-1 text-[13px] leading-[1.6] text-slate-500 dark:text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES BENTO GRID
      ═══════════════════════════════════════════════════════════ */}
      <section id="services-grid" aria-labelledby="services-heading" className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#00C389]">خدمات</p>
            <h2
              id="services-heading"
              className="text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.25] text-slate-900 dark:text-white"
            >
              چطور می‌توانم کمکتان کنم؟
            </h2>
            <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.9] text-slate-500 dark:text-slate-400">
              چهار خدمت تخصصی، طراحی‌شده برای کسب‌وکارهای اهواز و خوزستان
            </p>
          </div>

          {/* Bento grid: 2 large + 2 medium */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {/* Card 01 — large (spans 2 cols on xl) */}
            {SERVICES_GRID.map((svc, idx) => {
              const Icon = svc.icon;
              const isLarge = idx === 0;
              const isLargeLast = idx === 3;

              return (
                <div
                  key={svc.id}
                  id={svc.id}
                  className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
                    isLarge || isLargeLast ? "xl:col-span-2" : ""
                  }`}
                >
                  {/* Glow on hover */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(ellipse 60% 40% at 50% 0%, ${svc.accent}18 0%, transparent 70%)`,
                    }}
                  />

                  <div className={`relative flex h-full flex-col p-8 ${isLarge || isLargeLast ? "md:flex-row md:gap-10" : ""}`}>
                    {/* Left / Top content */}
                    <div className={`flex flex-1 flex-col gap-5 ${isLarge || isLargeLast ? "md:max-w-[480px]" : ""}`}>
                      {/* Number + Icon row */}
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[13px] font-bold"
                          style={{ color: svc.accent }}
                        >
                          {svc.number}
                        </span>
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl"
                          style={{ background: `${svc.accent}18`, color: svc.accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Title */}
                      <div>
                        <h3 className="text-[1.35rem] font-extrabold leading-[1.3] text-slate-900 dark:text-white">
                          {svc.title}
                        </h3>
                        <p className="mt-1 text-[13px] font-medium" style={{ color: svc.accent }}>
                          {svc.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-[15px] leading-[1.9] text-slate-500 dark:text-slate-400">
                        {svc.description}
                      </p>

                      {/* Target audience pills */}
                      <div className="flex flex-wrap gap-2">
                        {svc.for.map((who) => (
                          <span
                            key={who}
                            className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                          >
                            {who}
                          </span>
                        ))}
                      </div>

                      {/* Deliverables */}
                      <ul className="flex flex-col gap-2">
                        {svc.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-[14px] text-slate-600 dark:text-slate-300">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0"
                              style={{ color: svc.accent }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                        <Link
                          href="/contact"
                          className="inline-flex min-h-[48px] items-center rounded-full px-6 text-[14px] font-bold text-white transition-all duration-300 hover:opacity-90"
                          style={{ background: svc.accent }}
                        >
                          شروع رایگان
                        </Link>
                        <Link
                          href={svc.href}
                          className="inline-flex min-h-[48px] items-center gap-1.5 text-[14px] font-medium text-slate-500 underline decoration-slate-200 underline-offset-4 transition-colors hover:decoration-current dark:text-slate-400 dark:decoration-slate-700"
                          style={{ ["--hover-color" as string]: svc.accent }}
                        >
                          جزئیات بیشتر
                          <ArrowLeft className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>

                    {/* Right side — visual for large cards */}
                    {(isLarge) && (
                      <div className="relative mt-8 hidden min-h-[280px] flex-[0_0_340px] overflow-hidden rounded-[1.5rem] md:mt-0 md:block">
                        <Image
                          src="/images/services/class.jpg"
                          alt="کارگاه آموزشی هوش مصنوعی فولاد خوزستان"
                          fill
                          sizes="340px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 rounded-[1.5rem]" style={{ background: "linear-gradient(to top, rgba(7,30,51,0.5) 0%, transparent 50%)" }} />
                        <div className="absolute bottom-4 right-4 rounded-xl bg-black/60 px-3 py-2 text-[12px] text-white/90 backdrop-blur-sm">
                          کارگاه آموزشی · فولاد خوزستان
                        </div>
                      </div>
                    )}

                    {(isLargeLast) && (
                      <div className="relative mt-8 hidden min-h-[280px] flex-[0_0_340px] overflow-hidden rounded-[1.5rem] md:mt-0 md:block">
                        <Image
                          src="/images/services/class.jpg"
                          alt="دوره آموزش هوش مصنوعی سازمانی"
                          fill
                          sizes="340px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 rounded-[1.5rem]" style={{ background: "linear-gradient(to top, rgba(7,30,51,0.6) 0%, transparent 50%)" }} />
                        <div className="absolute bottom-4 right-4 rounded-xl bg-black/60 px-3 py-2 text-[12px] text-white/90 backdrop-blur-sm">
                          آموزش سازمانی · حضوری و آنلاین
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PARTNER LOGOS MARQUEE
      ═══════════════════════════════════════════════════════════ */}
      <section aria-label="همکاری‌های اخیر" className="overflow-hidden border-y border-slate-100 bg-white py-10 dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-6 text-center text-sm text-slate-400 dark:text-slate-500">همکاری‌های اخیر</p>
        <div className="flex gap-6 overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_18s_linear_infinite] gap-6">
            {[...PARTNERS, ...PARTNERS].map((name, i) => (
              <span
                key={i}
                className="inline-flex h-14 items-center whitespace-nowrap rounded-2xl border border-slate-200 bg-slate-50 px-7 text-[15px] font-bold text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          WHY ME — Dark gradient section
      ═══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="why-heading"
        className="relative overflow-hidden py-28"
        style={{ background: "linear-gradient(135deg, #071E33 0%, #0A2540 50%, #071E33 100%)" }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: "#00C389" }}
        />

        <div className="relative mx-auto max-w-[1240px] px-6">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:items-center">
            {/* Left — text */}
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#00C389]">چرا عبدالله احمدیان؟</p>
              <h2
                id="why-heading"
                className="text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.25] text-white"
              >
                کار با کسی که{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #00C389, #5fe3b5)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  نتیجه را تضمین می‌کند
                </span>
              </h2>
              <p className="mt-5 text-[16px] leading-[2] text-white/60">
                بیش از ده سال تجربه‌ی واقعی در کسب‌وکار، با سابقه‌ی کار در بزرگ‌ترین سازمان‌های خوزستان
              </p>
            </div>

            {/* Right — why points grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {WHY_POINTS.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#00C389]/30 hover:bg-[#00C389]/5"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#00C389]/20">
                    <Icon className="h-4 w-4 text-[#00C389]" />
                  </div>
                  <p className="text-[14px] leading-[1.8] text-white/80">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          PROCESS — How we work together
      ═══════════════════════════════════════════════════════════ */}
      <section id="process" aria-labelledby="process-heading" className="bg-white py-28 dark:bg-slate-900">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#00C389]">روند همکاری</p>
            <h2
              id="process-heading"
              className="text-[clamp(26px,3.5vw,46px)] font-extrabold leading-[1.3] text-slate-900 dark:text-white"
            >
              همکاری چطور پیش می‌رود؟
            </h2>
            <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-[1.9] text-slate-500 dark:text-slate-400">
              هزینه پس از جلسه‌ی اول و بر اساس دامنه‌ی کار، شفاف و مکتوب مشخص می‌شود
            </p>
          </div>

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {/* Connector line (desktop) */}
            <div
              aria-hidden="true"
              className="absolute right-[12.5%] top-[2.75rem] hidden h-[2px] w-3/4 xl:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #00C389 0, #00C389 8px, transparent 8px, transparent 20px)",
                opacity: 0.3,
              }}
            />

            {PROCESS.map(({ step, icon: Icon, title, desc }) => (
              <div
                key={step}
                className="relative flex flex-col gap-4 rounded-[1.75rem] border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-7 dark:border-slate-800 dark:from-slate-800 dark:to-slate-900"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00C389] text-[1.1rem] font-extrabold text-[#071E33]">
                    {step}
                  </div>
                  <Icon className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                </div>

                <div>
                  <h3 className="text-[1.1rem] font-extrabold text-slate-900 dark:text-white">{title}</h3>
                  <p className="mt-2 text-[14px] leading-[1.9] text-slate-500 dark:text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CASE STUDY TEASER
      ═══════════════════════════════════════════════════════════ */}
      <section aria-labelledby="case-heading" className="bg-slate-50 py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#071E33] to-[#0A2540]">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Text */}
              <div className="flex flex-col justify-center gap-6 p-10 lg:p-16">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00C389]/30 bg-[#00C389]/10 px-4 py-1.5 text-sm font-medium text-[#00C389]">
                  <Star className="h-3.5 w-3.5" />
                  نمونه کار واقعی
                </div>
                <div>
                  <h2
                    id="case-heading"
                    className="text-[clamp(24px,3.5vw,42px)] font-extrabold leading-[1.3] text-white"
                  >
                    فولاد خوزستان —{" "}
                    <span style={{ color: "#00C389" }}>
                      آموزش هوش مصنوعی
                    </span>
                    {" "}برای مدیران
                  </h2>
                  <p className="mt-4 text-[15px] leading-[2] text-white/60">
                    برگزاری کارگاه‌های آموزشی اختصاصی هوش مصنوعی برای مدیران، روسا و کارشناسان ارشد. بیش از ۴۰ نفر در چندین جلسه‌ی فشرده آموزش دیدند.
                  </p>
                </div>
                <div className="flex gap-8">
                  <div>
                    <div className="text-[2rem] font-extrabold text-[#00C389]">+۴۰</div>
                    <div className="text-sm text-white/50">نفر آموزش‌دیده</div>
                  </div>
                  <div>
                    <div className="text-[2rem] font-extrabold text-[#00C389]">+۳۲</div>
                    <div className="text-sm text-white/50">ساعت آموزش</div>
                  </div>
                </div>
                <Link
                  href="/case-studies"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-[#00C389] px-7 py-3.5 text-[15px] font-bold text-[#071E33] transition-all hover:bg-[#00d49a]"
                >
                  مشاهده همه نمونه‌کارها
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>

              {/* Image */}
              <div className="relative min-h-[300px] lg:min-h-[400px]">
                <Image
                  src="/images/services/class.jpg"
                  alt="کارگاه آموزش هوش مصنوعی فولاد خوزستان"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(7,30,51,0.6) 0%, transparent 50%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQ
      ═══════════════════════════════════════════════════════════ */}
      <section id="faq" aria-labelledby="faq-heading" className="bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-[800px] px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#00C389]">سؤالات رایج</p>
            <h2
              id="faq-heading"
              className="text-[clamp(26px,3.5vw,44px)] font-extrabold leading-[1.3] text-slate-900 dark:text-white"
            >
              پاسخ سؤالات متداول
            </h2>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
            {SERVICES_FAQ.map(({ question, answer }, i) => (
              <details
                key={question}
                open={i === 0}
                className="group py-5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold text-slate-900 transition-colors hover:text-[#00C389] dark:text-white dark:hover:text-[#00C389] [&::-webkit-details-marker]:hidden">
                  {question}
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-all group-open:border-[#00C389]/30 group-open:bg-[#00C389]/10 dark:border-slate-700 dark:bg-slate-800 dark:group-open:border-[#00C389]/30 dark:group-open:bg-[#00C389]/10">
                    <Plus
                      className="h-3.5 w-3.5 text-slate-500 transition-transform duration-300 group-open:rotate-45 group-open:text-[#00C389] dark:text-slate-400"
                    />
                  </div>
                </summary>
                <p className="mt-4 text-[15px] leading-[2] text-slate-500 dark:text-slate-400">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA — Full width dark gradient
      ═══════════════════════════════════════════════════════════ */}
      <section
        aria-labelledby="cta-heading"
        className="relative overflow-hidden py-32"
        style={{ background: "linear-gradient(160deg, #071E33 0%, #0A2540 60%, #071E33 100%)" }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[150px]"
          style={{ background: "#00C389" }}
        />

        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00C389]/30 bg-[#00C389]/10 px-5 py-2 text-sm font-medium text-[#00C389]">
            <Sparkles className="h-4 w-4" />
            جلسه‌ی اول کاملاً رایگان است
          </div>

          <h2
            id="cta-heading"
            className="text-[clamp(30px,5vw,64px)] font-extrabold leading-[1.2] text-white"
          >
            آماده‌اید از{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00C389, #5fe3b5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              هوش مصنوعی
            </span>{" "}
            برای کسب‌وکارتان استفاده کنید؟
          </h2>

          <p className="mx-auto mt-6 max-w-[520px] text-[17px] leading-[2] text-white/60">
            در یک جلسه‌ی کوتاه و رایگان، با هم پیدا می‌کنیم کدام خدمت دقیقاً به کار شما می‌آید.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex min-h-[60px] items-center rounded-full bg-[#00C389] px-10 text-[18px] font-bold text-[#071E33] shadow-[0_0_60px_rgba(0,195,137,0.5)] transition-all duration-300 hover:bg-[#00d49a] hover:shadow-[0_0_80px_rgba(0,195,137,0.6)]"
            >
              رزرو جلسه‌ی مشاوره رایگان
            </Link>
            <a
              href={CONTACT_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[60px] items-center gap-2 rounded-full border border-white/20 px-8 text-[17px] font-medium text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <MessageCircle className="h-5 w-5" />
              پیام در واتس‌اپ
            </a>
            <a
              href={CONTACT_TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[60px] items-center gap-2 rounded-full border border-white/20 px-8 text-[17px] font-medium text-white/90 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              پیام در تلگرام
            </a>
          </div>

          <p className="mt-8 text-[13px] text-white/35">
            عبدالله احمدیان — مشاور هوش مصنوعی کسب‌وکار · اهواز
          </p>
        </div>
      </section>
    </div>
  );
}
