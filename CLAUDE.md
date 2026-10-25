# وبسایت پرسنال برندینگ — مشاور کسب‌وکار هوش مصنوعی

## درباره پروژه
وبسایت شخصی برای مشاور کسب‌وکار با تخصص هوش مصنوعی.
هدف: جذب مشتری از طریق محتوا و خدمات، و ترغیب به رزرو جلسه مشاوره.

## خدمات اصلی
۱. آموزش هوش مصنوعی به کسب‌وکارها
۲. اتوماسیون فرآیندها بر اساس AI
۳. کانتنت مارکتینگ هدفمند

## تکنولوژی‌ها
- Framework: Next.js 14 (App Router)
- زبان: TypeScript
- استایل: Tailwind CSS
- فونت: Vazirmatn از Google Fonts
- آیکون: Lucide React
- Deploy: Vercel

## الزامات طراحی
- فارسی، RTL، dir="rtl"
- رنگ برند: #00C389 (سبز اصلی)، #0F4C81 (آبی تیره - brand-dark)
- فونت: Vazirmatn
- کارت وسط Services باید featured با border سبز باشه
- انیمیشن fade-in برای کارت‌ها

## ساختار صفحات
- صفحه اصلی: Hero + Services + Blog preview + Contact
- بلاگ: لیست پست‌ها
- تماس: فرم رزرو جلسه

## taste-skill
- For any page, landing page, dashboard or app screen, use the design-taste-frontend skill.
- Before running its scripts: export CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
- If running as root (the cloud sandbox), Chrome needs --no-sandbox, so use the wrapper instead: export CHROME_PATH="$(git rev-parse --show-toplevel)/.claude/chrome-no-sandbox.sh"

## Design improvement rules
- Never change the site's UI unless I explicitly ask for it, and even then only the same section I named.
- Every UI change: a separate branch, a separate PR, one section at a time. Never merge yourself.
- Never change these: URLs and routes, title/meta/Open Graph/schema/sitemap/robots, the text of H1/H2 headings, the content, links, forms, analytics and external integrations.
- Before any change, read docs/design/audit.md and the chosen file in docs/design/references/, and use the design-taste-frontend skill.
- New styles must be scoped to that one section and must not affect other parts of the site (no changes to global styles unless I ask).
- Before the PR: run the build, take before-and-after screenshots of the changed section and also of the other pages, to prove nothing else changed.
