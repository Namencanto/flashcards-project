import axios from "axios";

export const countFutureRepetitions = (repetitionsData) => {
  const allIds = repetitionsData.ids;
  const allStatuses = repetitionsData.statuses;
  const whenTheDataCanBeChangedArr = repetitionsData.whenTheDataCanBeChangedArr;
  const learningDifficult = repetitionsData.learningDifficult;
  const nextRepetitionDateArr = repetitionsData.nextRepetitionDate;

  function isPast(date) {
    const now = new Date();
    return date < now;
  }

  const repetitions = {
    id: [],
    date: [],
  };
  for (let i = 0; i < allStatuses.length; i++) {
    const id = allIds[i];
    const status = allStatuses[i];
    const whenTheDataCanBeChanged = whenTheDataCanBeChangedArr[i];
    const nextRepetitionDate = nextRepetitionDateArr[i];

    if (
      (!nextRepetitionDate || !isPast(nextRepetitionDate)) &&
      whenTheDataCanBeChanged
    ) {
      const date = new Date(whenTheDataCanBeChanged);

      let daysToAdd = 0;
      if (
        status === 6 ||
        status === 7 ||
        status === 8 ||
        status === 9 ||
        status === 10
      ) {
        daysToAdd = 1;
      } else if (status === 4) {
        daysToAdd = 3;
      } else if (status === 3) {
        daysToAdd = 7;
      } else if (status === 2) {
        daysToAdd = 14;
      } else if (status === 1) {
        daysToAdd = 30;
      } else if (status === 0) {
        daysToAdd = 90;
      }

      if (learningDifficult === "easy") {
        daysToAdd = daysToAdd * 2;
      } else if (learningDifficult === "hard") {
        daysToAdd = Math.max(Math.ceil(daysToAdd * 0.5), 1);
      }

      date.setDate(date.getDate() - 1 + daysToAdd);

      repetitions.date.push(date.toLocaleDateString());
      repetitions.id.push(id);
    }
  }

  return repetitions;
};
