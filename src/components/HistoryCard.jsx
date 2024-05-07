import React from "react";
import { timestampConvert } from "../helperfunctions/TimestampConvert";

const HistoryCard = (props) => {
  const formatType = (type) => {
    let formattedType = "";
    switch (type) {
      case "used":
        formattedType = "Køb af varer";
        break;
      case "donate":
        formattedType = "Point donation";
        break;
      case "earned":
        formattedType = "Køb af varer";
        break;
      case "correctionUp":
        formattedType = "Point tilføjet (kundeservice)";
        break;
      case "correctionDown":
        formattedType = "Point slettet (kundeservice)";
        break;
      case "maulundDelete":
        formattedType = "Nulstillet (kundeservice)";
        break;
      default:
        break;
    }
    return formattedType;
  };

  return (
    <>
      <div className="flex items-center justify-between w-full text-primaryGrey py-2.5 rounded-md">
        <div className="flex flex-col">
          <p className="text-sm font-medium leading-tight">
            {timestampConvert(props.object.date.seconds, "stampToPreciseDate")}
          </p>
          <p className="font-bold leading-tight">
            {formatType(props.object?.type)}
          </p>
        </div>
        {props.object.type === "used" ||
        props.object.type === "donate" ||
        props.object.type === "correctionDown" ||
        props.object.type === "maulundDelete" ? (
          <p className="font-semibold text-customRed">
            {Math.floor(props.object.amount) < 0 ? (
              <>{Math.floor(props.object.amount)} point</>
            ) : (
              <>-{Math.floor(props.object.amount)} point</>
            )}
          </p>
        ) : (
          <p className="font-semibold text-customGreen">
            +{Math.floor(props.object.amount)} point
          </p>
        )}
      </div>
      <hr className="border-b-[1px] border-gray-400 border-dashed rounded-sm mt-1.5" />
    </>
  );
};

export default HistoryCard;
