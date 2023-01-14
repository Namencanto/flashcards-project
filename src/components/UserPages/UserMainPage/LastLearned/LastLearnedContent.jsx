import { Link } from "react-router-dom";
import classes from "./LastLearned.module.scss";
import classNames from "classnames/bind";

import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

function LastLearnedContent({ errorMessage, lastLearned, isFetched }) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("last-learned-content"))}>
      <h2>Last learned</h2>
      {isFetched ? (
        <>
          <ul>
            {lastLearned.list.length > 0 ? (
              lastLearned.list.map((list, i) => {
                return (
                  <li key={i}>
                    <Link
                      to={`/user/techcards/${lastLearned?.folder[i]}/${list}/${lastLearned?.listId[i]}`}
                    >
                      {lastLearned?.image[i] ? (
                        <img
                          src={lastLearned?.image[i]}
                          alt="list illustration"
                        />
                      ) : (
                        ""
                      )}
                      <p>{list}</p>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className={classNames(cx("last-learned-content-empty"))}>
                {errorMessage.length !== 0
                  ? errorMessage
                  : "Last learned is currently empty, start learn to display"}
              </li>
            )}
          </ul>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default LastLearnedContent;
