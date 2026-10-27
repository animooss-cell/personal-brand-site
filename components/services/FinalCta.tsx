import Image from "next/image";
import Link from "next/link";
import { CONTACT_TELEGRAM_URL, CONTACT_WHATSAPP_URL } from "@/lib/contactInfo";

// فراخوان پایانی صفحه‌ی خدمات (مرجع: docs/design/services-redesign/index.html).
// رزرو جلسه به همان صفحه‌ی تماس می‌رود؛ لینک‌های واتس‌اپ و تلگرام همان لینک‌های فوتر (lib/contactInfo) هستند.

const outline =
  "inline-flex min-h-[60px] items-center rounded-full border border-[var(--svc-line2)] px-6 text-[15px] font-medium text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] hover:text-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]";

export default function FinalCta() {
  return (
    <section
      aria-labelledby="final-cta-title"
      className="border-t border-[var(--svc-line)] bg-[var(--svc-b)] leading-[normal] text-[var(--svc-ink)]"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-8 py-[120px]">
        <div className="relative aspect-square min-w-0 flex-[0_1_380px] overflow-hidden rounded-[28px] bg-[#0f2a22]">
          <Image
            src="/images/services/portrait.jpg"
            alt="عبدالله احمدیان"
            fill
            sizes="380px"
            className="object-cover object-[50%_30%]"
          />
        </div>
        <div className="flex min-w-0 flex-[1_1_460px] flex-col gap-6">
          <h2 id="final-cta-title" className="text-[clamp(32px,4vw,56px)] font-extrabold leading-[1.3]">
            مطمئن نیستید از کجا شروع کنید؟
          </h2>
          <p className="text-[19px] leading-[1.9] text-[var(--svc-ink2)]">
            در یک جلسه‌ی کوتاه و رایگان، با هم پیدا می‌کنیم کدام خدمت دقیقاً به کار شما می‌آید.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/contact"
              className="inline-flex min-h-[58px] items-center rounded-full bg-cta px-[30px] text-[17px] font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
            >
              رزرو جلسه مشاوره رایگان
            </Link>
            <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={outline}>
              پیام در واتس‌اپ
            </a>
            <a href={CONTACT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={outline}>
              پیام در تلگرام
            </a>
          </div>
          <p className="text-[14px] text-[var(--svc-ink3)]">عبدالله احمدیان — مشاور هوش مصنوعی کسب‌وکار</p>
        </div>
      </div>
    </section>
  );
}
