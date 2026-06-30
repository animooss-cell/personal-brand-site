"use client";

import { useEffect } from "react";
import ErrorFallback from "@/components/ErrorFallback";

export default function GlobalError({
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
    <html lang="fa" dir="rtl">
      <body>
        <ErrorFallback
          reset={reset}
          title="خطایی در سایت رخ داد"
          description="مشکلی پیش‌بینی‌نشده پیش آمد. لطفاً صفحه را دوباره بارگذاری کنید."
        />
      </body>
    </html>
  );
}
