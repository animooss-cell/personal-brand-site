import { SITE_URL } from "@/lib/site";

// ابزارهای ساخت نسخه‌ی Markdown صفحه‌ها (برای llms-full.txt و پاسخ Accept: text/markdown).
// هر صفحه Markdown خودش را از همان داده‌ای می‌سازد که HTML را می‌سازد؛ این فایل فقط قالب‌بندی است.

export const absUrl = (href: string) => (href.startsWith("/") ? `${SITE_URL}${href}` : href);

export function mdHeading(level: number, text: string) {
  return `${"#".repeat(Math.min(Math.max(level, 1), 6))} ${text.trim()}`;
}

export function mdList(items: string[], ordered = false) {
  return items.map((item, i) => `${ordered ? `${i + 1}.` : "-"} ${item.trim()}`).join("\n");
}

export function mdLink(label: string, href: string) {
  return `[${label}](${absUrl(href)})`;
}

export function mdFaq(items: { q: string; a: string }[]) {
  return items.map((f) => `${mdHeading(3, f.q)}\n\n${f.a}`).join("\n\n");
}

// بلوک‌ها را با یک خط خالی بین‌شان کنار هم می‌گذارد و بلوک‌های خالی را حذف می‌کند.
export function mdJoin(blocks: (string | false | null | undefined)[]) {
  return blocks
    .filter((b): b is string => typeof b === "string" && b.trim() !== "")
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
}

// ─── HTML → Markdown برای محتوای مقاله‌ها (خروجی ویرایشگر tiptap) ───────────────────────────

type HtmlNode = { type: "text"; text: string } | { type: "el"; tag: string; attrs: Record<string, string>; children: HtmlNode[] };

const VOID = new Set(["img", "br", "hr", "input", "source", "meta", "link", "col", "wbr", "track", "area", "base", "embed", "param"]);
const BLOCK = new Set([
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "blockquote", "pre", "hr", "table", "thead", "tbody", "tfoot", "tr",
  "div", "section", "article", "figure", "figcaption", "details", "summary", "iframe", "video", "audio",
]);

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", zwnj: "‌", zwj: "‍", rlm: "‏", lrm: "‎" };

function decodeEntities(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function parseAttrs(raw: string) {
  const attrs: Record<string, string> = {};
  for (const m of raw.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return attrs;
}

function parseHtml(html: string): HtmlNode[] {
  const root: HtmlNode = { type: "el", tag: "#root", attrs: {}, children: [] };
  const stack: Extract<HtmlNode, { type: "el" }>[] = [root as Extract<HtmlNode, { type: "el" }>];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9]*)((?:[^>"']|"[^"]*"|'[^']*')*)>|([^<]+|<)/g;
  for (const m of html.matchAll(re)) {
    const top = stack[stack.length - 1];
    if (m[0].startsWith("<!--")) continue;
    if (m[4] !== undefined) {
      top.children.push({ type: "text", text: decodeEntities(m[4]) });
      continue;
    }
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    if (closing) {
      const idx = stack.map((n) => n.tag).lastIndexOf(tag);
      if (idx > 0) stack.length = idx;
      continue;
    }
    const el: Extract<HtmlNode, { type: "el" }> = { type: "el", tag, attrs: parseAttrs(m[3] ?? ""), children: [] };
    top.children.push(el);
    if (!VOID.has(tag) && !/\/\s*$/.test(m[3] ?? "")) stack.push(el);
  }
  return root.type === "el" ? root.children : [];
}

const isBlock = (n: HtmlNode) => n.type === "el" && BLOCK.has(n.tag);

function inline(nodes: HtmlNode[], pre = false): string {
  let out = "";
  for (const n of nodes) {
    if (n.type === "text") {
      out += pre ? n.text : n.text.replace(/\s+/g, " ");
      continue;
    }
    const inner = () => inline(n.children, pre);
    switch (n.tag) {
      case "strong":
      case "b": {
        const t = inner().trim();
        out += t ? `**${t}**` : "";
        break;
      }
      case "em":
      case "i": {
        const t = inner().trim();
        out += t ? `*${t}*` : "";
        break;
      }
      case "s":
      case "del":
      case "strike": {
        const t = inner().trim();
        out += t ? `~~${t}~~` : "";
        break;
      }
      case "code":
        out += pre ? inner() : `\`${inner().trim()}\``;
        break;
      case "a": {
        const t = inner().trim();
        const href = n.attrs.href;
        out += href && t ? `[${t}](${absUrl(href)})` : t;
        break;
      }
      case "img":
        out += n.attrs.src ? `![${n.attrs.alt ?? ""}](${absUrl(n.attrs.src)})` : "";
        break;
      case "br":
        out += pre ? "\n" : "  \n";
        break;
      case "script":
      case "style":
      case "button":
        break;
      default:
        out += isBlock(n) ? `\n\n${blocks([n])}\n\n` : inner();
    }
  }
  return out;
}

function listMd(el: Extract<HtmlNode, { type: "el" }>, depth: number): string {
  const ordered = el.tag === "ol";
  const indent = "   ".repeat(depth);
  let i = 0;
  return el.children
    .filter((c): c is Extract<HtmlNode, { type: "el" }> => c.type === "el" && c.tag === "li")
    .map((li) => {
      i += 1;
      const text = inline(li.children.filter((c) => !(c.type === "el" && (c.tag === "ul" || c.tag === "ol")))).replace(/\s*\n\s*/g, " ").trim();
      const nested = li.children
        .filter((c): c is Extract<HtmlNode, { type: "el" }> => c.type === "el" && (c.tag === "ul" || c.tag === "ol"))
        .map((c) => listMd(c, depth + 1))
        .join("\n");
      return `${indent}${ordered ? `${i}.` : "-"} ${text}${nested ? `\n${nested}` : ""}`;
    })
    .join("\n");
}

function tableMd(el: Extract<HtmlNode, { type: "el" }>): string {
  const rows: string[][] = [];
  const walk = (n: HtmlNode) => {
    if (n.type !== "el") return;
    if (n.tag === "tr") {
      rows.push(
        n.children
          .filter((c): c is Extract<HtmlNode, { type: "el" }> => c.type === "el" && (c.tag === "td" || c.tag === "th"))
          .map((c) => inline(c.children).replace(/\s+/g, " ").replace(/\|/g, "\\|").trim()),
      );
    } else n.children.forEach(walk);
  };
  walk(el);
  if (!rows.length) return "";
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r: string[]) => `| ${[...r, ...Array(width - r.length).fill("")].join(" | ")} |`;
  return [pad(rows[0]), `| ${Array(width).fill("---").join(" | ")} |`, ...rows.slice(1).map(pad)].join("\n");
}

function blocks(nodes: HtmlNode[]): string {
  const parts: string[] = [];
  let run: HtmlNode[] = [];
  const flush = () => {
    const t = inline(run).trim();
    if (t) parts.push(t);
    run = [];
  };
  for (const n of nodes) {
    if (!isBlock(n) || n.type !== "el") {
      run.push(n);
      continue;
    }
    flush();
    const level = /^h([1-6])$/.exec(n.tag);
    if (level) parts.push(mdHeading(Number(level[1]), inline(n.children).trim()));
    else if (n.tag === "p" || n.tag === "figcaption") parts.push(inline(n.children).trim());
    else if (n.tag === "summary")
      parts.push(n.children.some(isBlock) ? blocks(n.children) : `**${inline(n.children).trim()}**`);
    else if (n.tag === "ul" || n.tag === "ol") parts.push(listMd(n, 0));
    else if (n.tag === "blockquote")
      parts.push(
        blocks(n.children)
          .split("\n")
          .map((l) => (l ? `> ${l}` : ">"))
          .join("\n"),
      );
    else if (n.tag === "pre") parts.push("```\n" + inline(n.children, true).replace(/\n+$/, "") + "\n```");
    else if (n.tag === "hr") parts.push("---");
    else if (n.tag === "table") parts.push(tableMd(n));
    else if (n.tag === "iframe" || n.tag === "video" || n.tag === "audio") {
      const src = n.attrs.src || (n.children.find((c) => c.type === "el" && c.tag === "source") as { attrs?: Record<string, string> } | undefined)?.attrs?.src;
      if (src) parts.push(`[${n.attrs.title || "ویدیو"}](${absUrl(src)})`);
    } else parts.push(blocks(n.children));
  }
  flush();
  return parts.filter((p) => p.trim()).join("\n\n");
}

export function htmlToMarkdown(html: string): string {
  return blocks(parseHtml(html)).replace(/\n{3,}/g, "\n\n").trim();
}
