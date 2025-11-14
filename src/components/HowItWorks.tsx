import { Button } from "@/components/ui/button";
import howItWorksImg from "@/assets/rxbloom_howitworks_image.png"; // you'll add your image here
import { useNavigate } from "react-router-dom";

export const HowItWorks = () => {
  const navigate = useNavigate(); 
  const steps = [
    {
      number: "1",
      title: "Complete a Quick, Easy Online Form",
      description: "Simply answer a few questions about yourself",
    },
    {
      number: "2",
      title: "Get Prescribed",
      description: "Connect with a provider for a free consultation",
    },
    {
      number: "3",
      title: "Receive Treatment, Regain Confidence",
      description:
        "Get your ED medication discreetly shipped to your door",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
          How it Works
        </h2>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left: Image */}
          <div className="flex justify-center">
            <img
              src={howItWorksImg}
              alt="How it Works"
              className="rounded-2xl w-full max-w-md object-contain"
            />
          </div>

          {/* Right: Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6">
                {/* Number circle */}
                <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
                  {step.number}
                </div>

                {/* Text content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}

            {/* Button */}
            <Button className="bg-gray-900 text-white px-8 py-3 rounded-full text-base mt-6 hover:bg-gray-800 transition"
            onClick={() => navigate("/questions")}
            >
              Find My Treatment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
