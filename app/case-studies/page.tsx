import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_URL } from "@/lib/site";
import { personRef } from "@/lib/schema";
import { CASE_STUDIES, CASE_STUDIES_HUB, caseStudyPath, caseStudyUrl } from "@/lib/case-studies";
import { buildBreadcrumbJsonLd, serializeJsonLd } from "@/lib/post-content";

const h = CASE_STUDIES_HUB;

export const metadata: Metadata = {
  title: { absolute: h.metaTitle },
  description: h.metaDescription,
  alternates: { canonical: h.path },
  openGraph: { title: h.metaTitle, description: h.metaDescription, url: h.path },
};

export default function CaseStudiesPage() {
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: h.title,
    description: h.metaDescription,
    url: `${SITE_URL}${h.path}`,
    author: personRef,
    hasPart: CASE_STUDIES.map((c) => ({ "@type": "Article", "@id": `${caseStudyUrl(c.slug)}#article`, url: caseStudyUrl(c.slug), name: c.title })),
  };
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "خانه", path: "/" },
    { name: h.title, path: h.path },
  ]);

  return (
    <div dir="rtl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />

      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-20">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{h.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="mb-12 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{h.intro}</p>

        <div className="grid gap-6">
          {CASE_STUDIES.map((c) => (
            <Link
              key={c.slug}
              href={caseStudyPath(c.slug)}
              className="group block rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-shadow duration-200 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-slate-700 dark:bg-slate-900"
            >
              <span className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {c.client.name}
              </span>
              <h2 className="mb-3 text-xl font-bold text-slate-900 dark:text-white">{c.title}</h2>
              <p className="mb-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{c.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:underline dark:text-brand-300">
                جزئیات این نمونه‌کار
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
