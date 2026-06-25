import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="fade-in-up rounded-3xl bg-brand px-8 py-14 text-center text-white md:py-16">
        <h2 className="text-3xl font-bold md:text-4xl">آماده‌اید کسب‌وکارتان را متحول کنید؟</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/90">
          در یک جلسه رایگان، مسیر دقیق پیاده‌سازی هوش مصنوعی در کسب‌وکار شما را بررسی می‌کنیم.
        </p>
        <Link
          href="/contact"
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 shadow-sm transition-colors duration-200 hover:bg-brand-50"
        >
          رزرو جلسه رایگان
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
