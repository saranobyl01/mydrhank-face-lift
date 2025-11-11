import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "../assets/rxbloom_logo.png"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-trust text-trust-foreground py-4 px-4 text-center text-lg font-medium">
        <p>20% Off First Order Code: 20FIRST</p>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="rxbloom Logo" className="h-10 w-auto" />
              </a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 relative">
              <Button className="bg-white text-black border border-black rounded-full hover:bg-gray-100 transition-smooth">
                Login
              </Button>
              {/* Products Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center gap-1 text-foreground hover:text-primary transition-smooth"
                >
                  Products
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isProductsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProductsOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-soft">
                    <a
                      href="#product1"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Product 1
                    </a>
                    <a
                      href="#product2"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Product 2
                    </a>
                    <a
                      href="#product3"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      Product 3
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#faq"
                className="text-foreground hover:text-primary transition-smooth"
              >
                Contact Support
              </a>

              
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
                <Button className="bg-white text-black border border-black rounded-full hover:bg-gray-100 transition-smooth w-full">
                  Login
                </Button>
                <details className="group">
                  <summary className="flex justify-between items-center text-foreground hover:text-primary cursor-pointer py-2 list-none">
                    <span>Products</span>
                    <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <a
                      href="#product1"
                      className="text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Product 1
                    </a>
                    <a
                      href="#product2"
                      className="text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Product 2
                    </a>
                    <a
                      href="#product3"
                      className="text-foreground hover:text-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Product 3
                    </a>
                  </div>
                </details>

                <a
                  href="#faq"
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Support
                </a>

                
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};
