"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { SiteSettings } from "@/lib/types";
import { Save, ArrowLeft, Upload } from "lucide-react";

type Tab = "general" | "hero" | "about";

const tabs: { id: Tab; label: string }[] = [
  { id: "general", label: "عمومی" },
  { id: "hero", label: "بخش Hero" },
  { id: "about", label: "درباره من" },
];

const inputClass =
  "w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand";
const labelClass = "mb-1 block text-sm font-medium text-slate-600";

export default function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const supabase = createClient();
  const [tab, setTab] = useState<Tab>("general");

  const [siteTitle, setSiteTitle] = useState(settings.site_title ?? "");
  const [siteDescription, setSiteDescription] = useState(settings.site_description ?? "");
  const [brandColor, setBrandColor] = useState(settings.brand_color ?? "#00C389");
  const [contactEmail, setContactEmail] = useState(settings.contact_email ?? "");
  const [instagram, setInstagram] = useState(settings.social_links?.instagram ?? "");
  const [linkedin, setLinkedin] = useState(settings.social_links?.linkedin ?? "");

  const [heroBadge, setHeroBadge] = useState(settings.hero_badge ?? "");
  const [heroTitlePrefix, setHeroTitlePrefix] = useState(settings.hero_title_prefix ?? "");
  const [heroTitleHighlight, setHeroTitleHighlight] = useState(settings.hero_title_highlight ?? "");
  const [heroTitleSuffix, setHeroTitleSuffix] = useState(settings.hero_title_suffix ?? "");
  const [heroDescription, setHeroDescription] = useState(settings.hero_description ?? "");
  const [heroImage, setHeroImage] = useState(settings.hero_image ?? "");
  const [heroPrimaryCta, setHeroPrimaryCta] = useState(settings.hero_primary_cta ?? "");
  const [heroSecondaryCta, setHeroSecondaryCta] = useState(settings.hero_secondary_cta ?? "");
  const [heroTrustText, setHeroTrustText] = useState(settings.hero_trust_text ?? "");

  const [fullName, setFullName] = useState(settings.full_name ?? "");
  const [roleTitle, setRoleTitle] = useState(settings.role_title ?? "");
  const [avatarImage, setAvatarImage] = useState(settings.avatar_image ?? "");

  const [aboutBadge, setAboutBadge] = useState(settings.about_badge ?? "");
  const [aboutTitlePrefix, setAboutTitlePrefix] = useState(settings.about_title_prefix ?? "");
  const [aboutTitleHighlight, setAboutTitleHighlight] = useState(settings.about_title_highlight ?? "");
  const [aboutDescription, setAboutDescription] = useState(settings.about_description ?? "");
  const [aboutCardTitle, setAboutCardTitle] = useState(settings.about_card_title ?? "");
  const [aboutCardDescription, setAboutCardDescription] = useState(settings.about_card_description ?? "");
  const [aboutImage, setAboutImage] = useState(settings.about_image ?? "");
  const [aboutPrinciples, setAboutPrinciples] = useState(settings.about_principles?.join("\n") ?? "");
  const [aboutSecondaryImage, setAboutSecondaryImage] = useState(settings.about_secondary_image ?? "");
  const [aboutQuoteTitle, setAboutQuoteTitle] = useState(settings.about_quote_title ?? "");
  const [aboutQuoteText, setAboutQuoteText] = useState(settings.about_quote_text ?? "");

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [heroImageError, setHeroImageError] = useState<string | null>(null);

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

  async function handleHeroImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHeroImage(true);
    setHeroImageError(null);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("hero-images").upload(path, file);
    setUploadingHeroImage(false);

    if (uploadError) {
      setHeroImageError("آپلود تصویر با خطا مواجه شد.");
      return;
    }

    const { data } = supabase.storage.from("hero-images").getPublicUrl(path);
    setHeroImage(data.publicUrl);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    await supabase
      .from("settings")
      .update({
        site_title: siteTitle,
        site_description: siteDescription,
        brand_color: brandColor,
        contact_email: contactEmail,
        social_links: { instagram, linkedin },

        hero_badge: heroBadge,
        hero_title_prefix: heroTitlePrefix,
        hero_title_highlight: heroTitleHighlight,
        hero_title_suffix: heroTitleSuffix,
        hero_description: heroDescription,
        hero_image: heroImage,
        hero_primary_cta: heroPrimaryCta,
        hero_secondary_cta: heroSecondaryCta,
        hero_trust_text: heroTrustText,

        full_name: fullName,
        role_title: roleTitle,
        avatar_image: avatarImage,

        about_badge: aboutBadge,
        about_title_prefix: aboutTitlePrefix,
        about_title_highlight: aboutTitleHighlight,
        about_description: aboutDescription,
        about_card_title: aboutCardTitle,
        about_card_description: aboutCardDescription,
        about_image: aboutImage,
        about_principles: aboutPrinciples.split("\n").map((s) => s.trim()).filter(Boolean),
        about_secondary_image: aboutSecondaryImage,
        about_quote_title: aboutQuoteTitle,
        about_quote_text: aboutQuoteText,
      })
      .eq("id", 1);

    setSaving(false);
    setSaved(true);
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`cursor-pointer border-b-2 px-4 py-2.5 text-sm font-medium transition-colors duration-200 ${
              tab === t.id
                ? "border-brand text-brand-700"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        {tab === "general" && (
          <>
            <label className={labelClass}>عنوان سایت</label>
            <input value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>توضیح سایت</label>
            <textarea
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
              rows={2}
              className={`mb-4 resize-y ${inputClass}`}
            />

            <label className={labelClass}>رنگ برند</label>
            <input value={brandColor} onChange={(e) => setBrandColor(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>ایمیل تماس</label>
            <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>اینستاگرام</label>
            <input value={instagram} onChange={(e) => setInstagram(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>لینکدین</label>
            <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} dir="ltr" className={inputClass} />
          </>
        )}

        {tab === "hero" && (
          <>
            <label className={labelClass}>بج بالای تیتر</label>
            <input value={heroBadge} onChange={(e) => setHeroBadge(e.target.value)} className={`mb-4 ${inputClass}`} />

            <div className="mb-4 grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>تیتر — بخش اول</label>
                <input value={heroTitlePrefix} onChange={(e) => setHeroTitlePrefix(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>تیتر — بخش رنگی</label>
                <input value={heroTitleHighlight} onChange={(e) => setHeroTitleHighlight(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>تیتر — بخش آخر</label>
                <input value={heroTitleSuffix} onChange={(e) => setHeroTitleSuffix(e.target.value)} className={inputClass} />
              </div>
            </div>

            <label className={labelClass}>توضیح زیر تیتر</label>
            <textarea
              value={heroDescription}
              onChange={(e) => setHeroDescription(e.target.value)}
              rows={3}
              className={`mb-4 resize-y ${inputClass}`}
            />

            <label className={labelClass}>تصویر Hero</label>
            <div className="mb-2 flex items-center gap-4">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt="تصویر Hero"
                  width={96}
                  height={64}
                  className="h-16 w-24 rounded-lg object-cover"
                />
              )}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700">
                <Upload className="h-4 w-4" aria-hidden="true" />
                {uploadingHeroImage ? "در حال آپلود..." : "آپلود تصویر"}
                <input type="file" accept="image/*" className="hidden" onChange={handleHeroImageUpload} />
              </label>
            </div>
            {heroImageError && (
              <p className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{heroImageError}</p>
            )}

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>متن دکمه اصلی</label>
                <input value={heroPrimaryCta} onChange={(e) => setHeroPrimaryCta(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>متن دکمه دوم</label>
                <input value={heroSecondaryCta} onChange={(e) => setHeroSecondaryCta(e.target.value)} className={inputClass} />
              </div>
            </div>

            <label className={labelClass}>متن اعتماد (زیر ستاره‌ها)</label>
            <input value={heroTrustText} onChange={(e) => setHeroTrustText(e.target.value)} className={inputClass} />
          </>
        )}

        {tab === "about" && (
          <>
            <h3 className="mb-4 text-sm font-bold text-slate-700">اطلاعات شخصی</h3>
            <div className="mb-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>نام و نام خانوادگی</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>عنوان / تخصص</label>
                <input value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} className={inputClass} />
              </div>
            </div>
            <label className={labelClass}>تصویر پروفایل</label>
            <div className="mb-6 flex items-center gap-4">
              {avatarImage && (
                <Image
                  src={avatarImage}
                  alt="تصویر پروفایل"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full object-cover"
                />
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

            <h3 className="mb-4 text-sm font-bold text-slate-700">بخش درباره من</h3>
            <label className={labelClass}>بج بالای تیتر</label>
            <input value={aboutBadge} onChange={(e) => setAboutBadge(e.target.value)} className={`mb-4 ${inputClass}`} />

            <div className="mb-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass}>تیتر — بخش اول</label>
                <input value={aboutTitlePrefix} onChange={(e) => setAboutTitlePrefix(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>تیتر — بخش رنگی</label>
                <input value={aboutTitleHighlight} onChange={(e) => setAboutTitleHighlight(e.target.value)} className={inputClass} />
              </div>
            </div>

            <label className={labelClass}>توضیح</label>
            <textarea
              value={aboutDescription}
              onChange={(e) => setAboutDescription(e.target.value)}
              rows={2}
              className={`mb-4 resize-y ${inputClass}`}
            />

            <label className={labelClass}>عنوان کارت سبز</label>
            <input value={aboutCardTitle} onChange={(e) => setAboutCardTitle(e.target.value)} className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>توضیح کارت سبز</label>
            <textarea
              value={aboutCardDescription}
              onChange={(e) => setAboutCardDescription(e.target.value)}
              rows={2}
              className={`mb-4 resize-y ${inputClass}`}
            />

            <label className={labelClass}>تصویر میانی (URL)</label>
            <input value={aboutImage} onChange={(e) => setAboutImage(e.target.value)} dir="ltr" className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>اصول کار من (هر سطر یک مورد)</label>
            <textarea
              value={aboutPrinciples}
              onChange={(e) => setAboutPrinciples(e.target.value)}
              rows={3}
              className={`mb-4 resize-y ${inputClass}`}
            />

            <label className={labelClass}>تصویر پایین — سمت چپ (URL)</label>
            <input
              value={aboutSecondaryImage}
              onChange={(e) => setAboutSecondaryImage(e.target.value)}
              dir="ltr"
              className={`mb-4 ${inputClass}`}
            />

            <label className={labelClass}>عنوان کارت تیره</label>
            <input value={aboutQuoteTitle} onChange={(e) => setAboutQuoteTitle(e.target.value)} className={`mb-4 ${inputClass}`} />

            <label className={labelClass}>متن کارت تیره</label>
            <textarea
              value={aboutQuoteText}
              onChange={(e) => setAboutQuoteText(e.target.value)}
              rows={2}
              className={`resize-y ${inputClass}`}
            />
          </>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <Link
          href="/admin/services"
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          ویرایش کارت‌های خدمات
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>

        <div className="flex items-center gap-3">
          {saved && <span className="text-sm text-brand-600">ذخیره شد</span>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
          >
            <Save className="h-4 w-4" aria-hidden="true" />
            {saving ? "در حال ذخیره..." : "ذخیره تنظیمات"}
          </button>
        </div>
      </div>
    </div>
  );
}
