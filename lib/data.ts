import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createStaticClient } from "@/lib/supabase/static";
import { SiteSettings, AboutContent, ServiceCard, Course, Post, Download } from "@/lib/types";

export const BLOG_PAGE_SIZE = 12;

export type PostListItem = Pick<
  Post,
  "id" | "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at"
>;

const POST_LIST_FIELDS = "id, slug, title, excerpt, category, featured_image, published_at";

export async function getPaginatedPosts({
  page,
  pageSize = BLOG_PAGE_SIZE,
  category,
}: {
  page: number;
  pageSize?: number;
  category?: string;
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

  const { data, count } = await query.order("published_at", { ascending: false }).range(from, to);

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return { posts: (data ?? []) as PostListItem[], total, totalPages };
}

// برای generateStaticParams (خارج از request scope) — فقط شمارش، بدون نیاز به کوکی.
export async function getPublishedPostsCount(category?: string): Promise<number> {
  const supabase = createStaticClient();
  let query = supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published");

  if (category) {
    query = query.eq("category", category);
  }

  const { count } = await query;
  return count ?? 0;
}

export async function getLatestPosts(limit: number): Promise<PostListItem[]> {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("posts")
    .select(POST_LIST_FIELDS)
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as PostListItem[];
}

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
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
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
