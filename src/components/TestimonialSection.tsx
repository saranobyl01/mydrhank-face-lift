"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "“That medicine was the bomb. She was satisfied. The Man Is Still showing Up. Thank You…”",
      author: "Mr. Woodward",
    },
    {
      quote:
        "“Amazing experience! Quick consultation and fast delivery. Highly recommended!”",
      author: "John M.",
    },
    {
      quote:
        "“Discreet packaging and the results were better than I expected. Great service!”",
      author: "David K.",
    },
    {
      quote:
        "“The process was so easy and private. I’ll definitely continue with rxbloom.”",
      author: "James P.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000); // change every 4s for smoother reading
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Side */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3">
              Real Stories, Real Results
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Join our 12,000+ happy members
            </p>
            <Button className="bg-gray-900 text-white px-10 py-3 rounded-full text-base hover:bg-gray-800 transition">
              Get Started
            </Button>
          </div>

          {/* Right Side: Animated Testimonials */}
          <div className="text-center min-h-[140px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <blockquote className="text-gray-600 italic text-lg md:text-xl leading-relaxed mb-4 px-2">
                  {testimonials[current].quote}
                </blockquote>
                <p className="text-gray-800 font-semibold">
                  {testimonials[current].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
