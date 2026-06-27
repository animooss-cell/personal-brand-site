-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول دوره‌های آموزشی صفحه /services را می‌سازد
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
  audience text,
  description text,
  image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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
insert into courses (position, title, audience, description, status)
select * from (values
  (0, 'آموزش NotebookLM و تهیه گزارش با هوش مصنوعی', 'تیم رهبری ارشد شرکت فولاد خوزستان',
    'کارگاه عملی استفاده از NotebookLM برای تحلیل اسناد و تهیه گزارش‌های مدیریتی با کمک هوش مصنوعی.', 'published'),
  (1, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'تیم روابط عمومی شرکت فولاد خوزستان',
    'آموزش کاربردی ابزارهای هوش مصنوعی برای تولید سریع‌تر و باکیفیت‌تر محتوای روابط عمومی.', 'published')
) as seed(position, title, audience, description, status)
where not exists (select 1 from courses);

-- باکت Storage برای تصویر دوره‌ها قبلاً در schema.sql ساخته شده (media)
