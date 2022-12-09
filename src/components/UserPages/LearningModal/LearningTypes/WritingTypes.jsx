import classes from "../LearningModal.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function CasualRewriting(props) {
  const cx = classNames.bind(classes);

  const [isInvalid, setIsInvalid] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const nameToRewrite = props.firstSideIsVisible
    ? props.techcardsToDisplay.secondSides[0]
    : props.techcardsToDisplay.firstSides[0];

  const validateHandler = (e) => {
    e.preventDefault();
    const guess = e.target.rewrite.value;
    const textToCompare = nameToRewrite.replaceAll(",", "").toLowerCase();
    if (guess.toLowerCase().includes(textToCompare)) {
      if (props.whichTechcard !== props.firstSides.length)
        props.setWhichTechcard(props.whichTechcard + 1);
      else return props.setListIsFinished(true);

      props.setFirstSideIsVisible(true);
      props.newToDisplay(props.setKnownTechcards);

      props.setTechcardsToDisplay((prevState) => ({
        firstSides: props.firstSides.slice(props.whichTechcard),
        secondSides: props.secondSides.slice(props.whichTechcard),
        images: props.techcardsImages.slice(props.whichTechcard),
        ids: prevState.ids,
      }));
    } else {
      setIsBreak(true);
      setIsInvalid(true);
    }
  };
  const goToNextTechcard = () => {
    if (isBreak) {
      props.setFirstSideIsVisible(true);
      props.newToDisplay(props.setUnknownTechcards);
      setIsInvalid(false);
      setIsBreak(false);
    }
  };

  const iWasRightHandler = () => {
    setIsInvalid(false);
    setIsBreak(false);
    props.setFirstSideIsVisible(true);
    props.newToDisplay(props.setKnownTechcards);
  };
  console.log(isInvalid, isBreak);

  return (
    <>
      {props.isRoundBreak ? (
        <div className={classNames(cx("learning-content-main-buttons"))}>
          <button
            style={{ padding: "1.4rem 9.5rem" }}
            onClick={props.nextRound}
            className={classNames(cx("learning-content-main-buttons-check"))}
          >
            Go to next round
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      ) : (
        <div className={classNames(cx("learning-content-main-type-rewrite"))}>
          <form onSubmit={validateHandler}>
            <div
              className={classNames(
                cx("learning-content-main-type-rewrite-content")
              )}
            >
              <input
                style={{ border: isInvalid ? "1px solid red" : "" }}
                id="rewrite"
                type="text"
                placeholder={
                  props.learningType === 2
                    ? "Rewrite and press check button"
                    : "Write answer and press check button"
                }
              />
              {!isBreak ? (
                <button
                  key={1}
                  type="submit"
                  style={{
                    border: isInvalid ? "1px solid red" : "",
                    color: isInvalid ? "crimson" : "",
                  }}
                  className={classNames(
                    cx("learning-content-main-type-rewrite-default")
                  )}
                >
                  Check
                </button>
              ) : (
                <button
                  key={2}
                  type="button"
                  onClick={goToNextTechcard}
                  style={{
                    border: isInvalid ? "1px solid red" : "",
                    color: isInvalid ? "crimson" : "",
                  }}
                  className={classNames(
                    cx("learning-content-main-type-rewrite-default")
                  )}
                >
                  Next
                </button>
              )}
              {isBreak && isInvalid ? (
                <button
                  type="button"
                  onClick={iWasRightHandler}
                  className={classNames(
                    cx("learning-content-main-type-rewrite-i-was-right")
                  )}
                >
                  I was right!
                </button>
              ) : (
                ""
              )}
            </div>
          </form>

          {props.learningType === 2 ? (
            <label htmlFor="rewrite">Rewrite: {nameToRewrite}</label>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}

export default CasualRewriting;
