import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { SiteSettings, AboutContent, ServiceCard, Course, Post, Download } from "@/lib/types";
import { BLOG_ARTICLE_CATEGORIES, NEWS_CATEGORY } from "@/lib/categories";

export const BLOG_PAGE_SIZE = 12;

// Supabase/شبکه گاه‌به‌گاه یک درخواست را با خطا (قطعی لحظه‌ای، تایم‌اوت و…)
// رد می‌کند؛ همین یک بار شکست کافی است تا رندر صفحه با یک exception
// نگرفته شود و کاربر/کراولر یک 500 ببیند. یک retry کوتاه اکثر این موارد
// گاه‌به‌گاه را برطرف می‌کند؛ خطای واقعی و پایدار (مثلاً قطعی دیتابیس) بعد از
// retry هم باقی می‌ماند و بالا پرتاب می‌شود — این حالت باید همچنان ۵۰۰ بدهد،
// نه notFound()، چون معنی‌اش «داده نیست» نیست، «الان نمی‌شود خواند» است.
// PromiseLike (نه Promise) چون کوئری‌بیلدر Supabase قبل از await کردن یک
// thenable است، نه یک Promise واقعی.
export async function withRetry<T>(fn: () => PromiseLike<T>, attempts = 2, delayMs = 300): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < attempts) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
}

export type PostListItem = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at"
>;

const POST_LIST_FIELDS = "id, slug, title, excerpt, category, featured_image, published_at";

export async function getPaginatedPosts({
  page,
  pageSize = BLOG_PAGE_SIZE,
  category,
  excludeCategory,
}: {
  page: number;
  pageSize?: number;
  category?: string;
  excludeCategory?: string;
}): Promise<{ posts: PostListItem[]; total: number; totalPages: number }> {
  // کوئری فقط خواندنی عمومی (بدون نیاز به کوکی احراز هویت)؛ با کلاینت استاتیک
  // اجرا می‌شود تا صفحات /blog/page/N و /blog/category/X/page/N واقعاً استاتیک
  // (پیش‌رندرشده) بمانند، نه مجبور به رندر دینامیک به‌خاطر فراخوانی cookies().
  const supabase = createStaticClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("posts")
    .select(POST_LIST_FIELDS, { count: "exact" })
    .eq("status", "published");

  if (category) {
    query = query.eq("category", category);
  }
  if (excludeCategory) {
    query = query.neq("category", excludeCategory);
  }

  // اگر بعد از retry هم خطا بماند، عمداً throw می‌کنیم (قورت نمی‌دهیم) تا
  // صفحه به‌جای ساختن یک totalPages ساختگی (و در نتیجه notFound() اشتباه)،
  // واقعاً خطا بدهد — این خطا باید نادر باشد، نه «گاه‌به‌گاه».
  const { data, count, error } = await withRetry(() =>
    query.order("published_at", { ascending: false }).range(from, to)
  );
  if (error) throw error;

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return { posts: (data ?? []) as PostListItem[], total, totalPages };
}

// برای generateStaticParams (خارج از request scope) — فقط شمارش، بدون نیاز به کوکی.
export async function getPublishedPostsCount(category?: string, excludeCategory?: string): Promise<number> {
  const supabase = createStaticClient();
  let query = supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published");

  if (category) {
    query = query.eq("category", category);
  }
  if (excludeCategory) {
    query = query.neq("category", excludeCategory);
  }

  const { count } = await query;
  return count ?? 0;
}

export async function getLatestPosts(limit: number, excludeCategory?: string): Promise<PostListItem[]> {
  const supabase = createStaticClient();
  let query = supabase
    .from("posts")
    .select(POST_LIST_FIELDS)
    .eq("status", "published");

  if (excludeCategory) {
    query = query.neq("category", excludeCategory);
  }

  const { data } = await query.order("published_at", { ascending: false }).limit(limit);
  return (data ?? []) as PostListItem[];
}

// برای بنر «آخرین ماهنامه هوش مصنوعی» در صفحه‌ی اصلی — یک ویجت غیرحیاتی،
// پس اگر بعد از retry هم خطا بدهد throw نمی‌کند؛ لیست خالی برمی‌گرداند تا
// صفحه‌ی اصلی ۵۰۰ نشود (فراخوان با لیست خالی چیزی رندر نمی‌کند).
export async function getLatestNews(limit: number): Promise<PostListItem[]> {
  const supabase = createStaticClient();

  try {
    const { data, error } = await withRetry(() =>
      supabase
        .from("posts")
        .select(POST_LIST_FIELDS)
        .eq("status", "published")
        .eq("category", NEWS_CATEGORY.value)
        .order("published_at", { ascending: false })
        .limit(limit)
    );
    if (error) throw error;
    return (data ?? []) as PostListItem[];
  } catch (err) {
    console.error("getLatestNews failed after retry", err);
    return [];
  }
}

export type BlogCategoryWithCount = { label: string; slug: string; value: string };

// لیست دسته‌بندی‌های وبلاگ (بدون اخبار) که واقعاً حداقل یک پست منتشرشده دارند —
// برای زیرمنوی هدر؛ به‌جای هاردکد کل BLOG_ARTICLE_CATEGORIES، مستقیم از
// دیتابیس خوانده می‌شود تا دسته‌ی بدون پست در منو دیده نشود.
export const getActiveBlogCategories = cache(async (): Promise<BlogCategoryWithCount[]> => {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("posts")
    .select("category")
    .eq("status", "published")
    .not("category", "is", null)
    .neq("category", NEWS_CATEGORY.value);

  const activeValues = new Set((data ?? []).map((row) => row.category as string));

  return BLOG_ARTICLE_CATEGORIES.filter((c) => activeValues.has(c.value));
});

// با React cache() درخواست‌های تکراری به یک جدول در طول یک رندر واحد (مثلاً
// Hero + About + Footer که هرکدام به settings نیاز دارند) فقط یک بار به Supabase ارسال می‌شود.

// این دو تابع در Footer (که در ریشه‌ی layout و در نتیجه در همه‌ی صفحات از جمله
// صفحات صفحه‌بندی‌شده‌ی وبلاگ رندر می‌شود) استفاده می‌شوند؛ چون خواندن این دو
// جدول عمومی است (RLS: public read)، از کلاینت استاتیک (بدون cookies) استفاده
// می‌کنیم تا صفحاتی که generateStaticParams دارند واقعاً استاتیک بمانند.
export const getSettings = cache(async (): Promise<SiteSettings | null> => {
  const supabase = createStaticClient();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data as SiteSettings | null;
});

export const getAboutContent = cache(async (): Promise<AboutContent | null> => {
  const supabase = createStaticClient();
  const { data } = await supabase.from("about_content").select("*").eq("id", 1).single();
  return data as AboutContent | null;
});

export const getServices = cache(async (): Promise<ServiceCard[]> => {
  const supabase = createClient();
  const { data } = await supabase.from("services").select("*").order("position");
  return (data ?? []) as ServiceCard[];
});

export const getPublishedCourses = cache(async (): Promise<Course[]> => {
  const supabase = createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "published")
    .order("position");
  return (data ?? []) as Course[];
});

export const getCourseBySlug = cache(async (slug: string): Promise<Course | null> => {
  const supabase = createClient();
  const { data } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Course | null;
});

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  // کوئری فقط خواندنی عمومی؛ با کلاینت استاتیک (بدون cookies()) تا صفحه‌ی
  // /blog/[slug] مجبور به رندر کاملاً دینامیک نشود و export const revalidate
  // واقعاً کار کند (یعنی هر درخواست مستقیم به Supabase نرود، فقط هر بار که
  // کش ۳۰۰ ثانیه‌ای منقضی می‌شود).
  const supabase = createStaticClient();
  const { data, error } = await withRetry(() =>
    supabase.from("posts").select("*").eq("slug", slug).eq("status", "published").single()
  );

  if (error) {
    // PGRST116 یعنی .single() دقیقاً صفر ردیف پیدا کرده — پست واقعاً وجود
    // ندارد، پس notFound() درست است. هر خطای دیگر (شبکه، دیتابیس) یعنی
    // «الان نمی‌دانیم»، نه «نیست»؛ باید throw شود تا صفحه notFound() ندهد.
    if (error.code === "PGRST116") return null;
    throw error;
  }

  return data as Post | null;
});

export const getPublishedDownloads = cache(async (): Promise<Download[]> => {
  const supabase = createClient();
  const { data } = await supabase
    .from("downloads")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  return (data ?? []) as Download[];
});

export const getDownloadBySlug = cache(async (slug: string): Promise<Download | null> => {
  const supabase = createClient();
  const { data } = await supabase
    .from("downloads")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data as Download | null;
});
