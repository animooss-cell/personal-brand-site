export const SITE_URL = process.env.SITE_URL || "https://aiabed.ir";

// canonical ذخیره‌شده‌ی یک پست در دیتابیس گاهی توسط ادمین ناقص/اشتباه پر
// می‌شود: نسبی (بدون دامنه)، بدون مسیر /blog/، یا روی دامنه‌ی دیگری. در هر
// سه حالت نادیده گرفته می‌شود و canonical واقعی از روی slug ساخته می‌شود؛
// new URL(stored) بدون base عمداً استفاده شده تا یک مقدار نسبی همین‌جا throw
// کند (طبق تعریف، نسبی = نامعتبر، نه قابل resolve).
export function resolveBlogCanonical(stored: string | null | undefined, slug: string): string {
  const fallback = `${SITE_URL}/blog/${slug}`;
  const trimmed = stored?.trim();
  if (!trimmed) return fallback;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return fallback;
  }

  const siteHost = new URL(SITE_URL).hostname.toLowerCase();
  const host = url.hostname.toLowerCase();
  if (host !== siteHost && host !== `www.${siteHost}`) return fallback;
  if (!url.pathname.startsWith("/blog/")) return fallback;

  return trimmed;
}

export const SITE_NAME = "عبدالله احمدیان | مشاور هوش مصنوعی اهواز";

// جمله‌ی معرفی یکسان (Entity Statement). llms.txt، description اسکیمای Person، فوتر و صفحه‌ی درباره
// همه از همین دو ثابت می‌خوانند تا متن همه‌جا عیناً یکی باشد.
export const ENTITY_STATEMENT_FA =
  "عبدالله احمدیان، مدرس و مشاور هوش مصنوعی سازمانی در اهواز؛ مدرس دوره‌های هوش مصنوعی کارکنان فولاد خوزستان.";
export const ENTITY_STATEMENT_EN =
  "Abdollah Ahmadian — corporate AI trainer and consultant based in Ahvaz, Iran; AI instructor for Khuzestan Steel (Foolad Khuzestan) staff.";

// پاراگرافی که به‌تنهایی به «این شخص کیست و چه کرده؟» جواب می‌دهد؛ با همان جمله‌ی معرفی شروع می‌شود و فقط
// سوابقی را می‌آورد که صاحب سایت اعلام کرده است. در صفحه‌های خدمات و نمونه‌کار استفاده می‌شود.
export const ENTITY_BIO_FA = `${ENTITY_STATEMENT_FA} او دوره‌های هوش مصنوعی را برای کارکنان و تیم روابط عمومی فولاد خوزستان و کارکنان فولاد اکسین خوزستان برگزار کرده، مدیر تیم اجرایی هکاتون سلامت کیش بوده و در استارتاپ ویکندهای خوزستان، تهران و کرمانشاه منتور و داور بوده است.`;
export const ENTITY_BIO_HEADING = "درباره‌ی عبدالله احمدیان";

export const PERSON_NAME_FA = "عبدالله احمدیان";
export const PERSON_ALTERNATE_NAMES = ["Abdollah Ahmadian", "Abed Ahmadian"];

// شناسه‌ی یکتای این شخص در همه‌ی JSON-LDها؛ هر جا به او اشاره می‌شود فقط همین @id می‌آید.
export const PERSON_ID = `${SITE_URL}/#person`;
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// پروفایل‌های رسمی (sameAs). برای افزودن پروفایل تازه (مثلاً لینکدین) فقط یک آیتم به این آرایه اضافه کنید؛
// اسکیمای Person، llms.txt و (برای آیتم‌هایی که inFooter دارند) فوتر خودکار به‌روز می‌شوند.
export type SocialProfile = {
  key: string;
  label: string;
  labelEn: string;
  url: string;
  inFooter: boolean;
};

export const SOCIAL_PROFILES: SocialProfile[] = [
  { key: "instagram", label: "اینستاگرام", labelEn: "Instagram", url: "https://www.instagram.com/aiabed.ir", inFooter: true },
  { key: "telegram-channel", label: "کانال تلگرام", labelEn: "Telegram channel", url: "https://t.me/aiabed_ir", inFooter: true },
  { key: "telegram", label: "تلگرام (پیام مستقیم)", labelEn: "Telegram (direct message)", url: "https://t.me/abedahm", inFooter: false },
];

export const SAME_AS = SOCIAL_PROFILES.map((p) => p.url);

export const TARGET_KEYWORDS = [
  "هوش مصنوعی در اهواز",
  "تولید محتوا با هوش مصنوعی در اهواز",
  "مدرس هوش مصنوعی در اهواز",
  "مشاور کسب‌وکار با هوش مصنوعی",
  "مشاور توسعه رشد کسب‌وکار با هوش مصنوعی",
];
