import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import viagraImage from "@/assets/sildenafil.webp";
import cialisImage from "@/assets/Tadalafil.webp";
import dailyCialisImage from "@/assets/Daily-tadalafil.webp";
import { Check, Clock, DollarSign } from "lucide-react";
import { HowItWorks } from "./HowItWorks";
import viagraHandImage from "@/assets/sildenafil_hand.webp";
import cialisHandImage from "@/assets/Tadalafil_hand.webp";
import dailyCialisHandImage from "@/assets/Daily-tadalafil_hand.webp";
import { FaqSection } from "./FaqSection";

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
  ingredient: string;
  description: string;
  worksIn: string;
  lastsUpTo: string;
  image: string;
  price: string;
}

const productImageMap: { [key: string]: string } = {
  viagra: viagraImage,
  cialis: cialisImage,
  "daily-cialis": dailyCialisImage,
};

const handImageMap: { [key: string]: string } = {
  viagra: viagraHandImage,
  cialis: cialisHandImage,
  "daily-cialis": dailyCialisHandImage,
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const cialisResponse = await fetch(
          "https://panel.ravinimavat.com/rxbloom/api/get_all_cialis"
        );
        const viagraResponse = await fetch(
          "https://panel.ravinimavat.com/rxbloom/api/get_all_viagra"
        );
        const [cialisData, viagraData] = await Promise.all([
          cialisResponse.json(),
          viagraResponse.json(),
        ]);

        const mapApiProduct = (apiProd: ApiProduct): Product => ({
          id: apiProd.product_id.toString(),
          name: apiProd.product_name,
          ingredient: "", // Optional: parse from product_name if needed
          description: apiProd.category_name,
          worksIn: "", // Unknown from API, set blank or default
          lastsUpTo: "", // Unknown from API, set blank or default
          image: apiProd.image || "", // Use empty string as fallback
          price: apiProd.price,
        });

        const combinedProducts = [
          ...cialisData.data.map(mapApiProduct),
          ...viagraData.data.map(mapApiProduct),
        ];

        setProducts(combinedProducts);

        if (id) {
          const found = combinedProducts.find((p) => p.id === id);
          if (found) {
            // Provide hand image if product matches known ids for visual
            setProduct({
              ...found,
              image: found.image || productImageMap[found.id] || "",
            });
          }
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }

    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header products={products} />
        <div className="container mx-auto p-8 text-center flex-grow">
          Loading product details...
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header products={products} />
        <div className="container mx-auto p-8 text-center flex-grow">
          Product not found.
        </div>
        <Footer />
      </div>
    );
  }

  const handImg = handImageMap[product.id] || "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header products={products} />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to all treatments
        </Link>
      </div>

      {/* Main Grid */}
      <div className="container mx-auto px-4 py-8 flex-grow max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Pill Image */}
          <div className="flex justify-center md:justify-end items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl -translate-y-4 md:-translate-y-6"
            />
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {product.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                {product.ingredient}
              </p>
            </div>

            {/* Feature Bullets */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-trust flex-shrink-0" />
                <span className="text-foreground">FDA Approved Medication</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-trust flex-shrink-0" />
                <span className="text-foreground">Lasts up to {product.lastsUpTo}</span>
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-trust flex-shrink-0" />
                <span className="text-foreground">Price: ${product.price}</span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full md:w-auto bg-black text-white rounded-full px-8 py-6 text-lg hover:bg-gray-900 transition"
            >
              <Link to="/consultation">Order Now →</Link>
            </Button>

            {/* FAQ Accordion */}
            <div className="mt-12 space-y-2">
              <Accordion type="single" collapsible defaultValue="">
                <AccordionItem value="what-is" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    What is {product.ingredient || product.name}?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="right-for-me" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    Is {product.name} right for me?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    Consult your doctor to determine if {product.name} is appropriate for your specific health condition.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prescription" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    Do I need a prescription to get {product.ingredient || product.name}?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    Yes, {product.ingredient || product.name} is a prescription medication and requires a doctor's prescription to obtain.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <HowItWorks />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default ProductDetails;
