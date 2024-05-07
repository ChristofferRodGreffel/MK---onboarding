import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { PulseLoader } from "react-spinners";
import { useGlobalState } from "./GlobalStateProvider";
import { formatter } from "../helperfunctions/Formatter";

const PointsBox = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [totalSavings, setTotalSavings] = useState();
  const [remainingPoints, setRemainingPoints] = useState();
  const [pointsUsed, setPointsUsed] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const { adminValues } = useGlobalState();

  useEffect(() => {
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
          setLoading(false);
        }
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
          setUserData(doc.data());
        });
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      calculatePointSavings();
      setLoading(false);
    }
  }, [userData, props.discountApplied]);

  const calculatePointSavings = async () => {
    let points = userData?.points;
    let exchangeRate;

    // Calculate exchange rate based on the users level
    switch (userData?.level) {
      case "bronze":
        exchangeRate = adminValues.exchangeRates.bronze;
        setExchangeRate(exchangeRate);
        break;
      case "silver":
        exchangeRate = adminValues.exchangeRates.silver;
        setExchangeRate(exchangeRate);
        break;
      case "gold":
        exchangeRate = adminValues.exchangeRates.gold;
        setExchangeRate(exchangeRate);
        break;

      default:
        break;
    }

    // Setting the total savings amount with points
    let savingsAmount = points * exchangeRate;

    // Calculate the effective order value considering if discount is applied
    const effectiveOrderValue = props.discountApplied
      ? props.orderValue + savingsAmount
      : props.orderValue;

    // Check if customer can save more than the order is worth
    if (effectiveOrderValue < savingsAmount) {
      const pointsAmount = effectiveOrderValue / exchangeRate;
      setRemainingPoints(Math.floor(points - pointsAmount));
      setPointsUsed(pointsAmount);
    } else {
      setRemainingPoints(0);
      setPointsUsed(points);
    }

    setTotalSavings(savingsAmount);
  };

  return (
    <>
      <div>
        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2">
          {loading ? (
            <>
              <PulseLoader color="#343434" size={11} />
            </>
          ) : (
            <>
              {loggedIn && loggedIn == true ? (
                <>
                  <p className="text-5xl font-bold text-primaryGrey">
                    {userData?.points.toLocaleString()}
                  </p>
                  {!props?.profileText ? (
                    <>
                      {props.discountApplied !== true ? (
                        <>
                          {totalSavings < props.orderValue ? (
                            <>
                              {userData.points !== 0 ? (
                                <p>
                                  Spar {formatter.format(totalSavings)} med
                                  point
                                </p>
                              ) : (
                                <p>Du har ingen point...</p>
                              )}
                            </>
                          ) : (
                            <p>
                              Du har point nok til at få denne ordre gratis! (
                              {Math.floor(props.orderValue / exchangeRate)}{" "}
                              point)
                            </p>
                          )}
                        </>
                      ) : (
                        <p>Du har allerede anvendt point på denne ordre.</p>
                      )}
                    </>
                  ) : (
                    <p className="font-semibold">Maulund Point</p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    Log ind for at anvende point og spare penge på din ordre!
                  </p>
                  <Link to={"/signin"} state={{ prevPath: location.pathname }}>
                    <button className="bg-primaryGrey text-white py-1.5 px-10 rounded-sm font-semibold mt-3">
                      Log ind
                    </button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
        {loggedIn && (
          <>
            {props.discountApplied !== true && props.buttonActive && (
              <>
                {userData?.points > 0 && (
                  <button
                    onClick={() =>
                      props.function(totalSavings, remainingPoints, pointsUsed)
                    }
                    className="bg-primaryGrey text-white w-full mt-2 rounded-md py-2 font-semibold"
                  >
                    Anvend point
                  </button>
                )}
              </>
            )}
            {props.discountApplied === true && props.buttonActive && (
              <>
                <button
                  onClick={() => props.reinsertPoints()}
                  className="bg-primaryGrey text-white w-full mt-2 rounded-md py-2 font-semibold"
                >
                  Træk point tilbage
                </button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default PointsBox;
