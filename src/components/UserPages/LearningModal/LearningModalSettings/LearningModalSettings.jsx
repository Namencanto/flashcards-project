import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classes from "./LearningModalSettings.module.scss";
import classNames from "classnames/bind";
import {
  faX,
  faRandom,
  faRightLeft,
  faMagnifyingGlass,
  faPencil,
  faList,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../images/logo-purple.svg";
import writingIcon from "../../../../images/writing-icon.svg";
import writingIconActive from "../../../../images/writing-icon-active.svg";
import MediaQueries from "../../../../HelperComponents/MediaQueries";

function LearningModalSettings({
  modalIsVisible,
  closePopup,
  setLearningType,
  setLearningOptions,
}) {
  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();
  const [iconReverseFlip, setIconReverseFlip] = useState(false);
  const [reverseOption, setReverseOption] = useState(false);
  const [randomOption, setRandomOption] = useState(false);

  const [selectedTypeIsReviewing, setSelectedTypeIsReviewing] = useState(false);
  const [selectedTypeIsRewriting, setSelectedTypeIsRewriting] = useState(false);
  const [selectedTypeIsQuiz, setSelectedTypeIsQuiz] = useState(false);
  const [selectedTypeIsKnownUnknown, setSelectedTypeIsKnownUnknown] =
    useState(true);
  const [selectedTypeIsTyping, setSelectedTypeIsTyping] = useState(false);

  const resetAllTypes = () => {
    setSelectedTypeIsReviewing(false);
    setSelectedTypeIsRewriting(false);
    setSelectedTypeIsQuiz(false);
    setSelectedTypeIsKnownUnknown(false);
    setSelectedTypeIsTyping(false);
  };

  const setLearningTypeReview = () => {
    resetAllTypes();
    setSelectedTypeIsReviewing(true);
    setLearningType(1);
  };
  const setLearningTypeRewrite = () => {
    resetAllTypes();
    setSelectedTypeIsRewriting(true);
    setLearningType(2);
  };
  const setLearningTypeQuiz = () => {
    resetAllTypes();
    setSelectedTypeIsQuiz(true);
    setLearningType(3);
  };
  const setLearningTypeKnownUnknown = () => {
    resetAllTypes();
    setSelectedTypeIsKnownUnknown(true);
    setLearningType(4);
  };
  const setLearningTypeTyping = () => {
    resetAllTypes();
    setSelectedTypeIsTyping(true);
    setLearningType(5);
  };
  const setLearningOptionReverse = () => {
    setIconReverseFlip(!iconReverseFlip);
    setReverseOption(!reverseOption);
    setLearningOptions({ reverse: !reverseOption });
  };
  const setLearningOptionRandom = () => {
    setRandomOption(!randomOption);
    setLearningOptions({ random: !randomOption });
  };

  return minWidth1000 ? (
    <>
      {modalIsVisible ? (
        <>
          <div
            onClick={closePopup}
            className={classNames(cx("mobile-settings"))}
          ></div>
          <div className={classNames(cx("mobile-settings-content"))}>
            <div className={classNames(cx("mobile-settings-content-header"))}>
              <h2>Learning settings</h2>
              <FontAwesomeIcon icon={faX} onClick={closePopup} />
            </div>
            <div className={classNames(cx("mobile-settings-content-body"))}>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="casualReviewing">
                    <h3>Casual reviewing</h3>
                    <p>
                      Is used to get familiar with the content, does not affect
                      to statistics
                    </p>
                  </label>
                </div>
                <input
                  id="casualReviewing"
                  name="type"
                  type="radio"
                  checked={selectedTypeIsReviewing}
                  onClick={setLearningTypeReview}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faPencil} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="casualRewriting">
                    <h3>Casual rewriting</h3>
                    <p>
                      Is used to get familiar with the content by transcribing
                      it, does not affect statistics
                    </p>
                  </label>
                </div>
                <input
                  id="casualRewriting"
                  name="type"
                  type="radio"
                  checked={selectedTypeIsRewriting}
                  onClick={setLearningTypeRewrite}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faList} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="quiz">
                    <h3>Quiz</h3>
                    <p>
                      Is used to learn the content by quiz, does not affect
                      statistics
                    </p>
                  </label>
                </div>
                <input
                  id="quiz"
                  name="type"
                  type="radio"
                  checked={selectedTypeIsQuiz}
                  onClick={setLearningTypeQuiz}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faLightbulb} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="knowUnknown">
                    <h3>I know / I don't know</h3>
                    <p>
                      Is used to learn through self-assessment, an extremely
                      effective way of teaching
                    </p>
                  </label>
                </div>
                <input
                  id="knowUnknown"
                  name="type"
                  type="radio"
                  checked={selectedTypeIsKnownUnknown}
                  onClick={setLearningTypeKnownUnknown}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <img src={writingIcon} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="typing">
                    <h3>Typing</h3>
                    <p>Is used to teach correct writing</p>
                  </label>
                </div>
                <input
                  id="typing"
                  name="type"
                  type="radio"
                  checked={selectedTypeIsTyping}
                  onClick={setLearningTypeTyping}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faRightLeft} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="reverse">
                    <h3>Reverse techcards</h3>
                    <p>Learn in reverse order</p>
                  </label>
                </div>
                <input
                  id="reverse"
                  type="checkbox"
                  checked={reverseOption}
                  onClick={setLearningOptionReverse}
                ></input>
              </div>
              <div
                className={classNames(
                  cx("mobile-settings-content-body-option")
                )}
              >
                <FontAwesomeIcon icon={faRandom} />
                <div
                  className={classNames(
                    cx("mobile-settings-content-body-option-text")
                  )}
                >
                  <label htmlFor="random">
                    <h3>Random techcards</h3>
                    <p>Learn in random order</p>
                  </label>
                </div>
                <input
                  id="random"
                  type="checkbox"
                  checked={randomOption}
                  onClick={setLearningOptionRandom}
                ></input>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  ) : (
    <footer className={classNames(cx("footer"))}>
      <div className={classNames(cx("footer-icons"))}>
        <div
          style={{ display: "flex" }}
          className={classNames(cx("footer-icons-box"))}
        >
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-left">
              Is used to get familiar with the content, does not affect to
              statistics
            </p>
            <FontAwesomeIcon
              className={classNames(cx("footer-icon"), "tooltip-hover")}
              icon={faMagnifyingGlass}
              style={{ color: !selectedTypeIsReviewing ? "#888" : "#555" }}
              onClick={setLearningTypeReview}
            />
          </div>
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-left">
              Is used to learn the content by quiz, does not affect statistics
            </p>
            <FontAwesomeIcon
              className={classNames(cx("footer-icon"))}
              icon={faPencil}
              style={{ color: !selectedTypeIsRewriting ? "#888" : "#555" }}
              onClick={setLearningTypeRewrite}
            />
          </div>
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-left">
              Is used to learn the content by quiz, does not affect statistics
            </p>
            <FontAwesomeIcon
              className={classNames(cx("footer-icon"))}
              icon={faList}
              style={{ color: !selectedTypeIsQuiz ? "#888" : "#555" }}
              onClick={setLearningTypeQuiz}
            />
          </div>
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-middle">
              Is used to learn through self-assessment, an extremely effective
              way of teaching
            </p>

            <FontAwesomeIcon
              className={classNames(cx("footer-icon"))}
              icon={faLightbulb}
              style={{ color: !selectedTypeIsKnownUnknown ? "#888" : "#555" }}
              onClick={setLearningTypeKnownUnknown}
            />
          </div>
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-middle">
              Is used to teach correct writing
            </p>
            <img
              src={!selectedTypeIsTyping ? writingIconActive : writingIcon}
              onClick={setLearningTypeTyping}
            />
          </div>
        </div>

        <div
          style={{ display: "flex" }}
          className={classNames(cx("footer-icons-box"))}
        >
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-middle">
              Learn in reverse order
            </p>
            <FontAwesomeIcon
              className={classNames(cx("footer-icon"))}
              icon={faRightLeft}
              flip={iconReverseFlip ? "vertical" : ""}
              onClick={setLearningOptionReverse}
              style={{ color: !reverseOption ? "#888" : "#555" }}
            />
          </div>
          <div className="tooltip-cloud">
            <p className="tooltip tooltip-bottom-middle">
              Learn in random order
            </p>
            <FontAwesomeIcon
              className={classNames(cx("footer-icon"))}
              onClick={setLearningOptionRandom}
              icon={faRandom}
              style={{ color: !randomOption ? "#888" : "#555" }}
            />
          </div>
        </div>
      </div>

      <div className={classNames(cx("footer-logo"))}>
        <img src={logo} alt="logo" />
      </div>
    </footer>
  );
}

export default LearningModalSettings;
