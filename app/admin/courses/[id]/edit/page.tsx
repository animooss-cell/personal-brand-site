import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CourseForm from "@/components/admin/CourseForm";
import { Course } from "@/lib/types";

export default async function EditCoursePage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: course } = await supabase.from("courses").select("*").eq("id", params.id).single();

  if (!course) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">ویرایش دوره</h1>
      <CourseForm course={course as Course} />
    </div>
  );
}
