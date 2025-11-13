import React from 'react';
// import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/FaqSection';

// Assuming productsData is needed for the Header, though not directly used on this page
// import { productsData } from '@/pages/Index';

const FaqPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header products={productsData} /> Include Header */}
      <div className="container mx-auto p-8 flex-grow"> {/* Added flex-grow to push footer down */}
        <h1 className="text-4xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
        <FaqSection /> {/* Render the existing FaqSection */}
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default FaqPage;
