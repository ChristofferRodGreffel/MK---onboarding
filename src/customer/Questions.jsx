import React from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { Link } from "react-router-dom";

const Questions = () => {
  return (
    <PageWrapper>
      <Header />
      <div className="mt-8">
        <BackButtonWithArrow linkText="Tilbage til profil" linkTo="/profile" />
      </div>
      <div>
        <h1 className="font-bold text-2xl">Hvordan virker point?</h1>
        <p className="mt-2">
          Hos Maulund A/S kan du optjene point når du handler. Sådan virker
          systemet.
        </p>
        <div className="flex flex-col gap-3 mt-3">
          <div>
            <p className="font-bold mb-2">1. Optjen ved køb</p>
            <p className="mb-2">
              For hver krone du køber for i shoppen indsættes 0,1 point på din
              pointkonto. Køber du f.eks. for 100 kr. vil 10 point blive indsat
              på din pointkonto.
            </p>
            <Link to={"/profile"}>
              <button className="bg-primaryGrey text-white py-1.5 px-8 rounded-md">
                Se dine point
              </button>
            </Link>
          </div>
          <div>
            <p className="font-bold mb-2">2. Anvend ved køb</p>
            <p>
              Når du handler har du mulighed for at anvende dine point ved
              checkout. Så kan du spare penge på din ordre.
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">
              3. Donér dine point{" "}
              <i className="fa-solid fa-heart text-customRed"></i>
            </p>
            <p className="mb-2">
              Du har også mulighed for at donere dine point til en af vores
              samarbejds organisationer.
            </p>
            <Link to={"/donate"}>
              <button className="bg-primaryGrey text-white py-1.5 px-8 rounded-md">
                Donér dine point
              </button>
            </Link>
          </div>
        </div>
        <div className="mt-10" id="levels">
          <h2 className="font-bold text-2xl">Hvad er klub niveauer?</h2>
          <p className="mt-2">
            Når du bruger penge optjener du medlemspoint som bestemmer dit
            niveau i kundeklubben. Jo flere penge du bruger, desto højere niveau
            opnår du. <br />
            Dine point er mere værd når dit niveau er højt. Du starter som
            bronze kunde og kan arbejde dig op til guld, som er det højeste
            niveau.
            <br />
            Se oversigten herunder for det fulde overblik.
          </p>
          <div className="flex flex-col gap-5 mt-3">
            <div>
              <p className="font-bold mb-1">Bronze kunde</p>
              <p className="mb-2">
                Du starter som bronze kunde og hvert point er 0,25 kr. værd. Du
                er bronze kunde indtil du har optjent 2000 medlemspoint
              </p>
              <div className="flex flex-col justify-center items-center bg-bronze h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">BRONZE</p>
                <p>1 point = 0,25 kr.</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">Sølv kunde</p>
              <p className="mb-2">
                Som sølv kunde stiger værdien af dine point fra 0,25 kr. til
                0,30 kr. Næste trin er guld og kan opnås med 5000 medlemspoint.
              </p>
              <div className="flex flex-col justify-center items-center bg-silver h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">SØLV</p>
                <p>1 point = 0,30 kr.</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">Guld kunde</p>
              <p className="mb-2">
                Som guld kunde for du mest ud af dine point. Her er hvert point
                0,35 kr. værd og derved sparer du flest penge som guld kunde.
              </p>
              <div className="flex flex-col justify-center items-center bg-gold h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">GULD</p>
                <p>1 point = 0,35 kr.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Questions;
