// گزینه‌ها و قاعده‌های فرم رزرو جلسه؛ هم فرم مرورگر و هم مسیر بدون جاوااسکریپت (app/contact/actions.ts) از همین‌ها استفاده می‌کنند.

export const TOPICS = ["مشاوره هوش مصنوعی", "رشد کسب‌وکار", "محتوا و بازاریابی", "آموزش تیم", "هنوز نمی‌دانم"] as const;
export const CHANNELS = ["واتس‌اپ", "تلگرام", "تماس تلفنی"] as const;
export const DEFAULT_CHANNEL = CHANNELS[0];
// پاسخ اختیاری «از کجا با ما آشنا شدید؟» (ستون contacts.referral؛ supabase/migration_contacts_referral.sql)
export const REFERRALS = ["ChatGPT", "گوگل", "اینستاگرام", "معرفی دوستان", "رسانه", "سایر"] as const;

export type ContactFields = {
  topic: string;
  channel: string;
  name: string;
  business: string;
  phone: string;
  email: string;
  message: string;
  referral: string;
};
export type FieldErrors = Partial<Record<"topic" | "name" | "phone" | "email", string>>;

// همان قاعده‌ی شماره موبایل فرم قبلی تماس (ارقام فارسی و عربی هم پذیرفته می‌شوند)
export function normalizeDigits(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return value.replace(/[۰-۹٠-٩]/g, (d) => {
    const persianIndex = persian.indexOf(d);
    if (persianIndex !== -1) return String(persianIndex);
    return String(arabic.indexOf(d));
  });
}

export function isValidIranianMobile(raw: string) {
  const digits = normalizeDigits(raw).replace(/[\s-]/g, "");
  return /^(?:0|0098|\+98|98)?9\d{9}$/.test(digits);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PHONE_EXAMPLE = "۰۹۱۲۳۴۵۶۷۸۹";

export function readFields(data: FormData): ContactFields {
  const get = (key: string) => ((data.get(key) as string | null) ?? "").trim();
  return {
    topic: get("topic"),
    channel: get("channel") || DEFAULT_CHANNEL,
    name: get("name"),
    business: get("business"),
    phone: get("phone"),
    email: get("email"),
    message: get("message"),
    referral: get("referral"),
  };
}

export function validateTopic(topic: string): string | undefined {
  return (TOPICS as readonly string[]).includes(topic) ? undefined : "یک موضوع را انتخاب کنید.";
}

export function validateDetails(f: ContactFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.name) errors.name = "نام را وارد کنید.";
  if (!f.phone) errors.phone = "شماره موبایل را وارد کنید.";
  else if (!isValidIranianMobile(f.phone)) errors.phone = "شماره موبایل معتبر نیست.";
  if (f.email && !EMAIL_PATTERN.test(f.email)) errors.email = "ایمیل معتبر نیست. مثال: name@example.com";
  return errors;
}

// جدول contacts ستونی برای موضوع و راه پیگیری ندارد؛ این دو به‌صورت یک خط ساخت‌یافته در ابتدای پیام می‌آیند.
export function channelOf(value: string): string {
  return (CHANNELS as readonly string[]).includes(value) ? value : DEFAULT_CHANNEL;
}

export function referralOf(value: string): string | null {
  return (REFERRALS as readonly string[]).includes(value) ? value : null;
}

export function toContactRow(f: ContactFields) {
  const header = `موضوع: ${f.topic} | پیگیری: ${channelOf(f.channel)}`;
  const referral = referralOf(f.referral);
  return {
    source: "contact" as const,
    name: f.name,
    business: f.business || null,
    email: f.email,
    phone: f.phone,
    message: f.message ? `${header}\n\n${f.message}` : header,
    // فقط وقتی کاربر گزینه‌ای انتخاب کرده باشد فرستاده می‌شود
    ...(referral ? { referral } : {}),
  };
}

type InsertClient = {
  from: (table: "contacts") => {
    insert: (row: Record<string, unknown>) => PromiseLike<{ error: { code?: string; message?: string } | null }>;
  };
};

// تا وقتی migration ستون referral روی دیتابیس اجرا نشده، درج با این ستون خطای «ستون پیدا نشد» می‌دهد؛
// در آن حالت پیام بدون referral دوباره ثبت می‌شود تا هیچ درخواستی از دست نرود.
function isMissingReferralColumn(error: { code?: string; message?: string }) {
  return error.code === "PGRST204" || error.code === "42703" || /referral/i.test(error.message ?? "");
}

export async function insertContact(client: InsertClient, f: ContactFields) {
  const row = toContactRow(f);
  const first = await client.from("contacts").insert(row);
  if (!first.error || !("referral" in row) || !isMissingReferralColumn(first.error)) return first;
  const { referral: _omit, ...withoutReferral } = row;
  return client.from("contacts").insert(withoutReferral);
}
