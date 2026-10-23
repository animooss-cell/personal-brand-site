import { Briefcase, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
};

const features: Feature[] = [
  {
    icon: Briefcase,
    title: "بیش از ۱۰ سال در دل کسب‌وکارها",
    description: "راه‌اندازی کسب‌وکار، مربیگری استارتاپ ویکند و برگزاری رویدادهای کارآفرینی در خوزستان.",
  },
  {
    icon: GraduationCap,
    title: "آموزش در سازمان‌های صنعتی",
    description: "دوره‌های هوش مصنوعی برای روابط عمومی و کارکنان فولاد خوزستان، روی کارهای واقعی خودشان.",
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: "ابزار متناسب با شرایط ایران",
    description: "پیشنهادها با در نظر گرفتن تحریم، پرداخت و امنیت اطلاعات است، نه فقط ابزار مد روز.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-3 inline-block text-sm font-medium text-brand-600">چرا من؟</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">چرا با من کار کنید؟</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              style={{ animationDelay: `${idx * 120}ms` }}
              className={`fade-in-up rounded-3xl p-7 transition-shadow duration-200 ${
                feature.featured
                  ? "bg-gradient-to-br from-brand-700 to-brand-900 text-white shadow-lg"
                  : "border border-gray-200 bg-white text-slate-900 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              }`}
            >
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  feature.featured ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600 dark:bg-brand-900/30"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p
                className={`text-sm leading-6 ${
                  feature.featured ? "text-white/80" : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
