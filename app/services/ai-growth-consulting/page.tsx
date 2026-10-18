import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  TrendingUp,
  Megaphone,
  Gauge,
  CheckCircle2,
  ListChecks,
  Briefcase,
  MapPin,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";

export const revalidate = 300;

const title = "مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی";
const description =
  "مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی در اهواز: افزایش فروش و مقیاس‌پذیری با AI برای استارتاپ‌ها و کسب‌وکارهای رو به رشد. جلسه‌ی اول رایگان است.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-growth-consulting" },
  openGraph: { title, description, url: "/services/ai-growth-consulting" },
};

const focusAreas = [
  { icon: Megaphone, title: "بازاریابی و فروش با AI", desc: "شناسایی مشتری هدف، شخصی‌سازی پیام‌ها و اتوماسیون قیف فروش با ابزارهای هوش مصنوعی." },
  { icon: Gauge, title: "بهینه‌سازی عملیات", desc: "حذف گلوگاه‌های عملیاتی که مانع رشد سریع‌تر کسب‌وکار می‌شوند." },
  { icon: TrendingUp, title: "تصمیم‌گیری استراتژیک با داده", desc: "تحلیل داده‌های واقعی کسب‌وکار برای تصمیم‌های رشد، نه حدس و آزمون‌وخطا." },
];

const steps = [
  {
    title: "بررسی وضعیت فعلی",
    desc: "تحلیل داده‌های موجود کسب‌وکار شما در فروش، بازاریابی و عملیات برای پیدا کردن گلوگاه‌های اصلی رشد.",
  },
  {
    title: "تعیین اهداف رشد",
    desc: "مشخص کردن اهدافی که واقعاً با منابع و بازار فعلی شما قابل دسترسی‌اند، نه فهرستی از اعداد آرزویی.",
  },
  {
    title: "طراحی استراتژی",
    desc: "اولویت‌بندی اقدامات در بازاریابی، فروش و عملیات، با کمک ابزارهای هوش مصنوعی متناسب با همان اقدامات.",
  },
  {
    title: "اجرای اولویت‌دارترین اقدامات",
    desc: "شروع از اقداماتی که سریع‌تر و با کمترین ریسک قابل اجرا هستند، به‌جای تغییر همه‌چیز هم‌زمان.",
  },
  {
    title: "پایش و اصلاح مسیر",
    desc: "بررسی دوره‌ای نتیجه‌ی اقدامات اجراشده و تنظیم استراتژی بر اساس داده‌های واقعی، نه فرضیات اولیه.",
  },
];

const deliverables = [
  "یک استراتژی رشد مشخص با اقدامات اولویت‌بندی‌شده در بازاریابی، فروش و عملیات",
  "تحلیلی از داده‌های فعلی کسب‌وکار شما برای شناسایی گلوگاه‌های رشد",
  "فهرست ابزارهای هوش مصنوعی پیشنهادی برای هر حوزه (بازاریابی، فروش، عملیات)",
  "راهنمای اجرای اولویت‌دارترین اقدامات رشد",
  "یک کانال ارتباطی برای پرسش‌های تیم شما در هفته‌های اول اجرا",
];

const relatedArticles = [
  {
    href: "/blog/how-to-build-a-sales-funnel-that-converts",
    label: "چطور یک قیف فروش بسازیم که واقعاً مشتری جذب می‌کند؟",
  },
  {
    href: "/blog/six-month-roadmap-for-early-stage-startups",
    label: "نقشه راه شش‌ماهه برای استارتاپ‌های تازه‌کار",
  },
  { href: "/blog/ai-dashboard-business-growth-ahvaz", label: "داشبورد هوش مصنوعی برای رشد کسب‌وکار در اهواز" },
  { href: "/blog/ai-strategy-for-business-guide", label: "راهنمای تدوین استراتژی هوش مصنوعی برای کسب‌وکار" },
];

const faqs = [
  {
    q: "چه زمانی به مشاور رشد نیاز دارم، نه مشاور راه‌اندازی؟",
    a: "وقتی کسب‌وکارتان از قبل مشتری و درآمد دارد اما رشد کند شده یا می‌خواهید در مقیاس بزرگ‌تری فعالیت کنید، این مشاوره متناسب شماست.",
  },
  {
    q: "نتیجه این مشاوره چیست؟",
    a: "یک استراتژی رشد مشخص با اقدامات اولویت‌بندی‌شده در بازاریابی، فروش و عملیات، متناسب با منابع فعلی کسب‌وکار شما.",
  },
  {
    q: "آیا این مشاوره فقط برای استارتاپ‌هاست؟",
    a: "نه؛ سازمان‌های صنعتی و کسب‌وکارهای سنتی خوزستان که می‌خواهند با کمک هوش مصنوعی سریع‌تر رشد کنند هم مخاطب این خدمت هستند.",
  },
  {
    q: "هزینه‌ی مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی چقدر است؟",
    a: "هزینه به دامنه‌ی کار و تعداد حوزه‌هایی که روی آن‌ها تمرکز می‌کنیم بستگی دارد؛ عدد ثابتی از قبل تعیین نمی‌شود. جلسه‌ی اول رایگان است و بعد از آن پیشنهاد شفاف ارائه می‌شود.",
  },
  {
    q: "آیا برای این مشاوره نیاز به تیم بازاریابی یا فنی مجزا دارم؟",
    a: "نه؛ استراتژی بر اساس منابع فعلی تیم شما طراحی می‌شود. اگر تیم اختصاصی ندارید، اقدامات ساده‌تر و قابل‌اجرا با همان منابع محدود پیشنهاد می‌شود.",
  },
  {
    q: "تفاوت این مشاوره با مشاور کسب‌وکار با هوش مصنوعی در اهواز چیست؟",
    a: "آن مشاوره بیشتر برای شروع و پیاده‌سازی اولیه‌ی هوش مصنوعی در کسب‌وکار است؛ این مشاوره برای کسب‌وکارهایی است که از آن مرحله گذشته‌اند و به‌دنبال رشد و مقیاس‌پذیری هستند.",
  },
  {
    q: "آیا جلسه‌ی اول رایگان است؟",
    a: "بله؛ جلسه‌ی اول همیشه رایگان و بدون تعهد است تا وضعیت رشد کسب‌وکارتان را با هم بررسی کنیم.",
  },
];

export default function AiGrowthConsultingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی",
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}/services/ai-growth-consulting`,
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
    { name: title, path: "/services/ai-growth-consulting" },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            برای کسب‌وکارهایی که راه افتاده‌اند و حالا دنبال مقیاس‌پذیری و رشد سریع‌تر هستند
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر کسب‌وکارتان از مرحله‌ی راه‌اندازی گذشته و مشتری و درآمد دارید، اما این روزها رشد کُند شده و
          نمی‌دانید قدم بعدی چیست، به یک مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی نیاز دارید که به‌جای حدس و
          آزمون‌وخطا، مسیر رشد را بر اساس داده‌های واقعی کسب‌وکار شما طراحی کند. برخلاف مشاوره‌ی پیاده‌سازی
          اولیه که روی «شروع کار با هوش مصنوعی» تمرکز دارد، اینجا تمرکز روی «مقیاس‌پذیری و افزایش درآمد» با
          کمک ابزارهای AI است.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">حوزه‌های تمرکز</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title: focusTitle, desc }) => (
            <div key={focusTitle} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{focusTitle}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی برای چه کسب‌وکارهایی مناسب است؟
        </h2>
        <p className="mb-8 text-base leading-7 text-slate-600 dark:text-slate-300">
          این مشاوره برای کسب‌وکارهایی مناسب است که مشتری و درآمد دارند اما رشدشان کُند شده، و برای
          استارتاپ‌هایی که می‌خواهند بعد از راه‌اندازی اولیه، مسیر رشد را با کمک هوش مصنوعی و بر اساس داده
          طراحی کنند؛ سازمان‌های صنعتی و کسب‌وکارهای سنتی خوزستان که دنبال مقیاس‌پذیری سریع‌تر هستند هم
          مخاطب این خدمت‌اند.
        </p>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          این مشاوره برای چه کسب‌وکارهایی مناسب نیست؟
        </h2>
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر هنوز کسب‌وکارتان را راه‌اندازی نکرده‌اید یا هیچ مشتری و داده‌ی واقعی برای تحلیل ندارید، این
          مشاوره زود است؛ در این حالت نقطه‌ی شروع درست‌تر{" "}
          <Link href="/services/ai-business-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور کسب‌وکار با هوش مصنوعی در اهواز
          </Link>{" "}
          است. همچنین اگر دنبال یک راه‌حل فوری و بدون تغییر در روش کار فعلی تیم‌تان هستید، باید بدانید رشد
          واقعی معمولاً به چند اقدام پیوسته نیاز دارد، نه یک نسخه‌ی یک‌باره.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">فرآیند مشاوره رشد</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="mb-2 block text-xs font-bold text-brand-600">{`گام ${i + 1}`}</span>
              <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <ListChecks className="h-6 w-6 text-brand-600" aria-hidden="true" />
          خروجی‌هایی که در پایان تحویل می‌گیرید
        </h2>
        <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {deliverables.map((item) => (
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
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">
          هزینه‌ی این مشاوره به دامنه‌ی کار بستگی دارد: چند حوزه را هم‌زمان پوشش می‌دهیم (بازاریابی، فروش،
          عملیات)، و آیا همکاری فقط در حد طراحی استراتژی است یا اجرای آن را هم شامل می‌شود. هیچ عدد ثابتی از
          قبل روی سایت اعلام نمی‌شود، چون هر کسب‌وکار دامنه‌ی متفاوتی دارد. جلسه‌ی اول همیشه رایگان است؛ در
          همان جلسه وضعیت فعلی کسب‌وکارتان را بررسی می‌کنیم و بعد پیشنهاد همکاری شفاف ارائه می‌شود.
        </p>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
          چرا مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی محلی در اهواز؟
        </h2>
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">
          شناخت بازار خوزستان و صنایع فعال در اهواز باعث می‌شود پیشنهادهای رشد واقع‌بینانه‌تر و قابل‌اجراتر
          باشند، نه الگوهای کپی‌شده از بازارهای دیگر. امکان برگزاری جلسه‌ی حضوری در اهواز هم باعث می‌شود
          بررسی داده‌ها و فرآیندهای کسب‌وکارتان دقیق‌تر پیش برود. همین رویکرد عملی را پیش‌تر در آموزش هوش
          مصنوعی برای فولاد خوزستان و همکاری با بسیج رسانه خوزستان هم به کار گرفته‌ام. برای کسب‌وکارهای خارج
          از خوزستان، این مشاوره به‌صورت آنلاین و با همان کیفیت ارائه می‌شود.
        </p>

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
          هنوز در مرحله شروع هستید و می‌خواهید هوش مصنوعی را برای اولین بار وارد کسب‌وکارتان کنید؟ نگاهی به{" "}
          <Link href="/services/ai-business-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور کسب‌وکار با هوش مصنوعی در اهواز
          </Link>{" "}
          بیندازید. برای رشد از مسیر تولید محتوا هم می‌توانید سراغ{" "}
          <Link href="/services/ai-content-generation" className="font-semibold text-brand-700 hover:underline">
            تولید محتوا با هوش مصنوعی در اهواز
          </Link>{" "}
          بروید.
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">جلسه استراتژی رشد رزرو کن</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            بدون تعهد — فقط یه مکالمه صادقانه درباره مسیر رشد کسب‌وکارت
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
          >
            رزرو جلسه رایگان
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
