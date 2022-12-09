import classes from "../LearningModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

function CasualReviewing(props) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("learning-content-main-buttons"))}>
      <button
        onClick={() => {
          if (props.whichTechcard === 1 && props.firstSideIsVisible) return;
          if (props.firstSideIsVisible) {
            props.setWhichTechcard(props.whichTechcard - 1);
            props.setTechcardsToDisplay((prevState) => ({
              firstSides: props.firstSides.slice(props.whichTechcard - 2),
              secondSides: props.secondSides.slice(props.whichTechcard - 2),
              images: props.techcardsImages.slice(props.whichTechcard - 2),
              ids: prevState.ids,
            }));
            props.setFirstSideIsVisible(false);
          } else if (!props.firstSideIsVisible)
            props.setFirstSideIsVisible(true);
        }}
        className={classNames(cx("learning-content-main-buttons-default"))}
      >
        <FontAwesomeIcon icon={faArrowLeftLong} />
      </button>
      <button
        onClick={() => {
          if (
            props.whichTechcard === props.firstSides.length &&
            !props.firstSideIsVisible
          )
            return;
          if (!props.firstSideIsVisible) {
            if (props.whichTechcard !== props.firstSides.length)
              props.setWhichTechcard(props.whichTechcard + 1);
            props.setTechcardsToDisplay((prevState) => ({
              firstSides: props.firstSides.slice(props.whichTechcard),
              secondSides: props.secondSides.slice(props.whichTechcard),
              images: props.techcardsImages.slice(props.whichTechcard),
              ids: prevState.ids,
            }));
            props.setFirstSideIsVisible(true);
          } else if (props.firstSideIsVisible)
            props.setFirstSideIsVisible(false);
        }}
        className={classNames(cx("learning-content-main-buttons-default"))}
      >
        <FontAwesomeIcon icon={faArrowRightLong} />
      </button>
    </div>
  );
}

export default CasualReviewing;
