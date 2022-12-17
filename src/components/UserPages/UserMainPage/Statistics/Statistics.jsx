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
  const [learnedNumber, setLearnedNumber] = useState(0);
  const [joinedDate, setJoinedDate] = useState("");
  const [allCounts, setAllCounts] = useState({
    createdFolders: 0,
    createdLists: 0,
    createdTechcards: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/statistics/user/get");
        console.log(res.data[1]);
        setLearnedNumber(res.data.learnedNumber);
        const joined = new Date(res.data.joinedDate);
        setJoinedDate(joined.toLocaleString(navigator.language));

        setAllCounts({
          createdFolders: res.data.createdFolders,
          createdLists: res.data.createdLists,
          createdTechcards: res.data.createdTechcards,
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

  return (
    <div className={classNames(cx("statistics"))}>
      <div className="grid-mainpage-statistics">
        {minWidth1000 ? (
          <UserMobileCard icon={faChartLine}>
            {
              <div className={classNames(cx("statistics-container"))}>
                <StatisticsData
                  allCounts={allCounts}
                  joinedDate={joinedDate}
                  learned={learnedNumber}
                />
                <StatisticsChart
                  chartType={chartType}
                  chartData={chartData}
                  userData={userData}
                  setChartData={setChartData}
                  setChartType={setChartType}
                />
              </div>
            }
          </UserMobileCard>
        ) : (
          <div className={classNames(cx("statistics-container"))}>
            <StatisticsData
              allCounts={allCounts}
              joinedDate={joinedDate}
              learned={learnedNumber}
            />
            <StatisticsChart
              chartType={chartType}
              chartData={chartData}
              userData={userData}
              setChartData={setChartData}
              setChartType={setChartType}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
