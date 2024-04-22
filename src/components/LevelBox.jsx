import { Line } from "rc-progress";
import React from "react";

const LevelBox = (props) => {
  const calculateLevelPercentage = () => {
    const maxPoints = 5000;
    const earnedPoints = props.memberPoints;
    const percentage = (earnedPoints / maxPoints) * 100;
    return percentage;
  };

  return (
    <div className="border-2 border-primaryGrey rounded-md mt-2 py-6 px-8">
      <div>
        <p className="text-5xl font-bold text-primaryGrey">
          {props.memberPoints.toLocaleString()}
        </p>
        <p className="font-medium leading-none">Medlemspoint</p>
      </div>
      <p className="mt-3">
        Jo flere medlems point jo højere status i kundeklubben. Du får bedre
        tilbud og dine point er mere værd.
      </p>
      <div className="mt-5 flex justify-between items-center w-full relative">
        <div className="flex flex-col items-start">
          <p>Bronze</p>
          <div className="bg-bronze w-4 h-4 rounded-full"></div>
          <p>0 point</p>
        </div>
        <div className="flex flex-col items-center">
          <p>Sølv</p>
          <div className="bg-silver w-4 h-4 rounded-full"></div>
          <p>2000 point</p>
        </div>
        <div className="flex flex-col items-end">
          <p>Guld</p>
          <div className="bg-gold w-4 h-4 rounded-full"></div>
          <p>5000 point</p>
        </div>
        <Line
          percent={calculateLevelPercentage()}
          strokeWidth={1.5}
          trailWidth={1.5}
          strokeColor="#343434"
          className="-z-10 absolute w-[99%] right-1/2 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  );
};

export default LevelBox;
