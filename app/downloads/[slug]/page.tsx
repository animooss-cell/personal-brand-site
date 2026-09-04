import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download as DownloadIcon, ArrowLeft, FileText } from "lucide-react";
import { getDownloadBySlug } from "@/lib/data";
import { SITE_URL } from "@/lib/site";
import { resourceTypeLabel, resourceSchemaType, formatFileSize } from "@/lib/downloadTypes";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getDownloadBySlug(params.slug);
  if (!item) return {};

  return {
    title: item.seo_title || item.title,
    description: item.meta_description || item.excerpt || undefined,
    alternates: { canonical: `/downloads/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.seo_title || item.title,
      description: item.meta_description || item.excerpt || undefined,
      url: `/downloads/${item.slug}`,
      images: item.featured_image ? [item.featured_image] : undefined,
    },
  };
}

export default async function DownloadDetailPage({ params }: { params: { slug: string } }) {
  const item = await getDownloadBySlug(params.slug);
  if (!item) notFound();

  const fileSize = formatFileSize(item.file_size);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": resourceSchemaType(item.resource_type),
    name: item.title,
    description: item.meta_description || item.excerpt || undefined,
    image: item.featured_image || undefined,
    url: `${SITE_URL}/downloads/${item.slug}`,
    contentUrl: item.file_url || undefined,
    dateCreated: item.created_at || undefined,
    dateModified: item.updated_at || item.created_at || undefined,
    keywords: item.tags?.length ? item.tags.join(", ") : undefined,
    author: {
      "@type": "Person",
      name: "عبدالله احمدیان",
    },
  };

  return (
    <div dir="rtl">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="mb-8 text-center">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
              <DownloadIcon className="h-3 w-3" aria-hidden="true" />
              {resourceTypeLabel(item.resource_type)}
            </span>
            {item.category && (
              <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                {item.category}
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">{item.title}</h1>
          {item.created_at && (
            <time className="mt-4 block text-sm text-slate-400 dark:text-slate-500">
              {new Date(item.created_at).toLocaleDateString("fa-IR")}
            </time>
          )}
        </div>

        {item.featured_image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-3xl">
            <Image
              src={item.featured_image}
              alt={item.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {item.content && (
          <div className="prose-content" dir="rtl" dangerouslySetInnerHTML={{ __html: item.content }} />
        )}

        {item.tags?.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6 dark:border-slate-800">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {item.file_url && (
          <div className="mt-10 rounded-3xl border border-gray-200 bg-slate-50 p-7 text-center dark:border-slate-700 dark:bg-slate-800/60">
            <a
              href={item.file_url}
              download={item.file_name || undefined}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
            >
              <DownloadIcon className="h-5 w-5" aria-hidden="true" />
              دانلود فایل
            </a>
            {(item.file_name || fileSize) && (
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <FileText className="h-4 w-4" aria-hidden="true" />
                {item.file_name}
                {item.file_name && fileSize && " — "}
                {fileSize}
              </p>
            )}
          </div>
        )}
      </article>

      <section className="px-4 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-brand-dark px-6 py-16 text-center md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            دنبال راهنمایی برای استفاده از این منبع هستید؟
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
