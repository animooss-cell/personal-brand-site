# Design audit of aiabed.ir

Report only. Nothing in this audit has been fixed or changed on the site.

- **Date:** 2026-10-25, on `main` at commit `b8bd074`.
- **Pages:** home `/`, `/services`, `/about`, `/contact`.
- **Widths:** 390px (phone), 768px (tablet), 1440px (desktop).
- **Tools:** the design-taste-frontend skill: `scripts/inspect.mjs` (real-browser measurements and screenshots), `scripts/lint.mjs` (source scan of `app/` and `components/`) and the critique method in `references/critique.md`.
- **Screenshots:** `screenshots/<page>/` holds `desktop-*`, `tablet-*` and `mobile-*` images plus `inspect.txt`, the full inspector output.

## What could not be checked here

The audit ran in a sandbox with no outside network, against `next dev` on localhost. Three things follow from that:

1. **Supabase was unreachable.** Everything that comes from the database rendered empty or with fallback values. That covers the services cards on the home page ("هنوز کارت خدماتی ثبت نشده است."), the latest posts ("هنوز پستی منتشر نشده است."), the courses list, and the hero and about images, which come from the settings table. `/blog`, `/news` and the category pages returned a 500 error and were not audited.
2. **External images were blocked.** The fallback Unsplash images in `Hero.tsx` and `About.tsx` show as broken. On the live site these slots probably hold real pictures, so the inspector's `broken-image` and part of its `few-pictures` findings for the home page are sandbox effects, not site bugs.
3. **Dark mode, the blog, news, downloads and course pages were not audited.** They should be checked against the live site before any work on them.

Findings affected by these limits are marked *(sandbox)* below. Everything else is visible in the screenshots and does not depend on the data.

## Critique (round 1, in the skill's format)

```
ROUND 1
Seen in one second: a dark green rounded box with white text; no single thing leads.
Idea (one sentence): none yet. The page reads as "an AI consultant", and with the logo covered it could be any consultant's site. The material for an idea is there (Ahvaz and Khuzestan, Foulad Khuzestan training, Startup Weekend mentoring, 10+ years of local events) but it sits in small text.
Live thing: none.
Layout words by section (home): hero=split-in-box / services=card-grid / why-me=icon-card-grid / blog=card-grid / about=card-mosaic / cta=centred-box / footer=sitemap.
Scores: design 5 · usability 5.5 · creativity 4.5 · content 6.5 → overall 5.2
Caps applied: inspector FAILs (≤6.0); eyebrow labels, gradients, resting shadows (≤6.5); fewer than 4 real pictures (design ≤6.5); no live thing (creativity ≤7.5); the page could belong to anyone (creativity ≤6).
Top three problems:
1. The main button is unreadable: white on #00C389 is 2.29:1 (all pages, every viewport).
2. The header breaks at 768px: links wrap onto two or three lines, the logo shrinks to a sliver and the "رزرو جلسه رایگان" button becomes a circle (all pages, tablet-fold.jpg).
3. The first screen has no focal point: the largest type is 48px (3.3vw), and on the home page two words of the headline are coloured green (home/desktop-fold.jpg).
```

## Problems by priority

### P1: accessibility and broken layout (fix first)

1. **The primary action fails contrast everywhere.** Every "رزرو جلسه رایگان" button (navigation, hero, CTA band), "ارسال پیام", "ارسال و شروع", "در لیست انتظار ثبت‌نام کن" and "باهام در تماس باش" is white text on `#00C389`, a ratio of **2.29:1**. The minimum for normal text is 4.5:1. Green text on the page background is just as weak: "همه مقالات" is `#00C389` on `#FAFAF9`, **2.19:1**. Measured options that pass while keeping the brand: dark ink `#0F172A` on `#00C389` gives 7.79:1, and white on `brand-700` `#007553` gives 5.72:1. White on `brand-600` `#009C6E` gives only 3.51:1 and is not enough. *Inspector: `contrast` FAIL on all four pages.*
2. **The header collapses on tablets (768px).** Nav links wrap to two or three lines ("درباره / من", "اخبار / هوش / مصنوعی"), the logo is squeezed to a few pixels and the header button turns into a circle with the text on three lines. This happens on every page because the navbar is shared. Evidence: `screenshots/*/tablet-fold.jpg`. The menu probably needs to switch to the phone (hamburger) menu at this width, or the link list needs to be shorter.
3. **The home hero headline runs to 5 lines at 768px** ("کسب‌وکار خود را با قدرت هوش مصنوعی رشد دهید"). The two hero buttons also wrap their labels onto two lines at this width. Evidence: `home/tablet-fold.jpg`. *Inspector: `headline-lines` FAIL.*
4. **Running text is set at 14px** on home, about and contact. The skill's floor is 16px and Persian text needs it more than Latin does, because the dots and small letter forms close up at small sizes. Much of it is also set in grey (`text-slate-600`, and `text-slate-400` at 12px for the hero trust line). *Inspector: `body-size` FAIL; `small-text` WARN on home (text under 13px, e.g. "مورد اعتماد بیش از ۵۰۰ کسب‌وکار").*

### P2: hierarchy and composition

5. **No focal point on any first screen.** The largest type is 48px (3.3vw) on home, services and about, and 36px on contact. The studied strong sites have a median of 8.4vw. The hero picture covers 17% of the home first screen (*sandbox*: it is also broken here). The result is a box of medium-sized things where nothing leads. *Inspector: `focal-point` FAIL on all four pages.*
6. **Styled accent words in headlines.** "قدرت" and "هوش مصنوعی" in the home hero, and "اعتماد و شفافیت" in the about section, are coloured green. That is a known template device, and the green on the light background also fails contrast.
7. **Eyebrow labels above headings.** The pill "مشاوره کسب‌وکار و هوش مصنوعی" above the hero headline, "چرا من؟" above "چرا با من کار کنید؟" and "درباره من" above the about heading. Each repeats what the heading already says. *Inspector: `eyebrow` FAIL on home.*
8. **Gradients, resting shadows and 1px outlined boxes everywhere.** In the rendered pages, the hero box, the "why me" featured card, the about-page specialty panel and the footer all use `bg-gradient-to-br`. The source has 13 gradient fills, 45 shadow utilities and 21 thin borders and dividers (`lint.mjs`). Buttons and cards carry shadows at rest, and most cards are white boxes with a 1px border. *Inspector: `gradient`, `shadow` and `outlined-box` FAIL on home, services and about.*
9. **Rows of identical icon-topped cards.** Home "چرا با من کار کنید؟" (3 cards), services "همه خدمات" (4 cards) and about "فعالیت‌های جاری" (6 cards) all use the same small-icon-in-a-tinted-square card. Neighbouring sections share the same layout, so the page reads as a kit. *Inspector: `icon-cards` FAIL.*
10. **The frame is uneven.** At 1440px the page margins differ (185px on the left, 168px on the right) on home and about. Text starts at 11 to 12 different x positions down the page (the strong sites use 2 or 3). Headings and paragraphs are centred almost everywhere, and the services intro is a centred paragraph about 96 characters wide over 6 lines, which is hard to read. *Inspector: `off-centre`, `ragged-edges` and `measure` WARN.*

### P3: content, pictures and polish

11. **Few real pictures.** Services and contact have none, and home has two (both from settings, broken here: *sandbox*). The strongest picture the site owns, the portrait on `/about`, is shown as a small circle (128px on phones, 160px on desktop) inside the dark header box. The subject has real visual material (events in Ahvaz, Startup Weekend, training sessions at Foulad Khuzestan) that never appears. *Inspector: `few-pictures` FAIL (partly sandbox), `no-footage` WARN.*
12. **No button on the first phone screen** of services, about and contact. On the home page at 390px the broken hero image leaves a tall empty block above the headline (*sandbox*, but check that the live picture is cropped sensibly on phones). *Inspector: `first-action` WARN.*
13. **About page details.** The h1 is the bare name "عبدالله احمدیان" and the phone first screen says nothing else about what he does (*inspector: `name-only-title`*). The partners list ("همکاری‌ها") is a grid of small outlined chips with a repeated shield icon, which undersells real organisations. The experience timeline hangs on a thin vertical line.
14. **Empty states look unfinished.** When there is no data the sections show one grey sentence (`#94a3b8`, 2.46:1) in a large empty band. This only shows when Supabase is empty or unreachable (*sandbox*), but it can happen in production too and should read as a designed state.
15. **The page barely moves.** Only one fade-in is used (7–10 moving elements on home and services, none on contact). The motion that exists is identical on every block. *Inspector: `still-page` FAIL.*
16. **Smaller items.** 32 em dashes in copy (`lint.mjs`), a hairline divider in the footer, `backdrop-blur` and `transition-all` in `BlogHeroSlider.tsx`, `animate-pulse` in `DownloadsGrid.tsx`, and 100vh (`h-screen`) in the admin layout (admin only).

## Inspector results per page

| Page | FAIL | WARN | Largest type | Body text | Pictures measured |
| --- | --- | --- | --- | --- | --- |
| Home | 11 | 6 | 48px (3.3vw) | 14px | 0 (sandbox: 3 broken) |
| Services | 8 | 5 | 48px (3.3vw) | 16px | 0 |
| About | 8 | 6 | 48px (3.3vw) | 14px | 1 |
| Contact | 7 | 5 | 36px (2.5vw) | 14px | 0 |

Source scan (`lint.mjs` on `app/` and `components/`): 80 FAIL (45 shadow, 21 hairline, 13 gradient, 1 monospace in the admin editor), 11 WARN.

## What works and should be kept

- One typeface (Vazirmatn) everywhere, loaded correctly, and a clear brand pair of green and dark blue.
- The dark blue CTA band (`#0F4C81`) has good contrast with white text (8.86:1) and is the strongest flat colour field on the site.
- The content is specific: Ahvaz, Khuzestan, Foulad Khuzestan, Startup Weekend, named events and partner organisations. That is the material a real design idea can come from.
- The contact form is simple, labelled and laid out in a clear two-column grid on desktop.
- Phone layouts stack cleanly with no horizontal scroll.
- `prefers-reduced-motion` is already respected in `globals.css`.

## The three changes that would help most

1. **Make the main action readable** (P1-1): dark text on `#00C389`, or a `brand-700` fill with white text, for every primary button and green text link.
2. **Fix the tablet header and hero** (P1-2, P1-3): switch the header to the phone menu at tablet widths and keep the hero headline to two lines at every width.
3. **Give the home first screen one dominant thing** (P2-5 to P2-8): a much larger headline in one colour, no pill label, a flat field instead of the gradient box, and a real picture of the consultant's own work given real space.

Each of these is a separate section and a separate PR, under the rules in `CLAUDE.md`.
