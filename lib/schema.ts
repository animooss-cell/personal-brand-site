import {
  ENTITY_STATEMENT_FA,
  ORGANIZATION_ID,
  PERSON_ALTERNATE_NAMES,
  PERSON_ID,
  PERSON_NAME_FA,
  SAME_AS,
  SITE_URL,
} from "@/lib/site";
import { CASE_STUDIES, caseStudyUrl } from "@/lib/case-studies";

// موضوعاتی که این شخص در آن‌ها تخصص دارد (موضوع، نه کلیدواژه‌ی سئو).
export const KNOWS_ABOUT = [
  "هوش مصنوعی مولد",
  "آموزش هوش مصنوعی سازمانی",
  "مهندسی پرامپت",
  "هوش مصنوعی در روابط عمومی",
  "اتوماسیون کسب‌وکار",
  "استراتژی رشد کسب‌وکار",
];

export const OCCUPATION_NAME = "مدرس و مشاور هوش مصنوعی";

const ADDRESS = {
  "@type": "PostalAddress",
  addressLocality: "اهواز",
  addressRegion: "خوزستان",
  addressCountry: "IR",
};

// ارجاع به همان یک Person در هر اسکیمای دیگر (provider، author، founder و ...).
export const personRef = { "@type": "Person", "@id": PERSON_ID, name: PERSON_NAME_FA } as const;
export const organizationRef = { "@id": ORGANIZATION_ID } as const;

function caseStudyWorks() {
  return CASE_STUDIES.map((c) => ({ "@type": "Article", "@id": `${caseStudyUrl(c.slug)}#article`, url: caseStudyUrl(c.slug), name: c.title }));
}

// نسخه‌ی کامل Person برای /about.
export function buildPersonJsonLd({ jobTitle, image }: { jobTitle: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME_FA,
    alternateName: PERSON_ALTERNATE_NAMES,
    description: ENTITY_STATEMENT_FA,
    jobTitle,
    image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    url: `${SITE_URL}/about`,
    address: ADDRESS,
    hasOccupation: { "@type": "Occupation", name: OCCUPATION_NAME },
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
    workExample: caseStudyWorks(),
  };
}

// نسخه‌ی خلاصه برای صفحه‌ی اصلی؛ همان @id و همان مقادیر، فقط فیلدهای کمتر.
export function buildPersonSummaryJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PERSON_NAME_FA,
    alternateName: PERSON_ALTERNATE_NAMES,
    description: ENTITY_STATEMENT_FA,
    url: `${SITE_URL}/about`,
    hasOccupation: { "@type": "Occupation", name: OCCUPATION_NAME },
    sameAs: SAME_AS,
  };
}
