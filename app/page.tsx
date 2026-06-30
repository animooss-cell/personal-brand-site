import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import BlogGrid from "@/components/BlogGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";

export const revalidate = 300;

export const metadata: Metadata = {
  title: {
    absolute:
      "مشاور هوش مصنوعی اهواز | آموزش هوش مصنوعی و مشاوره کسب‌وکار خوزستان",
  },
  description:
    "مشاوره کسب و کار اهواز و آموزش هوش مصنوعی خوزستان برای استارتاپ‌ها و سازمان‌های صنعتی؛ اتوماسیون کسب و کار با هوش مصنوعی، راه‌اندازی استارتاپ و کانتنت مارکتینگ هدفمند.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "مشاور هوش مصنوعی اهواز | آموزش هوش مصنوعی و مشاوره کسب‌وکار خوزستان",
    description:
      "مشاوره کسب و کار اهواز و آموزش هوش مصنوعی خوزستان برای استارتاپ‌ها و سازمان‌های صنعتی؛ اتوماسیون کسب و کار با هوش مصنوعی، راه‌اندازی استارتاپ و کانتنت مارکتینگ هدفمند.",
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <BlogGrid />
      <About />
      <Services />
      <CTASection />
    </>
  );
}
