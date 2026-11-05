import { getAboutContent, getLatestNews, getLatestPosts, getPublishedCourses, getServices, getSettings } from "@/lib/data";
import { NEWS_CATEGORY } from "@/lib/categories";
import { mdHeading, mdJoin, mdLink, mdList } from "@/lib/markdown";
import { ENTITY_STATEMENT_FA, STARTUP_WEEKEND_ROLE } from "@/lib/site";
import { WHY_ME } from "@/lib/why-me";

// داده‌ی بخش‌های صفحه‌ی اصلی. کامپوننت‌های صفحه‌ی اصلی و نسخه‌ی Markdown آن (homeMarkdown) هر دو از همین‌ها می‌خوانند.

// همان تبدیل components/HomeCourses.tsx (مثلاً «16 ساعت» → «۱۶ ساعت»)
const toPersianDigits = (s: string) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

export const HERO_LEAD =
  "هر کسب‌وکاری جایی گیر می‌کند. کمک می‌کنم بفهمید کجای کار هستید، چرا گیر کرده‌اید و دقیقاً چه باید بکنید.";
export const HERO_TRUST_ITEMS = ["+۱۰ سال تجربه", `${STARTUP_WEEKEND_ROLE} استارتاپ ویکند`, "آموزش در فولاد خوزستان"];

export async function getHeroContent() {
  const s = await getSettings();
  return {
    badge: s?.hero_badge || "مشاوره کسب‌وکار و هوش مصنوعی",
    titlePrefix: s?.hero_title_prefix || "کسب‌وکار خود را با",
    titleHighlight: s?.hero_title_highlight || "قدرت هوش مصنوعی",
    titleSuffix: s?.hero_title_suffix || "رشد دهید",
    description:
      s?.hero_description ||
      "از راه‌اندازی استارتاپ تا اتوماسیون فرآیندها و کانتنت مارکتینگ هدفمند؛ با مشاوره عملی، نتیجه‌محور و بدون پیچیدگی فنی.",
    image: s?.hero_image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80",
    primaryCta: s?.hero_primary_cta || "رزرو جلسه مشاوره رایگان",
    secondaryCta: s?.hero_secondary_cta || "مطالعه مقالات",
    trustText: s?.hero_trust_text || "مورد اعتماد بیش از ۵۰۰ کسب‌وکار",
  };
}

export const TRUST_STRIP_HEADING = "با این مجموعه‌ها همکاری داشته‌ام";

export async function getTrustCollaborations() {
  const about = await getAboutContent();
  return about?.collaborations ?? [];
}

export const SERVICES_SECTION = { heading: "خدمات", lead: "سه مسیر اصلی همکاری؛ هر کدام با گام‌های روشن." };

export const HOME_COURSES_SECTION = {
  heading: "دوره‌های آموزشی هوش مصنوعی",
  lead: "آموزش روی کار واقعی خودتان",
  allLabel: "همه دوره‌ها",
  allHref: "/services/ai-training-ahvaz",
};

export const BLOG_SECTION = { heading: "آخرین مقالات", lead: "یادداشت‌هایی درباره هوش مصنوعی، استارتاپ و رشد کسب‌وکار." };
export const getHomeLatestPosts = () => getLatestPosts(3, NEWS_CATEGORY.value);

export const NEWS_BANNER_LABEL = "آخرین ماهنامه هوش مصنوعی";

export async function getHomeAboutContent() {
  const s = await getSettings();
  return {
    badge: s?.about_badge || "درباره من",
    titlePrefix: s?.about_title_prefix || "مشاوره‌ای بر پایه",
    titleHighlight: s?.about_title_highlight || "اعتماد و شفافیت",
    description:
      s?.about_description ||
      "همراهی عملی برای کسب‌وکارها در مسیر رشد، با تمرکز بر تصمیم‌های روشن و قابل اجرا — بدون پیچیدگی غیرضروری.",
    cardTitle: s?.about_card_title || "مسیر روشن تا تصمیم بهتر",
    cardDescription:
      s?.about_card_description ||
      "با یک جلسه شروع می‌کنیم، پیشنهادهای عملی دریافت می‌کنید و قدم‌به‌قدم در کنار شما پیش می‌رویم.",
    image: s?.about_image || "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80",
    principles: s?.about_principles?.length
      ? s.about_principles
      : ["مشاوره و بازبینی مستقل", "آمادگی برای رعایت استانداردها", "گزارش‌دهی واضح و بدون ابهام"],
    secondaryImage:
      s?.about_secondary_image || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    quoteTitle: s?.about_quote_title || "مشاوره‌ای بر پایه ساختار و حرفه‌ای‌گری",
    quoteText:
      s?.about_quote_text ||
      "هر همکاری با شناخت دقیق کسب‌وکار شما شروع می‌شود؛ سپس پیشنهادهایی متناسب با منابع و اهداف واقعی شما ارائه می‌دهیم.",
  };
}

export const HOME_ABOUT_PRINCIPLES_HEADING = "اصول کار من";

export const HOME_CTA = {
  heading: "آماده‌اید کسب‌وکارتان را متحول کنید؟",
  text: "در یک جلسه رایگان، مسیر دقیق پیاده‌سازی هوش مصنوعی در کسب‌وکار شما را بررسی می‌کنیم.",
  primary: "رزرو جلسه رایگان",
  whatsapp: "پیام در واتساپ",
};

export async function homeMarkdown() {
  const [hero, collaborations, services, courses, posts, [news], about] = await Promise.all([
    getHeroContent(),
    getTrustCollaborations(),
    getServices(),
    getPublishedCourses(),
    getHomeLatestPosts(),
    getLatestNews(1),
    getHomeAboutContent(),
  ]);
  return mdJoin([
    mdHeading(1, `${hero.titlePrefix} ${hero.titleHighlight} ${hero.titleSuffix}`),
    `> ${ENTITY_STATEMENT_FA}`,
    hero.badge,
    HERO_LEAD,
    hero.description,
    mdList(HERO_TRUST_ITEMS),
    hero.trustText,
    `${mdLink(hero.primaryCta, "/contact")} · ${mdLink(hero.secondaryCta, "/blog")}`,
    collaborations.length > 0 && `${TRUST_STRIP_HEADING}: ${collaborations.join("، ")}`,
    mdHeading(2, SERVICES_SECTION.heading),
    SERVICES_SECTION.lead,
    services
      .map((sv) =>
        mdJoin([
          mdHeading(3, sv.link ? mdLink(sv.title, sv.link) : sv.title),
          sv.subtitle,
          sv.description,
          sv.audience.length > 0 && `مخاطب: ${sv.audience.join("، ")}`,
          sv.steps.length > 0 && mdList(sv.steps, true),
        ]).trim(),
      )
      .join("\n\n"),
    courses.length > 0 && mdHeading(2, HOME_COURSES_SECTION.heading),
    courses.length > 0 && HOME_COURSES_SECTION.lead,
    courses.length > 0 &&
      mdList(
        courses
          .slice(0, 4)
          .map(
            (c) =>
              `${mdLink(c.title, `/services/courses/${c.slug}`)}${c.duration ? ` (${toPersianDigits(c.duration)})` : ""}${c.description ? `: ${c.description}` : ""}${c.audience ? ` — ${c.audience}` : ""}`,
          ),
      ),
    courses.length > 0 && mdLink(HOME_COURSES_SECTION.allLabel, HOME_COURSES_SECTION.allHref),
    mdHeading(2, WHY_ME.heading),
    mdList(WHY_ME.features.map((f) => `**${f.title}:** ${f.description}`)),
    mdHeading(2, BLOG_SECTION.heading),
    BLOG_SECTION.lead,
    posts.length ? mdList(posts.map((p) => `${mdLink(p.title, `/blog/${p.slug}`)}${p.excerpt ? `: ${p.excerpt}` : ""}`)) : "هنوز پستی منتشر نشده است.",
    news && `${NEWS_BANNER_LABEL}: ${mdLink(news.title, `/news/${news.slug}`)}`,
    mdHeading(2, `${about.titlePrefix} ${about.titleHighlight}`),
    about.description,
    mdHeading(3, about.cardTitle),
    about.cardDescription,
    mdHeading(3, HOME_ABOUT_PRINCIPLES_HEADING),
    mdList(about.principles),
    mdHeading(3, about.quoteTitle),
    about.quoteText,
    mdHeading(2, HOME_CTA.heading),
    HOME_CTA.text,
    mdLink(HOME_CTA.primary, "/contact"),
  ]);
}
