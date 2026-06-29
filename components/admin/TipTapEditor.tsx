"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import TiptapUnderline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { createClient } from "@/lib/supabase/client";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code2,
  Link2,
  ImageIcon,
  Undo2,
  Redo2,
  AlignRight,
  AlignCenter,
  AlignLeft,
  Upload,
} from "lucide-react";

function ToolbarButton({
  active,
  disabled,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-brand text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage.from("media").upload(path, file);
    setUploading(false);

    if (error) return;

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    editor.chain().focus().setImage({ src: data.publicUrl }).run();
  }

  function handleLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("آدرس لینک را وارد کنید:", previousUrl ?? "https://");
    if (url === null) return;
    if (!url) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-slate-50 p-2">
      <ToolbarButton label="ضخیم" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="ایتالیک" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="زیرخط" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <Underline className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="خط‌خورده" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton
        label="تیتر ۲"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="تیتر ۳"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton label="لیست نقطه‌ای" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="لیست عددی"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="نقل‌قول" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="بلاک کد" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton
        label="چینش راست"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="چینش وسط"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton
        label="چینش چپ"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton label="لینک" active={editor.isActive("link")} onClick={handleLink}>
        <Link2 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>

      <label
        className={`inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-slate-600 transition-colors duration-200 hover:bg-slate-100 ${
          uploading ? "opacity-50" : ""
        }`}
        title="آپلود تصویر"
      >
        {uploading ? <Upload className="h-4 w-4 animate-pulse" aria-hidden="true" /> : <ImageIcon className="h-4 w-4" aria-hidden="true" />}
        <input type="file" accept="image/*" className="hidden" disabled={uploading} onChange={handleImageUpload} />
      </label>

      <span className="mx-1 h-5 w-px bg-gray-200" />

      <ToolbarButton label="واگرد" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
      <ToolbarButton label="ازنو" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 className="h-4 w-4" aria-hidden="true" />
      </ToolbarButton>
    </div>
  );
}

export default function TipTapEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TiptapUnderline,
      TiptapLink.configure({ openOnClick: false, autolink: true }),
      TiptapImage,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        dir: "rtl",
        class: "prose-content min-h-[260px] focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300">
      <Toolbar editor={editor} />
      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
