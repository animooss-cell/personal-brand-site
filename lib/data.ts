import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { SiteSettings, AboutContent, ServiceCard, Course, Post } from "@/lib/types";

// با React cache() درخواست‌های تکراری به یک جدول در طول یک رندر واحد (مثلاً
// Hero + About + Footer که هرکدام به settings نیاز دارند) فقط یک بار به Supabase ارسال می‌شود.

export const getSettings = cache(async (): Promise<SiteSettings | null> => {
  const supabase = createClient();
  const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
  return data as SiteSettings | null;
});

export const getAboutContent = cache(async (): Promise<AboutContent | null> => {
  const supabase = createClient();
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
