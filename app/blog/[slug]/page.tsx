import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Instagram, Send, MessageCircle, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AboutContent, Post, SiteSettings } from "@/lib/types";
import BlockRenderer from "@/components/BlockRenderer";
import { SITE_URL } from "@/lib/site";

type RelatedPost = Pick<
  Post,
  "slug" | "title" | "excerpt" | "category" | "featured_image" | "published_at"
>;

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();
  return data as Post | null;
}

async function getRelatedPosts(post: Post): Promise<RelatedPost[]> {
  const supabase = createClient();
  const fields = "slug, title, excerpt, category, featured_image, published_at";

  const sameCategory = post.category
    ? await supabase
        .from("posts")
        .select(fields)
        .eq("status", "published")
        .eq("category", post.category)
        .neq("slug", post.slug)
        .order("published_at", { ascending: false })
        .limit(3)
    : { data: [] };

  const related = (sameCategory.data ?? []) as RelatedPost[];

  if (related.length < 3) {
    const excludeSlugs = [post.slug, ...related.map((p) => p.slug)];
    const { data: fillerPosts } = await supabase
      .from("posts")
      .select(fields)
      .eq("status", "published")
      .not("slug", "in", `(${excludeSlugs.join(",")})`)
      .order("published_at", { ascending: false })
      .limit(3 - related.length);

    related.push(...((fillerPosts ?? []) as RelatedPost[]));
  }

  return related;
}

const defaultAuthorSocialLinks: Record<string, string> = {
  instagram: "https://www.instagram.com/startuping_ir",
  telegram: "https://t.me/Staruping_ir",
  whatsapp: "09161002550",
};

function toWhatsappHref(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `98${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}`;
}

async function getAuthor() {
  const supabase = createClient();
  const [{ data: about }, { data: settings }] = await Promise.all([
    supabase.from("about_content").select("*").eq("id", 1).single(),
    supabase.from("settings").select("*").eq("id", 1).single(),
  ]);

  const a = about as AboutContent | null;
  const s = settings as SiteSettings | null;

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  return {
    title: post.seo_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: post.canonical_url || `/blog/${post.slug}` },
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at || undefined,
      tags: post.tags,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const [post, author] = await Promise.all([getPost(params.slug), getAuthor()]);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post);

  const authorSocialItems = [
    { key: "instagram", icon: Instagram, href: author.socialLinks.instagram },
    { key: "telegram", icon: Send, href: author.socialLinks.telegram },
    {
      key: "whatsapp",
      icon: MessageCircle,
      href: author.socialLinks.whatsapp ? toWhatsappHref(author.socialLinks.whatsapp) : "",
    },
  ].filter((item) => item.href);

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.meta_description || post.excerpt || undefined,
    image: post.featured_image ? [post.featured_image] : undefined,
    datePublished: post.published_at || undefined,
    dateModified: post.updated_at || post.published_at || undefined,
    author: {
      "@type": "Person",
      name: author.name,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
  };

  return (
    <div dir="rtl">
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <div className="mb-8 text-center">
        {post.category && (
          <span className="mb-4 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            {post.category}
          </span>
        )}
        <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{post.title}</h1>
        {post.published_at && (
          <time className="mt-4 block text-sm text-slate-400">
            {new Date(post.published_at).toLocaleDateString("fa-IR")}
          </time>
        )}
      </div>

      {post.featured_image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.featured_image} alt={post.title} className="mb-8 w-full rounded-3xl" />
      )}

      <div className="mb-10 flex items-center gap-3 border-b border-gray-100 pb-6 text-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={author.avatar} alt={author.name} className="h-9 w-9 rounded-full object-cover" />
        <span className="font-medium text-slate-700">{author.name}</span>
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
                  className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-brand-600 transition-colors duration-200 hover:bg-brand-50"
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}
      </div>

      <BlockRenderer blocks={post.content} />

      {post.tags?.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>

    {relatedPosts.length > 0 && (
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          مطالب پیشنهادی
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {relatedPosts.map((related) => (
            <Link
              key={related.slug}
              href={`/blog/${related.slug}`}
              className="flex flex-col rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {related.featured_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={related.featured_image}
                  alt={related.title}
                  loading="lazy"
                  decoding="async"
                  className="mb-4 h-36 w-full rounded-2xl object-cover"
                />
              )}
              {related.category && (
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {related.category}
                </span>
              )}
              <h3 className="mb-2 text-base font-bold leading-7 text-slate-900">{related.title}</h3>
              <p className="mb-4 line-clamp-2 text-sm leading-6 text-slate-600">{related.excerpt}</p>
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
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand px-6 py-16 text-center md:py-20">
        <h2 className="text-2xl font-bold text-white md:text-3xl">
          آماده‌ای کسب‌وکارت را متحول کنی؟
        </h2>
        <p className="mt-4 text-base text-white/90 md:text-lg">
          یه جلسه رایگان با من داشته باش — بدون تعهد
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-sm transition-colors duration-200 hover:bg-brand-50"
        >
          جلسه رایگان رزرو کن
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
    </div>
  );
}
