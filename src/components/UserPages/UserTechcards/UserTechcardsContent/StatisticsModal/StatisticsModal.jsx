import classes from "./StatisticsModal.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faX } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import { useRef } from "react";
import axios from "axios";

import StatisticsCharts from "./StatisticsCharts";

function StatisticsModal({
  statuses,
  type,
  hideStatisticsModal,
  statisticsModalIsVisible,
  id,
  created_date,
  title,
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
          id,
          folder: renderFolder,
          list: renderList,
        },
      });
      let dateArr = [];
      let wrongArr = [];
      let rightArr = [];
      console.log(res.data);
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
    fetchStatistics(type === "FOLDER", type === "LIST");
  }, [type, id]);

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
  // const activityDate = statisticsListData.allDates?.[0]
  const activityDate =
    type === "FOLDER"
      ? new Date(statisticsFolderData.allDates?.[0])
      : new Date(statisticsListData.allDates?.[0]);

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
          <main className={classNames(cx("statistics-main"))}>
            <div className={classNames(cx("statistics-main-info"))}>
              <p>
                {type[0] + type.slice(1).toLowerCase()}: {title}
              </p>
              <p>
                Created at: {created_date.toLocaleString(navigator.language)}
              </p>
              <p>
                First activity:{" "}
                {activityDate
                  ? activityDate?.toLocaleString(navigator.language)
                  : "Not started yet"}
              </p>
            </div>
            {statisticsFolderData || statisticsListData ? (
              <StatisticsCharts
                data={
                  type === "FOLDER" ? statisticsFolderData : statisticsListData
                }
                statuses={statuses}
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
