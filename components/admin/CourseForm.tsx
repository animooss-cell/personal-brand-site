"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Course } from "@/lib/types";
import { Save, Upload, Trash2 } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand";
const labelClass = "mb-1 block text-sm font-medium text-slate-600";

export default function CourseForm({ course }: { course?: Course }) {
  const router = useRouter();
  const supabase = createClient();
  const isEdit = Boolean(course);

  const [title, setTitle] = useState(course?.title ?? "");
  const [audience, setAudience] = useState(course?.audience ?? "");
  const [description, setDescription] = useState(course?.description ?? "");
  const [image, setImage] = useState(course?.image ?? "");
  const [status, setStatus] = useState<"draft" | "published">(course?.status ?? "draft");

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file);
    setUploading(false);

    if (uploadError) {
      setError("آپلود تصویر با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    setImage(data.publicUrl);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      title,
      audience: audience || null,
      description: description || null,
      image: image || null,
      status,
    };

    const query = isEdit
      ? supabase.from("courses").update(payload).eq("id", course!.id)
      : supabase.from("courses").insert(payload);

    const { error: saveError } = await query;
    setSaving(false);

    if (saveError) {
      setError("ذخیره با خطا مواجه شد.");
      return;
    }

    router.push("/admin/courses");
    router.refresh();
  }

  async function handleDelete() {
    if (!course) return;
    if (!confirm("از حذف این دوره مطمئن هستید؟")) return;
    await supabase.from("courses").delete().eq("id", course.id);
    router.push("/admin/courses");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <label className={labelClass}>عنوان دوره</label>
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`mb-4 ${inputClass}`}
        />

        <label className={labelClass}>مخاطب</label>
        <input
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="مثلاً تیم روابط عمومی شرکت فولاد خوزستان"
          className={`mb-4 ${inputClass}`}
        />

        <label className={labelClass}>توضیح</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`mb-4 resize-y ${inputClass}`}
        />

        <label className={labelClass}>تصویر دوره</label>
        <div className="mb-4 flex items-center gap-4">
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="h-16 w-24 rounded-xl object-cover" />
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
            <Upload className="h-4 w-4" aria-hidden="true" />
            {uploading ? "در حال آپلود..." : "آپلود تصویر"}
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <label className={labelClass}>وضعیت</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "draft" | "published")}
          className={inputClass}
        >
          <option value="draft">پیش‌نویس</option>
          <option value="published">منتشرشده</option>
        </select>
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "در حال ذخیره..." : "ذخیره دوره"}
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors duration-200 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            حذف
          </button>
        )}
      </div>
    </form>
  );
}
