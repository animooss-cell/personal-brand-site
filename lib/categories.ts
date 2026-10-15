// label: نام فارسی برای نمایش (H1، تایتل، breadcrumb و ...)
// value: مقدار ستون category در جدول posts (همان چیزی که در پنل ادمین ذخیره می‌شود)
// slug: بخش انگلیسی URL مسیر /blog/category/<slug>
export const BLOG_CATEGORIES = [
  { label: "هوش مصنوعی", value: "هوش مصنوعی", slug: "ai" },
  { label: "کسب‌وکار و استارتاپ", value: "کسب‌وکار", slug: "business" },
  { label: "تکنولوژی", value: "تکنولوژی", slug: "technology" },
  { label: "مارکتینگ", value: "مارکتینگ", slug: "marketing" },
  { label: "اخبار AI", value: "اخبار AI", slug: "ai-news" },
];

// دسته‌ی «اخبار AI» از وبلاگ جدا شده و بخش مستقل /news را تشکیل می‌دهد؛ هر
// پستی که category آن برابر همین مقدار باشد یک «خبر» است (نه یک مقاله‌ی
// وبلاگ) — بدون نیاز به ستون جدید در دیتابیس.
export const NEWS_CATEGORY = BLOG_CATEGORIES.find((c) => c.slug === "ai-news")!;

// لیست دسته‌بندی‌هایی که در وبلاگ (هدر، چیپ‌های فیلتر صفحه /blog، فوتر) نمایش
// داده می‌شوند — بدون دسته‌ی اخبار.
export const BLOG_ARTICLE_CATEGORIES = BLOG_CATEGORIES.filter((c) => c.slug !== NEWS_CATEGORY.slug);
