import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Briefcase, Rocket, GraduationCap } from "lucide-react";
import { getSettings } from "@/lib/data";

const trustItems = [
  { icon: Briefcase, label: "+۱۰ سال تجربه" },
  { icon: Rocket, label: "مربی استارتاپ ویکند" },
  { icon: GraduationCap, label: "آموزش در فولاد خوزستان" },
];

export default async function Hero() {
  const s = await getSettings();

  const badge = s?.hero_badge || "مشاوره کسب‌وکار و هوش مصنوعی";
  const titlePrefix = s?.hero_title_prefix || "کسب‌وکار خود را با";
  const titleHighlight = s?.hero_title_highlight || "قدرت هوش مصنوعی";
  const titleSuffix = s?.hero_title_suffix || "رشد دهید";
  const description =
    s?.hero_description ||
    "از راه‌اندازی استارتاپ تا اتوماسیون فرآیندها و کانتنت مارکتینگ هدفمند؛ با مشاوره عملی، نتیجه‌محور و بدون پیچیدگی فنی.";
  const image = s?.hero_image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80";
  const primaryCta = s?.hero_primary_cta || "رزرو جلسه مشاوره رایگان";
  const secondaryCta = s?.hero_secondary_cta || "مطالعه مقالات";
  const trustText = s?.hero_trust_text || "مورد اعتماد بیش از ۵۰۰ کسب‌وکار";

  return (
    <section className="px-4 pt-6 md:px-8">
      <div className="fade-in-up mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-brand-900 to-slate-900">
        <div className="grid items-center gap-8 px-6 py-12 md:grid-cols-2 md:px-12 md:py-16">
          <div className="order-2 md:order-1">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-medium text-brand-100">
              <BadgeCheck className="h-4 w-4" aria-hidden="true" />
              {badge}
            </span>

            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              {titlePrefix}{" "}
              <span className="text-brand-300">{titleHighlight}</span> {titleSuffix}
            </h1>

            <p className="mt-4 max-w-xl text-base font-medium leading-7 text-brand-100 md:text-lg">
              هر کسب‌وکاری جایی گیر می‌کند. کمک می‌کنم بفهمید کجای کار هستید، چرا گیر کرده‌اید و
              دقیقاً چه باید بکنید.
            </p>

            <p className="mt-3 max-w-xl text-base leading-7 text-slate-300">{description}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-600"
              >
                {primaryCta}
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/blog"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                {secondaryCta}
              </Link>
            </div>

            <div className="mt-9">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustItems.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-slate-300">
                    <Icon className="h-4 w-4 text-brand-300" aria-hidden="true" />
                    {label}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-400">{trustText}</p>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={image}
                alt={badge}
                width={800}
                height={900}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-[280px] w-full object-cover md:h-[420px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
