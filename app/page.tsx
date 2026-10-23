import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import FeatureStrip from "@/components/FeatureStrip";
import BlogGrid from "@/components/BlogGrid";
import LatestNewsBanner from "@/components/LatestNewsBanner";
import About from "@/components/About";
import Services from "@/components/Services";
import HomeCourses from "@/components/HomeCourses";
import CTASection from "@/components/CTASection";

export const revalidate = 300;

const homeTitle = "مشاور هوش مصنوعی اهواز | مشاوره کسب‌وکار خوزستان";
const homeDescription =
  "مشاوره کسب‌وکار و پیاده‌سازی هوش مصنوعی برای استارتاپ‌ها و سازمان‌های صنعتی در اهواز و خوزستان؛ اتوماسیون فرآیندها و رشد کسب‌وکار هدفمند.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Services />
      <HomeCourses />
      <FeatureStrip />
      <BlogGrid />
      <LatestNewsBanner />
      <About />
      <CTASection />
    </>
  );
}
