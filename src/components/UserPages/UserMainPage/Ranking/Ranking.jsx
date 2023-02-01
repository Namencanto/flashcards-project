import classes from "./Ranking.module.scss";
import classNames from "classnames/bind";

import { AuthContext } from "../../../../context/AuthContext";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
import { useState, useEffect, useContext } from "react";

import axios from "axios";
import RankingContent from "./RankingContent";

function Ranking() {
  const { minWidth1000 } = MediaQueries();
  const { currentUser } = useContext(AuthContext);
  const [rankingData, setRankingData] = useState([]);
  const [fetchError, setFetchError] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    const fetchRanking = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get("/users/ranking");

        if (res.data) {
          let rankingDataObject = [];
          res.data.dataFirst.forEach(({ user_uid, month_score }, i) => {
            let nicks = [];
            let avatars = [];
            for (const arr of res.data.dataSecond) {
              const nick = arr.length ? arr[0].nick : arr.nick;
              const avatar = arr.length ? arr[0].avatar : arr.avatar;

              nicks.push(nick);
              if (avatar) {
                avatars.push(
                  avatar.startsWith("user-avatar-")
                    ? `${URL}/${avatar}`
                    : avatar
                );
              } else avatars.push(null);
            }
            const userObject = {
              user_name: nicks[i],
              ranking_score: month_score,
              avatar: avatars[i],
              uid: user_uid,
            };
            rankingDataObject = [...rankingDataObject, userObject];
          });

          rankingDataObject?.sort((a, b) => b.ranking_score - a.ranking_score);
          setRankingData(rankingDataObject);
        }
      } catch (err) {
        console.log(err);
        setFetchError(true);
      }
      setIsFetched(true);
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

  const props = {
    rankingTitleFunction,
    rankingData,
    currentUserNick: currentUser.nick,
    error: fetchError,
    isFetched,
  };
  return (
    <div className={classNames(cx("ranking"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRankingStar}>
            {<RankingContent {...props} />}
          </UserMobileCard>
        ) : (
          <RankingContent {...props} />
        )}
      </div>
    </div>
  );
}

export default Ranking;
