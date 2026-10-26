import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Compass,
  Cog,
  LineChart,
  CheckCircle2,
  ListChecks,
  Briefcase,
  MapPin,
  Building2,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import FaqAccordion from "@/components/FaqAccordion";

export const revalidate = 300;

const title = "مشاور کسب‌وکار با هوش مصنوعی در اهواز";
const description =
  "مشاور کسب‌وکار با هوش مصنوعی در اهواز برای پیاده‌سازی و اتوماسیون فرآیندها با AI. مشاوره حضوری در اهواز و آنلاین برای سراسر کشور؛ جلسه‌ی اول رایگان است.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services/ai-business-consulting" },
  openGraph: { title, description, url: "/services/ai-business-consulting" },
};

const steps = [
  {
    title: "شناخت فرآیندها",
    desc: "بررسی فرآیندهای فعلی کسب‌وکار شما و پیدا کردن نقاطی که هوش مصنوعی بیشترین تأثیر را دارد؛ این بررسی معمولاً در یک یا دو جلسه‌ی گفت‌وگو با شما و تیم‌تان انجام می‌شود.",
  },
  {
    title: "طراحی نقشه راه",
    desc: "انتخاب ابزارها و اولویت‌بندی اقداماتی که با بودجه، زمان و تیم فعلی شما واقعاً قابل اجراست، نه یک فهرست آرزویی بلندبالا.",
  },
  {
    title: "پیاده‌سازی",
    desc: "راه‌اندازی ابزارها و اتوماسیون‌های اولویت‌دار، همراه با آموزش عملی تیم شما برای استفاده‌ی روزمره از همان ابتدا.",
  },
  {
    title: "آموزش و انتقال دانش",
    desc: "اطمینان از اینکه تیم شما بدون وابستگی دائمی به مشاور می‌تواند روند را ادامه دهد و در صورت نیاز خودش گسترشش دهد.",
  },
  {
    title: "ارزیابی و اصلاح مسیر",
    desc: "بررسی نتیجه‌ی اولیه‌ی پیاده‌سازی و اصلاح برنامه در صورت نیاز، تا مطمئن شویم مسیر انتخاب‌شده واقعاً برای کسب‌وکار شما کار می‌کند.",
  },
];

const deliverables = [
  "یک نقشه راه اجرایی نوشته‌شده، متناسب با فرآیندها و بودجه‌ی واقعی کسب‌وکار شما",
  "فهرست ابزارهای هوش مصنوعی پیشنهادی برای هر فرآیند، به‌همراه دلیل انتخاب هرکدام",
  "راهنمای گام‌به‌گام برای راه‌اندازی اولویت‌دارترین اتوماسیون",
  "یک جلسه‌ی آموزشی برای تیم شما درباره‌ی نحوه‌ی استفاده‌ی روزمره از ابزارهای انتخاب‌شده",
  "یک کانال ارتباطی برای پرسش‌های تیم شما در هفته‌های اول پیاده‌سازی",
];

const relatedArticles = [
  { href: "/blog/what-is-ai-consultant", label: "مشاور هوش مصنوعی چیست و چه کاری انجام می‌دهد؟" },
  {
    href: "/blog/ai-business-opportunity-identification",
    label: "چطور فرصت‌های استفاده از هوش مصنوعی در کسب‌وکار را شناسایی کنیم؟",
  },
  { href: "/blog/ai-pilot-implementation-ahvaz", label: "راه‌اندازی آزمایشی (پایلوت) هوش مصنوعی در اهواز" },
  { href: "/blog/ai-for-small-business-ahvaz", label: "هوش مصنوعی برای کسب‌وکارهای کوچک در اهواز" },
];

const collaborations = [
  "آموزش هوش مصنوعی برای شرکت فولاد خوزستان، از جمله دوره‌ی داشبوردسازی مالی برای مدیران مالی این شرکت",
  "همکاری با بسیج رسانه خوزستان در آموزش و به‌کارگیری هوش مصنوعی",
];

const faqs = [
  {
    q: "مشاور کسب‌وکار با هوش مصنوعی در اهواز برای چه کسب‌وکارهایی مناسب است؟",
    a: "برای کسب‌وکارهای کوچک و متوسط، استارتاپ‌ها و سازمان‌هایی که می‌خواهند برای اولین بار هوش مصنوعی را وارد فرآیندهای روزمره‌شان کنند.",
  },
  {
    q: "مشاوره به‌صورت حضوری است یا آنلاین؟",
    a: "برای کسب‌وکارهای اهواز و خوزستان جلسات حضوری برگزار می‌شود؛ برای سایر شهرها مشاوره کاملاً آنلاین و با همان کیفیت انجام می‌گیرد.",
  },
  {
    q: "زمان دیدن نتیجه از این مشاوره چقدر طول می‌کشد؟",
    a: "زمان دیدن نتیجه به پیچیدگی فرآیند و سرعت اجرای تیم شما بستگی دارد. در همان جلسه‌ی اول، با توجه به وضعیت واقعی کسب‌وکارتان، برآورد روشن‌تری درباره‌ی زمان‌بندی می‌دهم.",
  },
  {
    q: "هزینه‌ی این مشاوره چقدر است؟",
    a: "هزینه به عواملی مثل پیچیدگی فرآیندها و میزان همکاری در فاز اجرا بستگی دارد؛ هیچ عدد ثابتی از قبل تعیین نشده است. جلسه‌ی اول رایگان است و بعد از آن پیشنهاد همکاری شفاف ارائه می‌شود.",
  },
  {
    q: "آیا برای استفاده از این مشاوره نیاز به دانش فنی یا برنامه‌نویسی دارم؟",
    a: "نه. این مشاوره برای صاحبان و مدیران کسب‌وکار طراحی شده، نه برنامه‌نویس‌ها؛ تمرکز روی تصمیم‌گیری درست و استفاده‌ی عملی از ابزارهاست.",
  },
  {
    q: "آیا همکاری فقط در حد یک جلسه است یا می‌تواند ادامه‌دار باشد؟",
    a: "بسته به نیاز شما، می‌تواند یک مشاوره‌ی یک‌باره برای گرفتن نقشه راه باشد یا همکاری مستمر برای پیاده‌سازی و پشتیبانی؛ این را در جلسه‌ی اول با هم مشخص می‌کنیم.",
  },
  {
    q: "آیا این مشاوره برای صنایع خاص هم قابل تنظیم است؟",
    a: "بله؛ چارچوب مشاوره بر اساس نوع صنعت، اندازه‌ی تیم و فرآیندهای خاص کسب‌وکار شما شخصی‌سازی می‌شود، چه خدماتی باشید و چه صنعتی.",
  },
];

export default function AiBusinessConsultingPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: "مشاوره کسب‌وکار با هوش مصنوعی",
    provider: {
      "@type": "Person",
      name: "عبدالله احمدیان",
      address: { "@type": "PostalAddress", addressLocality: "اهواز", addressCountry: "IR" },
    },
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

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
    { name: title, path: "/services/ai-business-consulting" },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            مشاور کسب‌وکار با هوش مصنوعی در اهواز
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            برای کسب‌وکارهایی در اهواز و خوزستان که می‌خواهند اولین قدم را با هوش مصنوعی درست بردارند — از تشخیص فرصت تا اجرا
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر کسب‌وکارتان در اهواز روزبه‌روز با حجم بیشتری از کار دستی و تکراری دست‌وپنجه نرم می‌کند و
          نمی‌دانید از کجای هوش مصنوعی باید شروع کنید، به یک مشاور کسب‌وکار با هوش مصنوعی در اهواز نیاز
          دارید که مسیر را متناسب با امکانات واقعی تیم شما طراحی کند، نه یک الگوی عمومی و یکسان برای همه. در
          این مشاوره، به‌جای غرق شدن در اصطلاحات فنی، روی چند اقدام مشخص و قابل اجرا تمرکز می‌کنیم که همین
          حالا در کسب‌وکار شما قابل پیاده‌سازی است.
        </p>

        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Compass, text: "شناسایی دقیق نقاطی از کسب‌وکار که هوش مصنوعی بیشترین ارزش را ایجاد می‌کند" },
            { icon: Cog, text: "اتوماسیون فرآیندهای تکراری با ابزارهای مناسب بودجه و تیم شما" },
            { icon: LineChart, text: "تصمیم‌گیری داده‌محور به‌جای حدس و گمان در مسائل روزمره کسب‌وکار" },
          ].map(({ icon: Icon, text }, i) => (
            <div key={i} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          مشاور کسب‌وکار با هوش مصنوعی در اهواز برای چه کسب‌وکارهایی مناسب است؟
        </h2>
        <p className="mb-8 text-base leading-7 text-slate-600 dark:text-slate-300">
          این مشاوره برای کسب‌وکارهای کوچک و متوسط، استارتاپ‌ها، فروشگاه‌های آنلاین و سازمان‌های صنعتی اهواز و
          خوزستان مناسب است که برای اولین بار می‌خواهند هوش مصنوعی را وارد فرآیندهای روزمره‌شان کنند و به
          دنبال راهنمایی عملی هستند، نه فقط یک سری اسلاید معرفی ابزار.
        </p>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
          این مشاوره برای چه کسب‌وکارهایی مناسب نیست؟
        </h2>
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">
          اگر از قبل زیرساخت و تیم فنی اختصاصی برای توسعه‌ی راهکارهای هوش مصنوعی پیچیده دارید و دنبال
          مشاوره‌ی عمیق مهندسی داده یا توسعه‌ی مدل اختصاصی هستید، این مشاوره به‌تنهایی کافی نیست و احتمالاً
          به یک تیم فنی تخصصی‌تر نیاز دارید. همچنین اگر هنوز حتی یک ایده یا فرآیند مشخص برای شروع ندارید و
          صرفاً دنبال شنیدن کلیات هوش مصنوعی هستید، بهتر است ابتدا با مطالعه‌ی وبلاگ شروع کنید و بعد سراغ
          جلسه‌ی مشاوره بیایید.
        </p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">فرآیند مشاوره</h2>
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
          هزینه‌ی این مشاوره عدد ثابتی ندارد و به چند عامل بستگی دارد: پیچیدگی فرآیندهای کسب‌وکار شما، تعداد
          ابزارهایی که باید راه‌اندازی شوند، و اینکه همکاری فقط در حد یک مشاوره باشد یا پیاده‌سازی و
          پشتیبانی مستمر را هم شامل شود. به همین دلیل، جلسه‌ی اول همیشه رایگان و بدون تعهد است: در همین جلسه
          کسب‌وکار و نیازتان را می‌شنوم و بعد از آن، پیشنهاد همکاری متناسب با همان نیاز را شفاف برایتان توضیح
          می‌دهم — بدون فشار برای تصمیم فوری.
        </p>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
          چرا مشاور کسب‌وکار با هوش مصنوعی در اهواز را از یک متخصص محلی بگیرید؟
        </h2>
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">
          بسیاری از مشاوران و دوره‌های آنلاین هوش مصنوعی برای یک مخاطب عمومی و بدون توجه به شرایط خاص بازار
          خوزستان طراحی شده‌اند. یک مشاور کسب‌وکار با هوش مصنوعی در اهواز که با فضای کسب‌وکار محلی، صنایع
          منطقه و حتی محدودیت‌های زیرساختی رایج در اهواز آشناست، می‌تواند پیشنهادهایی بدهد که واقعاً قابل اجرا
          باشند، نه فقط تئوری. علاوه بر این، امکان برگزاری جلسه‌ی حضوری در اهواز باعث می‌شود گفت‌وگو درباره‌ی
          جزئیات فرآیندهای کاری‌تان ساده‌تر و دقیق‌تر پیش برود؛ برای کسب‌وکارهای خارج از خوزستان هم همین
          مشاوره به‌صورت آنلاین و با همان کیفیت انجام می‌شود.
        </p>

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <Building2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
          سوابق همکاری
        </h2>
        <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {collaborations.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
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
          کسب‌وکارتان از قبل راه افتاده و دنبال رشد و مقیاس‌پذیری هستید؟ سراغ{" "}
          <Link href="/services/ai-growth-consulting" className="font-semibold text-brand-700 hover:underline">
            مشاور توسعه و رشد کسب‌وکار با هوش مصنوعی
          </Link>{" "}
          بروید. اگر می‌خواهید تیم خودتان مستقیم با ابزارهای AI کار کند، صفحه{" "}
          <Link href="/services/ai-training-ahvaz" className="font-semibold text-brand-700 hover:underline">
            آموزش هوش مصنوعی در اهواز
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
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            رزرو جلسه رایگان
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
