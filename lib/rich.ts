import { mdLink } from "@/lib/markdown";

// متنی که وسطش لینک داخلی دارد؛ هم در HTML (components/RichText.tsx) و هم در Markdown از همین داده ساخته می‌شود.
export type RichPart = string | { href: string; label: string };
export type Rich = RichPart[];

export const richToMarkdown = (parts: Rich) =>
  parts.map((p) => (typeof p === "string" ? p : mdLink(p.label, p.href))).join("");

export const richToText = (parts: Rich) => parts.map((p) => (typeof p === "string" ? p : p.label)).join("");
