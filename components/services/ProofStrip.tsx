const PARTNERS = ["فولاد خوزستان", "رسانه بسیج خوزستان", "فولاد اکسین خوزستان"];

const STATS = [
  { value: "+۱۰ سال", label: "تجربه در رشد کسب‌وکار" },
  { value: "+۳۲ ساعت", label: "آموزش سازمانی" },
  { value: "+۴۰ نفر", label: "مدیر، رئیس و کارشناس آموزش‌دیده" },
];

export default function ProofStrip() {
  return (
    <section aria-label="سوابق" className="border-y border-[var(--svc-line)] bg-[var(--svc-b)] text-[var(--svc-ink)]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8 px-8 py-11">
        <div className="flex flex-wrap items-center gap-4">
          <span className="ml-2 text-sm text-[var(--svc-ink3)]">همکاری‌های اخیر</span>
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="inline-flex min-h-[58px] items-center rounded-[14px] border border-[var(--svc-line2)] px-6 text-base font-bold text-[var(--svc-ink4)]"
            >
              {name}
            </span>
          ))}
        </div>
        <dl className="flex flex-wrap gap-10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col-reverse gap-0.5">
              <dt className="text-[13px] text-[var(--svc-ink2)]">{label}</dt>
              <dd className="text-[32px] font-extrabold">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
