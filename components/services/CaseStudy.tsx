import Image from "next/image";

// نمونه‌ی واقعی: روابط عمومی فولاد خوزستان (مرجع: docs/design/services-redesign/index.html).

const COLUMNS = [
  {
    label: "مسئله",
    text: "برای محتوای شبکه‌های اجتماعی به طراح گرافیک و قرارداد بیرونی وابسته بودند و خبرنویسی و تهیه‌ی بیانیه وقت زیادی می‌گرفت.",
  },
  {
    label: "کاری که کردیم",
    text: "۱۶ ساعت آموزش کاربردی: نوشتن خبر و بیانیه با ChatGPT، ساخت پوستر، کار با NotebookLM و پرامپت‌نویسی.",
  },
  {
    label: "نتیجه",
    text: "تیم از قرارداد با طراح بیرونی بی‌نیاز شد و خبر، بیانیه، کپشن اینستاگرام و محتوای سوشیال را خودش، سریع‌تر و با هزینه‌ی بسیار کمتر تهیه می‌کند.",
    result: true,
  },
];

export default function CaseStudy() {
  return (
    <section aria-labelledby="case-title" className="bg-[var(--svc-a)] leading-[normal] text-[var(--svc-ink)]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-11 px-8 py-[120px]">
        <div className="flex max-w-[760px] flex-col gap-3.5">
          <p className="text-[14px] font-bold text-[var(--svc-acc-t)]">نمونه‌ی واقعی</p>
          <h2 id="case-title" className="text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.35]">
            هوش مصنوعی برای روابط عمومی فولاد خوزستان
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-8">
          {COLUMNS.map(({ label, text, result }) => (
            <div
              key={label}
              className={`flex flex-col gap-2.5 border-t-2 pt-5 ${result ? "border-[var(--svc-acc-t)]" : "border-[var(--svc-ink)]"}`}
            >
              <span
                className={`text-[13px] font-bold ${result ? "text-[var(--svc-acc-t)]" : "text-[var(--svc-ink3)]"}`}
              >
                {label}
              </span>
              <span className="text-[17px] leading-[1.9] text-[var(--svc-ink4)]">{text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-stretch gap-6">
          <div className="relative aspect-[4/3] min-w-0 flex-[1_1_420px] overflow-hidden rounded-[24px]">
            <Image
              src="/images/services/group.jpg"
              alt="عبدالله احمدیان در کنار تیم روابط عمومی فولاد خوزستان"
              fill
              sizes="(max-width: 1024px) 100vw, 576px"
              className="object-cover"
            />
          </div>
          <figure className="flex min-w-0 flex-[1_1_420px] flex-col justify-center gap-5 rounded-[24px] border border-[var(--svc-line)] bg-[var(--svc-card-a)] p-10">
            <blockquote>
              <p className="text-[22px] font-light leading-[2] text-[var(--svc-ink)]">
                «برگزاری این دوره در تیم روابط عمومی فولاد خوزستان سبب شده پیام ما در کانال، وب‌سایت و شبکه‌های اجتماعی
                فولاد خوزستان جذاب‌تر و با تأثیرگذاری عمیق‌تری به مخاطب منتقل شود.»
              </p>
            </blockquote>
            <figcaption className="flex flex-col gap-0.5">
              <span className="text-[16px] font-bold text-[var(--svc-ink)]">دکتر محمد جامعی</span>
              <span className="text-[14px] text-[var(--svc-ink2)]">مدیر روابط عمومی فولاد خوزستان</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
