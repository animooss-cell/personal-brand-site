import * as Icons from "lucide-react";
import { Rocket, type LucideIcon } from "lucide-react";
import { getServices } from "@/lib/data";

function resolveIcon(name: string): LucideIcon {
  const icon = (Icons as unknown as Record<string, LucideIcon>)[name];
  return icon || Rocket;
}

export default async function Services() {
  const services = await getServices();

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
          const Icon = resolveIcon(service.icon);
          return (
            <div
              key={service.id}
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
              {service.subtitle && (
                <p className="mb-4 text-sm font-medium text-brand-600">{service.subtitle}</p>
              )}
              {service.description && (
                <p className="mb-5 text-sm leading-6 text-slate-600">{service.description}</p>
              )}

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

        {!services.length && (
          <p className="col-span-3 text-center text-slate-400">هنوز کارت خدماتی ثبت نشده است.</p>
        )}
      </div>
    </section>
  );
}
