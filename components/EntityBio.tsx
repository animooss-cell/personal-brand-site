import Link from "next/link";
import { ENTITY_BIO_FA, ENTITY_BIO_HEADING } from "@/lib/site";

// پاراگراف «این شخص کیست و چه کرده؟» در صفحه‌های خدمات و نمونه‌کار؛ متنش از lib/site.ts می‌آید.
export default function EntityBio({ className = "mb-12" }: { className?: string }) {
  return (
    <div className={className}>
      <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">{ENTITY_BIO_HEADING}</h2>
      <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
        {ENTITY_BIO_FA}{" "}
        <Link href="/about" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
          بیشتر درباره‌ی من
        </Link>
      </p>
    </div>
  );
}
