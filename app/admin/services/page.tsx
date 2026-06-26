import { createClient } from "@/lib/supabase/server";
import ServicesForm from "@/components/admin/ServicesForm";
import { ServiceCard } from "@/lib/types";

export default async function AdminServicesPage() {
  const supabase = createClient();
  const { data: services } = await supabase.from("services").select("*").order("position");

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900">کارت‌های خدمات</h1>
      <ServicesForm services={(services ?? []) as ServiceCard[]} />
    </div>
  );
}
