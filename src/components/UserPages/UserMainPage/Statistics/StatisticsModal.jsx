import classes from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { useEffect, useRef } from "react";

import StatisticsData from "./StatisticsData";
import AllAnswersPieChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/AllAnswersPieChart";
import LastTenDaysTimeSpentLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysTimeSpentLineChart";
import LastTenDaysLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysLineChart";
import AllStatusesPieChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/AllStatusesPieChart";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import FutureRepetitionsLineCharts from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/FutureRepetitionsLineChart";

function StatisticsModal({
  mainStats,
  statisticsModalIsVisible,
  allActivity,
  optionsLine,
  hideStatisticsModal,
  allAnswers,
  optionsAnswersPie,
  allStatuses,
  optionsStatusesPie,
  isFetched,
}) {
  const statisticsRef = useRef();
  const contentStatisticsRef = useRef();
  const cx = classNames.bind(classes);

  useEffect(() => {
    if (statisticsModalIsVisible) {
      setTimeout(() => {
        statisticsRef.current.style.opacity = 0.8;
        contentStatisticsRef.current.style.opacity = 1;
        contentStatisticsRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
      });
    }
  }, [statisticsModalIsVisible]);

  const exitPopupAnimation = () => {
    statisticsRef.current.style.opacity = 0;
    contentStatisticsRef.current.style.opacity = 0;
    contentStatisticsRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      hideStatisticsModal();
    }, 200);
  };

  return (
    <>
      <div
        onClick={exitPopupAnimation}
        ref={statisticsRef}
        className="modal"
      ></div>
      <div className="modal-container">
        <div ref={contentStatisticsRef} className="modal-content">
          <header className={classNames(cx("statistics-header"))}>
            <h2>Learning statistics</h2>

            <FontAwesomeIcon icon={faX} onClick={exitPopupAnimation} />
          </header>

          <main className={classNames(cx("statistics-main"))}>
            {isFetched ? (
              <>
                <div className={classNames(cx("statistics-main-info"))}>
                  <StatisticsData
                    mainStats={mainStats}
                    totalTime={allActivity.allTimes.reduce((a, b) => a + b, 0)}
                  />
                  <LastTenDaysLineChart
                    data={allActivity}
                    options={optionsLine}
                  />
                  <FutureRepetitionsLineCharts
                    statisticsIds="all"
                    options={optionsLine}
                  />
                  {allActivity.allDates.length > 0 ? (
                    <LastTenDaysTimeSpentLineChart
                      data={allActivity}
                      options={optionsLine}
                    />
                  ) : (
                    ""
                  )}

                  <AllAnswersPieChart
                    data={allAnswers}
                    options={optionsAnswersPie}
                  />
                  <AllStatusesPieChart
                    statuses={allStatuses}
                    options={optionsStatusesPie}
                  />
                </div>
              </>
            ) : (
              <LoadingSpinner />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default StatisticsModal;
