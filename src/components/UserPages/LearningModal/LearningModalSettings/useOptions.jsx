import { useState, useEffect } from "react";
export const useOptions = (
  learningOptions,
  techcardsToDisplay,
  setTechcardsToDisplay
) => {
  const [techcardsToDisplayReverseBackup, setTechcardsToDisplayReverseBackup] =
    useState(techcardsToDisplay);

  // * REVERSE CASE
  useEffect(() => {
    if (learningOptions.reverse) {
      setTechcardsToDisplayReverseBackup(techcardsToDisplay);
      setTechcardsToDisplay({
        firstSides: techcardsToDisplay.secondSides,
        secondSides: techcardsToDisplay.firstSides,
        images: techcardsToDisplay.images,
        ids: techcardsToDisplay.ids,
      });
    } else setTechcardsToDisplay(techcardsToDisplayReverseBackup);
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
      setTechcardsToDisplay({
        firstSides: randomArr(techcardsToDisplay.firstSides, randomNumbers),
        secondSides: randomArr(techcardsToDisplay.secondSides, randomNumbers),
        images: randomArr(techcardsToDisplay.images, randomNumbers),
        ids: randomArr(techcardsToDisplay.ids, randomNumbers),
      });
    } else
      setTechcardsToDisplay({
        firstSides: randomArr(techcardsToDisplay.firstSides, sortedNumbers),
        secondSides: randomArr(techcardsToDisplay.secondSides, sortedNumbers),
        images: randomArr(techcardsToDisplay.images, sortedNumbers),
        ids: randomArr(techcardsToDisplay.ids, sortedNumbers),
      });
  }, [learningOptions.random]);
};
