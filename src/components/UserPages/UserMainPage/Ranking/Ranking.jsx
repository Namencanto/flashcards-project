import classes from "./Ranking.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
const dummyUsersData = [
  {
    user_name: "Dave",
    ranking_score: 241,
    nationality: "US",
    uid: "1154241jd21",
  },
  {
    user_name: "Scoobie Doo",
    ranking_score: 441,
    nationality: "FR",
    uid: "1241251jd21",
  },
  {
    user_name: "Książe siedmiu wzgórz",
    ranking_score: 22,
    nationality: "PL",
    uid: "124asg11jd21",
  },
  {
    user_name: "TakZarabiamWEuroACo?",
    ranking_score: 499,
    nationality: "DE",
    uid: "1521241jd21",
  },
  {
    user_name: "Poliglota",
    ranking_score: 2137,
    nationality: "CH",
    uid: "124155jd21",
  },
  {
    user_name: "DekarzTokarz",
    ranking_score: 122,
    nationality: "PL",
    uid: "1241jd2111",
  },
];

function Ranking() {
  const { minWidth1000 } = MediaQueries();
  const { currentUser } = useContext(AuthContext);

  dummyUsersData.sort((a, b) => b.ranking_score - a.ranking_score);
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
        {dummyUsersData.map((user, i) => {
          return (
            <li key={i}>
              <Link to={`/user/allusers/${user.uid}`}>
                <div className={classNames(cx("ranking-description"))}>
                  <ReactCountryFlag svg countryCode={user.nationality} />

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
                          : i === 2
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
