import classes from "./StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";

import LastTenDaysLineChart from "./StatisticsChartsComponents/LastTenDaysLineChart";
import FutureRepetitionsLineCharts from "./StatisticsChartsComponents/FutureRepetitionsLineChart";
import AllAnswersPieChart from "./StatisticsChartsComponents/AllAnswersPieChart";
import AllStatusesPieChart from "./StatisticsChartsComponents/AllStatusesPieChart";
import LastTenDaysTimeSpentLineChart from "./StatisticsChartsComponents/LastTenDaysTimeSpentLineChart";
import MediaQueries from "../../../../../HelperComponents/MediaQueries";
import {
  getOptionsLine,
  getOptionsAnswersPie,
  getOptionsStatusesPie,
} from "../../../UserMainPage/Statistics/StatisticsOptions";
function StatisticsCharts({ data, statuses, statisticsIds }) {
  const { minWidth1000 } = MediaQueries();
  const optionsLine = getOptionsLine(minWidth1000);
  const optionsAnswersPie = getOptionsAnswersPie(minWidth1000);
  const optionsStatusesPie = getOptionsStatusesPie(minWidth1000);

  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("statistics-main-charts"))}>
      {data.allDates.length > 0 ? (
        <>
          <LastTenDaysLineChart data={data} options={optionsLine} />
          <LastTenDaysTimeSpentLineChart data={data} options={optionsLine} />
          <FutureRepetitionsLineCharts
            statisticsIds={statisticsIds}
            options={optionsLine}
          />
          <AllAnswersPieChart data={data} options={optionsAnswersPie} />
        </>
      ) : (
        ""
      )}
      <AllStatusesPieChart statuses={statuses} options={optionsStatusesPie} />
    </div>
  );
}

export default StatisticsCharts;
