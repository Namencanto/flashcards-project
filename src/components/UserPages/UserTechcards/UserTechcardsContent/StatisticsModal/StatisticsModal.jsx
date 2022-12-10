import classes from "./StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useRef } from "react";
import axios from "axios";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import StatisticsCharts from "./StatisticsCharts";
function StatisticsModal({
  hideStatisticsModal,
  statisticsModalIsVisible,
  folderID,
}) {
  const { currentUser } = useContext(AuthContext);

  const statisticsRef = useRef();
  const contentStatisticsRef = useRef();
  const cx = classNames.bind(classes);
  const [statisticsFolderData, setStatisticFoldersData] = useState(false);
  const [statisticsListData, setStatisticListsData] = useState(false);

  const fetchStatistics = async (renderFolder, renderList) => {
    try {
      const res = await axios.get("/statistics/folderOrList/get", {
        params: {
          id: folderID,
          folder: renderFolder,
          list: renderList,
        },
      });
      let dateArr = [];
      let wrongArr = [];
      let rightArr = [];
      for (const { date, wrong_answers, right_answers } of res.data) {
        dateArr.push(date);
        wrongArr.push(wrong_answers);
        rightArr.push(right_answers);
      }
      const statisticsObject = {
        allDates: dateArr,
        allWrong: wrongArr,
        allRight: rightArr,
      };
      if (renderFolder) setStatisticFoldersData(statisticsObject);
      if (renderList) setStatisticListsData(statisticsObject);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStatistics(true, false);
    // fetchStatistics(false, true);
  }, [folderID]);

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
            <h2>Learning settings</h2>
            <div style={{ textAlign: "center" }}></div>
            <FontAwesomeIcon icon={faX} onClick={exitPopupAnimation} />
          </header>
          <main>
            {statisticsFolderData ? (
              <StatisticsCharts
                listData={statisticsListData}
                folderData={statisticsFolderData}
              />
            ) : (
              ""
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default StatisticsModal;
