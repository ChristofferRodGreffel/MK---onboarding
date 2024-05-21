import React from "react";
import CountdownTimer from "./CountdownTimer";
import trustpilot from "../assets/trustpilot.svg";
import emark from "../assets/emark.png";

const TopBanner = () => {
  const currentTime = new Date().getHours();

  // Calculate the day of the week after two days
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const futureDay = (currentDay + 2) % 7;
  const daysOfWeek = [
    "Søndag",
    "Mandag",
    "Tirsdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lørdag",
  ];
  const futureDayName = daysOfWeek[futureDay];

  return (
    <div className="border-[1px] border-primaryGrey rounded-md px-5 mt-3 p-3 flex justify-between items-center flex-wrap">
      <div className="flex gap-1">
        <img src={trustpilot} alt="trustpilot reviews" className="w-20" />
        <p className="font-medium text-sm">Trustpilot</p>
      </div>
      <div className="flex-col items-center gap-1 hidden md:flex">
        <p className="font-medium text-sm text-center leading-tight">
          {currentTime < 17 ? (
            <>Bestil inden kl. 17:00, så sender vi din ordre i dag</>
          ) : (
            <>Levering {futureDayName}, bestil inden:</>
          )}
        </p>
        <div>
          <CountdownTimer />
        </div>
      </div>
      <div className="flex items-center gap-1">
        <img src={emark} alt="Emærket" className="w-6" />
        <p className="font-medium text-sm md:block">E-mærket</p>
      </div>
      <div className="flex flex-col items-center m-auto gap-1 md:hidden">
        <p className="font-medium mt-2 text-sm text-center">
          {currentTime < 17 ? (
            <>Bestil inden kl. 17:00, så sender vi din ordre i dag</>
          ) : (
            <>Levering {futureDayName}, bestil inden:</>
          )}
        </p>
        <div>
          <CountdownTimer />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
