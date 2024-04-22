import React, { useEffect } from "react";
import MaulundLogo from "../assets/maulund-logo.webp";
import { Link } from "react-router-dom";
import { useGlobalState } from "./GlobalStateProvider";
import { auth } from "../../firebaseConfig";

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
  );
};

export default Header;
