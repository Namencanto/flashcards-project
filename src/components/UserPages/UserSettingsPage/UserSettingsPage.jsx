import "../../../assets/Global.scss";

import classes from "./UserSettingsPage.module.scss";
import classNames from "classnames/bind";

function UserSettingsPage() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("settings"))}>
      <div className="grid-mainpage-settings">
        <div className={classNames(cx("settings-container"))}></div>
      </div>
    </div>
  );
}

export default UserSettingsPage;
