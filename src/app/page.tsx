import { cookies } from "next/headers";
import { toLocale } from "@/lib/i18n";
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

export default async function Home() {
  const cookieStore = await cookies();
  const locale = toLocale(cookieStore.get("greeny-locale")?.value);

  return (
    <>
      <HeroSection locale={locale} />
      <ScrollShowcaseSection locale={locale} />
      <ChatDemoSection locale={locale} />
      <GardenSection locale={locale} />
      <PlantGuideSection locale={locale} />
      <FeaturesSection locale={locale} />
      <PainSection locale={locale} />
      <HowItWorksSection locale={locale} />
      <CTASection locale={locale} />
      <Footer locale={locale} />
      <FloatingCTA locale={locale} />
    </>
  );
}
