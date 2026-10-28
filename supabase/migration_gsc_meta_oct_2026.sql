-- fix/gsc-oct-2026
-- این فایل خودکار اجرا نمی‌شود. فقط دو کوئری فقط‌خواندنی پایین در آن مانده است.

-- متن‌ها در ۲۸ اکتبر ۲۰۲۶ از پنل ادمین وارد شدند؛ بلوک UPDATE عمداً حذف شد تا نسخهٔ قدیمی دوباره اجرا نشود.

-- ============================================================
-- بررسی فقط‌خواندنی: اسلاگ یا لینکی که از روی یک آدرس کامل ساخته شده باشد
-- (ریشه‌ی آدرس خراب /services/courses/<https و دامنه>smart-office-manager-ahvaz). هر ردیفی برگشت، از پنل ادمین اصلاحش کنید.
-- ============================================================
select 'courses' as tbl, id, slug from courses where slug ~* '^https?' or slug ~ '[/:]'
union all select 'posts', id, slug from posts where slug ~* '^https?' or slug ~ '[/:]'
union all select 'downloads', id, slug from downloads where slug ~* '^https?' or slug ~ '[/:]';

-- لینک‌های داخل متن مقاله‌ها که به یک اسلاگ خراب اشاره می‌کنند
select slug from posts where content ~* 'https?(www)?aiabedir' or content ~* 'servicescourses';
