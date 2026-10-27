-- feat/download-extra-fields
-- این سه ستون اختیاری قبلاً در Supabase به جدول downloads اضافه شده‌اند؛ این فایل
-- فقط سابقه‌ی همان تغییر را در ریپو نگه می‌دارد و اجرای دوباره‌اش بی‌خطر است
-- (if not exists). کارت دانلود صفحه‌ی /downloads/[slug] هر بخش را فقط وقتی
-- نشان می‌دهد که مقدار داشته باشد:
--   after_download_steps → مراحل «بعد از دانلود» (هر عنصر یک مرحله)
--   prerequisites        → خط «پیش‌نیاز»
--   install_guide_url    → لینک «راهنمای نصب»
--
-- ⚠️ مهم: این کوئری را از تب Database اجرا کنید، نه از تب Logs.

alter table downloads add column if not exists after_download_steps text[];
alter table downloads add column if not exists prerequisites text;
alter table downloads add column if not exists install_guide_url text;
