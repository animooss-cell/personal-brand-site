import type { VideoPlatform } from "@/lib/types";

export const VIDEO_PLATFORMS: { label: string; value: VideoPlatform }[] = [
  { label: "یوتیوب", value: "youtube" },
  { label: "آپارات", value: "aparat" },
  { label: "ویمئو", value: "vimeo" },
  { label: "ایکس (توییتر)", value: "twitter" },
  { label: "اینستاگرام", value: "instagram" },
  { label: "لینک یا کد سفارشی", value: "custom" },
  { label: "سایر", value: "other" },
];

export function platformLabel(value: VideoPlatform): string {
  return VIDEO_PLATFORMS.find((p) => p.value === value)?.label ?? "سایر";
}
