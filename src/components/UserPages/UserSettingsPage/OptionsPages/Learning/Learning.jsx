import classNames from "classnames/bind";
import classes from "./Learning.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
function Learning() {
  const cx = classNames.bind(classes);
  const [whichDifficult, setWhichDifficult] = useState();
  const [whichDefaultDifficult, setWhichDefaultDifficult] = useState();
  const [displayBtnToSubmitChanges, setDisplayBtnToSubmitChanges] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getDefaultCheckboxes = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get("/users/learning-settings");
        setWhichDifficult(res.data.learningDifficult);
        setWhichDefaultDifficult(res.data.learningDifficult);
      } catch (err) {
        setIsFetched(true);
        console.log(err);
      }
      setIsFetched(true);
    };
    getDefaultCheckboxes();
  }, []);
  useEffect(() => {
    if (whichDefaultDifficult !== whichDifficult) {
      setDisplayBtnToSubmitChanges(true);
    } else setDisplayBtnToSubmitChanges(false);
  }, [whichDefaultDifficult, whichDifficult]);

  const postLearningDifficultHandler = async () => {
    try {
      const res = await axios.post("/users/learning-settings", {
        learningDifficult: whichDifficult,
      });

      if (res.status === 200) {
        setErrorMessage("");
        setWhichDefaultDifficult(whichDifficult);
      }
    } catch (err) {
      setErrorMessage(err.response.data);
      console.log(err);
    }
  };

  return (
    <div className={classNames(cx("learning"))}>
      <h1>Learning settings</h1>

      {isFetched ? (
        <>
          <div className={classNames(cx("learning-content"))}>
            <h2>Select learning difficult</h2>
            <div className="radio-techcards-container">
              <div className="radio-techcards">
                <input
                  onChange={() => {
                    setWhichDifficult("easy");
                  }}
                  checked={whichDifficult === "easy"}
                  type="radio"
                  name="formType"
                  id="easy"
                />
                <label htmlFor="easy">Easy</label>
                <input
                  onChange={() => {
                    setWhichDifficult("medium");
                  }}
                  checked={whichDifficult === "medium"}
                  type="radio"
                  name="formType"
                  id="medium"
                />
                <label htmlFor="medium">Medium</label>
                <input
                  onChange={() => {
                    setWhichDifficult("hard");
                  }}
                  checked={whichDifficult === "hard"}
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
            {displayBtnToSubmitChanges ? (
              <button
                onClick={postLearningDifficultHandler}
                className="btn-solid-medium"
              >
                Submit
              </button>
            ) : (
              ""
            )}
          </div>
          <p style={{ color: "red", marginTop: "0.5rem" }}>{errorMessage}</p>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Learning;
