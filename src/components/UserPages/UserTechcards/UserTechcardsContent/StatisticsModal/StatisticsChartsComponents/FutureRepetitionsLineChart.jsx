import { Line } from "react-chartjs-2";

import { useContext } from "react";
import { RepetitionsContext } from "../../../../../../context/RepetitionsContext";
function FutureRepetitionsLineCharts({ statisticsIds, options }) {
  const { allRepetitions } = useContext(RepetitionsContext);

  if (allRepetitions) {
    const nowString = new Intl.DateTimeFormat(navigator.language).format(
      new Date()
    );
    const now = new Date();

    const dates = allRepetitions.dates;
    const ids = allRepetitions.ids;

    let repetitionsData = dates.map((date, i) => ({ date, id: ids[i] }));
    if (statisticsIds !== "all") {
      const filteredRepetitionData = repetitionsData.filter(
        (item) => statisticsIds.indexOf(item.id) !== -1
      );
      if (filteredRepetitionData.length !== 0) {
        repetitionsData = filteredRepetitionData;
      }
    }

    repetitionsData.sort((a, b) => {
      let dateA = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).format(new Date(a.date));
      let dateB = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }).format(new Date(b.date));
      return dateA.localeCompare(dateB);
    });

    let dateCount = new Map();

    for (let i = 0; i < repetitionsData.length; i++) {
      const dateString = new Intl.DateTimeFormat(navigator.language).format(
        new Date(repetitionsData[i].date)
      );

      const date = new Date(repetitionsData[i].date);

      if (dateCount.has(dateString)) {
        dateCount.set(dateString, dateCount.get(dateString) + 1);
      } else if (dateCount.has(nowString) && date <= now) {
        dateCount.set(nowString, dateCount.get(nowString) + 1);
      } else {
        if (date <= now) {
          dateCount.set(nowString, 1);
        } else {
          dateCount.set(dateString, 1);
        }
      }
    }

    const calculatedRepetitions = [];
    for (let [date, count] of dateCount.entries()) {
      calculatedRepetitions.push({
        date: date.replaceAll(".", "-"),
        repetitions: count,
      });
    }

    const repetitionPlanData = {
      labels:
        calculatedRepetitions.length === 1
          ? calculatedRepetitions
              .concat(calculatedRepetitions[0])
              .map((date, i) => date)
          : calculatedRepetitions.map(({ date }, i) =>
              date !== nowString.replaceAll(".", "-") ? date : "Today"
            ),

      datasets: [
        {
          label: "repetitions",
          data:
            calculatedRepetitions.length === 1
              ? calculatedRepetitions
                  .concat(calculatedRepetitions[0])
                  .map(({ repetitions }) => repetitions)
              : calculatedRepetitions.map(({ repetitions }) => repetitions),

          backgroundColor: "rgba(255,83,73,0.75)",
          borderColor: "rgba(255,83,73,1)",
          pointBackgroundColor: "#cf3e36",
          pointBorderColor: "#cf3e36",
          pointRadius: 1.33,
        },
      ],
    };

    return ids.length !== 0 ? (
      <>
        <h2>Your repetitions plan:</h2>
        <Line
          drawOnChartArea={true}
          data={repetitionPlanData}
          options={options}
        />
      </>
    ) : (
      ""
    );
  } else return <></>;
}

export default FutureRepetitionsLineCharts;
