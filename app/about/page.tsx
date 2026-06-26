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
  Landmark,
  Handshake,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteSettings } from "@/lib/types";

export const revalidate = 0;

export const metadata = {
  title: "درباره من | عبدالله احمدیان",
  description:
    "مشاور کسب‌وکار، متخصص هوش مصنوعی و کارآفرین — بیش از یک دهه تجربه در راه‌اندازی کسب‌وکار، مشاوره استارتاپ‌ها و پیاده‌سازی هوش مصنوعی در سازمان‌های بزرگ.",
};

const activities = [
  { icon: Briefcase, text: "مشاوره و توسعه کسب‌وکار و کارها" },
  { icon: Rocket, text: "بنیان‌گذار وبسایت Startuping.ir در حوزه استارتاپ‌ها" },
  { icon: PenTool, text: "مدیر تیم تولید محتوای Inmedia.ir" },
  { icon: CalendarDays, text: "برگزاری رویدادها و سمینارهای مرتبط با کسب‌وکار و کارهای نوپا" },
  { icon: GraduationCap, text: "تدریس با تمرکز بر تولید محتوا و بازاریابی" },
  {
    icon: Building2,
    text: 'مدیرعامل مرکز مشاوره کارآفرینی "ارزش آفرینان تجارت ایرانیان"',
  },
];

const aiExpertise = [
  "مشاور و مدرس دوره‌های آموزشی راه‌اندازی کسب‌وکار با هوش مصنوعی",
  "مشاور تیم هوش مصنوعی شرکت فولاد خوزستان",
  "مدرس دوره هوش مصنوعی در خدمت روابط عمومی برای شرکت فولاد خوزستان",
  "آموزش ابزارهای هوش مصنوعی برای فروش و بازاریابی شرکت فولاد خوزستان",
  "مشاور کانتنت مارکتینگ با هوش مصنوعی برای سازمان بسیج رسانه استان خوزستان",
];

const timeline = [
  {
    title: "ارگانایزر رویداد ملی فرآفرین",
    place: "تهران، اهواز، مسجد سلیمان، شوشتر (با جهاد دانشگاهی)",
  },
  {
    title: "مدیر اجرایی نمایشگاه بزرگ استارتاپ‌های خوزستان (الکام استارز)",
    place: "۹۶، ۹۷، ۹۸",
  },
  {
    title: "بنیان‌گذار رویداد تجربه‌محور کارآفرینان",
    place: "از ۹۲ تا کنون (همفکر، دیدار، همراه، حرف نو)",
  },
  {
    title: "دبیر اجرایی کمیسیون کسب‌وکارهای نوپا",
    place: "سازمان نظام صنفی رایانه استان خوزستان",
  },
  {
    title: "مربی استارتاپ ویکند",
    place: "۹۳ تا کنون — کرج، اهواز، کرمانشاه، شوشتر",
  },
  {
    title: "برگزارکننده رویداد بین‌المللی Inotexpitch",
    place: "اهواز، ۹۶",
  },
  {
    title: "مجری طرح بزرگ سرمایه‌گذاری رویش",
    place: "با بنیاد برکت",
  },
  {
    title: "مدیر اجرایی رویداد بین‌المللی هاکاهلت",
    place: "جزیره کیش، ۹۸ (وزارت بهداشت و دانشگاه شریف)",
  },
];

const specialties = [
  { icon: Award, text: "مدرک تخصصی PMBOK مدیریت پروژه از موسسه آریانا" },
  { icon: Landmark, text: "مدرک سطح ۱ مدیریت از وزارت صنایع و معادن" },
  { icon: Megaphone, text: "مدرک خبرنگاری به سبک رویترز" },
];

const collaborations = [
  "پارک علم و فناوری خوزستان",
  "استانداری خوزستان",
  "اداره تعاون، کار و امور اجتماعی خوزستان",
  "پارک پردیس نهاد ریاست جمهوری",
  "اکوسیستم استارتاپی کشور",
  "دانشگاه شریف مرکز کیش",
  "اداره ICT استان خوزستان",
  "شرکت فولاد خوزستان",
];

export default async function AboutPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).single();
  const s = settings as SiteSettings | null;

  const fullName = s?.full_name || "عبدالله احمدیان";
  const roleTitle = s?.role_title || "مشاور کسب‌وکار | متخصص هوش مصنوعی | کارآفرین";
  const avatarImage = s?.avatar_image || "/profile.png";

  return (
    <div dir="rtl">
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
        <p className="text-base leading-8 text-slate-600 md:text-lg">
          بیش از یک دهه تجربه در راه‌اندازی کسب‌وکار، مشاوره استارتاپ‌ها، و پیاده‌سازی هوش
          مصنوعی در سازمان‌های بزرگ. از اهواز تا کیش، از استارتاپ‌های نوپا تا شرکت‌های بزرگ
          صنعتی.
        </p>
      </section>

      {/* فعالیت‌های جاری */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          فعالیت‌های جاری
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.text}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="fade-in-up flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-5 transition-shadow duration-200 hover:shadow-md"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-sm leading-6 text-slate-700">{item.text}</p>
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
        <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          مسیر تجربه
        </h2>

        <div className="relative border-r-2 border-brand-100 pr-8">
          {timeline.map((item, idx) => (
            <div
              key={item.title}
              style={{ animationDelay: `${idx * 100}ms` }}
              className="fade-in-up relative mb-10 last:mb-0"
            >
              <span className="absolute -right-[2.55rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand ring-4 ring-brand-50" />
              <h3 className="mb-1.5 text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{item.place}</p>
            </div>
          ))}
        </div>
      </section>

      {/* تخصص‌ها */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          تخصص‌ها و مدارک
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {specialties.map((item) => {
            const Icon = item.icon;
            return (
              <span
                key={item.text}
                className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-5 py-3 text-sm font-medium text-brand-700"
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.text}
              </span>
            );
          })}
        </div>
      </section>

      {/* همکاری‌ها */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="mb-8 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          همکاری‌ها
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collaborations.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-white p-4 text-sm font-medium text-slate-700"
            >
              <Handshake className="h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
              {name}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
          آماده‌ای با هم کار کنیم؟
        </h2>
        <Link
          href="/contact"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
        >
          جلسه رایگان رزرو کن
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
