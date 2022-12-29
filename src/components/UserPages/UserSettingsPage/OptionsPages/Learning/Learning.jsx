import classNames from "classnames/bind";
import classes from "./Learning.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Learning() {
  const cx = classNames.bind(classes);
  const [whichDifficult, setWhichDifficult] = useState();
  return (
    <div className={classNames(cx("learning"))}>
      <h1>Learning settings</h1>
      <div className={classNames(cx("learning-content"))}>
        <h2>Select learning difficult</h2>
        <div className="radio-techcards-container">
          <div className="radio-techcards">
            <input
              onChange={() => {
                setWhichDifficult("easy");
              }}
              type="radio"
              name="formType"
              id="easy"
            />
            <label htmlFor="easy">Easy</label>
            <input
              onChange={() => {
                setWhichDifficult("medium");
              }}
              type="radio"
              name="formType"
              id="medium"
            />
            <label htmlFor="medium">Medium</label>
            <input
              onChange={() => {
                setWhichDifficult("hard");
              }}
              type="radio"
              name="formType"
              id="hard"
            />
            <label htmlFor="hard">Hard</label>
          </div>
        </div>
        <div className={classNames(cx("learning-content-description"))}>
          <h3>
            {whichDifficult === "easy"
              ? "For the busy ones"
              : whichDifficult === "medium"
              ? "Default mode"
              : whichDifficult === "hard"
              ? "For those who enjoy challenges"
              : ""}
          </h3>
          <p>
            {whichDifficult === "easy"
              ? "Repetitions will be more delayed in time"
              : whichDifficult === "medium"
              ? "Repetitions will be calculated in the normal way"
              : whichDifficult === "hard"
              ? "Repetitions will be counted at shorter intervals over time"
              : ""}
          </p>
        </div>
        <button className="btn-solid-medium">Submit</button>
      </div>
    </div>
  );
}

export default Learning;
