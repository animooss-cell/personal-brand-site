import type { DownloadResourceType } from "@/lib/types";

export const RESOURCE_TYPES: { label: string; value: DownloadResourceType }[] = [
  { label: "پرامپت", value: "prompt" },
  { label: "کتاب", value: "book" },
  { label: "اسکیل", value: "skill" },
  { label: "سایر", value: "other" },
];

export function resourceTypeLabel(value: DownloadResourceType): string {
  return RESOURCE_TYPES.find((t) => t.value === value)?.label ?? "سایر";
}

export function formatFileSize(bytes: number | null): string | null {
  if (!bytes || bytes <= 0) return null;
  const units = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  const value = unitIndex === 0 ? String(size) : size.toFixed(1);
  return `${value} ${units[unitIndex]}`;
}

export function resourceSchemaType(value: DownloadResourceType): string {
  switch (value) {
    case "book":
      return "Book";
    case "skill":
      return "SoftwareApplication";
    case "prompt":
      return "CreativeWork";
    default:
      return "DigitalDocument";
  }
}
