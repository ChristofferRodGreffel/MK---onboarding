import React from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";

const OrderRecieved = () => {
  const { totalPoints, memberPoints } = useParams();

  return (
    <PageWrapper>
      <Header />
      <div className="h-[80vh] flex justify-center items-center">
        <div>
          <h1 className="font-bold text-xl text-center flex flex-col items-center mb-5">
            Din ordre er modtaget!
          </h1>
          <p className="text-center mb-2">
            Du har optjent <b>{totalPoints} point</b> på denne ordre. De er
            blevet indsat på din konto
          </p>
          <p className="text-center mb-5">
            Samtidig er der tilføjet <b>{memberPoints} point</b> til din
            medlemskonto.
          </p>
          <div className="flex flex-col items-center gap-5">
            <Link
              to={"/"}
              className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md text-center"
            >
              Shop videre
            </Link>
            <Link
              to={"/profile"}
              className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md text-center"
            >
              Se dine point
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OrderRecieved;
