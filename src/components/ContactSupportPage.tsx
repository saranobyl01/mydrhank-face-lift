import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

// Assuming productsData is needed for the Header, though not directly used on this page
// import { productsData } from '@/pages/Index';

const ContactSupportPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header products={productsData} /> {/* Include Header */}
      <div className="container mx-auto p-8 flex-grow"> {/* Added flex-grow to push footer down */}
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Support</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          We're here to help! Please fill out the form below or reach out to us directly.
        </p>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <Input id="name" type="text" placeholder="Your Name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" type="email" placeholder="your.email@example.com" required />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <Input id="phone" type="tel" placeholder="Your Phone Number (Optional)" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <Textarea id="message" placeholder="Your Message" rows={6} required />
            </div>
            <div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Footer /> {/* Include Footer */}
    </div>
  );
};

export default ContactSupportPage;
