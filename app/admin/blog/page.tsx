import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Plus, Pencil } from "lucide-react";

export default async function AdminBlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, status, category, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">پست‌های وبلاگ</h1>
        <Link
          href="/admin/blog/new"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          پست جدید
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <table className="w-full text-right text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-3 font-medium">عنوان</th>
              <th className="px-5 py-3 font-medium">دسته‌بندی</th>
              <th className="px-5 py-3 font-medium">وضعیت</th>
              <th className="px-5 py-3 font-medium">آخرین بروزرسانی</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id} className="border-t border-gray-100">
                <td className="px-5 py-3 font-medium text-slate-800">{post.title}</td>
                <td className="px-5 py-3 text-slate-500">{post.category ?? "—"}</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      post.status === "published"
                        ? "bg-brand-50 text-brand-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {post.status === "published" ? "منتشرشده" : "پیش‌نویس"}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">
                  {new Date(post.updated_at).toLocaleDateString("fa-IR")}
                </td>
                <td className="px-5 py-3">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className="inline-flex cursor-pointer items-center gap-1.5 text-brand-600 hover:text-brand-700"
                  >
                    <Pencil className="h-4 w-4" aria-hidden="true" />
                    ویرایش
                  </Link>
                </td>
              </tr>
            ))}
            {!posts?.length && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-slate-400">
                  هنوز پستی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
