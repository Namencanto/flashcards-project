import classNames from "classnames/bind";
import classes from "./PrivatyAndLogin.module.scss";
import PrivatyAndLoginContent from "./PrivatyAndLoginContent";
function PrivatyAndLogin() {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("security-login"))}>
      <h1>Privaty and login settings</h1>
      <PrivatyAndLoginContent />
    </div>
  );
}

export default PrivatyAndLogin;
