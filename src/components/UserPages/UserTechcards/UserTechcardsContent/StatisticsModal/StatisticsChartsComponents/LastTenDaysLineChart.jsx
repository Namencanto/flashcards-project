import { Line } from "react-chartjs-2";
function LastTenDaysLineChart({ data, options }) {
  const last10Data = {
    allDates: data.allDates.slice(0, 10),
    allWrong: data.allWrong.slice(0, 10),
    allRight: data.allRight.slice(0, 10),
  };

  const answersData = {
    labels:
      last10Data.allDates.length === 1
        ? last10Data.allDates
            .concat(last10Data.allDates[0])
            .map((date) => date.slice(0, 10))
        : last10Data.allDates.map((date) => date.slice(0, 10)),
    datasets: [
      {
        label: "Total",
        data:
          last10Data.allDates.length === 1
            ? last10Data.allRight
                .concat(last10Data.allRight[0])
                .map((num, i) => num + last10Data.allWrong[0])
            : last10Data.allRight.map((num, i) => num + last10Data.allWrong[i]),
        backgroundColor: "rgba(95,77,238,.5)",
        borderColor: "rgba(95,77,238,1)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
      {
        label: "Wrong",
        data:
          last10Data.allDates.length === 1
            ? last10Data.allWrong
                .concat(last10Data.allWrong[0])
                .map((wrong) => wrong)
            : last10Data.allWrong.map((wrong) => wrong),
        backgroundColor: "red",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "#c51236",
        pointBorderColor: "#c51236",
        pointRadius: 1.33,
      },
      {
        label: "Right",
        data:
          last10Data.allDates.length === 1
            ? last10Data.allRight
                .concat(last10Data.allRight[0])
                .map((right) => right)
            : last10Data.allRight.map((right) => right),
        backgroundColor: "green",
        backgroundColor: "rgba(100, 255, 100, .5)",
        borderColor: "rgba(0, 255, 0, 1)",
        pointBackgroundColor: "#3dc269",
        pointBorderColor: "#3dc269",
        pointRadius: 1.33,
      },
    ],
  };

  return last10Data.allDates.length !== 0 ? (
    <>
      <h2>Your answers from 10 days ago:</h2>
      <Line drawOnChartArea={true} data={answersData} options={options} />
    </>
  ) : (
    ""
  );
}

export default LastTenDaysLineChart;
