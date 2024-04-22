import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import Header from "../components/Header";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import DonateCard from "../components/DonateCard";
import organizations from "../../organizations.json";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const Donate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userData, setUserData] = useState();
  const [points, setPoints] = useState(null);

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
        const unsub = onSnapshot(doc(db, "users", userId), (doc) => {
          setUserData(doc.data());
        });
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userData) {
      setPoints(userData.points);
      setLoading(false);
    }
  }, [userData]);

  return (
    <PageWrapper>
      {!loading && (
        <div>
          <Header />
          <div className="mt-8">
            <BackButtonWithArrow
              linkText="Tilbage til profil"
              linkTo="/profile"
            />
          </div>
          <h1 className="font-bold text-xl">Donér dine point</h1>
          {points !== 0 ? (
            <>
              <p className="mt-2">
                Her kan du donere dine point til en af de organisationer som vi
                samarbejder med.
              </p>
              <p className="mt-2">
                Du har <b>{points}</b> optjente point.
              </p>
              <p className="mt-2">1 point = 0,35 kr.</p>
              <div className="mt-5 flex flex-col gap-6 md:grid md:grid-cols-2 xl:grid-cols-3">
                {organizations.map((org, key) => {
                  return (
                    <div key={key}>
                      <DonateCard
                        organization={org.name}
                        description={org.description}
                        logo={org.logo_link}
                        points={points}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="mt-5 flex flex-col gap-6">
              <p>
                Du har ingen point... Når du har optjent point, kan du vende
                tilbage hertil og donere dem.
              </p>
              <Link to={"/frontpage"}>
                <button className="bg-primaryGrey text-white py-2 px-10 rounded-md font-medium">
                  Shop videre
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </PageWrapper>
  );
};

export default Donate;
