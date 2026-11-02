"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/lib/types";
import { contactSourceInfo } from "@/lib/contactSources";
import { faNum } from "@/components/admin/contactsHref";
import { deleteContacts } from "@/app/admin/contacts/actions";

const NOTICE_KEY = "admin-contacts-notice";

export default function ContactsTable({ contacts }: { contacts: ContactMessage[] }) {
  const supabase = createClient();
  const router = useRouter();
  const [items, setItems] = useState(contacts);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pendingDelete, setPendingDelete] = useState<string[] | null>(null);
  const [notice, setNotice] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // اگر بعد از حذف، آخرین صفحه خالی شود سرور به صفحه‌ی قبل redirect می‌کند و این کامپوننت دوباره mount می‌شود؛
  // پیام موفقیت تا آن لحظه در sessionStorage نگه داشته می‌شود.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(NOTICE_KEY);
      if (saved) {
        sessionStorage.removeItem(NOTICE_KEY);
        setNotice({ kind: "ok", text: saved });
      }
    } catch {
      // sessionStorage در دسترس نیست؛ پیام فقط تا redirect بعدی دیده می‌شود
    }
  }, []);

  // بعد از حذف، router.refresh() فهرست تازه‌ی همین صفحه را از سرور می‌فرستد (پیام ذخیره‌شده دیگر لازم نیست).
  useEffect(() => {
    try {
      sessionStorage.removeItem(NOTICE_KEY);
    } catch {
      // نادیده
    }
    setItems(contacts);
    setSelected((prev) => new Set(Array.from(prev).filter((id) => contacts.some((c) => c.id === id))));
  }, [contacts]);

  // پیام موفقیت/خطا چند ثانیه بعد خودش محو می‌شود.
  useEffect(() => {
    if (!notice) return;
    const t = setTimeout(() => setNotice(null), 6000);
    return () => clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (pendingDelete && !dialog.open) dialog.showModal();
    if (!pendingDelete && dialog.open) dialog.close();
  }, [pendingDelete]);

  async function toggleRead(id: string, read: boolean) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, read } : c)));
    await supabase.from("contacts").update({ read }).eq("id", id);
  }

  function toggleSelected(id: string, on: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (on) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  const allSelected = items.length > 0 && items.every((c) => selected.has(c.id));

  function confirmDelete() {
    const ids = pendingDelete;
    if (!ids) return;
    startTransition(async () => {
      const result = await deleteContacts(ids);
      setPendingDelete(null);
      if (!result.ok) {
        setNotice({ kind: "error", text: result.error });
        return;
      }
      setSelected(new Set());
      const text = `${faNum(result.deleted)} پیام حذف شد.`;
      setNotice({ kind: "ok", text });
      try {
        sessionStorage.setItem(NOTICE_KEY, text);
      } catch {
        // بدون sessionStorage هم حذف و به‌روزرسانی فهرست انجام می‌شود
      }
      router.refresh();
    });
  }

  const count = pendingDelete?.length ?? 0;

  return (
    <div className="flex flex-col gap-3">
      <p
        role="status"
        aria-live="polite"
        className={`rounded-xl px-4 text-sm empty:hidden ${
          notice?.kind === "error" ? "bg-red-50 py-3 text-red-700" : "bg-brand-50 py-3 text-brand-700"
        }`}
      >
        {notice?.text}
      </p>

      {items.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-2">
          <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => setSelected(e.target.checked ? new Set(items.map((c) => c.id)) : new Set())}
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            انتخاب همه‌ی این صفحه
          </label>
          <button
            type="button"
            disabled={selected.size === 0 || isPending}
            onClick={() => setPendingDelete(Array.from(selected))}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-red-200 bg-white px-4 text-sm font-medium text-red-700 transition-colors duration-200 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-slate-400 disabled:hover:bg-white"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            حذف انتخاب‌شده‌ها{selected.size > 0 && ` (${faNum(selected.size)})`}
          </button>
        </div>
      )}

      {items.map((contact) => {
        const source = contactSourceInfo(contact.source);
        return (
          <div
            key={contact.id}
            className={`rounded-2xl border p-5 ${
              contact.read ? "border-gray-200 bg-white" : "border-brand-200 bg-brand-50/40"
            }`}
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <label className="-m-2 inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center p-2">
                  <input
                    type="checkbox"
                    checked={selected.has(contact.id)}
                    onChange={(e) => toggleSelected(contact.id, e.target.checked)}
                    aria-label={`انتخاب پیام ${contact.name}`}
                    className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                  />
                </label>
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-bold ${source.badge}`}>
                  {source.label}
                </span>
                <span className="font-semibold text-slate-800">{contact.name}</span>
                {contact.business && <span className="mr-2 text-sm text-slate-500"> — {contact.business}</span>}
              </div>
              <div className="flex items-center gap-1">
                <label className="flex items-center gap-2 text-xs text-slate-500">
                  <input
                    type="checkbox"
                    checked={contact.read}
                    onChange={(e) => toggleRead(contact.id, e.target.checked)}
                    className="h-3.5 w-3.5 rounded border-gray-300 text-brand focus:ring-brand"
                  />
                  خوانده شد
                </label>
                <button
                  type="button"
                  onClick={() => setPendingDelete([contact.id])}
                  disabled={isPending}
                  aria-label={`حذف پیام ${contact.name}`}
                  title="حذف"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <p dir="ltr" className="mb-2 text-left text-sm text-slate-500">
              {contact.email}
              {contact.phone && <span className="ml-3">{contact.phone}</span>}
            </p>
            <p className="text-sm leading-6 text-slate-700">{contact.message}</p>
            <p className="mt-3 text-xs text-slate-400">{new Date(contact.created_at).toLocaleString("fa-IR")}</p>
          </div>
        );
      })}
      {!items.length && (
        <p className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-slate-400">
          هنوز پیامی ثبت نشده است.
        </p>
      )}

      {/* حذف برگشت‌پذیر نیست؛ بدون تأیید در این پنجره هیچ پیامی حذف نمی‌شود. */}
      <dialog
        ref={dialogRef}
        onClose={() => setPendingDelete(null)}
        aria-labelledby="delete-dialog-title"
        className="w-[min(92vw,420px)] rounded-2xl border border-gray-200 p-0 backdrop:bg-slate-900/40"
        dir="rtl"
      >
        <div className="flex flex-col gap-4 p-6">
          <h2 id="delete-dialog-title" className="text-lg font-bold text-slate-900">
            حذف {count > 1 ? `${faNum(count)} پیام` : "پیام"}
          </h2>
          <p className="text-sm leading-7 text-slate-600">
            {count > 1
              ? `${faNum(count)} پیام برای همیشه حذف می‌شوند. مطمئن هستید؟`
              : "این پیام برای همیشه حذف می‌شود. مطمئن هستید؟"}
          </p>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              autoFocus
              onClick={() => setPendingDelete(null)}
              disabled={isPending}
              className="inline-flex min-h-11 items-center rounded-xl border border-gray-200 bg-white px-4 text-sm text-slate-700 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              انصراف
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              disabled={isPending}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-red-600 px-4 text-sm font-bold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-70"
            >
              <Trash2 className="h-4 w-4" aria-hidden="true" />
              {isPending ? "در حال حذف…" : "حذف برای همیشه"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
