import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { getVideoBySlug } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { platformLabel } from "@/lib/videoTypes";
import { getEmbedUrl, toIso8601Duration } from "@/lib/videoEmbed";
import VideoEmbed from "@/components/VideoEmbed";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const video = await getVideoBySlug(params.slug);
  if (!video) return {};

  return {
    title: video.seo_title || video.title,
    description: video.meta_description || undefined,
    alternates: { canonical: `/videos/${video.slug}` },
    openGraph: {
      type: "video.other",
      title: video.seo_title || video.title,
      description: video.meta_description || undefined,
      url: `/videos/${video.slug}`,
      images: video.thumbnail ? [video.thumbnail] : undefined,
    },
  };
}

export default async function VideoDetailPage({ params }: { params: { slug: string } }) {
  const video = await getVideoBySlug(params.slug);
  if (!video) notFound();

  const embedUrl = getEmbedUrl(video.video_url, video.video_platform);
  const isoDuration = toIso8601Duration(video.duration);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.title,
    description: video.meta_description || undefined,
    thumbnailUrl: video.thumbnail || undefined,
    uploadDate: video.created_at || undefined,
    embedUrl: embedUrl || undefined,
    duration: isoDuration,
    url: `${SITE_URL}/videos/${video.slug}`,
  };

  return (
    <div dir="rtl">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <VideoEmbed
          videoUrl={video.video_url}
          platform={video.video_platform}
          embedCode={video.embed_code}
          title={video.title}
        />

        <div className="mb-8 mt-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
              {platformLabel(video.video_platform)}
            </span>
            {video.category && (
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {video.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{video.title}</h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400 dark:text-slate-500">
            {video.created_at && (
              <time>{new Date(video.created_at).toLocaleDateString("fa-IR")}</time>
            )}
            {video.duration && (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {video.duration}
              </span>
            )}
          </div>
        </div>

        {video.description && (
          <div className="prose-content" dir="rtl" dangerouslySetInnerHTML={{ __html: video.description }} />
        )}

        {video.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6 dark:border-slate-800">
            {video.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            دنبال مشاوره برای پیاده‌سازی این موضوع در کسب‌وکارتان هستید؟
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
