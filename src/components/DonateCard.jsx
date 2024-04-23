import React, { useState } from "react";
import DonateOption from "./DonateOption";
import { auth, db } from "../../firebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DefaultToastifySettings } from "../helperfunctions/DefaultToastSettings";

const donateOptions = [100, 200, 300, 500, "Alle"];

const DonateCard = (props) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const handleOptionSelect = (amount) => {
    setSelectedOption(amount);
  };

  const handleDonatePoints = async () => {
    if (props.points < selectedOption || props.points === 0) {
      toast.error("Ikke point nok", DefaultToastifySettings);
      return;
    }

    const userRef = doc(db, "users", auth.currentUser?.uid);
    let pointsAmount;
    let remainingPoints;

    if (selectedOption === "Alle") {
      pointsAmount = props.points;
      remainingPoints = 0;
    } else {
      pointsAmount = selectedOption;
      remainingPoints = props.points - selectedOption;
    }

    let historyObject = {
      date: new Date(),
      type: "donate",
      amount: pointsAmount,
    };

    navigate(`/donationrecieved/${props.organization}/${pointsAmount}`);

    await updateDoc(userRef, {
      history: arrayUnion(historyObject),
      points: remainingPoints,
    });
  };

  return (
    <div className="w-full border-2 border-primaryGrey rounded-md p-3">
      <div className="flex justify-between">
        <p className="font-bold text-lg">{props.organization}</p>
        {/* <img
          src={props.logo}
          alt={`${props.organization} logo`}
          className="h-5 aspect-auto"
        /> */}
      </div>
      <p className="mt-2">{props.description}</p>
      <div className="mt-5 flex justify-between">
        {donateOptions.map((option, key) => {
          return (
            <div key={key}>
              <DonateOption
                amount={option}
                selected={selectedOption === option}
                onSelected={handleOptionSelect}
              />
            </div>
          );
        })}
      </div>
      {selectedOption !== null && (
        <p className="mt-1">
          {selectedOption === "Alle" ? (
            <>(Din donation svarer til {Math.floor(props.points * 0.35)} kr.)</>
          ) : (
            <>
              (Din donation svarer til {Math.floor(selectedOption * 0.35)} kr.)
            </>
          )}
        </p>
      )}

      {selectedOption !== null ? (
        <button
          onClick={handleDonatePoints}
          className="bg-primaryGrey w-full text-white font-medium p-2 rounded-md mt-3"
        >
          Donér {selectedOption.toLocaleString().toLowerCase()} point{" "}
        </button>
      ) : (
        <button
          disabled
          className="bg-neutral-600 w-full text-white font-medium p-2 rounded-md mt-3"
        >
          Vælg antal
        </button>
      )}
    </div>
  );
};

export default DonateCard;
