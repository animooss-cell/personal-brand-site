import { PR_COURSE_NAME, SITE_URL } from "@/lib/site";
import { mdHeading, mdJoin, mdLink, mdList } from "@/lib/markdown";

// نمونه‌کارها. هر فیلدی که داده‌ی واقعی برایش نداریم اختیاری است و اگر پر نشده باشد، آن بخش اصلاً نمایش داده نمی‌شود؛
// هیچ عدد، تاریخ یا نقل‌قولی از خود ساخته نمی‌شود.

export type CaseStudyCourse = {
  title: string;
  audience: string;
  // فقط وقتی جزئیات واقعی داریم (مدت، تعداد، زمان)
  facts?: string;
  // نمونه‌کار جداگانه‌ی همین دوره، اگر وجود داشته باشد
  slug?: string;
};

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
  // نام رسمی دوره (برای اسکیمای Course در mentions)
  courseName?: string;
  // slug صفحه‌ی همین دوره در /services/courses (برای لینک دوطرفه‌ی نمونه‌کار و صفحه‌ی دوره)
  courseSlug?: string;
  // دوره‌های یک مجموعه‌ی چنددوره‌ای
  courses?: CaseStudyCourse[];
  challenge?: string;
  curriculum?: string[];
  details?: { label: string; value: string }[];
  result?: string;
};

export const CASE_STUDY_SECTIONS = {
  courses: "دوره‌ها",
  challenge: "چالش",
  curriculum: "سرفصل‌ها",
  details: "جزئیات دوره",
  result: "نتیجه",
};

const KHUZESTAN_STEEL = { name: "شرکت فولاد خوزستان", alternateName: ["Khuzestan Steel", "Foolad Khuzestan"] };

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "foolad-khuzestan-ai-training-program",
    title: "۵ دوره‌ی هوش مصنوعی برای فولاد خوزستان",
    metaTitle: "۵ دوره هوش مصنوعی برای فولاد خوزستان | نمونه‌کار",
    metaDescription:
      "عبدالله احمدیان ۵ دوره‌ی آموزش هوش مصنوعی برای مدیران، رؤسا و کارشناسان فولاد خوزستان برگزار کرده است: پرامپت‌نویسی، داشبوردسازی، گزارش و روابط عمومی.",
    client: KHUZESTAN_STEEL,
    summary:
      "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، تا امروز ۵ دوره‌ی آموزش هوش مصنوعی برای مدیران، رؤسا و کارشناسان فولاد خوزستان برگزار کرده است؛ از پرامپت‌نویسی برای تیم‌های تولید، مالی و بازرگانی تا داشبوردسازی، تهیه‌ی گزارش با هوش مصنوعی و دوره‌ی «" + PR_COURSE_NAME + "».",
    courses: [
      { title: "هنر پرامپت‌نویسی", audience: "تیم‌های کاری تولید، مالی و بازرگانی" },
      { title: "داشبوردسازی با هوش مصنوعی", audience: "مدیران مالی و تولید" },
      { title: "تهیه‌ی گزارش با هوش مصنوعی", audience: "کارشناسان، رؤسا و مدیران" },
      { title: "آموزش تهیه‌ی گزارش با هوش مصنوعی", audience: "مدیران ارشد شرکت" },
      {
        title: PR_COURSE_NAME,
        audience: "کارکنان روابط عمومی",
        facts: "۱۶ ساعت در ۲ جلسه، ۲۰ نفر، شهریور ۱۴۰۵",
        slug: "foolad-khuzestan-pr-ai-training",
      },
    ],
  },
  {
    slug: "foolad-khuzestan-pr-ai-training",
    title: "آموزش هوش مصنوعی برای روابط عمومی فولاد خوزستان",
    metaTitle: "آموزش هوش مصنوعی روابط عمومی فولاد خوزستان",
    metaDescription:
      "دوره‌ی ۱۶ ساعته‌ی «" + PR_COURSE_NAME + "» برای ۲۰ نفر از کارکنان فولاد خوزستان؛ تولید خبر، بیانیه و کپشن بدون طراح بیرونی.",
    client: KHUZESTAN_STEEL,
    summary:
      "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، دوره‌ی «" + PR_COURSE_NAME + "» را در شهریور ۱۴۰۵ برای ۲۰ نفر از کارکنان روابط عمومی شرکت فولاد خوزستان برگزار کرد. این دوره‌ی ۱۶ ساعته در ۲ جلسه برگزار شد و بر ۱۰ ساختار پرامپت‌نویسی برای تولید خبر، بیانیه و کپشن اینستاگرام تمرکز داشت.",
    challenge:
      "تیم روابط عمومی برای محتوای شبکه‌های اجتماعی به قرارداد با طراح گرافیک بیرونی وابسته بود و تولید محتوا زمان و هزینه‌ی بالایی داشت.",
    courseName: PR_COURSE_NAME,
    courseSlug: "ai-public-relations",
    curriculum: ["۱۰ ساختار پرامپت‌نویسی برای تولید خبر، بیانیه و کپشن اینستاگرام"],
    details: [
      { label: "مدت دوره", value: "۱۶ ساعت (۲ جلسه)" },
      { label: "شرکت‌کنندگان", value: "۲۰ نفر از کارکنان روابط عمومی" },
      { label: "زمان برگزاری", value: "شهریور ۱۴۰۵" },
    ],
    result:
      "تیم روابط عمومی دیگر برای محتوای شبکه‌های اجتماعی به قرارداد با طراح گرافیک بیرونی نیاز ندارد و خبر، بیانیه و کپشن را خودش، سریع‌تر و با هزینه‌ی بسیار کمتر تولید می‌کند.",
  },
  {
    slug: "foolad-oxin-ai-training",
    title: "دوره‌ی تهیه‌ی گزارش با هوش مصنوعی برای فولاد اکسین خوزستان",
    metaTitle: "دوره گزارش‌نویسی با هوش مصنوعی فولاد اکسین خوزستان",
    metaDescription:
      "دوره‌ی تهیه و نگارش گزارش با هوش مصنوعی برای فولاد اکسین خوزستان، با تدریس عبدالله احمدیان و برگزاری مدیریت آموزش فولاد خوزستان.",
    client: { name: "شرکت فولاد اکسین خوزستان" },
    summary:
      "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، دوره‌ی آموزش تهیه و نگارش گزارش با هوش مصنوعی را برای شرکت فولاد اکسین خوزستان برگزار کرد. برگزارکننده‌ی این دوره مدیریت آموزش شرکت فولاد خوزستان بود.",
    details: [
      { label: "برگزارکننده", value: "مدیریت آموزش شرکت فولاد خوزستان" },
      { label: "موضوع", value: "آموزش تهیه و نگارش گزارش با هوش مصنوعی" },
    ],
  },
];

export const CASE_STUDIES_HUB = {
  path: "/case-studies",
  title: "نمونه‌کارها",
  metaTitle: "نمونه‌کارهای آموزش هوش مصنوعی سازمانی | عبدالله احمدیان",
  metaDescription:
    "نمونه‌کارهای آموزش هوش مصنوعی عبدالله احمدیان برای سازمان‌ها، از جمله ۵ دوره برای مدیران، رؤسا و کارشناسان فولاد خوزستان.",
  intro:
    "این صفحه دوره‌هایی را نشان می‌دهد که عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز، برای سازمان‌ها و صنایع برگزار کرده است؛ از جمله ۵ دوره‌ی آموزش هوش مصنوعی برای مدیران، رؤسا و کارشناسان فولاد خوزستان.",
};

export const caseStudyPath = (slug: string) => `${CASE_STUDIES_HUB.path}/${slug}`;
export const caseStudyUrl = (slug: string) => `${SITE_URL}${caseStudyPath(slug)}`;
export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug) ?? null;
export const getCaseStudyForCourse = (courseSlug: string) => CASE_STUDIES.find((c) => c.courseSlug === courseSlug) ?? null;

export const CASE_STUDY_COURSE_LINK_LABEL = "صفحه‌ی این دوره";

// ─── نسخه‌ی Markdown (برای llms-full.txt و پاسخ Accept: text/markdown) ─────────────────────

// course: صفحه‌ی دوره‌ی مرتبط، فقط اگر در دیتابیس واقعاً منتشر شده باشد
export function caseStudyMarkdown(c: CaseStudy, course?: { title: string; slug: string } | null) {
  return mdJoin([
    mdHeading(1, c.title),
    `کارفرما: ${c.client.name}`,
    c.summary,
    c.courses && mdHeading(2, CASE_STUDY_SECTIONS.courses),
    c.courses &&
      mdList(
        c.courses.map(
          (k) =>
            `**${k.slug ? mdLink(k.title, caseStudyPath(k.slug)) : k.title}** — ${k.audience}${k.facts ? ` (${k.facts})` : ""}`,
        ),
      ),
    c.challenge && mdHeading(2, CASE_STUDY_SECTIONS.challenge),
    c.challenge,
    c.curriculum && mdHeading(2, CASE_STUDY_SECTIONS.curriculum),
    c.curriculum && mdList(c.curriculum),
    c.details && mdHeading(2, CASE_STUDY_SECTIONS.details),
    c.details && mdList(c.details.map((d) => `**${d.label}:** ${d.value}`)),
    c.result && mdHeading(2, CASE_STUDY_SECTIONS.result),
    c.result,
    course && `${CASE_STUDY_COURSE_LINK_LABEL}: ${mdLink(course.title, `/services/courses/${course.slug}`)}`,
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
