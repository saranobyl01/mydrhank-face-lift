import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import legitScriptBadge from "@/assets/legit_script_certified.png"; // <-- Update path as needed

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        {/* Bottom Section - Matching the Image Exactly */}
        <div className="flex flex-col items-center gap-6 text-sm text-muted-foreground">
          {/* LegitScript Badge */}
          <div>
            {/* Replace src with your actual image path or use public folder */}
            <img 
              src={legitScriptBadge} 
              alt="LegitScript Certified" 
              className="h-16 mx-auto"
            />
            {/* OR if using public folder: <img src="/legitscript-certified.png" alt="LegitScript Certified" className="h-16 mx-auto" /> */}
          </div>

          {/* Links Row */}
          <div className="flex flex-wrap justify-center gap-4 text-xs md:text-sm">
            <a href="/faq" className="hover:text-primary transition-colors">
              Frequently Asked Questions
            </a>
            <a href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </a>
            <a href="/privacy-choices" className="hover:text-primary transition-colors">
              Your Privacy Choices
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-center">
            Copyright {currentYear} RxBloom All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};