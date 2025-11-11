import { Card } from "@/components/ui/card";
import { DollarSign, Clock, Package } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Save 95%",
    description: "Get the same quality generic medications at a fraction of the brand-name price"
  },
  {
    icon: Clock,
    title: "100% Online",
    description: "Complete your consultation from the comfort of your home, anytime"
  },
  {
    icon: Package,
    title: "Fast Delivery",
    description: "Medications shipped directly to your door in discreet packaging"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get ED Meds, Shipped to your Door
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className="p-8 text-center hover:shadow-medium transition-smooth"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-primary/10 rounded-full">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-card-foreground">
              {feature.title}
            </h3>
            <p className="text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};
