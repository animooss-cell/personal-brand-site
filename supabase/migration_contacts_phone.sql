-- feat/contact-form-phone-and-direct-contact
-- این فایل را در Supabase SQL Editor اجرا کنید تا ستون «شماره تماس» به جدول
-- contacts اضافه شود (فرم رزرو جلسه از این پس شماره تماس اختیاری را هم ذخیره می‌کند).
--
-- ⚠️ مهم: این کوئری را از تب Database اجرا کنید، نه از تب Logs.
-- در SQL Editor سوپابیس، کنار دکمه Run یک منوی کشویی هست که مشخص می‌کند کوئری
-- روی کدام دیتابیس/تب اجرا شود — حتماً "Database" را انتخاب کنید.

alter table contacts add column if not exists phone text;
