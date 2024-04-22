import React from "react";

const DonateOption = (props) => {
  return (
    <button
      onClick={() => props.onSelected(props.amount)}
      className={`rounded-md border-[1px] border-primaryGrey px-2.5  py-1 w-fit ${
        props.selected && "bg-primaryGrey text-white"
      }`}
    >
      <p className="font-semibold">{props.amount}</p>
    </button>
  );
};

export default DonateOption;
