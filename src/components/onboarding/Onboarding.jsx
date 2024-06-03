import React, { useEffect, useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import StepProgress from "./StepProgress";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import Step6 from "./steps/Step6";
import { auth, db } from "../../../firebaseConfig";
import {
  arrayUnion,
  doc,
  getDoc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { shootStars } from "../../helperfunctions/StarConfetti";

const Onboarding = ({ setShowOnboarding }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const localStep = JSON.parse(localStorage.getItem("onboarding"));

    if (localStep) {
      setCurrentStep(localStep);
    }
  }, []);

  const steps = [
    <Step1 />,
    <Step2 />,
    <Step3 />,
    <Step4 />,
    <Step5 />,
    <Step6 />,
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      if (currentStep > 0) {
        let oldLocalStep = JSON.parse(localStorage.getItem("onboarding"));
        let newLocalStep = oldLocalStep + 1;
        localStorage.setItem("onboarding", newLocalStep);
      } else {
        localStorage.setItem("onboarding", 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      let oldLocalStep = JSON.parse(localStorage.getItem("onboarding"));
      let newLocalStep = oldLocalStep - 1;
      localStorage.setItem("onboarding", newLocalStep);
    }
  };

  const completeOnboarding = async () => {
    setShowOnboarding(false);
    const currentUser = auth.currentUser.uid;
    if (currentUser) {
      const userRef = doc(db, "users", currentUser);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        console.error("User does not exist");
        setShowOnboarding(false);
        return;
      }

      const userData = userDoc.data();
      if (userData.onboarded) {
        console.warn("User has already completed onboarding");
        setShowOnboarding(false);
        return;
      }

      const historyObject = {
        date: new Date(),
        type: "onboarded",
        amount: 50,
      };

      await updateDoc(userRef, {
        history: arrayUnion(historyObject),
        onboarded: true,
        points: increment(50),
      }).then(() => {
        shootStars();
      });
    }
  };

  useEffect(() => {
    document.querySelector(".content-grid").style.display = "none";

    return () => {
      document.querySelector(".content-grid").style.display = "grid";
    };
  }, []);

  return (
    <div className="bg-white z-50 absolute top-0 flex justify-center md:items-center w-screen min-h-screen">
      <div className="w-[85%] md:w-2/3 lg:w-2/5 max-w-2xl animate-expandFromCenter">
        <div className="mt-14">
          <StepProgress currentStep={currentStep} />
        </div>
        <div className="mt-14">{steps[currentStep]}</div>
        <div className="flex justify-between gap-4 font-semibold mt-12">
          {currentStep !== 0 && (
            <button
              className="border-primaryGrey border-2 rounded-full py-2 px-5 flex items-center gap-1 md:hover:bg-primaryGrey md:hover:text-white transition-all duration-150 select-none"
              onClick={prevStep}
            >
              <i className="fa-solid fa-arrow-left text-lg"></i>
              <p>Tilbage</p>
            </button>
          )}

          <button
            className="bg-primaryGrey rounded-full py-2 w-full text-white flex items-center justify-center md:hover:bg-black transition-all duration-150 select-none"
            onClick={currentStep !== 5 ? nextStep : completeOnboarding}
          >
            {currentStep !== 5 ? (
              <div className="flex items-center gap-2">
                <p>Videre</p>
                <i className="fa-solid fa-arrow-right text-lg"></i>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <p>Få 50 gratis point</p>
                <i className="fa-solid fa-coins"></i>
              </div>
            )}
          </button>
        </div>
        <p
          onClick={() => setShowOnboarding(false)}
          className="underline mt-24 cursor-pointer w-fit"
        >
          Spring introduktion over
        </p>
      </div>
    </div>
  );
};

export default Onboarding;
