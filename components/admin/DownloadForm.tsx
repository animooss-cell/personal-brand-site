"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Download, DownloadResourceType } from "@/lib/types";
import { RESOURCE_TYPES, formatFileSize } from "@/lib/downloadTypes";
import TipTapEditor from "@/components/admin/TipTapEditor";
import { Upload, Save, Trash2, FileText } from "lucide-react";

function slugify(value: string) {
  let v = value.trim();
  // اگه یه URL کامل پیست شده، فقط مسیرش رو نگه دار
  try {
    if (/^https?:\/\//i.test(v)) {
      v = new URL(v).pathname.replace(/^\/+|\/+$/g, "");
    }
  } catch {
    // URL معتبر نبود، همون مقدار اصلی رو نگه دار
  }
  return v
    .toLowerCase()
    .replace(/[^؀-ۿa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function DownloadForm({ download }: { download?: Download }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(download);

  const [title, setTitle] = useState(download?.title ?? "");
  const [slug, setSlug] = useState(download?.slug ?? "");
  const [category, setCategory] = useState(download?.category ?? "");
  const [resourceType, setResourceType] = useState<DownloadResourceType>(
    download?.resource_type ?? "prompt"
  );
  const [tags, setTags] = useState(download?.tags?.join(", ") ?? "");
  const [excerpt, setExcerpt] = useState(download?.excerpt ?? "");
  const [content, setContent] = useState(download?.content ?? "");
  const [featuredImage, setFeaturedImage] = useState(download?.featured_image ?? "");
  const [published, setPublished] = useState(download?.published ?? false);

  const [seoTitle, setSeoTitle] = useState(download?.seo_title ?? "");
  const [metaDescription, setMetaDescription] = useState(download?.meta_description ?? "");

  const [fileUrl, setFileUrl] = useState(download?.file_url ?? "");
  const [fileName, setFileName] = useState(download?.file_name ?? "");
  const [fileSize, setFileSize] = useState<number | null>(download?.file_size ?? null);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFeaturedImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    setUploadingImage(false);

    if (uploadError) {
      setError("آپلود تصویر با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setFeaturedImage(data.publicUrl);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("downloads").upload(path, file);
    setUploadingFile(false);

    if (uploadError) {
      setError("آپلود فایل با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("downloads").getPublicUrl(path);
    setFileUrl(data.publicUrl);
    setFileName(file.name);
    setFileSize(file.size);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const finalSlug = slug.trim() ? slugify(slug) : slugify(title);

    const payload = {
      title,
      slug: finalSlug,
      category: category || null,
      resource_type: resourceType,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: excerpt || null,
      content,
      featured_image: featuredImage || null,
      file_url: fileUrl || null,
      file_name: fileName || null,
      file_size: fileSize,
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      published,
    };

    const query = isEdit
      ? supabase.from("downloads").update(payload).eq("id", download!.id)
      : supabase.from("downloads").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(
        saveError.message.includes("duplicate") ? "این نشانی (slug) قبلاً استفاده شده است." : "ذخیره با خطا مواجه شد."
      );
      return;
    }

    router.push("/admin/downloads");
    router.refresh();
  }

  async function handleDelete() {
    if (!download) return;
    if (!confirm("از حذف این منبع مطمئن هستید؟")) return;
    await supabase.from("downloads").delete().eq("id", download.id);
    router.push("/admin/downloads");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <label className="mb-1 block text-sm font-semibold text-slate-700">عنوان</label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-semibold text-slate-700">نشانی (Slug)</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={title ? slugify(title) : "auto-generated-slug"}
            dir="ltr"
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-semibold text-slate-700">لید (خلاصه)</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">محتوای اصلی</h2>
          <TipTapEditor value={content} onChange={setContent} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">سئو</h2>

          <label className="mb-1 block text-sm font-medium text-slate-600">عنوان سئو</label>
          <input
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 flex items-center justify-between text-sm font-medium text-slate-600">
            توضیحات متا
            <span className={metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}>
              {metaDescription.length}/160
            </span>
          </label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value.slice(0, 160))}
            rows={2}
            className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">انتشار</h2>

          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            منتشر شود
          </label>

          <label className="mb-1 block text-sm font-medium text-slate-600">نوع منبع</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value as DownloadResourceType)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          >
            {RESOURCE_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <label className="mb-1 block text-sm font-medium text-slate-600">دسته‌بندی</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">تگ‌ها (با کاما جدا کنید)</label>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">فایل دانلودی</h2>
          {fileUrl && (
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
              <FileText className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              <span className="truncate">{fileName}</span>
              {fileSize != null && (
                <span className="mr-auto flex-shrink-0 text-xs text-slate-400">{formatFileSize(fileSize)}</span>
              )}
            </div>
          )}
          <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
            <Upload className="h-4 w-4" aria-hidden="true" />
            {uploadingFile ? "در حال آپلود..." : fileUrl ? "جایگزینی فایل" : "آپلود فایل"}
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">تصویر شاخص</h2>
          {featuredImage && (
            <div className="relative mb-3 h-32 w-full">
              <Image src={featuredImage} alt="" fill sizes="320px" className="rounded-xl object-cover" />
            </div>
          )}
          <input
            value={featuredImage}
            onChange={(e) => setFeaturedImage(e.target.value)}
            placeholder="آدرس تصویر (URL)"
            dir="ltr"
            className="mb-3 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
          <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
            <Upload className="h-4 w-4" aria-hidden="true" />
            {uploadingImage ? "در حال آپلود..." : "آپلود تصویر"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFeaturedImageUpload} />
          </label>
        </div>

        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "در حال ذخیره..." : "ذخیره منبع"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              حذف منبع
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
