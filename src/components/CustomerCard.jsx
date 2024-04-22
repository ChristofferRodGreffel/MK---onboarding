import React from "react";
import { Link } from "react-router-dom";

const CustomerCard = (props) => {
  return (
    <Link
      to={`/customer/${props.id}`}
      className="bg-primaryGrey text-white flex justify-between w-full py-3.5 px-4 rounded-md"
    >
      <p className="font-medium">{props.name}</p>
      <p>{props.points} point</p>
    </Link>
  );
};

export default CustomerCard;
