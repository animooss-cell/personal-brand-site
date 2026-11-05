import { CONTACT_PHONE_E164 } from "@/lib/contactInfo";
import { ENTITY_STATEMENT_EN, ENTITY_STATEMENT_FA, SITE_URL, SOCIAL_PROFILES } from "@/lib/site";
import { CASE_STUDIES, caseStudiesHubMarkdown, caseStudyMarkdown, caseStudyUrl } from "@/lib/case-studies";
import { aiBusinessConsulting, aiBusinessConsultingMarkdown } from "@/lib/content/services/ai-business-consulting";
import { aiGrowthConsulting, aiGrowthConsultingMarkdown } from "@/lib/content/services/ai-growth-consulting";
import { aiTrainingAhvaz, aiTrainingAhvazMarkdown } from "@/lib/content/services/ai-training-ahvaz";
import { aiContentGeneration, aiContentGenerationMarkdown } from "@/lib/content/services/ai-content-generation";
import { corporateAiTraining, corporateAiTrainingMarkdown } from "@/lib/content/services/corporate-ai-training";
import { aboutMarkdown, getAboutPageData } from "@/lib/about";
import { getPublishedCourses } from "@/lib/data";

// /llms.txt و /llms-full.txt از همین فایل ساخته می‌شوند؛ جمله‌ی معرفی، خدمات و پروفایل‌ها از همان منابع صفحه‌ها می‌آیند.

const url = (path: string) => `${SITE_URL}${path}`;

const SERVICES = [
  { fa: aiBusinessConsulting.title, en: "AI Business Consulting", path: aiBusinessConsulting.path },
  { fa: aiGrowthConsulting.title, en: "AI Growth Consulting", path: aiGrowthConsulting.path },
  { fa: aiTrainingAhvaz.name, en: "AI Training in Ahvaz (in-person classes)", path: aiTrainingAhvaz.path },
  { fa: aiContentGeneration.title, en: "AI Content Generation", path: aiContentGeneration.path },
  {
    fa: corporateAiTraining.name,
    en: "Corporate AI Training (online across Iran, in-person in Khuzestan)",
    path: corporateAiTraining.path,
  },
];

const RECORD_FA = [
  "دوره‌های هوش مصنوعی برای کارکنان و روابط عمومی فولاد خوزستان",
  "آموزش در فولاد اکسین خوزستان",
  "مدیر تیم اجرایی هکاتون سلامت کیش",
  "منتور و داور استارتاپ ویکندهای خوزستان، تهران و کرمانشاه",
  "برگزارکننده رویداد سرمایه‌گذاری طرح ملی رویش در خوزستان",
];

const RECORD_EN = [
  "AI courses for Khuzestan Steel (Foolad Khuzestan) staff and its public relations team",
  "AI training at Foolad Oxin Khuzestan",
  "Executive team lead of the Kish Health Hackathon",
  "Mentor and judge at Startup Weekend events in Khuzestan, Tehran and Kermanshah",
  "Organizer of the Rooyesh national investment program event in Khuzestan",
];

const AUDIENCE_FA =
  "سازمان‌ها و صنایع بزرگ (فولاد، پتروشیمی، نفت)، مدیران، تیم‌های روابط عمومی و بازاریابی، و کسب‌وکارهای کوچک. آموزش حضوری در خوزستان و آنلاین در کل ایران.";
const AUDIENCE_EN =
  "Large organizations and industries (steel, petrochemicals, oil), managers, public relations and marketing teams, and small businesses. In-person training in Khuzestan and online training across Iran.";

const CASE_STUDY_EN: Record<string, string> = {
  "foolad-khuzestan-pr-ai-training": "AI training for the Khuzestan Steel public relations team",
  "foolad-oxin-ai-training": "AI course for Foolad Oxin Khuzestan staff",
};

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

export function buildLlmsTxt() {
  const profiles = SOCIAL_PROFILES;
  return `# aiabed.ir — ${ENTITY_STATEMENT_EN}

> ${ENTITY_STATEMENT_FA}

## فارسی

${ENTITY_STATEMENT_FA}

### سوابق کلیدی
${list(RECORD_FA)}

### خدمات
${list(SERVICES.map((s) => `${s.fa}: ${url(s.path)}`))}

### مخاطبان
${AUDIENCE_FA}

### نمونه‌کارها
${list([`همه‌ی نمونه‌کارها: ${url("/case-studies")}`, ...CASE_STUDIES.map((c) => `${c.title}: ${caseStudyUrl(c.slug)}`)])}

### تماس
${list([
  `تماس و رزرو جلسه: ${url("/contact")}`,
  `درباره من: ${url("/about")}`,
  `تلفن: ${CONTACT_PHONE_E164}`,
  ...profiles.map((p) => `${p.label}: ${p.url}`),
])}

## English

${ENTITY_STATEMENT_EN}

### Key record
${list(RECORD_EN)}

### Services
${list(SERVICES.map((s) => `${s.en}: ${url(s.path)}`))}

### Audience
${AUDIENCE_EN}

### Case studies
${list([`All case studies: ${url("/case-studies")}`, ...CASE_STUDIES.map((c) => `${CASE_STUDY_EN[c.slug] ?? c.title}: ${caseStudyUrl(c.slug)}`)])}

### Contact
${list([
  `Contact / book a session: ${url("/contact")}`,
  `About: ${url("/about")}`,
  `Phone: ${CONTACT_PHONE_E164}`,
  ...profiles.map((p) => `${p.labelEn}: ${p.url}`),
])}

## Optional
- Full text of the about, service and case study pages: ${url("/llms-full.txt")}
`;
}

export async function buildLlmsFullTxt() {
  const [about, courses] = await Promise.all([getAboutPageData(), getPublishedCourses()]);
  const sections: { path: string; md: string }[] = [
    { path: "/about", md: aboutMarkdown(about) },
    { path: aiBusinessConsulting.path, md: aiBusinessConsultingMarkdown() },
    { path: aiGrowthConsulting.path, md: aiGrowthConsultingMarkdown() },
    { path: aiTrainingAhvaz.path, md: aiTrainingAhvazMarkdown(courses) },
    { path: aiContentGeneration.path, md: aiContentGenerationMarkdown() },
    { path: corporateAiTraining.path, md: corporateAiTrainingMarkdown() },
    { path: "/case-studies", md: caseStudiesHubMarkdown() },
    ...CASE_STUDIES.map((c) => ({ path: `/case-studies/${c.slug}`, md: caseStudyMarkdown(c) })),
  ];
  return [
    `# aiabed.ir — full text\n\n> ${ENTITY_STATEMENT_FA}\n>\n> ${ENTITY_STATEMENT_EN}`,
    ...sections.map((s) => `Source: ${url(s.path)}\n\n${s.md.trim()}`),
  ].join("\n\n---\n\n") + "\n";
}
