import classNames from "classnames/bind";
import UserSettingsHeader from "../UserSettingsHeader";
import classes from "./PrivatyAndLogin.module.scss";
import PrivatyAndLoginContent from "./PrivatyAndLoginContent";
function PrivatyAndLogin() {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("security-login"))}>
      <UserSettingsHeader title={"Privaty and login settings"} />
      <PrivatyAndLoginContent />
    </div>
  );
}

export default PrivatyAndLogin;
