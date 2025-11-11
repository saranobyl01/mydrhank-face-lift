import { Button } from "@/components/ui/button";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            GET ED MEDS, SHIPPED
            <br />
            TO YOUR DOOR
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            Same Pill. Same Effect. Lower Price.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-secondary hover:text-primary text-lg px-8 py-6 rounded-full shadow-medium transition-smooth animate-scale-in"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};
