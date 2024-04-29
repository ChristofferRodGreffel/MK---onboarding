import React from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { Link } from "react-router-dom";
import { useGlobalState } from "../components/GlobalStateProvider";
import { formatter } from "../helperfunctions/Formatter";

const Questions = () => {
  const { adminValues } = useGlobalState();

  return (
    <PageWrapper>
      <Header />
      <div className="mt-8">
        <BackButtonWithArrow linkText="Tilbage til profil" linkTo="/profile" />
      </div>
      <div>
        <h1 className="font-bold text-2xl">Hvordan virker point?</h1>
        <p className="mt-2 md:w-1/2">
          Hos Maulund A/S kan du optjene point når du handler. Sådan virker
          systemet.
        </p>
        <div className="flex flex-col gap-3 mt-3 md:grid md:grid-cols-3 md:mt-5">
          <div>
            <p className="font-bold mb-2">1. Optjen ved køb</p>
            <p className="mb-2">
              For hver krone du køber for i shoppen indsættes{" "}
              {adminValues?.earnRate} point på din pointkonto. Køber du f.eks.
              for 100 kr. vil {100 * adminValues?.earnRate} point blive indsat
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
          <p className="mt-2 md:w-2/3">
            Når du bruger penge optjener du medlemspoint som bestemmer dit
            niveau i kundeklubben. Jo flere penge du bruger, desto højere niveau
            opnår du. <br />
            <br />
            Dine point er mere værd når dit niveau er højt. Du starter som
            bronze kunde og kan arbejde dig op til guld, som er det højeste
            niveau.
            <br />
            Se oversigten herunder for det fulde overblik.
          </p>
          <div className="flex flex-col gap-5 mt-3 md:grid md:grid-cols-3 md:mt-5">
            <div>
              <p className="font-bold mb-1">Bronze kunde</p>
              <p className="mb-2">
                Du starter som bronze kunde og hvert point er{" "}
                {formatter.format(adminValues?.exchangeRates?.bronze)}
                værd. Du er bronze kunde indtil du har optjent 2000 medlemspoint
              </p>
              <div className="flex flex-col justify-center items-center bg-bronze h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">BRONZE</p>
                <p>
                  1 point ={" "}
                  {formatter.format(adminValues?.exchangeRates?.bronze)}
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">Sølv kunde</p>
              <p className="mb-2">
                Som sølv kunde stiger værdien af dine point fra{" "}
                {formatter.format(adminValues?.exchangeRates?.bronze)} til{" "}
                {formatter.format(adminValues?.exchangeRates?.silver)}. Næste
                trin er guld og kan opnås med 5000 medlemspoint.
              </p>
              <div className="flex flex-col justify-center items-center bg-silver h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">SØLV</p>
                <p>
                  1 point ={" "}
                  {formatter.format(adminValues?.exchangeRates?.silver)}
                </p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-1">Guld kunde</p>
              <p className="mb-2">
                Som guld kunde for du mest ud af dine point. Her er hvert point{" "}
                {formatter.format(adminValues?.exchangeRates?.gold)} værd og
                derved sparer du flest penge som guld kunde.
              </p>
              <div className="flex flex-col justify-center items-center bg-gold h-36 w-36 rounded-full">
                <p className="font-bold text-xl leading-none">GULD</p>
                <p>
                  1 point = {formatter.format(adminValues?.exchangeRates?.gold)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Questions;
