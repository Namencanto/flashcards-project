import "../../../assets/Global.scss";

import classes from "./LearningModal.module.scss";
import classNames from "classnames/bind";

import { useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LearningModalStatusBar from "./StatusBar/LearningModalStatusBar";
import {
  faVolumeUp,
  faX,
  faThumbsUp,
  faThumbsDown,
  faEye,
  faArrowRight,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import LearningModalTimer from "./LearningModalTimer";

import {
  sendKnowedTechcardToChange,
  sendUnknowedTechcardToChange,
} from "./LearningModalBackendFunctions";
import LearningModalSettings from "./LearningModalSettings/LearningModalSettings";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import CasualReviewing from "./LearningTypes/CasualReviewing";
import CasualRewriting from "./LearningTypes/CasualRewriting";
import IKnowIDontKnow from "./LearningTypes/IKnowIDontKnow";
import Quiz from "./LearningTypes/Quiz";
import Typing from "./LearningTypes/Typing";

function LearningModal(props) {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);
  const { firstSides, secondSides, techcardsIDS, techcardsImages, listTitle } =
    props.techcardsInfo;

  // * DYNAMIC STATES FOR LEARNING ITSELF
  const [techcardsToDisplay, setTechcardsToDisplay] = useState({
    firstSides,
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
  console.log(techcardsToDisplay);
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
  const [time, setTime] = useState(0);
  const [roundTimes, setRoundTimes] = useState([]);

  const [allSendedTechcards, setAllSendedTechcards] = useState([]);

  // *

  const learningRef = useRef();
  const contentLearningRef = useRef();

  // SOUNDS LOGIC
  const [disableSpeechButton, setDisableSpeechButton] = useState(false);
  const msg = new SpeechSynthesisUtterance();
  const speechHandler = (text) => {
    msg.text = text;
    window.speechSynthesis.speak(msg);
  };
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const closePopupHandler = () => {
    setModalIsVisible(false);
  };
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
    let isSended = false;
    const lastUnknowedId =
      unknownTechcards.ids[unknownTechcards.ids.length - 1];

    const lastKnowedId = knownTechcards.ids[knownTechcards.ids.length - 1];
    if (lastKnowedId) {
      sendKnowedTechcardToChange(lastKnowedId, round);
    }
    for (const sendedTechcard of allSendedTechcards) {
      if (sendedTechcard === lastUnknowedId) isSended = true;
    }
    if (lastUnknowedId && !isSended) {
      setAllSendedTechcards([...allSendedTechcards, lastUnknowedId]);
      sendUnknowedTechcardToChange(lastUnknowedId, round);
    }
  }, [unknownTechcards, knownTechcards]);

  const exitPopupAnimation = () => {
    learningRef.current.style.opacity = 0;
    contentLearningRef.current.style.opacity = 0;
    contentLearningRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      props.hideLearningModal();
    }, 200);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const collectTime = (timeFromTimer) => {
    setTime(timeFromTimer);
  };
  const collectRoundTime = (timeFromTimer) => {
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

  // * SET LIST IS FINISHED IF ALL TECHCARDS IS KNOWED
  if (
    listIsFinished !== true &&
    learningTechcardsStatus.unknown === 0 &&
    learningTechcardsStatus.known >= roundLength
  ) {
    setListIsFinished(true);
  }

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
  const [learningType, setLearningType] = useState(4);
  const setLearningTypeHandler = (type) => {
    setLearningType(type);
  };
  const [learningOptions, setLearningOptions] = useState({
    reverse: false,
    random: false,
  });
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
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVUniuRf_sQs4iiCO_BVeDoQoRNA0tFew4Yg&usqp=CAU"
              alt="list illustration"
            />
            <div>
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
              stopTimer={stopTimerForRoundBreak}
              giveTime={collectTime}
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
              <>
                <p>
                  Congratulation. You ended in {round}
                  {round > 1 ? " rounds" : " round"}
                </p>
                <p>
                  Effectiveness:{" "}
                  {roundsStatistics.effectiveness.reduce((a, b) => a + b) /
                    roundsStatistics.effectiveness.length}
                  %
                </p>
                <p>{time}</p>
              </>
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
                  <img
                    src={techcardsToDisplay.images[0]}
                    alt="techcard illustration"
                  />
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
              {/* LEARNING TYPE */}
              {learningType === 1 ? (
                <CasualReviewing />
              ) : learningType === 2 ? (
                <CasualRewriting />
              ) : learningType === 3 ? (
                <Quiz />
              ) : learningType === 4 ? (
                <IKnowIDontKnow />
              ) : learningType === 5 ? (
                <Typing />
              ) : (
                ""
              )}

              {!listIsFinished ? (
                <>
                  {firstSideIsVisible ? (
                    <div
                      className={classNames(
                        cx("learning-content-main-buttons")
                      )}
                    >
                      <button
                        style={{ padding: "1.4rem 9.5rem" }}
                        onClick={() => {
                          if (isRoundBreak) {
                            nextRound();
                          } else setFirstSideIsVisible(false);
                        }}
                        className={classNames(
                          cx("learning-content-main-buttons-check")
                        )}
                      >
                        {isRoundBreak ? "Go to next round" : "Check answer"}
                        <FontAwesomeIcon
                          icon={isRoundBreak ? faArrowRight : faEye}
                        />
                      </button>
                    </div>
                  ) : (
                    <div
                      className={classNames(
                        cx("learning-content-main-buttons")
                      )}
                    >
                      <button
                        onClick={() => {
                          setFirstSideIsVisible(true);
                          newToDisplay(setUnknownTechcards);
                        }}
                        className={classNames(
                          cx("learning-content-main-buttons-unknow")
                        )}
                      >
                        <FontAwesomeIcon icon={faThumbsDown} />I don't know
                      </button>
                      <button
                        onClick={() => {
                          setFirstSideIsVisible(true);

                          newToDisplay(setKnownTechcards);
                        }}
                        className={classNames(
                          cx("learning-content-main-buttons-know")
                        )}
                      >
                        I know
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <button className="btn-solid-medium">Try again</button>
                  <button
                    onClick={exitPopupAnimation}
                    className="btn-solid-medium"
                  >
                    Back to list
                  </button>
                </>
              )}
            </>
          </div>

          {/*  FOOTER SETTINGS OR MOBILE MODAL SETTINGS*/}
          <LearningModalSettings
            modalIsVisible={modalIsVisible}
            closePopup={closePopupHandler}
            setLearningType={setLearningTypeHandler}
            setLearningOptions={setLearningOptionsHandler}
          />
        </div>
      </div>
    </>
  );
}

export default LearningModal;
