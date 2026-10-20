import { SITE_URL } from "@/lib/site";

// این پروژه روی Cloudflare با @opennextjs/cloudflare اجرا می‌شود، جایی که
// بهینه‌ساز داخلی تصویر Next.js (/_next/image) تصویر اصلی را بدون تبدیل
// برمی‌گرداند (مشکل اندازه‌گیری‌شده‌ی LCP بالا). دو راه تبدیل واقعی وجود دارد:
//   «supabase»   → Supabase Image Transformation (فقط پلن Pro):
//                  .../storage/v1/render/image/public/<bucket>/<path>?width=W&quality=Q
//   «cloudflare» → Cloudflare Image Resizing روی دامنه‌ی سایت (باید در
//                  Cloudflare فعال باشد): https://aiabed.ir/cdn-cgi/image/width=W,quality=Q,format=auto/<src>
// چون در محیط توسعه امکان تست زنده‌ی هیچ‌کدام نبود، انتخاب روش با متغیر محیطی
// NEXT_PUBLIC_IMAGE_TRANSFORM کنترل می‌شود. تا وقتی این متغیر تنظیم نشده،
// آدرس تصویر دست‌نخورده برمی‌گردد (دقیقاً همان رفتار فعلی سایت) — هیچ تصویری
// با این تغییر خراب نمی‌شود؛ وقتی مشخص شد کدام روش در حساب/زون فعال است،
// کافی است همین متغیر محیطی تنظیم شود، بدون نیاز به تغییر کد یا دیپلوی دوباره.
export type ImageTransformMethod = "supabase" | "cloudflare";

const SUPABASE_OBJECT_PATH = "/storage/v1/object/public/";
const SUPABASE_RENDER_PATH = "/storage/v1/render/image/public/";

function getConfiguredMethod(): ImageTransformMethod | null {
  const raw = process.env.NEXT_PUBLIC_IMAGE_TRANSFORM?.trim().toLowerCase();
  if (raw === "supabase" || raw === "cloudflare") return raw;
  return null;
}

// فقط فایل‌های باکت عمومی Supabase Storage را تشخیص می‌دهد (نه هر عکس
// خارجی‌ای مثل unsplash)، صرف‌نظر از نام باکت (media، avatars، hero-images و...).
export function isSupabaseStorageUrl(src: string): boolean {
  try {
    const url = new URL(src, SITE_URL);
    return url.hostname.endsWith(".supabase.co") && url.pathname.includes(SUPABASE_OBJECT_PATH);
  } catch {
    return false;
  }
}

// تصویر برداری است؛ نه سرویس تبدیل Supabase و نه Cloudflare Image Resizing
// چیزی برای بهینه کردنش دارند، پس دست‌نخورده می‌ماند.
function isSvgUrl(src: string): boolean {
  return /\.svg(?:[?#]|$)/i.test(src);
}

export function transformImageUrl(src: string, width: number, quality = 75): string {
  if (!src || !isSupabaseStorageUrl(src) || isSvgUrl(src)) return src;

  const method = getConfiguredMethod();
  if (!method) return src;

  if (method === "supabase") {
    const [withoutHash, hash] = src.split("#");
    const [withoutQuery, query] = withoutHash.split("?");
    const renderUrl = withoutQuery.replace(SUPABASE_OBJECT_PATH, SUPABASE_RENDER_PATH);
    const params = new URLSearchParams(query);
    params.set("width", String(width));
    params.set("quality", String(quality));
    return `${renderUrl}?${params.toString()}${hash ? `#${hash}` : ""}`;
  }

  // cloudflare: /cdn-cgi/image/... روی دامنه‌ی خودِ سایت قرار می‌گیرد، نه دامنه‌ی Supabase.
  return `${SITE_URL}/cdn-cgi/image/width=${width},quality=${quality},format=auto/${src}`;
}

type LoaderParams = { src: string; width: number; quality?: number };

export default function imageLoader({ src, width, quality }: LoaderParams): string {
  return transformImageUrl(src, width, quality ?? 75);
}
