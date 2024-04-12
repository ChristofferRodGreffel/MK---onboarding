import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

const PointsBox = (props) => {
  const [loggedIn, setLoggedIn] = useState();
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const currentUser = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    if (currentUser) {
      const getUserData = async () => {
        const q = query(collection(db, "users"), where("id", "==", currentUser.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserData(doc.data());
        });
      };
      getUserData();
    }
  }, []);

  const calculatePointSavings = () => {
    let points = userData?.points;
    let exchangeRate;
    switch (userData?.level) {
      case "bronze":
        exchangeRate = 0.25;
        break;
      case "silver":
        exchangeRate = 0.3;
        break;
      case "gold":
        exchangeRate = 0.35;
        break;

      default:
        break;
    }
    let savingsAmount = points * exchangeRate;

    return savingsAmount;
  };

  const formatter = new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
  });

  return (
    <div>
      <p className="font-bold">Dine maulund point</p>
      <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2">
        {loggedIn && loggedIn == true ? (
          <>
            <p className="text-5xl font-bold text-primaryGrey">{userData?.points}</p>
            <p>Spar {formatter.format(calculatePointSavings())} med point</p>
          </>
        ) : (
          <>
            <p>Log ind for at anvende point og spare penge på din ordre!</p>
            <button
              onClick={() => navigate("/signin")}
              className="bg-primaryGrey text-white py-1.5 px-10 rounded-sm font-semibold mt-3"
            >
              Log ind
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => props.function(calculatePointSavings())}
        className="bg-primaryGrey text-white w-full mt-2 rounded-md py-2 font-semibold"
      >
        Anvend point
      </button>
    </div>
  );
};

export default PointsBox;
