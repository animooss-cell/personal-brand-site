-- feat/geo-entity
-- این فایل خودکار اجرا نمی‌شود. دستی در Supabase SQL Editor (تب Database) اجرا کنید.
-- همه‌ی دستورها idempotent هستند؛ اجرای دوباره ضرری ندارد.
--
-- ستون referral: پاسخ اختیاری «از کجا با ما آشنا شدید؟» در فرم /contact.
-- مقدارهای مجاز همان گزینه‌های فرم‌اند (components/contact/contactForm.ts → REFERRALS)؛ خالی = null.
--
-- تا وقتی این فایل اجرا نشده، فرم تماس همچنان کار می‌کند: اگر ستون وجود نداشته باشد، پیام بدون این فیلد ثبت می‌شود.

alter table contacts add column if not exists referral text;

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'contacts_referral_check'
  ) then
    alter table contacts
      add constraint contacts_referral_check
      check (referral is null or referral in ('ChatGPT', 'گوگل', 'اینستاگرام', 'معرفی دوستان', 'رسانه', 'سایر'));
  end if;
end $$;

-- اگر دسترسی درج نقش anon روی ستون‌ها جداگانه تعریف شده (column-level grant)، این ستون را هم اضافه کنید.
-- در حالت پیش‌فرض (grant روی کل جدول) به این خط نیازی نیست:
-- grant insert (referral) on contacts to anon;
