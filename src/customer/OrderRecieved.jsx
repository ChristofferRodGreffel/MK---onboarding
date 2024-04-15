import React from "react";
import PageWrapper from "../components/PageWrapper";

const OrderRecieved = () => {
  return (
    <PageWrapper>
      <h1 className="font-bold text-xl text-center mt-48">
        Din ordre er modtaget!
      </h1>
      <p className="text-center mt-5">
        Du har optjent point på denne ordre. De er blevet indsat på din konto
      </p>
      <p className="text-center mt-5">
        Samtidig er der tilføjet 300 point til din medlemskonto.
      </p>
      <button className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md m-auto mt-8">
        Shop videre
      </button>
      <button className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md m-auto mt-5">
        Se dine point
      </button>
    </PageWrapper>
  );
};

export default OrderRecieved;
