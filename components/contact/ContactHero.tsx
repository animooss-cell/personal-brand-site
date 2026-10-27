import Image from "next/image";
import type { ReactNode } from "react";
import { Check, MessageCircle, Phone, Send } from "lucide-react";
import {
  CONTACT_PHONE_DISPLAY_FA,
  CONTACT_PHONE_TEL_HREF,
  CONTACT_TELEGRAM_URL,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contactInfo";

// بالای صفحه‌ی تماس: ستون اطمینان‌بخش + کارت فرم (مرجع: docs/design/contact-redesign/index.html).
// روی دسکتاپ مثل مرجع دو ستون است؛ روی موبایل و تبلت کارت فرم درست بعد از تیتر می‌آید تا در صفحه‌ی اول دیده شود.

const BADGES = ["رایگان", "بدون تعهد", "حضوری در اهواز یا آنلاین"];

const pill =
  "inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[var(--svc-line2)] px-4 text-[14px] font-medium text-[var(--svc-ink)] transition-colors duration-200 hover:border-[var(--svc-acc-t)] hover:text-[var(--svc-acc-t)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--svc-acc-t)]";
const pillIcon = "h-[18px] w-[18px] shrink-0 text-[var(--svc-acc-t)]";

export default function ContactHero({ title, form }: { title: string; form: ReactNode }) {
  return (
    // پس‌زمینه تا پشت هدر شناور سایت (top-4 + ۶۶px = ۸۲px) ادامه پیدا می‌کند؛ خودِ هدر دست نمی‌خورد.
    <section className="-mt-[82px] bg-[var(--svc-a)] leading-[normal] text-[var(--svc-ink)]">
      <div className="mx-auto grid max-w-[1240px] gap-y-14 px-8 pb-[104px] pt-[154px] min-[1080px]:grid-cols-[calc(50%-68px)_minmax(0,1fr)] min-[1080px]:grid-rows-[auto_1fr] min-[1080px]:gap-x-14 min-[1080px]:gap-y-7">
        <div className="flex min-w-0 flex-col gap-7 pt-3">
          <p className="text-[15px] font-medium text-[var(--svc-ink3)]">تماس · جلسه‌ی مشاوره‌ی رایگان</p>
          <h1 className="text-[clamp(40px,5vw,68px)] font-extrabold leading-[1.2]">{title}</h1>
          <p className="max-w-[520px] text-[19px] leading-[1.9] text-[var(--svc-ink2)]">
            یک گفت‌وگوی ۴۵ دقیقه‌ای و رایگان؛ با هم پیدا می‌کنیم هوش مصنوعی کجای کار شما واقعاً جواب می‌دهد.
          </p>
        </div>

        <div className="min-w-0 min-[1080px]:col-start-2 min-[1080px]:row-span-2 min-[1080px]:row-start-1">{form}</div>

        <div className="flex min-w-0 flex-col gap-7 min-[1080px]:col-start-1 min-[1080px]:row-start-2">
          <ul className="flex flex-wrap gap-2.5">
            {BADGES.map((badge) => (
              <li
                key={badge}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--svc-line2)] px-4 py-2 text-[14px] font-medium"
              >
                <Check className="h-4 w-4 shrink-0 text-[var(--svc-acc-t)]" strokeWidth={2.4} aria-hidden="true" />
                {badge}
              </li>
            ))}
          </ul>

          <div className="flex max-w-[460px] items-center gap-[18px] rounded-[22px] border border-[var(--svc-line)] bg-[var(--svc-card-a)] p-5">
            <Image
              src="/images/contact/avatar.jpg"
              alt="عبدالله احمدیان"
              width={72}
              height={72}
              className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-[17px] font-bold">عبدالله احمدیان</span>
              <span className="text-[14px] text-[var(--svc-ink2)]">مشاور هوش مصنوعی کسب‌وکار</span>
              <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--svc-acc-t)]">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cta" />
                ظرف ۲۴ ساعت پاسخ می‌دهم
              </span>
            </div>
          </div>

          <div className="flex max-w-[460px] flex-col gap-3">
            <span id="contact-direct-label" className="text-[14px] text-[var(--svc-ink3)]">
              یا مستقیم پیام بدهید
            </span>
            {/* همان لینک‌های فوتر (lib/contactInfo) */}
            <ul aria-labelledby="contact-direct-label" className="flex flex-wrap gap-2">
              <li>
                <a href={CONTACT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={pill}>
                  <MessageCircle className={pillIcon} aria-hidden="true" />
                  واتس‌اپ
                </a>
              </li>
              <li>
                <a href={CONTACT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={pill}>
                  <Send className={pillIcon} aria-hidden="true" />
                  تلگرام
                </a>
              </li>
              <li>
                <a href={CONTACT_PHONE_TEL_HREF} aria-label={`تماس تلفنی ${CONTACT_PHONE_DISPLAY_FA}`} className={pill}>
                  <Phone className={pillIcon} aria-hidden="true" />
                  <span dir="ltr" className="[unicode-bidi:isolate]">
                    {CONTACT_PHONE_DISPLAY_FA}
                  </span>
                </a>
              </li>
            </ul>
            <span className="text-[13px] text-[var(--svc-ink3)]">شنبه تا پنجشنبه، ۹ تا ۱۸</span>
          </div>
        </div>
      </div>
    </section>
  );
}
