"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ServiceCard } from "@/lib/types";
import { Save } from "lucide-react";

export default function ServicesForm({ services }: { services: ServiceCard[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [items, setItems] = useState(services);
  const [saving, setSaving] = useState(false);

  function update(id: string, patch: Partial<ServiceCard>) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  async function handleSave() {
    setSaving(true);
    await Promise.all(
      items.map((item) =>
        supabase
          .from("services")
          .update({
            icon: item.icon,
            title: item.title,
            subtitle: item.subtitle,
            description: item.description,
            audience: item.audience,
            steps: item.steps,
            featured: item.featured,
          })
          .eq("id", item.id)
      )
    );
    setSaving(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-5">
      {items.map((item, idx) => (
        <div
          key={item.id}
          className={`rounded-2xl border p-6 ${
            item.featured ? "border-brand-300 bg-brand-50/40" : "border-gray-200 bg-white"
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">کارت {idx + 1}</h2>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={item.featured}
                onChange={(e) => update(item.id, { featured: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              />
              featured (تخصص کلیدی)
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">آیکون (نام Lucide)</label>
              <input
                value={item.icon}
                onChange={(e) => update(item.id, { icon: e.target.value })}
                dir="ltr"
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-600">عنوان</label>
              <input
                value={item.title}
                onChange={(e) => update(item.id, { title: e.target.value })}
                className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            </div>
          </div>

          <label className="mb-1 mt-4 block text-sm font-medium text-slate-600">زیرعنوان</label>
          <input
            value={item.subtitle ?? ""}
            onChange={(e) => update(item.id, { subtitle: e.target.value })}
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">توضیح</label>
          <textarea
            value={item.description ?? ""}
            onChange={(e) => update(item.id, { description: e.target.value })}
            rows={3}
            className="mb-4 w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">مناسب برای (با / جدا کنید)</label>
          <input
            value={item.audience.join(" / ")}
            onChange={(e) =>
              update(item.id, { audience: e.target.value.split("/").map((s) => s.trim()).filter(Boolean) })
            }
            className="mb-4 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />

          <label className="mb-1 block text-sm font-medium text-slate-600">۴ گام (هر سطر یک گام)</label>
          <textarea
            value={item.steps.join("\n")}
            onChange={(e) => update(item.id, { steps: e.target.value.split("\n") })}
            rows={4}
            className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
      ))}

      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600 disabled:opacity-60"
      >
        <Save className="h-4 w-4" aria-hidden="true" />
        {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}
