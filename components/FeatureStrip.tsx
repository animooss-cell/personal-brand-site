import { LayoutGrid, ShieldCheck, MessageCircle, type LucideIcon } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
};

const features: Feature[] = [
  {
    icon: LayoutGrid,
    title: "بررسی ساختاریافته",
    description: "فرآیندهای شفاف و گام‌به‌گام برای تحلیل دقیق وضعیت کسب‌وکار شما.",
  },
  {
    icon: ShieldCheck,
    title: "محرمانه و امن",
    description: "اطلاعات و داده‌های شما با بالاترین سطح محرمانگی بررسی می‌شود.",
    featured: true,
  },
  {
    icon: MessageCircle,
    title: "ارتباط شفاف",
    description: "یافته‌ها را بدون اصطلاحات پیچیده و واضح برایتان توضیح می‌دهیم.",
  },
];

export default function FeatureStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-3 inline-block text-sm font-medium text-brand-600">
          رویکرد محرمانه و هدفمند
        </span>
        <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
          مشاوران <span className="text-brand-600">باتجربه</span> کسب‌وکار
        </h2>
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
                  : "border border-gray-200 bg-white text-slate-900 hover:shadow-md"
              }`}
            >
              <div
                className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                  feature.featured ? "bg-white/15 text-white" : "bg-brand-50 text-brand-600"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
              <p
                className={`text-sm leading-6 ${
                  feature.featured ? "text-white/80" : "text-slate-600"
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
