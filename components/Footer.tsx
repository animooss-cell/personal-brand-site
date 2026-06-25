import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-slate-600 md:flex-row">
        <p>© {new Date().getFullYear()} مشاور کسب‌وکار هوش مصنوعی. تمامی حقوق محفوظ است.</p>
        <div className="flex gap-6">
          <Link href="/" className="transition-colors duration-200 hover:text-brand-600">
            خانه
          </Link>
          <Link href="/blog" className="transition-colors duration-200 hover:text-brand-600">
            وبلاگ
          </Link>
          <Link href="/contact" className="transition-colors duration-200 hover:text-brand-600">
            تماس
          </Link>
        </div>
      </div>
    </footer>
  );
}
