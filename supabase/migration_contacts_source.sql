-- feat/admin-messages-filter-delete-pagination
-- این فایل خودکار اجرا نمی‌شود. دستی در Supabase SQL Editor (تب Database) اجرا کنید، **قبل از merge**.
-- همه‌ی دستورها idempotent هستند؛ اجرای دوباره ضرری ندارد.
--
-- ۱) ستون source: هر پیام از کدام فرم آمده است.
--    contact             = فرم تماس با ما (/contact، و فرم تماس صفحه‌ی /about)
--    course_registration = ثبت‌نام یا سؤال درباره‌ی دوره‌ها (فعلاً فرمی در سایت ندارد؛ برای پیام‌های قدیمی و فرم‌های آینده)
--    waitlist            = لیست انتظار دوره‌ها (بخش آموزش در /services)
--    other               = بقیه، و هر پیام قدیمی که منبعش قطعی نیست

alter table contacts add column if not exists source text;

-- ۲) backfill پیام‌های قدیمی؛ به ترتیب اجرا می‌شوند و هر ردیف فقط یک بار (where source is null) مقدار می‌گیرد.

-- الف) لیست انتظار: فرم /services همیشه همین نام را می‌فرستد؛ متن «لیست انتظار» هم نشانه‌ی قطعی است.
update contacts set source = 'waitlist'
where source is null
  and (name = 'لیست انتظار دوره‌ها' or message ilike '%لیست انتظار%');

-- ب) فرم جدید /contact: پیام همیشه با خط ساخت‌یافته‌ی «موضوع: … | پیگیری: …» شروع می‌شود.
update contacts set source = 'contact'
where source is null
  and message ~ '^موضوع: .+ \| پیگیری: ';

-- ج) فرم تماس صفحه‌ی /about: تنها فرمی است که ستون subject را پر می‌کند (اگر ستون وجود داشته باشد).
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'contacts' and column_name = 'subject'
  ) then
    execute $q$update contacts set source = 'contact' where source is null and subject is not null and subject <> ''$q$;
  end if;
end $$;

-- د) ثبت‌نام دوره: متن هم «ثبت‌نام/ثبت نام» و هم «دوره» را دارد.
update contacts set source = 'course_registration'
where source is null
  and (message ilike '%ثبت‌نام%' or message ilike '%ثبت نام%')
  and message ilike '%دوره%';

-- هـ) بقیه قطعی نیستند (فرم قدیمی /contact پیش از بازطراحی، یا فرم‌هایی که دیگر در کد نیستند).
update contacts set source = 'other' where source is null;

-- ۳) not null + مقدار پیش‌فرض + check constraint
-- پیش‌فرض 'other' لازم است: بین اجرای این SQL و deploy کد جدید، فرم‌های فعلی سایت هنوز source نمی‌فرستند.
alter table contacts alter column source set default 'other';
alter table contacts alter column source set not null;
alter table contacts drop constraint if exists contacts_source_check;
alter table contacts add constraint contacts_source_check
  check (source in ('contact', 'course_registration', 'waitlist', 'other'));

-- ۴) ایندکس برای فیلتر + صفحه‌بندی (جدیدترین اول)
create index if not exists contacts_source_created_at_idx on contacts (source, created_at desc);
create index if not exists contacts_created_at_idx on contacts (created_at desc);

-- ۵) حذف فقط برای ادمین لاگین‌شده.
-- policy فعلی «authenticated full access contacts» (schema.sql) حذف را برای کاربر لاگین‌شده مجاز کرده بود؛
-- این policy صریح فقط همان را مستند می‌کند. کاربر ناشناس (anon) فقط insert دارد و نمی‌تواند حذف کند.
drop policy if exists "admin delete contacts" on contacts;
create policy "admin delete contacts" on contacts
  for delete using (auth.role() = 'authenticated');

-- ۶) بررسی پس از اجرا (فقط‌خواندنی)
select source, count(*) from contacts group by source order by source;
