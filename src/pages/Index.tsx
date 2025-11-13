import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { ProductsSection } from "@/components/ProductsSection";
import { HowItWorks } from "@/components/HowItWorks";
import { TestimonialsSection } from "@/components/TestimonialSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";

interface ApiProduct {
  product_id: number;
  product_name: string;
  price: string;
  sku: string;
  category_name: string;
  image: string | null;
}

interface Product {
  id: string;
  name: string;
  ingredient: string; // Since API doesn't provide explicitly, you can parse from product_name or leave blank
  description: string; // Give a default description or parse as needed
  worksIn: string; // Unknown from API, can be set to empty or static
  lastsUpTo: string; // Unknown from API, can be set to empty or static
  image: string | null;
  price: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const cialisResponse = await fetch("https://panel.ravinimavat.com/rxbloom/api/get_all_cialis");
        const viagraResponse = await fetch("https://panel.ravinimavat.com/rxbloom/api/get_all_viagra");
        const [cialisData, viagraData] = await Promise.all([cialisResponse.json(), viagraResponse.json()]);

        // Helper to map API product to internal format
        const mapApiProduct = (apiProd: ApiProduct): Product => ({
          id: apiProd.product_id.toString(),
          name: apiProd.product_name,
          ingredient: "", // Optional: you could parse out ingredient from product_name if needed
          description: apiProd.category_name,
          worksIn: "", // Not available in API
          lastsUpTo: "", // Not available in API
          image: apiProd.image, // null if no image, you can optionally use a placeholder
          price: apiProd.price,
        });

        const combinedProducts = [
          ...cialisData.data.map(mapApiProduct),
          ...viagraData.data.map(mapApiProduct),
        ];

        setProducts(combinedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header products={products} />
      <HeroSection />
      <ProductsSection products={products} />
      <HowItWorks />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Index;
