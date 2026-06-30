export default function Loading() {
  return (
    <div dir="rtl">
      <div className="px-4 pt-6 md:px-8">
        <div className="mx-auto h-[420px] max-w-6xl animate-pulse rounded-[2rem] bg-slate-200" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
