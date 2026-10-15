// منبع واحد اطلاعات تماس مستقیم (فوتر، فرم تماس، JSON-LD). این مقادیر را
// فقط اینجا تغییر بده تا همه‌جای سایت هم‌زمان به‌روز شود.

export const CONTACT_PHONE_E164 = "+989161002550";
export const CONTACT_PHONE_TEL_HREF = `tel:${CONTACT_PHONE_E164}`;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toPersianDigits(value: string): string {
  return value.replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

// نمایش محلی با ارقام فارسی: ۰۹۱۶ ۱۰۰ ۲۵۵۰
export const CONTACT_PHONE_DISPLAY_FA = toPersianDigits("0916 100 2550");

export const CONTACT_WHATSAPP_URL = "https://wa.me/989161002550";
export const CONTACT_TELEGRAM_HANDLE = "@abedahm";
export const CONTACT_TELEGRAM_URL = "https://t.me/abedahm";
