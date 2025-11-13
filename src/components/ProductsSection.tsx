import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  ingredient: string;
  description: string;
  worksIn: string;
  lastsUpTo: string;
  image: string | null;
  price: string;
}

interface ProductsSectionProps {
  products: Product[];
}

export const ProductsSection = ({ products }: ProductsSectionProps) => {
  const placeholderImg = "/path/to/placeholder-image.png"; // Optional, set a placeholder for missing images

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
            rxbloom makes it easy to get started with ED meds
          </h2>
          <p className="text-gray-600 text-lg">
            Get personalized ED treatments starting at competitive prices. Skip the pharmacy lines with free and discreet shipping.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="w-16 h-16 mb-4">
                <img
                  src={product.image ?? placeholderImg}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">{product.ingredient || product.description}</p>

              <p className="text-sm text-gray-600 mb-6">
                Price: ${product.price}
              </p>

              {/* Works In / Lasts Up To — Leaving empty for now since API doesn't provide */}
              {/* You can optionally remove or update */}
              <div className="flex justify-center gap-8 mb-6">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">WORKS IN</span>
                  <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full inline-block mt-1">{product.worksIn}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">LASTS UP TO</span>
                  <span className="text-sm font-medium text-gray-800 bg-gray-100 px-3 py-1 rounded-full inline-block mt-1">{product.lastsUpTo}</span>
                </div>
              </div>

              <div className="flex gap-4 items-center justify-center">
                <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-900 transition" onClick={() => alert("Order flow to be implemented")}>
                  Get Started
                </Button>
                <a href={`#${product.id}`} className="text-sm text-gray-700 underline hover:text-gray-900">
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
