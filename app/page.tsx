import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import BlogPreview from "@/components/BlogPreview";
import CTASection from "@/components/CTASection";

export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureStrip />
      <About />
      <Services />
      <BlogPreview />
      <CTASection />
    </>
  );
}
