import React from "react";

const CustomButton = (props) => {
  return (
    <button
      className={`flex cursor-pointer justify-center items-center gap-2 bg-primaryGrey text-white text-lg outline-none rounded-md p-2.5 md:p-2 font-bold ${
        props.customWidth && props.customWidth
      }`}
      onClick={props.function}
      disabled={props.disabled ? true : false}
      type={props.type}
    >
      {props.iconRight ? (
        <>
          {props.title}
          {props.icon && <i className={`${props.icon} text-lg`}></i>}
        </>
      ) : (
        <>
          {props.icon && <i className={`${props.icon} text-lg`}></i>}
          {props.title}
        </>
      )}
    </button>
  );
};

export default CustomButton;
