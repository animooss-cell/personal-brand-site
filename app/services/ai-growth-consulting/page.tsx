import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Megaphone, Gauge, CheckCircle2 } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی | اهواز";
const description =
  "مشاوره تخصصی توسعه و رشد کسب‌وکار با هوش مصنوعی: افزایش فروش، بازاریابی هدفمند و مقیاس‌پذیری با AI. برای استارتاپ‌ها و کسب‌وکارهای در حال رشد در اهواز.";

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
];

export default function AiGrowthConsultingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی",
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

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

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
        <h2 className="mb-3 text-2xl font-bold text-slate-900">چه زمانی به مشاور رشد نیاز دارید؟</h2>
        <p className="mb-10 text-base leading-7 text-slate-600">
          اگر کسب‌وکارتان از مرحله راه‌اندازی گذشته و مشتری و درآمد دارید، اما احساس می‌کنید رشد کند شده یا
          نمی‌دانید قدم بعدی چیست، این مشاوره برای شماست. برخلاف مشاوره پیاده‌سازی اولیه که روی «شروع کار با
          هوش مصنوعی» تمرکز دارد، اینجا تمرکز روی «مقیاس‌پذیری و افزایش درآمد» با کمک ابزارهای AI است.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900">حوزه‌های تمرکز</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {focusAreas.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

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
          هنوز در مرحله شروع هستید و می‌خواهید هوش مصنوعی را برای اولین بار وارد کسب‌وکارتان کنید؟ نگاهی به{" "}
          <Link href="/services/ai-business-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور کسب‌وکار با هوش مصنوعی
          </Link>{" "}
          بیندازید. برای رشد از مسیر تولید محتوا هم می‌توانید سراغ{" "}
          <Link href="/services/ai-content-generation" className="font-semibold text-brand-700 hover:underline">
            تولید محتوا با هوش مصنوعی
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
