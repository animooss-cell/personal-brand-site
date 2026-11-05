import { TRUST_STRIP_HEADING, getTrustCollaborations } from "@/lib/home";

export default async function TrustStrip() {
  const collaborations = await getTrustCollaborations();
  if (!collaborations.length) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-10" dir="rtl">
      <p className="mb-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
        {TRUST_STRIP_HEADING}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {collaborations.map((name) => (
          <span
            key={name}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
