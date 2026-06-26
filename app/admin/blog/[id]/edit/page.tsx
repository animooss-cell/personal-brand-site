import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";
import { Post } from "@/lib/types";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: post } = await supabase.from("posts").select("*").eq("id", params.id).single();

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ویرایش پست</h1>
      <PostForm post={post as Post} />
    </div>
  );
}
