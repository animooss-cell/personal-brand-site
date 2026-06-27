-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول دوره‌های آموزشی صفحه /services را می‌سازد و آپدیت می‌کند
-- اجرای دوباره این فایل بی‌خطر است (idempotent)

create extension if not exists "uuid-ossp";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists courses (
  id uuid primary key default uuid_generate_v4(),
  position int not null default 0,
  title text not null,
  slug text,
  audience text,
  description text,
  image text,
  content jsonb not null default '[]',
  outline text[] default '{}',
  duration text,
  level text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ستون‌های جدید برای نصب‌های قبلی این جدول
alter table courses add column if not exists slug text;
alter table courses add column if not exists content jsonb not null default '[]';
alter table courses add column if not exists outline text[] default '{}';
alter table courses add column if not exists duration text;
alter table courses add column if not exists level text;

create index if not exists courses_status_idx on courses(status);

drop trigger if exists courses_updated_at on courses;
create trigger courses_updated_at before update on courses
  for each row execute function set_updated_at();

alter table courses enable row level security;

drop policy if exists "public read published courses" on courses;
create policy "public read published courses" on courses
  for select using (status = 'published');

drop policy if exists "authenticated full access courses" on courses;
create policy "authenticated full access courses" on courses
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- دوره‌های پیش‌فرض (فقط اگر جدول خالی باشد)
insert into courses (position, title, slug, audience, description, outline, duration, level, content, status)
select * from (values
  (
    0,
    'آموزش NotebookLM و تهیه گزارش با هوش مصنوعی',
    'notebooklm-ai-report',
    'تیم رهبری ارشد شرکت فولاد خوزستان',
    'کارگاه عملی استفاده از NotebookLM برای تحلیل اسناد و تهیه گزارش‌های مدیریتی با کمک هوش مصنوعی.',
    array['آشنایی با NotebookLM', 'آپلود و تحلیل اسناد', 'تهیه گزارش هوشمند', 'خروجی‌گیری حرفه‌ای'],
    '۸ ساعت',
    'مقدماتی تا متوسط',
    '[
      {"id":"b1","type":"text","data":{"html":"این دوره با حضور تیم رهبری ارشد شرکت فولاد خوزستان برگزار شد. هدف کارگاه، آشنایی عملی مدیران با ابزار NotebookLM و نحوه استفاده از آن برای تحلیل سریع اسناد سازمانی و تهیه گزارش‌های مدیریتی بود."}},
      {"id":"b2","type":"text","data":{"html":"شرکت‌کنندگان در طول دوره یاد گرفتند چگونه اسناد، گزارش‌ها و فایل‌های متنی متعدد را در NotebookLM بارگذاری کنند، از هوش مصنوعی برای استخراج نکات کلیدی استفاده کنند و در نهایت یک گزارش منسجم و قابل ارائه تولید کنند — کاری که پیش از این ساعت‌ها زمان می‌برد."}},
      {"id":"b3","type":"quote","data":{"text":"این کارگاه نشان داد که هوش مصنوعی می‌تواند حجم زیادی از کار تحلیل اسناد را در عرض چند دقیقه انجام دهد؛ چیزی که برای تیم مدیریتی ما تغییر بزرگی در نحوه کار روزانه ایجاد کرد.","cite":"از بازخورد شرکت‌کنندگان دوره"}}
    ]'::jsonb,
    'published'
  ),
  (
    1,
    'هوش مصنوعی در خدمت تولید محتوای روابط عمومی',
    'ai-public-relations',
    'تیم روابط عمومی شرکت فولاد خوزستان',
    'آموزش کاربردی ابزارهای هوش مصنوعی برای تولید سریع‌تر و باکیفیت‌تر محتوای روابط عمومی.',
    array['ابزارهای AI برای تولید محتوا', 'نوشتن با ChatGPT', 'تولید تصویر با AI', 'برنامه‌ریزی محتوا با AI'],
    '۶ ساعت',
    'مقدماتی',
    '[
      {"id":"b1","type":"text","data":{"html":"این دوره برای تیم روابط عمومی شرکت فولاد خوزستان برگزار شد و با هدف آشنایی عملی اعضای تیم با ابزارهای هوش مصنوعی در فرآیند تولید محتوا طراحی شده بود."}},
      {"id":"b2","type":"text","data":{"html":"در طول دوره، شرکت‌کنندگان با نحوه نوشتن خبر، اطلاعیه و متن روابط عمومی با کمک ChatGPT، تولید تصویر مناسب برای پست‌ها و اخبار با ابزارهای هوش مصنوعی، و همچنین برنامه‌ریزی تقویم محتوایی با کمک AI آشنا شدند."}},
      {"id":"b3","type":"quote","data":{"text":"حالا می‌دانیم چطور در زمان بسیار کمتر، محتوای حرفه‌ای‌تری برای انتشار آماده کنیم.","cite":"از بازخورد تیم روابط عمومی"}}
    ]'::jsonb,
    'published'
  )
) as seed(position, title, slug, audience, description, outline, duration, level, content, status)
where not exists (select 1 from courses);

-- به‌روزرسانی دوره‌های قبلاً ساخته‌شده (در صورتی که از نسخه قبلی schema اجرا شده باشند)
update courses set
  slug = 'notebooklm-ai-report',
  outline = array['آشنایی با NotebookLM', 'آپلود و تحلیل اسناد', 'تهیه گزارش هوشمند', 'خروجی‌گیری حرفه‌ای'],
  duration = '۸ ساعت',
  level = 'مقدماتی تا متوسط',
  content = '[
    {"id":"b1","type":"text","data":{"html":"این دوره با حضور تیم رهبری ارشد شرکت فولاد خوزستان برگزار شد. هدف کارگاه، آشنایی عملی مدیران با ابزار NotebookLM و نحوه استفاده از آن برای تحلیل سریع اسناد سازمانی و تهیه گزارش‌های مدیریتی بود."}},
    {"id":"b2","type":"text","data":{"html":"شرکت‌کنندگان در طول دوره یاد گرفتند چگونه اسناد، گزارش‌ها و فایل‌های متنی متعدد را در NotebookLM بارگذاری کنند، از هوش مصنوعی برای استخراج نکات کلیدی استفاده کنند و در نهایت یک گزارش منسجم و قابل ارائه تولید کنند — کاری که پیش از این ساعت‌ها زمان می‌برد."}},
    {"id":"b3","type":"quote","data":{"text":"این کارگاه نشان داد که هوش مصنوعی می‌تواند حجم زیادی از کار تحلیل اسناد را در عرض چند دقیقه انجام دهد؛ چیزی که برای تیم مدیریتی ما تغییر بزرگی در نحوه کار روزانه ایجاد کرد.","cite":"از بازخورد شرکت‌کنندگان دوره"}}
  ]'::jsonb
where title = 'آموزش NotebookLM و تهیه گزارش با هوش مصنوعی' and (slug is null or slug = '');

update courses set
  slug = 'ai-public-relations',
  outline = array['ابزارهای AI برای تولید محتوا', 'نوشتن با ChatGPT', 'تولید تصویر با AI', 'برنامه‌ریزی محتوا با AI'],
  duration = '۶ ساعت',
  level = 'مقدماتی',
  content = '[
    {"id":"b1","type":"text","data":{"html":"این دوره برای تیم روابط عمومی شرکت فولاد خوزستان برگزار شد و با هدف آشنایی عملی اعضای تیم با ابزارهای هوش مصنوعی در فرآیند تولید محتوا طراحی شده بود."}},
    {"id":"b2","type":"text","data":{"html":"در طول دوره، شرکت‌کنندگان با نحوه نوشتن خبر، اطلاعیه و متن روابط عمومی با کمک ChatGPT، تولید تصویر مناسب برای پست‌ها و اخبار با ابزارهای هوش مصنوعی، و همچنین برنامه‌ریزی تقویم محتوایی با کمک AI آشنا شدند."}},
    {"id":"b3","type":"quote","data":{"text":"حالا می‌دانیم چطور در زمان بسیار کمتر، محتوای حرفه‌ای‌تری برای انتشار آماده کنیم.","cite":"از بازخورد تیم روابط عمومی"}}
  ]'::jsonb
where title = 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی' and (slug is null or slug = '');

-- محدودیت یکتا بودن slug (بعد از اطمینان از پر بودن مقدار همه ردیف‌ها)
create unique index if not exists courses_slug_idx on courses(slug) where slug is not null;

-- باکت Storage برای تصویر دوره‌ها قبلاً در schema.sql ساخته شده (media)
