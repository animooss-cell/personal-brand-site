import type { Metadata } from "next";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import ServicesHero from "@/components/services/ServicesHero";
import ProofStrip from "@/components/services/ProofStrip";
import ServicesLocalNav from "@/components/services/ServicesLocalNav";
import ServiceChapters from "@/components/services/ServiceChapters";
import TrainingSection from "@/components/services/TrainingSection";
import servicesTheme from "@/components/services/servicesTheme.module.css";

export const revalidate = 300;

const servicesTitle = "خدمات مشاوره و آموزش هوش مصنوعی در اهواز";
const servicesDescription =
  "مشاوره کسب‌وکار، مشاوره رشد، آموزش هوش مصنوعی و تولید محتوا با AI برای کسب‌وکارهای اهواز و خوزستان — همه‌ی خدمات در یک نگاه، با جلسه‌ی اول رایگان.";

export const metadata: Metadata = {
  title: servicesTitle,
  description: servicesDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: servicesTitle,
    description: servicesDescription,
    url: "/services",
  },
};

// فهرست صفحه‌های اختصاصی خدمات؛ فقط برای اسکیمای ItemList (عنوان و آدرس‌ها بدون تغییر).
const dedicatedServices = [
  { href: "/services/ai-business-consulting", title: "مشاور کسب‌وکار با هوش مصنوعی" },
  { href: "/services/ai-growth-consulting", title: "مشاور توسعه و رشد کسب‌وکار" },
  { href: "/services/ai-training-ahvaz", title: "آموزش هوش مصنوعی در اهواز" },
  { href: "/services/ai-content-generation", title: "تولید محتوا با هوش مصنوعی" },
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

  return (
    // توکن‌های طراحی جدید فقط روی همین صفحه فعال‌اند؛ هدف لینک‌های داخلی زیر هدر و نوار چسبان قرار می‌گیرد.
    <div dir="rtl" className={`${servicesTheme.root} [&_[id]]:scroll-mt-[170px]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <ServicesHero title={servicesTitle} />
      <ProofStrip />
      <ServicesLocalNav />

      <section className="px-4 pt-10 md:px-8">
        <p className="fade-in-up mx-auto max-w-3xl text-center text-base leading-7 text-slate-600 dark:text-slate-300">
          اینجا خدمات مشاوره و آموزش هوش مصنوعی برای کسب‌وکارهای اهواز و خوزستان را در یک نگاه می‌بینید: از
          اولین قدم در پیاده‌سازی هوش مصنوعی تا مشاوره‌ی رشد، تولید محتوا و آموزش تیم شما. هر خدمت صفحه‌ی
          مستقل خودش را دارد تا دقیقاً ببینید فرآیند کار، خروجی‌ها و نحوه‌ی همکاری در هرکدام چگونه است. از
          جمله‌ی همکاری‌های اخیر، می‌توان به آموزش هوش مصنوعی برای فولاد خوزستان و همکاری با بسیج رسانه
          خوزستان در آموزش و به‌کارگیری هوش مصنوعی اشاره کرد. اگر هنوز نمی‌دانید کدام خدمت متناسب با وضعیت
          فعلی کسب‌وکار شماست، می‌توانید مستقیم یک جلسه‌ی رایگان رزرو کنید تا با هم مسیر درست را پیدا کنیم.
        </p>
      </section>

      <ServiceChapters />

      <TrainingSection courses={courses} />
    </div>
  );
}
