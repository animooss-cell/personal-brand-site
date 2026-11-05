import { WHY_ME } from "@/lib/why-me";
import WhyMeSlider from "@/components/WhyMeSlider";

export default function FeatureStrip() {
  // فقط داده‌ی قابل‌سریال‌سازی به کامپوننت کلاینت می‌رود (آیکون‌ها نه).
  const slides = WHY_ME.features.map(({ title, description, image, highlight }) => ({ title, description, image, highlight }));

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-20">
      {/* لکه‌های رنگی محو پشت پنل شیشه‌ای؛ هم‌عرض پنل تا از پشت شیشه دیده شوند */}
      <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-6xl" aria-hidden="true">
        <div className="absolute right-[-6%] top-[18%] h-64 w-64 rounded-full bg-brand-200 opacity-80 blur-3xl dark:opacity-30 md:h-[26rem] md:w-[26rem]" />
        <div className="absolute bottom-[4%] left-[-8%] h-72 w-72 rounded-full bg-brand-dark/25 blur-3xl dark:bg-brand-dark/50 md:h-[28rem] md:w-[28rem]" />
        <div className="absolute left-[34%] top-[42%] h-56 w-56 rounded-full bg-brand-100 opacity-90 blur-3xl dark:opacity-10 md:h-80 md:w-80" />
        <div className="absolute bottom-[-6%] right-[24%] h-56 w-56 rounded-full bg-brand-200 opacity-70 blur-3xl dark:opacity-20 md:h-72 md:w-72" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-medium text-brand-700 dark:text-brand-400">{WHY_ME.label}</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">{WHY_ME.heading}</h2>
        </div>

        <WhyMeSlider slides={slides} label="دلایل همکاری با من" />
      </div>
    </section>
  );
}
