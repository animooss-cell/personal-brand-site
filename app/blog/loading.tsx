export default function Loading() {
  return (
    <div dir="rtl">
      <div className="h-[300px] animate-pulse bg-slate-200 md:h-[500px]" />
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-3xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
