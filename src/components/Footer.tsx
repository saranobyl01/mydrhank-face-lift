import { useState } from 'react';
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, X } from "lucide-react";
import legitScriptBadge from "@/assets/legit_script_certified.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always checked
    functionality: false,
    analytics: false,
    advertising: false,
    saleOfInfo: false
  });

  const handleCheckboxChange = (key) => {
    if (key === 'essential') return; // Essential can't be unchecked
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleConfirm = () => {
    // Here you would save the preferences
    console.log('Privacy preferences:', preferences);
    setShowPrivacyModal(false);
  };

  return (
    <>
      <footer className="bg-muted/50 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          {/* Bottom Section */}
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
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-primary transition-colors underline"
              >
                Your Privacy Choices
              </button>
            </div>
            
            {/* Copyright */}
            <p className="text-xs text-center">
              Copyright {currentYear} RxBloom All Rights Reserved
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-8 relative">
            {/* Close button */}
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-semibold text-center mb-6">
              What can we use data for?
            </h2>

            {/* GPC Notice */}
            <div className="flex items-start gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
              <p className="text-sm text-gray-600">
                Set automatically by your browser's Global Privacy Control signal.
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4 mb-8">
              {/* Essential Purposes - Always checked */}
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.essential}
                    disabled
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-gray-200 cursor-not-allowed"
                  />
                </div>
                <span className="text-gray-700">Essential purposes</span>
              </label>

              {/* Functionality */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.functionality}
                  onChange={() => handleCheckboxChange('functionality')}
                  className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                <span className="text-gray-700">Functionality</span>
              </label>

              {/* Analytics */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={() => handleCheckboxChange('analytics')}
                  className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                <span className="text-gray-700">Analytics</span>
              </label>

              {/* Advertising */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.advertising}
                  onChange={() => handleCheckboxChange('advertising')}
                  className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                <span className="text-gray-700">Advertising</span>
              </label>

              {/* Sale of personal information */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={preferences.saleOfInfo}
                  onChange={() => handleCheckboxChange('saleOfInfo')}
                  className="w-5 h-5 rounded border-2 border-gray-300 checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
                />
                <span className="text-gray-700">Sale of personal information</span>
              </label>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors mb-4"
            >
              Confirm
            </button>

            {/* Footer with Transcend Logo and Privacy Link */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">T</span>
                </div>
                <span className="text-gray-600 text-xs">Transcend</span>
              </div>
              <a href="/privacy" className="text-gray-600 hover:text-gray-800 text-xs">
                See our privacy policy
              </a>
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};