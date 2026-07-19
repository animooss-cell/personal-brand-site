import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Instagram, Search, CalendarDays, CheckCircle2 } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "تولید محتوا با هوش مصنوعی در اهواز | کانتنت مارکتینگ";
const description =
  "تولید محتوای هدفمند با هوش مصنوعی برای اینستاگرام، وبسایت و کمپین‌های تبلیغاتی کسب‌وکارها در اهواز و خوزستان. استراتژی محتوا + اجرا با ابزارهای AI.";

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
];

export default function AiContentGenerationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "تولید محتوا با هوش مصنوعی",
    provider: { "@type": "Person", name: "عبدالله احمدیان" },
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

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">تولید محتوا با هوش مصنوعی در اهواز</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            محتوای هدفمند برای اینستاگرام، وبسایت و کمپین‌های تبلیغاتی — سریع‌تر و با ابزارهای AI
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">خدمات تولید محتوا</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <h3 className="mb-2 text-base font-bold text-slate-900">{title}</h3>
              <p className="text-sm leading-6 text-slate-600">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900">برای چه کسب‌وکارهایی مناسب است؟</h2>
        <p className="mb-10 text-base leading-7 text-slate-600">
          کسب‌وکارهای اهواز و خوزستان که می‌خواهند حضور منظم و باکیفیت در شبکه‌های اجتماعی و وبسایت داشته
          باشند اما تیم محتوای داخلی ندارند. با ترکیب استراتژی محتوا و ابزارهای هوش مصنوعی، محتوا سریع‌تر
          تولید می‌شود بدون این‌که کیفیت و لحن برند شما قربانی سرعت شود.
        </p>

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
          می‌خواهید تولید محتوا را بخشی از استراتژی رشد بزرگ‌تر کسب‌وکارتان کنید؟ ببینید{" "}
          <Link href="/services/ai-growth-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی
          </Link>{" "}
          چه کمکی می‌کند. اگر می‌خواهید خودتان یا تیم‌تان تولید محتوا با AI را یاد بگیرید، سراغ{" "}
          <Link href="/services/ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline">
            دوره‌های آموزش هوش مصنوعی
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
