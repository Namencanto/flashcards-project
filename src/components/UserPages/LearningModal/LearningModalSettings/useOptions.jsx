import { useState, useEffect } from "react";
export const useOptions = (
  learningOptions,
  techcardsToDisplay,
  setTechcardsToDisplay
) => {
  const [techcardsToDisplayRandomBackup, setTechcardsToDisplayRandomBackup] =
    useState(techcardsToDisplay);

  // * REVERSE CASE
  useEffect(() => {
    if (learningOptions.reverse) {
      setTechcardsToDisplay({
        firstSides: techcardsToDisplay.secondSides,
        secondSides: techcardsToDisplay.firstSides,
        images: techcardsToDisplay.images,
        ids: techcardsToDisplay.ids,
      });
    } else {
      setTechcardsToDisplay({
        firstSides: techcardsToDisplay.secondSides,
        secondSides: techcardsToDisplay.firstSides,
        images: techcardsToDisplay.images,
        ids: techcardsToDisplay.ids,
      });
    }
  }, [learningOptions.reverse]);

  // * RANDOM CASE
  useEffect(() => {
    let randomNumbers = [];
    let sortedNumbers = techcardsToDisplay.ids;
    for (let i = 0; i < techcardsToDisplay.secondSides.length; i++) {
      randomNumbers.push(Math.random());
    }
    const randomArr = (arr, numbers) => {
      return arr
        .map((value, i) => ({ value, sort: numbers[i] }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    };
    if (learningOptions.random) {
      setTechcardsToDisplayRandomBackup(techcardsToDisplay);
      setTechcardsToDisplay({
        firstSides: randomArr(techcardsToDisplay.firstSides, randomNumbers),
        secondSides: randomArr(techcardsToDisplay.secondSides, randomNumbers),
        images: randomArr(techcardsToDisplay.images, randomNumbers),
        ids: randomArr(techcardsToDisplay.ids, randomNumbers),
      });
    } else {
      setTechcardsToDisplay(techcardsToDisplayRandomBackup);
    }
  }, [learningOptions.random]);
};
