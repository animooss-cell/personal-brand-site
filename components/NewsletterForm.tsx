"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    setSubmitting(false);

    if (insertError) {
      setError(
        insertError.message.includes("duplicate")
          ? "این ایمیل قبلاً ثبت شده است."
          : "ثبت ایمیل با خطا مواجه شد."
      );
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  if (submitted) {
    return <p className="text-sm text-brand-300">با موفقیت در خبرنامه ثبت شدید.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما"
          dir="ltr"
          className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none focus:border-brand"
        />
        <button
          type="submit"
          disabled={submitting}
          aria-label="عضویت در خبرنامه"
          className="inline-flex cursor-pointer items-center justify-center rounded-full bg-brand px-4 py-2.5 text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && <p className="text-xs text-red-300">{error}</p>}
    </form>
  );
}
