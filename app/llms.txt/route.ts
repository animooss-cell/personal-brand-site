import { buildLlmsTxt } from "@/lib/llms";

// جای public/llms.txt قبلی؛ از lib/llms.ts ساخته می‌شود تا جمله‌ی معرفی و لینک‌ها با بقیه‌ی سایت یکی بماند.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
