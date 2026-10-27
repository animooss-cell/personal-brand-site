import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

export type ServiceChapterProps = {
  id: string;
  tone: "a" | "b";
  eyebrow: string;
  titleLines: string[];
  description: string;
  audience: string[];
  media: ReactNode;
  // در فصل‌های «b» (مثل مرجع) رسانه سمت راست می‌آید و روی موبایل زیر متن می‌رود.
  mediaFirst?: boolean;
  deliverables?: string[];
  steps: string[];
  ctaLabel: string;
  subpage: { href: string; label: string };
};

// یک فصل خدمت در صفحه‌ی خدمات، مطابق docs/design/services-redesign/index.html.
export default function ServiceChapter({
  id,
  tone,
  eyebrow,
  titleLines,
  description,
  audience,
  media,
  mediaFirst = false,
  deliverables,
  steps,
  ctaLabel,
  subpage,
}: ServiceChapterProps) {
  const sectionBg = tone === "a" ? "bg-[var(--svc-a)]" : "bg-[var(--svc-b)]";
  const cardBg = tone === "a" ? "bg-[var(--svc-card-a)]" : "bg-[var(--svc-card-b)]";
  const titleId = `${id}-title`;

  const text = (
    <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[22px]">
      <p className="text-[14px] font-bold text-[var(--svc-acc-t)]">{eyebrow}</p>
      <h2 id={titleId} className="text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.3]">
        {titleLines.map((line, i) => (
          <span key={line}>
            {i > 0 && <br />}
            {line}
          </span>
        ))}
      </h2>
      <p className="text-lg leading-[1.9] text-[var(--svc-ink2)]">{description}</p>
      <ul className="flex flex-wrap gap-2" aria-label="مناسب برای">
        {audience.map((who) => (
          <li
            key={who}
            className={`rounded-full border border-[var(--svc-line)] px-3.5 py-1.5 text-[13px] text-[var(--svc-ink5)] ${cardBg}`}
          >
            {who}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    // leading-[normal] مثل مرجع: متن‌هایی که ارتفاع خط مشخص ندارند با «normal» مرورگر چیده می‌شوند.
    <section id={id} aria-labelledby={titleId} className={`${sectionBg} leading-[normal] text-[var(--svc-ink)]`}>
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-8 py-[120px]">
        <div className={`flex items-center gap-14 ${mediaFirst ? "flex-wrap-reverse" : "flex-wrap"}`}>
          {mediaFirst ? (
            <>
              {media}
              {text}
            </>
          ) : (
            <>
              {text}
              {media}
            </>
          )}
        </div>

        {deliverables && deliverables.length > 0 && (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {deliverables.map((item) => (
              <li
                key={item}
                className={`flex flex-col gap-2 rounded-[22px] border border-[var(--svc-line)] p-7 ${cardBg}`}
              >
                <span className="text-[13px] font-bold text-[var(--svc-acc-t)]">تحویل می‌گیرید</span>
                <span className="text-lg font-bold leading-[1.7]">{item}</span>
              </li>
            ))}
          </ul>
        )}

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 border-t border-[var(--svc-line)] pt-8">
          {steps.map((step, i) => (
            <li key={step} className="flex flex-col gap-2.5">
              <span className="text-[28px] font-light text-[var(--svc-acc-t)]" aria-hidden="true">
                {(i + 1).toLocaleString("fa-IR")}
              </span>
              <span className="text-base leading-[1.8] text-[var(--svc-ink4)]">{step}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex min-h-14 items-center rounded-full bg-cta px-7 text-[16px] font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            {ctaLabel}
          </Link>
          <span className="text-[14px] text-[var(--svc-ink3)]">جلسه‌ی اول رایگان · بدون تعهد</span>
          {/* لینک داخلی به صفحه‌ی اختصاصی همین خدمت (با همان عنوان کارت قبلی، برای حفظ لینک‌سازی داخلی) */}
          <Link
            href={subpage.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-[var(--svc-ink)] underline decoration-[var(--svc-line2)] underline-offset-[6px] transition-colors duration-200 hover:text-[var(--svc-acc-t)] hover:decoration-current focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)] sm:ms-auto"
          >
            جزئیات کامل: {subpage.label}
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
