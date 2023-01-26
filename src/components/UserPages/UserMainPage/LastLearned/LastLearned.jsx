import classes from "./LastLearned.module.scss";
import classNames from "classnames/bind";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import MediaQueries from "../../../../HelperComponents/MediaQueries";
import { useEffect, useState } from "react";

import axios from "axios";
import LastLearnedContent from "./LastLearnedContent";

function LastLearned(props) {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  const URL = process.env.REACT_APP_URL;

  const [lastLearned, setLastLearned] = useState({
    list: [],
    image: [],
  });
  const [isFetched, setIsFetched] = useState(false);
  const [lastLearnedErrorMessage, setLastLearnedErrorMessage] = useState("");

  useEffect(() => {
    const fetchLastLearned = async () => {
      try {
        setIsFetched(false);
        const res = await axios.get("/users/last-learned");

        if (res.data !== "User don't have learning history") {
          const listsName = res.data.lastLists.map((arr) => arr[0]?.list);
          const images = res.data.lastLists.map((arr) => {
            if (arr[0]?.image) {
              return arr[0]?.image.startsWith("list-image-")
                ? `${URL}/${arr[0]?.image}`
                : arr[0]?.image;
            }
          });

          const listsId = res.data.lastLists.map((arr) => arr[0]?.id);
          const foldersName = res.data.foldersName.map((arr) => arr[0]?.folder);
          setLastLearned({
            list: listsName,
            image: images,
            listId: listsId,
            folder: foldersName,
          });
        } else setLastLearnedErrorMessage("");
      } catch (err) {
        setIsFetched(true);
        err.response
          ? setLastLearnedErrorMessage(err.response.data)
          : setLastLearnedErrorMessage("Something went wrong...");
      }
      setIsFetched(true);
    };
    fetchLastLearned();
  }, []);

  return (
    <div className={classNames(cx("last-learned"))}>
      <div className="grid-mainpage-last-learned">
        {minWidth1000 ? (
          <UserMobileCard icon={faBookOpen}>
            {
              <LastLearnedContent
                isFetched={isFetched}
                lastLearned={lastLearned}
                errorMessage={lastLearnedErrorMessage}
              />
            }
          </UserMobileCard>
        ) : (
          <LastLearnedContent
            isFetched={isFetched}
            lastLearned={lastLearned}
            errorMessage={lastLearnedErrorMessage}
          />
        )}
      </div>
    </div>
  );
}

export default LastLearned;
