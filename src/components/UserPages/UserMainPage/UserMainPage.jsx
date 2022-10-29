import "../../../assets/Global.scss";

import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import classes from "./UserMainPage.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faUser,
  faChartLine,
  faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

import MediaQueries from "../../../HelperComponents/MediaQueries";

import LastLearned from "./LastLearned/LastLearned";
import AboutMe from "./AboutMe/AboutMe";
import Statistics from "./Statistics/Statistics";
import Ranking from "./Ranking/Ranking";

function UserMainPage() {
  const { minWidth1000 } = MediaQueries();

  const { currentUser } = useAuth();
  const cx = classNames.bind(classes);

  const [boxIsOpen, setBoxIsOpen] = useState(false);

  const setBoxIsOpenHandler = () => {
    setBoxIsOpen(true);
  };

  return (
    <>
      <div className={classNames(cx("user-main-wrapper"))}>
        <main className={classNames(cx("user-main"))}>
          <div className={classNames(cx("user-main-container"))}>
            {minWidth1000 === true ? (
              <>
                <h1>Welcome {currentUser.displayName}</h1>
                <h3>Your strike is 27 days!</h3>
                <div className={classNames(cx("user-main-boxes"))}>
                  <Link
                    to="about-me"
                    className={classNames(cx("user-main-box"))}
                  >
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faUser}
                    />
                    <p>About me</p>
                  </Link>
                  <Link
                    to="last-learned"
                    className={classNames(cx("user-main-box"))}
                  >
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faBookOpen}
                    />
                    <p>Last learned</p>
                  </Link>
                  <Link
                    to="statistics"
                    className={classNames(cx("user-main-box"))}
                  >
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faChartLine}
                    />
                    <p>Statistics</p>
                  </Link>
                  <Link
                    to="ranking"
                    className={classNames(cx("user-main-box"))}
                  >
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faRankingStar}
                    />
                    <p>Ranking</p>
                  </Link>
                </div>
              </>
            ) : (
              <div className="grid-user-main">
                <div className={cx("user-main-desktop-hello")}>
                  <div className={cx("user-main-desktop-hello-text")}>
                    <h1>Welcome {currentUser.displayName}</h1>
                    <h3>Your strike is 27 days!</h3>
                  </div>
                </div>

                <div className={cx("user-main-desktop-last-learned")}>
                  <LastLearned />
                </div>
                <div className={cx("user-main-desktop-about-me")}>
                  <AboutMe />
                </div>
                <div className={cx("user-main-desktop-statistics")}>
                  <Statistics />
                </div>
                <div className={cx("user-main-desktop-ranking")}>
                  <Ranking />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <div className={cx("user-main-frames")}>
        <div className={cx("user-main-frame")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1920 79"
          >
            <path
              d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z"
              transform="translate(0 -0.188)"
            ></path>
          </svg>
        </div>
        <div className={cx("user-main-frame")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1920 79"
          >
            <path
              d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z"
              transform="translate(0 -0.188)"
            ></path>
          </svg>
        </div>
        <div className={cx("user-main-frame")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 1920 79"
          >
            <path
              d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z"
              transform="translate(0 -0.188)"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default UserMainPage;