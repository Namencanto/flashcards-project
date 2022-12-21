import classNames from "classnames/bind";
import classes from "./UserSettingsPage.module.scss";
import General from "./OptionsPages/General/General";
import { Route, Routes } from "react-router-dom";
import UserSettingsPageMainContent from "./UserSettingsPageMainContent";
function UserSettingsPageNavigator() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("settings-container"))}>
      <Routes>
        <Route path="general" element={<General />}></Route>
        <Route path="" element={<UserSettingsPageMainContent />}></Route>
      </Routes>
    </div>
  );
}

export default UserSettingsPageNavigator;
