import { useEffect, useState } from "react";

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
  return minWidth1000 ? (
    <>
      {modalIsVisible ? (
        <div className={classNames(cx("mobile-settings"))}>
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
                  onClick={() => {
                    resetAllTypes();
                    setSelectedTypeIsReviewing(true);
                    setLearningType(1);
                  }}
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
                  onClick={() => {
                    resetAllTypes();
                    setSelectedTypeIsRewriting(true);
                    setLearningType(2);
                  }}
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
                  onClick={() => {
                    resetAllTypes();
                    setSelectedTypeIsQuiz(true);
                    setLearningType(3);
                  }}
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
                  onClick={() => {
                    resetAllTypes();
                    setSelectedTypeIsKnownUnknown(true);
                    setLearningType(4);
                  }}
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
                  onClick={() => {
                    resetAllTypes();
                    setSelectedTypeIsTyping(true);
                    setLearningType(5);
                  }}
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
                  onClick={() => {
                    setReverseOption(!reverseOption);
                    setLearningOptions({ reverse: !reverseOption });
                  }}
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
                  onClick={() => {
                    setRandomOption(!randomOption);
                    setLearningOptions({ random: !randomOption });
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  ) : (
    <footer className={classNames(cx("footer"))}>
      <div className={classNames(cx("footer-icons"))}>
        <div className={classNames(cx("footer-icons-box"))}>
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faMagnifyingGlass}
          />
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faPencil}
          />
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faList}
          />
        </div>
        <div className={classNames(cx("footer-icons-box"))}>
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faLightbulb}
          />
          <img src={writingIcon} />
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faRightLeft}
            flip={iconReverseFlip ? "vertical" : ""}
            onClick={() => {
              setIconReverseFlip(!iconReverseFlip);
            }}
          />
          <FontAwesomeIcon
            className={classNames(cx("footer-icon"))}
            icon={faRandom}
          />
        </div>
      </div>
      <div className={classNames(cx("footer-logo"))}>
        <img src={logo} alt="logo" />
      </div>
    </footer>
  );
}

export default LearningModalSettings;
