-- feat/geo-entity
-- این فایل خودکار اجرا نمی‌شود. دستی در Supabase SQL Editor (تب Database) اجرا کنید.
-- همه‌ی دستورها idempotent هستند؛ اجرای دوباره چیزی را دوباره تغییر نمی‌دهد.
--
-- پیش از اجرا می‌توانید ببینید چه ردیف‌هایی تغییر می‌کنند:
--   select id, title, place from about_timeline where title ilike '%استارتاپ ویکند%' or title || coalesce(place, '') ilike '%در خدمت%روابط عمومی%';
--   select id, title, slug, duration from courses where title ilike '%در خدمت%روابط عمومی%';
--   select social_links from about_content where id = 1;
--   select slug, title, duration, outline from courses where slug = 'ai-public-relations';

-- ۱) استارتاپ ویکند در تایم‌لاین صفحه‌ی درباره: فهرست کامل و یکسان شهرها و نقش.
--    سال شروع («۹۳ تا کنون») همان مقدار قبلی سایت است.
update about_timeline
set title = 'تسهیلگر، منتور و داور استارتاپ ویکند',
    place = '۹۳ تا کنون — اهواز، شوشتر، تهران، کرج و کرمانشاه'
where title ilike '%استارتاپ ویکند%';

-- ۲) نام رسمی دوره‌ی روابط عمومی: «هوش مصنوعی در خدمت تیم روابط عمومی».
--    دو نام قدیمی جایگزین می‌شوند: «هوش مصنوعی در خدمت تولید محتوای روابط عمومی» (عنوان دوره در جدول courses)
--    و «هوش مصنوعی در خدمت روابط عمومی». نام جدید هیچ‌کدام از این دو را در خود ندارد، پس اجرای دوباره بی‌اثر است.
--    فقط نام عوض می‌شود؛ slug، مدت و سرفصل دوره دست نمی‌خورند.

update courses
set title = replace(replace(title, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                    'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
    description = replace(replace(description, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                          'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
    content = replace(replace(content, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                      'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی')
where coalesce(title, '') || coalesce(description, '') || coalesce(content, '')
      ~ 'هوش مصنوعی در خدمت (تولید محتوای )?روابط عمومی';

update about_timeline
set title = replace(replace(title, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                    'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
    place = replace(replace(place, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                    'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی')
where coalesce(title, '') || coalesce(place, '') ~ 'هوش مصنوعی در خدمت (تولید محتوای )?روابط عمومی';

-- متن‌ها و آرایه‌های صفحه‌ی درباره (ترتیب آیتم‌های آرایه حفظ می‌شود)
create or replace function pg_temp.fix_pr_name(t text) returns text language sql immutable as $$
  select replace(replace(t, 'هوش مصنوعی در خدمت تولید محتوای روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی'),
                 'هوش مصنوعی در خدمت روابط عمومی', 'هوش مصنوعی در خدمت تیم روابط عمومی')
$$;

update about_content
set short_bio = pg_temp.fix_pr_name(short_bio),
    full_bio = pg_temp.fix_pr_name(full_bio),
    role_title = pg_temp.fix_pr_name(role_title),
    activities = (select coalesce(array_agg(pg_temp.fix_pr_name(x) order by i), '{}') from unnest(activities) with ordinality as a(x, i)),
    specialties = (select coalesce(array_agg(pg_temp.fix_pr_name(x) order by i), '{}') from unnest(specialties) with ordinality as a(x, i)),
    collaborations = (select coalesce(array_agg(pg_temp.fix_pr_name(x) order by i), '{}') from unnest(collaborations) with ordinality as a(x, i))
where concat_ws('|', short_bio, full_bio, role_title, array_to_string(activities, '|'), array_to_string(specialties, '|'),
                array_to_string(collaborations, '|')) ~ 'هوش مصنوعی در خدمت (تولید محتوای )?روابط عمومی';

-- ۳) اینستاگرام رسمی: https://www.instagram.com/aiabed.ir به‌جای startuping_ir
update about_content
set social_links = jsonb_set(social_links, '{instagram}', '"https://www.instagram.com/aiabed.ir"')
where social_links ->> 'instagram' ilike '%startuping_ir%';

-- ۴) دوره‌ی «هوش مصنوعی در خدمت تیم روابط عمومی»: مدت ۱۶ ساعت در ۲ جلسه (به‌جای «۶ ساعت»)،
--    و سرفصل نمونه‌کار به سرفصل‌های فعلی اضافه می‌شود (سرفصل‌های فعلی حذف نمی‌شوند؛ اگر از قبل باشد دوباره اضافه نمی‌شود).
update courses
set duration = '۱۶ ساعت (۲ جلسه)'
where (slug = 'ai-public-relations' or title = 'هوش مصنوعی در خدمت تیم روابط عمومی')
  and duration is distinct from '۱۶ ساعت (۲ جلسه)';

update courses
set outline = coalesce(outline, '{}') || array['۱۰ ساختار پرامپت‌نویسی برای تولید خبر، بیانیه و کپشن اینستاگرام']
where (slug = 'ai-public-relations' or title = 'هوش مصنوعی در خدمت تیم روابط عمومی')
  and not ('۱۰ ساختار پرامپت‌نویسی برای تولید خبر، بیانیه و کپشن اینستاگرام' = any(coalesce(outline, '{}')));

-- ۵) تلگرام: لینک قدیمی t.me/Staruping_ir با کانال رسمی https://t.me/aiabed_ir جایگزین می‌شود.
--    اکانت شخصی t.me/abedahm دست نمی‌خورد.
update about_content
set social_links = jsonb_set(social_links, '{telegram}', '"https://t.me/aiabed_ir"')
where social_links ->> 'telegram' ilike '%staruping_ir%';
