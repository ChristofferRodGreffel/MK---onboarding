import React from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import ConfettiExplosion from "react-confetti-explosion";
import { Link, useParams } from "react-router-dom";

const DonateRecieved = () => {
  const { organization, amount } = useParams();

  return (
    <PageWrapper>
      <Header />
      <div className="m-auto">
        <ConfettiExplosion
          colors={["#FFD700", "#FF1493", "#00FF00", "#1E90FF"]}
          zIndex={-1}
        />
      </div>
      <div className="h-[80vh] flex justify-center items-center">
        <div>
          <div className="flex flex-col text-center mb-3">
            <h1 className="font-bold text-2xl text-center flex flex-col items-center mb-2 lg:text-3xl">
              Tak fordi du donerer dine point!
            </h1>
            <i className="fa-solid fa-heart text-customRed text-6xl"></i>
          </div>
          <p className="text-center">
            Tak fordi at du har valgt at støtte <b>{organization}</b> med{" "}
            <b>{amount} point</b>. Du er med til at gøre verden til et bedre
            sted.
          </p>
          <div className="flex flex-col items-center gap-5 mt-5">
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

export default DonateRecieved;
