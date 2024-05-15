import React, { useEffect, useState } from "react";
import MaulundLogo from "../assets/maulund-logo.webp";
import { Link } from "react-router-dom";
import { useGlobalState } from "./GlobalStateProvider";
import { auth } from "../../firebaseConfig";
import trustpilot from "../assets/trustpilot.svg";
import emark from "../assets/emark.png";
import CountdownTimer from "./CountdownTimer";

const Header = () => {
  const { globalState, setGlobalState } = useGlobalState();

  // Sætter antallet af produkter i kurven
  useEffect(() => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerOrder"));

    if (basketFromStorage) {
      let totalAmountFromBasket = 0;
      basketFromStorage.products.forEach(
        (subData) => (totalAmountFromBasket += subData.amount)
      );
      setGlobalState(totalAmountFromBasket);
    }
  }, []);

  return (
    <>
      <header className="flex justify-between items-center content mt-8">
        <Link to={"/"}>
          <img src={MaulundLogo} alt="logo" className="w-40" />
        </Link>
        <div className="flex gap-3">
          <Link to={"/profile"}>
            {auth.currentUser ? (
              <i className="fa-solid fa-user-lock text-2xl px-3 text-primaryGrey"></i>
            ) : (
              <i className="fa-solid fa-user text-2xl px-3 text-primaryGrey"></i>
            )}
          </Link>

          <Link to={"/cart"} className="relative">
            <i className="fa-solid fa-cart-shopping text-2xl px-3 text-primaryGrey"></i>
            {globalState !== 0 && (
              <div className="absolute -top-2 right-0 bg-white border-[2.5px] border-primaryGrey text-primaryGrey font-semibold h-[22px] w-[22px] flex justify-center items-center rounded-full">
                <p className="text-sm text-center font-bold">{globalState}</p>
              </div>
            )}
          </Link>
        </div>
      </header>
      <div className="bg-stone-100 px-5 mt-3 p-2 flex justify-between items-center flex-wrap breakout">
        <div className="flex gap-1">
          <img src={trustpilot} alt="trustpilot reviews" className="w-20" />
          <p className="font-medium text-sm">Trustpilot</p>
        </div>
        <div className="flex-col items-center gap-1 hidden md:flex">
          <p className="font-medium mt-2 text-sm text-center">
            Bestil inden kl. 17:00, så sender vi din ordre i dag
          </p>
          <div>
            <CountdownTimer />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <img src={emark} alt="Emærket" className="w-6" />
          <p className="font-medium text-sm md:block">E-mærket</p>
        </div>
        <div className="flex flex-col items-center m-auto gap-1 md:hidden">
          <p className="font-medium mt-2 text-sm text-center">
            Bestil inden kl. 17:00, så sender vi din ordre i dag
          </p>
          <div>
            <CountdownTimer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
