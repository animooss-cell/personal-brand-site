import { SITE_URL } from "@/lib/site";

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

const FAQ_HEADING_RE = /^(سؤالات متداول|سوالات متداول|پرسش‌های متداول)/;

export function extractFaq(html: string): FaqItem[] {
  if (!html) return [];

  const headings = collectHeadings(html);
  const faqIndex = headings.findIndex((h) => h.level === 2 && FAQ_HEADING_RE.test(h.text));
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
