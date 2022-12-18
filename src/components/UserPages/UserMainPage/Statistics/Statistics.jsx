import classes from "./Statistics.module.scss";
import classNames from "classnames/bind";

import { useState, useEffect } from "react";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
import axios from "axios";
import StatisticsChart from "./StatisticsChart";
import StatisticsData from "./StatisticsData";
import AllAnswersPieChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/AllAnswersPieChart";
import LastTenDaysTimeSpentLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysTimeSpentLineChart";
import LastTenDaysLineChart from "../../UserTechcards/UserTechcardsContent/StatisticsModal/StatisticsChartsComponents/LastTenDaysLineChart";
const dummyData = [
  {
    date: new Date("2022-03-25").toLocaleDateString("pl"),
    learned: 42,
    timeSpent: 34,
  },
  {
    date: new Date("2022-06-25").toLocaleDateString("pl"),
    learned: 12,
    timeSpent: 15,
  },
  {
    date: new Date("2022-09-25").toLocaleDateString("pl"),
    learned: 44,
    timeSpent: 61,
  },
];

function Statistics() {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

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

  useEffect(() => {
    const fetchStats = async () => {
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
    };

    fetchStats();
  }, []);

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
              label: "User Time Spent",
              data: dummyData.map((data) => data.timeSpent),
              backgroundColor: ["#968ce4"],
              pointRadius: 4,
            },
          ]
        : [
            {
              label:
                chartData === "techcards"
                  ? "TechCards User Learned"
                  : "User Time Spent",
              data: dummyData.map((data) =>
                chartData === "techcards" ? data.learned : data.timeSpent
              ),
              backgroundColor:
                chartData === "techcards"
                  ? ["#5f4dee"]
                  : chartData === "timeSpent"
                  ? ["#968ce4"]
                  : "",
            },
          ],
  };
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
    <div className={classNames(cx("statistics"))}>
      <div className="grid-mainpage-statistics">
        {minWidth1000 ? (
          <UserMobileCard icon={faChartLine}>
            {
              <div className={classNames(cx("statistics-container"))}>
                <StatisticsData
                  mainStats={mainStats}
                  totalTime={allActivity.allTimes.reduce((a, b) => a + b, 0)}
                />
                <StatisticsChart
                  chartType={chartType}
                  chartData={chartData}
                  userData={userData}
                  setChartData={setChartData}
                  setChartType={setChartType}
                />
                <LastTenDaysLineChart
                  data={allActivity}
                  options={optionsLine}
                />
                <LastTenDaysTimeSpentLineChart
                  data={allActivity}
                  options={optionsLine}
                />

                <AllAnswersPieChart
                  data={allAnswers}
                  options={optionsAnswersPie}
                />
              </div>
            }
          </UserMobileCard>
        ) : (
          <div className={classNames(cx("statistics-container"))}>
            <StatisticsData
              mainStats={mainStats}
              totalTime={allActivity.allTimes.reduce((a, b) => a + b, 0)}
            />
            <StatisticsChart
              chartType={chartType}
              chartData={chartData}
              userData={userData}
              setChartData={setChartData}
              setChartType={setChartType}
            />
            <LastTenDaysLineChart data={allActivity} options={optionsLine} />
            <LastTenDaysTimeSpentLineChart
              data={allActivity}
              options={optionsLine}
            />

            <AllAnswersPieChart data={allAnswers} options={optionsAnswersPie} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
