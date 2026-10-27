import type { FaqItem } from "@/lib/post-content";

// سؤالات «پیش از رزرو»؛ هم بخش صفحه و هم اسکیمای FAQPage از همین فهرست ساخته می‌شوند تا متن‌شان دقیقاً یکی بماند.
export const CONTACT_FAQ: FaqItem[] = [
  {
    question: "جلسه‌ی اول هزینه دارد؟",
    answer:
      "نه. جلسه‌ی اول رایگان و بدون تعهد است. اگر ادامه دادیم، هزینه را بعد از جلسه به‌صورت شفاف و مکتوب دریافت می‌کنید.",
  },
  {
    question: "حضوری است یا آنلاین؟",
    answer: "هر دو. حضوری در اهواز یا آنلاین، هر کدام که برای شما راحت‌تر است.",
  },
  {
    question: "جلسه چقدر طول می‌کشد؟",
    answer: "حدود ۴۵ دقیقه.",
  },
];

// محل و ساعات پاسخ‌گویی؛ متن صفحه و اسکیمای ContactPage هر دو از این‌ها استفاده می‌کنند.
export const CONTACT_CITY = "اهواز";
export const CONTACT_REGION = "خوزستان";
export const CONTACT_HOURS_LABEL = "شنبه تا پنجشنبه، ۹ تا ۱۸";
export const CONTACT_HOURS = {
  days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
  opens: "09:00",
  closes: "18:00",
};
