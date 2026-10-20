import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Send, MessageCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getPostBySlug, getAboutContent, getSettings } from "@/lib/data";
import { Post } from "@/lib/types";
import { SITE_URL } from "@/lib/site";
import { toWhatsappHref } from "@/lib/social";
import { NEWS_CATEGORY } from "@/lib/categories";
import {
  normalizeContentLinks,
  serializeJsonLd,
  wrapFaqAccordion,
  optimizeContentImages,
} from "@/lib/post-content";

export const revalidate = 300;

type RelatedNews = Pick<Post, "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at">;

const RELATED_NEWS_LIMIT = 6;

async function getRelatedNews(post: Post): Promise<RelatedNews[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("slug, title, excerpt, category, featured_image, published_at")
    .eq("status", "published")
    .eq("category", NEWS_CATEGORY.value)
    .neq("slug", post.slug)
    .order("published_at", { ascending: false })
    .limit(RELATED_NEWS_LIMIT);

  return (data ?? []) as RelatedNews[];
}

const defaultAuthorSocialLinks: Record<string, string> = {
  instagram: "https://www.instagram.com/startuping_ir",
  telegram: "https://t.me/Staruping_ir",
  whatsapp: "09161002550",
};

async function getAuthor() {
  const [a, s] = await Promise.all([getAboutContent(), getSettings()]);

  const socialLinks: Record<string, string> = { ...defaultAuthorSocialLinks };
  for (const [key, value] of Object.entries(a?.social_links ?? {})) {
    if (value) socialLinks[key] = value;
  }

  return {
    name: a?.full_name || s?.full_name || "عبدالله احمدیان",
    avatar: a?.avatar_image || s?.avatar_image || "/profile.png",
    socialLinks,
  };
}

async function getNewsItem(slug: string) {
  const post = await getPostBySlug(slug);
  if (!post || post.category !== NEWS_CATEGORY.value) return null;
  return post;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getNewsItem(params.slug);
  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: post.canonical_url || `/news/${post.slug}` },
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      url: `/news/${post.slug}`,
      publishedTime: post.published_at || undefined,
      tags: post.tags,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function NewsItemPage({ params }: { params: { slug: string } }) {
  const [post, author] = await Promise.all([getNewsItem(params.slug), getAuthor()]);
  if (!post) notFound();

  const relatedNews = await getRelatedNews(post);
  const normalizedContent = wrapFaqAccordion(optimizeContentImages(normalizeContentLinks(post.content)));

  const authorSocialItems = [
    { key: "instagram", icon: Instagram, href: author.socialLinks.instagram },
    { key: "telegram", icon: Send, href: author.socialLinks.telegram },
    {
      key: "whatsapp",
      icon: MessageCircle,
      href: author.socialLinks.whatsapp ? toWhatsappHref(author.socialLinks.whatsapp) : "",
    },
  ].filter((item) => item.href);

  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "عبدالله احمدیان",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: `${SITE_URL}/news/${post.slug}`,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
  };

  return (
    <div dir="rtl">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(newsJsonLd) }}
        />
        <div className="mb-8 text-center">
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
            اخبار هوش مصنوعی
          </span>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{post.title}</h1>
          {post.published_at && (
            <time className="mt-4 block text-sm text-slate-400 dark:text-slate-500">
              {new Date(post.published_at).toLocaleDateString("fa-IR")}
            </time>
          )}
        </div>

        {post.featured_image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-3xl">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mb-10 flex items-center gap-3 border-b border-gray-100 pb-6 text-sm dark:border-slate-800">
          <Image
            src={author.avatar}
            alt={author.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-medium text-slate-700 dark:text-slate-300">{author.name}</span>
          {authorSocialItems.length > 0 && (
            <div className="mr-auto flex items-center gap-2">
              {authorSocialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-brand-600 transition-colors duration-200 hover:bg-brand-50 dark:hover:bg-brand-900/30"
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div className="prose-content" dir="rtl" dangerouslySetInnerHTML={{ __html: normalizedContent }} />

        {post.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6 dark:border-slate-800">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      {relatedNews.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            اخبار مرتبط
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {relatedNews.map((related) => (
              <Link
                key={related.slug}
                href={`/news/${related.slug}`}
                className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                {related.featured_image && (
                  <div className="relative mb-4 h-36 w-full overflow-hidden rounded-2xl">
                    <Image
                      src={related.featured_image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-2 text-base font-bold leading-7 text-slate-900 dark:text-white">{related.title}</h3>
                <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{related.excerpt}</p>
                {related.published_at && (
                  <time className="mt-auto text-xs text-slate-400">
                    {new Date(related.published_at).toLocaleDateString("fa-IR")}
                  </time>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            آماده‌ای کسب‌وکارت را متحول کنی؟
          </h2>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            یه جلسه رایگان با من داشته باش — بدون تعهد
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
          >
            جلسه رایگان رزرو کن
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
