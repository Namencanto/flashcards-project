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
function StatisticsCharts({ folderData }) {
  const last10FolderData = {
    allDates: folderData.allDates.slice(0, 10),
    allWrong: folderData.allWrong.slice(0, 10),
    allRight: folderData.allRight.slice(0, 10),
  };
  const folderAnswersRight = folderData.allRight.reduce((a, b) => a + b, 0);
  const folderAnswersWrong = folderData.allWrong.reduce((a, b) => a + b, 0);

  const answersData = {
    labels: last10FolderData.allDates.map((date) => date.slice(0, 10)),

    datasets: [
      {
        label: "Total",
        data: last10FolderData.allRight.map(
          (num, i) => num + last10FolderData.allWrong[i]
        ),
        backgroundColor: "purple",
        pointRadius: 4,
      },
      {
        label: "Wrong",
        data: last10FolderData.allWrong.map((wrong) => wrong),
        backgroundColor: "red",
        pointRadius: 4,
      },
      {
        label: "Right",
        data: last10FolderData.allRight.map((right) => right),
        backgroundColor: "green",

        pointRadius: 4,
      },
    ],
  };
  const repetitionPlanData = {
    labels: folderData.allDates.map((date) => date.slice(0, 10)),

    datasets: [
      {
        label: "Current repetitions",
        data: folderData.allRight.map((right) => right),
        backgroundColor: "blue",
        fill: true,
        pointRadius: 4,
      },
      {
        label: "Future repetitions",
        data: folderData.allWrong.map((wrong) => wrong),
        backgroundColor: "lightblue",
        fill: true,
        pointRadius: 4,
      },
    ],
  };

  const allAnswers = {
    labels: ["Wrong", "Right"],

    datasets: [
      {
        data: [folderAnswersWrong, folderAnswersRight],
        backgroundColor: ["red", "green"],
      },
    ],
  };

  return (
    <div>
      <Line drawOnChartArea={true} data={answersData} />
      <Line drawOnChartArea={true} data={repetitionPlanData} />
      <Pie data={repetitionPlanData} />
      <Pie data={allAnswers} />
    </div>
  );
}

export default StatisticsCharts;
