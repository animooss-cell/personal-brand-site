import type { Metadata } from "next";
import ContactForm from "./ContactForm";

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

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">رزرو جلسه مشاوره</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          فرم زیر را پر کنید تا برای هماهنگی جلسه رایگان با شما در ارتباط باشیم.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
