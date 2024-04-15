import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { PulseLoader } from "react-spinners";

const PointsBox = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);
  const [totalSavings, setTotalSavings] = useState();
  const [remainingPoints, setRemainingPoints] = useState();
  const [pointsUsed, setPointsUsed] = useState();
  const [exchangeRate, setExchangeRate] = useState(0.25);
  const navigate = useNavigate();

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
  }, [userData]);

  const calculatePointSavings = async () => {
    let points = userData?.points;
    let exchangeRate;
    switch (userData?.level) {
      case "bronze":
        exchangeRate = 0.25;
        break;
      case "silver":
        exchangeRate = 0.3;
        setExchangeRate(0.3);
        break;
      case "gold":
        exchangeRate = 0.35;
        setExchangeRate(0.35);
        break;

      default:
        break;
    }
    let savingsAmount = points * exchangeRate;

    if (props.orderValue < savingsAmount) {
      let pointsAmount = props.orderValue / exchangeRate;
      setRemainingPoints(points - pointsAmount);
    } else {
      setRemainingPoints(0);
    }

    setTotalSavings(savingsAmount);
    setPointsUsed(savingsAmount / exchangeRate);
  };

  const formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <>
      <div>
        <p className="font-bold">Dine maulund point</p>
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
                    {userData?.points}
                  </p>
                  {props.discountApplied !== true ? (
                    <>
                      {totalSavings < props.orderValue ? (
                        <>
                          {userData.points !== 0 ? (
                            <p>
                              Spar {formatter.format(totalSavings)} med point
                            </p>
                          ) : (
                            <p>Du har ingen point...</p>
                          )}
                        </>
                      ) : (
                        <p>
                          Du har point nok til at få denne ordre gratis! (
                          {props.orderValue / exchangeRate} point)
                        </p>
                      )}
                    </>
                  ) : (
                    <p>Du har allerede anvendt point på denne ordre.</p>
                  )}
                </>
              ) : (
                <>
                  <p>
                    Log ind for at anvende point og spare penge på din ordre!
                  </p>
                  <button
                    onClick={() => navigate("/signin")}
                    className="bg-primaryGrey text-white py-1.5 px-10 rounded-sm font-semibold mt-3"
                  >
                    Log ind
                  </button>
                </>
              )}
            </>
          )}
        </div>
        {loggedIn && (
          <>
            {props.discountApplied !== true && (
              <>
                <button
                  onClick={() =>
                    props.function(totalSavings, remainingPoints, pointsUsed)
                  }
                  className="bg-primaryGrey text-white w-full mt-2 rounded-md py-2 font-semibold"
                >
                  Anvend point
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
