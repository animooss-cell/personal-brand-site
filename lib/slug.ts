// ساخت و بررسی اسلاگ در فرم‌های ادمین (پست، دوره، فایل دانلودی).
// ریشه‌ی آدرس‌های خراب دوره و بلاگ همین بود: یک آدرس کامل (https://aiabed.ir/...) در فیلد slug پیست
// شده بود و slugify فقط «:» و «/» و «.» را حذف کرده بود؛ نتیجه اسلاگی بود که با «https» و نام دامنه شروع می‌شد.

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^؀-ۿa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

// اسلاگی که ادمین دستی وارد کرده؛ آدرس کامل یا مسیر پذیرفته نمی‌شود.
export function slugInputError(value: string): string | null {
  const v = value.trim();
  if (!v) return null;
  if (/^https?/i.test(v) || v.includes("/") || v.includes(":")) {
    return "اسلاگ نباید آدرس کامل باشد (با http شروع شود یا «/» و «:» داشته باشد). فقط بخش آخر آدرس را بنویسید؛ مثلاً smart-office-manager-ahvaz";
  }
  return null;
}

// اسلاگ ذخیره‌شده‌ای که از روی یک آدرس کامل ساخته شده (با https و نام دامنه شروع می‌شود)؛ در sitemap نمی‌آید.
export function isBrokenSlug(slug: string | null | undefined): boolean {
  return !slug || /^https?/i.test(slug) || slug.includes("/") || slug.includes(":");
}
