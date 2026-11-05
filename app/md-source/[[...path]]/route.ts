import { markdownForPath } from "@/lib/markdown-pages";
import { SITE_URL } from "@/lib/site";

// نسخه‌ی Markdown صفحه‌ها برای ایجنت‌ها. middleware.ts درخواست‌های «Accept: text/markdown» را به اینجا rewrite می‌کند؛
// درخواست مستقیم به /md-source در خود middleware با ۴۰۴ جواب داده می‌شود.
export const dynamic = "force-dynamic";

const HEADERS = {
  "Content-Type": "text/markdown; charset=utf-8",
  Vary: "Accept",
  // نسخه‌ی Markdown در کش مشترک ذخیره نشود تا هرگز به‌جای HTML به مرورگر داده نشود.
  "Cache-Control": "private, no-store",
};

export async function GET(_req: Request, { params }: { params: { path?: string[] } }) {
  const pathname = "/" + (params.path ?? []).join("/");
  const result = await markdownForPath(pathname);
  if (!result) return new Response("# 404\n\nصفحه پیدا نشد.\n", { status: 404, headers: HEADERS });
  if ("redirect" in result) {
    return new Response(null, { status: 308, headers: { Location: `${SITE_URL}${result.redirect}`, Vary: "Accept" } });
  }
  return new Response(result.markdown, { status: 200, headers: HEADERS });
}
