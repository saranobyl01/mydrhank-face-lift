import { Card } from "@/components/ui/card";
import { ShieldCheck, Package, Lock } from "lucide-react";

export const TrustSection = () => {
  return (
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
  );
};
