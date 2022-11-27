import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function LearningModalTimer({ giveRoundTime, stopTimer }) {
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(true);
  const [timerIsActiveByIcon, setTimerIsActiveByIcon] = useState(true);
  const [timerIcon, setTimerIcon] = useState(faPause);

  useEffect(() => {
    setTimerIsActive(stopTimer());

    if (stopTimer() !== timerIsActive) {
      giveRoundTime(timerSeconds);
    }

    let interval = null;
    if (timerIsActive && timerIsActiveByIcon) {
      interval = setInterval(() => {
        setTimerSeconds((seconds) => seconds + 0.05);
      }, 50);
    } else if (!timerIsActive && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [
    timerIsActive,
    timerSeconds,
    stopTimer,
    timerIsActiveByIcon,
    giveRoundTime,
  ]);

  const timerManipulation = () => {
    if (timerIcon === faPause) {
      setTimerIcon(faPlay);
      setTimerIsActiveByIcon(false);
    } else {
      setTimerIcon(faPause);
      setTimerIsActiveByIcon(true);
    }
  };

  return (
    <div style={{ margin: "0.25rem 0 0 2rem" }}>
      <span>
        {new Date(timerSeconds * 1000).toISOString().substring(14, 19)}
      </span>
      <FontAwesomeIcon
        style={{ cursor: "pointer", marginLeft: "0.5rem" }}
        icon={timerIcon}
        onClick={timerManipulation}
      />
    </div>
  );
}

export default LearningModalTimer;
