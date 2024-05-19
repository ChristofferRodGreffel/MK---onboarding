import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import PageWrapper from "../components/PageWrapper";
import { auth, db } from "../../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { PulseLoader } from "react-spinners";
import PointsBox from "../components/PointsBox";
import Header from "../components/Header";
import { doc, onSnapshot } from "firebase/firestore";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import LevelBox from "../components/LevelBox";
import { formatter } from "../helperfunctions/Formatter";
import { useGlobalState } from "../components/GlobalStateProvider";
import ProductsOverview from "../components/ProductsOverview";

const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState();
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [levelInfo, setLevelInfo] = useState({});
  const [donatedPoints, setDonatedPoints] = useState();
  const [amountSaved, setAmountSaved] = useState(0);
  const { isAdmin } = useGlobalState();

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
      getUserLevel();
      calculateDonatedPoints();
      calculateAmountSaved();
      setLoading(false);
    }
  }, [userData]);

  const handleSignOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        navigate("/signin");
        setLoading(false);
      })
      .catch((error) => {
        toast.error("Der skete en fejl, prøv igen...", DefaultToastifySettings);
        setLoading(false);
      });
  };

  const getUserLevel = () => {
    switch (userData?.level) {
      case "bronze":
        setLevelInfo({
          levelColor: "bg-bronze",
          levelName: "Bronze",
          nextLevel: "Sølv",
          nextLevelRequired: 2500,
        });
        break;
      case "silver":
        setLevelInfo({
          levelColor: "bg-silver",
          levelName: "Sølv",
          nextLevel: "Guld",
          nextLevelRequired: 5000,
        });
        break;
      case "gold":
        setLevelInfo({
          levelColor: "bg-gold",
          levelName: "Guld",
        });
        break;

      default:
        break;
    }
  };

  const calculateDonatedPoints = () => {
    let pointsDonated = 0;
    userData.history?.forEach((entry) => {
      if (entry.type === "donate") {
        pointsDonated += entry.amount;
      }
    });
    setDonatedPoints(pointsDonated);
  };

  const calculateAmountSaved = () => {
    let amountSaved = 0;
    userData.history?.forEach((entry) => {
      if (entry.type === "used") {
        amountSaved += entry.amountSaved;
      }
    });
    setAmountSaved(amountSaved);
  };

  return (
    <PageWrapper>
      {!loading && (
        <>
          <Header />
          <div className="mt-8">
            <BackButtonWithArrow linkText="Tilbage til shoppen" linkTo="/" />
          </div>
          {loggedIn ? (
            <>
              <div>
                {!isAdmin ? (
                  <>
                    <h1 className="font-bold text-xl">
                      Velkommen,
                      <br /> {userData?.name}
                    </h1>
                    <p className="font-semibold mt-3">Dine point</p>
                    <div className="md:hidden">
                      <PointsBox profileText={true} />
                    </div>
                    <div className="hidden md:flex gap-5">
                      <div className="w-2/4">
                        <PointsBox profileText={true} />
                        <div className="mt-3">
                          <div className="flex gap-2">
                            <p className="font-bold">Niveau:</p>
                            <div className="flex gap-1 items-center">
                              <span className={`w-5 h-5 ${levelInfo.levelColor} inline-block rounded-full`}></span>
                              <p className="font-medium capitalize">{levelInfo.levelName}</p>
                            </div>
                          </div>
                          <p className="font-medium">
                            <b>Medlemspoint:</b> {userData?.memberPoints.toLocaleString()} point
                          </p>
                          {levelInfo.nextLevelRequired && (
                            <p className="font-medium">
                              <b>Næste niveau:</b> {levelInfo.nextLevel} (om{" "}
                              {levelInfo.nextLevelRequired - userData?.memberPoints} point)
                            </p>
                          )}
                        </div>
                      </div>
                      <LevelBox memberPoints={userData?.memberPoints} />
                    </div>
                    <div className="mt-3 md:hidden">
                      <div className="flex gap-2">
                        <p className="font-bold">Niveau:</p>
                        <div className="flex gap-1 items-center">
                          <span className={`w-5 h-5 ${levelInfo.levelColor} inline-block rounded-full`}></span>
                          <p className="font-medium capitalize">{levelInfo.levelName}</p>
                        </div>
                      </div>
                      <p className="font-medium">
                        <b>Medlemspoint:</b> {userData?.memberPoints.toLocaleString()} point
                      </p>
                      {levelInfo.nextLevelRequired && (
                        <p className="font-medium">
                          <b>Næste niveau:</b> {levelInfo.nextLevel} (om{" "}
                          {levelInfo.nextLevelRequired - userData?.memberPoints} point)
                        </p>
                      )}
                    </div>
                    <div>
                      <div className="mt-5">
                        <p className="font-semibold">Penge sparet med point</p>
                        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-1">
                          <p className="text-4xl font-bold text-primaryGrey">{formatter.format(amountSaved)}</p>
                        </div>
                      </div>
                      <div className="mt-5">
                        <p className="font-semibold">Point doneret i alt</p>
                        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-1">
                          <p className="text-5xl font-bold text-primaryGrey">{donatedPoints.toLocaleString("da-DK")}</p>
                          <p className="font-semibold">Maulund Point</p>
                          <p>Svarende til {formatter.format(donatedPoints * 0.35)}</p>
                        </div>
                        <Link to={"/donate"}>
                          <button className="bg-primaryGrey text-white font-md w-full rounded-md mt-2 py-2">
                            Donér point nu
                          </button>
                        </Link>
                      </div>
                    </div>
                    <div className="mt-5">
                      <Link to={"/history"}>
                        <button className="bg-primaryGrey text-white font-md w-full rounded-md mt-2 py-2">
                          Point historik
                        </button>
                      </Link>
                      <Link to={"/statistics"}>
                        <button className="bg-primaryGrey text-white font-md w-full rounded-md mt-2 py-2">
                          Kundeklub Statistikker
                        </button>
                      </Link>
                    </div>
                    <div className="mt-8">
                      <p className="font-bold text-lg">Ofte stilede spørgsmål</p>
                      <div className="flex flex-col gap-2 mt-2">
                        <Link to={"/questions"} className="underline w-fit">
                          Hvordan virker point?
                        </Link>
                        <Link to={"/questions#levels"} className="underline w-fit">
                          Hvad er kundeklub niveau?
                        </Link>
                      </div>
                    </div>
                    {loading ? (
                      <div className="mt-5">
                        <CustomButton
                          disabled={true}
                          customColor="bg-customRed"
                          customWidth="w-full md:w-56"
                          title={<PulseLoader color="#FFFFFF" size={11} className="p-1" />}
                        />
                      </div>
                    ) : (
                      <div className="mt-10">
                        <CustomButton
                          title="Log ud"
                          customColor="bg-customRed"
                          customWidth="w-full md:w-72"
                          function={handleSignOut}
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="mt-3">Her kan du tilføje, slette, eller redigere produkterne i webshoppen.</p>
                    <ProductsOverview />
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="h-[55vh] flex flex-col justify-center items-center mt-8">
              <p className="mb-5 text-lg font-medium">Du er ikke logget ind...</p>
              <Link to={"/signin"} state={{ prevPath: location.pathname }}>
                <button className="bg-primaryGrey text-white py-1.5 px-10 rounded-sm font-semibold mt-3 w-full">
                  Log ind
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </PageWrapper>
  );
};

export default Profile;
