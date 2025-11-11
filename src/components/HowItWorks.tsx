import { Button } from "@/components/ui/button";

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

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-secondary/50 py-20">
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
  );
};
