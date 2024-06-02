import React from "react";

const InfoBox = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 text-lg relative p-4 w-[98%] border-primaryGrey border-2 rounded-md mt-5">
      {children}
      <div className="h-[15px] w-[15px] rounded-full flex items-center justify-center absolute -top-2 -right-2 bg-white">
        <i className="fa-solid fa-circle-info text-2xl text-primaryGrey"></i>
      </div>
    </div>
  );
};

export default InfoBox;
