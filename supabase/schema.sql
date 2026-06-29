-- اجرا در Supabase SQL Editor

create extension if not exists "uuid-ossp";

-- پست‌های وبلاگ
create table if not exists posts (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  slug text not null unique,
  excerpt text,
  featured_image text,
  content text not null default '', -- HTML تولید شده توسط ویرایشگر TipTap
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  category text,
  tags text[] default '{}',
  -- سئو
  seo_title text,
  meta_description text,
  canonical_url text,
  og_image text,
  noindex boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_status_idx on posts(status);
create index if not exists posts_slug_idx on posts(slug);

-- کارت‌های خدمات
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  position int not null default 0,
  icon text not null default 'Rocket',
  title text not null,
  subtitle text,
  description text,
  audience text[] default '{}',
  steps text[] default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- پیام‌های فرم تماس
create table if not exists contacts (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  business text,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- تنظیمات عمومی سایت (یک سطر تک‌فیلدی JSON)
create table if not exists settings (
  id int primary key default 1,
  site_title text,
  site_description text,
  brand_color text default '#00C389',
  contact_email text,
  social_links jsonb default '{}',

  hero_badge text,
  hero_title_prefix text,
  hero_title_highlight text,
  hero_title_suffix text,
  hero_description text,
  hero_image text,
  hero_primary_cta text,
  hero_secondary_cta text,
  hero_trust_text text,

  avatar_image text,
  full_name text,
  role_title text,

  about_badge text,
  about_title_prefix text,
  about_title_highlight text,
  about_description text,
  about_card_title text,
  about_card_description text,
  about_image text,
  about_principles text[] default '{}',
  about_secondary_image text,
  about_quote_title text,
  about_quote_text text,

  updated_at timestamptz not null default now()
);

insert into settings (id) values (1) on conflict (id) do nothing;

-- به‌روزرسانی خودکار updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_updated_at on posts;
create trigger posts_updated_at before update on posts
  for each row execute function set_updated_at();

drop trigger if exists services_updated_at on services;
create trigger services_updated_at before update on services
  for each row execute function set_updated_at();

drop trigger if exists settings_updated_at on settings;
create trigger settings_updated_at before update on settings
  for each row execute function set_updated_at();

-- Row Level Security
alter table posts enable row level security;
alter table services enable row level security;
alter table contacts enable row level security;
alter table settings enable row level security;

-- خوانش عمومی پست‌های منتشرشده، خدمات و تنظیمات (برای وبسایت اصلی)
create policy "public read published posts" on posts
  for select using (status = 'published');

create policy "public read services" on services
  for select using (true);

create policy "public read settings" on settings
  for select using (true);

-- درج عمومی پیام تماس (هر کسی می‌تواند فرم تماس را ارسال کند)
create policy "public insert contacts" on contacts
  for insert with check (true);

-- دسترسی کامل برای کاربران احراز هویت‌شده (ادمین)
create policy "authenticated full access posts" on posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access services" on services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access contacts" on contacts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "authenticated full access settings" on settings
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- باکت Storage برای آپلود تصاویر (اجرا کنید سپس از پنل Storage هم باکت public بسازید)
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

create policy "authenticated upload media" on storage.objects
  for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "authenticated delete media" on storage.objects
  for delete using (bucket_id = 'media' and auth.role() = 'authenticated');

-- باکت Storage جداگانه برای تصویر پروفایل
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "public read avatars" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "authenticated upload avatars" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

create policy "authenticated delete avatars" on storage.objects
  for delete using (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- باکت Storage جداگانه برای تصویر بخش Hero
insert into storage.buckets (id, name, public) values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

create policy "public read hero-images" on storage.objects
  for select using (bucket_id = 'hero-images');

create policy "authenticated upload hero-images" on storage.objects
  for insert with check (bucket_id = 'hero-images' and auth.role() = 'authenticated');

create policy "authenticated delete hero-images" on storage.objects
  for delete using (bucket_id = 'hero-images' and auth.role() = 'authenticated');
