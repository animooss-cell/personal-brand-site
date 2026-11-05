import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ListChecks, Clock, Users, Building2 } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { personRef } from "@/lib/schema";
import { corporateAiTraining } from "@/lib/content/services/corporate-ai-training";
import { CASE_STUDIES, caseStudyPath } from "@/lib/case-studies";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import FaqAccordion from "@/components/FaqAccordion";
import RichText from "@/components/RichText";
import EntityBio from "@/components/EntityBio";

export const revalidate = 300;

const c = corporateAiTraining;
const { title, description } = c;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: c.path },
  openGraph: { title, description, url: c.path },
};

const formatIcons = [Clock, Clock, Users];

export default function CorporateAiTrainingPage() {
  const url = `${SITE_URL}${c.path}`;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: c.name,
    serviceType: c.serviceType,
    provider: personRef,
    areaServed: "IR",
    url,
    description,
  };

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description,
    url,
    provider: personRef,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: ["Onsite", "Online"],
      location: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: "IR" } },
    },
    // بدون price ساختگی؛ هزینه بعد از شناخت نیاز سازمان اعلام می‌شود. Course خودش areaServed ندارد؛ روی Offer می‌آید.
    offers: { "@type": "Offer", category: "Paid", availability: "https://schema.org/InStock", areaServed: "IR" },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: "خدمات", path: "/services" },
    { name: c.name, path: c.path },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{c.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{c.hero.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">
          <RichText parts={c.intro} />
        </p>

        <EntityBio />

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <Building2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
          {c.audiencesHeading}
        </h2>
        <ul className="mb-12 space-y-2 text-base leading-7 text-slate-600 dark:text-slate-300">
          {c.audiences.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{c.formatsHeading}</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {c.formats.map(({ title: formatTitle, desc }, i) => {
            const Icon = formatIcons[i];
            return (
              <div key={formatTitle} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{formatTitle}</h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            );
          })}
        </div>

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <ListChecks className="h-6 w-6 text-brand-600" aria-hidden="true" />
          {c.curriculumHeading}
        </h2>
        <ul className="mb-12 space-y-2 text-base leading-7 text-slate-600 dark:text-slate-300">
          {c.curriculum.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{c.recordsHeading}</h2>
        <p className="mb-4 text-base leading-7 text-slate-600 dark:text-slate-300">{c.recordsIntro}</p>
        <ul className="mb-12 space-y-2 text-base leading-7">
          {CASE_STUDIES.map((cs) => (
            <li key={cs.slug}>
              <Link href={caseStudyPath(cs.slug)} className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
                {cs.title}
              </Link>
            </li>
          ))}
          {c.otherRecords.map((r) => (
            <li key={r.title} className="text-slate-700 dark:text-slate-200">
              <span className="font-semibold">{r.title}</span>
              <span className="text-slate-500 dark:text-slate-400"> ({r.note})</span>
            </li>
          ))}
        </ul>

        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">سوالات متداول</h2>
        <div className="mb-12">
          <FaqAccordion items={c.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>
      </section>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{c.cta.heading}</h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">{c.cta.text}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            {c.cta.button}
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
