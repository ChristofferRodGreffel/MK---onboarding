import React from "react";
import { timestampConvert } from "../helperfunctions/TimestampConvert";

const HistoryCard = (props) => {
  const formatType = (type) => {
    let formattedType = "";
    switch (type) {
      case "used":
        formattedType = "Benyttet ved køb";
        break;
      case "donated":
        formattedType = "Point donation";
        break;
      case "earned":
        formattedType = "Optjent ved køb";
        break;
      default:
        break;
    }
    return formattedType;
  };

  return (
    <div className="flex items-center justify-between bg-primaryGrey w-full text-white py-2.5 px-3 rounded-md">
      <div className="flex flex-col">
        <p className="text-sm font-light leading-tight">
          {timestampConvert(props.object.date.seconds, "stampToPreciseDate")}
        </p>
        <p className="font-medium leading-tight">
          {formatType(props.object?.type)}
        </p>
      </div>
      {props.object.type === "used" ? (
        <p>-{props.object.amount} point</p>
      ) : (
        <p>+{props.object.amount} point</p>
      )}
    </div>
  );
};

export default HistoryCard;
