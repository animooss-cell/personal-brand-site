"use client";

import { ArrowUp, ArrowDown, Trash2, Plus } from "lucide-react";

export type TimelineDraftItem = { id: string; title: string; place: string };

export default function TimelineEditor({
  items,
  onChange,
}: {
  items: TimelineDraftItem[];
  onChange: (items: TimelineDraftItem[]) => void;
}) {
  function update(id: string, patch: Partial<TimelineDraftItem>) {
    onChange(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function remove(id: string) {
    onChange(items.filter((item) => item.id !== id));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  function add() {
    onChange([...items, { id: crypto.randomUUID(), title: "", place: "" }]);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={item.id} className="rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">آیتم {index + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                aria-label="انتقال به بالا"
              >
                <ArrowUp className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                aria-label="انتقال به پایین"
              >
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
                aria-label="حذف"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <input
            value={item.title}
            onChange={(e) => update(item.id, { title: e.target.value })}
            placeholder="عنوان"
            className="mb-2 w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
          <input
            value={item.place}
            onChange={(e) => update(item.id, { place: e.target.value })}
            placeholder="مکان / زمان"
            className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700"
      >
        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
        افزودن آیتم
      </button>
    </div>
  );
}
