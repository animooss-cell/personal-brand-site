"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Video, VideoPlatform } from "@/lib/types";
import { VIDEO_PLATFORMS } from "@/lib/videoTypes";
import TipTapEditor from "@/components/admin/TipTapEditor";
import VideoEmbed from "@/components/VideoEmbed";
import { Upload, Save, Trash2 } from "lucide-react";

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

export default function VideoForm({ video }: { video?: Video }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(video);

  const [title, setTitle] = useState(video?.title ?? "");
  const [slug, setSlug] = useState(video?.slug ?? "");
  const [category, setCategory] = useState(video?.category ?? "");
  const [tags, setTags] = useState(video?.tags?.join(", ") ?? "");
  const [description, setDescription] = useState(video?.description ?? "");
  const [published, setPublished] = useState(video?.published ?? false);

  const [videoUrl, setVideoUrl] = useState(video?.video_url ?? "");
  const [videoPlatform, setVideoPlatform] = useState<VideoPlatform>(
    video?.video_platform ?? "youtube"
  );
  const [embedCode, setEmbedCode] = useState(video?.embed_code ?? "");
  const [duration, setDuration] = useState(video?.duration ?? "");
  const [thumbnail, setThumbnail] = useState(video?.thumbnail ?? "");

  const [seoTitle, setSeoTitle] = useState(video?.seo_title ?? "");
  const [metaDescription, setMetaDescription] = useState(video?.meta_description ?? "");

  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleThumbnailUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    setUploadingThumbnail(false);

    if (uploadError) {
      setError("آپلود تصویر با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setThumbnail(data.publicUrl);
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
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      description,
      video_url: videoUrl,
      video_platform: videoPlatform,
      embed_code: videoPlatform === "custom" ? embedCode || null : null,
      duration: duration || null,
      thumbnail: thumbnail || null,
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      published,
    };

    const query = isEdit
      ? supabase.from("videos").update(payload).eq("id", video!.id)
      : supabase.from("videos").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(
        saveError.message.includes("duplicate") ? "این نشانی (slug) قبلاً استفاده شده است." : "ذخیره با خطا مواجه شد."
      );
      return;
    }

    router.push("/admin/videos");
    router.refresh();
  }

  async function handleDelete() {
    if (!video) return;
    if (!confirm("از حذف این ویدیو مطمئن هستید؟")) return;
    await supabase.from("videos").delete().eq("id", video.id);
    router.push("/admin/videos");
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
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder={title ? slugify(title) : "auto-generated-slug"}
            dir="ltr"
            className="mb-1 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
          <p className="text-xs text-slate-400">
            آدرس صفحه از همین فیلد ساخته می‌شود؛ اگر خالی بماند خودکار از عنوان ساخته می‌شود، ولی حتماً قابل ویرایش است.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">لینک ویدیو</h2>

          <label className="mb-1 block text-sm font-medium text-slate-600">پلتفرم</label>
          <select
            value={videoPlatform}
            onChange={(e) => setVideoPlatform(e.target.value as VideoPlatform)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          >
            {VIDEO_PLATFORMS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <label className="mb-1 block text-sm font-medium text-slate-600">آدرس ویدیو</label>
          <input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://..."
            dir="ltr"
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          {videoPlatform === "custom" && (
            <>
              <label className="mb-1 block text-sm font-medium text-slate-600">کد امبد سفارشی (اختیاری)</label>
              <textarea
                value={embedCode}
                onChange={(e) => setEmbedCode(e.target.value)}
                rows={4}
                dir="ltr"
                placeholder="<iframe ...></iframe>"
                className="mb-4 w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 font-mono text-xs outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </>
          )}

          {videoUrl && (
            <div>
              <p className="mb-2 text-xs font-medium text-slate-500">پیش‌نمایش</p>
              <VideoEmbed videoUrl={videoUrl} platform={videoPlatform} embedCode={embedCode} title={title} />
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">توضیحات</h2>
          <TipTapEditor value={description} onChange={setDescription} />
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

          <label className="mb-1 block text-sm font-medium text-slate-600">دسته‌بندی</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">مدت زمان (مثلاً ۵:۳۰)</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
          <h2 className="mb-4 text-sm font-semibold text-slate-700">تصویر بندانگشتی (اختیاری)</h2>
          {thumbnail && (
            <div className="relative mb-3 h-32 w-full">
              <Image src={thumbnail} alt="" fill sizes="320px" className="rounded-xl object-cover" />
            </div>
          )}
          <input
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="آدرس تصویر (URL)"
            dir="ltr"
            className="mb-3 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
          <label className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-gray-300 px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
            <Upload className="h-4 w-4" aria-hidden="true" />
            {uploadingThumbnail ? "در حال آپلود..." : "آپلود تصویر"}
            <input type="file" accept="image/*" className="hidden" onChange={handleThumbnailUpload} />
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
            {saving ? "در حال ذخیره..." : "ذخیره ویدیو"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              حذف ویدیو
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
