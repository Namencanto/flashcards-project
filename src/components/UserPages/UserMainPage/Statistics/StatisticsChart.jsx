import { useState, useRef, useEffect } from "react";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function StatisticsChart({
  chartType,
  chartData,
  userData,
  setChartData,
  setChartType,
}) {
  const radioAllDataRef = useRef();
  const radioLearnedRed = useRef();
  const radioTimeSpendRef = useRef();

  return (
    <>
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
    </>
  );
}

export default StatisticsChart;
