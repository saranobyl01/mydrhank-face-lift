import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { BenefitsGrid } from "@/components/BenefitsGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TrustSection } from "@/components/TrustSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      <HeroSection />
      <BenefitsGrid />
      <FeaturesSection />
      <HowItWorks />
      <TrustSection />
      <Footer />
    </div>
  );
};

export default Index;
