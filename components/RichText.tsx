import { Fragment } from "react";
import Link from "next/link";
import type { Rich } from "@/lib/rich";

const DEFAULT_LINK = "font-semibold text-brand-700 hover:underline";

export default function RichText({ parts, linkClassName = DEFAULT_LINK }: { parts: Rich; linkClassName?: string }) {
  return (
    <>
      {parts.map((part, i) =>
        typeof part === "string" ? (
          <Fragment key={i}>{part}</Fragment>
        ) : (
          <Link key={i} href={part.href} className={linkClassName}>
            {part.label}
          </Link>
        ),
      )}
    </>
  );
}
