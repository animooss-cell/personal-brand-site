-- fix/gsc-oct-2026
-- این فایل خودکار اجرا نمی‌شود. فقط بعد از بازبینی، در Supabase SQL Editor اجرا کنید.
-- متن‌ها همان متن‌های docs/gsc-meta-updates-oct-2026.md هستند (از یک منبع ساخته شده‌اند). اسلاگ و title (H1) تغییر نمی‌کنند.

begin;

update posts set
  seo_title = $META$افزونه دوبله فارسی کروم؛ یوتیوب را به زبان خودتان ببینید$META$,
  meta_description = $META$با یک اکستنشن ساده روی کروم، ویدیوهای انگلیسی یوتیوب را با صدای فارسی ببینید. آموزش نصب و راه‌اندازی قدم‌به‌قدم، حتی اگر تا حالا افزونه‌ای نصب نکرده‌اید.$META$,
  updated_at = now()
where slug = 'install-dubbing-extension-chrome-ahvaz';

update posts set
  seo_title = $META$گوگل شیت و جمینای کانواس؛ تحلیل جدول با هوش مصنوعی، رایگان$META$,
  meta_description = $META$کارهای تکراری گوگل شیت را به Gemini Canvas بسپارید: ساختن جدول، خلاصه کردن داده و پیدا کردن نکته‌های مهم آن. آموزش فارسی و قدم‌به‌قدم برای کسب‌وکارها.$META$,
  updated_at = now()
where slug = 'google-sheets-canvas-gemini-ahvaz';

update posts set
  seo_title = $META$پرامپت ChatGPT برای کسب‌وکار؛ ۱۰ نمونه فارسی و آماده‌ی کپی$META$,
  meta_description = $META$۱۰ پرامپت چت‌جی‌پی‌تی برای کارهای روزمره‌ی کسب‌وکار؛ اطلاعات کار خودتان را جایش بگذارید و در چند دقیقه خروجی قابل‌استفاده بگیرید.$META$,
  updated_at = now()
where slug = 'chatgpt-for-business-10-prompts';

commit;

-- ============================================================
-- بررسی فقط‌خواندنی: اسلاگ یا لینکی که از روی یک آدرس کامل ساخته شده باشد
-- (ریشه‌ی آدرس خراب /services/courses/<https و دامنه>smart-office-manager-ahvaz). هر ردیفی برگشت، از پنل ادمین اصلاحش کنید.
-- ============================================================
select 'courses' as tbl, id, slug from courses where slug ~* '^https?' or slug ~ '[/:]'
union all select 'posts', id, slug from posts where slug ~* '^https?' or slug ~ '[/:]'
union all select 'downloads', id, slug from downloads where slug ~* '^https?' or slug ~ '[/:]';

-- لینک‌های داخل متن مقاله‌ها که به یک اسلاگ خراب اشاره می‌کنند
select slug from posts where content ~* 'https?(www)?aiabedir' or content ~* 'servicescourses';
