import React from "react";

const SettingsBox = (props) => {
  return (
    <div className="mb-5">
      <p className="font-bold leading-none mt-3">{props.title}</p>
      <input
        step={0.1}
        min={0.1}
        lang="en-GB"
        onChange={(e) => props.setState(Number(e.target.value))}
        type="number"
        name={props.name}
        placeholder={props.placeholder?.toFixed(2)}
        className="rounded-md border-2 border-primaryGrey px-5 py-5 mt-2 text-5xl font-bold w-full"
      />
      <button
        onClick={() => props.onClick(props.name)}
        className="bg-primaryGrey text-white py-2 px-8 w-full text-center font-semibold rounded-md mt-2"
      >
        Bekræft ændring
      </button>
    </div>
  );
};

export default SettingsBox;
