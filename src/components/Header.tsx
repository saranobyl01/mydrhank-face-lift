import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "../assets/rxbloom_logo.png";
import { Link } from 'react-router-dom'; // Import Link for navigation

// Define the Product type for better type safety
interface Product {
  name: string;
  ingredient: string;
  description: string;
  worksIn: string;
  lastsUpTo: string;
  image: string;
  id: string; // Assuming id is present from Index.tsx
}

// Define props for Header component
interface HeaderProps {
  products: Product[];
}

export const Header = ({ products }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-trust text-trust-foreground py-4 px-4 text-center text-lg font-medium sticky top-0 z-50">
        <p>20% Off First Order Code: 20FIRST</p>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-border shadow-soft">
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
                    {/* Dynamically render products */}
                    {products.map((product) => (
                      <Link
                        key={product.id} // Use product.id for key
                        to={`/products/${product.id}`} // Link to product detail page
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                onClick={() => {
                  setIsProductsOpen(false);
                  setIsMenuOpen(false); // Close mobile menu if open
                }}
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Link
        to="/contact-support" // Link to Contact Support page
        className="text-foreground hover:text-primary transition-smooth"
        onClick={() => setIsMenuOpen(false)} // Close mobile menu if open
      >
        Contact Support
      </Link>

      
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
                    {/* Dynamically render products for mobile */}
                    {products.map((product) => (
                      <Link
                        key={product.id} // Use product.id for key
                        to={`/products/${product.id}`} // Link to product detail page
                        className="text-foreground hover:text-primary"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {product.name}
                      </Link>
                    ))}
                  </div>
                </details>

                <Link
                  to="/contact-support" // Link to FAQ section
                  className="text-foreground hover:text-primary transition-smooth py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Support
                </Link>

                
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
};
