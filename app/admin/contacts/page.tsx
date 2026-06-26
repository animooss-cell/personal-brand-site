import { createClient } from "@/lib/supabase/server";
import ContactsTable from "@/components/admin/ContactsTable";
import { ContactMessage } from "@/lib/types";

export default async function AdminContactsPage() {
  const supabase = createClient();
  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">پیام‌های تماس</h1>
      <ContactsTable contacts={(contacts ?? []) as ContactMessage[]} />
    </div>
  );
}
