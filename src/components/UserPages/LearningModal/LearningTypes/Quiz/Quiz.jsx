import classes from "../../LearningModal.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import QuizList from "./QuizList";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
function Quiz(props) {
  const cx = classNames.bind(classes);

  const [isInvalid, setIsInvalid] = useState(false);
  const [whatButtonIsClicked, setwWhatButtonIsClicked] = useState("");
  const [whenReload, setWhenReload] = useState(1);

  const correctAnswer = props.firstSideIsVisible
    ? props.techcardsToDisplay.secondSides[0]
    : props.techcardsToDisplay.firstSides[0];

  const whatButtonIsClickedHandler = (btn) => {
    setwWhatButtonIsClicked(btn);
  };
  const chooseQuizAnswerHandler = (e) => {
    e.preventDefault();
    const guess = whatButtonIsClicked;
    const allElements = e?.target.quizEl;
    const allButtons = e?.target.quizBtn;

    if (guess === correctAnswer) {
      if (isInvalid) return;
      if (props.whichTechcard !== props.techcardsToDisplay.firstSides.length)
        props.setWhichTechcard(props.whichTechcard + 1);
      else {
        props.newToDisplay(props.setKnownTechcards);
        return props.setListIsFinished(true);
      }

      props.newToDisplay(props.setKnownTechcards);
      props.setTechcardsToDisplay((prevState) => ({
        firstSides: props.firstSides.slice(props.whichTechcard),
        secondSides: props.secondSides.slice(props.whichTechcard),
        images: props.techcardsImages.slice(props.whichTechcard),
        ids: prevState.ids,
      }));
    } else {
      setIsInvalid(true);
      for (const button of allButtons) {
        if (button.value === guess) button.style.color = "crimson";
        if (button.value === correctAnswer) button.style.color = "green";
      }
      for (const element of allElements) {
        if (element.value === guess) element.style.color = "crimson";
        if (element.value === correctAnswer) element.style.color = "green";
      }
    }
  };

  const goToNextTechcard = () => {
    props.newToDisplay(props.setUnknownTechcards);
    setIsInvalid(false);
    setWhenReload(Math.random());
  };
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
        <div className={classNames(cx("learning-content-main-type-quiz"))}>
          {props.firstSides.length === 1 ? (
            <p>You must have at least two cards to continue</p>
          ) : (
            <form onSubmit={chooseQuizAnswerHandler}>
              <QuizList
                listIsFinished={props.listIsFinished}
                whenReload={whenReload}
                goToNextTechcard={goToNextTechcard}
                isInvalid={isInvalid}
                setWhatButtonIsClicked={whatButtonIsClickedHandler}
                firstSides={props.firstSides}
                correctAnswer={correctAnswer}
                secondSides={props.secondSides}
                techcardsToDisplay={props.techcardsToDisplay}
                learningOptions={props.learningOptions}
              />
            </form>
          )}
        </div>
      )}
    </>
  );
}

export default Quiz;
