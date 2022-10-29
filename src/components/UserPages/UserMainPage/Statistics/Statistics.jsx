import classes from "./Statistics.module.scss";
import classNames from "classnames/bind";

import { useState, useRef } from "react";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import MediaQueries from "../../../../HelperComponents/MediaQueries";

const dummyData = [
  {
    date: new Date("2022-03-25").toLocaleDateString("pl"),
    learned: 42,
    timeSpend: 34,
  },
  {
    date: new Date("2022-06-25").toLocaleDateString("pl"),
    learned: 12,
    timeSpend: 15,
  },
  {
    date: new Date("2022-09-25").toLocaleDateString("pl"),
    learned: 44,
    timeSpend: 61,
  },
];

function Statistics() {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  const radioAllDataRef = useRef();
  const radioLearnedRed = useRef();
  const radioTimeSpendRef = useRef();

  const [chartData, setChartData] = useState("techcards");
  const [chartType, setChartType] = useState("Line");

  const userData = {
    labels: dummyData.map((data) => data.date),

    datasets:
      chartData === "all"
        ? [
            {
              label: "TechCards User Learned",
              data: dummyData.map((data) => data.learned),
              backgroundColor: ["#5f4dee"],
              pointRadius: 4,
            },
            {
              label: "User Time Spend",
              data: dummyData.map((data) => data.timeSpend),
              backgroundColor: ["#968ce4"],
              pointRadius: 4,
            },
          ]
        : [
            {
              label:
                chartData === "techcards"
                  ? "TechCards User Learned"
                  : "User Time Spend",
              data: dummyData.map((data) =>
                chartData === "techcards" ? data.learned : data.timeSpend
              ),
              backgroundColor:
                chartData === "techcards"
                  ? ["#5f4dee"]
                  : chartData === "timeSpend"
                  ? ["#968ce4"]
                  : "",
            },
          ],
  };

  //   if (radioAllDataRef.current.checked === true) {
  //     setChartData("all");
  //   }

  const content = (
    <div className={classNames(cx("statistics-container"))}>
      {chartType === "Line" ? (
        <Line data={userData} />
      ) : (
        <Bar data={userData} />
      )}
      <button
        onClick={() => {
          chartType === "Line" ? setChartType("Bar") : setChartType("Line");
        }}
        className="btn-solid-medium"
      >
        {chartType === "Line" ? "Switch to bar" : "Switch to line"}
      </button>
      <fieldset>
        <legend>Select a maintenance drone:</legend>
        <div>
          <input
            onClick={() => {
              setChartData("all");
            }}
            checked={chartData === "all" ? true : false}
            ref={radioAllDataRef}
            type="radio"
            id="charts-1"
          />
          <label htmlFor="charts-1">View all data</label>
        </div>

        <div>
          <input
            onClick={() => {
              setChartData("techcards");
            }}
            checked={chartData === "techcards" ? true : false}
            ref={radioLearnedRed}
            type="radio"
            id="charts-2"
          />
          <label htmlFor="charts-2">Learned techcards</label>
        </div>

        <div>
          <input
            onClick={() => {
              setChartData("timeSpend");
            }}
            checked={chartData === "timeSpend" ? true : false}
            ref={radioTimeSpendRef}
            type="radio"
            id="charts-3"
          />
          <label htmlFor="charts-3">Time spend</label>
        </div>
      </fieldset>
    </div>
  );
  return (
    <div className={classNames(cx("statistics"))}>
      <div className="grid-mainpage-statistics">
        {minWidth1000 ? (
          <UserMobileCard icon={faChartLine}>{content}</UserMobileCard>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default Statistics;
