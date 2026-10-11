import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// ریدایرکت دائمی پارامترهای قدیمی ?page= روی مسیرهای صفحه‌بندی‌شده‌ی جدید
// (/blog/page/N و /blog/category/X/page/N)، بدون تماس با Supabase.
function redirectLegacyPageParam(request: NextRequest): NextResponse | null {
  const { pathname, searchParams } = request.nextUrl;
  const isBlogIndex = pathname === "/blog";
  const isCategoryIndex = /^\/blog\/category\/[^/]+$/.test(pathname);

  if (!isBlogIndex && !isCategoryIndex) return null;

  const pageParam = searchParams.get("page");
  if (pageParam === null) return null;

  const pageNumber = Number(pageParam);
  const url = request.nextUrl.clone();
  url.searchParams.delete("page");

  if (Number.isInteger(pageNumber) && pageNumber > 1) {
    url.pathname = `${pathname.replace(/\/$/, "")}/page/${pageNumber}`;
  }

  return NextResponse.redirect(url, 301);
}

export async function middleware(request: NextRequest) {
  const legacyRedirect = redirectLegacyPageParam(request);
  if (legacyRedirect) return legacyRedirect;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blog", "/blog/category/:path*"],
};
