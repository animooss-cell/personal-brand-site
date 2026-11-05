import { Briefcase, GraduationCap, ShieldCheck, type LucideIcon } from "lucide-react";

// داده‌ی بخش «چرا با من کار کنید؟» صفحه‌ی اصلی؛ components/FeatureStrip.tsx و نسخه‌ی Markdown صفحه‌ی اصلی از همین می‌خوانند.
export type Feature = {
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

export const WHY_ME = {
  label: "چرا من؟",
  heading: "چرا با من کار کنید؟",
  features,
};
