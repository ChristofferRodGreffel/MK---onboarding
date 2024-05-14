import React from "react";

const DonateOption = (props) => {
  return (
    <button
      onClick={() => props.onSelected(props.amount)}
      className={`rounded-md border-[1px] border-primaryGrey px-2.5 py-1 w-fit md:px-4 md:py-1 lg:px-3 ${
        props.selected && "bg-primaryGrey text-white"
      }`}
    >
      <p className="font-semibold">{props.amount}</p>
    </button>
  );
};

export default DonateOption;
