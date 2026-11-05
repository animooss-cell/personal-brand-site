import { buildLlmsFullTxt } from "@/lib/llms";

// متن کامل صفحه‌ی درباره، خدمات و نمونه‌کارها؛ از همان داده‌ای ساخته می‌شود که صفحه‌ها را می‌سازد.
export const revalidate = 300;

export async function GET() {
  return new Response(await buildLlmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
