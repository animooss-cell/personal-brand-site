-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول‌های مربوط به صفحه /about را می‌سازد و با محتوای فعلی صفحه پر می‌کند
-- اجرای دوباره این فایل بی‌خطر است (idempotent)

create extension if not exists "uuid-ossp";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- محتوای اصلی صفحه درباره من (یک ردیف تک‌فیلدی)
create table if not exists about_content (
  id int primary key default 1,
  avatar_image text,
  full_name text,
  role_title text,
  short_bio text,
  full_bio text,
  specialties text[] default '{}',
  activities text[] default '{}',
  collaborations text[] default '{}',
  social_links jsonb default '{}',
  phone_numbers text[] default '{}',
  updated_at timestamptz not null default now()
);

alter table about_content add column if not exists phone_numbers text[] default '{}';

-- ستون موضوع برای فرم تماس صفحه /about (جدول contacts قبلاً در schema.sql ساخته شده)
alter table contacts add column if not exists subject text;

insert into about_content (id) values (1) on conflict (id) do nothing;

drop trigger if exists about_content_updated_at on about_content;
create trigger about_content_updated_at before update on about_content
  for each row execute function set_updated_at();

-- آیتم‌های Timeline تجربیات (قابل ترتیب)
create table if not exists about_timeline (
  id uuid primary key default uuid_generate_v4(),
  position int not null default 0,
  title text not null,
  place text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists about_timeline_updated_at on about_timeline;
create trigger about_timeline_updated_at before update on about_timeline
  for each row execute function set_updated_at();

-- Row Level Security
alter table about_content enable row level security;
alter table about_timeline enable row level security;

drop policy if exists "public read about_content" on about_content;
create policy "public read about_content" on about_content
  for select using (true);

drop policy if exists "authenticated full access about_content" on about_content;
create policy "authenticated full access about_content" on about_content
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "public read about_timeline" on about_timeline;
create policy "public read about_timeline" on about_timeline
  for select using (true);

drop policy if exists "authenticated full access about_timeline" on about_timeline;
create policy "authenticated full access about_timeline" on about_timeline
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- مقادیر پیش‌فرض (همان محتوای فعلی صفحه /about)
update about_content set
  full_name = coalesce(full_name, 'عبدالله احمدیان'),
  role_title = coalesce(role_title, 'مشاور کسب‌وکار | متخصص هوش مصنوعی | کارآفرین'),
  short_bio = coalesce(short_bio, 'بیش از یک دهه تجربه در راه‌اندازی کسب‌وکار، مشاوره استارتاپ‌ها، و پیاده‌سازی هوش مصنوعی در سازمان‌های بزرگ. از اهواز تا کیش، از استارتاپ‌های نوپا تا شرکت‌های بزرگ صنعتی.'),
  full_bio = coalesce(full_bio, ''),
  activities = case when activities = '{}' or activities is null then array[
    'مشاوره و توسعه کسب‌وکار و کارها',
    'بنیان‌گذار وبسایت Startuping.ir در حوزه استارتاپ‌ها',
    'مدیر تیم تولید محتوای Inmedia.ir',
    'برگزاری رویدادها و سمینارهای مرتبط با کسب‌وکار و کارهای نوپا',
    'تدریس با تمرکز بر تولید محتوا و بازاریابی',
    'مدیرعامل مرکز مشاوره کارآفرینی "ارزش آفرینان تجارت ایرانیان"'
  ] else activities end,
  specialties = case when specialties = '{}' or specialties is null then array[
    'مدرک تخصصی PMBOK مدیریت پروژه از موسسه آریانا',
    'مدرک سطح ۱ مدیریت از وزارت صنایع و معادن',
    'مدرک خبرنگاری به سبک رویترز'
  ] else specialties end,
  collaborations = case when collaborations = '{}' or collaborations is null then array[
    'پارک علم و فناوری خوزستان',
    'استانداری خوزستان',
    'اداره تعاون، کار و امور اجتماعی خوزستان',
    'پارک پردیس نهاد ریاست جمهوری',
    'اکوسیستم استارتاپی کشور',
    'دانشگاه شریف مرکز کیش',
    'اداره ICT استان خوزستان',
    'شرکت فولاد خوزستان'
  ] else collaborations end,
  phone_numbers = case when phone_numbers = '{}' or phone_numbers is null then array[
    '09161002550',
    '09163070748'
  ] else phone_numbers end,
  social_links = case when social_links = '{}'::jsonb or social_links is null then jsonb_build_object(
    'instagram', 'https://www.instagram.com/startuping_ir',
    'telegram', 'https://t.me/Staruping_ir',
    'whatsapp', '09161002550',
    'twitter', ''
  ) else social_links end
where id = 1;

-- آیتم‌های پیش‌فرض Timeline (فقط اگر جدول خالی باشد)
insert into about_timeline (position, title, place)
select * from (values
  (0, 'ارگانایزر رویداد ملی فرآفرین', 'تهران، اهواز، مسجد سلیمان، شوشتر (با جهاد دانشگاهی)'),
  (1, 'مدیر اجرایی نمایشگاه بزرگ استارتاپ‌های خوزستان (الکام استارز)', '۹۶، ۹۷، ۹۸'),
  (2, 'بنیان‌گذار رویداد تجربه‌محور کارآفرینان', 'از ۹۲ تا کنون (همفکر، دیدار، همراه، حرف نو)'),
  (3, 'دبیر اجرایی کمیسیون کسب‌وکارهای نوپا', 'سازمان نظام صنفی رایانه استان خوزستان'),
  (4, 'مربی استارتاپ ویکند', '۹۳ تا کنون — کرج، اهواز، کرمانشاه، شوشتر'),
  (5, 'برگزارکننده رویداد بین‌المللی Inotexpitch', 'اهواز، ۹۶'),
  (6, 'مجری طرح بزرگ سرمایه‌گذاری رویش', 'با بنیاد برکت'),
  (7, 'مدیر اجرایی رویداد بین‌المللی هاکاهلت', 'جزیره کیش، ۹۸ (وزارت بهداشت و دانشگاه شریف)')
) as seed(position, title, place)
where not exists (select 1 from about_timeline);

-- باکت Storage برای تصویر پروفایل قبلاً در schema.sql ساخته شده (avatars)
