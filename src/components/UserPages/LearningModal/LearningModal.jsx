import "../../../assets/Global.scss";

import classes from "./LearningModal.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LearningModalStatusBar from "./StatusBar/LearningModalStatusBar";
import { faVolumeUp, faX, faGear } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useRef, useEffect } from "react";
import LearningModalTimer from "./LearningModalTimer";

import {
  sendKnownTechcardToChange,
  sendUnknownTechcardToChange,
} from "./LearningModalBackendFunctions";

import LearningModalSettings from "./LearningModalSettings/LearningModalSettings";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import CasualReviewing from "./LearningTypes/CasualReviewing";
import WritingTypes from "./LearningTypes/WritingTypes";
import IKnowIDontKnow from "./LearningTypes/IKnowIDontKnow";
import Quiz from "./LearningTypes/Quiz/Quiz";

import { RepetitionsContext } from "../../../context/RepetitionsContext";
import { useOptions } from "./LearningModalSettings/useOptions";
function LearningModal(props) {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  const { fetchRepetitions } = useContext(RepetitionsContext);

  // * MAIN STATES
  const [learningOptions, setLearningOptions] = useState({
    reverse: false,
    random: false,
  });

  const { firstSides, secondSides, techcardsIDS, techcardsImages, listTitle } =
    props.techcardsInfo;

  const [techcardsToDisplay, setTechcardsToDisplay] = useState({
    firstSides: firstSides,
    secondSides,
    images: techcardsImages,
    ids: techcardsIDS,
  });
  const [knownTechcards, setKnownTechcards] = useState({
    firstSides: [],
    secondSides: [],
    images: [],
    ids: [],
  });
  const [unknownTechcards, setUnknownTechcards] = useState({
    firstSides: [],
    secondSides: [],
    images: [],
    ids: [],
  });
  const [round, setRound] = useState(1);
  const [whichTechcard, setWhichTechcard] = useState(1);
  const [learningTechcardsStatus, setLearningTechcardsStatus] = useState({
    all: firstSides.length,
    known: 0,
    unknown: 0,
  });
  const [firstSideIsVisible, setFirstSideIsVisible] = useState(true);
  const [roundLength, setRoundLength] = useState(firstSides.length);
  const [isRoundBreak, setIsRoundBreak] = useState(false);
  const [listIsFinished, setListIsFinished] = useState(false);
  const [roundsStatistics, setRoundsStatistics] = useState({
    effectiveness: [],
    times: [],
  });
  const [allSendedTechcards, setAllSendedTechcards] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [learningType, setLearningType] = useState(4);

  // * TIMER STATES
  const [time, setTime] = useState(0);
  const [roundTimes, setRoundTimes] = useState([]);

  // * SOUND STATES
  const [disableSpeechButton, setDisableSpeechButton] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  const speechHandler = (text) => {
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };

  const learningRef = useRef();
  const contentLearningRef = useRef();

  // * OPTIONS LOGIC
  // HOOK FOR MANIPULATE OPTIONS
  useOptions(learningOptions, techcardsToDisplay, setTechcardsToDisplay);
  // HANDLERS
  const setLearningTypeHandler = (type) => {
    setLearningType(type);
  };
  const setLearningOptionsHandler = (options) => {
    setLearningOptions((prevState) => ({
      reverse: options.hasOwnProperty("reverse")
        ? options.reverse
        : prevState.reverse,
      random: options.hasOwnProperty("random")
        ? options.random
        : prevState.random,
    }));
  };

  ////////////////////////////////////////////////

  // * ALL USE EFFECTS
  useEffect(() => {
    if (props.learningModalIsVisible) {
      setTimeout(() => {
        learningRef.current.style.opacity = 0.8;
        contentLearningRef.current.style.opacity = 1;
        contentLearningRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
      });
    }
  }, [props.learningModalIsVisible]);
  useEffect(() => {
    if (learningType === 4 || learningType === 5) {
      let isSended = false;
      const lastUnknowedId =
        unknownTechcards.ids[unknownTechcards.ids.length - 1];

      const lastKnowedId = knownTechcards.ids[knownTechcards.ids.length - 1];
      if (lastKnowedId) {
        sendKnownTechcardToChange(lastKnowedId, round, fetchRepetitions);
      }
      for (const sendedTechcard of allSendedTechcards) {
        if (sendedTechcard === lastUnknowedId) isSended = true;
      }
      if (lastUnknowedId && !isSended) {
        setAllSendedTechcards([...allSendedTechcards, lastUnknowedId]);
        sendUnknownTechcardToChange(lastUnknowedId, round, fetchRepetitions);
      }
    }
  }, [unknownTechcards, knownTechcards]);
  useEffect(() => {
    // * SET LIST IS FINISHED IF ALL TECHCARDS IS KNOWN

    if (
      listIsFinished !== true &&
      learningTechcardsStatus.unknown === 0 &&
      learningTechcardsStatus.known >= roundLength
    ) {
      setListIsFinished(true);
    }
  }, [
    setListIsFinished,
    learningTechcardsStatus.unknown,
    learningTechcardsStatus.known,
    roundLength,
  ]);

  const exitPopupAnimation = () => {
    learningRef.current.style.opacity = 0;
    contentLearningRef.current.style.opacity = 0;
    contentLearningRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      props.hideLearningModal();
    }, 200);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // * TIMER HANDLERS
  const collectRoundTime = (timeFromTimer) => {
    setTime(timeFromTimer);
    if (isRoundBreak === true) {
      // if is more than one el in roundtime then sum all el without last and subtract from last timer value
      if (roundTimes.length >= 1) {
        let roundTimesSum = 0;
        roundTimes.forEach((roundTime, i) => {
          if (i === roundTimes.length) return;
          roundTimesSum += roundTime;
        });
        const actualRoundTime = timeFromTimer - roundTimesSum;
        return setRoundTimes([...roundTimes, actualRoundTime]);
      } else {
        return setRoundTimes([...roundTimes, timeFromTimer]);
      }
    }
  };
  const stopTimerForRoundBreak = () => {
    return !isRoundBreak;
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  // * SET NEXT ROUND FUNCTION
  const nextRound = () => {
    const clearedObject = {
      firstSides: [],
      secondSides: [],
      images: [],
      ids: [],
    };

    // SET NEW TECHCARDS TO DISPLAY AND ROUND LENGTH AS EARLIER UNKNOWN TECHCARDS
    setTechcardsToDisplay({
      firstSides: unknownTechcards.firstSides,
      secondSides: unknownTechcards.secondSides,
      images: unknownTechcards.images,
      ids: unknownTechcards.ids,
    });
    setRoundLength(unknownTechcards.firstSides.length);

    // CLEAR UNKNOWN AND KNOWN ARRAYS
    setUnknownTechcards(clearedObject);
    setKnownTechcards(clearedObject);

    // SET NEXT ROUND NUMBER
    setRound(round + 1);

    // RESET WHICH TECHCARD NUMBER AND PROGRESS BAR
    setWhichTechcard(1);
    setLearningTechcardsStatus({
      all: unknownTechcards.firstSides.length,
      unknown: 0,
      known: 0,
    });

    // SET ROUND STATISTICS
    setRoundsStatistics((prevState) => ({
      effectiveness: [
        ...prevState.effectiveness,
        Math.round(
          (knownTechcards.firstSides.length /
            (knownTechcards.firstSides.length +
              unknownTechcards.firstSides.length)) *
            100
        ),
      ],
      times: [...prevState.times],
    }));

    // EXIT FROM ROUND BREAK
    setIsRoundBreak(false);
  };

  //////////////////////////

  // * DISPLAY NEW TECHCARD FUNCTION
  const newToDisplay = (setTechcards) => {
    props.statsAdd(
      setTechcards === setUnknownTechcards,
      setTechcards === setKnownTechcards,
      time,
      techcardsToDisplay.ids[0]
    );
    // IF ROUND LENGTH IS NOT ONLY ONE AND IF WHICHTECHCARD IS NOT LAST OF ROUND LENGTH
    if (roundLength !== 1 && roundLength !== whichTechcard) {
      setWhichTechcard(whichTechcard + 1);
    }
    // IF TECHCARD IS LAST SET ROUND BREAK
    if (roundLength === whichTechcard) {
      setIsRoundBreak(true);
    }

    // SET ACTUAL TECHCARD TO KNOWN OR UNKNOWN PROGRESS BAR STATUS
    setLearningTechcardsStatus((prevState) => ({
      ...prevState,
      unknown:
        setTechcards === setUnknownTechcards
          ? prevState.unknown + 1
          : prevState.unknown,
      known:
        setTechcards === setKnownTechcards
          ? prevState.known + 1
          : prevState.known,
    }));

    // SET ACTUAL TECHCARD TO KNOWN OR UNKNOWN ARR
    setTechcards((prevState) => ({
      firstSides: [...prevState.firstSides, techcardsToDisplay.firstSides[0]],
      secondSides: [
        ...prevState.secondSides,
        techcardsToDisplay.secondSides[0],
      ],
      images: [...prevState.images, techcardsToDisplay.images[0]],
      ids: [...prevState.ids, techcardsToDisplay.ids[0]],
    }));

    // DISPLAY NEXT
    setTechcardsToDisplay({
      firstSides: techcardsToDisplay.firstSides.slice(1),
      secondSides: techcardsToDisplay.secondSides.slice(1),
      images: techcardsToDisplay.images.slice(1),
      ids: techcardsToDisplay.ids.slice(1),
    });

    if (whichTechcard === firstSides.length) {
      setRoundsStatistics((prevState) => ({
        effectiveness: [
          ...prevState.effectiveness,
          Math.round(
            (knownTechcards.firstSides.length /
              (knownTechcards.firstSides.length +
                unknownTechcards.firstSides.length)) *
              100
          ),
        ],
        times: [...prevState.times],
      }));
    }
  };

  return (
    <>
      <div
        onClick={exitPopupAnimation}
        ref={learningRef}
        className={classNames(cx("learning"))}
      ></div>
      <div className={classNames(cx("learning-container"))}>
        <div
          ref={contentLearningRef}
          className={classNames(cx("learning-content"))}
        >
          {/* HEADER */}
          <header className={classNames(cx("learning-content-header"))}>
            {props.listImage ? (
              <img src={props.listImage} alt="list illustration" />
            ) : (
              ""
            )}

            <div style={{ textAlign: "center" }}>
              <span>
                {whichTechcard}/{roundLength} | Round {round}
              </span>
              <LearningModalStatusBar
                all={learningTechcardsStatus.all}
                unknown={learningTechcardsStatus.unknown}
                known={learningTechcardsStatus.known}
              />
            </div>
            {minWidth1000 ? (
              <FontAwesomeIcon
                onClick={() => {
                  setModalIsVisible(true);
                }}
                className={classNames(
                  cx("learning-content-header-icon-setting")
                )}
                icon={faGear}
              />
            ) : (
              ""
            )}
            <LearningModalTimer
              setTime={setTime}
              stopTimer={stopTimerForRoundBreak}
              giveRoundTime={collectRoundTime}
            />

            <FontAwesomeIcon
              onClick={exitPopupAnimation}
              className={classNames(cx("learning-content-header-icon"))}
              icon={faX}
            />
          </header>
          {/* MAIN CONTENT */}
          <div className={classNames(cx("learning-content-main"))}>
            <div className={classNames(cx("learning-content-main-title"))}>
              <h1>{listTitle}</h1>
            </div>
            {listIsFinished ? (
              <div
                className={classNames(cx("learning-content-main-round-info"))}
              >
                <h3>Congratulation</h3>
                <p>
                  <br /> You ended in {round}
                  {round > 1 ? " rounds" : " round"}
                </p>
                <p>
                  Effectiveness:{" "}
                  {(
                    roundsStatistics.effectiveness.reduce((a, b) => a + b) /
                    roundsStatistics.effectiveness.length
                  ).toFixed(2)}
                  %
                </p>
                <p>
                  Time: {new Date(time * 1000).toISOString().substring(14, 19)}
                </p>
              </div>
            ) : isRoundBreak ? (
              <div
                className={classNames(cx("learning-content-main-round-info"))}
              >
                <p>End of {round} round</p>
                <p>
                  effectiveness{" "}
                  {Math.round(
                    (knownTechcards.firstSides.length /
                      (knownTechcards.firstSides.length +
                        unknownTechcards.firstSides.length)) *
                      100
                  )}
                  %
                </p>
                <p>
                  time:{" "}
                  {roundTimes[roundTimes.length - 1]
                    ? new Date(roundTimes[roundTimes.length - 1] * 1000)
                        .toISOString()
                        .substring(14, 19)
                    : ""}
                </p>
              </div>
            ) : (
              <>
                <div
                  className={classNames(
                    cx("learning-content-main-illustration")
                  )}
                >
                  {techcardsToDisplay.images[0] ? (
                    <img
                      src={techcardsToDisplay.images[0]}
                      alt="techcard illustration"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className={classNames(cx("learning-content-main-name"))}>
                  <p>
                    {firstSideIsVisible
                      ? techcardsToDisplay.firstSides[0]
                      : techcardsToDisplay.secondSides[0]}
                  </p>
                  <FontAwesomeIcon
                    icon={faVolumeUp}
                    onClick={() => {
                      if (!disableSpeechButton) {
                        setDisableSpeechButton(true);
                        speechHandler(
                          firstSideIsVisible
                            ? techcardsToDisplay.firstSides[0]
                            : techcardsToDisplay.secondSides[0]
                        );
                        setTimeout(() => {
                          setDisableSpeechButton(false);
                        }, 1000);
                      }
                    }}
                  />
                </div>
              </>
            )}
            <>
              {!listIsFinished ? (
                <>
                  {learningType === 1 ? (
                    <CasualReviewing
                      setFirstSideIsVisible={setFirstSideIsVisible}
                      newToDisplay={newToDisplay}
                      setUnknownTechcards={setUnknownTechcards}
                      setKnownTechcards={setKnownTechcards}
                      setWhichTechcard={setWhichTechcard}
                      whichTechcard={whichTechcard}
                      firstSides={firstSides}
                      secondSides={secondSides}
                      setTechcardsToDisplay={setTechcardsToDisplay}
                      techcardsToDisplay={techcardsToDisplay}
                      techcardsImages={techcardsImages}
                      firstSideIsVisible={firstSideIsVisible}
                    />
                  ) : learningType === 2 || learningType === 5 ? (
                    <WritingTypes
                      learningType={learningType}
                      setFirstSideIsVisible={setFirstSideIsVisible}
                      newToDisplay={newToDisplay}
                      setUnknownTechcards={setUnknownTechcards}
                      setKnownTechcards={setKnownTechcards}
                      setWhichTechcard={setWhichTechcard}
                      whichTechcard={whichTechcard}
                      firstSides={firstSides}
                      secondSides={secondSides}
                      setTechcardsToDisplay={setTechcardsToDisplay}
                      techcardsToDisplay={techcardsToDisplay}
                      techcardsImages={techcardsImages}
                      firstSideIsVisible={firstSideIsVisible}
                      setListIsFinished={setListIsFinished}
                      listIsFinished={listIsFinished}
                      isRoundBreak={isRoundBreak}
                      nextRound={nextRound}
                    />
                  ) : learningType === 3 ? (
                    <Quiz
                      newToDisplay={newToDisplay}
                      setUnknownTechcards={setUnknownTechcards}
                      setKnownTechcards={setKnownTechcards}
                      setWhichTechcard={setWhichTechcard}
                      whichTechcard={whichTechcard}
                      firstSides={firstSides}
                      secondSides={secondSides}
                      setTechcardsToDisplay={setTechcardsToDisplay}
                      techcardsToDisplay={techcardsToDisplay}
                      techcardsImages={techcardsImages}
                      firstSideIsVisible={firstSideIsVisible}
                      setListIsFinished={setListIsFinished}
                      listIsFinished={listIsFinished}
                      isRoundBreak={isRoundBreak}
                      nextRound={nextRound}
                      learningOptions={learningOptions}
                    />
                  ) : learningType === 4 ? (
                    <IKnowIDontKnow
                      firstSideIsVisible={firstSideIsVisible}
                      isRoundBreak={isRoundBreak}
                      nextRound={nextRound}
                      setFirstSideIsVisible={setFirstSideIsVisible}
                      newToDisplay={newToDisplay}
                      setUnknownTechcards={setUnknownTechcards}
                      setKnownTechcards={setKnownTechcards}
                    />
                  ) : (
                    ""
                  )}
                </>
              ) : (
                <div
                  className={classNames(cx("learning-content-main-buttons"))}
                >
                  <button
                    className={classNames(
                      cx("learning-content-main-buttons-default")
                    )}
                  >
                    Try again
                  </button>
                  <button
                    onClick={exitPopupAnimation}
                    className={classNames(
                      cx("learning-content-main-buttons-default")
                    )}
                  >
                    Back to list
                  </button>
                </div>
              )}
            </>
          </div>

          {/*  FOOTER SETTINGS OR MOBILE MODAL SETTINGS*/}
          <LearningModalSettings
            modalIsVisible={modalIsVisible}
            closePopup={() => {
              setModalIsVisible(false);
            }}
            setLearningType={setLearningTypeHandler}
            setLearningOptions={setLearningOptionsHandler}
          />
        </div>
      </div>
    </>
  );
}

export default LearningModal;
