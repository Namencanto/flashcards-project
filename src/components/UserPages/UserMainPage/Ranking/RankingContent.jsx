import classes from "./Ranking.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { languagesArray } from "../../../../languagesFlags/languagesArray";
function RankingContent({
  rankingTitleFunction,
  rankingData,
  currentUserNick,
  error,
}) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("ranking-container"))}>
      <div className={classNames(cx("ranking-title"))}>
        <h1>RANKING</h1>
        <h3>{rankingTitleFunction()}</h3>
      </div>
      <ul>
        {!error && rankingData.length === 0 ? (
          <p>
            The ranking is empty for now, start learning to be the best this
            month!
          </p>
        ) : error ? (
          <p>Something went wrong with ranking fetch...</p>
        ) : (
          rankingData.map((user, i) => {
            return (
              <li key={i}>
                <Link to={`/user/all-users/${user.uid}`}>
                  <div className={classNames(cx("ranking-description"))}>
                    <ReactCountryFlag svg countryCode={"dj"} />
                    <datalist id="browsers">
                      {languagesArray.map((lang) => (
                        <option value={lang.name} />
                      ))}
                    </datalist>

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
                            : i === 2 || currentUserNick === user.user_name
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
          })
        )}
      </ul>
    </div>
  );
}

export default RankingContent;
