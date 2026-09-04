import type { VideoPlatform } from "@/lib/types";

export function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/watch\?[^#]*v=([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{6,})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
}

export function getAparatEmbedUrl(url: string): string | null {
  const match = url.match(/aparat\.com\/v\/([a-zA-Z0-9]+)/);
  if (!match) return null;
  return `https://www.aparat.com/video/video/embed/videohash/${match[1]}/vt/frame`;
}

export function isDirectVideoFile(url: string): boolean {
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url);
}

// URL قابل استفاده به‌عنوان src یک iframe؛ برای پلتفرم‌هایی که چنین چیزی ندارند
// (custom, twitter, instagram) یا وقتی لینک قابل تشخیص نبود، null برمی‌گردد.
export function getEmbedUrl(videoUrl: string, platform: VideoPlatform): string | null {
  switch (platform) {
    case "youtube": {
      const id = getYouTubeId(videoUrl);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    case "vimeo": {
      const id = getVimeoId(videoUrl);
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    case "aparat":
      return getAparatEmbedUrl(videoUrl);
    case "other":
      return isDirectVideoFile(videoUrl) ? videoUrl : null;
    default:
      return null;
  }
}

// فقط قالب رایج H:MM:SS یا MM:SS را به ISO 8601 (برای JSON-LD) تبدیل می‌کند؛
// هر چیز دیگری (مثلاً متن آزاد «۵ دقیقه») نادیده گرفته می‌شود تا در
// structured data مقدار نامعتبر درج نشود.
export function toIso8601Duration(input: string | null): string | undefined {
  if (!input) return undefined;
  const match = input.trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/);
  if (!match) return undefined;
  const [, h, m, s] = match;
  const hours = h ? parseInt(h, 10) : 0;
  const minutes = parseInt(m, 10);
  const seconds = parseInt(s, 10);
  if (minutes >= 60 || seconds >= 60) return undefined;
  let iso = "P";
  iso += "T";
  if (hours) iso += `${hours}H`;
  if (minutes) iso += `${minutes}M`;
  iso += `${seconds}S`;
  return iso;
}
