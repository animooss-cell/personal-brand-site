"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const supabase = createClient();

    const { error: insertError } = await supabase.from("contacts").insert({
      name: data.get("name") as string,
      business: (data.get("business") as string) || null,
      email: data.get("email") as string,
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
      <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center">
        <h2 className="mb-2 text-xl font-bold text-brand-700">پیام شما ارسال شد</h2>
        <p className="text-sm leading-6 text-brand-700/80">
          به‌زودی برای هماهنگی جلسه با شما تماس می‌گیریم.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
            اسم
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200"
            placeholder="نام و نام خانوادگی"
          />
        </div>

        <div>
          <label htmlFor="business" className="mb-2 block text-sm font-medium text-slate-700">
            کسب‌وکار
          </label>
          <input
            id="business"
            name="business"
            type="text"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200"
            placeholder="نام کسب‌وکار شما"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
            ایمیل
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200"
            placeholder="example@email.com"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700">
            پیام
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base text-slate-900 outline-none transition-colors duration-200 focus:border-brand focus:ring-2 focus:ring-brand-200"
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
  );
}
