-- این فایل را در Supabase SQL Editor اجرا کنید (بعد از schema.sql)
-- جدول مشترکین خبرنامه را می‌سازد
-- اجرای دوباره این فایل بی‌خطر است (idempotent)

create extension if not exists "uuid-ossp";

create table if not exists newsletter_subscribers (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table newsletter_subscribers enable row level security;

drop policy if exists "public insert newsletter_subscribers" on newsletter_subscribers;
create policy "public insert newsletter_subscribers" on newsletter_subscribers
  for insert with check (true);

drop policy if exists "authenticated read newsletter_subscribers" on newsletter_subscribers;
create policy "authenticated read newsletter_subscribers" on newsletter_subscribers
  for select using (auth.role() = 'authenticated');
