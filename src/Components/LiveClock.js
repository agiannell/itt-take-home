import { useState, useEffect, useCallback, useRef } from "react";
import Clock from "react-live-clock";

const LiveClock = (props) => {
  const [timeOfDay, setTimeOfDay] = useState(""),
    [isMilitary, setIsMilitary] = useState(false),
    [hour24, setHour24] = useState(""),
    [minute24, setMinute24] = useState(""),
    isMounted = useRef(true);

  const updateTime = useCallback(() => {
    const d = new Date(),
      hours = d.getHours(),
      minutes = d.getMinutes();

    if (hours < 10) {
      setHour24("0" + hours);
    } else {
      setHour24(hours);
    }

    if (minutes < 10) {
      setMinute24("0" + minutes);
    } else {
      setMinute24(minutes);
    }

    if (hours >= 6 && hours < 12) {
      setTimeOfDay("Morning");
    } else if (hours >= 12 && hours < 17) {
      setTimeOfDay("Afternoon");
    } else if (hours >= 17 && hours < 22) {
      setTimeOfDay("Evening");
    } else {
      setTimeOfDay("Night");
    }
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (isMounted.current) {
        updateTime();
      }
    }, 1000);

    return () => (isMounted.current = false);
  }, [updateTime]);

  return (
    <section
      className="clock-container"
      onClick={() => setIsMilitary(!isMilitary)}
    >
      {!isMilitary ? (
        <>
          <h4>12-Hour</h4>
          <Clock
            format={"h:mm a"}
            ticking={true}
            timezone={"US/Mountain"}
            className="clock-module"
          />
          <h4>Good {timeOfDay}</h4>
        </>
      ) : (
        <>
          <h4>24-Hour</h4>
          <span className="clock-module">
            {hour24}:{minute24}
          </span>
          <h4>Good {timeOfDay}</h4>
        </>
      )}
    </section>
  );
};

export default LiveClock;
