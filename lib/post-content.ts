import { SITE_URL } from "@/lib/site";
import { transformImageUrl } from "@/lib/image-loader";

// بدون وابستگی به DOM یا کتابخانه‌ی جدید؛ فقط regex + URL استاندارد، چون باید
// روی Cloudflare Workers (بدون jsdom/cheerio) اجرا شود.

function buildInternalHosts(): Set<string> {
  const hosts = new Set(["aiabed.ir", "www.aiabed.ir"]);
  try {
    const hostname = new URL(SITE_URL).hostname.toLowerCase();
    hosts.add(hostname);
    hosts.add(hostname.startsWith("www.") ? hostname.slice(4) : `www.${hostname}`);
  } catch {
    // SITE_URL نامعتبر است؛ هاست‌های پیش‌فرض بالا کافی‌اند.
  }
  return hosts;
}

const INTERNAL_HOSTS = buildInternalHosts();

// اگر href یک scheme صریح غیر از http/https داشته باشد (mailto:, tel:,
// javascript: و ...) اصلاً به‌عنوان لینک داخلی/خارجی حساب نمی‌شود — طبق
// الزام «mailto/tel داخلی حساب نشوند»، و برای ایمنی در برابر javascript:.
const EXPLICIT_SCHEME = /^[a-z][a-z0-9+.-]*:/i;

type LinkKind = "internal" | "external" | "skip";

function classifyHref(rawHref: string): LinkKind {
  const href = rawHref.trim();
  if (!href) return "skip";

  const schemeMatch = href.match(EXPLICIT_SCHEME);
  if (schemeMatch) {
    const scheme = schemeMatch[0].slice(0, -1).toLowerCase();
    if (scheme !== "http" && scheme !== "https") return "skip";
  }

  try {
    const url = new URL(href, SITE_URL);
    return INTERNAL_HOSTS.has(url.hostname.toLowerCase()) ? "internal" : "external";
  } catch {
    return "external";
  }
}

// استخراج مقدار یک ویژگی از رشته‌ی attributeهای یک تگ — هم کوتیشن دوتایی،
// هم تک‌کوتیشن، و هم بدون کوتیشن را پشتیبانی می‌کند. اگر ویژگی وجود نداشته
// باشد null برمی‌گرداند (مثلاً تگ <a> بدون href).
function getAttr(attrs: string, name: string): string | null {
  // (?:^|\s) به‌جای \b تا مثلاً "rel" داخل یک ویژگی دیگر مثل "data-rel" به
  // اشتباه به‌عنوان ویژگی rel تشخیص داده نشود.
  const pattern = new RegExp(`(?:^|\\s)${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s"'=<>\`]+))`, "i");
  const match = attrs.match(pattern);
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? "";
}

function removeAttr(attrs: string, name: string): string {
  const pattern = new RegExp(`\\s+${name}\\s*=\\s*("[^"]*"|'[^']*'|[^\\s"'=<>\`]+)`, "gi");
  return attrs.replace(pattern, "");
}

function buildExternalRel(existingRel: string | null): string {
  const tokens = new Set(
    (existingRel ?? "")
      .split(/\s+/)
      .map((t) => t.trim().toLowerCase())
      .filter((t) => /^[a-z0-9_-]+$/.test(t))
  );
  tokens.add("noopener");
  tokens.add("noreferrer");
  return Array.from(tokens).join(" ");
}

const ANCHOR_OPEN_TAG = /<(a)\b([^>]*)>/gi;

export function normalizeContentLinks(html: string): string {
  if (!html) return html;

  return html.replace(ANCHOR_OPEN_TAG, (fullMatch, tagName: string, attrs: string) => {
    const hrefValue = getAttr(attrs, "href");
    if (hrefValue === null) return fullMatch;

    const kind = classifyHref(hrefValue);
    if (kind === "skip") return fullMatch;

    const nextAttrs = removeAttr(removeAttr(attrs, "rel"), "target");

    if (kind === "internal") {
      return `<${tagName}${nextAttrs}>`;
    }

    const relValue = buildExternalRel(getAttr(attrs, "rel"));
    return `<${tagName}${nextAttrs} rel="${relValue}" target="_blank">`;
  });
}

export type FaqItem = { question: string; answer: string };

type HeadingMatch = { level: 2 | 3; text: string; start: number; end: number };

function stripTags(fragment: string): string {
  return fragment
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function collectHeadings(html: string): HeadingMatch[] {
  const headings: HeadingMatch[] = [];
  const re = /<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    headings.push({
      level: Number(match[1]) as 2 | 3,
      text: stripTags(match[2]),
      start: match.index,
      end: match.index + match[0].length,
    });
  }
  return headings;
}

// نسخه‌های املایی/تایپی مختلف تیتر «سؤالات متداول» را به یک شکل یکسان
// برمی‌گرداند تا تشخیص این تیتر به نگارش دقیق ادمین حساس نباشد: حذف
// تگ/اینتیتی‌های HTML، یکسان‌سازی حروف عربی (ي/ك/ؤ) به فارسی، حذف نیم‌فاصله
// و اعراب، حذف نشانه‌های نگارشی رایج در پایان تیتر، و یکدست‌سازی فاصله‌ها.
export function normalizePersianHeading(text: string): string {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/[\u064b-\u0652]/g, "")
    .replace(/\u200c/g, "")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ؤ/g, "و")
    .replace(/[:؟?.]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// دو حالت فاصله‌گذاری «پرسش‌های» (با نیم‌فاصله، که بعد از نرمال‌سازی به‌هم
// می‌چسبد) و «پرسش های» (با فاصله‌ی معمولی، که نیم‌فاصله حساب نمی‌شود و بعد
// از نرمال‌سازی جدا می‌ماند) هر دو باید به‌عنوان تیتر سؤالات متداول شناخته شوند.
const FAQ_HEADING_TARGETS = new Set(
  ["سوالات متداول", "پرسشهای متداول", "پرسش های متداول", "پرسش و پاسخ", "سوالات رایج"].map(
    normalizePersianHeading
  )
);

// تیتر را FAQ می‌داند اگر دقیقاً برابر یکی از FAQ_HEADING_TARGETS باشد، یا با
// یکی از آن‌ها شروع شود و بلافاصله یک فاصله بیاید (مثل «سوالات متداول درباره
// هوش مصنوعی در اکسل»). این یعنی عبارت باید در همان ابتدای تیتر بیاید، نه
// وسط یا آخر آن (مثل «چرا سوالات متداول مهم‌اند» که نباید FAQ حساب شود).
function isFaqHeading(text: string): boolean {
  const normalized = normalizePersianHeading(text);
  if (FAQ_HEADING_TARGETS.has(normalized)) return true;

  for (const target of FAQ_HEADING_TARGETS) {
    if (normalized.startsWith(`${target} `)) return true;
  }
  return false;
}

export function extractFaq(html: string): FaqItem[] {
  if (!html) return [];

  const headings = collectHeadings(html);
  const faqIndex = headings.findIndex((h) => h.level === 2 && isFaqHeading(h.text));
  if (faqIndex === -1) return [];

  const items: FaqItem[] = [];
  for (let i = faqIndex + 1; i < headings.length; i++) {
    const heading = headings[i];
    if (heading.level === 2) break;
    if (!heading.text) continue;

    const nextStart = i + 1 < headings.length ? headings[i + 1].start : html.length;
    const answer = stripTags(html.slice(heading.end, nextStart));

    items.push({ question: heading.text, answer });
  }

  return items;
}

export function buildFaqJsonLd(items: FaqItem[]) {
  if (items.length < 2) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const IMG_OPEN_TAG = /<(img)\b([^>]*)>/gi;

// برای تصویرهایی داخل محتوای دوره/پست که alt خالی یا بدون alt هستند — در زمان
// رندر، alt را با یک متن جایگزین (مثلاً عنوان دوره) پر می‌کند تا دسترس‌پذیری
// و سئوی تصویر حفظ شود.
export function fillEmptyImageAlt(html: string, fallbackAlt: string): string {
  if (!html) return html;
  const safeFallback = escapeHtmlAttr(fallbackAlt);

  return html.replace(IMG_OPEN_TAG, (fullMatch, tagName: string, attrs: string) => {
    const altValue = getAttr(attrs, "alt");
    if (altValue !== null && altValue.trim() !== "") return fullMatch;

    const nextAttrs = removeAttr(attrs, "alt");
    return `<${tagName}${nextAttrs} alt="${safeFallback}">`;
  });
}

const CONTENT_IMAGE_WIDTH = 1200;

// تصویرهای داخل محتوای پست/خبر/دوره را برای LCP بهینه می‌کند: آدرس تصویرهای
// Supabase Storage را با transformImageUrl (همان منطق lib/image-loader.ts) به
// نسخه‌ی تبدیل‌شده با width=1200 تغییر می‌دهد (برای تصویرهای غیر-Supabase،
// بدون تغییر)، و به همه‌ی تصویرها (صرف‌نظر از منبع) loading="lazy" و
// decoding="async" اضافه می‌کند تا رندر اولیه‌ی صفحه معطل آن‌ها نماند. alt و
// بقیه‌ی ویژگی‌ها دست‌نخورده می‌مانند؛ تگ <img> بدون src نادیده گرفته می‌شود.
export function optimizeContentImages(html: string): string {
  if (!html) return html;

  return html.replace(IMG_OPEN_TAG, (fullMatch, tagName: string, attrs: string) => {
    const srcValue = getAttr(attrs, "src");
    if (srcValue === null) return fullMatch;

    let nextAttrs = attrs;

    const transformedSrc = transformImageUrl(srcValue, CONTENT_IMAGE_WIDTH);
    if (transformedSrc !== srcValue) {
      nextAttrs = `${removeAttr(nextAttrs, "src")} src="${escapeHtmlAttr(transformedSrc)}"`;
    }

    if (getAttr(nextAttrs, "loading") === null) {
      nextAttrs += ` loading="lazy"`;
    }
    if (getAttr(nextAttrs, "decoding") === null) {
      nextAttrs += ` decoding="async"`;
    }

    return `<${tagName}${nextAttrs}>`;
  });
}

// JSON.stringify به‌تنهایی کاراکترهای </script> یا <!-- را escape نمی‌کند؛
// یک رشته‌ی حاوی این دنباله‌ها داخل <script type="application/ld+json">
// می‌تواند تگ را زودتر ببندد (شکستن اسکیما یا حتی XSS). خروجی این تابع باز
// هم دقیقاً همان دادهٔ اصلی را JSON.parse می‌کند، فقط امن‌تر در HTML تزریق می‌شود.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

const H3_OPEN_TAG = /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi;

// بخش «سؤالات متداول» را به چند <details>/<summary> بومی HTML تبدیل می‌کند تا
// بدون جاوااسکریپت به‌صورت آکاردئون نمایش داده شود. دقیقاً همان منطق تشخیص
// extractFaq را برای پیدا کردن مرز بخش FAQ به کار می‌برد (تیتر H2ای که
// isFaqHeading است تا اولین H2 بعدی یا پایان HTML)، اما به‌جای استخراج متن
// ساده برای JSON-LD، HTML خام سؤال و جواب را دست‌نخورده نگه می‌دارد تا
// قالب‌بندی‌های داخل جواب (پاراگراف، لیست و ...) از بین نرود. تیتر H2 خودِ
// بخش FAQ دست‌نخورده باقی می‌ماند. اگر بخشی برای تبدیل پیدا نشود، HTML اصلی
// بدون تغییر برمی‌گردد.
export function wrapFaqAccordion(html: string): string {
  if (!html) return html;

  const headings = collectHeadings(html);
  const faqIndex = headings.findIndex((h) => h.level === 2 && isFaqHeading(h.text));
  if (faqIndex === -1) return html;

  let sectionEnd = html.length;
  for (let i = faqIndex + 1; i < headings.length; i++) {
    if (headings[i].level === 2) {
      sectionEnd = headings[i].start;
      break;
    }
  }

  const faqHeadingEnd = headings[faqIndex].end;
  const sectionHtml = html.slice(faqHeadingEnd, sectionEnd);

  const questions: { start: number; end: number; innerHtml: string }[] = [];
  let match: RegExpExecArray | null;
  H3_OPEN_TAG.lastIndex = 0;
  while ((match = H3_OPEN_TAG.exec(sectionHtml)) !== null) {
    questions.push({ start: match.index, end: match.index + match[0].length, innerHtml: match[1] });
  }

  // بخش FAQ پیدا شد اما هیچ سؤالی (H3) داخلش نیست؛ چیزی برای تبدیل به
  // آکاردئون وجود ندارد.
  if (questions.length === 0) return html;

  // متنی که بین تیتر H2 و اولین H3 باشد (مثلاً یک پاراگراف مقدمه) دست‌نخورده
  // و خارج از هر <details> باقی می‌ماند.
  let rebuilt = sectionHtml.slice(0, questions[0].start);

  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const answerStart = question.end;
    const answerEnd = i + 1 < questions.length ? questions[i + 1].start : sectionHtml.length;
    const answerHtml = sectionHtml.slice(answerStart, answerEnd);

    rebuilt += `<details class="faq-item"><summary class="faq-q"><h3>${question.innerHtml}</h3></summary><div class="faq-a">${answerHtml}</div></details>`;
  }

  return html.slice(0, faqHeadingEnd) + rebuilt + html.slice(sectionEnd);
}

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
