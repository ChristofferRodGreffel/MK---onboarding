import React from "react";

const StepProgress = ({ currentStep }) => {
  return (
    <div className="flex justify-between gap-3">
      <div className="w-12 md:w-14 h-[10px] md:h-[12px] rounded-full bg-primaryGrey"></div>
      <div
        className={`w-12 md:w-14 h-[10px] md:h-[12px] rounded-full ${
          currentStep > 0 ? "bg-primaryGrey" : "bg-lightGrey"
        }`}
      ></div>
      <div
        className={`w-12 md:w-14 h-[10px] md:h-[12px] rounded-full ${
          currentStep > 1 ? "bg-primaryGrey" : "bg-lightGrey"
        }`}
      ></div>
      <div
        className={`w-12 md:w-14 h-[10px] md:h-[12px] rounded-full ${
          currentStep > 2 ? "bg-primaryGrey" : "bg-lightGrey"
        }`}
      ></div>
      <div
        className={`w-12 md:w-14 h-[10px] md:h-[12px] rounded-full ${
          currentStep > 3 ? "bg-primaryGrey" : "bg-lightGrey"
        }`}
      ></div>
      <div
        className={`w-12 md:w-14 h-[10px] md:h-[12px] rounded-full ${
          currentStep > 4 ? "bg-primaryGrey" : "bg-lightGrey"
        }`}
      ></div>
    </div>
  );
};

export default StepProgress;
