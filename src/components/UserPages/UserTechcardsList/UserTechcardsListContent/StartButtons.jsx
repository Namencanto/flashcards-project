import "../../../../assets/Global.scss";

import classes from ".././UserTechcardsList.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRepeat,
  faLeaf,
  faHammer,
  faPlus,
  faMinus,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { countStatus } from "../../../../HelperComponents/countStatus";
import { useEffect, useState, useMemo } from "react";

function StartButtons({
  techcardsIDS,
  firstSides,
  secondSides,
  techcardsImages,
  list,
  displayLearningModal,
  statuses,
  filteredRepetitions,
}) {
  const cx = classNames.bind(classes);

  // Filter repetitions to get only current list repetitions
  const repetitionsIDS = techcardsIDS.filter((val) =>
    filteredRepetitions.includes(val)
  );

  const maxRepetitionsQuantity = repetitionsIDS.length;

  const [repetitionsQuantity, setRepetitionsQuantity] = useState(
    maxRepetitionsQuantity
  );

  const [newQuantity, setNewQuantity] = useState(10);
  const [toLearnQuantity, setToLearnNewQuantity] = useState(10);
  const [hardQuantity, setHardQuantity] = useState(10);
  const countedStatuses = countStatus(statuses);

  const [disabledButtonStatus, setDisabledButtonStatus] = useState({});

  useMemo(() => {
    const repetitionsIDS = techcardsIDS.filter((val) =>
      filteredRepetitions.includes(val)
    );
    setRepetitionsQuantity(repetitionsIDS.length);
    setDisabledButtonStatus((prevState) => ({
      ...prevState,
      repetitions: repetitionsIDS.length !== 0,
    }));

    return repetitionsIDS.length;
  }, [repetitionsIDS.length]);

  // Count initial quantity for others start buttons
  useEffect(() => {
    const newExist = statuses.includes(5);
    const toLearnExist = statuses.some((x) => x >= 6 && x <= 8);
    const hardExist = statuses.some((x) => x === 9 || x === 10);
    setDisabledButtonStatus({
      new: newExist,
      toLearn: toLearnExist,
      hard: hardExist,
      repetitions: repetitionsQuantity !== 0,
    });
    setNewQuantity(!newExist ? 0 : 10);
    setToLearnNewQuantity(!toLearnExist ? 0 : 10);
    setHardQuantity(!hardExist ? 0 : 10);
  }, []);

  // Count quantity for others start buttons
  const quantity = (type, add) => {
    const Quantity = {
      new: newQuantity,
      toLearn: toLearnQuantity,
      hard: hardQuantity,
    };
    let quantity = Quantity[type];
    if (countedStatuses[type] > 0) {
      if (quantity >= countedStatuses[type] && add) {
        return;
      }
      if (countedStatuses[type] > 0 && quantity === 1 && !add) {
        return;
      }
      const update = add ? 1 : -1;
      const quantityUpdater = {
        new: setNewQuantity,
        toLearn: setToLearnNewQuantity,
        hard: setHardQuantity,
      };
      quantityUpdater[type](quantity + update);
    }
  };

  // Give learning modal techcards based on status
  const displayLearningModalHandler = (from, to, max) => {
    let filteredCounter = 0;

    // create empty arrays to store filtered values
    const filteredFirstSides = [];
    const filteredSecondSides = [];
    const filteredTechcardsIDS = [];
    const filteredTechcardsImages = [];

    // loop through statuses array
    for (let i = 0; i < statuses.length; i++) {
      if (filteredCounter < max && statuses[i] >= from && statuses[i] <= to) {
        filteredFirstSides.push(firstSides[i]);
        filteredSecondSides.push(secondSides[i]);
        filteredTechcardsIDS.push(techcardsIDS[i]);
        filteredTechcardsImages.push(techcardsImages[i]);
        filteredCounter++;
      }
    }

    // send to learning modal
    displayLearningModal({
      firstSides: filteredFirstSides,
      secondSides: filteredSecondSides,
      techcardsIDS: filteredTechcardsIDS,
      techcardsImages: filteredTechcardsImages,
      listTitle: list,
    });
  };

  // Give learning modal only repetitions
  const displayRepetitions = () => {
    const matchingIndices = repetitionsIDS
      .map((val) => techcardsIDS.indexOf(val))
      .filter((index) => index !== -1);

    const filteredTechcardsIDS = matchingIndices.map(
      (index) => techcardsIDS[index]
    );
    const filteredFirstSides = matchingIndices.map(
      (index) => firstSides[index]
    );
    const filteredSecondSides = matchingIndices.map(
      (index) => secondSides[index]
    );
    const filteredTechcardsImages = matchingIndices.map(
      (index) => techcardsImages[index]
    );
    displayLearningModal({
      firstSides: filteredFirstSides,
      secondSides: filteredSecondSides,
      techcardsIDS: filteredTechcardsIDS,
      techcardsImages: filteredTechcardsImages,
      listTitle: list,
    });
  };

  // Count quantity for repetitions start button
  const quantityRepetitions = (add) => {
    let value = add ? 1 : !add ? -1 : 0;

    if (repetitionsQuantity >= maxRepetitionsQuantity) if (add) return;
    if (repetitionsQuantity <= 1) if (!add) return;

    setRepetitionsQuantity(repetitionsQuantity + value);
  };
  return (
    <div className={classNames(cx("techcards-list-btns"))}>
      <div>
        <div className={classNames(cx("techcards-list-btn-start-repetitions"))}>
          <button
            onClick={() => {
              repetitionsQuantity > 0 && displayRepetitions();
            }}
            disabled={!disabledButtonStatus.repetitions}
          >
            <span>
              {repetitionsQuantity} <FontAwesomeIcon icon={faRepeat} />
            </span>
            Start repetitions
          </button>
        </div>
        <div className={classNames(cx("techcards-list-btn-quantity"))}>
          <FontAwesomeIcon
            onClick={() => {
              quantityRepetitions(false);
            }}
            icon={faMinus}
          />
          <FontAwesomeIcon
            onClick={() => {
              quantityRepetitions(true);
            }}
            icon={faPlus}
          />
        </div>
      </div>

      <div>
        <div className={classNames(cx("techcards-list-btn-start-new"))}>
          <button
            onClick={() => {
              newQuantity > 0 && displayLearningModalHandler(5, 5, newQuantity);
            }}
            disabled={!disabledButtonStatus.new}
          >
            <span>
              {newQuantity} <FontAwesomeIcon icon={faLeaf} />
            </span>
            Start new
          </button>
        </div>
        <div className={classNames(cx("techcards-list-btn-quantity"))}>
          <FontAwesomeIcon
            onClick={() => {
              quantity("new", false);
            }}
            icon={faMinus}
          />
          <FontAwesomeIcon
            onClick={() => {
              quantity("new", true);
            }}
            icon={faPlus}
          />
        </div>
      </div>

      <div>
        <div className={classNames(cx("techcards-list-btn-start-to-learn"))}>
          <button
            onClick={() => {
              toLearnQuantity > 0 &&
                displayLearningModalHandler(6, 8, toLearnQuantity);
            }}
            disabled={!disabledButtonStatus.toLearn}
          >
            <span>
              {toLearnQuantity} <FontAwesomeIcon icon={faCircleExclamation} />
            </span>
            Start to-learn
          </button>
        </div>
        <div className={classNames(cx("techcards-list-btn-quantity"))}>
          <FontAwesomeIcon
            onClick={() => {
              quantity("toLearn", false);
            }}
            icon={faMinus}
          />
          <FontAwesomeIcon
            onClick={() => {
              quantity("toLearn", true);
            }}
            icon={faPlus}
          />
        </div>
      </div>

      <div>
        <div className={classNames(cx("techcards-list-btn-start-hard"))}>
          <button
            onClick={() => {
              hardQuantity > 0 &&
                displayLearningModalHandler(9, 10, hardQuantity);
            }}
            disabled={!disabledButtonStatus.hard}
          >
            <span>
              {hardQuantity} <FontAwesomeIcon icon={faHammer} />
            </span>
            Start hard
          </button>
        </div>
        <div className={classNames(cx("techcards-list-btn-quantity"))}>
          <FontAwesomeIcon
            onClick={() => {
              quantity("hard", false);
            }}
            icon={faMinus}
          />
          <FontAwesomeIcon
            onClick={() => {
              quantity("hard", true);
            }}
            icon={faPlus}
          />
        </div>
      </div>
    </div>
  );
}

export default StartButtons;
