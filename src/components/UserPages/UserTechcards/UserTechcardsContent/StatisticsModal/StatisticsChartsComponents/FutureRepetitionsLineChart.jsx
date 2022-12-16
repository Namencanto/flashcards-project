import { Line } from "react-chartjs-2";
function FutureRepetitionsLineCharts({ data, options }) {
  const repetitionPlanData = {
    labels:
      data.allDates.length === 1
        ? data.allDates
            .concat(data.allDates[0])
            .map((date) => date.slice(0, 10))
        : data.allDates.map((date) => date.slice(0, 10)),

    datasets: [
      {
        label: "Current repetitions",
        data:
          data.allRight.length === 1
            ? data.allRight.concat(data.allRight[0]).map((wrong) => wrong)
            : data.allRight.map((wrong) => wrong),

        backgroundColor: "rgba(95,77,238,0.9)",
        borderColor: "rgba(95,77,238,1)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
      {
        label: "Future repetitions",
        data:
          data.allWrong.length === 1
            ? data.allWrong.concat(data.allRight[0]).map((wrong) => wrong)
            : data.allWrong.map((wrong) => wrong),
        backgroundColor: "rgba(95,77,238,0.5)",
        borderColor: "rgba(95,77,238,0.6)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
    ],
  };

  return data.allDates.length !== 0 ? (
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
}

export default FutureRepetitionsLineCharts;
