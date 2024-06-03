import React from "react";
import StepContent from "../StepContent";

const Step5 = () => {
  return (
    <div>
      <StepContent
        title="Hvordan stiger du i niveau?"
        description="Når du køber varer i webshoppen optjener du medlemspoint sideløbende med dine Maulund point. Disse point har ikke værdi på samme måde som Maulund point. Du optjener medlemspoint svarende til 50% af ordreværdien. Køber du for eksempel for 200 kr., vil du modtage 100 medlemspoint."
      />
      <p className="mt-5">
        Jo flere medlemspoint du samler, jo hurtigere kan du stige i niveau og
        få mere ud af dine point. Hold øje med dine medlemspoint og dit niveau i
        din kontooversigt for at se, hvor tæt du er på næste niveau.
      </p>
    </div>
  );
};

export default Step5;
