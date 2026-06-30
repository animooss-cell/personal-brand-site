export default function Loading() {
  return (
    <div dir="rtl">
      <div className="px-4 pt-6 md:px-8">
        <div className="mx-auto flex h-72 max-w-6xl animate-pulse flex-col items-center justify-center gap-4 rounded-[2rem] bg-slate-200 md:h-96">
          <div className="h-32 w-32 rounded-full bg-slate-300 md:h-40 md:w-40" />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
