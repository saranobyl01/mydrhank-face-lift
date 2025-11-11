import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Who does RxBloom help?",
      answer:
        "RxBloom is most known for helping men who struggle with erectile dysfunction and want to do something about it quickly, easily, and discreetly.",
    },
    {
      question:
        "I need help with something, how do I reach the Patient Care team?",
      answer:
        "Call us anytime from Mon-Fri 9am to 5pm EST at +1 833 475 0421 or contact us via email at support@rxbloom.com.",
    },
    {
      question: "What medication is available from RxBloom?",
      answer:
        "RxBloom can supply all of your pharmacy needs, but our most popular products are Generic Viagra® and Generic Cialis®.",
    },
    {
      question: "Do I need a prescription?",
      answer:
        "You do need a prescription to take Generic Viagra® and Generic Cialis®. Our telemedicine doctors will approve you without even needing to leave your home.",
    },
    {
      question: "What if I already take Viagra® or Cialis®?",
      answer:
        "That’s okay! Our doctor will review your current dose and prescribe you appropriately. This will save you money and give you access to RxBlooms’s fast, convenient, and discreet refill process.",
    },
    {
      question: "How does this process work?",
      answer:
        "We will ask you a few clinical questions just like your doctor would and in most cases ask you a few basic questions over text in order to get the medication prescribed.",
    },
    {
      question: "Do I have to give you my credit card information now?",
      answer:
        "Usually yes, we do ask for a credit card information up front. So that once we have your approval, we can get the medication shipped out once you are ready. But you will never be charged unless you are approved and we are ready to ship your medication out. You can even specify a certain day for this charge if that is more convenient for you.",
    },
    {
      question: "Can I get a subscription?",
      answer:
        "Yes. You can choose one of our convenient subscription options. That way you will always have your medication available when the time is right.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We want to make sure you get the best service possible. If your package does not contain what you ordered, or arrives damaged, we will make it right and will work to ship you a replacement in a timely manner. Because of the nature of our products, we cannot accept any returns.",
    },
    {
      question: "What about Shipping?",
      answer:
        "Shipping is free with every order. Once we receive your prescription and payment we will ship your products within 24 hours. You should receive your items within 5 business days.",
    },
    {
      question: "What are your hours of operation?",
      answer:
        "We are in the office Monday- Friday 9AM to 5PM EST.",
    },
  ];

  const toggleFaq = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-semibold mb-10 text-center">
        Your Questions, Answered
      </h2>

      <div className="max-w-3xl mx-auto border-t border-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
            >
              <span className="text-lg text-gray-800">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="text-gray-800 w-5 h-5" />
              ) : (
                <Plus className="text-gray-800 w-5 h-5" />
              )}
            </button>

            <div
              className={`transition-all duration-300 overflow-hidden ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-600 pb-4 pl-1">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
