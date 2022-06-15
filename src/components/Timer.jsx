import { useEffect, useState } from "react";

const initalTimerState = { hours: 0, minutes: 0, seconds: 0 };

export default function Timer() {
  const [timer, setTimer] = useState(initalTimerState);

  const { hours, minutes, seconds } = timer;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime.seconds === 59) {
          if (prevTime.minutes === 59) {
            return {
              ...prevTime,
              hours: prevTime.hours + 1,
              minutes: 0,
              seconds: 0,
            };
          } else {
            return { ...prevTime, minutes: prevTime.minutes + 1, seconds: 0 };
          }
        } else {
          return { ...prevTime, seconds: prevTime.seconds + 1 };
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <span className="time-wrapper">
      In meeting time: {hours < 9 ? "0" + hours : hours} :{" "}
      {minutes < 9 ? "0" + minutes : minutes} :{" "}
      {seconds < 9 ? "0" + seconds : seconds}
    </span>
  );
}
