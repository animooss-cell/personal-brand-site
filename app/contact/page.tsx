import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import servicesTheme from "@/components/services/servicesTheme.module.css";
import contactTheme from "@/components/contact/contactTheme.module.css";

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

export default function ContactPage() {
  return (
    // توکن‌های طراحی (همان توکن‌های صفحه‌ی خدمات + چند توکن فرم) فقط روی همین صفحه فعال‌اند.
    <div dir="rtl" className={`${servicesTheme.root} ${contactTheme.root}`}>
      <ContactHero title={contactH1} form={<ContactForm />} />
    </div>
  );
}
