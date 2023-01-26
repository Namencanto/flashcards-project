import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RepetitionsContext = createContext();

export const RepetitionsContextProvider = ({ children }) => {
  const [repetitions, setRepetitions] = useState({});

  const fetchRepetitions = async () => {
    try {
      // FETCH
      const resRepetitionData = await axios.get("/repetitions/");

      const repetitionsData = resRepetitionData.data[0].repetitionsData;

      const statuses = repetitionsData.map((object) => object.status);
      console.log(resRepetitionData);
      // THIS ARRAY IS FOR CALCULATE WHEN USER HAS REPETITIONS
      const whenTheDataCanBeChangedArr = repetitionsData.map(
        (object) => object.when_the_status_can_be_changed
      );
      const ids = repetitionsData.map((object) => object.id);

      const learningDifficult = resRepetitionData.data[0].learningDifficult;
      const now = new Date();

      const allRepetitions = {
        ids: [],
        dates: [],
      };
      for (let i = 0; i < statuses.length; i++) {
        const id = ids[i];
        const status = statuses[i];
        const whenTheDataCanBeChanged = whenTheDataCanBeChangedArr[i];

        const date = new Date(whenTheDataCanBeChanged);
        // date.setHours(date.getHours() + 12);
        if (whenTheDataCanBeChanged) {
          // CALCULATING WHEN IS REPETITION
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

          // USER LEARNING DIFFICULT
          if (learningDifficult === "easy") {
            daysToAdd = daysToAdd * 2;
          } else if (learningDifficult === "hard") {
            daysToAdd = Math.max(Math.ceil(daysToAdd * 0.5), 1);
          }
          date.setDate(date.getDate() - 1 + daysToAdd);

          allRepetitions.dates.push(date);
          allRepetitions.ids.push(id);
        }
      }

      // FILTER FOR GET REPETITIONS FOR CURRENT DAY
      const filteredRepetitions = allRepetitions.dates
        .filter((date) => date <= now)
        .map(
          (date, i) => allRepetitions.ids[allRepetitions.dates.indexOf(date)]
        );

      if (filteredRepetitions) {
        setRepetitions({ allRepetitions, filteredRepetitions });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRepetitions();
  }, []);

  return (
    <RepetitionsContext.Provider
      value={{
        // All repetitions array
        allRepetitions: repetitions.allRepetitions,
        // Current repetitions array
        filteredRepetitions: repetitions.filteredRepetitions,
        // Function for refresh context
        fetchRepetitions,
      }}
    >
      {children}
    </RepetitionsContext.Provider>
  );
};
