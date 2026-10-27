import { Plus } from "lucide-react";
import { SERVICES_FAQ } from "@/components/services/faq";

// سؤالات رایج با details/summary؛ باز و بسته شدن کار خود مرورگر است و با Enter و Space هم کار می‌کند.
// اسکیمای FAQPage در app/services/page.tsx از همین SERVICES_FAQ ساخته می‌شود.
export default function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-[var(--svc-a)] leading-[normal] text-[var(--svc-ink)]">
      <div className="mx-auto flex max-w-[880px] flex-col gap-8 px-8 py-[120px]">
        <h2 id="faq-title" className="text-[clamp(30px,3.6vw,48px)] font-extrabold leading-[1.35]">
          سؤالات رایج
        </h2>
        <div className="flex flex-col">
          {SERVICES_FAQ.map(({ question, answer }, i) => (
            <details
              key={question}
              open={i === 0}
              className="group border-t border-[var(--svc-line)] py-[22px] last:border-b"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-[18px] font-bold transition-colors duration-200 hover:text-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--svc-acc-t)] [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  className="h-4 w-4 shrink-0 text-[var(--svc-acc-t)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-[16px] leading-[1.9] text-[var(--svc-ink2)]">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
