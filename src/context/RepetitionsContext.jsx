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

      // THIS ARRAY IS FOR CALCULATE WHEN USER HAS REPETITIONS
      const whenTheDataCanBeChangedArr = repetitionsData.map(
        (object) => object.when_the_status_can_be_changed
      );
      console.log(whenTheDataCanBeChangedArr);
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

// import { createContext, useEffect, useState } from "react";
// import axios from "axios";

// export const RepetitionsContext = createContext();

// export const RepetitionsContextProvider = ({ children }) => {
//   const [repetitionsData, setRepetitionsData] = useState({});
//   const [isFetched, setIsFetched] = useState(false);
//   try {
//     const fetchRepetitions = async () => {
//       setIsFetched(false);
//       try {
//         const resRepetitionData = await axios.get("/repetitions/");

//         const repetitions = resRepetitionData.data[0].repetitionsData;

//         const statuses = repetitions.map((object) => object.status);
//         const whenTheDataCanBeChangedArr = repetitions.map(
//           (object) => object.when_the_status_can_be_changed
//         );
//         const nextRepetitionDate = repetitions.map(
//           (object) => object.next_repetition_date
//         );
//         const ids = repetitions.map((object) => object.id);

//         setRepetitionsData({
//           ids,
//           statuses,
//           whenTheDataCanBeChangedArr,
//           nextRepetitionDate,
//           learningDifficult: resRepetitionData.data[0].learningDifficult,
//         });
//       } catch (err) {
//         console.log(err);
//         setIsFetched(true);
//       }
//       setIsFetched(true);
//     };

//     useEffect(() => {
//       fetchRepetitions();
//     }, []);

//     if (isFetched) {
//       const allIds = repetitionsData.ids;
//       const allStatuses = repetitionsData.statuses;
//       const whenTheDataCanBeChangedArr =
//         repetitionsData.whenTheDataCanBeChangedArr;
//       const learningDifficult = repetitionsData.learningDifficult;
//       const nextRepetitionDateArr = repetitionsData.nextRepetitionDate;

//       function isPast(date) {
//         const now = new Date();
//         return date < now;
//       }

//       const repetitions = {
//         ids: [],
//         dates: [],
//       };
//       for (let i = 0; i < allStatuses.length; i++) {
//         const id = allIds[i];
//         const status = allStatuses[i];
//         const whenTheDataCanBeChanged = whenTheDataCanBeChangedArr[i];
//         const nextRepetitionDate = nextRepetitionDateArr[i];

//         if (
//           (!nextRepetitionDate || !isPast(nextRepetitionDate)) &&
//           whenTheDataCanBeChanged
//         ) {
//           const date = new Date(whenTheDataCanBeChanged);

//           let daysToAdd = 0;
//           if (
//             status === 6 ||
//             status === 7 ||
//             status === 8 ||
//             status === 9 ||
//             status === 10
//           ) {
//             daysToAdd = 1;
//           } else if (status === 4) {
//             daysToAdd = 3;
//           } else if (status === 3) {
//             daysToAdd = 7;
//           } else if (status === 2) {
//             daysToAdd = 14;
//           } else if (status === 1) {
//             daysToAdd = 30;
//           } else if (status === 0) {
//             daysToAdd = 90;
//           }

//           if (learningDifficult === "easy") {
//             daysToAdd = daysToAdd * 2;
//           } else if (learningDifficult === "hard") {
//             daysToAdd = Math.max(Math.ceil(daysToAdd * 0.5), 1);
//           }

//           date.setDate(date.getDate() - 1 + daysToAdd);

//           repetitions.dates.push(date);
//           repetitions.ids.push(id);
//         }
//       }

//       return (
//         <RepetitionsContext.Provider value={{ repetitions, fetchRepetitions }}>
//           {children}
//         </RepetitionsContext.Provider>
//       );
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
