import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { HOME_ABOUT_PRINCIPLES_HEADING, getHomeAboutContent } from "@/lib/home";

export default async function About() {
  const {
    badge,
    titlePrefix,
    titleHighlight,
    description,
    cardTitle,
    cardDescription,
    image,
    principles,
    secondaryImage,
    quoteTitle,
    quoteText,
  } = await getHomeAboutContent();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <span className="mb-3 inline-block text-sm font-medium text-brand-600">{badge}</span>
        <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
          {titlePrefix} <span className="text-brand-600">{titleHighlight}</span>
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="fade-in-up flex flex-col justify-between rounded-3xl bg-brand-50 p-7 dark:bg-brand-900/30">
          <div>
            <h3 className="mb-3 text-lg font-bold text-brand-800 dark:text-brand-200">{cardTitle}</h3>
            <p className="mb-6 text-sm leading-6 text-brand-700/80 dark:text-brand-300/80">{cardDescription}</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-brand-700 transition-colors duration-200 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
          >
            رزرو جلسه
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div
          style={{ animationDelay: "120ms" }}
          className="fade-in-up overflow-hidden rounded-3xl"
        >
          <Image
            src={image}
            alt="جلسه مشاوره کسب‌وکار"
            width={600}
            height={500}
            className="h-full min-h-[220px] w-full object-cover"
          />
        </div>

        <div
          style={{ animationDelay: "240ms" }}
          className="fade-in-up rounded-3xl border border-gray-200 bg-white p-7 dark:border-slate-700 dark:bg-slate-900"
        >
          <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">{HOME_ABOUT_PRINCIPLES_HEADING}</h3>
          <ul className="flex flex-col gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {principles.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="fade-in-up overflow-hidden rounded-3xl">
          <Image
            src={secondaryImage}
            alt="تیم مشاوره کسب‌وکار"
            width={900}
            height={400}
            className="h-[220px] w-full object-cover md:h-[260px]"
          />
        </div>

        <div className="fade-in-up flex flex-col justify-center rounded-3xl bg-slate-900 p-8 text-white">
          <h3 className="mb-3 text-xl font-bold">{quoteTitle}</h3>
          <p className="text-sm leading-7 text-slate-300">{quoteText}</p>
        </div>
      </div>
    </section>
  );
}
