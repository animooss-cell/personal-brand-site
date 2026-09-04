import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VideoForm from "@/components/admin/VideoForm";
import { Video } from "@/lib/types";

export default async function EditVideoPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: video } = await supabase.from("videos").select("*").eq("id", params.id).single();

  if (!video) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ویرایش ویدیو</h1>
      <VideoForm video={video as Video} />
    </div>
  );
}
