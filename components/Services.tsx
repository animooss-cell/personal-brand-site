import { Rocket, Brain, TrendingUp, type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  audience: string[];
  steps: string[];
  featured?: boolean;
};

const services: Service[] = [
  {
    icon: Rocket,
    title: "راه‌اندازی و رشد استارتاپ",
    subtitle: "از ایده تا مدل کسب و کار پایدار",
    description:
      "خیلی‌ها با ایده عالی شروع می‌کنن، ولی بدون یه نقشه راه مشخص، وقت و پول هدر می‌ره. با هم بررسی می‌کنیم ایده‌ات واقعاً بازار داره یا نه — قبل از اینکه یه ریال خرج کنی.",
    audience: ["ایده‌پردازها", "استارتاپ‌های مرحله اول", "کسب و کارهای نوپا"],
    steps: [
      "اعتبارسنجی ایده و بازار هدف",
      "طراحی مدل درآمدی واقع‌بینانه",
      "نقشه راه ۶ ماهه اجرایی",
      "آمادگی برای سرمایه‌گذار",
    ],
  },
  {
    icon: Brain,
    title: "هوش مصنوعی در کسب و کار",
    subtitle: "نه فقط تکنولوژی — نتیجه واقعی",
    description:
      "همه می‌گن «باید از AI استفاده کنیم» ولی کمتر کسی می‌دونه کجا و چطور. من کمک می‌کنم جاهایی پیدا کنی که هوش مصنوعی مستقیماً وقت و هزینه‌ات رو کم می‌کنه — نه فقط یه ابزار جدید که بهش یاد بگیری.",
    audience: ["صاحبان کسب و کار", "تیم‌های مدیریتی", "استارتاپ‌های B2B"],
    steps: [
      "شناسایی فرصت‌های AI در جریان کار",
      "انتخاب ابزار مناسب (نه هر چیزی که مد شده)",
      "پیاده‌سازی و تست با تیم",
      "اندازه‌گیری نتیجه و بهینه‌سازی",
    ],
    featured: true,
  },
  {
    icon: TrendingUp,
    title: "دیجیتال مارکتینگ هدفمند",
    subtitle: "جذب مشتری، نه فقط فالوور",
    description:
      "پست گذاشتن و تبلیغ دادن به‌تنهایی کافی نیست. مشکل اصلی اینه که اکثر کسب و کارها بدون استراتژی بودجه هدر می‌دن. باهم یه فانل فروش می‌سازیم که آدم رو از «شنیدن اسمت» به «خریدن ازت» می‌رسونه.",
    audience: ["کسب و کارهای آنلاین", "برندهای در حال رشد", "فروشگاه‌های دیجیتال"],
    steps: [
      "آدیت وضعیت فعلی دیجیتال",
      "طراحی فانل فروش",
      "اجرا و تست کمپین",
      "گزارش و بهینه‌سازی ماهانه",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">خدمات</h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          هر کسب و کاری در یه مرحله‌ای گیر می‌کنه. من کمک می‌کنم بفهمی کجایی، چرا گیر کردی، و
          دقیقاً چی باید انجام بدی.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={service.title}
              style={{ animationDelay: `${idx * 120}ms` }}
              className={`fade-in-up relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md ${
                service.featured
                  ? "border-2 border-brand md:-translate-y-3 md:shadow-lg"
                  : "border-gray-200"
              }`}
            >
              {service.featured && (
                <span className="absolute -top-3 right-8 rounded-full bg-brand px-4 py-1 text-xs font-bold text-white shadow">
                  تخصص کلیدی
                </span>
              )}

              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  service.featured ? "bg-brand text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="mb-1 text-xl font-bold text-slate-900">{service.title}</h3>
              <p className="mb-4 text-sm font-medium text-brand-600">{service.subtitle}</p>
              <p className="mb-5 text-sm leading-6 text-slate-600">{service.description}</p>

              <div className="mb-6 flex flex-wrap gap-2">
                {service.audience.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mb-8 grid grid-cols-2 gap-3">
                {service.steps.map((step, i) => (
                  <div
                    key={step}
                    className="rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-700"
                  >
                    <span className="mb-1 block font-bold text-brand-600">{`گام ${i + 1}`}</span>
                    {step}
                  </div>
                ))}
              </div>

              <a
                href="/contact"
                className={`mt-auto inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-200 ${
                  service.featured
                    ? "bg-brand text-white hover:bg-brand-600"
                    : "bg-slate-900 text-white hover:bg-slate-700"
                }`}
              >
                جلسه رایگان رزرو کن
              </a>
              <p className="mt-3 text-center text-xs text-slate-400">
                بدون تعهد — فقط یه مکالمه صادقانه
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
