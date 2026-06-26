import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import BlogGrid from "@/components/BlogGrid";
import About from "@/components/About";
import Services from "@/components/Services";
import CTASection from "@/components/CTASection";

export const revalidate = 0;

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
