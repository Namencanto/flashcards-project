import classes from "./StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState, useEffect } from "react";

import LastTenDaysLineChart from "./StatisticsChartsComponents/LastTenDaysLineChart";
import FutureRepetitionsLineCharts from "./StatisticsChartsComponents/FutureRepetitionsLineChart";
import AllAnswersPieChart from "./StatisticsChartsComponents/AllAnswersPieChart";
import AllStatusesPieChart from "./StatisticsChartsComponents/AllStatusesPieChart";
import MediaQueries from "../../../../../HelperComponents/MediaQueries";
function StatisticsCharts({ data, statuses }) {
  const { minWidth1000 } = MediaQueries();
  console.log(minWidth1000);
  const cx = classNames.bind(classes);
  const optionsLine = {
    aspectRatio: minWidth1000 ? 0.8 : 1.5,
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
    aspectRatio: minWidth1000 ? 0.8 : 1.5,
    elements: {
      arc: {
        hoverBorderColor: ["#007700", "#770000"],
        hoverBorderWidth: 2,
      },
    },
  };
  const optionsStatusesPie = {
    aspectRatio: minWidth1000 ? 0.8 : 1.5,
    elements: {
      arc: {
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <div className={classNames(cx("statistics-main-charts"))}>
      <LastTenDaysLineChart data={data} options={optionsLine} />
      <FutureRepetitionsLineCharts data={data} options={optionsLine} />
      <AllAnswersPieChart data={data} options={optionsAnswersPie} />
      <AllStatusesPieChart statuses={statuses} options={optionsStatusesPie} />
    </div>
  );
}

export default StatisticsCharts;
