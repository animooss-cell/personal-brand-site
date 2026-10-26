import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { CONTACT_WHATSAPP_URL } from "@/lib/contactInfo";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="fade-in-up rounded-3xl bg-brand-dark px-8 py-14 text-center text-white md:py-16">
        <h2 className="text-3xl font-bold md:text-4xl">آماده‌اید کسب‌وکارتان را متحول کنید؟</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/90">
          در یک جلسه رایگان، مسیر دقیق پیاده‌سازی هوش مصنوعی در کسب‌وکار شما را بررسی می‌کنیم.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
          >
            رزرو جلسه رایگان
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <a
            href={CONTACT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-brand-dark"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            پیام در واتساپ
          </a>
        </div>
      </div>
    </section>
  );
}
