import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const OrderRecieved = () => {
  const { totalPoints, memberPoints } = useParams();
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setLoggedIn(true);
          setLoading(false);
        } else {
          setLoggedIn(false);
          setLoading(false);
        }
      });
    };
    getUser();
  }, []);

  return (
    <PageWrapper>
      {!loading && (
        <>
          <Header />
          <div className="m-auto">
            <ConfettiExplosion colors={["#FFD700", "#FF1493", "#00FF00", "#1E90FF"]} zIndex={-1} />
          </div>
          <div className="h-[80vh] flex justify-center items-center">
            <div>
              <h1 className="font-bold text-xl text-center flex flex-col items-center mb-5 lg:text-3xl">
                Din ordre er modtaget!
              </h1>
              {loggedIn ? (
                <>
                  <p className="text-center mb-2">
                    Du har optjent <b>{totalPoints} point</b> på denne ordre. De er blevet indsat på din konto
                  </p>
                  <p className="text-center mb-5">
                    Samtidig er der tilføjet <b>{memberPoints} point</b> til din medlemskonto.
                  </p>
                </>
              ) : (
                <p className="text-center mb-5">
                  Vi har modtaget din ordre, men da du ikke er logget ind, har du ikke optjent nogle point.
                </p>
              )}

              <div className="flex flex-col items-center gap-5">
                <Link to={"/"} className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md text-center">
                  Shop videre
                </Link>
                {loggedIn && (
                  <Link
                    to={"/profile"}
                    className="bg-primaryGrey text-white font-medium w-2/3 p-2 rounded-md text-center"
                  >
                    Se dine point
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </PageWrapper>
  );
};

export default OrderRecieved;
