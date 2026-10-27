import type { Metadata } from "next";
import { getPublishedCourses } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, serializeJsonLd } from "@/lib/post-content";
import ServicesHero from "@/components/services/ServicesHero";
import ProofStrip from "@/components/services/ProofStrip";
import ServicesLocalNav from "@/components/services/ServicesLocalNav";
import ServiceChapters from "@/components/services/ServiceChapters";
import TrainingSection from "@/components/services/TrainingSection";
import CaseStudy from "@/components/services/CaseStudy";
import ProcessSection from "@/components/services/ProcessSection";
import FaqSection from "@/components/services/FaqSection";
import FinalCta from "@/components/services/FinalCta";
import { SERVICES_FAQ } from "@/components/services/faq";
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

  // از همان فهرستی ساخته می‌شود که بخش «سؤالات رایج» نمایش می‌دهد.
  const faqJsonLd = buildFaqJsonLd(SERVICES_FAQ);

  return (
    // توکن‌های طراحی جدید فقط روی همین صفحه فعال‌اند؛ هدف لینک‌های داخلی زیر هدر و نوار چسبان قرار می‌گیرد.
    <div dir="rtl" className={`${servicesTheme.root} [&_[id]]:scroll-mt-[170px]`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      )}

      <ServicesHero title={servicesTitle} />
      <ProofStrip />
      <ServicesLocalNav />

      <ServiceChapters />

      <TrainingSection courses={courses} />
      <CaseStudy />
      <ProcessSection />
      <FaqSection />
      <FinalCta />
    </div>
  );
}
