import React, { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "./StepProgress";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [<Step1 />, <Step2 />, <Step3 />, <Step4 />, <Step5 />, <Step6 />];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bg-white z-10 absolute top-0 flex justify-center w-screen h-[100%]">
      <div className="w-[85%]">
        <div className="mt-14">
          <StepProgress currentStep={currentStep} />
        </div>
        <div className="mt-14">{steps[currentStep]}</div>
        <div className="flex justify-between gap-4 font-semibold mt-12">
          {currentStep !== 0 && (
            <button
              className="border-primaryGrey border-2 rounded-full py-2 px-5 flex items-center gap-1"
              onClick={prevStep}
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
              <p>Tilbage</p>
            </button>
          )}

          <button
            className="bg-primaryGrey rounded-full py-2 w-full text-white flex items-center justify-center"
            onClick={nextStep}
          >
            {currentStep !== 5 ? (
              <div className="flex items-center gap-2">
                <p>Videre</p>
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p>Afslut</p>
              </div>
            )}
          </button>
        </div>
        <p className="underline mt-24">Spring introduktion over</p>
      </div>
    </div>
  );
};

export default Onboarding;
