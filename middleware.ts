import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { BLOG_CATEGORIES } from "@/lib/categories";

const CATEGORY_VALUE_TO_SLUG = new Map(BLOG_CATEGORIES.map((c) => [c.value, c.slug]));

// لینک‌های خراب قدیمی دوره‌ها (از یک دوره‌ی قبلی import/سئو) که مستقیماً به مسیر درست ریدایرکت می‌شوند.
const LEGACY_COURSE_REDIRECTS: Record<string, string> = {
  "/services/courses/httpsaiabedirsmart-office-manager-ahvaz": "/services/courses/smart-office-manager-ahvaz",
  "/services/courses/servicescoursessmart-office-manager-ahvaz": "/services/courses/smart-office-manager-ahvaz",
};

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
      targetPathname = `/blog/category/${slug}${rest}`;
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
  const legacyCourseTarget = LEGACY_COURSE_REDIRECTS[request.nextUrl.pathname];
  if (legacyCourseTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyCourseTarget;
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
  matcher: ["/admin/:path*", "/blog", "/blog/category/:path*", "/services/courses/:path*"],
};
