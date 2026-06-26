"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ContactMessage } from "@/lib/types";

export default function ContactsTable({ contacts }: { contacts: ContactMessage[] }) {
  const supabase = createClient();
  const [items, setItems] = useState(contacts);

  async function toggleRead(id: string, read: boolean) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, read } : c)));
    await supabase.from("contacts").update({ read }).eq("id", id);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((contact) => (
        <div
          key={contact.id}
          className={`rounded-2xl border p-5 ${
            contact.read ? "border-gray-200 bg-white" : "border-brand-200 bg-brand-50/40"
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <div>
              <span className="font-semibold text-slate-800">{contact.name}</span>
              {contact.business && (
                <span className="mr-2 text-sm text-slate-500"> — {contact.business}</span>
              )}
            </div>
            <label className="flex items-center gap-2 text-xs text-slate-500">
              <input
                type="checkbox"
                checked={contact.read}
                onChange={(e) => toggleRead(contact.id, e.target.checked)}
                className="h-3.5 w-3.5 rounded border-gray-300 text-brand focus:ring-brand"
              />
              خوانده شد
            </label>
          </div>
          <p dir="ltr" className="mb-2 text-left text-sm text-slate-500">
            {contact.email}
          </p>
          <p className="text-sm leading-6 text-slate-700">{contact.message}</p>
          <p className="mt-3 text-xs text-slate-400">
            {new Date(contact.created_at).toLocaleString("fa-IR")}
          </p>
        </div>
      ))}
      {!items.length && (
        <p className="rounded-2xl border border-gray-200 bg-white px-5 py-10 text-center text-slate-400">
          هنوز پیامی ثبت نشده است.
        </p>
      )}
    </div>
  );
}
