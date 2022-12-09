import "../../../assets/Global.scss";

import classes from "./UserTechcards.module.scss";
import classNames from "classnames/bind";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

import MediaQueries from "../../../HelperComponents/MediaQueries";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";

import UserTechcardsContent from "./UserTechcardsContent/UserTechcardsContent";

function UserTechcards() {
  const { minWidth1000 } = MediaQueries();

  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("techcards"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket}>
            {<UserTechcardsContent />}
          </UserMobileCard>
        ) : (
          <UserTechcardsContent />
        )}
      </div>
    </div>
  );
}

export default UserTechcards;
