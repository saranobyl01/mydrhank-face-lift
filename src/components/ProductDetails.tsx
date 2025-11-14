// src/pages/ProductDetails.tsx
import { motion } from "framer-motion";
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { productsData } from '../pages/Index';
import viagraImage from '@/assets/sildenafil.webp';
import cialisImage from '@/assets/Tadalafil.webp';
import dailyCialisImage from '@/assets/Daily-tadalafil.webp';
import { Check, Clock, DollarSign, ChevronDown } from 'lucide-react';
import { HowItWorks } from "./HowItWorks";
import viagraHandImage from '@/assets/sildenafil_hand.webp';     
import cialisHandImage from '@/assets/Tadalafil_hand.webp';        
import dailyCialisHandImage from '@/assets/Daily-tadalafil_hand.webp'; 
import { FaqSection } from "./FaqSection";

const productImageMap: { [key: string]: string } = {
  viagra: viagraImage,
  cialis: cialisImage,
  'daily-cialis': dailyCialisImage,
};

interface Product {
  name: string;
  ingredient: string;
  description: string;
  worksIn: string;
  lastsUpTo: string;
  image: string;
  id: string;
}

interface ExploreMoreEDProps {
  currentProductId: string;
  allProducts: Product[];
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (id) {
      const found = productsData.find(p => p.id === id);
      if (found) {
        setProduct({
          ...found,
          image: productImageMap[found.id] || '',
        });
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header products={productsData} />
        <div className="container mx-auto p-8 text-center flex-grow">
          {id ? `Loading product ${id}...` : 'Product not found.'}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header products={productsData} />

      {/* ---------- Breadcrumb ---------- */}
      <div className="container mx-auto px-4 pt-6">
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to all treatments
        </Link>
      </div>

      {/* ---------- Main Grid ---------- */}
      <div className="container mx-auto px-4 py-8 flex-grow max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ---------- Left: Pill Image ---------- */}
          <div className="flex justify-center md:justify-end items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-contain drop-shadow-2xl -translate-y-4 md:-translate-y-6"
            />
          </div>

          {/* ---------- Right: Content ---------- */}
          <div className="space-y-8">

            {/* Title */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Generic of {product.name}
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
                <span className="text-foreground">
                  Lasts up to {product.lastsUpTo}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-trust flex-shrink-0" />
                <span className="text-foreground">
                  From only $1.66 per pill
                </span>
              </li>
            </ul>

            {/* CTA Button */}
            <Button
              asChild
              className="w-full md:w-auto bg-black text-white rounded-full px-8 py-6 text-lg hover:bg-gray-900 transition"
            >
              <Link to="/questions">
                Order {product.ingredient.split(' ')[0]} →
              </Link>
            </Button>

            {/* ---------- FAQ Accordion ---------- */}
            <div className="mt-12 space-y-2">
              <Accordion type="single" collapsible defaultValue="">
                {/* What is */}
                <AccordionItem value="what-is" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    What is {product.ingredient}?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>

                {/* Right for me */}
                <AccordionItem value="right-for-me" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    Is {product.name} right for me?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    Consult your doctor to determine if {product.name} is appropriate for your specific health condition.
                  </AccordionContent>
                </AccordionItem>

                {/* Prescription */}
                <AccordionItem value="prescription" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:text-primary">
                    Do I need a prescription to get {product.ingredient}?
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    Yes, {product.ingredient} is a prescription medication and requires a doctor's prescription to obtain.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

          </div>
        </div>
      </div>
      <StatsCarousel />
      <WhyGenericSection product={product} />
      <HowItWorks />
      <ExploreMoreED currentProductId={product.id} allProducts={productsData} />
      <FaqSection />
      <Footer />
    </div>
  );
};

const StatsCarousel = () => {
  const stats = [
    { percent: "88%", text: "of men find success with generic Viagra®" },
    { percent: "52%", text: "of men 40‑70 years old have some level of ED" },
    { percent: "82%", text: "of men find success with generic Cialis®" },
    { percent: "12,000+", text: "RxBloom patients treated successfully" },
  ];

  // Duplicate **twice** for a seamless loop (you can add more if you want)
  const duplicated = [...stats, ...stats, ...stats];

  // Total width of ONE original set (4 cards)
  const itemWidth = 12;   // w-48 = 12rem
  const gap = 3;          // gap-12 = 3rem
  const oneSetWidth = (itemWidth + gap) * stats.length; // 60rem for 4 items

  return (
    <div className="mt-16 py-12 bg-white overflow-hidden">
      {/* Half‑screen centered container */}
      <div className="flex justify-center">
        <div className="w-full max-w-xl overflow-hidden">
          <motion.div
            className="flex gap-12"
            animate={{ x: [0, `-${oneSetWidth}rem`] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 12,          // adjust speed here
                ease: "linear",
              },
            }}
            style={{ width: `${duplicated.length * (itemWidth + gap)}rem` }}
          >
            {duplicated.map((stat, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-48 flex flex-col items-center text-center"
              >
                <h3 className="text-5xl md:text-6xl font-bold text-foreground mb-2">
                  {stat.percent}
                </h3>
                <div className="w-16 h-px bg-muted-foreground/30 mb-3" />
                <p className="text-base md:text-lg text-muted-foreground">
                  {stat.text}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const WhyGenericSection = ({ product }: { product: Product }) => {
  // Map product.id → hand image
  const handImageMap: Record<string, string> = {
    viagra: viagraHandImage,
    cialis: cialisHandImage,
    "daily-cialis": dailyCialisHandImage,
  };

  const handImg = handImageMap[product.id] || "";

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT – Text */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why {product.name}
            </h2>

            {/* Proven Results */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Proven Results
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.name} ({product.ingredient}) works just like the brand‑name version,
                helping you get and maintain stronger erections when you need them.
              </p>
            </div>

            {/* FDA‑Approved & Safe */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                FDA‑Approved & Safe
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                It’s the same active ingredient as {product.name}, prescribed by licensed providers and
                shipped directly from U.S. pharmacies.
              </p>
            </div>

            {/* Affordable & Discreet */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                Affordable & Discreet
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Enjoy the same results at a fraction of the cost—with treatment starting at just $1.66 per
                pill, delivered to your door in discreet packaging.
              </p>
            </div>
          </div>

          {/* RIGHT – Hand with pill */}
          <div className="flex justify-center md:justify-start">
            <img
              src={handImg}
              alt={`${product.name} in hand`}
              className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const ExploreMoreED = ({ currentProductId, allProducts }: ExploreMoreEDProps) => {
  // Filter out the current product
  const otherProducts = allProducts.filter(p => p.id !== currentProductId);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
          Explore More ED Options
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
          {otherProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Pill image + title */}
              <div className="flex flex-col items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 mb-3 object-contain"
                />
                <h3 className="text-lg font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">{product.ingredient}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4">
                {product.id === "viagra"
                  ? "Contains the same active ingredient as Viagra® for up to 95% less."
                  : product.id === "cialis"
                  ? "Contains the same active ingredient as Cialis® to get hard for less."
                  : "Get stronger, quicker results with this fast‑acting combo"}
              </p>

              {/* Works in / Lasts up to */}
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Works in
                  </span>
                  <span className="block text-sm font-medium bg-gray-100 px-3 py-1 rounded-full mt-1">
                    {product.worksIn}
                  </span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">
                    Lasts up to
                  </span>
                  <span className="block text-sm font-medium bg-gray-100 px-3 py-1 rounded-full mt-1">
                    {product.lastsUpTo}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-center">
                <Button
                  asChild
                  className="bg-black text-white rounded-full px-6 py-2 text-sm hover:bg-gray-900"
                >
                  <Link to="/questions">Get Started</Link>
                </Button>
                <Link
                  to={`/products/${product.id}`}
                  className="text-sm text-muted-foreground underline hover:text-foreground"
                >
                  Learn more
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;