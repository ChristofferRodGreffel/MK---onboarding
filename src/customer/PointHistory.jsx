import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import HistoryCard from "../components/HistoryCard";
import { auth, db } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { PulseLoader } from "react-spinners";

const PointHistory = () => {
  const [userData, setUserData] = useState();
  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
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
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return (
    <PageWrapper>
      <Header />
      <div className="mt-8">
        <BackButtonWithArrow linkText="Tilbage til profil" linkTo="/profile" />
        <h1 className="font-bold text-lg mb-2">Din point historik</h1>
        <hr className="border-b-[1.5px] border-primaryGrey rounded-sm mt-1.5" />
        {loading ? (
          <div className="flex justify-center mt-10">
            <PulseLoader color="#343434" size={11} />
          </div>
        ) : (
          <div className="flex flex-col gap-3 mt-5">
            {userData?.history?.toReversed().map((entry, key) => {
              return (
                <div key={key}>
                  <HistoryCard object={entry} />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default PointHistory;
