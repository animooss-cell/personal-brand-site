import { Check } from "lucide-react";

// «بعد از ارسال»: سه قدم از درخواست تا جلسه (مرجع: docs/design/contact-redesign/index.html).
// هر قدم خط خودش را دارد و دایره روی همان خط می‌نشیند؛ روی موبایل قدم‌ها زیر هم می‌آیند و دایره روی خط هر قدم می‌ماند.

const STEPS = [
  {
    badge: "همین حالا",
    title: "درخواست شما ثبت می‌شود",
    text: "موضوعی که انتخاب کرده‌اید و راه ارتباطی‌تان به دستم می‌رسد تا پیش از تماس آماده باشم.",
  },
  {
    badge: "ظرف ۲۴ ساعت",
    title: "زمان جلسه را هماهنگ می‌کنیم",
    text: "از همان راهی که خواسته‌اید پیام می‌دهم و یک زمان مناسب، شنبه تا پنجشنبه، انتخاب می‌کنیم.",
  },
  {
    badge: "۴۵ دقیقه · رایگان",
    title: "جلسه‌ی مشاوره",
    text: "حضوری در اهواز یا آنلاین. وضعیت کارتان را با هم بررسی می‌کنیم و قدم بعدی مشخص را پیشنهاد می‌دهم.",
  },
];

export default function ContactNextSteps() {
  return (
    <section
      aria-labelledby="next-steps-title"
      className="border-t border-[var(--svc-line)] bg-[var(--svc-b)] leading-[normal] text-[var(--svc-ink)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-8 py-[104px]">
        <div className="flex max-w-[680px] flex-col gap-3.5">
          <p className="text-[14px] font-bold text-[var(--svc-acc-t)]">بعد از ارسال</p>
          <h2 id="next-steps-title" className="text-[clamp(30px,3.8vw,52px)] font-extrabold leading-[1.3]">
            از درخواست تا جلسه،
            <br />
            در سه قدم.
          </h2>
          <p className="text-[18px] leading-[1.9] text-[var(--svc-ink2)]">
            بدون انتظار مبهم؛ دقیقاً می‌دانید کی و چطور خبرتان می‌کنم.
          </p>
        </div>

        <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-8 gap-y-12">
          {STEPS.map(({ badge, title, text }, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li
                key={title}
                className={`flex flex-col gap-4 border-t-2 ${last ? "border-cta" : "border-[var(--svc-line2)]"}`}
              >
                <span
                  aria-hidden="true"
                  className={`-mt-[25px] inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 text-[18px] font-bold ${
                    last ? "border-cta bg-cta" : "border-[var(--svc-line2)] bg-[var(--svc-b)] text-[var(--svc-ink)]"
                  }`}
                >
                  {last ? (
                    <Check className="h-[22px] w-[22px] text-cta-fg" strokeWidth={2.6} />
                  ) : (
                    (i + 1).toLocaleString("fa-IR")
                  )}
                </span>
                <span className="self-start rounded-full bg-[var(--ct-badge-bg)] px-3 py-[5px] text-[13px] font-bold text-[var(--svc-acc-t)]">
                  {badge}
                </span>
                <h3 className="text-[22px] font-extrabold">{title}</h3>
                <p className="text-[16px] leading-[1.9] text-[var(--svc-ink2)]">{text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
