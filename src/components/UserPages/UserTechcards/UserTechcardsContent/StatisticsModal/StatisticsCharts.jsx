import classes from "./StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState, useEffect } from "react";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import {
  Bar,
  Line,
  Doughnut,
  Pie,
  Scatter,
  Bubble,
  PolarArea,
  Radar,
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from "chart.js";
function StatisticsCharts({ data, statuses }) {
  console.log("gh;p", data);
  const last10Data = {
    allDates: data.allDates.slice(0, 10),
    allWrong: data.allWrong.slice(0, 10),
    allRight: data.allRight.slice(0, 10),
  };
  const folderAnswersRight = data.allRight.reduce((a, b) => a + b, 0);
  const folderAnswersWrong = data.allWrong.reduce((a, b) => a + b, 0);
  console.log(data);
  const answersData = {
    labels: last10Data.allDates.map((date) => date.slice(0, 10)),
    datasets: [
      {
        label: "Total",
        data: last10Data.allRight.map((num, i) => num + last10Data.allWrong[i]),
        backgroundColor: "rgba(95,77,238,.5)",
        borderColor: "rgba(95,77,238,1)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
      {
        label: "Wrong",
        data: last10Data.allWrong.map((wrong) => wrong),
        backgroundColor: "red",
        backgroundColor: "rgba(255,0,0, 0.5)",
        borderColor: "rgba(255,0,0,1)",
        pointBackgroundColor: "#c51236",
        pointBorderColor: "#c51236",
        pointRadius: 1.33,
      },
      {
        label: "Right",
        data: last10Data.allRight.map((right) => right),
        backgroundColor: "green",
        backgroundColor: "rgba(100, 255, 100, .5)",
        borderColor: "rgba(0, 255, 0, 1)",
        pointBackgroundColor: "#3dc269",
        pointBorderColor: "#3dc269",
        pointRadius: 1.33,
      },
    ],
  };
  const repetitionPlanData = {
    labels: data.allDates.map((date) => date.slice(0, 10)),

    datasets: [
      {
        label: "Current repetitions",
        data: data.allRight.map((right) => right),

        backgroundColor: "rgba(95,77,238,0.9)",
        borderColor: "rgba(95,77,238,1)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
      {
        label: "Future repetitions",
        data: data.allWrong.map((wrong) => wrong),
        backgroundColor: "rgba(95,77,238,0.5)",
        borderColor: "rgba(95,77,238,0.6)",
        pointBackgroundColor: "#2810e8",
        pointBorderColor: "#2810e8",
        pointRadius: 1.33,
      },
    ],
  };
  const allAnswers = {
    labels: ["Wrong", "Right"],

    datasets: [
      {
        data: [folderAnswersWrong, folderAnswersRight],
        backgroundColor: ["#00ff00", "#ff0000"],
        borderColor: ["#007700", "#770000"],
        borderWidth: 1,
      },
    ],
  };
  const allStatuses = {
    labels: Object.keys(statuses),
    datasets: [
      {
        data: Object.values(statuses),
        backgroundColor: [
          "green",
          "lightgreen",
          "lightblue",
          "orange",
          "crimson",
        ],
      },
    ],
  };

  const optionsLine = {
    elements: {
      line: {
        borderWidth: 2,
        lineTension: 0.1,
        borderCapStyle: "butt",
        fill: true,
        borderJoinStyle: "round",
      },
    },
  };

  const optionsAnswersPie = {
    elements: {
      arc: {
        hoverBorderColor: ["#007700", "#770000"],
        hoverBorderWidth: 2,
      },
    },
  };
  const optionsStatusesPie = {
    elements: {
      arc: {
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <div>
      <Line drawOnChartArea={true} data={answersData} options={optionsLine} />
      <Line
        drawOnChartArea={true}
        data={repetitionPlanData}
        options={optionsLine}
      />
      <Pie data={allStatuses} options={optionsStatusesPie} />
      <Pie data={allAnswers} options={optionsAnswersPie} />
    </div>
  );
}

export default StatisticsCharts;
