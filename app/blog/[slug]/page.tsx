import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";
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
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
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
        <img src={post.featured_image} alt={post.title} className="mb-10 w-full rounded-3xl" />
      )}

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
