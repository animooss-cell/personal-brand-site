import { ArrowLeft } from "lucide-react";
import { SERVICE_SECTIONS } from "@/components/services/sections";

export default function ServicesHero({ title }: { title: string }) {
  return (
    // پس‌زمینه تا بالای صفحه، پشت هدر شناور سایت (top-4 + ۶۶px = ۸۲px) ادامه پیدا می‌کند؛ خودِ هدر دست نمی‌خورد.
    <section className="-mt-[82px] bg-[var(--svc-a)] text-[var(--svc-ink)]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 px-8 pb-[104px] pt-[178px]">
        <div className="flex max-w-[900px] flex-col gap-6">
          <p className="text-[15px] font-medium text-[var(--svc-ink3)]">خدمات · از مشاوره تا آموزش</p>
          <h1 className="text-[clamp(38px,5.2vw,72px)] font-extrabold leading-[1.25]">{title}</h1>
          <p className="max-w-[640px] text-[19px] leading-[1.9] text-[var(--svc-ink2)]">
            برای کسب‌وکارها و سازمان‌های خوزستان؛ از اولین قدم پیاده‌سازی هوش مصنوعی تا رشد، تولید محتوا و آموزش تیم.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="text-[22px] font-bold">از کجا شروع کنیم؟</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
            {SERVICE_SECTIONS.map(({ id, need, service }) => (
              <a
                key={id}
                href={`#${id}`}
                className="group flex min-h-[168px] flex-col justify-between gap-5 rounded-[22px] border border-[var(--svc-line)] bg-[var(--svc-card-a)] p-[26px] text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]"
              >
                <span className="text-[19px] font-bold leading-[1.7] transition-colors duration-200 group-hover:text-[var(--svc-acc-t)]">
                  {need}
                </span>
                <span className="flex items-center justify-between text-sm text-[var(--svc-ink2)]">
                  {service}
                  <ArrowLeft className="h-5 w-5 shrink-0 text-[var(--svc-acc-t)]" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
