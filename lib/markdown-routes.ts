// فهرست مسیرهایی که نسخه‌ی Markdown دارند. این فایل عمداً هیچ import سنگینی ندارد چون middleware.ts هم از آن می‌خواند.

export const MARKDOWN_PATHS: RegExp[] = [
  /^\/$/,
  /^\/about$/,
  /^\/services\/(?:ai-business-consulting|ai-growth-consulting|ai-training-ahvaz|ai-content-generation|corporate-ai-training)$/,
  /^\/case-studies$/,
  /^\/case-studies\/[^/]+$/,
  /^\/blog\/[^/]+$/,
];

// مسیر داخلی Route Handler (app/md-source)؛ درخواست مستقیم به آن از بیرون ۴۰۴ می‌گیرد.
export const MARKDOWN_SOURCE_PREFIX = "/md-source";

export const normalizePath = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);
export const hasMarkdownVersion = (pathname: string) => MARKDOWN_PATHS.some((re) => re.test(normalizePath(pathname)));

// آیا هدر Accept نوع text/markdown را (با q بزرگ‌تر از صفر) می‌خواهد؟
export function acceptsMarkdown(accept: string | null): boolean {
  if (!accept) return false;
  return accept.split(",").some((part) => {
    const [type, ...params] = part.trim().toLowerCase().split(";");
    if (type.trim() !== "text/markdown") return false;
    const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
    return q ? Number(q.slice(2)) > 0 : true;
  });
}
