import classes from "../LearningModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import {
  faThumbsUp,
  faThumbsDown,
  faEye,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
function IKnowIDontKnow(props) {
  const cx = classNames.bind(classes);

  return (
    <>
      {props.firstSideIsVisible ? (
        <div className={classNames(cx("learning-content-main-buttons"))}>
          <button
            style={{ padding: "1.4rem 9.5rem" }}
            onClick={() => {
              if (props.isRoundBreak) {
                props.nextRound();
              } else props.setFirstSideIsVisible(false);
            }}
            className={classNames(cx("learning-content-main-buttons-check"))}
          >
            {props.isRoundBreak ? "Go to next round" : "Check answer"}
            <FontAwesomeIcon icon={props.isRoundBreak ? faArrowRight : faEye} />
          </button>
        </div>
      ) : (
        <div className={classNames(cx("learning-content-main-buttons"))}>
          <button
            onClick={() => {
              props.setFirstSideIsVisible(true);
              props.newToDisplay(props.setUnknownTechcards);
            }}
            className={classNames(cx("learning-content-main-buttons-unknow"))}
          >
            <FontAwesomeIcon icon={faThumbsDown} />I don't know
          </button>
          <button
            onClick={() => {
              props.setFirstSideIsVisible(true);
              props.newToDisplay(props.setKnownTechcards);
            }}
            className={classNames(cx("learning-content-main-buttons-know"))}
          >
            I know
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        </div>
      )}
    </>
  );
}

export default IKnowIDontKnow;
