"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type DeleteContactsResult = { ok: true; deleted: number } | { ok: false; error: string };

// حذف دائمی پیام‌ها؛ فقط سمت سرور و فقط برای ادمین لاگین‌شده (همان نشست Supabase که بقیه‌ی پنل استفاده می‌کند).
// RLS روی contacts هم حذف را فقط برای نقش authenticated مجاز می‌کند.
export async function deleteContacts(ids: string[]): Promise<DeleteContactsResult> {
  const cleanIds = Array.from(new Set((Array.isArray(ids) ? ids : []).filter((id) => typeof id === "string" && id)));
  if (cleanIds.length === 0) return { ok: false, error: "پیامی انتخاب نشده است." };
  if (cleanIds.length > 100) return { ok: false, error: "در هر بار حداکثر ۱۰۰ پیام را می‌توان حذف کرد." };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "برای حذف پیام باید وارد پنل ادمین شوید." };

  const { data, error } = await supabase.from("contacts").delete().in("id", cleanIds).select("id");
  if (error) return { ok: false, error: "حذف پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید." };

  revalidatePath("/admin/contacts");
  revalidatePath("/admin/dashboard");
  return { ok: true, deleted: data?.length ?? 0 };
}
