import { createClient } from "@/lib/supabase/server";
import { getAboutContent, getSettings } from "@/lib/data";
import type { AboutTimelineItem } from "@/lib/types";
import { ENTITY_STATEMENT_FA, PR_COURSE_NAME, SOCIAL_PROFILES, STARTUP_WEEKEND_CITIES, STARTUP_WEEKEND_ROLE, joinFa } from "@/lib/site";
import { mdHeading, mdJoin, mdLink, mdList } from "@/lib/markdown";
import { toWhatsappHref } from "@/lib/social";

// داده‌ی صفحه‌ی /about (دیتابیس + مقادیر پیش‌فرض). صفحه‌ی HTML، نسخه‌ی Markdown و llms-full.txt همه از همین می‌خوانند.

export const aiExpertise = [
  "مشاور و مدرس دوره‌های آموزشی راه‌اندازی کسب‌وکار با هوش مصنوعی",
  "مشاور تیم هوش مصنوعی شرکت فولاد خوزستان",
  `مدرس دوره‌ی «${PR_COURSE_NAME}» برای شرکت فولاد خوزستان`,
  "آموزش ابزارهای هوش مصنوعی برای فروش و بازاریابی شرکت فولاد خوزستان",
  "مشاور کانتنت مارکتینگ با هوش مصنوعی برای سازمان بسیج رسانه استان خوزستان",
];

const defaultActivities = [
  "مشاوره و توسعه کسب‌وکار و کارها",
  "بنیان‌گذار وبسایت Startuping.ir در حوزه استارتاپ‌ها",
  "مدیر تیم تولید محتوای Inmedia.ir",
  "برگزاری رویدادها و سمینارهای مرتبط با کسب‌وکار و کارهای نوپا",
  "تدریس با تمرکز بر تولید محتوا و بازاریابی",
  'مدیرعامل مرکز مشاوره کارآفرینی "ارزش آفرینان تجارت ایرانیان"',
];

const defaultSpecialties = [
  "مدرک تخصصی PMBOK مدیریت پروژه از موسسه آریانا",
  "مدرک سطح ۱ مدیریت از وزارت صنایع و معادن",
  "مدرک خبرنگاری به سبک رویترز",
];

const defaultCollaborations = [
  "پارک علم و فناوری خوزستان",
  "استانداری خوزستان",
  "اداره تعاون، کار و امور اجتماعی خوزستان",
  "پارک پردیس نهاد ریاست جمهوری",
  "اکوسیستم استارتاپی کشور",
  "دانشگاه شریف مرکز کیش",
  "اداره ICT استان خوزستان",
  "شرکت فولاد خوزستان",
];

const profileUrl = (key: string) => SOCIAL_PROFILES.find((p) => p.key === key)?.url ?? "";

const defaultSocialLinks: Record<string, string> = {
  instagram: profileUrl("instagram"),
  telegram: profileUrl("telegram"),
  whatsapp: "09161002550",
  twitter: "",
};

const defaultPhoneNumbers = ["09161002550", "09163070748"];

const defaultTimeline = [
  { title: "ارگانایزر رویداد ملی فرآفرین", place: "تهران، اهواز، مسجد سلیمان، شوشتر (با جهاد دانشگاهی)" },
  { title: "مدیر اجرایی نمایشگاه بزرگ استارتاپ‌های خوزستان (الکام استارز)", place: "۹۶، ۹۷، ۹۸" },
  { title: "بنیان‌گذار رویداد تجربه‌محور کارآفرینان", place: "از ۹۲ تا کنون (همفکر، دیدار، همراه، حرف نو)" },
  { title: "دبیر اجرایی کمیسیون کسب‌وکارهای نوپا", place: "سازمان نظام صنفی رایانه استان خوزستان" },
  { title: `${STARTUP_WEEKEND_ROLE} استارتاپ ویکند`, place: `۹۳ تا کنون — ${joinFa(STARTUP_WEEKEND_CITIES)}` },
  { title: "برگزارکننده رویداد بین‌المللی Inotexpitch", place: "اهواز، ۹۶" },
  { title: "مجری طرح بزرگ سرمایه‌گذاری رویش", place: "با بنیاد برکت" },
  { title: "مدیر اجرایی رویداد بین‌المللی هاکاهلت", place: "جزیره کیش، ۹۸ (وزارت بهداشت و دانشگاه شریف)" },
  { title: `مدرس دوره‌ی «${PR_COURSE_NAME}»`, place: "شرکت فولاد خوزستان، شهریور ۱۴۰۵" },
];

export type AboutTimelineEntry = { id?: string; title: string; place: string };

export async function getAboutPageData() {
  const supabase = createClient();
  const [a, s, { data: timelineRows }] = await Promise.all([
    getAboutContent(),
    getSettings(),
    supabase.from("about_timeline").select("*").order("position"),
  ]);
  const timeline = (timelineRows ?? []) as AboutTimelineItem[];

  const socialLinks: Record<string, string> = { ...defaultSocialLinks };
  for (const [key, value] of Object.entries(a?.social_links ?? {})) {
    if (value) socialLinks[key] = value;
  }

  return {
    fullName: a?.full_name || s?.full_name || "عبدالله احمدیان",
    roleTitle: a?.role_title || s?.role_title || "مشاور کسب‌وکار | متخصص هوش مصنوعی | کارآفرین",
    avatarImage: a?.avatar_image || s?.avatar_image || "/profile.png",
    shortBio:
      a?.short_bio ||
      "بیش از یک دهه تجربه در راه‌اندازی کسب‌وکار، مشاوره استارتاپ‌ها، و پیاده‌سازی هوش مصنوعی در سازمان‌های بزرگ. از اهواز تا کیش، از استارتاپ‌های نوپا تا شرکت‌های بزرگ صنعتی.",
    fullBio: a?.full_bio || "",
    activities: a?.activities?.length ? a.activities : defaultActivities,
    aiExpertise,
    specialties: a?.specialties?.length ? a.specialties : defaultSpecialties,
    collaborations: a?.collaborations?.length ? a.collaborations : defaultCollaborations,
    timelineItems: (timeline.length ? timeline : defaultTimeline) as AboutTimelineEntry[],
    socialLinks,
    phoneNumbers: a?.phone_numbers?.length ? a.phone_numbers : defaultPhoneNumbers,
  };
}

export type AboutPageData = Awaited<ReturnType<typeof getAboutPageData>>;

export function aboutMarkdown(d: AboutPageData) {
  const l = d.socialLinks;
  const socials = [
    l.instagram && mdLink("اینستاگرام", l.instagram),
    l.telegram && mdLink("تلگرام", l.telegram),
    l.whatsapp && mdLink("واتساپ", toWhatsappHref(l.whatsapp)),
    l.twitter && mdLink("ایکس", l.twitter),
    ...d.phoneNumbers.map((phone) => `تلفن: ${phone}`),
  ].filter((x): x is string => Boolean(x));
  return mdJoin([
    mdHeading(1, d.fullName),
    d.roleTitle,
    ENTITY_STATEMENT_FA,
    d.shortBio,
    d.fullBio,
    mdHeading(2, "فعالیت‌های جاری"),
    mdList(d.activities),
    mdHeading(2, "تخصص هوش مصنوعی"),
    mdList(d.aiExpertise),
    mdHeading(2, "مسیر تجربه"),
    mdList(d.timelineItems.map((t) => `**${t.title}:** ${t.place}`)),
    mdHeading(2, "تخصص‌ها و مدارک"),
    mdList(d.specialties),
    mdHeading(2, "همکاری‌ها"),
    mdList(d.collaborations),
    mdHeading(2, "راه‌های ارتباطی"),
    mdList(socials),
    mdLink("رزرو جلسه رایگان", "/contact"),
  ]);
}
