// سمت مرورگر، قبل از آپلود به Supabase Storage: تصویر را با canvas به WebP
// تبدیل می‌کند (حداکثر عرض ۱۶۰۰px، کیفیت ۰٫۸۲) تا حجم فایل‌های جدید از همان
// ابتدا کوچک ذخیره شوند. SVG (برداری است، تبدیلش معنی ندارد) و GIF (ممکن است
// انیمیشن داشته باشد که WebP ساکن آن را از بین می‌برد) دست‌نخورده می‌مانند؛
// اگر خروجی بزرگ‌تر از ورودی شد یا مرورگر از انکود WebP پشتیبانی نکرد
// (canvas.toBlob در آن صورت طبق مشخصات به‌جایش PNG برمی‌گرداند)، فایل اصلی
// برگردانده می‌شود — این تابع هیچ‌وقت چیزی را خراب یا بزرگ‌تر نمی‌کند.

const MAX_WIDTH = 1600;
const QUALITY = 0.82;
const SKIP_MIME_TYPES = new Set(["image/svg+xml", "image/gif"]);

function withWebpExtension(fileName: string): string {
  const withoutExt = fileName.replace(/\.[^./\\]+$/, "");
  return `${withoutExt || "image"}.webp`;
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/") || SKIP_MIME_TYPES.has(file.type)) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));

    // اگر مرورگر از WebP پشتیبانی نکند، toBlob طبق مشخصات به‌جایش PNG
    // برمی‌گرداند؛ چون پسوند خروجی باید با فرمت واقعی هماهنگ باشد، در این حالت
    // هم فایل اصلی را نگه می‌داریم تا دچار ناهماهنگی پسوند/فرمت نشویم.
    if (!blob || blob.type !== "image/webp") return file;
    if (blob.size >= file.size) return file;

    return new File([blob], withWebpExtension(file.name), {
      type: "image/webp",
      lastModified: Date.now(),
    });
  } catch {
    return file;
  }
}
