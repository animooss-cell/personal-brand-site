import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Rocket,
  PenTool,
  CalendarDays,
  GraduationCap,
  Building2,
  Brain,
  Cpu,
  Megaphone,
  Radio,
  Award,
  Handshake,
  Instagram,
  Send,
  MessageCircle,
  Twitter,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";
import AboutContactForm from "@/components/AboutContactForm";
import { ENTITY_STATEMENT_FA } from "@/lib/site";
import { getAboutPageData } from "@/lib/about";
import { buildPersonJsonLd } from "@/lib/schema";
import { toWhatsappHref } from "@/lib/social";
import { serializeJsonLd } from "@/lib/post-content";

export const revalidate = 300;

const aboutTitle = "درباره من | مشاور هوش مصنوعی اهواز";
const aboutDescription =
  "عبدالله احمدیان، مشاور هوش مصنوعی اهواز و مشاوره کسب و کار اهواز با بیش از یک دهه تجربه در راه‌اندازی استارتاپ، آموزش هوش مصنوعی خوزستان و اتوماسیون کسب‌وکار با هوش مصنوعی برای سازمان‌های صنعتی.";

export const metadata: Metadata = {
  title: aboutTitle,
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: aboutTitle,
    description: aboutDescription,
    url: "/about",
    type: "profile",
  },
};

const activityIcons = [Briefcase, Rocket, PenTool, CalendarDays, GraduationCap, Building2];

export default async function AboutPage() {
  const {
    fullName,
    roleTitle,
    avatarImage,
    shortBio,
    fullBio,
    activities,
    aiExpertise,
    specialties,
    collaborations,
    timelineItems,
    socialLinks,
    phoneNumbers,
  } = await getAboutPageData();

  const socialItems = [
    { key: "instagram", label: "اینستاگرام", icon: Instagram, href: socialLinks.instagram },
    { key: "telegram", label: "تلگرام", icon: Send, href: socialLinks.telegram },
    {
      key: "whatsapp",
      label: "واتساپ",
      icon: MessageCircle,
      href: socialLinks.whatsapp ? toWhatsappHref(socialLinks.whatsapp) : "",
    },
    { key: "twitter", label: "ایکس", icon: Twitter, href: socialLinks.twitter },
  ].filter((item) => item.href);

  const personJsonLd = buildPersonJsonLd({ jobTitle: roleTitle, image: avatarImage });

  return (
    <div dir="rtl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
      />

      {/* هدر */}
      <section className="px-4 pt-6 md:px-8">
        <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900 px-6 py-16 text-center md:py-24">
          <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-white/10 md:h-40 md:w-40">
            <Image
              src={avatarImage}
              alt={fullName}
              width={160}
              height={160}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{fullName}</h1>
          <p className="mt-4 text-base font-medium text-brand-200 md:text-lg">{roleTitle}</p>
        </div>
      </section>

      {/* معرفی کوتاه */}
      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="mb-4 text-lg font-bold leading-8 text-slate-900 dark:text-white md:text-xl">{ENTITY_STATEMENT_FA}</p>
        <p className="text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">{shortBio}</p>
      </section>

      {/* بیوگرافی کامل */}
      {fullBio && (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <div className="whitespace-pre-line text-base leading-8 text-slate-600 dark:text-slate-300">{fullBio}</div>
        </section>
      )}

      {/* فعالیت‌های جاری */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          فعالیت‌های جاری
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((text, idx) => {
            const Icon = activityIcons[idx % activityIcons.length];
            return (
              <div
                key={text}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="fade-in-up flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-900/30">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">{text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* تخصص هوش مصنوعی */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="fade-in-up overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900 px-6 py-12 text-white md:px-12 md:py-16">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <Brain className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="text-2xl font-bold md:text-3xl">تخصص هوش مصنوعی</h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {aiExpertise.map((text, idx) => {
              const icons = [Brain, Cpu, Radio, Megaphone, Radio];
              const Icon = icons[idx % icons.length];
              return (
                <div
                  key={text}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className="fade-in-up flex items-start gap-3 rounded-2xl bg-white/10 p-5"
                >
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <p className="text-sm leading-6 text-white/90">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline تجربیات */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          مسیر تجربه
        </h2>

        <div className="relative border-r-2 border-brand-100 pr-8 dark:border-brand-900">
          {timelineItems.map((item, idx) => (
            <div
              key={"id" in item ? item.id : item.title}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="fade-in-up relative mb-10 last:mb-0"
            >
              <span className="absolute -right-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-brand-50 dark:ring-brand-900/40" />
              <h3 className="mb-1.5 text-base font-bold text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">{item.place}</p>
            </div>
          ))}
        </div>
      </section>

      {/* تخصص‌ها */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          تخصص‌ها و مدارک
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {specialties.map((text) => (
            <span
              key={text}
              className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300"
            >
              <Award className="h-4 w-4" aria-hidden="true" />
              {text}
            </span>
          ))}
        </div>
      </section>

      {/* همکاری‌ها */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          همکاری‌ها
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collaborations.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <Handshake className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* شبکه‌های اجتماعی و راه‌های تماس */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          راه‌های ارتباطی
        </h2>

        {socialItems.length > 0 && (
          <div className="mb-8 flex justify-center gap-4">
            {socialItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.key}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-brand-200 text-brand-600 transition-colors duration-200 hover:bg-brand hover:text-white dark:border-brand-800"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        )}

        {phoneNumbers.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {phoneNumbers.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                dir="ltr"
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-brand hover:text-brand-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              >
                <Phone className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {phone}
              </a>
            ))}
          </div>
        )}
      </section>

      {/* فرم ارسال پیام */}
      <section className="mx-auto max-w-3xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          پیام بدهید
        </h2>
        <AboutContactForm />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          آماده‌ای با هم کار کنیم؟
        </h2>
        <Link
          href="/contact"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-cta px-7 py-3.5 text-base font-semibold text-cta-fg shadow-sm transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white"
        >
          جلسه رایگان رزرو کن
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
