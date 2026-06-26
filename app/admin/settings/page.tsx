import { createClient } from "@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";
import { SiteSettings } from "@/lib/types";

export default async function AdminSettingsPage() {
  const supabase = createClient();
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).single();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">تنظیمات عمومی</h1>
      <SettingsForm settings={settings as SiteSettings} />
    </div>
  );
}
