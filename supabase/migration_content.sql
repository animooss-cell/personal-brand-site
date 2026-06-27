-- این فایل را بعد از schema.sql در Supabase SQL Editor اجرا کنید
-- (schema.sql ستون‌ها و جدول‌ها را می‌سازد؛ این فایل فقط محتوای پیش‌فرض را پر می‌کند)
-- اجرای دوباره این فایل بی‌خطر است (idempotent)

-- به‌روزرسانی رنگ برند به پالت جدید (در صورتی که هنوز مقدار قدیمی #1D9E75 باشد)
update settings set brand_color = '#00C389' where id = 1 and (brand_color is null or brand_color = '#1D9E75');

-- اگر schema.sql را قبل از اضافه شدن باکت avatars اجرا کرده‌اید، این بخش آن را می‌سازد
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true)
on conflict (id) do nothing;

drop policy if exists "public read avatars" on storage.objects;
create policy "public read avatars" on storage.objects
  for select using (bucket_id = 'avatars');

drop policy if exists "authenticated upload avatars" on storage.objects;
create policy "authenticated upload avatars" on storage.objects
  for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete avatars" on storage.objects;
create policy "authenticated delete avatars" on storage.objects
  for delete using (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- اگر schema.sql را قبل از اضافه شدن باکت hero-images اجرا کرده‌اید، این بخش آن را می‌سازد
insert into storage.buckets (id, name, public) values ('hero-images', 'hero-images', true)
on conflict (id) do nothing;

drop policy if exists "public read hero-images" on storage.objects;
create policy "public read hero-images" on storage.objects
  for select using (bucket_id = 'hero-images');

drop policy if exists "authenticated upload hero-images" on storage.objects;
create policy "authenticated upload hero-images" on storage.objects
  for insert with check (bucket_id = 'hero-images' and auth.role() = 'authenticated');

drop policy if exists "authenticated delete hero-images" on storage.objects;
create policy "authenticated delete hero-images" on storage.objects
  for delete using (bucket_id = 'hero-images' and auth.role() = 'authenticated');

-- مقادیر پیش‌فرض (همان محتوای فعلی سایت) برای ردیف تنظیمات
update settings set
  hero_badge = coalesce(hero_badge, 'مشاوره کسب‌وکار و هوش مصنوعی'),
  hero_title_prefix = coalesce(hero_title_prefix, 'کسب‌وکار خود را با'),
  hero_title_highlight = coalesce(hero_title_highlight, 'قدرت هوش مصنوعی'),
  hero_title_suffix = coalesce(hero_title_suffix, 'رشد دهید'),
  hero_description = coalesce(hero_description, 'از راه‌اندازی استارتاپ تا اتوماسیون فرآیندها و کانتنت مارکتینگ هدفمند؛ با مشاوره عملی، نتیجه‌محور و بدون پیچیدگی فنی.'),
  hero_image = coalesce(hero_image, 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=80'),
  hero_primary_cta = coalesce(hero_primary_cta, 'رزرو جلسه مشاوره رایگان'),
  hero_secondary_cta = coalesce(hero_secondary_cta, 'مطالعه مقالات'),
  hero_trust_text = coalesce(hero_trust_text, 'مورد اعتماد بیش از ۵۰۰ کسب‌وکار'),
  about_badge = coalesce(about_badge, 'درباره من'),
  about_title_prefix = coalesce(about_title_prefix, 'مشاوره‌ای بر پایه'),
  about_title_highlight = coalesce(about_title_highlight, 'اعتماد و شفافیت'),
  about_description = coalesce(about_description, 'همراهی عملی برای کسب‌وکارها در مسیر رشد، با تمرکز بر تصمیم‌های روشن و قابل اجرا — بدون پیچیدگی غیرضروری.'),
  about_card_title = coalesce(about_card_title, 'مسیر روشن تا تصمیم بهتر'),
  about_card_description = coalesce(about_card_description, 'با یک جلسه شروع می‌کنیم، پیشنهادهای عملی دریافت می‌کنید و قدم‌به‌قدم در کنار شما پیش می‌رویم.'),
  about_image = coalesce(about_image, 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80'),
  about_principles = case when about_principles = '{}' or about_principles is null then array[
    'مشاوره و بازبینی مستقل',
    'آمادگی برای رعایت استانداردها',
    'گزارش‌دهی واضح و بدون ابهام'
  ] else about_principles end,
  about_secondary_image = coalesce(about_secondary_image, 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80'),
  about_quote_title = coalesce(about_quote_title, 'مشاوره‌ای بر پایه ساختار و حرفه‌ای‌گری'),
  about_quote_text = coalesce(about_quote_text, 'هر همکاری با شناخت دقیق کسب‌وکار شما شروع می‌شود؛ سپس پیشنهادهایی متناسب با منابع و اهداف واقعی شما ارائه می‌دهیم.')
where id = 1;

-- اگر جدول services هنوز خالی است، سه کارت پیش‌فرض را اضافه کن
insert into services (position, icon, title, subtitle, description, audience, steps, featured)
select * from (values
  (0, 'Rocket', 'راه‌اندازی و رشد استارتاپ', 'از ایده تا مدل کسب و کار پایدار',
    'خیلی‌ها با ایده عالی شروع می‌کنن، ولی بدون یه نقشه راه مشخص، وقت و پول هدر می‌ره. با هم بررسی می‌کنیم ایده‌ات واقعاً بازار داره یا نه — قبل از اینکه یه ریال خرج کنی.',
    array['ایده‌پردازها', 'استارتاپ‌های مرحله اول', 'کسب و کارهای نوپا'],
    array['اعتبارسنجی ایده و بازار هدف', 'طراحی مدل درآمدی واقع‌بینانه', 'نقشه راه ۶ ماهه اجرایی', 'آمادگی برای سرمایه‌گذار'],
    false),
  (1, 'Brain', 'هوش مصنوعی در کسب و کار', 'نه فقط تکنولوژی — نتیجه واقعی',
    'همه می‌گن «باید از AI استفاده کنیم» ولی کمتر کسی می‌دونه کجا و چطور. من کمک می‌کنم جاهایی پیدا کنی که هوش مصنوعی مستقیماً وقت و هزینه‌ات رو کم می‌کنه — نه فقط یه ابزار جدید که بهش یاد بگیری.',
    array['صاحبان کسب و کار', 'تیم‌های مدیریتی', 'استارتاپ‌های B2B'],
    array['شناسایی فرصت‌های AI در جریان کار', 'انتخاب ابزار مناسب (نه هر چیزی که مد شده)', 'پیاده‌سازی و تست با تیم', 'اندازه‌گیری نتیجه و بهینه‌سازی'],
    true),
  (2, 'TrendingUp', 'دیجیتال مارکتینگ هدفمند', 'جذب مشتری، نه فقط فالوور',
    'پست گذاشتن و تبلیغ دادن به‌تنهایی کافی نیست. مشکل اصلی اینه که اکثر کسب و کارها بدون استراتژی بودجه هدر می‌دن. باهم یه فانل فروش می‌سازیم که آدم رو از «شنیدن اسمت» به «خریدن ازت» می‌رسونه.',
    array['کسب و کارهای آنلاین', 'برندهای در حال رشد', 'فروشگاه‌های دیجیتال'],
    array['آدیت وضعیت فعلی دیجیتال', 'طراحی فانل فروش', 'اجرا و تست کمپین', 'گزارش و بهینه‌سازی ماهانه'],
    false)
) as seed(position, icon, title, subtitle, description, audience, steps, featured)
where not exists (select 1 from services);
