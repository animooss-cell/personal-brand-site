"use client";

import { useEffect } from "react";
import ErrorFallback from "@/components/ErrorFallback";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorFallback
      reset={reset}
      title="خطا در پنل ادمین"
      description="بارگذاری این بخش با خطا مواجه شد. لطفاً دوباره تلاش کنید."
    />
  );
}
