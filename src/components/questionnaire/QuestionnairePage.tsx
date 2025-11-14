import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/rxbloom_logo.png";
import { findQuestionById, getFirstQuestion, Question, QuestionType } from "./questionnaireConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { productsData } from "../../pages/Index";

// Map legacy routes to question IDs
const legacyRouteMap: { [key: string]: string } = {
  "/testimonial": "testimonial",
  "/basics": "basics",
  "/treatment-details": "treatment-details",
  "/treatment-details2": "side-effects",
  "/treatment-details3": "physical-exam-issues",
  "/treatment-details4": "blood-pressure",
};

const CalendarIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="16" rx="2.5"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const QuestionnairePage: React.FC = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentId, setCurrentId] = useState(questionId || getFirstQuestion().id);
  const [history, setHistory] = useState<string[]>([]);
  const [answers, setAnswers] = useState<{ 
    [k: string]: string | { option: string; textInput?: string } | Array<{ name: string; strength: string; frequency: string }> | { product: string; dosage: string } | { addressLine1: string; addressLine2: string; city: string; state: string; zipCode: string } | { product: string; dosage: string; paymentMethod: string; cardDetails: { cardNumber: string; expirationDate: string; securityCode: string } | null }
  }>({});
  
  // For handling conditional text inputs after option selection
  const [selectedOption, setSelectedOption] = useState<{ questionId: string; optionLabel: string; next: string; textInputConfig?: any } | null>(null);
  
  // For direct input questions
  const [inputValue, setInputValue] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  
  // For medication list
  const [medications, setMedications] = useState<Array<{ name: string; strength: string; frequency: string }>>([]);
  const [isMedicationModalOpen, setIsMedicationModalOpen] = useState(false);
  const [medicationForm, setMedicationForm] = useState({ name: "", strength: "", frequency: "" });
  
  // For product selection
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedDosage, setSelectedDosage] = useState<string | null>(null);
  
  // For shipping address
  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  });
  
  // For checkout/payment
  const [discountCode, setDiscountCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"card" | "bank" | "amazon" | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
  });
  
  // Dosage options for each product
  const dosageOptions: { [key: string]: Array<{ strength: string; label: string; description: string }> } = {
    viagra: [
      {
        strength: "50mg",
        label: "Lower Strength",
        description: "Best for first time users",
      },
      {
        strength: "100mg",
        label: "Higher Strength",
        description: "Best if you've taken ED medication in the past or need to increase your dosage",
      },
    ],
    cialis: [
      {
        strength: "10mg",
        label: "Lower Strength",
        description: "Best for first time users",
      },
      {
        strength: "20mg",
        label: "Higher Strength",
        description: "Best if you've taken ED medication in the past or need to increase your dosage",
      },
    ],
    "daily-cialis": [
      {
        strength: "30 Tablets",
        label: "($2.40/tablet)",
        description: "Monthly Subscription",
      },
      {
        strength: "90 Tablets",
        label: "($1.34/tablet)",
        description: "3 Month Supply",
      },
    ],
  };
  
  // Product prices mapping (based on image description)
  const productPrices: { [key: string]: string } = {
    viagra: "$2.08",
    cialis: "$2.25",
    "daily-cialis": "$1.67",
    "extra-strength": "$4.58",
  };
  
  // Extended products data matching the image - updated names and descriptions
  const extendedProducts = [
    {
      name: "Generic Viagra®",
      ingredient: "Sildenafil",
      description: "Same ingredient as Viagra® for up to 95% less.",
      worksIn: "30-60 mins",
      lastsUpTo: "4 hours",
      image: productsData[0].image,
      id: "viagra",
    },
    {
      name: "Generic Cialis®",
      ingredient: "Tadalafil",
      description: "Same active ingredient as Cialis®. Last longer for up to 95% less.",
      worksIn: "30-60 mins",
      lastsUpTo: "36 hours",
      image: productsData[1].image,
      id: "cialis",
    },
    {
      name: "Daily Generic Cialis®",
      ingredient: "Tadalafil",
      description: "This low-dose daily option is always active for whenever the moment is right.",
      worksIn: "Always active",
      lastsUpTo: "Always active",
      image: productsData[2].image,
      id: "daily-cialis",
    },
  ];
  
  // Refs must be declared at the top level, not conditionally
  const dateInputRef = React.useRef<HTMLInputElement>(null);

  // Handle legacy routes
  useEffect(() => {
    const pathname = location.pathname;
    if (legacyRouteMap[pathname] && (!questionId || questionId !== legacyRouteMap[pathname])) {
      navigate(`/questions/${legacyRouteMap[pathname]}`, { replace: true });
      return;
    }
  }, [location.pathname, questionId, navigate]);

  // Sync questionId from URL with currentId state - this ensures immediate UI updates
  useEffect(() => {
    if (questionId) {
      // Always sync when questionId changes from URL
      if (questionId !== currentId) {
      setCurrentId(questionId);
        setSelectedOption(null);
        setInputValue("");
        setPhone("");
        setZip("");
        setMedications([]);
        setMedicationForm({ name: "", strength: "", frequency: "" });
        setSelectedProduct(null);
        setSelectedDosage(null);
        setShippingAddress({
          addressLine1: "",
          addressLine2: "",
          city: "",
          state: "",
          zipCode: "",
        });
        setDiscountCode("");
        setSelectedPaymentMethod(null);
        setCardDetails({
          cardNumber: "",
          expirationDate: "",
          securityCode: "",
        });
      }
    } else if (!questionId && currentId !== getFirstQuestion().id) {
      // If no questionId in URL but we have a currentId, reset to first question
      setCurrentId(getFirstQuestion().id);
    }
  }, [questionId]); // Only depend on questionId - React Router will update this when URL changes

  // Use questionId from URL params when available, fallback to currentId state
  // questionId from useParams() updates immediately when URL changes
  const activeQuestionId = questionId || currentId;
  const currentQuestion = findQuestionById(activeQuestionId);

  const handleSelect = (optionLabel: string, next: string, requiresTextInput?: boolean, textInputConfig?: any) => {
    setAnswers((prev) => ({ ...prev, [activeQuestionId]: optionLabel }));
    
    if (requiresTextInput && textInputConfig) {
      // Show text input for this option
      setSelectedOption({ questionId: activeQuestionId, optionLabel, next, textInputConfig });
    } else {
      navigateToNext(next);
    }
  };

  const handleTextInputSubmit = (textValue: string) => {
    if (selectedOption) {
      // Save both the option and the text input
      setAnswers((prev) => ({
        ...prev,
        [selectedOption.questionId]: {
          option: selectedOption.optionLabel,
          textInput: textValue,
        },
      }));
      navigateToNext(selectedOption.next);
      setSelectedOption(null);
    }
  };

  const handleDirectInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion) return;

    // Validate phone-zip form
    if (currentQuestion.type === "phone-zip") {
      if (!phone || !zip) return;
      setAnswers((prev) => ({
        ...prev,
        [activeQuestionId]: {
          option: "phone-zip",
          phone,
          zip,
        },
      }));
      navigateToNext(currentQuestion.next || "");
      return;
    }

    // For medication list
    if (currentQuestion.type === "medication-list") {
      setAnswers((prev) => ({
        ...prev,
        [activeQuestionId]: medications,
      }));
      navigateToNext(currentQuestion.next || "");
      return;
    }

    // For other input types
    if (!inputValue && currentQuestion.type !== "date") return;
    
    setAnswers((prev) => ({ ...prev, [activeQuestionId]: inputValue }));
    navigateToNext(currentQuestion.next || "");
  };

  const handleAddMedication = () => {
    if (medicationForm.name && medicationForm.strength && medicationForm.frequency) {
      setMedications((prev) => [...prev, { ...medicationForm }]);
      setMedicationForm({ name: "", strength: "", frequency: "" });
      setIsMedicationModalOpen(false);
    }
  };

  const formatMedicationsDisplay = () => {
    if (medications.length === 0) return "";
    return medications.map((med) => `${med.name} · ${med.strength} · ${med.frequency}`).join(", ");
  };

  const navigateToNext = (next: string) => {
    if (next.startsWith("/")) {
      navigate(next);
    } else if (next) {
      // Update history with current active question ID BEFORE navigating
      const currentActiveId = questionId || currentId;
      if (currentActiveId && currentActiveId !== next) {
        setHistory((prev) => {
          // Avoid duplicates in history - check if last item is different
          const lastItem = prev[prev.length - 1];
          if (lastItem !== currentActiveId) {
            return [...prev, currentActiveId];
          }
          return prev;
        });
      }
      // Navigate - React Router will update questionId param, triggering useEffect
      navigate(`/questions/${next}`, { replace: false });
    }
  };

  const handleBack = () => {
    if (selectedOption) {
      // Cancel text input, go back to question
      setSelectedOption(null);
      return;
    }
    
    // Use browser history as fallback if our history is empty
    if (history.length > 0) {
      const prevHistory = [...history];
      const prevId = prevHistory.pop();
      setHistory(prevHistory);
      if (prevId) {
        navigate(`/questions/${prevId}`);
      } else {
        navigate("/");
      }
    } else {
      // If no history, try browser back, otherwise go home
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  };

  // Render testimonial page
  if (currentQuestion?.specialComponent === "testimonial") {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white relative">
      <div
        className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
        onClick={handleBack}
      >
        <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
      </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <div className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6" style={{ maxWidth: 700 }}>
            {currentQuestion.text}
          </h1>
          <div className="rounded-2xl shadow-xl p-8 w-full max-w-2xl mx-auto mb-6 bg-white">
            <h2 className="text-lg font-semibold mb-2 text-center">
              100% online treatments that are proven to work
            </h2>
            <div className="rounded-xl bg-gray-50 p-4 my-4 flex flex-col items-center">
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">&#9733;</span>
                ))}
              </div>
              <div className="text-xs text-gray-500 text-center mb-2">Trusted by thousands of patients</div>
              <div className="italic text-gray-700 text-center mb-2">
                "RxBloom has been great. I started noticing results right away, and it gave me a real boost of confidence. For anyone hesitant to try ED meds — they work!"
              </div>
              <div className="text-xs text-gray-400 text-right w-full">&mdash; Charlie, USA</div>
            </div>
            <div className="text-gray-600 text-sm text-center">
              Continue to take the next step toward better performance.
            </div>
          </div>
          <button
            className="w-full max-w-md mx-auto p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center mt-16"
            onClick={() => navigateToNext(currentQuestion.next || "")}
          >
            Next <span className="ml-2">&#8250;</span>
          </button>
        </div>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render conditional text input after option selection
  if (selectedOption && selectedOption.textInputConfig) {
    const isTextarea = selectedOption.textInputConfig.type === "textarea";
    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
      <div className="mt-12 flex flex-col items-center">
        <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleTextInputSubmit(inputValue);
          }}
          className="flex flex-col items-center flex-1 justify-center w-full"
        >
          <h1 className="text-4xl font-bold text-center mb-8" style={{ maxWidth: 600 }}>
            {selectedOption.textInputConfig.label || "Please provide details"}
          </h1>
          <div className="w-full max-w-3xl mb-8">
            {isTextarea ? (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={selectedOption.textInputConfig.placeholder}
                rows={6}
                className="w-full border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black resize-none"
                required
              />
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={selectedOption.textInputConfig.placeholder}
                className="w-full border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black"
                required
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
            disabled={!inputValue}
          >
            Next
          </button>
        </form>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h1 className="text-2xl font-bold">Question not found</h1>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600">Go Home</button>
      </div>
    );
  }

  // Render radio question
  if (currentQuestion.type === "radio" && currentQuestion.options) {
    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <div className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ maxWidth: 700 }}>
            {currentQuestion.text}
          </h1>
          <div className="flex flex-col space-y-4 w-full max-w-xl">
            {currentQuestion.options.map((option) => (
              <label
                key={option.label}
                className="cursor-pointer bg-white border border-gray-200 rounded-xl p-6 flex items-center text-lg hover:border-black transition"
                style={{ fontWeight: 500 }}
              >
                <input
                  type="radio"
                  name={activeQuestionId}
                  className="mr-4 accent-black"
                  onChange={() => handleSelect(option.label, option.next, option.requiresTextInput, option.textInputConfig)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render date input
  if (currentQuestion.type === "date") {
    const handleIconClick = () => {
      if (dateInputRef.current) {
        dateInputRef.current.showPicker
          ? dateInputRef.current.showPicker()
          : dateInputRef.current.focus();
      }
    };

    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form onSubmit={handleDirectInputSubmit} className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ maxWidth: 600 }}>
            {currentQuestion.text}
          </h1>
          <div className="relative w-full max-w-2xl mb-12">
            <input
              ref={dateInputRef}
              type="date"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="block w-full border border-gray-200 rounded-xl p-6 pr-14 text-lg outline-none bg-white focus:border-black"
              style={{ fontWeight: 500 }}
              required
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={handleIconClick}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 cursor-pointer"
              aria-label="Open calendar"
              style={{ background: "none", border: "none", outline: "none" }}
            >
              <CalendarIcon />
            </button>
          </div>
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
            disabled={!inputValue}
          >
            Next
          </button>
        </form>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render phone-zip form
  if (currentQuestion.type === "phone-zip") {
    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form onSubmit={handleDirectInputSubmit} className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-4xl font-bold text-left mb-2 w-full max-w-2xl">{currentQuestion.text}</h1>
          <div className="text-gray-600 text-left text-base w-full max-w-2xl mb-10">
            Please enter your mobile number and zip code.
          </div>
          <div className="w-full max-w-2xl flex flex-col gap-4 mb-3">
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black w-full"
              required
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black w-full"
              required
            />
          </div>
          <div className="w-full max-w-2xl mb-10 text-gray-600 text-sm leading-relaxed">
            By entering your phone number and checking the above box, you consent to RxBloom calling
            or sending text messages to you for the purpose of verifying your phone number, ensuring
            patient safety, and for any other lawful purposes related to your RxBloom account in use of
            our services. This includes cart/browser reminders, marketing promotions, order
            confirmations, shipment notifications, and messages from your provider. You must be 18 or
            older to opt in. Message and data rates may apply. Message frequency varies. Reply HELP for
            assistance or STOP to opt out.
          </div>
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
            disabled={!phone || !zip}
          >
            Next
          </button>
        </form>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render medication list
  if (currentQuestion.type === "medication-list") {
    const medicationsDisplay = formatMedicationsDisplay();
    
    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form onSubmit={handleDirectInputSubmit} className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ maxWidth: 700 }}>
            {currentQuestion.text}
          </h1>
          <div className="w-full max-w-3xl mb-8">
            <div className="relative">
              <input
                type="text"
                value={medicationsDisplay}
                readOnly
                placeholder="Generic name · Dose · Frequency"
                className="w-full border border-gray-200 rounded-xl p-6 pr-14 text-lg outline-none bg-white focus:border-black"
                style={{ cursor: "text" }}
              />
              <button
                type="button"
                onClick={() => setIsMedicationModalOpen(true)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-black text-2xl font-light hover:bg-gray-100 rounded transition"
                style={{ background: "none", border: "none", outline: "none" }}
              >
                +
              </button>
            </div>
            {medications.length > 0 && (
              <button
                type="button"
                onClick={() => setIsMedicationModalOpen(true)}
                className="mt-4 text-black text-lg font-medium hover:underline self-start"
              >
                Add more
              </button>
            )}
          </div>
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
          >
            Next
          </button>
        </form>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>

        {/* Medication Modal */}
        <Dialog open={isMedicationModalOpen} onOpenChange={setIsMedicationModalOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Medication</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={medicationForm.name}
                  onChange={(e) => setMedicationForm((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter medication name"
                  className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Strength</label>
                <input
                  type="text"
                  value={medicationForm.strength}
                  onChange={(e) => setMedicationForm((prev) => ({ ...prev, strength: e.target.value }))}
                  placeholder="Enter strength/dose"
                  className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Frequency</label>
                <input
                  type="text"
                  value={medicationForm.frequency}
                  onChange={(e) => setMedicationForm((prev) => ({ ...prev, frequency: e.target.value }))}
                  placeholder="Enter frequency (e.g., Once daily)"
                  className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsMedicationModalOpen(false);
                  setMedicationForm({ name: "", strength: "", frequency: "" });
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddMedication}
                disabled={!medicationForm.name || !medicationForm.strength || !medicationForm.frequency}
                className="bg-black text-white hover:bg-black/90"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Render product selection
  if (currentQuestion.type === "product-selection") {
    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <div className="flex flex-col items-center flex-1 justify-center w-full max-w-4xl px-6">
          <h1 className="text-4xl font-bold text-center mb-12" style={{ maxWidth: 700 }}>
            {currentQuestion.text}
          </h1>
          <div className="w-full space-y-4 mb-8">
            {extendedProducts.map((product) => (
              <div
                key={product.id}
                className={`bg-white border-2 rounded-xl p-6 relative transition-all ${
                  selectedProduct === product.id
                    ? "border-black shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Price in top right */}
                <div className="absolute top-6 right-6 text-sm font-medium text-gray-700">
                  From {productPrices[product.id] || "$2.00"}/use
                </div>
                
                {/* Content Layout */}
                <div className="flex items-start gap-6 pr-24">
                  {/* Left side - Text content */}
                  <div className="flex-1">
                    {/* Title and Ingredient */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{product.ingredient}</p>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                    
                    {/* Works In / Lasts Up To */}
                    <div className="flex gap-4 mb-6">
                      <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                        <span className="text-xs text-gray-500 uppercase block mb-1">WORKS IN</span>
                        <span className="text-sm font-medium text-gray-800">{product.worksIn}</span>
                      </div>
                      <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1.5">
                        <span className="text-xs text-gray-500 uppercase block mb-1">LASTS UP TO</span>
                        <span className="text-sm font-medium text-gray-800">{product.lastsUpTo}</span>
                      </div>
                    </div>
                    
                {/* SELECT Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (currentQuestion) {
                      setAnswers((prev) => ({
                        ...prev,
                        [activeQuestionId]: product.id,
                      }));
                      navigateToNext(currentQuestion.next || "");
                    }
                  }}
                  className="w-full py-3 rounded-full font-semibold transition bg-black text-white hover:bg-gray-800"
                >
                  SELECT
                </button>
                  </div>
                  
                  {/* Right side - Pill Image positioned in middle */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 w-20 h-20 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-md"
                      style={{ transform: "rotate(-5deg)" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render dosage selection
  if (currentQuestion.type === "dosage-selection") {
    // Get the selected product from answers
    const productId = answers["q26"] as string;
    const product = extendedProducts.find((p) => p.id === productId);
    const dosages = product ? dosageOptions[productId] || [] : [];

    if (!product || dosages.length === 0) {
      // Fallback if product not found
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <button onClick={() => navigate("/questions/q26")} className="mt-4 text-blue-600">
            Go Back
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <div className="flex flex-col items-center flex-1 justify-center w-full max-w-4xl px-6">
          {/* Header with pill icon and product name */}
          <div className="w-full mb-8">
            <div className="flex items-center gap-4 mb-2">
              {/* Pill Icon */}
              <div className="w-12 h-12 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-md"
                  style={{ transform: "rotate(-5deg)" }}
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
                <p className="text-base text-gray-700 mt-1">{product.ingredient}</p>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <h1 className="text-4xl font-bold text-center mb-12" style={{ maxWidth: 700 }}>
            {currentQuestion.text}
          </h1>

          {/* Dosage Options */}
          <div className="w-full space-y-4 mb-8">
            {dosages.map((dosage, index) => (
              <div
                key={index}
                className={`bg-gray-100 border-2 rounded-xl p-6 cursor-pointer transition-all ${
                  selectedDosage === dosage.strength
                    ? "border-black shadow-lg bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => setSelectedDosage(dosage.strength)}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{dosage.strength}</span>
                      <span className="text-sm text-gray-500">{dosage.label}</span>
                    </div>
                    <p className="text-sm text-gray-500">{dosage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={() => {
              if (selectedDosage && currentQuestion) {
                setAnswers((prev) => ({
                  ...prev,
                  [activeQuestionId]: { product: productId, dosage: selectedDosage },
                }));
                navigateToNext(currentQuestion.next || "");
              }
            }}
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!selectedDosage}
          >
            Next
          </button>
        </div>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render shipping address form
  if (currentQuestion.type === "shipping-address") {
    const usStates = [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
      "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
      "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
      "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
      "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (currentQuestion) {
              setAnswers((prev) => ({
                ...prev,
                [activeQuestionId]: shippingAddress,
              }));
              navigateToNext(currentQuestion.next || "");
            }
          }}
          className="flex flex-col items-center flex-1 justify-center w-full max-w-2xl px-6"
        >
          <h1 className="text-4xl font-bold text-left mb-8 w-full">
            {currentQuestion.text}
          </h1>
          
          <div className="w-full space-y-4 mb-8">
            {/* Shipping Address Header */}
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            
            {/* Address Line 1 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address line 1</label>
              <input
                type="text"
                value={shippingAddress.addressLine1}
                onChange={(e) => setShippingAddress((prev) => ({ ...prev, addressLine1: e.target.value }))}
                placeholder="Enter address line 1"
                className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                required
              />
            </div>
            
            {/* Address Line 2 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 2</label>
              <input
                type="text"
                value={shippingAddress.addressLine2}
                onChange={(e) => setShippingAddress((prev) => ({ ...prev, addressLine2: e.target.value }))}
                placeholder="Enter address line 2 (optional)"
                className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
              />
            </div>
            
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) => setShippingAddress((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="Enter city"
                className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                required
              />
            </div>
            
            {/* State and Zip Code in a row */}
            <div className="grid grid-cols-2 gap-4">
              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  value={shippingAddress.state}
                  onChange={(e) => setShippingAddress((prev) => ({ ...prev, state: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black appearance-none cursor-pointer"
                  required
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    paddingRight: "2.5rem",
                  }}
                >
                  <option value="">Select state</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Zip Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <input
                  type="text"
                  value={shippingAddress.zipCode}
                  onChange={(e) => setShippingAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                  placeholder="Enter zip code"
                  className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Continue Button */}
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
            disabled={!shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode}
          >
            Continue
          </button>
        </form>
        <div className="mb-10 mt-auto flex justify-center w-full">
          <img src={logo} alt="Logo" style={{ height: 25 }} />
        </div>
      </div>
    );
  }

  // Render checkout/payment page
  if (currentQuestion.type === "checkout") {
    // Get selected product and dosage from answers
    const dosageAnswer = answers["dosage-selection"] as { product: string; dosage: string } | undefined;
    const productId = dosageAnswer?.product || "";
    const dosage = dosageAnswer?.dosage || "";
    const product = extendedProducts.find((p) => p.id === productId);
    
    // Product pricing based on selection
    const productPrices: { [key: string]: { [key: string]: { price: number; tablets: number; perTablet: string } } } = {
      viagra: {
        "50mg": { price: 120, tablets: 30, perTablet: "$4.00" },
        "100mg": { price: 150, tablets: 30, perTablet: "$5.00" },
      },
      cialis: {
        "10mg": { price: 120, tablets: 30, perTablet: "$4.00" },
        "20mg": { price: 150, tablets: 30, perTablet: "$5.00" },
      },
      "daily-cialis": {
        "2.5mg": { price: 120, tablets: 90, perTablet: "$1.33" },
        "5mg": { price: 150, tablets: 90, perTablet: "$1.67" },
      },
    };
    
    const productInfo = productId && dosage ? productPrices[productId]?.[dosage] : null;
    const displayPrice = productInfo?.price || 150;
    const displayTablets = productInfo?.tablets || 90;
    const displayPerTablet = productInfo?.perTablet || "$1.67";
    const productName = product?.name || "Generic Cialis® Daily";
    const productIngredient = product?.ingredient || "Tadalafil";
    
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto pb-24">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentQuestion.text}</h1>
              <p className="text-lg text-gray-600">
                Add your payment details and we'll connect you with one of our trusted providers.
              </p>
            </div>

            {/* Plan Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Plan</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{productName}</h3>
                    <p className="text-sm text-gray-500 mb-1">{productIngredient}</p>
                    <p className="text-sm text-gray-700">
                      {displayTablets} Tablets ({displayPerTablet}/tablet)
                    </p>
                    <div className="mt-2">
                      <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                        3 month supply (billed ${displayPrice - 30} every 3 months)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">${displayPrice}.00</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Provider consultation</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">$25</span>
                        <span className="text-sm font-medium text-green-600">Free</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Express discreet shipping</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400 line-through">$15</span>
                        <span className="text-sm font-medium text-green-600">Free</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-700">Due if prescribed</span>
                    <span className="text-sm font-semibold text-gray-900">${displayPrice}.00/qtr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-gray-900">Due Today</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-semibold text-gray-900">$0</span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Discounts Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Discounts</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                />
                <button
                  type="button"
                  className={`px-6 py-4 rounded-xl font-semibold transition ${
                    discountCode
                      ? "bg-black text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!discountCode}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Payment Methods Section */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
              
              {/* Card Option */}
              <div className="mb-4">
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPaymentMethod === "card"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("card")}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">Card</h3>
                      <p className="text-sm text-gray-600">Secure, fast checkout with Link</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card number</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails((prev) => ({ ...prev, cardNumber: e.target.value }))}
                            placeholder="1234 1234 1234 1234"
                            className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black pr-12"
                          />
                          <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <span className="text-xs font-semibold text-gray-400">Discover</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiration date</label>
                          <input
                            type="text"
                            value={cardDetails.expirationDate}
                            onChange={(e) => setCardDetails((prev) => ({ ...prev, expirationDate: e.target.value }))}
                            placeholder="MM/YY"
                            className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Security code</label>
                          <div className="relative">
                            <input
                              type="text"
                              value={cardDetails.securityCode}
                              onChange={(e) => setCardDetails((prev) => ({ ...prev, securityCode: e.target.value }))}
                              placeholder="CVC"
                              className="w-full border border-gray-200 rounded-xl p-4 text-lg outline-none bg-white focus:border-black pr-12"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Option */}
              <div className="mb-4">
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPaymentMethod === "bank"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("bank")}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Bank</h3>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                      $5 back
                    </span>
                  </div>
                </div>
              </div>

              {/* Amazon Pay Option */}
              <div>
                <div
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    selectedPaymentMethod === "amazon"
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("amazon")}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Amazon Pay</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Terms */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                By making a purchase, you accept a self-pay arrangement. Your subscription will automatically renew and your credit card will be charged the subscription fee. You can cancel or modify your plan at any time in your patient portal.
              </p>
            </div>
          </div>
        </div>

        {/* Footer with Total and Next Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-6">
            <div>
              <span className="text-lg font-semibold">Total ($0)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                if (currentQuestion && selectedPaymentMethod) {
                  setAnswers((prev) => ({
                    ...prev,
                    [activeQuestionId]: {
                      product: productId,
                      dosage: dosage,
                      paymentMethod: selectedPaymentMethod,
                      cardDetails: selectedPaymentMethod === "card" ? cardDetails : null,
                    },
                  }));
                  navigateToNext(currentQuestion.next || "");
                }
              }}
              className="px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-100 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              disabled={!selectedPaymentMethod}
            >
              Next &gt;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render text or textarea input
  if (currentQuestion.type === "text" || currentQuestion.type === "textarea") {
    const isTextarea = currentQuestion.type === "textarea";
    const inputConfig = currentQuestion.inputConfig;

    return (
      <div className="min-h-screen flex flex-col items-center bg-white relative">
        <div
          className="absolute left-8 top-8 flex items-center cursor-pointer select-none text-gray-700 text-sm z-10"
          onClick={handleBack}
        >
          <span style={{ fontSize: "18px", marginRight: "4px" }}>&#8592;</span> Back
        </div>
        <div className="mt-12 flex flex-col items-center">
          <img src={logo} alt="Logo" style={{ height: 32, marginBottom: 16 }} />
        </div>
        <form onSubmit={handleDirectInputSubmit} className="flex flex-col items-center flex-1 justify-center w-full">
          <h1 className="text-4xl font-bold text-center mb-8" style={{ maxWidth: 600 }}>
            {currentQuestion.text}
          </h1>
          {inputConfig?.type === "text" && currentQuestion.text.includes("blood pressure") && (
            <p className="text-lg font-normal mb-4 text-gray-600">Example: 115/72</p>
          )}
          <div className="w-full max-w-3xl mb-8">
            {isTextarea ? (
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputConfig?.placeholder || "Leave a Description"}
                rows={6}
                className="w-full border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black resize-none"
                required
              />
            ) : (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputConfig?.placeholder || "Enter value"}
                className="w-full border border-gray-200 rounded-xl p-6 text-lg outline-none bg-white focus:border-black"
                required
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full max-w-md p-4 bg-black text-white rounded-full font-bold text-lg flex items-center justify-center"
            disabled={!inputValue}
          >
            Next
          </button>
        </form>
      <div className="mb-10 mt-auto flex justify-center w-full">
        <img src={logo} alt="Logo" style={{ height: 25 }} />
      </div>
    </div>
  );
  }

  return null;
};

export default QuestionnairePage;
