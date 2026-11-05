import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Instagram,
  Search,
  CalendarDays,
  CheckCircle2,
  ListChecks,
  Briefcase,
  MapPin,
} from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { personRef } from "@/lib/schema";
import { aiContentGeneration } from "@/lib/content/services/ai-content-generation";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";
import FaqAccordion from "@/components/FaqAccordion";
import RichText from "@/components/RichText";
import EntityBio from "@/components/EntityBio";

export const revalidate = 300;

const c = aiContentGeneration;
const { title, description } = c;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: c.path },
  openGraph: { title, description, url: c.path },
};

const offeringIcons = [Instagram, Search, CalendarDays];

export default function AiContentGenerationPage() {
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    serviceType: c.serviceType,
    provider: personRef,
    areaServed: { "@type": "City", name: "اهواز" },
    url: `${SITE_URL}${c.path}`,
    description,
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
    { name: title, path: c.path },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{c.hero.title}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{c.hero.lead}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">{c.intro}</p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{c.offeringsHeading}</h2>
        <div className="mb-12 grid gap-6 sm:grid-cols-3">
          {c.offerings.map(({ title: serviceTitle, desc }, i) => {
            const Icon = offeringIcons[i];
            return (
              <div key={serviceTitle} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <Icon className="mb-3 h-6 w-6 text-brand-600" aria-hidden="true" />
                <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">{serviceTitle}</h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            );
          })}
        </div>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{c.fit.heading}</h2>
        <p className="mb-8 text-base leading-7 text-slate-600 dark:text-slate-300">{c.fit.text}</p>

        <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{c.notFit.heading}</h2>
        <p className="mb-10 text-base leading-7 text-slate-600 dark:text-slate-300">{c.notFit.text}</p>

        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{c.stepsHeading}</h2>
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {c.steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/60">
              <span className="mb-2 block text-xs font-bold text-brand-600">{`گام ${i + 1}`}</span>
              <h3 className="mb-1 text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <ListChecks className="h-6 w-6 text-brand-600" aria-hidden="true" />
          {c.deliverablesHeading}
        </h2>
        <ul className="mb-12 space-y-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {c.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <Briefcase className="h-6 w-6 text-brand-600" aria-hidden="true" />
          {c.pricing.heading}
        </h2>
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">{c.pricing.text}</p>

        <h2 className="mb-3 flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
          <MapPin className="h-6 w-6 text-brand-600" aria-hidden="true" />
          {c.local.heading}
        </h2>
        <p className="mb-12 text-base leading-7 text-slate-600 dark:text-slate-300">{c.local.text}</p>

        <EntityBio />

        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">مقالات مرتبط</h2>
        <ul className="mb-12 space-y-2 text-sm leading-7">
          {c.relatedArticles.map((article) => (
            <li key={article.href}>
              <Link href={article.href} className="font-semibold text-brand-700 hover:underline">
                {article.label}
              </Link>
            </li>
          ))}
        </ul>

        <h2 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">سوالات متداول</h2>
        <div className="mb-12">
          <FaqAccordion items={c.faqs.map((f) => ({ question: f.q, answer: f.a }))} />
        </div>

        <div className="rounded-2xl bg-brand-50/60 p-6 text-sm leading-7 text-slate-600 dark:bg-brand-900/20 dark:text-slate-300">
          <RichText parts={c.related} />
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
