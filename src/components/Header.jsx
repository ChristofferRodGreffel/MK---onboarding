import React, { useEffect, useState } from "react";
import MaulundLogo from "../assets/maulund-logo.webp";
import { Link } from "react-router-dom";

const Header = () => {
  const [amountFromBasket, setAmountFromBasket] = useState(0);

  // Sætter antallet af produkter i kurven
  useEffect(() => {
    const basketFromStorage = JSON.parse(localStorage.getItem("customerOrder"));

    if (basketFromStorage) {
      let totalAmountFromBasket = 0;
      basketFromStorage.products.forEach((subData) => (totalAmountFromBasket += subData.amount));
      setAmountFromBasket(totalAmountFromBasket);
    }
  }, []);

  return (
    <header className="flex justify-between items-center content mt-8">
      <Link to={"/"}>
        <img src={MaulundLogo} alt="logo" className="w-40" />
      </Link>
      <div className="flex gap-3">
        <Link to={"/profile"}>
          <i className="fa-solid fa-user text-2xl px-3 text-primaryGrey"></i>
        </Link>
        <Link to={"/cart"} className="relative">
          <i className="fa-solid fa-cart-shopping text-2xl px-3 text-primaryGrey"></i>
          {amountFromBasket !== 0 && (
            <div className="absolute -top-2 right-0 bg-primaryGrey border-[2.5px] border-white text-white font-semibold w-6 h-6 flex justify-center items-center rounded-full animate-slowZoom">
              <p className="text-sm text-center">{amountFromBasket}</p>
            </div>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
