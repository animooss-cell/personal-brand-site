import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const title =
  "مشاور هوش مصنوعی اهواز | آموزش هوش مصنوعی و مشاوره کسب‌وکار خوزستان";
const description =
  "مشاوره کسب‌وکار اهواز، آموزش هوش مصنوعی خوزستان و اتوماسیون کسب‌وکار با هوش مصنوعی برای استارتاپ‌ها و سازمان‌های صنعتی. مشاوره راه‌اندازی استارتاپ، پیاده‌سازی هوش مصنوعی و دیجیتال مارکتینگ هدفمند.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | عبدالله احمدیان",
  },
  description,
  keywords: [
    "مشاور هوش مصنوعی اهواز",
    "آموزش هوش مصنوعی خوزستان",
    "مشاوره کسب و کار اهواز",
    "اتوماسیون کسب و کار با هوش مصنوعی",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: SITE_NAME,
    title,
    description,
    url: SITE_URL,
    images: ["/profile.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "yU1qJ0LBmvQFOzMapV847xYnvFOUpt54_gHNo82E9V0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "عبدالله احمدیان - مشاور هوش مصنوعی و کسب‌وکار",
    description,
    url: SITE_URL,
    image: `${SITE_URL}/profile.png`,
    areaServed: {
      "@type": "City",
      name: "اهواز",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "اهواز",
      addressRegion: "خوزستان",
      addressCountry: "IR",
    },
    founder: {
      "@type": "Person",
      name: "عبدالله احمدیان",
    },
  };

  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazirmatn.variable} font-vazir antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
