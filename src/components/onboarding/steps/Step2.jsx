import React from "react";
import StepContent from "../StepContent";
import InfoBox from "../InfoBox";

const Step2 = () => {
  return (
    <div>
      <StepContent
        title="Sådan optjener du point"
        description="Når du handler i vores webshop, optjener du point for hver krone, du bruger. 
For hver 10 kr., du bruger, optjener du 1 point. Det betyder, at hvis du f.eks. bruger 100 kr., får du 10 point."
      />
      <InfoBox>
        <p>
          <b>1 kr.</b> = 0,1 point
        </p>
        <p>
          <b>10 kr.</b> = 1 point
        </p>
      </InfoBox>
    </div>
  );
};

export default Step2;
