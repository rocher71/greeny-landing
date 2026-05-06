import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import ScrollShowcaseSection from "@/components/sections/ScrollShowcaseSection";
import GardenSection from "@/components/sections/GardenSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PainSection />
      <ScrollShowcaseSection />
      <GardenSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </>
  );
}
