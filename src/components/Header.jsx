import React, { useEffect, useState } from "react";
import MaulundLogo from "../assets/maulund-logo.webp";
import { Link } from "react-router-dom";
import { useGlobalState } from "./GlobalStateProvider";
import { auth } from "../../firebaseConfig";

const Header = () => {
  const { globalState, setGlobalState, isAdmin } = useGlobalState();

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
      <header className="flex justify-between items-center content mt-10 md:mt-8">
        <Link to={"/"}>
          <img src={MaulundLogo} alt="logo" className="w-40 md:w-52" />
        </Link>
        <div className="flex gap-3">
          {auth.currentUser ? (
            isAdmin ? (
              <div className="flex gap-5">
                <Link to="/admin">
                  <div className="flex flex-col items-center">
                    <i className="fa-solid fa-sliders text-[1.35rem] px-3 text-primaryGrey"></i>
                    <p className="hidden md:block">Indstillinger</p>
                  </div>
                </Link>
                <Link to={"/profile"}>
                  <div className="flex flex-col items-center">
                    <i className="fa-solid fa-screwdriver-wrench text-[1.35rem] px-3 text-primaryGrey"></i>
                    <p className="hidden md:block">Produkter</p>
                  </div>
                </Link>
              </div>
            ) : (
              <Link to={"/profile"}>
                <div className="flex flex-col items-center">
                  <i className="fa-solid fa-user text-[1.35rem] px-3 text-primaryGrey"></i>
                  <p className="hidden md:block">Profil</p>
                </div>
              </Link>
            )
          ) : (
            <Link to={"/signin"}>
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-arrow-right-to-bracket px-3 text-[1.35rem] text-primaryGrey"></i>
                <p className="hidden md:block">Log ind</p>
              </div>
            </Link>
          )}

          {!isAdmin && (
            <Link to={"/cart"} className="relative">
              <div className="flex flex-col items-center">
                <i className="fa-solid fa-cart-shopping text-[1.35rem] px-3 text-primaryGrey"></i>
                <p className="hidden md:block">Kurv</p>
              </div>
              {globalState !== 0 && (
                <div className="absolute -top-3 right-0 bg-white border-[2.5px] border-primaryGrey text-primaryGrey font-semibold h-[22px] w-[22px] flex justify-center items-center rounded-full">
                  <p className="text-sm text-center font-bold">{globalState}</p>
                </div>
              )}
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
