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

export type CaseStudyImpact = {
  value: string;
  label: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  // عنوان صفحه (title تگ) به‌طور کامل، حداکثر ۶۰ نویسه
  metaTitle: string;
  // حداکثر ۱۵۵ نویسه
  metaDescription: string;
  client: { name: string; alternateName?: string[] };
  industry?: string;
  // یک پاراگراف که به‌تنهایی قابل نقل است: چه کسی، چه کاری، برای چه سازمانی
  summary: string;
  impactStats?: CaseStudyImpact[];
  tags?: string[];
  highlights?: string[];
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

export const OVERALL_METRICS = [
  { value: "۵+", label: "دوره سازمانی برگزار شده", desc: "برای دپارتمان‌های کلیدی و مدیران ارشد" },
  { value: "۱۰۰+", label: "مدیر و کارشناس آموزش‌دیده", desc: "در حوزه‌های تولید، مالی، بازرگانی و روابط عمومی" },
  { value: "۳۲+", label: "ساعت کارگاه عملیاتی", desc: "آموزش ۱۰۰٪ کاربردی روی سناریوهای واقعی کارخانجات" },
  { value: "۸۰٪", label: "تسریع فرآیندهای کاری", desc: "در گزارش‌نویسی و تولید محتوای رسانه‌ای" },
];

export const IMPLEMENTATION_STEPS = [
  {
    step: "۰۱",
    title: "عارضه‌یابی و نیازسنجی دپارتمان‌ها",
    desc: "بررسی فرآیندهای جاری، اسناد روتین و شناسایی گلوگاه‌های زمانی تیم‌های کاری برای انتخاب ابزار متناسب.",
  },
  {
    step: "۰۲",
    title: "طراحی سناریوهای بومی با حفظ محرمانگی",
    desc: "تنظیم پرامپت‌ها و ساختارهای متناسب با صنعت و اعمال پروتکل‌های سفت‌وسخت عدم نشت اطلاعات شرکت.",
  },
  {
    step: "۰۳",
    title: "کارگاه عملیاتی و زنده (Hands-on)",
    desc: "آموزش پشت سیستم با تمرکز بر اجرای واقعی تسک‌های کاری همان روز توسط پرسنل حاضر در دوره.",
  },
  {
    step: "۰۴",
    title: "سنجش اثربخشی و پشتیبانی پس از دوره",
    desc: "ارزیابی خروجی پرسنل، تحویل کتابچه راهنمای اختصاصی و پشتیبانی برای رفع اشکالات کاری پیش‌آمده.",
  },
];

export const CASE_STUDIES_FAQ = [
  {
    question: "اثربخشی دوره‌های هوش مصنوعی در سازمان‌ها چطور اندازه‌گیری می‌شود؟",
    answer: "اثربخشی بر اساس سه شاخص کلیدی سنجیده می‌شود: ۱) کاهش چشمگیر زمان آماده‌سازی گزارش‌ها و محتواها، ۲) کاهش هزینه‌های برون‌سپاری خدمات اداری/گرافیکی، و ۳) تسلط عملی پرسنل در تحویل پروژه‌های کارگاهی در پایان دوره.",
  },
  {
    question: "آیا سرفصل‌های دوره متناسب با داده‌ها و چالش‌های داخلی شرکت ما شخصی‌سازی می‌شود؟",
    answer: "بله، پیش از برگزاری دوره، طی یک جلسه نیازسنجی، گلوگاه‌های کاری دپارتمان‌های شما (مالی، تولید، بازرگانی، روابط عمومی و اداری) بررسی شده و مثال‌ها، سناریوها و پرامپت‌ها دقیقاً بر اساس جریان کار و داده‌های واقعی همان سازمان طراحی می‌شوند.",
  },
  {
    question: "امنیت اطلاعات و اسناد محرمانه سازمان در جریان آموزش هوش مصنوعی چگونه حفظ می‌شود؟",
    answer: "در تمامی دوره‌ها پروتکل‌های حفظ حریم خصوصی، روش‌های مسدودسازی آموزش مدل‌ها روی داده‌های سازمانی (Opt-out)، و استفاده از ابزارهای امن و محلی (مانند NotebookLM سازمانی یا پایگاه‌های داده اختصاصی) به پرسنل آموزش داده می‌شود تا هیچ سند محرمانه‌ای به بیرون درز نکند.",
  },
  {
    question: "آیا امکان برگزاری دوره‌ها به‌صورت حضوری در خارج از استان خوزستان وجود دارد؟",
    answer: "بله، علاوه بر اهواز و استان خوزستان، امکان برگزاری کارگاه‌های فشرده حضوری در سراسر کشور (تهران، اصفهان، کیش و سایر شهرها) و همچنین دوره‌های تعاملی آنلاین با پشتیبانی کامل وجود دارد.",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "foolad-khuzestan-ai-training-program",
    title: "۵ دوره‌ی هوش مصنوعی برای فولاد خوزستان",
    metaTitle: "۵ دوره هوش مصنوعی برای فولاد خوزستان | نمونه‌کار سازمانی",
    metaDescription:
      "عبدالله احمدیان ۵ دوره‌ی آموزش هوش مصنوعی برای مدیران، رؤسا و کارشناسان فولاد خوزستان برگزار کرده است: پرامپت‌نویسی، داشبوردسازی، گزارش و روابط عمومی.",
    client: KHUZESTAN_STEEL,
    industry: "صنایع سنگین و فولاد",
    tags: ["صنایع فولاد", "مدیریت ارشد", "داشبوردسازی", "گزارش‌نویسی"],
    impactStats: [
      { value: "۵ دوره", label: "کارگاه تخصصی سازمانی" },
      { value: "۱۰۰+ نفر", label: "مدیر، رئیس و کارشناس" },
      { value: "۴ دپارتمان", label: "تولید، مالی، بازرگانی و روابط عمومی" },
      { value: "۱۰۰٪", label: "پروژه‌محور روی سناریوی واقعی" },
    ],
    highlights: [
      "آموزش پرامپت‌نویسی پیشرفته برای تسریع مکاتبات و صورت‌جلسات دپارتمان‌های تولید و مالی",
      "طراحی داشبوردهای تحلیلی هوشمند با هوش مصنوعی برای مدیران و سرپرستان",
      "آموزش تکنیک‌های خلاصه و سنتز اسناد فنی برای مدیران ارشد شرکت",
    ],
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
    metaTitle: "آموزش هوش مصنوعی روابط عمومی فولاد خوزستان | نمونه‌کار",
    metaDescription:
      "دوره‌ی ۱۶ ساعته‌ی «" + PR_COURSE_NAME + "» برای ۲۰ نفر از کارکنان فولاد خوزستان؛ تولید خبر، بیانیه و کپشن بدون طراح بیرونی.",
    client: KHUZESTAN_STEEL,
    industry: "روابط عمومی و رسانه سازمانی",
    tags: ["روابط عمومی", "تولید محتوا", "پوستر و خبر", "کاهش هزینه"],
    impactStats: [
      { value: "۱۶ ساعت", label: "آموزش عملی در ۲ جلسه" },
      { value: "۲۰ نفر", label: "کارشناس روابط عمومی" },
      { value: "۸۰٪", label: "کاهش زمان نگارش خبر و بیانیه" },
      { value: "صفر", label: "وابستگی به طراح گرافیک بیرونی" },
    ],
    highlights: [
      "تسلط بر ۱۰ ساختار پرامپت‌نویسی تخصصی برای تولید خبر، بیانیه و کپشن اینستاگرام",
      "تولید مستقل بنر و سناریوهای ویدیویی بدون معطلی در دریافت خدمات از بیرون شرکت",
      "یکپارچه‌سازی لحن و هویت برند فولاد خوزستان در خروجی‌های شبکه‌های اجتماعی",
    ],
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
    industry: "صنایع فولاد و گزارش‌نویسی مدیریتی",
    tags: ["فولاد اکسین", "گزارش‌نویسی", "خلاصه اسناد", "مدیریت آموزش"],
    impactStats: [
      { value: "۱ دوره", label: "جامع با همکاری مدیریت آموزش" },
      { value: "۷۰٪", label: "سرعت بیشتر در سنتز اسناد" },
      { value: "۱۰۰٪", label: "رعایت محرمانگی اسناد فنی" },
      { value: "کاربردی", label: "تبدیل صورت‌جلسات به تصمیم‌نامه" },
    ],
    highlights: [
      "به‌کارگیری ابزارهای تحلیل اسناد برای خلاصه‌سازی سریع گزارش‌های حجیم فنی و مهندسی",
      "استانداردسازی قالب صورت‌جلسات اداری و تصمیم‌نامه‌های هیئت‌مدیره",
      "آموزش روش‌های ایمن ورود داده برای جلوگیری از نقض محرمانگی اطلاعات تولیدی",
    ],
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
  title: "نمونه‌کارهای آموزش هوش مصنوعی سازمانی",
  metaTitle: "نمونه‌کارهای آموزش هوش مصنوعی سازمانی در اهواز و خوزستان | عبدالله احمدیان",
  metaDescription:
    "نتایج ملموس، متریک‌های عملکرد و نمونه‌کارهای آموزش هوش مصنوعی عبدالله احمدیان برای سازمان‌ها و صنایع بزرگ خوزستان از جمله فولاد خوزستان و فولاد اکسین.",
  intro:
    "بررسی نتایج واقعی و ملموس دوره‌های هوش مصنوعی سازمانی برگزار شده برای مجتمع‌های صنعتی، شرکت‌های فولادی و سازمان‌ها؛ با تمرکز بر اتوماسیون گزارش‌نویسی، کاهش هزینه‌ها و بهره‌وری تیم‌ها.",
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
