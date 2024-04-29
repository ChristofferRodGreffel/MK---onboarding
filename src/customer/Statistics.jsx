import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import Header from "../components/Header";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { formatter } from "../helperfunctions/Formatter";

const Statistics = () => {
  const [userId, setUserId] = useState();
  const [allData, setAllData] = useState();
  const [loading, setLoading] = useState();
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalDonated, setTotalDonated] = useState(0);
  const [membersAmount, setMembersAmount] = useState(0);

  useEffect(() => {
    const getUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserId(user.uid);
        } else {
          setLoading(false);
        }
      });
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (querySnapshot) => {
          const data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setAllData(data);
        });
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (allData) {
      setLoading(false);
      getUserStatistics();
    }
  }, [allData]);

  const getUserStatistics = () => {
    setTotalSaved(0);
    setTotalDonated(0);
    setMembersAmount(allData.length);
    allData?.forEach((user) => {
      user?.history?.forEach((entry) => {
        if (entry.type === "used") {
          if (entry.amount) {
            setTotalSaved((totalSaved) => (totalSaved += entry.amount));
          }
        }
        if (entry.type === "donate") {
          if (entry.amount) {
            setTotalDonated((totalDonated) => (totalDonated += entry.amount));
          }
        }
      });
    });
  };

  return (
    <PageWrapper>
      <Header />
      <div className="mt-8">
        <BackButtonWithArrow linkText="Tilbage til profil" linkTo="/profile" />
      </div>
      <h1 className="font-bold text-xl">Kundeklub Statistikker</h1>
      <p className="mt-2">
        Her kan du se hvad medlemmerne af kundeklubben har opnået til dags dato.
      </p>
      <div className="mt-5">
        <p className="font-semibold">Antal medlemmer</p>
        <div className="flex items-baseline gap-1.5 border-2 rounded-md border-primaryGrey px-5 py-5 mt-1">
          <p className="text-3xl font-bold text-primaryGrey">{membersAmount}</p>
          <p className="font-medium">Medlemmer</p>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold">Point doneret i alt</p>
        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-1">
          <p className="text-3xl font-bold text-primaryGrey">
            {totalDonated.toLocaleString("da-DK")}
          </p>
          <p className="font-medium">
            Svarende til {formatter.format(totalDonated * 0.35)}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold">Penge sparet i alt</p>
        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-1">
          <p className="text-3xl font-bold text-primaryGrey">
            {formatter.format(totalSaved)}
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Statistics;
