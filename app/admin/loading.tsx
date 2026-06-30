export default function Loading() {
  return (
    <div className="flex flex-col gap-4" dir="rtl">
      <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />
      <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  );
}
