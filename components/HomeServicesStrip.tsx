import Link from "next/link";
import { Briefcase, TrendingUp, GraduationCap, PenTool, ArrowLeft } from "lucide-react";

const items = [
  {
    href: "/services/ai-business-consulting",
    icon: Briefcase,
    title: "مشاوره هوش مصنوعی کسب‌وکار",
    featured: false,
  },
  {
    href: "/services/ai-growth-consulting",
    icon: TrendingUp,
    title: "مشاوره رشد کسب‌وکار با هوش مصنوعی",
    featured: false,
  },
  {
    href: "/services/ai-training-ahvaz",
    icon: GraduationCap,
    title: "آموزش هوش مصنوعی در اهواز",
    featured: true,
  },
  {
    href: "/services/ai-content-generation",
    icon: PenTool,
    title: "تولید محتوا با هوش مصنوعی",
    featured: false,
  },
];

export default function HomeServicesStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ href, icon: Icon, title, featured }, idx) => (
          <Link
            key={href}
            href={href}
            style={{ animationDelay: `${idx * 80}ms` }}
            className={`fade-in-up group flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-slate-900 ${
              featured ? "border-2 border-brand" : "border-gray-200 dark:border-slate-700"
            }`}
          >
            <div
              className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                featured ? "bg-brand text-white" : "bg-brand-50 text-brand-600 dark:bg-brand-900/30"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <span className="flex-1 text-sm font-semibold leading-6 text-slate-900 dark:text-white">
              {title}
            </span>
            <ArrowLeft
              className="h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 group-hover:-translate-x-1 dark:text-slate-500"
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
