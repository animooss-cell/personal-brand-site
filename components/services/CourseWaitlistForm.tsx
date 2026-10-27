"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

// فرم لیست انتظار دوره‌ها؛ درخواست در همان جدول contacts فرم تماس ثبت می‌شود (جدول یا API تازه‌ای ساخته نشده).
// بدون جاوااسکریپت، فرم مثل قبل به صفحه‌ی تماس می‌رود.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// همان قاعده‌ی شماره موبایل فرم تماس (app/contact/ContactForm.tsx)
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

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]";

export default function CourseWaitlistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = ((new FormData(e.currentTarget).get("contact") as string) || "").trim();
    const isEmail = value.includes("@");

    if (!value || (isEmail ? !EMAIL_PATTERN.test(value) : !isValidIranianMobile(value))) {
      setFieldError("یک شماره موبایل یا ایمیل معتبر وارد کنید. مثال: ۰۹۱۲۳۴۵۶۷۸۹");
      return;
    }

    setFieldError(null);
    setStatus("sending");
    const { error } = await createClient()
      .from("contacts")
      .insert({
        name: "لیست انتظار دوره‌ها",
        email: isEmail ? value : "",
        phone: isEmail ? null : value,
        message: "درخواست ثبت در لیست انتظار دوره‌های جدید (صفحه‌ی خدمات)",
      });
    setStatus(error ? "error" : "done");
  }

  return (
    <form
      action="/contact"
      method="get"
      noValidate
      onSubmit={handleSubmit}
      className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5 rounded-[22px] border border-[var(--svc-line)] bg-[var(--svc-card-b)] p-7"
    >
      <label htmlFor="course-waitlist" className="text-[17px] font-bold">
        دوره‌های جدید به‌زودی؛ اول به شما خبر می‌دهیم
      </label>

      {status === "done" ? (
        <p role="status" className="text-[15px] leading-[1.8] text-[var(--svc-acc-t)]">
          ثبت شد. با انتشار دوره‌ی جدید، اول به شما خبر می‌دهیم.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2.5">
            <input
              id="course-waitlist"
              name="contact"
              type="text"
              autoComplete="on"
              placeholder="شماره موبایل یا ایمیل"
              aria-invalid={fieldError ? true : undefined}
              aria-describedby={fieldError ? "course-waitlist-error" : undefined}
              className={`min-h-[54px] min-w-0 flex-[1_1_220px] rounded-[14px] border border-[var(--svc-line2)] bg-[var(--svc-input)] px-[18px] text-[16px] text-[var(--svc-ink)] placeholder:text-[var(--svc-ink3)] sm:text-[15px] ${focusRing}`}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="min-h-[52px] cursor-pointer rounded-[14px] bg-cta px-6 text-[15px] font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white disabled:cursor-wait disabled:opacity-70"
            >
              {status === "sending" ? "در حال ثبت…" : "ثبت در لیست انتظار"}
            </button>
          </div>
          {fieldError && (
            <p
              id="course-waitlist-error"
              role="alert"
              className="text-[14px] font-medium text-red-700 dark:text-red-300"
            >
              {fieldError}
            </p>
          )}
          {status === "error" && (
            <p role="alert" className="text-[14px] leading-[1.8] text-[var(--svc-ink2)]">
              ثبت با خطا مواجه شد. دوباره امتحان کنید یا از{" "}
              <Link
                href="/contact"
                className={`font-bold text-[var(--svc-ink)] underline underline-offset-4 ${focusRing}`}
              >
                صفحه‌ی تماس
              </Link>{" "}
              پیام بدهید.
            </p>
          )}
        </>
      )}
    </form>
  );
}
