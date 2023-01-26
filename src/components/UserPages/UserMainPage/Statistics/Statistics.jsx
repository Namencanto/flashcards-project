import classes from "./Statistics.module.scss";
import classNames from "classnames/bind";

import { useState, useEffect } from "react";

import {
  faChartLine,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
import axios from "axios";

import StatisticsData from "./StatisticsData";
import AllAnswersPieChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/AllAnswersPieChart";
import LastTenDaysTimeSpentLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysTimeSpentLineChart";
import LastTenDaysLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysLineChart";
import AllStatusesPieChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/AllStatusesPieChart";
import { countStatus } from "../../../../HelperComponents/countStatus";

import {
  getOptionsLine,
  getOptionsAnswersPie,
  getOptionsStatusesPie,
} from "./StatisticsOptions";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import FutureRepetitionsLineCharts from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/FutureRepetitionsLineChart";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import StatisticsModal from "./StatisticsModal";
import ReactDOM from "react-dom";
function Statistics() {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);
  const optionsLine = getOptionsLine(minWidth1000);
  const optionsAnswersPie = getOptionsAnswersPie(minWidth1000);
  const optionsStatusesPie = getOptionsStatusesPie(minWidth1000);
  const [isFetched, setIsFetched] = useState(false);

  const [statisticsModalIsVisible, setStatisticsModalIsVisible] =
    useState(false);

  const [mainStats, setMainStats] = useState({
    joinedDate: "",
    learnedNumber: 0,
    rankingPlace: 0,
    createdFolders: 0,
    createdLists: 0,
    createdTechcards: 0,
  });
  const [allActivity, setAllActivity] = useState({
    allDates: [],
    allTimes: [],
    allRight: [],
    allWrong: [],
  });
  const [allAnswers, setAllAnswers] = useState({
    allWrong: [0],
    allRight: [0],
  });
  const [allStatuses, setAllStatuses] = useState({
    learned: 0,
    known: 0,
    new: 0,
    toLearn: 0,
    hard: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get("/statistics/user/get");

        const joined = new Date(res.data[0].joinedDate);
        let allDatesArr = [];
        let allWrongArr = [];
        let allRightArr = [];
        let allTimes = [];
        for (const { date, wrong_answers, right_answers, time_spent } of res
          .data[1].allActivity) {
          allTimes.push(time_spent);
          allDatesArr.push(date);
          allWrongArr.push(wrong_answers);
          allRightArr.push(right_answers);
        }
        setAllActivity({
          allDates: allDatesArr,
          allTimes: allTimes,
          allRight: allWrongArr,
          allWrong: allRightArr,
        });

        setAllAnswers({
          allWrong: allWrongArr,
          allRight: allRightArr,
        });

        setAllStatuses(countStatus(res.data[1].allStatuses));
        setMainStats({
          joinedDate: joined.toLocaleString(navigator.language),
          learnedNumber: res.data[0].learnedNumber,
          rankingPlace: res.data[0].rankingPlace,
          createdFolders: res.data[0].createdFolders,
          createdLists: res.data[0].createdLists,
          createdTechcards: res.data[0].createdTechcards,
        });
      } catch (error) {
        console.log(error);
      }
      setIsFetched(true);
    };

    fetchStats();
  }, []);

  const hideStatisticsModal = () => {
    setStatisticsModalIsVisible(false);
  };
  return (
    <div className={classNames(cx("statistics"))}>
      <div className="grid-mainpage-statistics">
        {minWidth1000 ? (
          <UserMobileCard icon={faChartLine}>
            {
              <div className={classNames(cx("statistics-container"))}>
                <header>
                  <FontAwesomeIcon icon={faMagnifyingGlassChart} />
                  <h2>Statistics</h2>
                </header>
                {isFetched ? (
                  <>
                    <StatisticsData
                      mainStats={mainStats}
                      totalTime={allActivity.allTimes.reduce(
                        (a, b) => a + b,
                        0
                      )}
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
                  </>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            }
          </UserMobileCard>
        ) : (
          <div className={classNames(cx("statistics-container"))}>
            <header>
              <FontAwesomeIcon
                onClick={() => {
                  setStatisticsModalIsVisible(true);
                }}
                style={{ cursor: "pointer", color: "black" }}
                icon={faMagnifyingGlassChart}
              />
              <h2>Statistics</h2>
            </header>
            {isFetched ? (
              <>
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
              </>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        )}
        {statisticsModalIsVisible
          ? ReactDOM.createPortal(
              <StatisticsModal
                statisticsModalIsVisible={statisticsModalIsVisible}
                hideStatisticsModal={hideStatisticsModal}
                mainStats={mainStats}
                allActivity={allActivity}
                optionsLine={optionsLine}
                allAnswers={allAnswers}
                optionsAnswersPie={optionsAnswersPie}
                allStatuses={allStatuses}
                optionsStatusesPie={optionsStatusesPie}
                isFetched={isFetched}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
      </div>
    </div>
  );
}

export default Statistics;
