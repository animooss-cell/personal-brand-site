-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول ویدیوها (لینک/امبد ویدیوهای موجود روی هر پلتفرمی) را می‌سازد و آپدیت می‌کند
-- اجرای دوباره این فایل بی‌خطر است (idempotent)
-- توجه: برخلاف downloads، این جدول فایلی آپلود نمی‌کند (فقط لینک/کد امبد
-- ذخیره می‌شود)، پس هیچ باکت Storage یا policy روی storage.objects لازم ندارد.

create extension if not exists "uuid-ossp";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists videos (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null,
  category text,
  tags text[] default '{}',
  description text not null default '', -- HTML تولید شده توسط ویرایشگر TipTap (هم‌فرمت با پست‌های وبلاگ)
  video_url text not null default '',
  video_platform text not null default 'other'
    check (video_platform in ('youtube', 'aparat', 'vimeo', 'twitter', 'instagram', 'custom', 'other')),
  embed_code text,
  thumbnail text,
  duration text,
  seo_title text,
  meta_description text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ستون‌های جدید برای نصب‌های قبلی این جدول
alter table videos add column if not exists category text;
alter table videos add column if not exists tags text[] default '{}';
alter table videos add column if not exists description text not null default '';
alter table videos add column if not exists video_url text not null default '';
alter table videos add column if not exists video_platform text not null default 'other';
alter table videos add column if not exists embed_code text;
alter table videos add column if not exists thumbnail text;
alter table videos add column if not exists duration text;
alter table videos add column if not exists seo_title text;
alter table videos add column if not exists meta_description text;
alter table videos add column if not exists published boolean not null default false;

-- محدودیت مقدار video_platform (برای نصب‌های قبلی که ستون از قبل بدون check وجود داشته)
alter table videos drop constraint if exists videos_video_platform_check;
alter table videos add constraint videos_video_platform_check
  check (video_platform in ('youtube', 'aparat', 'vimeo', 'twitter', 'instagram', 'custom', 'other'));

create index if not exists videos_published_idx on videos(published);
create unique index if not exists videos_slug_idx on videos(slug);

drop trigger if exists videos_updated_at on videos;
create trigger videos_updated_at before update on videos
  for each row execute function set_updated_at();

-- Row Level Security
alter table videos enable row level security;

drop policy if exists "public read published videos" on videos;
create policy "public read published videos" on videos
  for select using (published = true);

drop policy if exists "authenticated full access videos" on videos;
create policy "authenticated full access videos" on videos
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
