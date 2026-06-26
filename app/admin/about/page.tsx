import { createClient } from "@/lib/supabase/server";
import { AboutContent, AboutTimelineItem } from "@/lib/types";
import AboutForm from "@/components/admin/AboutForm";

export default async function AdminAboutPage() {
  const supabase = createClient();

  const [{ data: about }, { data: timeline }] = await Promise.all([
    supabase.from("about_content").select("*").eq("id", 1).single(),
    supabase.from("about_timeline").select("*").order("position"),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">درباره من</h1>
      <AboutForm
        about={about as AboutContent}
        timeline={(timeline ?? []) as AboutTimelineItem[]}
      />
    </div>
  );
}
