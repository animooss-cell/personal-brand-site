import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil } from "lucide-react";

export default async function AdminCoursesPage() {
  const supabase = createClient();
  const { data: courses } = await supabase
    .from("courses")
    .select("id, title, audience, status")
    .order("position");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">دوره‌های آموزشی</h1>
        <Link
          href="/admin/courses/new"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          دوره جدید
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">عنوان</th>
              <th className="px-5 py-3 font-medium">مخاطب</th>
              <th className="px-5 py-3 font-medium">وضعیت</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {courses?.map((course) => (
              <tr key={course.id} className="border-t border-gray-100">
                <td className="px-5 py-3 font-medium text-slate-800">{course.title}</td>
                <td className="px-5 py-3 text-slate-500">{course.audience ?? "—"}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      course.status === "published"
                        ? "bg-brand-50 text-brand-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {course.status === "published" ? "منتشرشده" : "پیش‌نویس"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/courses/${course.id}/edit`}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-brand-600 hover:text-brand-700"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    ویرایش
                  </Link>
                </td>
              </tr>
            ))}
            {!courses?.length && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-slate-400">
                  هنوز دوره‌ای ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
