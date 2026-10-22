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

export const TARGET_KEYWORDS = [
  "هوش مصنوعی در اهواز",
  "تولید محتوا با هوش مصنوعی در اهواز",
  "مدرس هوش مصنوعی در اهواز",
  "مشاور کسب‌وکار با هوش مصنوعی",
  "مشاور توسعه رشد کسب‌وکار با هوش مصنوعی",
];
