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

function Ranking() {
  const { minWidth1000 } = MediaQueries();
  const { currentUser } = useContext(AuthContext);
  const [rankingData, setRankingData] = useState([
    {
      user_name: "",
      ranking_score: "",
      nationality: "",
      uid: "",
    },
  ]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await axios.get("/users/getRanking");

        let rankingDataObject = [];

        res.data.dataFirst.forEach(({ user_uid, month_score }, i) => {
          let nicks = [];
          for (const arr of res.data.dataSecond) {
            nicks.push(arr[0].nick);
          }
          const userObject = {
            user_name: nicks[i],
            ranking_score: month_score,
            nationality: "PL",
            uid: user_uid,
          };
          rankingDataObject = [...rankingDataObject, userObject];
        });

        rankingDataObject?.sort((a, b) => b.ranking_score - a.ranking_score);
        setRankingData(rankingDataObject);

        console.log(rankingDataObject);
      } catch (err) {
        console.log(err);
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

  const content = (
    <div className={classNames(cx("ranking-container"))}>
      <div className={classNames(cx("ranking-title"))}>
        <h1>RANKING</h1>
        <h3>{rankingTitleFunction()}</h3>
      </div>
      <ul>
        {rankingData.map((user, i) => {
          return (
            <li key={i}>
              <Link to={`/user/allusers/${user.uid}`}>
                <div className={classNames(cx("ranking-description"))}>
                  {/* <ReactCountryFlag svg countryCode={user.nationality} /> coming soon*/}

                  <p
                    style={{
                      color:
                        i === 0
                          ? "gold"
                          : i === 1
                          ? "silver"
                          : i === 2
                          ? "brown"
                          : "",
                      fontWeight:
                        i === 0
                          ? "900"
                          : i === 1
                          ? "700"
                          : i === 2 || currentUser.nick === user.user_name
                          ? "600"
                          : "",
                    }}
                  >
                    {user.user_name}
                  </p>
                  <span>Score: {user.ranking_score}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
  return (
    <div className={classNames(cx("ranking"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRankingStar}>{content}</UserMobileCard>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default Ranking;
