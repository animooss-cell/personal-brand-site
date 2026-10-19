import { ChevronDown } from "lucide-react";

export type FaqAccordionItem = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: FaqAccordionItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-2xl border border-gray-200 bg-white transition-colors duration-200 open:border-brand dark:border-slate-700 dark:bg-slate-900 dark:open:border-brand-300"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 transition-colors duration-200 hover:bg-brand-50/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:hover:bg-brand-900/20 [&::-webkit-details-marker]:hidden">
            <h3 className="text-base font-semibold text-slate-900 group-open:text-brand-700 dark:text-white dark:group-open:text-brand-300">
              {item.question}
            </h3>
            <ChevronDown
              className="h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="px-5 pb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
