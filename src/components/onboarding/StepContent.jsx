import React from "react";

const StepContent = (props) => {
  return (
    <div>
      <h1 className="font-bold text-[1.4rem] mb-3 md:text-[1.7rem]">
        {props.title}
      </h1>
      <p>{props.description}</p>
    </div>
  );
};

export default StepContent;
