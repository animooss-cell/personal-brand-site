// روند همکاری (مرجع: docs/design/services-redesign/index.html).

const STEPS = [
  { title: "جلسه‌ی رایگان", text: "یک گفت‌وگوی کوتاه درباره‌ی وضعیت و هدف شما؛ بدون تعهد." },
  { title: "پیشنهاد مکتوب", text: "دامنه‌ی کار، زمان‌بندی و هزینه را شفاف و مکتوب دریافت می‌کنید." },
  { title: "اجرا و گزارش", text: "کار را با هم پیش می‌بریم و نتیجه را منظم گزارش می‌کنیم." },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="bg-[var(--svc-b)] leading-[normal] text-[var(--svc-ink)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-col gap-11 px-8 py-[120px]">
        <h2 id="process-title" className="text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.35]">
          همکاری چطور پیش می‌رود
        </h2>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {STEPS.map(({ title, text }, i) => (
            <li
              key={title}
              className="flex flex-col gap-3 rounded-[24px] border border-[var(--svc-line)] bg-[var(--svc-card-b)] p-8"
            >
              <span className="text-[40px] font-light leading-none text-[var(--svc-acc-t)]" aria-hidden="true">
                {(i + 1).toLocaleString("fa-IR")}
              </span>
              <span className="text-[20px] font-extrabold">{title}</span>
              <span className="text-[15px] leading-[1.9] text-[var(--svc-ink2)]">{text}</span>
            </li>
          ))}
        </ol>
        <p className="text-[15px] text-[var(--svc-ink2)]">
          هزینه پس از جلسه‌ی اول و بر اساس دامنه‌ی کار، شفاف و مکتوب مشخص می‌شود.
        </p>
      </div>
    </section>
  );
}
