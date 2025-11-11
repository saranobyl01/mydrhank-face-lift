import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/mydrhank-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-trust text-trust-foreground py-2 px-4 text-center text-sm font-medium">
        <p>✓ Free Consultation | ✓ Discreet Delivery | ✓ Save 95% on Generic Meds</p>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="MyDrHank Logo" className="h-10 w-10" />
                <span className="text-xl font-bold text-primary">MyDrHank</span>
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-foreground hover:text-primary transition-smooth">
                How It Works
              </a>
              <a href="#benefits" className="text-foreground hover:text-primary transition-smooth">
                Benefits
              </a>
              <a href="#faq" className="text-foreground hover:text-primary transition-smooth">
                FAQ
              </a>
              <Button className="bg-primary hover:bg-accent text-white">
                Get Started
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a
                  href="#how-it-works"
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </a>
                <a
                  href="#benefits"
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Benefits
                </a>
                <a
                  href="#faq"
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </a>
                <Button className="bg-primary hover:bg-accent text-white w-full">
                  Get Started
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};
