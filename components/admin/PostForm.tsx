"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Post, Block } from "@/lib/types";
import BlockEditor from "@/components/admin/BlockEditor";
import { Upload, Save, Trash2 } from "lucide-react";

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^؀-ۿa-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(post);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image ?? "");
  const [blocks, setBlocks] = useState<Block[]>(post?.content ?? []);
  const [status, setStatus] = useState<"draft" | "published">(post?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState(
    post?.published_at ? post.published_at.slice(0, 10) : ""
  );
  const [category, setCategory] = useState(post?.category ?? "");
  const [tags, setTags] = useState(post?.tags?.join(", ") ?? "");

  const [seoTitle, setSeoTitle] = useState(post?.seo_title ?? "");
  const [metaDescription, setMetaDescription] = useState(post?.meta_description ?? "");
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url ?? "");
  const [ogImage, setOgImage] = useState(post?.og_image ?? "");
  const [noindex, setNoindex] = useState(post?.noindex ?? false);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<string | null> {
    setUploading(true);
    setError(null);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    setUploading(false);

    if (uploadError) {
      setError("آپلود تصویر با خطا مواجه شد.");
      return null;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    return data.publicUrl;
  }

  async function handleFeaturedImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) setFeaturedImage(url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const finalSlug = slug.trim() ? slugify(slug) : slugify(title);

    const payload = {
      title,
      slug: finalSlug,
      excerpt: excerpt || null,
      featured_image: featuredImage || null,
      content: blocks,
      status,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
      category: category || null,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      seo_title: seoTitle || null,
      meta_description: metaDescription || null,
      canonical_url: canonicalUrl || null,
      og_image: ogImage || null,
      noindex,
    };

    const query = isEdit
      ? supabase.from("posts").update(payload).eq("id", post!.id)
      : supabase.from("posts").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError(saveError.message.includes("duplicate") ? "این نشانی (slug) قبلاً استفاده شده است." : "ذخیره با خطا مواجه شد.");
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  async function handleDelete() {
    if (!post) return;
    if (!confirm("از حذف این پست مطمئن هستید؟")) return;
    await supabase.from("posts").delete().eq("id", post.id);
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <label className="mb-1 block text-sm font-semibold text-slate-700">تیتر اصلی</label>
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
          <BlockEditor blocks={blocks} onChange={setBlocks} />
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
            className="mb-4 w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">Canonical URL</label>
          <input
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            dir="ltr"
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">تصویر OG</label>
          <input
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            dir="ltr"
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <input
              type="checkbox"
              checked={noindex}
              onChange={(e) => setNoindex(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            noindex (از ایندکس موتورهای جستجو حذف شود)
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-700">انتشار</h2>

          <label className="mb-1 block text-sm font-medium text-slate-600">وضعیت</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "draft" | "published")}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          >
            <option value="draft">پیش‌نویس</option>
            <option value="published">منتشرشده</option>
          </select>

          <label className="mb-1 block text-sm font-medium text-slate-600">تاریخ انتشار</label>
          <input
            type="date"
            value={publishedAt}
            onChange={(e) => setPublishedAt(e.target.value)}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

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
          <h2 className="mb-4 text-sm font-semibold text-slate-700">تصویر شاخص</h2>
          {featuredImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={featuredImage} alt="" className="mb-3 h-32 w-full rounded-xl object-cover" />
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
            {uploading ? "در حال آپلود..." : "آپلود تصویر"}
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
            {saving ? "در حال ذخیره..." : "ذخیره پست"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              حذف پست
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
