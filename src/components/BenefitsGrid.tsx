import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const benefits = [
  "Save 95% with generic meds",
  "Prescribed online by a US medical professional",
  "Works for 80% of men",
  "Free consultation",
  "Discreet delivery",
  "No Insurance Required"
];

export const BenefitsGrid = () => {
  return (
    <section id="benefits" className="container mx-auto px-4 -mt-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {benefits.map((benefit, index) => (
          <Card 
            key={index} 
            className="p-6 bg-card shadow-soft hover:shadow-medium transition-smooth animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Check className="w-6 h-6 text-trust" />
              </div>
              <p className="text-card-foreground font-medium">{benefit}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
