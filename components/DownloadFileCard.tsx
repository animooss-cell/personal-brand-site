import { JetBrains_Mono } from "next/font/google";
import { Download as DownloadIcon, CodeXml } from "lucide-react";
import type { Download } from "@/lib/types";
import { formatFileSize } from "@/lib/downloadTypes";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

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

// فایل‌ها در Supabase Storage (دامنه‌ای جدا از سایت) هستند و مرورگر ویژگی download را برای
// دامنه‌ی دیگر نادیده می‌گیرد؛ پس فایل‌های .md و .pdf در مرورگر باز می‌شدند. با ?download=<نام فایل>
// خودِ Storage فایل را به‌صورت attachment و با نام اصلی می‌فرستد. آدرس ذخیره‌شده در دیتابیس تغییری نمی‌کند.
function downloadHref(fileUrl: string, fileName: string | null): string {
  try {
    const url = new URL(fileUrl);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseOrigin = supabaseUrl ? new URL(supabaseUrl).origin : null;
    const isSupabaseStorage =
      (url.origin === supabaseOrigin || url.hostname.endsWith(".supabase.co")) &&
      url.pathname.startsWith("/storage/v1/object/public/");
    if (!isSupabaseStorage) return fileUrl;
    url.searchParams.set("download", fileName ?? "");
    return url.toString();
  } catch {
    return fileUrl;
  }
}

// آیکون فایل با گوشه‌ی تاخورده (بالا-چپ)؛ با SVG تا قاب و تای گوشه یک خط پیوسته باشند.
function FileGlyph({ extension }: { extension: string | null }) {
  return (
    <div aria-hidden="true" className="relative h-[88px] w-[72px] shrink-0 sm:h-32 sm:w-[104px]">
      <svg viewBox="0 0 104 128" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d="M30 0.5 H86 A17.5 17.5 0 0 1 103.5 18 V110 A17.5 17.5 0 0 1 86 127.5 H18 A17.5 17.5 0 0 1 0.5 110 V30 Z"
          className="fill-[#E9F7F1] stroke-[#B7E6D3] dark:fill-[#12261F] dark:stroke-[rgba(0,195,137,0.35)]"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M30 0.5 V26 A4 4 0 0 1 26 30 H0.5 Z"
          className="fill-[#B7E6D3] stroke-[#B7E6D3] dark:fill-[rgba(0,195,137,0.35)] dark:stroke-[rgba(0,195,137,0.35)]"
          strokeWidth="1"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[#007553] dark:text-[#00C389]">
        <CodeXml className="h-7 w-7 sm:h-9 sm:w-9" strokeWidth={2} />
      </div>
      {extension && (
        <span
          dir="ltr"
          className={`${mono.className} absolute inset-x-1 bottom-2.5 truncate text-center text-[15px] font-semibold leading-none text-[#007553] dark:text-[#00C389] sm:bottom-4`}
        >
          .{extension}
        </span>
      )}
    </div>
  );
}

// مراحل «بعد از دانلود»، پیش‌نیاز و لینک راهنما اختیاری‌اند و هر کدام فقط وقتی مقدار دارد نمایش داده می‌شود.
export default function DownloadFileCard({ item }: { item: Download }) {
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
      className="mt-10 flex flex-col gap-7 rounded-[28px] border border-[#E5E1D8] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,.04),0_12px_32px_rgba(15,23,42,.06)] dark:border-[rgba(242,238,230,0.10)] dark:bg-[#0F1A2B] dark:shadow-none sm:p-10"
    >
      {/* زیر ۶۴۰px: شبکه‌ای که خط مشخصات فایل را زیر آیکون و عنوان، با تمام عرض کارت، می‌نشاند. */}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 gap-y-1.5 sm:flex sm:gap-7">
        <div className="row-span-2">
          <FileGlyph extension={extension} />
        </div>
        <div className="contents sm:block sm:min-w-0 sm:flex-1">
          <p className="col-start-2 self-end text-sm font-medium text-[#007553] dark:text-[#00C389]">فایل رایگان این آموزش</p>
          <p className="col-start-2 self-start sm:mt-1.5 text-[22px] font-extrabold leading-[1.4] text-slate-900 [overflow-wrap:anywhere] dark:text-[#F2EEE6] sm:text-[30px]">
            {item.title}
          </p>
          {/* نام فایل و گروه «فرمت • حجم • رایگان» جدا می‌شکنند؛ هر «•» به بخش قبلی چسبیده تا هیچ خطی با جداکننده شروع نشود. */}
          <p className="col-span-2 mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-600 dark:text-[rgba(242,238,230,0.68)]">
            {item.file_name && (
              <span
                dir="ltr"
                className={`${mono.className} max-w-full rounded-lg bg-[#F4F2EC] px-2.5 py-1 text-[13px] text-slate-700 [overflow-wrap:anywhere] dark:bg-[rgba(242,238,230,0.06)] dark:text-[rgba(242,238,230,0.85)]`}
              >
                {item.file_name}
              </span>
            )}
            <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
              {meta.map((part, i) => (
                <span key={part} className="inline-flex items-center gap-2 whitespace-nowrap">
                  <span className={part === "رایگان" ? "font-semibold text-[#007553] dark:text-[#00C389]" : undefined}>{part}</span>
                  {i < meta.length - 1 && <span aria-hidden="true">•</span>}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="border-t border-[#E5E1D8] pt-6 dark:border-[rgba(242,238,230,0.10)]">
          <ol className="grid gap-5 sm:grid-cols-3">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-[#E9F7F1] text-sm font-bold text-[#007553] dark:bg-[#12261F] dark:text-[#00C389]">
                  {(i + 1).toLocaleString("fa-IR")}
                </span>
                <span className="pt-0.5 text-[15px] leading-7 text-slate-700 [overflow-wrap:anywhere] dark:text-[rgba(242,238,230,0.85)]">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
          <a
            href={downloadHref(item.file_url, item.file_name)}
            download={item.file_name || undefined}
            className="inline-flex h-[58px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-cta px-[30px] text-[17px] font-bold text-cta-fg transition-colors duration-200 hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-fg focus-visible:ring-2 focus-visible:ring-white sm:w-auto"
          >
            <DownloadIcon className="h-5 w-5" aria-hidden="true" />
            دانلود رایگان فایل
          </a>
          {guideUrl && (
            <a
              href={guideUrl}
              className="inline-flex min-h-11 cursor-pointer items-center text-[15px] font-semibold text-[#007553] underline underline-offset-4 transition-colors duration-200 hover:text-[#005A40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#007553] dark:text-[#00C389] dark:hover:text-[#33D69C] dark:focus-visible:outline-[#00C389]"
            >
              راهنمای نصب
            </a>
          )}
        </div>
        {prerequisites && (
          <p className="text-[13px] text-slate-600 dark:text-[rgba(242,238,230,0.68)]">
            <span className="font-semibold">پیش‌نیاز: </span>
            {prerequisites}
          </p>
        )}
      </div>
    </section>
  );
}
