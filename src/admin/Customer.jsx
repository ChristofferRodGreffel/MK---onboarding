import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../firebaseConfig";
import PageWrapper from "../components/PageWrapper";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import PointsBox from "../components/PointsBox";
import HistoryCard from "../components/HistoryCard";

const Customer = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = getUser();
    return () => unsubscribe();
  }, [id]);

  const getUser = () => {
    return onSnapshot(doc(db, "users", id), (doc) => {
      setUserData(doc.data());
    });
  };

  return (
    <PageWrapper>
      <div className="mt-10">
        <BackButtonWithArrow
          linkText="Tilbage til kontrolpanel"
          linkTo="/admin"
        />
      </div>
      <h1 className="font-bold text-xl mb-2">{userData?.name}</h1>
      <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2">
        <p className="text-5xl font-bold text-primaryGrey">
          {userData?.points.toLocaleString()}
        </p>
        <p className="font-semibold">Maulund Point</p>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <Link
          to={"/correctpoints"}
          className="bg-primaryGrey text-white py-2 px-8 text-center font-semibold rounded-md"
        >
          Ret antal point
        </Link>
        <Link
          to={"/correctpoints"}
          className="bg-customRed text-white py-2 px-8 text-center font-semibold rounded-md"
        >
          Slet alle point
        </Link>
      </div>
      <div>
        <p className="font-semibold text-lg mt-10">Pointhistorik</p>
        <hr className="border-b-2 border-primaryGrey" />
        <div className="mt-3">
          {userData?.history.length && userData?.history.length !== 0 ? (
            <>
              {userData?.history?.toReversed().map((entry, key) => {
                return (
                  <div key={key}>
                    <HistoryCard object={entry} />
                  </div>
                );
              })}
            </>
          ) : (
            <p>Der er ingen historik for denne bruger</p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Customer;
