import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Instagram, Send, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { AboutContent, Post, SiteSettings } from "@/lib/types";
import BlockRenderer from "@/components/BlockRenderer";

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
    alternates: post.canonical_url ? { canonical: post.canonical_url } : undefined,
    robots: post.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.meta_description || post.excerpt || undefined,
      images: post.og_image ? [post.og_image] : post.featured_image ? [post.featured_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const [post, author] = await Promise.all([getPost(params.slug), getAuthor()]);
  if (!post) notFound();

  const authorSocialItems = [
    { key: "instagram", icon: Instagram, href: author.socialLinks.instagram },
    { key: "telegram", icon: Send, href: author.socialLinks.telegram },
    {
      key: "whatsapp",
      icon: MessageCircle,
      href: author.socialLinks.whatsapp ? toWhatsappHref(author.socialLinks.whatsapp) : "",
    },
  ].filter((item) => item.href);

  return (
    <article dir="rtl" className="mx-auto max-w-3xl px-6 py-16 md:py-24">
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
  );
}
