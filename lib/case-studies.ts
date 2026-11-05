import { SITE_URL } from "@/lib/site";
import { mdHeading, mdJoin, mdLink, mdList } from "@/lib/markdown";

// جای خالی اطلاعاتی که باید صاحب سایت پر کند؛ هیچ عدد، تاریخ یا نقل‌قولی از خود ساخته نمی‌شود.
export const todo = (what: string) => `[TODO: ${what}]`;
export const hasTodo = (text: string) => text.includes("[TODO");

export type CaseStudy = {
  slug: string;
  title: string;
  // عنوان صفحه (title تگ) به‌طور کامل، حداکثر ۶۰ نویسه
  metaTitle: string;
  // حداکثر ۱۵۵ نویسه
  metaDescription: string;
  client: { name: string; alternateName?: string[] };
  // یک پاراگراف که به‌تنهایی قابل نقل است: چه کسی، چه کاری، برای چه سازمانی
  summary: string;
  challenge: string;
  curriculum: string[];
  details: { label: string; value: string }[];
  result: string;
  // اختیاری؛ فقط نقل‌قول واقعی و با اجازه‌ی گوینده
  quote: { text: string; by: string } | null;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "foolad-khuzestan-pr-ai-training",
    title: "آموزش هوش مصنوعی برای روابط عمومی فولاد خوزستان",
    metaTitle: "آموزش هوش مصنوعی روابط عمومی فولاد خوزستان",
    metaDescription:
      "نمونه‌کار: دوره‌ی «هوش مصنوعی در خدمت روابط عمومی» که عبدالله احمدیان برای تیم روابط عمومی شرکت فولاد خوزستان برگزار کرد.",
    client: { name: "شرکت فولاد خوزستان", alternateName: ["Khuzestan Steel", "Foolad Khuzestan"] },
    summary:
      "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، دوره‌ی «هوش مصنوعی در خدمت روابط عمومی» را برای تیم روابط عمومی شرکت فولاد خوزستان برگزار کرد. در این دوره، شرکت‌کنندگان ابزارهای هوش مصنوعی را روی کارهای واقعی خود تیم تمرین کردند، نه روی مثال‌های عمومی.",
    challenge: todo("چالش یا نیاز تیم روابط عمومی پیش از دوره، در ۲ تا ۳ جمله"),
    curriculum: [todo("سرفصل‌های واقعی دوره، هر سرفصل یک آیتم")],
    details: [
      { label: "مدت دوره", value: todo("مدت دوره (مثلاً تعداد ساعت یا جلسه)") },
      { label: "تعداد شرکت‌کننده", value: todo("تعداد شرکت‌کنندگان") },
      { label: "تاریخ برگزاری", value: todo("تاریخ یا بازه‌ی برگزاری") },
    ],
    result: todo("نتیجه‌ی دوره: چه چیزی بعد از آموزش در کار تیم تغییر کرد"),
    quote: null,
  },
  {
    slug: "foolad-oxin-ai-training",
    title: "دوره هوش مصنوعی برای کارکنان فولاد اکسین خوزستان",
    metaTitle: "دوره هوش مصنوعی کارکنان فولاد اکسین خوزستان",
    metaDescription:
      "نمونه‌کار: دوره‌ی آموزش هوش مصنوعی که عبدالله احمدیان برای کارکنان شرکت فولاد اکسین خوزستان برگزار کرد.",
    client: { name: "شرکت فولاد اکسین خوزستان" },
    summary:
      "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، یک دوره‌ی آموزش هوش مصنوعی برای کارکنان شرکت فولاد اکسین خوزستان برگزار کرد. " +
      todo("یک جمله درباره‌ی تمرکز دوره و واحدهای شرکت‌کننده"),
    challenge: todo("چالش یا نیاز کارکنان پیش از دوره، در ۲ تا ۳ جمله"),
    curriculum: [todo("سرفصل‌های واقعی دوره، هر سرفصل یک آیتم")],
    details: [
      { label: "مدت دوره", value: todo("مدت دوره (مثلاً تعداد ساعت یا جلسه)") },
      { label: "تعداد شرکت‌کننده", value: todo("تعداد شرکت‌کنندگان") },
      { label: "تاریخ برگزاری", value: todo("تاریخ یا بازه‌ی برگزاری") },
    ],
    result: todo("نتیجه‌ی دوره: چه چیزی بعد از آموزش در کار کارکنان تغییر کرد"),
    quote: null,
  },
];

export const CASE_STUDIES_HUB = {
  path: "/case-studies",
  title: "نمونه‌کارها",
  metaTitle: "نمونه‌کارهای آموزش هوش مصنوعی سازمانی | عبدالله احمدیان",
  metaDescription:
    "نمونه‌کارهای آموزش هوش مصنوعی عبدالله احمدیان برای سازمان‌ها و صنایع خوزستان، از جمله دوره‌های کارکنان و روابط عمومی فولاد خوزستان.",
  intro:
    "این صفحه دوره‌هایی را نشان می‌دهد که عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، برای سازمان‌ها و صنایع برگزار کرده است؛ از جمله دوره‌های هوش مصنوعی کارکنان و روابط عمومی فولاد خوزستان. هر نمونه‌کار نشان می‌دهد چالش سازمان چه بود، چه چیزی آموزش داده شد و چه نتیجه‌ای گرفت.",
};

export const caseStudyPath = (slug: string) => `${CASE_STUDIES_HUB.path}/${slug}`;
export const caseStudyUrl = (slug: string) => `${SITE_URL}${caseStudyPath(slug)}`;
export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug) ?? null;

// ─── نسخه‌ی Markdown (برای llms-full.txt و پاسخ Accept: text/markdown) ─────────────────────

export const CASE_STUDY_SECTIONS = {
  challenge: "چالش",
  curriculum: "سرفصل‌ها",
  details: "مدت، تعداد شرکت‌کننده و تاریخ",
  result: "نتیجه",
  quote: "از زبان کارفرما",
};

export function caseStudyMarkdown(c: CaseStudy) {
  return mdJoin([
    mdHeading(1, c.title),
    `کارفرما: ${c.client.name}`,
    c.summary,
    mdHeading(2, CASE_STUDY_SECTIONS.challenge),
    c.challenge,
    mdHeading(2, CASE_STUDY_SECTIONS.curriculum),
    mdList(c.curriculum),
    mdHeading(2, CASE_STUDY_SECTIONS.details),
    mdList(c.details.map((d) => `**${d.label}:** ${d.value}`)),
    mdHeading(2, CASE_STUDY_SECTIONS.result),
    c.result,
    c.quote && mdHeading(2, CASE_STUDY_SECTIONS.quote),
    c.quote && `> ${c.quote.text}\n>\n> — ${c.quote.by}`,
    `${mdLink("درخواست دوره برای سازمان شما", "/contact")} · ${mdLink("آموزش هوش مصنوعی در اهواز", "/services/ai-training-ahvaz")} · ${mdLink("دوره هوش مصنوعی سازمانی", "/services/corporate-ai-training")}`,
  ]);
}

export function caseStudiesHubMarkdown() {
  return mdJoin([
    mdHeading(1, CASE_STUDIES_HUB.title),
    CASE_STUDIES_HUB.intro,
    mdList(CASE_STUDIES.map((c) => `${mdLink(c.title, caseStudyPath(c.slug))} (${c.client.name}): ${c.summary}`)),
  ]);
}
