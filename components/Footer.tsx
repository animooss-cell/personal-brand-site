import Link from "next/link";
import Image from "next/image";
import { Instagram, Send, MessageCircle } from "lucide-react";
import { getAboutContent, getSettings } from "@/lib/data";
import { toWhatsappHref } from "@/lib/social";
import NewsletterForm from "@/components/NewsletterForm";

const defaultSocialLinks: Record<string, string> = {
  instagram: "https://www.instagram.com/startuping_ir",
  telegram: "https://t.me/Staruping_ir",
  whatsapp: "09161002550",
};

const categories = [
  { label: "هوش مصنوعی", value: "هوش مصنوعی" },
  { label: "کسب‌وکار و استارتاپ", value: "کسب‌وکار" },
  { label: "تکنولوژی", value: "تکنولوژی" },
  { label: "مارکتینگ", value: "مارکتینگ" },
];

export default async function Footer() {
  const [a, s] = await Promise.all([getAboutContent(), getSettings()]);

  const description =
    s?.site_description ||
    "مشاوره کسب‌وکار و آموزش هوش مصنوعی برای استارتاپ‌ها و سازمان‌ها.";

  const socialLinks: Record<string, string> = { ...defaultSocialLinks };
  for (const [key, value] of Object.entries(a?.social_links ?? {})) {
    if (value) socialLinks[key] = value;
  }

  const socialItems = [
    { key: "instagram", icon: Instagram, href: socialLinks.instagram },
    { key: "telegram", icon: Send, href: socialLinks.telegram },
    {
      key: "whatsapp",
      icon: MessageCircle,
      href: socialLinks.whatsapp ? toWhatsappHref(socialLinks.whatsapp) : "",
    },
  ].filter((item) => item.href);

  return (
    <footer className="mt-24 bg-brand-dark text-white" dir="rtl">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <Image src="/logo.png" alt="لوگو" width={1774} height={887} className="mb-4 h-10 w-auto" />
          <p className="mb-5 max-w-xs text-sm leading-7 text-white/70">{description}</p>
          {socialItems.length > 0 && (
            <div className="flex items-center gap-3">
              {socialItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 transition-colors duration-200 hover:bg-brand hover:text-white"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">دسته‌بندی‌های وبلاگ</h3>
          <ul className="flex flex-col gap-3">
            {categories.map((category) => (
              <li key={category.value}>
                <Link
                  href={`/blog?category=${encodeURIComponent(category.value)}`}
                  className="text-sm text-white/70 transition-colors duration-200 hover:text-brand-300"
                >
                  {category.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-bold text-white">بهترین مطالب را دریافت کن</h3>
          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} مشاور کسب‌وکار هوش مصنوعی. تمامی حقوق محفوظ است.</p>
          <div className="flex gap-6">
            <Link href="/about" className="transition-colors duration-200 hover:text-brand-300">
              درباره من
            </Link>
            <Link href="/services" className="transition-colors duration-200 hover:text-brand-300">
              خدمات
            </Link>
            <Link href="/contact" className="transition-colors duration-200 hover:text-brand-300">
              تماس
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
