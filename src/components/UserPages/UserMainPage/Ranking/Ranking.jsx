import classes from "./Ranking.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import RankingContent from "./RankingContent";

function Ranking() {
  const { minWidth1000 } = MediaQueries();
  const { currentUser } = useContext(AuthContext);
  const [rankingData, setRankingData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.get("/users/getRanking");

        let rankingDataObject = [];

        res.data.dataFirst.forEach(({ user_uid, month_score }, i) => {
          let nicks = [];
          let avatars = [];
          console.log(res.data.dataSecond);
          for (const arr of res.data.dataSecond) {
            nicks.push(arr[0].nick);
            console.log(arr[0].avatar);
            if (arr[0].avatar) {
              avatars.push(
                arr[0].avatar.startsWith("user-avatar-")
                  ? `${URL}/${arr[0].avatar}`
                  : arr[0].avatar
              );
            } else avatars.push(null);
          }
          console.log(nicks[i]);
          const userObject = {
            user_name: nicks[i],
            ranking_score: month_score,
            nationality: "PL",
            avatar: avatars[i],
            uid: user_uid,
          };
          rankingDataObject = [...rankingDataObject, userObject];
        });

        rankingDataObject?.sort((a, b) => b.ranking_score - a.ranking_score);
        setRankingData(rankingDataObject);
      } catch (err) {
        setFetchError(true);
      }
    };
    fetchRanking();
  }, []);

  const cx = classNames.bind(classes);

  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  new Date().getMonth();

  function rankingTitleFunction() {
    const rankingTitle =
      date.getFullYear() + " " + month.charAt(0).toUpperCase() + month.slice(1);
    return rankingTitle;
  }

  return (
    <div className={classNames(cx("ranking"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRankingStar}>
            {
              <RankingContent
                rankingTitleFunction={rankingTitleFunction}
                rankingData={rankingData}
                currentUserNick={currentUser.nick}
                error={fetchError}
              />
            }
          </UserMobileCard>
        ) : (
          <RankingContent
            rankingTitleFunction={rankingTitleFunction}
            rankingData={rankingData}
            currentUserNick={currentUser.nick}
            error={fetchError}
          />
        )}
      </div>
    </div>
  );
}

export default Ranking;
