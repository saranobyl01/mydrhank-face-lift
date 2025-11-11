import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, ShieldCheck, Package, Clock, DollarSign, Lock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
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

      {/* Benefits Grid */}
      <section className="container mx-auto px-4 -mt-16 relative z-10">
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

      {/* Main Content Section */}
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

      {/* How It Works */}
      <section className="bg-secondary/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple, fast, and completely confidential
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-medium">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-accent text-white text-lg px-8 py-6 rounded-full shadow-medium transition-smooth"
            >
              Start Your Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-card shadow-medium">
            <div className="text-center mb-8">
              <ShieldCheck className="w-16 h-16 text-trust mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-card-foreground mb-4">
                Your Privacy & Safety Matter
              </h2>
              <p className="text-lg text-muted-foreground">
                All consultations are conducted by US-licensed medical professionals.
                Your information is protected and delivery is always discreet.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-card-foreground">HIPAA Compliant</p>
              </div>
              <div>
                <ShieldCheck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-card-foreground">Licensed Providers</p>
              </div>
              <div>
                <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium text-card-foreground">Discreet Packaging</p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

const benefits = [
  "Save 95% with generic meds",
  "Prescribed online by a US medical professional",
  "Works for 80% of men",
  "Free consultation",
  "Discreet delivery",
  "No Insurance Required"
];

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

const steps = [
  {
    title: "Complete Consultation",
    description: "Answer a few quick questions about your health and medical history"
  },
  {
    title: "Get Prescription",
    description: "A licensed US medical professional reviews and prescribes if appropriate"
  },
  {
    title: "Receive Medication",
    description: "Your medication arrives at your door in discreet packaging"
  }
];

export default Index;
