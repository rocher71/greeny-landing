import HeroSection from "@/components/sections/HeroSection";
import PainSection from "@/components/sections/PainSection";
import ScrollShowcaseSection from "@/components/sections/ScrollShowcaseSection";
import ChatDemoSection from "@/components/sections/ChatDemoSection";
import GardenSection from "@/components/sections/GardenSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PlantGuideSection from "@/components/sections/PlantGuideSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ScrollShowcaseSection />
      <ChatDemoSection />
      <GardenSection />
      <PlantGuideSection />
      <FeaturesSection />
      <PainSection />
      <HowItWorksSection />
      <CTASection />
      <Footer />
      <FloatingCTA />
    </>
  );
}
