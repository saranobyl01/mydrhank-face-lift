import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const benefits = [
    "Save 95% with generic meds",
    "Prescribed online by a US medical professional",
    "Works for 80% of men",
    "Free consultation",
    "Discreet delivery",
  ];
  const navigate = useNavigate();

  return (
    <section className="bg-[#f5f7f9] text-[#1b1e23] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Side — Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            GET ED MEDS, SHIPPED
            <br />
            TO YOUR DOOR
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Same Pill. Same Effect. Lower Price.
          </p>
          <Button
            size="lg"
            className="bg-[#1b1e23] text-white hover:bg-[#2b2f35] text-lg px-8 py-6 rounded-full transition-smooth"
            onClick={() => navigate("/questions")}
          >
            Get Started
          </Button>
        </div>

        {/* Right Side — Benefits List */}
        <div className="flex flex-col gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              <Check className="w-6 h-6 text-[#1b1e23]" />
              <p className="text-lg">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
