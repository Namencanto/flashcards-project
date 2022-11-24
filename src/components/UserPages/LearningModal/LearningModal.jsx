import "../../../assets/Global.scss";

import classes from "./LearningModal.module.scss";
import classNames from "classnames/bind";

import { useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LearningModalStatusBar from "./LearningModalStatusBar/LearningModalStatusBar";
import {
  faSquare,
  faX,
  faGear,
  faRandom,
  faRightLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import logo from "../../../images/logo-purple.svg";

function LearningModal(props) {
  const cx = classNames.bind(classes);

  const { firstSides, secondSides, techcardsIDS, techcardsImages, listTitle } =
    props.techcardsInfo;

  // * DYNAMIC STATES FOR LEARNING ITSELF
  const [round, setRound] = useState(1);
  const [whichTechcard, setWhichTechcard] = useState(0);
  const [learningTechcardsStatus, setLearningTechcardsStatus] = useState({
    all: firstSides.length,
    known: 0,
    unknown: 0,
  });
  const [firstSideIsVisible, setFirstSideIsVisible] = useState(true);

  const [knownCounter, setKnownCounter] = useState(0);
  const [unknownCounter, setUnknownCounter] = useState(0);

  // *

  const [iconReverseFlip, setIconReverseFlip] = useState(false);

  const learningRef = useRef();
  const contentLearningRef = useRef();

  useEffect(() => {
    if (props.learningModalIsVisible) {
      setTimeout(() => {
        learningRef.current.style.opacity = 0.8;

        contentLearningRef.current.style.opacity = 1;
        contentLearningRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
      });
    }
  }, [props.learningModalIsVisible]);

  const exitPopupAnimation = () => {
    learningRef.current.style.opacity = 0;

    contentLearningRef.current.style.opacity = 0;
    contentLearningRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      props.hideLearningModal();
    }, 200);
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
                {whichTechcard + 1}/{firstSides.length} | Round {round}
              </span>
              <LearningModalStatusBar
                all={learningTechcardsStatus.all}
                unknown={learningTechcardsStatus.unknown}
                known={learningTechcardsStatus.known}
              />
            </div>
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

            {learningTechcardsStatus.known >= firstSides.length ? (
              <p>
                Congratulation. You ended in {round}
                {round > 1 ? " rounds" : " round"}, 4:21 min,
              </p>
            ) : (
              <>
                <div
                  className={classNames(
                    cx("learning-content-main-illustration")
                  )}
                >
                  <img
                    src={techcardsImages[whichTechcard]}
                    alt="techcard illustration"
                  />
                </div>
                <p>
                  {firstSideIsVisible
                    ? firstSides[whichTechcard]
                    : secondSides[whichTechcard]}
                </p>
              </>
            )}

            <div className={classNames(cx("learning-content-main-buttons"))}>
              {/* BUTTONS */}

              {learningTechcardsStatus.known <= firstSides.length ? (
                <>
                  {firstSideIsVisible ? (
                    <button
                      onClick={() => {
                        setFirstSideIsVisible(false);
                      }}
                      className="btn-solid-medium"
                    >
                      Check answer
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setUnknownCounter(techcardsIDS[whichTechcard]);
                          setWhichTechcard(whichTechcard + 1);
                          setFirstSideIsVisible(true);
                          setLearningTechcardsStatus((prevState) => ({
                            ...prevState,
                            unknown: prevState.unknown + 1,
                          }));
                          if (whichTechcard + 1 === firstSides.length) {
                            setRound(round + 1);
                            setWhichTechcard(learningTechcardsStatus.known);
                            setLearningTechcardsStatus((prevState) => ({
                              ...prevState,
                              unknown: 0,
                            }));
                          }
                        }}
                        className="btn-solid-medium"
                      >
                        I don't know
                      </button>
                      <button
                        onClick={() => {
                          setKnownCounter(techcardsIDS[whichTechcard]);
                          setWhichTechcard(whichTechcard + 1);
                          setFirstSideIsVisible(true);
                          setLearningTechcardsStatus((prevState) => ({
                            ...prevState,
                            known: prevState.known + 1,
                          }));
                          if (whichTechcard + 1 === firstSides.length) {
                            setRound(round + 1);
                            setWhichTechcard(learningTechcardsStatus.known);
                            setLearningTechcardsStatus((prevState) => ({
                              ...prevState,
                              unknown: 0,
                            }));
                          }
                        }}
                        className="btn-solid-medium"
                      >
                        I know
                      </button>
                    </>
                  )}
                </>
              ) : (
                <>
                  <button className="btn-solid-medium">Statistics</button>
                  <button className="btn-solid-medium">Try again</button>
                </>
              )}
            </div>
          </div>

          {/*  FOOTER */}
          <footer className={classNames(cx("learning-content-footer"))}>
            <div className={classNames(cx("learning-content-footer-icons"))}>
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faSquare}
              />
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faSquare}
              />
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faSquare}
              />
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faRightLeft}
                flip={iconReverseFlip ? "vertical" : ""}
                onClick={() => {
                  setIconReverseFlip(!iconReverseFlip);
                }}
              />
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faRandom}
              />
              <FontAwesomeIcon
                className={classNames(cx("learning-content-footer-icon"))}
                icon={faGear}
              />
            </div>
            <div className={classNames(cx("learning-content-footer-logo"))}>
              <img src={logo} alt="logo" />
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default LearningModal;

{
  /* <FeaturesPopup
hide={setPopupIsUnvisibleHandler}
image={props.image}
title={props.title}
popupIsVisible={popupIsVisible}
/>, */
}
