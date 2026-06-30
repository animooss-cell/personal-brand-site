export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse px-6 py-16 md:py-24" dir="rtl">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="h-5 w-32 rounded-full bg-slate-200" />
        <div className="h-8 w-3/4 rounded-lg bg-slate-200" />
      </div>
      <div className="mb-10 aspect-video w-full rounded-3xl bg-slate-200" />
      <div className="flex flex-col gap-3">
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-full rounded bg-slate-100" />
        <div className="h-4 w-2/3 rounded bg-slate-100" />
      </div>
    </div>
  );
}
