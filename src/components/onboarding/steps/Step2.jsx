import React from "react";
import StepContent from "../StepContent";
import InfoBox from "../InfoBox";
import { useGlobalState } from "../../GlobalStateProvider";

const Step2 = () => {
  const { adminValues } = useGlobalState();
  return (
    <div>
      <StepContent
        title="Sådan optjener du Maulund point"
        description="Når du handler i vores webshop, optjener du Maulund point for hver krone, du bruger. 
For hver 10 kr., du bruger, optjener du 1 Maulund point. Det betyder, at hvis du f.eks. bruger 100 kr., modtager du 10 Maulund point."
      />
      <InfoBox>
        <p>
          <b>1 kr.</b> = {adminValues?.earnRate} point
        </p>
        <p>
          <b>10 kr.</b> = {Number(adminValues?.earnRate) * 10} point
        </p>
      </InfoBox>
    </div>
  );
};

export default Step2;
