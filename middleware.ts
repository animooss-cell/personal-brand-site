import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { BLOG_CATEGORIES, NEWS_CATEGORY } from "@/lib/categories";

const CATEGORY_VALUE_TO_SLUG = new Map(BLOG_CATEGORIES.map((c) => [c.value, c.slug]));

// اسلاگ دوره یا مقاله‌ای که از پیست یک آدرس کامل (https://aiabed.ir/…) یا مسیر (/services/courses/…) در
// فیلد slug ساخته شده بود: پیشوند خراب حذف و در یک قدم با ۳۰۱ به اسلاگ درست هدایت می‌شود.
// ریشه‌ی مشکل در lib/slug.ts بسته شده است. برای بلاگ فقط وقتی که پیشوند دامنه هست، تا اسلاگ سالمی که با
// «blog» شروع می‌شود دست نخورد.
const BROKEN_SLUG_RULES: { section: string; prefix: RegExp }[] = [
  { section: "/services/courses/", prefix: /^(?:https?(?:www)?aiabedir)?(?:servicescourses)?/ },
  { section: "/blog/", prefix: /^https?(?:www)?aiabedir(?:blog)?/ },
];

function brokenSlugTarget(pathname: string): string | null {
  for (const { section, prefix } of BROKEN_SLUG_RULES) {
    if (!pathname.startsWith(section)) continue;
    const match = pathname.slice(section.length).match(/^([^/]+)\/?$/);
    if (!match) return null;
    const fixed = match[1].replace(prefix, "");
    if (!fixed || fixed === match[1]) return null;
    return `${section}${fixed}`;
  }
  return null;
}

// ریدایرکت دائمی ۳۰۱ برای دو حالت قدیمی، بدون تماس با Supabase:
// ۱) /blog/category/<نام فارسی قبلی>[/page/N] → /blog/category/<اسلاگ انگلیسی>[/page/N]
// ۲) ?page=N روی /blog یا /blog/category/<...> → مسیر صفحه‌بندی‌شده‌ی جدید (/page/N)
// هر دو در یک redirect ترکیب می‌شوند تا لینک‌های قدیمی با هر دو مشکل یک‌جا درست شوند.
function redirectLegacyBlogUrl(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;
  let targetPathname = pathname;
  let changed = false;

  const categoryMatch = pathname.match(/^\/blog\/category\/([^/]+)((?:\/page\/\d+)?)\/?$/);
  if (categoryMatch) {
    const [, rawSegment, rest] = categoryMatch;
    let decoded = rawSegment;
    try {
      decoded = decodeURIComponent(rawSegment);
    } catch {
      // از قبل دیکد شده یا نامعتبر است؛ همان را نگه می‌داریم
    }
    const slug = CATEGORY_VALUE_TO_SLUG.get(decoded);
    if (slug) {
      // اخبار دیگر یک دسته‌بندی وبلاگ نیست؛ هر مسیر /blog/category/ai-news
      // (با هر نام قدیمی/جدید و هر /page/N) مستقیم به /news هدایت می‌شود.
      targetPathname = slug === NEWS_CATEGORY.slug ? "/news" : `/blog/category/${slug}${rest}`;
      changed = true;
    }
  }

  const isBlogIndex = targetPathname === "/blog";
  const isCategoryIndex = /^\/blog\/category\/[^/]+$/.test(targetPathname);
  const pageParam = searchParams.get("page");

  if (pageParam !== null && (isBlogIndex || isCategoryIndex)) {
    changed = true;
    const pageNumber = Number(pageParam);
    if (Number.isInteger(pageNumber) && pageNumber > 1) {
      targetPathname = `${targetPathname.replace(/\/$/, "")}/page/${pageNumber}`;
    }
  }

  if (!changed) return null;

  const url = request.nextUrl.clone();
  url.pathname = targetPathname;
  url.searchParams.delete("page");

  return NextResponse.redirect(url, 301);
}

export async function middleware(request: NextRequest) {
  const brokenSlugRedirect = brokenSlugTarget(request.nextUrl.pathname);
  if (brokenSlugRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = brokenSlugRedirect;
    return NextResponse.redirect(url, 301);
  }

  const legacyRedirect = redirectLegacyBlogUrl(request);
  if (legacyRedirect) return legacyRedirect;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blog", "/blog/:path*", "/services/courses/:path*"],
};
