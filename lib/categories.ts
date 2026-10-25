// label: نام فارسی برای نمایش (H1، تایتل، breadcrumb و ...)
// value: مقدار ستون category در جدول posts (همان چیزی که در پنل ادمین ذخیره می‌شود)
// slug: بخش انگلیسی URL مسیر /blog/category/<slug>
// landing (اختیاری): صفحه‌ی دسته‌بندیِ اختصاصی با title/description/H1 و متن معرفی
// خودش، BreadcrumbList، پیام حالت خالی و noindex تا وقتی پستی منتشر نشده.
// دسته‌های بدون landing دقیقاً با قالب عمومی قبلی رندر می‌شوند.
export type BlogCategoryIntroPart = string | { label: string; href: string };

export type BlogCategory = {
  label: string;
  value: string;
  slug: string;
  landing?: {
    title: string;
    description: string;
    heading: string;
    intro: BlogCategoryIntroPart[];
    emptyMessage: string;
  };
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  { label: "هوش مصنوعی", value: "هوش مصنوعی", slug: "ai" },
  { label: "کسب‌وکار و استارتاپ", value: "کسب‌وکار", slug: "business" },
  { label: "تکنولوژی", value: "تکنولوژی", slug: "technology" },
  { label: "مارکتینگ", value: "مارکتینگ", slug: "marketing" },
  {
    label: "آموزش ابزارهای هوش مصنوعی",
    value: "آموزش ابزارهای هوش مصنوعی",
    slug: "ai-tools-tutorials",
    landing: {
      // قالب title در app/layout.tsx خودش « | عبدالله احمدیان» را اضافه می‌کند.
      title: "آموزش ابزارهای هوش مصنوعی برای کار",
      description:
        "آموزش کاربردی ابزارهای هوش مصنوعی مثل ChatGPT، Claude، NotebookLM و Gamma برای کارهای واقعی اداری و کسب‌وکار، به زبان ساده و فارسی.",
      heading: "آموزش ابزارهای هوش مصنوعی",
      intro: [
        "هر آموزش این بخش با یک کار واقعی شروع می‌شود: یک گزارش، یک ارائه، یک نامه یا یک پوستر. قدم‌به‌قدم نشان می‌دهم با کدام ابزار و چه درخواستی انجامش بدهید. اگر خواستید همین مسیر را با تیمتان و روی کارهای خودتان طی کنید، ",
        { label: "دوره‌های آموزشی", href: "/services/ai-training-ahvaz" },
        " را ببینید.",
      ],
      emptyMessage: "به‌زودی اولین آموزش‌ها منتشر می‌شود.",
    },
  },
  { label: "اخبار AI", value: "اخبار AI", slug: "ai-news" },
];

// دسته‌ی «اخبار AI» از وبلاگ جدا شده و بخش مستقل /news را تشکیل می‌دهد؛ هر
// پستی که category آن برابر همین مقدار باشد یک «خبر» است (نه یک مقاله‌ی
// وبلاگ) — بدون نیاز به ستون جدید در دیتابیس.
export const NEWS_CATEGORY = BLOG_CATEGORIES.find((c) => c.slug === "ai-news")!;

// لیست دسته‌بندی‌هایی که در وبلاگ (هدر، چیپ‌های فیلتر صفحه /blog، فوتر) نمایش
// داده می‌شوند — بدون دسته‌ی اخبار.
export const BLOG_ARTICLE_CATEGORIES = BLOG_CATEGORIES.filter((c) => c.slug !== NEWS_CATEGORY.slug);
