// توابع کمکی برای تبدیل لینک/کد امبد ویدیو به یک src قابل جاسازی.
// فقط در ویرایشگر (لحظه‌ی درج) استفاده می‌شوند؛ خروجی نهایی مستقیماً در
// content (HTML) ذخیره می‌شود، پس نیازی به این توابع در سمت نمایش عمومی نیست.

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

// اگر ورودی یک تگ <iframe ...> کامل بود، فقط src آن را استخراج می‌کند
// (بقیه‌ی attributeها و هر اسکریپت همراهش دور ریخته می‌شود — امنیت).
function extractIframeSrc(input: string): string | null {
  const match = input.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export type ResolvedVideo = { src: string; kind: "iframe" | "file" };

// ورودی خام کاربر (یک URL ساده یا یک تگ iframe پیست‌شده) را به یک src
// قابل جاسازی امن تبدیل می‌کند. پلتفرم ناشناخته هم به‌صورت یک iframe
// عمومی با همان URL درج می‌شود.
export function resolveVideoInput(raw: string): ResolvedVideo | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const url = trimmed.includes("<iframe") ? extractIframeSrc(trimmed) : trimmed;
  if (!url) return null;

  const youTubeId = getYouTubeId(url);
  if (youTubeId) return { src: `https://www.youtube.com/embed/${youTubeId}`, kind: "iframe" };

  const vimeoId = getVimeoId(url);
  if (vimeoId) return { src: `https://player.vimeo.com/video/${vimeoId}`, kind: "iframe" };

  const aparatEmbed = getAparatEmbedUrl(url);
  if (aparatEmbed) return { src: aparatEmbed, kind: "iframe" };

  if (isDirectVideoFile(url)) return { src: url, kind: "file" };

  // پلتفرم ناشناخته یا لینک تشخیص‌داده‌نشده: همان URL به‌صورت یک iframe عمومی
  return { src: url, kind: "iframe" };
}
