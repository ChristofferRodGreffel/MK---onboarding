import React from "react";
import StepContent from "../StepContent";
import InfoBox from "../InfoBox";
import { useGlobalState } from "../../GlobalStateProvider";
import { formatter } from "../../../helperfunctions/Formatter";

const Step3 = () => {
  const { adminValues } = useGlobalState();
  return (
    <div>
      <StepContent
        title="Hvad er dine point værd?"
        description="Dine point har en værdi, som du kan bruge til fremtidige køb. Pointenes værdi afhænger af dit medlemsniveau i kundeklubben."
      />
      <InfoBox>
        <p>
          <span className="text-bronze font-bold">Bronze</span>{" "}
          <i className="fa-solid fa-arrow-right text-sm text-primaryGrey"></i> 1 point ={" "}
          {formatter.format(adminValues.exchangeRates.bronze)}
        </p>
        <p>
          <span className="text-silver font-bold">Sølv</span>{" "}
          <i className="fa-solid fa-arrow-right text-sm text-primaryGrey"></i> 1 point ={" "}
          {formatter.format(adminValues.exchangeRates.silver)}
        </p>
        <p>
          <span className="text-gold font-bold">Guld</span>{" "}
          <i className="fa-solid fa-arrow-right text-sm text-primaryGrey"></i> 1 point ={" "}
          {formatter.format(adminValues.exchangeRates.gold)}
        </p>
      </InfoBox>
    </div>
  );
};

export default Step3;
