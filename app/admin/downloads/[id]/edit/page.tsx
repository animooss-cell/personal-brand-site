import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DownloadForm from "@/components/admin/DownloadForm";
import { Download } from "@/lib/types";

export default async function EditDownloadPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: download } = await supabase.from("downloads").select("*").eq("id", params.id).single();

  if (!download) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ویرایش منبع</h1>
      <DownloadForm download={download as Download} />
    </div>
  );
}
