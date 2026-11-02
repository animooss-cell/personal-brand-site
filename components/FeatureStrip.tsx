import { Briefcase, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";
import WhyMeSlider from "@/components/WhyMeSlider";

type Feature = {
  // آیکون‌ها فعلاً نمایش داده نمی‌شوند ولی برای استفاده‌ی بعدی نگه داشته شده‌اند.
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  // بخشی از عنوان که با گرادیان رنگ می‌شود (عیناً داخل title)
  highlight: string;
};

const features: Feature[] = [
  {
    icon: Briefcase,
    title: "بیش از ۱۰ سال در دل کسب‌وکارها",
    description: "راه‌اندازی کسب‌وکار، مربیگری استارتاپ ویکند و برگزاری رویدادهای کارآفرینی در خوزستان.",
    image: "/images/why/why-experience.webp",
    highlight: "۱۰ سال",
  },
  {
    icon: GraduationCap,
    title: "آموزش در سازمان‌های صنعتی",
    description: "دوره‌های هوش مصنوعی برای روابط عمومی و کارکنان فولاد خوزستان، روی کارهای واقعی خودشان.",
    image: "/images/why/why-training.webp",
    highlight: "سازمان‌های صنعتی",
  },
  {
    icon: ShieldCheck,
    title: "ابزار متناسب با شرایط ایران",
    description: "پیشنهادها با در نظر گرفتن تحریم، پرداخت و امنیت اطلاعات است، نه فقط ابزار مد روز.",
    image: "/images/why/why-tools.webp",
    highlight: "شرایط ایران",
  },
];

export default function FeatureStrip() {
  // فقط داده‌ی قابل‌سریال‌سازی به کامپوننت کلاینت می‌رود (آیکون‌ها نه).
  const slides = features.map(({ title, description, image, highlight }) => ({ title, description, image, highlight }));

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
          <span className="mb-3 inline-block text-sm font-medium text-brand-700 dark:text-brand-400">چرا من؟</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">چرا با من کار کنید؟</h2>
        </div>

        <WhyMeSlider slides={slides} label="دلایل همکاری با من" />
      </div>
    </section>
  );
}
