import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Cog, LineChart, CheckCircle2 } from "lucide-react";
import { SITE_URL } from "@/lib/site";

export const revalidate = 300;

const title = "مشاور کسب‌وکار با هوش مصنوعی در اهواز | مشاوره تخصصی";
const description =
  "مشاوره کسب‌وکار با هوش مصنوعی برای راه‌اندازی، پیاده‌سازی AI و اتوماسیون فرآیندها. مشاوره حضوری در اهواز و آنلاین برای سراسر کشور. جلسه رایگان رزرو کنید.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-business-consulting" },
  openGraph: { title, description, url: "/services/ai-business-consulting" },
};

const steps = [
  { title: "شناخت فرآیندها", desc: "بررسی فرآیندهای فعلی کسب‌وکار شما و پیدا کردن نقاطی که هوش مصنوعی بیشترین تأثیر را دارد." },
  { title: "طراحی نقشه راه", desc: "انتخاب ابزارها و اولویت‌بندی اقداماتی که با بودجه و تیم فعلی شما قابل اجراست." },
  { title: "پیاده‌سازی", desc: "راه‌اندازی ابزارها و اتوماسیون‌ها، همراه با آموزش تیم برای استفاده روزمره." },
  { title: "ارزیابی نتیجه", desc: "بررسی صرفه‌جویی زمان و هزینه بعد از پیاده‌سازی و اصلاح مسیر در صورت نیاز." },
];

const faqs = [
  {
    q: "این مشاوره برای چه کسب‌وکارهایی مناسب است؟",
    a: "برای کسب‌وکارهای کوچک و متوسط، استارتاپ‌ها و سازمان‌هایی که می‌خواهند برای اولین بار هوش مصنوعی را وارد فرآیندهای روزمره‌شان کنند.",
  },
  {
    q: "مشاوره به‌صورت حضوری است یا آنلاین؟",
    a: "برای کسب‌وکارهای اهواز و خوزستان جلسات حضوری برگزار می‌شود؛ برای سایر شهرها مشاوره کاملاً آنلاین و با همان کیفیت انجام می‌گیرد.",
  },
  {
    q: "چه مدت طول می‌کشد تا نتیجه ملموس بگیرم؟",
    a: "بسته به پیچیدگی فرآیند، معمولاً بین ۲ تا ۶ هفته بعد از شروع پیاده‌سازی، اولین نتایج (صرفه‌جویی زمان یا کاهش خطا) قابل مشاهده است.",
  },
];

export default function AiBusinessConsultingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "مشاوره کسب‌وکار با هوش مصنوعی",
    provider: { "@type": "Person", name: "عبدالله احمدیان" },
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}/services/ai-business-consulting`,
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
            مشاور کسب‌وکار با هوش مصنوعی
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            برای کسب‌وکارهایی که می‌خواهند اولین قدم را با هوش مصنوعی درست بردارند — از تشخیص فرصت تا اجرا
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Compass, text: "شناسایی دقیق نقاطی از کسب‌وکار که هوش مصنوعی بیشترین ارزش را ایجاد می‌کند" },
            { icon: Cog, text: "اتوماسیون فرآیندهای تکراری با ابزارهای مناسب بودجه و تیم شما" },
            { icon: LineChart, text: "تصمیم‌گیری داده‌محور به‌جای حدس و گمان در مسائل روزمره کسب‌وکار" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900">این مشاوره برای چه کسب‌وکارهایی مناسب است؟</h2>
        <p className="mb-10 text-base leading-7 text-slate-600">
          اگر تازه می‌خواهید هوش مصنوعی را وارد کسب‌وکارتان کنید — چه یک فروشگاه اینستاگرامی باشید و چه یک
          سازمان صنعتی با چند بخش مختلف — این مشاوره نقطه شروع درستی است. تمرکز روی پیاده‌سازی عملی است، نه
          تئوری؛ خروجی هر جلسه یک نقشه راه اجرایی است که خودتان یا تیم‌تان می‌توانید دنبال کنید.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900">فرآیند مشاوره</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl bg-slate-50 p-5">
              <span className="mb-2 block text-xs font-bold text-brand-600">{`گام ${i + 1}`}</span>
              <h3 className="mb-1 text-base font-bold text-slate-900">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600">{step.desc}</p>
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
          کسب‌وکارتان از قبل راه افتاده و دنبال رشد و مقیاس‌پذیری هستید؟ سراغ{" "}
          <Link href="/services/ai-growth-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی
          </Link>{" "}
          بروید. اگر می‌خواهید تیم خودتان مستقیم با ابزارهای AI کار کند، صفحه{" "}
          <Link href="/services/ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline">
            مدرس هوش مصنوعی در اهواز
          </Link>{" "}
          را ببینید.
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">جلسه مشاوره رایگان رزرو کن</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            بدون تعهد — فقط یه مکالمه صادقانه درباره کسب‌وکارت
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
