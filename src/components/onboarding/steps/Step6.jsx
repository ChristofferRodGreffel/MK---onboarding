import React from "react";
import StepContent from "../StepContent";

const Step6 = () => {
  return (
    <div>
      <StepContent
        title="Kom godt i gang!"
        description="Nu hvor du ved, hvordan kundeklubben fungerer, er det tid til at begynde at optjene point! Log ind på din konto og start din shoppingrejse med os i dag. Hvis du har spørgsmål, er vores kundeservice altid klar til at hjælpe."
      />
      <p className="mt-5">
        Vi håber, du nyder fordelene ved vores kundeklub og glæder os til at se
        dig stige i niveau!
      </p>
      <p className="mt-5 font-semibold">
        Som tak for dit medlemskab, indsætter vi 50 maulund point på din konto,
        når du afslutter denne introduktion!
      </p>
    </div>
  );
};

export default Step6;
