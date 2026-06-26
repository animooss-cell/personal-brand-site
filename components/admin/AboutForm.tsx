"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { AboutContent, AboutTimelineItem } from "@/lib/types";
import TagListEditor from "@/components/admin/TagListEditor";
import TimelineEditor, { TimelineDraftItem } from "@/components/admin/TimelineEditor";
import { Save, Upload } from "lucide-react";

const inputClass =
  "w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand";
const labelClass = "mb-1 block text-sm font-medium text-slate-600";

export default function AboutForm({
  about,
  timeline,
}: {
  about: AboutContent;
  timeline: AboutTimelineItem[];
}) {
  const router = useRouter();
  const supabase = createClient();

  const [avatarImage, setAvatarImage] = useState(about.avatar_image ?? "");
  const [fullName, setFullName] = useState(about.full_name ?? "");
  const [roleTitle, setRoleTitle] = useState(about.role_title ?? "");
  const [shortBio, setShortBio] = useState(about.short_bio ?? "");
  const [fullBio, setFullBio] = useState(about.full_bio ?? "");
  const [specialties, setSpecialties] = useState(about.specialties ?? []);
  const [activities, setActivities] = useState(about.activities ?? []);
  const [collaborations, setCollaborations] = useState(about.collaborations ?? []);
  const [instagram, setInstagram] = useState(about.social_links?.instagram ?? "");
  const [telegram, setTelegram] = useState(about.social_links?.telegram ?? "");
  const [whatsapp, setWhatsapp] = useState(about.social_links?.whatsapp ?? "");
  const [twitter, setTwitter] = useState(about.social_links?.twitter ?? "");
  const [phoneNumbers, setPhoneNumbers] = useState(about.phone_numbers ?? []);

  const [timelineItems, setTimelineItems] = useState<TimelineDraftItem[]>(
    timeline.map((t) => ({ id: t.id, title: t.title, place: t.place ?? "" }))
  );

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(true);
    setAvatarError(null);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file);
    setUploadingAvatar(false);

    if (uploadError) {
      setAvatarError("آپلود تصویر با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    setAvatarImage(data.publicUrl);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    await supabase
      .from("about_content")
      .update({
        avatar_image: avatarImage || null,
        full_name: fullName,
        role_title: roleTitle,
        short_bio: shortBio,
        full_bio: fullBio,
        specialties: specialties.map((s) => s.trim()).filter(Boolean),
        activities: activities.map((s) => s.trim()).filter(Boolean),
        collaborations: collaborations.map((s) => s.trim()).filter(Boolean),
        social_links: { instagram, telegram, whatsapp, twitter },
        phone_numbers: phoneNumbers.map((p) => p.trim()).filter(Boolean),
      })
      .eq("id", 1);

    await supabase.from("about_timeline").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const rows = timelineItems
      .filter((t) => t.title.trim())
      .map((t, index) => ({ title: t.title.trim(), place: t.place.trim() || null, position: index }));

    if (rows.length) {
      await supabase.from("about_timeline").insert(rows);
    }

    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">پروفایل</h3>

          <label className={labelClass}>عکس پروفایل</label>
          <div className="mb-4 flex items-center gap-4">
            {avatarImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarImage} alt="پروفایل" className="h-16 w-16 rounded-full object-cover" />
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
              <Upload className="h-4 w-4" aria-hidden="true" />
              {uploadingAvatar ? "در حال آپلود..." : "آپلود تصویر"}
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
          </div>
          {avatarError && (
            <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{avatarError}</p>
          )}

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>نام و نام خانوادگی</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>عنوان شغلی</label>
              <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className={inputClass} />
            </div>
          </div>

          <label className={labelClass}>بیوگرافی کوتاه</label>
          <textarea
            value={shortBio}
            onChange={(e) => setShortBio(e.target.value)}
            rows={2}
            className={`mb-4 resize-y ${inputClass}`}
          />

          <label className={labelClass}>بیوگرافی کامل</label>
          <textarea
            value={fullBio}
            onChange={(e) => setFullBio(e.target.value)}
            rows={5}
            className={`resize-y ${inputClass}`}
          />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">تخصص‌ها</h3>
          <TagListEditor items={specialties} onChange={setSpecialties} placeholder="مثلاً مدرک PMBOK" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">فعالیت‌های جاری</h3>
          <TagListEditor items={activities} onChange={setActivities} placeholder="مثلاً مشاوره کسب‌وکار" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">تجربیات (Timeline)</h3>
          <TimelineEditor items={timelineItems} onChange={setTimelineItems} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">همکاری‌ها</h3>
          <TagListEditor items={collaborations} onChange={setCollaborations} placeholder="مثلاً پارک علم و فناوری" />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">لینک‌های شبکه اجتماعی</h3>

          <label className={labelClass}>اینستاگرام (لینک کامل)</label>
          <input value={instagram} onChange={(e) => setInstagram(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

          <label className={labelClass}>تلگرام (لینک کامل)</label>
          <input value={telegram} onChange={(e) => setTelegram(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

          <label className={labelClass}>واتساپ (شماره موبایل)</label>
          <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

          <label className={labelClass}>ایکس / توییتر (لینک کامل)</label>
          <input value={twitter} onChange={(e) => setTwitter(e.target.value)} dir="ltr" className={inputClass} />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-sm font-bold text-slate-700">شماره‌های تماس</h3>
          <TagListEditor items={phoneNumbers} onChange={setPhoneNumbers} placeholder="مثلاً 09161002550" />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-3">
        {saved && <span className="text-sm text-brand-600">ذخیره شد</span>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
        >
          <Save className="h-4 w-4" aria-hidden="true" />
          {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </button>
      </div>
    </div>
  );
}
