import { SITE_URL } from "@/lib/site";

// MetadataRoute.Robots در Next.js دستور سفارشی (Content-Signal) را پشتیبانی نمی‌کند؛ برای همین robots.txt
// به‌صورت متن ساده از این Route Handler برمی‌گردد. قواعد قبلی عیناً حفظ شده‌اند و هیچ رباتی (از جمله ربات‌های
// هوش مصنوعی) مسدود نیست؛ فقط /admin بسته است.
export const dynamic = "force-static";

export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-input=yes, ai-train=yes",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
