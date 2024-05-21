import React from "react";
import { PulseLoader } from "react-spinners";
import checkmark from "../assets/checkmark.gif";

const LoadingScreen = ({ status }) => {
  return (
    <>
      {status === "adding" && (
        <>
          <div className="fixed flex flex-col gap-5 items-center justify-center bg-white bg-opacity-80 top-0 left-0 h-screen w-screen text-2xl font-bold text-center text-primaryGrey overscroll-none">
            <p>Tilføjer produkt</p>
            <PulseLoader color="#343434" />
          </div>
        </>
      )}
      {status === "completed" && (
        <>
          <div className="fixed flex flex-col items-center justify-center bg-white bg-opacity-80 top-0 left-0 h-screen w-screen text-2xl font-bold text-center text-primaryGrey overscroll-none">
            <p>Produkt tilføjet</p>
            <img src={checkmark} alt="checkmark" className="w-44" />
          </div>
        </>
      )}
      {status === "updating" && (
        <>
          <div className="fixed flex flex-col items-center justify-center bg-white bg-opacity-80 top-0 left-0 h-screen w-screen text-2xl font-bold text-center text-primaryGrey overscroll-none">
            <p>Opdaterer produkt</p>
            <PulseLoader color="#343434" />
          </div>
        </>
      )}
      {status === "updated" && (
        <>
          <div className="fixed flex flex-col items-center justify-center bg-white bg-opacity-80 top-0 left-0 h-screen w-screen text-2xl font-bold text-center text-primaryGrey overscroll-none">
            <p>Produkt opdateret!</p>
            <img src={checkmark} alt="checkmark" className="w-44" />
          </div>
        </>
      )}
    </>
  );
};

export default LoadingScreen;
