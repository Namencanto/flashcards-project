import classes from "./Ranking.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
import defaultAvatar from "../../../../images/default-avatar.png";

function RankingContent({
  rankingTitleFunction,
  rankingData,
  currentUserNick,
  error,
  isFetched,
}) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("ranking-container"))}>
      <div className={classNames(cx("ranking-title"))}>
        <h2>Ranking</h2>
        <h3>{rankingTitleFunction()}</h3>
      </div>
      {isFetched ? (
        <>
          <ul>
            {!error && rankingData.length === 0 ? (
              <p>
                The ranking is empty for now, start learning to be the best this
                month!
              </p>
            ) : error ? (
              <p style={{ color: "red" }} className="server-denied-large">
                Something went wrong with ranking fetch...
              </p>
            ) : (
              rankingData.map((user, i) => {
                return (
                  <li key={i}>
                    {/* to={`/user/all-users/${user.uid}`}  */}
                    {/* TODO PUBLIC PROFILES */}
                    <Link>
                      <div className={classNames(cx("ranking-description"))}>
                        <div
                          className={classNames(cx("ranking-description-user"))}
                        >
                          <img
                            src={user.avatar ? user.avatar : defaultAvatar}
                            alt="user avatar"
                          />

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
                                  : i === 2 ||
                                    currentUserNick === user.user_name
                                  ? "600"
                                  : "",
                            }}
                          >
                            {user.user_name}
                          </p>
                        </div>
                        <span>Score: {user.ranking_score}</span>
                      </div>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default RankingContent;
