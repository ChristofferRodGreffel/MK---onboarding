import React from "react";
import StepContent from "../StepContent";

const Step4 = () => {
  return (
    <div>
      <StepContent
        title="Kundeklub Niveauer"
        description="Vi har tre niveauer i kundeklubben: Bronze, Sølv og Guld. Når du tilmelder dig, starter du i Bronze, men jo mere du handler, jo hurtigere kan du stige i niveau og få mere værdi for dine point."
      />
      <p className="mt-5">
        <b>Bronze niveau:</b> Alle nye medlemmer starter her. Hver point er 0,25 kr. værd.
        <br />
        <br />
        <b>Sølv niveau:</b> Når du har samlet nok point, opgraderes du til Sølv, hvor hver point er 0,30 kr. værd.
        <br />
        <br />
        <b>Guld niveau:</b> Vores højeste niveau, hvor hver point er 0,35 kr. værd. Dette niveau er for vores mest
        loyale kunder.
      </p>
    </div>
  );
};

export default Step4;
