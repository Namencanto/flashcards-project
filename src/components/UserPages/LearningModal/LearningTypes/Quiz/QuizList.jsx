import { useState } from "react";
import { useEffect } from "react";

function QuizList({
  firstSides,
  secondSides,
  setWhatButtonIsClicked,
  techcardsToDisplay,
  correctAnswer,
  isInvalid,
  goToNextTechcard,
  listIsFinished,
  learningOptions,
}) {
  const [quizArr, setQuizArr] = useState([]);

  useEffect(() => {
    if (listIsFinished) return;
    const randomUnique = (range, count) => {
      let nums = new Set();
      while (nums.size < count) {
        nums.add(Math.floor(Math.random() * range));
      }
      return [...nums];
    };
    const randomArr = (arr) => {
      return arr
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
    };

    //

    const secondSidesWithoutCorrectAnswer = secondSides.filter(
      (el) => el !== correctAnswer
    );
    const firstSidesWithoutCorrectAnswer = firstSides.filter(
      (el) => el !== correctAnswer
    );
    const sidesToDisplay = learningOptions.reverse
      ? firstSidesWithoutCorrectAnswer
      : secondSidesWithoutCorrectAnswer;

    //

    if (firstSides.length === 2) {
      const rndInt = randomUnique(1, 1);
      const arrToRandomize = [correctAnswer, sidesToDisplay[rndInt[0]]];
      const randomizedArr = randomArr(arrToRandomize);

      setQuizArr(randomizedArr);
    }
    if (firstSides.length === 3) {
      const rndInt = randomUnique(2, 2);
      const arrToRandomize = [
        correctAnswer,
        sidesToDisplay[rndInt[0]],
        sidesToDisplay[rndInt[1]],
      ];

      const randomizedArr = randomArr(arrToRandomize);

      setQuizArr(randomizedArr);
    }
    if (firstSides.length >= 4) {
      const rndInt = randomUnique(sidesToDisplay.length, 4);
      const arrToRandomize = [
        correctAnswer,
        sidesToDisplay[rndInt[0]],
        sidesToDisplay[rndInt[1]],
        sidesToDisplay[rndInt[2]],
      ];
      const randomizedArr = randomArr(arrToRandomize);
      setQuizArr(randomizedArr);
    }
  }, [techcardsToDisplay, learningOptions.reverse, learningOptions.random]);

  return (
    <ol>
      {quizArr.map((value, i) => {
        return (
          <li key={value + i} id="quizEl">
            <button
              value={value}
              onClick={() => {
                if (isInvalid) goToNextTechcard();
                else setWhatButtonIsClicked(value);
              }}
              id="quizBtn"
            >
              <span>{value}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export default QuizList;
