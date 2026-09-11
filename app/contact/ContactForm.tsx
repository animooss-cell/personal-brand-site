"use client";

import { useState, type FormEvent } from "react";
import { Send, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const WHATSAPP_URL = "https://wa.me/989161002550";
const TELEGRAM_URL = "https://t.me/abedahm";

function normalizeDigits(value: string) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  const arabic = "٠١٢٣٤٥٦٧٨٩";
  return value.replace(/[۰-۹٠-٩]/g, (d) => {
    const persianIndex = persian.indexOf(d);
    if (persianIndex !== -1) return String(persianIndex);
    return String(arabic.indexOf(d));
  });
}

function isValidIranianMobile(raw: string) {
  const digits = normalizeDigits(raw).replace(/[\s-]/g, "");
  return /^(?:0|0098|\+98|98)?9\d{9}$/.test(digits);
}

function DirectContactLinks() {
  return (
    <div className="flex items-center gap-3">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تماس از طریق واتساپ"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-colors duration-200 hover:bg-[#25D366] hover:text-white"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تماس از طریق تلگرام"
        className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#229ED9]/10 text-[#229ED9] transition-colors duration-200 hover:bg-[#229ED9] hover:text-white"
      >
        <Send className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPhoneError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = ((data.get("phone") as string) || "").trim();

    if (phone && !isValidIranianMobile(phone)) {
      setPhoneError("شماره موبایل معتبر نیست. مثال: ۰۹۱۲۳۴۵۶۷۸۹");
      return;
    }

    setSubmitting(true);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("contacts").insert({
      name: data.get("name") as string,
      business: (data.get("business") as string) || null,
      email: data.get("email") as string,
      phone: phone || null,
      message: data.get("message") as string,
    });

    setSubmitting(false);

    if (insertError) {
      setError("ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center dark:border-brand-800 dark:bg-brand-900/30">
        <h2 className="mb-2 text-xl font-bold text-brand-700 dark:text-brand-300">
          پیام شما با موفقیت دریافت شد. حداکثر ظرف ۲۴ ساعت پاسخ می‌دهم.
        </h2>
        <p className="mb-5 text-sm leading-6 text-brand-700/80 dark:text-brand-300/80">
          برای دسترسی سریع‌تر می‌توانید مستقیم از طریق واتساپ یا تلگرام هم پیام دهید:
        </p>
        <div className="flex justify-center">
          <DirectContactLinks />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-right">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          برای دسترسی سریع‌تر، بدون پر کردن فرم هم می‌توانید مستقیم پیام دهید:
        </p>
        <DirectContactLinks />
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              اسم
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="نام و نام خانوادگی"
            />
          </div>

          <div>
            <label htmlFor="business" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              کسب‌وکار
            </label>
            <input
              id="business"
              name="business"
              type="text"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="نام کسب‌وکار شما"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              ایمیل
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              شماره تماس (اختیاری)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              onChange={() => setPhoneError(null)}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="۰۹۱۲۳۴۵۶۷۸۹"
            />
            {phoneError && <p className="mt-2 text-sm text-red-600">{phoneError}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              پیام
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              placeholder="کمی درباره کسب‌وکار و هدف‌تان بنویسید..."
            />
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {submitting ? "در حال ارسال..." : "ارسال و شروع"}
          {!submitting && <Send className="h-4 w-4" aria-hidden="true" />}
        </button>
      </form>
    </div>
  );
}
