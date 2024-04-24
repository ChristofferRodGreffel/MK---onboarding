import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useParams } from "react-router-dom";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import BackButtonWithArrow from "../components/BackButtonWithArrow";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";

const CorrectPoints = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [newMaulundAmount, setNewMaulundAmount] = useState("");
  const [newMemberAmount, setNewMemberAmount] = useState("");

  useEffect(() => {
    const unsubscribe = getUser();
    return () => unsubscribe();
  }, [id]);

  const getUser = () => {
    return onSnapshot(doc(db, "users", id), (doc) => {
      setUserData(doc.data());
    });
  };

  const handlePointsChange = async (e) => {
    e.preventDefault();

    let newAmount;
    let targetType;

    if (e.target.name === "maulund") {
      newAmount = newMaulundAmount;
      targetType = userData?.points;
    } else if (e.target.name === "member") {
      newAmount = newMemberAmount;
      targetType = userData?.memberPoints;
    }

    if (newAmount !== null) {
      let currentPoints = Number(targetType);
      let correctionType;
      let correctionAmount = 0;

      if (newAmount > currentPoints) {
        correctionType = "correctionUp";
        correctionAmount = newAmount - currentPoints;
      } else {
        correctionType = "correctionDown";
        correctionAmount = currentPoints - newAmount;
      }

      let historyObject = {
        date: new Date(),
        type: correctionType,
        amount: correctionAmount,
      };

      const userRef = doc(db, "users", id);

      if (e.target.name === "maulund") {
        await updateDoc(userRef, {
          history: arrayUnion(historyObject),
          points: newAmount,
        });
      } else {
        await updateDoc(userRef, {
          memberPoints: newAmount,
        });
      }

      setNewMaulundAmount("");
      setNewMemberAmount("");

      toast.success("Point opdateret!", DefaultToastifySettings);
    }
  };

  return (
    <PageWrapper>
      <div className="mt-10">
        <BackButtonWithArrow
          linkText="Tilbage til kundeprofil"
          linkTo={`/admin/customer/${id}`}
        />
      </div>
      <h1 className="font-bold text-xl mb-2">Ret antal point</h1>
      <p className="text-md font-medium">
        <b>Kunde:</b> {userData?.name}
      </p>
      <div className="mt-5">
        <p className="font-semibold text-lg">Nuværende Maulund point</p>
        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2">
          <p className="text-5xl font-bold text-primaryGrey">
            {userData?.points}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-lg">Nyt antal Maulund point</p>
        <form name="maulund" onSubmit={handlePointsChange}>
          <input
            onChange={(e) => setNewMaulundAmount(Number(e.target.value))}
            type="number"
            name="pointsAmount"
            id="pointsAmount"
            value={newMaulundAmount}
            placeholder={userData?.points}
            className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2 w-full text-5xl font-bold text-primaryGrey"
          />
          <button
            data-type="maulund"
            className="bg-primaryGrey text-white py-2 px-8 w-full text-center font-semibold rounded-md mt-5"
          >
            Bekræft ændring
          </button>
        </form>
      </div>
      <div className="mt-10">
        <p className="font-semibold text-lg">Nuværende medlemspoint</p>
        <div className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2">
          <p className="text-5xl font-bold text-primaryGrey">
            {userData?.memberPoints}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <p className="font-semibold text-lg">Nyt antal medlemspoint</p>
        <form name="member" onSubmit={handlePointsChange}>
          <input
            onChange={(e) => setNewMemberAmount(Number(e.target.value))}
            type="number"
            name="pointsAmount"
            id="pointsAmount"
            value={newMemberAmount}
            placeholder={userData?.memberPoints}
            className="border-2 rounded-md border-primaryGrey px-5 py-5 mt-2 w-full text-5xl font-bold text-primaryGrey"
          />
          <button className="bg-primaryGrey text-white py-2 px-8 w-full text-center font-semibold rounded-md mt-5">
            Bekræft ændring
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

export default CorrectPoints;
