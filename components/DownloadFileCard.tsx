import { Download as DownloadIcon, FileText, ArrowLeft } from "lucide-react";
import type { Download } from "@/lib/types";
import { formatFileSize } from "@/lib/downloadTypes";

// این فیلدها هنوز در جدول downloads وجود ندارند. اگر روزی با همین نام‌ها اضافه شوند،
// بخش مربوط به‌طور خودکار نمایش داده می‌شود؛ تا آن موقع هیچ‌کدام رندر نمی‌شوند.
type DownloadCardExtras = {
  after_download_steps?: string[] | null;
  prerequisites?: string | null;
  install_guide_url?: string | null;
};

const FORMAT_NAMES: Record<string, string> = {
  md: "Markdown",
  pdf: "PDF",
  zip: "ZIP",
  rar: "RAR",
  doc: "Word",
  docx: "Word",
  xls: "Excel",
  xlsx: "Excel",
  csv: "CSV",
  ppt: "PowerPoint",
  pptx: "PowerPoint",
  txt: "متن ساده",
  json: "JSON",
  epub: "EPUB",
};

// پسوند فایل از نام فایل، و اگر نبود از آخرین بخش آدرس فایل.
function fileExtension(fileName: string | null, fileUrl: string): string | null {
  let source = fileName ?? "";
  if (!source) {
    try {
      source = decodeURIComponent(new URL(fileUrl, "https://aiabed.ir").pathname.split("/").pop() ?? "");
    } catch {
      source = "";
    }
  }
  const match = source.match(/\.([a-z0-9]{1,8})$/i);
  return match ? match[1].toLowerCase() : null;
}

export default function DownloadFileCard({ item }: { item: Download & DownloadCardExtras }) {
  if (!item.file_url) return null;

  const extension = fileExtension(item.file_name, item.file_url);
  const formatName = extension ? FORMAT_NAMES[extension] ?? extension.toUpperCase() : null;
  const fileSize = formatFileSize(item.file_size);
  const steps = (item.after_download_steps ?? []).filter((step) => step?.trim());
  const prerequisites = item.prerequisites?.trim();
  const guideUrl = item.install_guide_url?.trim();
  const meta = [formatName, fileSize, "رایگان"].filter(Boolean) as string[];

  return (
    <section
      aria-label="دانلود فایل"
      className="mt-10 rounded-3xl border border-gray-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-7"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div
          aria-hidden="true"
          className="flex h-16 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 sm:h-20 sm:w-16"
        >
          <FileText className="h-7 w-7" />
          {extension && (
            <span dir="ltr" className="max-w-full truncate px-1 text-xs font-bold">
              .{extension}
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">فایل رایگان این آموزش</p>
          <p className="mt-1 text-lg font-bold leading-7 text-slate-900 [overflow-wrap:anywhere] dark:text-white sm:text-2xl sm:leading-9">
            {item.title}
          </p>
          {/* نام فایل و گروه «فرمت · حجم · رایگان» جدا می‌شکنند تا جداکننده هیچ‌وقت اول خط نیفتد. */}
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-600 dark:text-slate-300">
            {item.file_name && (
              <span dir="ltr" className="font-mono text-[13px] [overflow-wrap:anywhere] text-slate-700 dark:text-slate-200">
                {item.file_name}
              </span>
            )}
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              {meta.map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">·</span>}
                  <span className={part === "رایگان" ? "font-semibold text-brand-700 dark:text-brand-300" : undefined}>
                    {part}
                  </span>
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-6 dark:border-slate-700">
        {steps.length > 0 && (
          <div className="mb-6">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">بعد از دانلود</p>
            <ol className="mt-3 grid gap-4 md:grid-cols-3">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                    {(i + 1).toLocaleString("fa-IR")}
                  </span>
                  <span className="text-sm leading-6 text-slate-700 [overflow-wrap:anywhere] dark:text-slate-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={item.file_url}
              download={item.file_name || undefined}
              className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-cta px-8 py-4 text-base font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
            >
              <DownloadIcon className="h-5 w-5" aria-hidden="true" />
              دانلود رایگان فایل
            </a>
            {guideUrl && (
              <a
                href={guideUrl}
                className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-full px-4 text-sm font-semibold text-brand-700 underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 dark:text-brand-300 dark:focus-visible:outline-brand-300"
              >
                راهنمای نصب
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </div>
          {prerequisites && (
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white">پیش‌نیاز: </span>
              {prerequisites}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
