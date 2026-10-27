import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import servicesTheme from "@/components/services/servicesTheme.module.css";
import contactTheme from "@/components/contact/contactTheme.module.css";
import ContactNextSteps from "@/components/contact/ContactNextSteps";
import ContactFaq from "@/components/contact/ContactFaq";
import { CONTACT_CITY, CONTACT_FAQ, CONTACT_HOURS, CONTACT_REGION } from "@/components/contact/contactFaq";
import { CONTACT_PHONE_E164 } from "@/lib/contactInfo";
import { SITE_URL } from "@/lib/site";
import { buildFaqJsonLd, serializeJsonLd } from "@/lib/post-content";

const contactTitle = "تماس و رزرو جلسه | مشاوره کسب و کار اهواز";
const contactDescription =
  "برای رزرو جلسه رایگان مشاوره کسب و کار اهواز، آموزش هوش مصنوعی خوزستان یا اتوماسیون کسب‌وکار با هوش مصنوعی فرم زیر را پر کنید.";

export const metadata: Metadata = {
  title: contactTitle,
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: contactTitle,
    description: contactDescription,
    url: "/contact",
  },
};

export const revalidate = 300;

const contactH1 = "رزرو جلسه مشاوره";

// صفحه‌ی تماس + نقطه‌ی تماس کسب‌وکار؛ فقط شهر و استان (نشانی دقیق ثبت نشده است).
// نام کسب‌وکار همان نام اسکیمای ProfessionalService در app/layout.tsx است.
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: contactTitle,
  description: contactDescription,
  inLanguage: "fa-IR",
  mainEntity: {
    "@type": "ProfessionalService",
    name: "عبدالله احمدیان - مشاور هوش مصنوعی و کسب‌وکار",
    url: SITE_URL,
    telephone: CONTACT_PHONE_E164,
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT_CITY,
      addressRegion: CONTACT_REGION,
      addressCountry: "IR",
    },
    openingHours: "Sa,Su,Mo,Tu,We,Th 09:00-18:00",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: CONTACT_HOURS.days,
      opens: CONTACT_HOURS.opens,
      closes: CONTACT_HOURS.closes,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: CONTACT_PHONE_E164,
      areaServed: "IR",
      availableLanguage: "fa",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: CONTACT_HOURS.days,
        opens: CONTACT_HOURS.opens,
        closes: CONTACT_HOURS.closes,
      },
    },
  },
};

// از همان فهرستی ساخته می‌شود که بخش «پیش از رزرو» نمایش می‌دهد.
const faqJsonLd = buildFaqJsonLd(CONTACT_FAQ);

export default function ContactPage() {
  return (
    // توکن‌های طراحی (همان توکن‌های صفحه‌ی خدمات + چند توکن فرم) فقط روی همین صفحه فعال‌اند.
    <div dir="rtl" className={`${servicesTheme.root} ${contactTheme.root}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactPageJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      )}
      <ContactHero title={contactH1} form={<ContactForm />} />
      <ContactNextSteps />
      <ContactFaq />
    </div>
  );
}
