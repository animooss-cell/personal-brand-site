"use client";

import { AlertTriangle, RotateCw } from "lucide-react";

export default function ErrorFallback({
  reset,
  title = "مشکلی پیش آمد",
  description = "در بارگذاری این صفحه خطایی رخ داد. لطفاً دوباره تلاش کنید.",
}: {
  reset: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center"
      dir="rtl"
    >
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
        <AlertTriangle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h2 className="mb-2 text-xl font-bold text-slate-900">{title}</h2>
      <p className="mb-7 text-sm leading-7 text-slate-500">{description}</p>
      <button
        onClick={reset}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-600"
      >
        <RotateCw className="h-4 w-4" aria-hidden="true" />
        تلاش دوباره
      </button>
    </div>
  );
}
