import "../../../assets/Global.scss";
import { faUserGear } from "@fortawesome/free-solid-svg-icons";

import classes from "./UserSettingsPage.module.scss";
import classNames from "classnames/bind";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import axios from "axios";
import UserSettingsPageNavigator from "./UserSettingsPageNavigator";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
function UserSettingsPage() {
  const pathname = useLocation().pathname;
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("settings"))}>
      <div className="grid-mainpage-settings">
        {minWidth1000 ? (
          <UserMobileCard
            backPath={pathname !== "/user/settings" ? "/user/settings" : false}
            icon={faUserGear}
          >
            {<UserSettingsPageNavigator />}
          </UserMobileCard>
        ) : (
          <UserSettingsPageNavigator />
        )}
      </div>
    </div>
  );
}

export default UserSettingsPage;
