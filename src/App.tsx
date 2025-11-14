import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetails from "./components/ProductDetails";
import ContactSupportPage from "./components/ContactSupportPage"; // Import the new page component
import FaqPage from "./pages/FaqPage"; // Import the FAQ page component
import TermsOfUsePage from "./pages/TermsOfUsePage"; // Import the Terms of Use page component
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage"; // Import the Privacy Policy page component
import QuestionnairePage from "./components/questionnaire/QuestionnairePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact-support" element={<ContactSupportPage />} /> {/* Route for Contact Support page */}
          <Route path="/faq" element={<FaqPage />} /> {/* Route for FAQ page */}
          <Route path="/terms" element={<TermsOfUsePage />} /> {/* Route for Terms of Use page */}
          <Route path="/privacy" element={<PrivacyPolicyPage />} /> {/* Route for Privacy Policy page */}
          <Route path="/questions" element={<QuestionnairePage />} />
          <Route path="/questions/:questionId" element={<QuestionnairePage />} />
          {/* Legacy routes - redirect to question format */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
