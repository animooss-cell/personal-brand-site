"use client";

import { Block, BlockType } from "@/lib/types";
import {
  Type,
  Image as ImageIcon,
  Video,
  Mic,
  Code2,
  Quote,
  Trash2,
  ArrowUp,
  ArrowDown,
  Plus,
} from "lucide-react";

function newBlock(type: BlockType): Block {
  const id = crypto.randomUUID();
  switch (type) {
    case "text":
      return { id, type, data: { html: "" } };
    case "image":
      return { id, type, data: { url: "", caption: "" } };
    case "video":
      return { id, type, data: { url: "" } };
    case "podcast":
      return { id, type, data: { url: "" } };
    case "code":
      return { id, type, data: { code: "", language: "" } };
    case "quote":
      return { id, type, data: { text: "", cite: "" } };
  }
}

const blockMeta: Record<BlockType, { label: string; icon: typeof Type }> = {
  text: { label: "متن", icon: Type },
  image: { label: "تصویر", icon: ImageIcon },
  video: { label: "ویدیو", icon: Video },
  podcast: { label: "پادکست", icon: Mic },
  code: { label: "کد", icon: Code2 },
  quote: { label: "نقل‌قول", icon: Quote },
};

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  function addBlock(type: BlockType) {
    onChange([...blocks, newBlock(type)]);
  }

  function updateBlock(id: string, data: Partial<Block["data"]>) {
    onChange(
      blocks.map((b) => (b.id === id ? ({ ...b, data: { ...b.data, ...data } } as Block) : b))
    );
  }

  function removeBlock(id: string) {
    onChange(blocks.filter((b) => b.id !== id));
  }

  function moveBlock(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, index) => {
        const meta = blockMeta[block.type];
        const Icon = meta.icon;
        return (
          <div key={block.id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Icon className="h-4 w-4 text-brand-600" aria-hidden="true" />
                {meta.label}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveBlock(index, -1)}
                  className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  aria-label="انتقال به بالا"
                >
                  <ArrowUp className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 1)}
                  className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  aria-label="انتقال به پایین"
                >
                  <ArrowDown className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="cursor-pointer rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600"
                  aria-label="حذف بلاک"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {block.type === "text" && (
              <textarea
                value={block.data.html}
                onChange={(e) => updateBlock(block.id, { html: e.target.value })}
                rows={5}
                placeholder="متن بلاک را بنویسید..."
                className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            )}

            {block.type === "image" && (
              <div className="flex flex-col gap-2">
                <input
                  value={block.data.url}
                  onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                  placeholder="آدرس تصویر (URL)"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <input
                  value={block.data.caption ?? ""}
                  onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                  placeholder="زیرنویس (اختیاری)"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                {block.data.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={block.data.url} alt="" className="max-h-48 rounded-xl object-cover" />
                )}
              </div>
            )}

            {block.type === "video" && (
              <input
                value={block.data.url}
                onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                placeholder="لینک YouTube یا Aparat"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            )}

            {block.type === "podcast" && (
              <input
                value={block.data.url}
                onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                placeholder="لینک SoundCloud یا فایل صوتی مستقیم (mp3)"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
              />
            )}

            {block.type === "code" && (
              <div className="flex flex-col gap-2">
                <input
                  value={block.data.language ?? ""}
                  onChange={(e) => updateBlock(block.id, { language: e.target.value })}
                  placeholder="زبان برنامه‌نویسی (اختیاری، مثل js)"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <textarea
                  value={block.data.code}
                  onChange={(e) => updateBlock(block.id, { code: e.target.value })}
                  rows={6}
                  dir="ltr"
                  placeholder="کد را وارد کنید..."
                  className="w-full resize-y rounded-xl border border-gray-300 bg-slate-900 px-3 py-2 font-mono text-sm text-slate-100 outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
            )}

            {block.type === "quote" && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={block.data.text}
                  onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                  rows={3}
                  placeholder="متن نقل‌قول"
                  className="w-full resize-y rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
                <input
                  value={block.data.cite ?? ""}
                  onChange={(e) => updateBlock(block.id, { cite: e.target.value })}
                  placeholder="منبع یا گوینده (اختیاری)"
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm outline-none focus:border-brand focus:ring-1 focus:ring-brand"
                />
              </div>
            )}
          </div>
        );
      })}

      <div className="flex flex-wrap gap-2">
        {(Object.keys(blockMeta) as BlockType[]).map((type) => {
          const meta = blockMeta[type];
          const Icon = meta.icon;
          return (
            <button
              key={type}
              type="button"
              onClick={() => addBlock(type)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:border-brand hover:text-brand-700"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {meta.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
