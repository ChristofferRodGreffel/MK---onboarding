import React, { useEffect, useState } from "react";

const CountdownTimer = (props) => {
  const [time, setTime] = useState();

  useEffect(() => {
    setTime(getTimeUntilNext17());
    let timer = setInterval(() => {
      setTime((time) => {
        if (time <= 0) {
          clearInterval(timer);
          return getTimeUntilNext17();
        } else return time - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeUntilNext17() {
    const now = new Date();
    const currentHours = now.getHours();
    if (currentHours < 17) {
      const today17 = new Date(now);
      today17.setHours(17, 0, 0, 0); // Set time to 17:00:00:000 of today
      const timeUntil17Today = today17 - now;
      // Convert milliseconds to seconds and round down
      return Math.floor(timeUntil17Today / 1000);
    } else {
      const tomorrow17 = new Date(now);
      tomorrow17.setDate(tomorrow17.getDate() + 1);
      tomorrow17.setHours(17, 0, 0, 0); // Set time to 17:00:00:000 of the next day
      const timeUntil17Tomorrow = tomorrow17 - now;
      // Convert milliseconds to seconds and round down
      return Math.floor(timeUntil17Tomorrow / 1000);
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {props.text && <p className="font-medium">{props.text}</p>}
      <p className="font-mono font-bold text-base border-[1.5px] border-primaryGrey px-2 rounded-md w-fit">
        {formatTime(time)}
      </p>
    </div>
  );
};

export default CountdownTimer;
