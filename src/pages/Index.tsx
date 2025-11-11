import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import viagraImg from "@/assets/sildenafil.webp";
import cialisImg from "@/assets/Tadalafil.webp";
import dailyCialisImg from "@/assets/Daily-tadalafil.webp";

// Define product data here to be shared between Header and ProductsSection
const productsData = [
  {
    name: "Generic of Viagra®",
    ingredient: "Sildenafil",
    description:
      "Contains the same active ingredient as Viagra® for up to 95% less.",
    worksIn: "30–60 mins",
    lastsUpTo: "4–6 hours",
    image: viagraImg,
    id: "viagra", // Added for unique identifier
  },
  {
    name: "Generic of Cialis®",
    ingredient: "Tadalafil",
    description:
      "Contains the same active ingredient as Cialis® for up to 95% less.",
    worksIn: "30–60 mins",
    lastsUpTo: "36 hours",
    image: cialisImg,
    id: "cialis", // Added for unique identifier
  },
  {
    name: "Daily Generic of Cialis®",
    ingredient: "Tadalafil",
    description:
      "Contains the same active ingredient as Viagra® to get hard for less.",
    worksIn: "Always active",
    lastsUpTo: "Always active",
    image: dailyCialisImg,
    id: "daily-cialis", // Added for unique identifier
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Pass productsData to Header */}
      <Header products={productsData} />
      <HeroSection />
      {/* Pass productsData to ProductsSection */}
      <ProductsSection products={productsData} />
      <HowItWorks />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
