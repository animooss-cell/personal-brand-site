import { MapPin, Plus } from "lucide-react";
import { CONTACT_CITY, CONTACT_FAQ, CONTACT_HOURS_LABEL, CONTACT_REGION } from "@/components/contact/contactFaq";

// «پیش از رزرو» با details/summary (باز و بسته شدن کار خود مرورگر است و با Enter و Space هم کار می‌کند) + خط محل و ساعات.
// اسکیمای FAQPage در app/contact/page.tsx از همین CONTACT_FAQ ساخته می‌شود.
export default function ContactFaq() {
  return (
    <section
      aria-labelledby="contact-faq-title"
      className="border-t border-[var(--svc-line)] bg-[var(--svc-a)] leading-[normal] text-[var(--svc-ink)]"
    >
      <div className="mx-auto flex max-w-[880px] flex-col gap-7 px-8 pb-[104px] pt-[88px]">
        <h2 id="contact-faq-title" className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.4]">
          پیش از رزرو
        </h2>
        <div className="flex flex-col">
          {CONTACT_FAQ.map(({ question, answer }, i) => (
            <details
              key={question}
              open={i === 0}
              className="group border-t border-[var(--svc-line)] py-5 last:border-b"
            >
              <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-[18px] font-bold transition-colors duration-200 hover:text-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--svc-acc-t)] [&::-webkit-details-marker]:hidden">
                {question}
                <Plus
                  className="h-4 w-4 shrink-0 text-[var(--svc-acc-t)] transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-2.5 text-[16px] leading-[1.9] text-[var(--svc-ink2)]">{answer}</p>
            </details>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-2 text-[15px] text-[var(--svc-ink2)]">
          <MapPin className="h-[18px] w-[18px] shrink-0 text-[var(--svc-acc-t)]" aria-hidden="true" />
          {CONTACT_CITY}، {CONTACT_REGION} · ساعات پاسخ‌گویی: {CONTACT_HOURS_LABEL}
        </p>
      </div>
    </section>
  );
}
