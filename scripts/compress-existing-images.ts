// بهینه‌سازی تصویرهای موجود در باکت «media» (Supabase Storage) با sharp:
// نسخه‌ی WebP با حداکثر عرض ۱۶۰۰px و کیفیت ۸۲ را با نام جدید کنار فایل اصلی
// آپلود می‌کند (فایل اصلی حذف نمی‌شود) و ارجاع‌های آن را در جدول‌های posts
// (featured_image، og_image، content) و courses (image، content) به نسخه‌ی
// جدید عوض می‌کند.
//
// پیش‌نیاز: SUPABASE_SERVICE_ROLE_KEY در .env.local (کلید anon برای لیست کردن
// کامل باکت و آپدیت جدول‌ها کافی نیست، چون RLS را دور می‌زند؛ این کلید هرگز
// نباید commit شود یا به مرورگر برسد).
//
// اجرا:
//   npx tsx scripts/compress-existing-images.ts            # dry-run (پیش‌فرض) — فقط گزارش، بدون هیچ تغییری
//   npx tsx scripts/compress-existing-images.ts --apply     # اجرای واقعی: آپلود فایل‌های جدید + آپدیت دیتابیس
//
// توجه: این اسکریپت در حالت dry-run هیچ آپلود یا نوشتنی در Supabase انجام
// نمی‌دهد؛ اجرای --apply روی دیتابیس واقعی باید فقط بعد از بکاپ انجام شود.

import fs from "node:fs";
import path from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import sharp from "sharp";

const BUCKET = "media";
const MAX_WIDTH = 1600;
const QUALITY = 82;
const SKIP_EXTENSIONS = new Set(["svg", "gif"]);
const OPTIMIZED_SUFFIX = "-optimized.webp";
const LIST_PAGE_SIZE = 100;

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = value;
  }
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)}MB`;
}

function isSkippedExtension(fileName: string): boolean {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";
  return SKIP_EXTENSIONS.has(ext);
}

function optimizedPathFor(originalPath: string): string {
  const withoutExt = originalPath.replace(/\.[^./]+$/, "");
  return `${withoutExt}${OPTIMIZED_SUFFIX}`;
}

type StorageObject = { name: string; id: string | null; metadata: { size?: number } | null };

async function listAllObjects(supabase: SupabaseClient): Promise<StorageObject[]> {
  const all: StorageObject[] = [];
  let offset = 0;

  while (true) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list("", { limit: LIST_PAGE_SIZE, offset, sortBy: { column: "name", order: "asc" } });

    if (error) throw new Error(`لیست کردن باکت media شکست خورد: ${error.message}`);
    if (!data || data.length === 0) break;

    // فایل‌هایی که Supabase برای پوشه‌ها برمی‌گرداند id ندارند (placeholder هستند)
    all.push(...(data.filter((o) => o.id !== null) as StorageObject[]));

    if (data.length < LIST_PAGE_SIZE) break;
    offset += LIST_PAGE_SIZE;
  }

  return all;
}

type Candidate = {
  path: string;
  publicUrl: string;
  originalSize: number;
  optimizedPath: string;
};

type Report = {
  processed: number;
  skippedExtension: string[];
  skippedAlreadyOptimized: string[];
  skippedNotSmaller: string[];
  converted: { path: string; before: number; after: number; optimizedPath: string }[];
  failed: { path: string; reason: string }[];
};

async function main() {
  loadEnvLocal();

  const apply = process.argv.includes("--apply");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "خطا: NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY باید در .env.local تنظیم شده باشند.\n" +
        "کلید service role را از Supabase Dashboard → Project Settings → API بردارید؛ هرگز آن را commit نکنید."
    );
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  console.log(`حالت اجرا: ${apply ? "واقعی (--apply)" : "dry-run (فقط گزارش)"}`);
  console.log("در حال لیست کردن فایل‌های باکت media...");

  const objects = await listAllObjects(supabase);
  console.log(`تعداد فایل یافت‌شده: ${objects.length}\n`);

  const report: Report = {
    processed: 0,
    skippedExtension: [],
    skippedAlreadyOptimized: [],
    skippedNotSmaller: [],
    converted: [],
    failed: [],
  };

  const candidates: Candidate[] = [];

  for (const object of objects) {
    if (object.name.endsWith(OPTIMIZED_SUFFIX)) {
      report.skippedAlreadyOptimized.push(object.name);
      continue;
    }
    if (isSkippedExtension(object.name)) {
      report.skippedExtension.push(object.name);
      continue;
    }

    report.processed++;

    try {
      const { data: blob, error: downloadError } = await supabase.storage
        .from(BUCKET)
        .download(object.name);
      if (downloadError || !blob) throw new Error(downloadError?.message ?? "دانلود ناموفق");

      const originalBuffer = Buffer.from(await blob.arrayBuffer());
      const image = sharp(originalBuffer);
      const metadata = await image.metadata();
      const width = metadata.width ?? MAX_WIDTH;

      const optimizedBuffer = await image
        .resize({ width: Math.min(width, MAX_WIDTH), withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toBuffer();

      if (optimizedBuffer.length >= originalBuffer.length) {
        report.skippedNotSmaller.push(object.name);
        continue;
      }

      const optimizedPath = optimizedPathFor(object.name);
      const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(object.name);

      candidates.push({
        path: object.name,
        publicUrl: publicUrlData.publicUrl,
        originalSize: originalBuffer.length,
        optimizedPath,
      });

      report.converted.push({
        path: object.name,
        before: originalBuffer.length,
        after: optimizedBuffer.length,
        optimizedPath,
      });

      if (apply) {
        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(optimizedPath, optimizedBuffer, { contentType: "image/webp" });
        if (uploadError) throw new Error(`آپلود ناموفق: ${uploadError.message}`);
      }
    } catch (err) {
      report.failed.push({ path: object.name, reason: (err as Error).message });
    }
  }

  // --- پیدا کردن و (در حالت --apply) عوض کردن ارجاع‌ها در دیتابیس ---
  const { data: posts } = await supabase
    .from("posts")
    .select("id, featured_image, og_image, content");
  const { data: courses } = await supabase.from("courses").select("id, image, content");

  type PostRow = { id: string; featured_image: string | null; og_image: string | null; content: string };
  type CourseRow = { id: string; image: string | null; content: string };

  const postUpdates: { id: string; fields: Partial<PostRow> }[] = [];
  for (const post of (posts ?? []) as PostRow[]) {
    const candidate = candidates.find(
      (c) =>
        c.publicUrl === post.featured_image ||
        c.publicUrl === post.og_image ||
        post.content.includes(c.publicUrl)
    );
    if (!candidate) continue;

    const newUrl = supabase.storage.from(BUCKET).getPublicUrl(candidate.optimizedPath).data.publicUrl;
    const fields: Partial<PostRow> = {};
    if (post.featured_image === candidate.publicUrl) fields.featured_image = newUrl;
    if (post.og_image === candidate.publicUrl) fields.og_image = newUrl;
    if (post.content.includes(candidate.publicUrl)) {
      fields.content = post.content.split(candidate.publicUrl).join(newUrl);
    }
    postUpdates.push({ id: post.id, fields });
  }

  const courseUpdates: { id: string; fields: Partial<CourseRow> }[] = [];
  for (const course of (courses ?? []) as CourseRow[]) {
    const candidate = candidates.find(
      (c) => c.publicUrl === course.image || course.content.includes(c.publicUrl)
    );
    if (!candidate) continue;

    const newUrl = supabase.storage.from(BUCKET).getPublicUrl(candidate.optimizedPath).data.publicUrl;
    const fields: Partial<CourseRow> = {};
    if (course.image === candidate.publicUrl) fields.image = newUrl;
    if (course.content.includes(candidate.publicUrl)) {
      fields.content = course.content.split(candidate.publicUrl).join(newUrl);
    }
    courseUpdates.push({ id: course.id, fields });
  }

  if (apply) {
    for (const update of postUpdates) {
      await supabase.from("posts").update(update.fields).eq("id", update.id);
    }
    for (const update of courseUpdates) {
      await supabase.from("courses").update(update.fields).eq("id", update.id);
    }
  }

  // --- گزارش ---
  console.log("=== گزارش ===\n");

  console.log(`فایل بررسی‌شده: ${report.processed}`);
  console.log(`رد شد (svg/gif): ${report.skippedExtension.length}`);
  console.log(`رد شد (قبلاً بهینه شده): ${report.skippedAlreadyOptimized.length}`);
  console.log(`رد شد (خروجی کوچک‌تر نشد): ${report.skippedNotSmaller.length}`);
  console.log(`تبدیل‌شده: ${report.converted.length}`);
  console.log(`خطا: ${report.failed.length}\n`);

  if (report.converted.length > 0) {
    console.log("فایل | حجم قبل | حجم بعد | کاهش | نام فایل جدید");
    for (const c of report.converted) {
      const reduction = Math.round((1 - c.after / c.before) * 100);
      console.log(`${c.path} | ${formatSize(c.before)} | ${formatSize(c.after)} | ${reduction}% | ${c.optimizedPath}`);
    }
    console.log("");
  }

  if (report.failed.length > 0) {
    console.log("خطاها:");
    for (const f of report.failed) console.log(`  ${f.path}: ${f.reason}`);
    console.log("");
  }

  console.log(`رکوردهای posts که ${apply ? "آپدیت شدند" : "آپدیت خواهند شد"}: ${postUpdates.length}`);
  for (const u of postUpdates) console.log(`  post ${u.id}: ${Object.keys(u.fields).join(", ")}`);

  console.log(`رکوردهای courses که ${apply ? "آپدیت شدند" : "آپدیت خواهند شد"}: ${courseUpdates.length}`);
  for (const u of courseUpdates) console.log(`  course ${u.id}: ${Object.keys(u.fields).join(", ")}`);

  if (!apply) {
    console.log("\nاین یک dry-run بود؛ هیچ فایلی آپلود و هیچ رکوردی تغییر نکرد.");
    console.log("برای اجرای واقعی (بعد از بکاپ دیتابیس و Storage): npx tsx scripts/compress-existing-images.ts --apply");
  }
}

main().catch((err) => {
  console.error("اسکریپت با خطا متوقف شد:", err);
  process.exit(1);
});
