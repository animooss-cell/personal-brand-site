-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول منابع دانلودی (پرامپت، کتاب، اسکیل و ...) را می‌سازد و آپدیت می‌کند
-- اجرای دوباره این فایل بی‌خطر است (idempotent)

create extension if not exists "uuid-ossp";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists downloads (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null,
  category text,
  resource_type text not null default 'other' check (resource_type in ('prompt', 'book', 'skill', 'other')),
  tags text[] default '{}',
  excerpt text,
  content text not null default '', -- HTML تولید شده توسط ویرایشگر TipTap (هم‌فرمت با پست‌های وبلاگ)
  featured_image text,
  file_url text,
  file_name text,
  file_size bigint,
  seo_title text,
  meta_description text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ستون‌های جدید برای نصب‌های قبلی این جدول
alter table downloads add column if not exists category text;
alter table downloads add column if not exists resource_type text not null default 'other';
alter table downloads add column if not exists tags text[] default '{}';
alter table downloads add column if not exists excerpt text;
alter table downloads add column if not exists content text not null default '';
alter table downloads add column if not exists featured_image text;
alter table downloads add column if not exists file_url text;
alter table downloads add column if not exists file_name text;
alter table downloads add column if not exists file_size bigint;
alter table downloads add column if not exists seo_title text;
alter table downloads add column if not exists meta_description text;
alter table downloads add column if not exists published boolean not null default false;

-- محدودیت مقدار resource_type (برای نصب‌های قبلی که ستون از قبل بدون check وجود داشته)
alter table downloads drop constraint if exists downloads_resource_type_check;
alter table downloads add constraint downloads_resource_type_check
  check (resource_type in ('prompt', 'book', 'skill', 'other'));

create index if not exists downloads_published_idx on downloads(published);
create unique index if not exists downloads_slug_idx on downloads(slug);

drop trigger if exists downloads_updated_at on downloads;
create trigger downloads_updated_at before update on downloads
  for each row execute function set_updated_at();

-- Row Level Security
alter table downloads enable row level security;

drop policy if exists "public read published downloads" on downloads;
create policy "public read published downloads" on downloads
  for select using (published = true);

drop policy if exists "authenticated full access downloads" on downloads;
create policy "authenticated full access downloads" on downloads
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- باکت Storage عمومی برای فایل‌های دانلودی (پرامپت/کتاب/اسکیل و ...)
-- اگر ساخت باکت از طریق SQL روی پروژه شما مجاز نبود، از پنل Storage در
-- Supabase Dashboard یک باکت public جدید به نام «downloads» بسازید و همین
-- سه پالیسی پایین را برایش تعریف کنید.
insert into storage.buckets (id, name, public) values ('downloads', 'downloads', true)
on conflict (id) do nothing;

drop policy if exists "public read downloads bucket" on storage.objects;
create policy "public read downloads bucket" on storage.objects
  for select using (bucket_id = 'downloads');

drop policy if exists "authenticated upload downloads bucket" on storage.objects;
create policy "authenticated upload downloads bucket" on storage.objects
  for insert with check (bucket_id = 'downloads' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete downloads bucket" on storage.objects;
create policy "authenticated delete downloads bucket" on storage.objects
  for delete using (bucket_id = 'downloads' and auth.role() = 'authenticated');
