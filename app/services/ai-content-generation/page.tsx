import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Instagram,
  Search,
  CalendarDays,
  CheckCircle2,
  ListChecks,
  Briefcase,
  MapPin,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd } from "@/lib/post-content";

export const revalidate = 300;

const title = "تولید محتوا با هوش مصنوعی در اهواز";
const description =
  "تولید محتوا با هوش مصنوعی در اهواز برای اینستاگرام، وبسایت و کمپین‌های تبلیغاتی کسب‌وکارها. استراتژی محتوا + اجرا با AI و بازبینی انسانی.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-content-generation" },
  openGraph: { title, description, url: "/services/ai-content-generation" },
};

const services = [
  { icon: Instagram, title: "محتوای شبکه‌های اجتماعی", desc: "تولید پست و استوری اینستاگرام با هوش مصنوعی، متناسب با لحن و برند کسب‌وکار شما." },
  { icon: Search, title: "محتوای وبسایت و سئو", desc: "نوشتن محتوای صفحات و مقالات وبلاگ با هدف رتبه گرفتن در نتایج جستجو." },
  { icon: CalendarDays, title: "تقویم محتوایی با AI", desc: "برنامه‌ریزی محتوای ماهانه با کمک ابزارهای هوش مصنوعی برای انتشار منظم و هدفمند." },
];

const steps = [
  {
    title: "شناخت برند و مخاطب",
    desc: "بررسی لحن، زبان و مخاطب هدف کسب‌وکار شما، پیش از شروع تولید محتوا با هوش مصنوعی.",
  },
  {
    title: "تدوین تقویم محتوایی",
    desc: "برنامه‌ریزی موضوعات و زمان‌بندی انتشار، متناسب با اهداف و فصل کاری کسب‌وکار شما.",
  },
  {
    title: "تولید محتوا با AI",
    desc: "نوشتن نسخه‌ی اول محتوا با ابزارهای هوش مصنوعی، بر اساس تقویم و لحن تعیین‌شده.",
  },
  {
    title: "ویرایش و متناسب‌سازی انسانی",
    desc: "بازبینی و اصلاح محتوا تا با لحن، ارزش‌ها و برند شما همخوانی کامل داشته باشد.",
  },
  {
    title: "انتشار و بازخورد",
    desc: "تحویل محتوای نهایی و جمع‌آوری بازخورد شما برای بهتر شدن دوره‌های بعدی تولید محتوا.",
  },
];

const deliverables = [
  "یک تقویم محتوایی ماهانه متناسب با برند و مخاطب شما",
  "پیش‌نویس محتوای شبکه‌های اجتماعی یا وبسایت برای بازه‌ی زمانی مشخص‌شده",
  "راهنمای لحن و زبان برند، برای استفاده‌ی مستمر تیم شما از ابزارهای هوش مصنوعی",
  "فهرست ابزارهای پیشنهادی برای تولید سریع‌تر محتوا",
  "یک کانال ارتباطی برای بازخورد و اصلاح محتوا در طول همکاری",
];

const relatedArticles = [
  {
    href: "/blog/ai-instagram-content-calendar-ahvaz",
    label: "تقویم محتوایی اینستاگرام با هوش مصنوعی برای کسب‌وکارهای اهواز",
  },
  {
    href: "/blog/ai-content-marketing-without-losing-brand-voice",
    label: "تولید محتوا با هوش مصنوعی بدون از دست دادن صدای برند",
  },
  { href: "/blog/ai-content-quality-seo-ahvaz", label: "کیفیت محتوای هوش مصنوعی و سئو در اهواز" },
  { href: "/blog/chatgpt-for-business-10-prompts", label: "۱۰ پرامپت کاربردی چت‌جی‌پی‌تی برای کسب‌وکار" },
];

const faqs = [
  {
    q: "محتوا کاملاً با هوش مصنوعی نوشته می‌شود یا انسانی هم بازبینی می‌کند؟",
    a: "تولید اولیه با ابزارهای هوش مصنوعی انجام می‌شود اما هر محتوا قبل از تحویل، ویرایش و متناسب‌سازی انسانی می‌شود تا با برند شما همخوانی داشته باشد.",
  },
  {
    q: "برای چه کسب‌وکارهایی مناسب است؟",
    a: "برای کسب‌وکارهای اهواز و خوزستان که نیاز به تولید محتوای منظم دارند اما تیم محتوای داخلی ندارند یا می‌خواهند سرعت تولید را با AI بالا ببرند.",
  },
  {
    q: "آیا آموزش تولید محتوا هم ارائه می‌دهید؟",
    a: "بله؛ اگر می‌خواهید تیم خودتان مستقیم با ابزارهای هوش مصنوعی محتوا تولید کند، این موضوع بخشی از دوره‌های آموزشی است.",
  },
  {
    q: "هزینه‌ی تولید محتوا با هوش مصنوعی چقدر است؟",
    a: "هزینه به حجم و تعداد کانال‌های محتوایی (اینستاگرام، وبسایت، تقویم ماهانه) بستگی دارد؛ عدد ثابتی از قبل تعیین نمی‌شود. جلسه‌ی اول رایگان است و بعد از آن پیشنهاد شفاف ارائه می‌شود.",
  },
  {
    q: "آیا امکان تولید محتوا با لحن خاص برند ما وجود دارد؟",
    a: "بله؛ پیش از شروع تولید محتوا، لحن، زبان و ارزش‌های برند شما بررسی می‌شود تا خروجی نهایی با آن همخوانی داشته باشد، نه یک متن عمومی و بی‌هویت.",
  },
  {
    q: "آیا فقط محتوای متنی تولید می‌کنید یا تصویر و ویدیو هم هست؟",
    a: "تمرکز اصلی روی محتوای متنی (پست، مقاله، کپشن) و برنامه‌ریزی تقویم محتوایی است؛ برای محتوای تصویری یا ویدیویی در صورت نیاز، هماهنگی جداگانه در همان جلسه‌ی اول بررسی می‌شود.",
  },
  {
    q: "آیا جلسه‌ی اول رایگان است؟",
    a: "بله؛ جلسه‌ی اول رایگان و بدون تعهد است تا نیاز واقعی محتوایی کسب‌وکارتان را با هم بررسی کنیم.",
  },
];

export default function AiContentGenerationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "تولید محتوا با هوش مصنوعی",
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}/services/ai-content-generation`,
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
    { name: title, path: "/services/ai-content-generation" },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">تولید محتوا با هوش مصنوعی در اهواز</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            محتوای هدفمند برای اینستاگرام، وبسایت و کمپین‌های تبلیغاتی — سریع‌تر و با ابزارهای AI
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر هر هفته برای نوشتن پست اینستاگرام یا مقاله‌ی وبسایت کسب‌وکارتان کم می‌آورید و تیم محتوای
          داخلی هم ندارید، تولید محتوا با هوش مصنوعی در اهواز راهی است که سرعت انتشار را بالا می‌برد بدون
          اینکه کیفیت و لحن برند شما قربانی سرعت شود. به‌جای متن‌های عمومی و بی‌هویت، محتوا بر اساس شناخت
          واقعی از کسب‌وکار و مخاطب شما تولید می‌شود.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">خدمات تولید محتوا</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {services.map(({ icon: Icon, title: serviceTitle, desc }) => (
            <div key={serviceTitle} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{serviceTitle}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          تولید محتوا با هوش مصنوعی در اهواز برای چه کسب‌وکارهایی مناسب است؟
        </h2>
        <p className="mb-8 text-base leading-7 text-slate-600 dark:text-slate-300">
          کسب‌وکارهای اهواز و خوزستان که می‌خواهند حضور منظم و باکیفیت در شبکه‌های اجتماعی و وبسایت داشته
          باشند اما تیم محتوای داخلی ندارند، مخاطب اصلی این خدمت هستند. با ترکیب استراتژی محتوا و ابزارهای
          هوش مصنوعی، محتوا سریع‌تر تولید می‌شود بدون این‌که کیفیت و لحن برند شما قربانی سرعت شود.
        </p>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          برای چه کسب‌وکارهایی مناسب نیست؟
        </h2>
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر دنبال محتوای کاملاً خودکار و بدون هیچ بازبینی انسانی هستید، این خدمت برای شما نیست؛ هر محتوا
          قبل از تحویل بازبینی می‌شود و این زمان نیاز دارد. همچنین اگر هنوز هیچ تعریف روشنی از برند، لحن یا
          مخاطب هدف خودتان ندارید، بهتر است ابتدا این موارد مشخص شوند تا محتوای تولیدشده واقعاً به‌جای برند
          شما حرف بزند.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">فرآیند تولید محتوا</h2>
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
          خروجی‌هایی که تحویل می‌گیرید
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
          هزینه‌ی تولید محتوا به حجم کار بستگی دارد: چند کانال را پوشش می‌دهیم (اینستاگرام، وبسایت، یا
          هردو)، و تقویم محتوایی ماهانه است یا یک پروژه‌ی مشخص و محدود. عدد ثابتی از قبل روی سایت اعلام
          نمی‌شود، چون نیاز هر کسب‌وکار متفاوت است. جلسه‌ی اول همیشه رایگان است؛ در همان جلسه نیاز محتوایی
          شما را می‌شنوم و بعد پیشنهاد همکاری شفاف ارائه می‌دهم.
        </p>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
          چرا تولید محتوا با هوش مصنوعی در اهواز از یک تیم محلی؟
        </h2>
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">
          محتوایی که برای مخاطب اهواز و خوزستان نوشته می‌شود، باید لحن و مثال‌های همین بازار را بشناسد، نه
          یک قالب عمومی ترجمه‌شده. شناخت محلی از صنایع و مشتریان منطقه باعث می‌شود محتوا طبیعی‌تر و قابل‌باورتر
          به نظر برسد. همین رویکرد را پیش‌تر در همکاری با بسیج رسانه خوزستان و در آموزش هوش مصنوعی برای فولاد
          خوزستان هم به کار گرفته‌ام. برای کسب‌وکارهای خارج از خوزستان هم همین کیفیت، به‌صورت کاملاً آنلاین
          قابل ارائه است.
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
          می‌خواهید تولید محتوا را بخشی از استراتژی رشد بزرگ‌تر کسب‌وکارتان کنید؟ ببینید{" "}
          <Link href="/services/ai-growth-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی
          </Link>{" "}
          چه کمکی می‌کند. اگر می‌خواهید خودتان یا تیم‌تان تولید محتوا با AI را یاد بگیرید، سراغ{" "}
          <Link href="/services/ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline">
            آموزش هوش مصنوعی در اهواز
          </Link>{" "}
          بروید.
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">درخواست پکیج تولید محتوا</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            بدون تعهد — فقط یه مکالمه صادقانه درباره محتوای کسب‌وکارت
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
