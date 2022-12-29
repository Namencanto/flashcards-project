import classNames from "classnames/bind";
import classes from "./PrivatyAndLogin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

function PrivatyAndLoginContent() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("privaty-login-content"))}>
      <div className={classNames(cx("privaty-login-content-checkboxes"))}>
        <div
          className={classNames(cx("privaty-login-content-checkbox-content"))}
        >
          <label htmlFor="notifications">Email notifications</label>
          <input id="notifications" type="checkbox" />
        </div>
        <div
          className={classNames(cx("privaty-login-content-checkbox-content"))}
        >
          <label htmlFor="public-profile">
            Profile is public{" "}
            <div
              className={classNames(
                cx("privaty-login-content-checkbox-tooltip")
              )}
            >
              <FontAwesomeIcon
                className={classNames(cx("navbar-nav-video-icon"))}
                icon={faQuestionCircle}
              />
              <span>This option allow other users to view your profile</span>
            </div>
          </label>
          <input id="public-profile" type="checkbox" />
        </div>
      </div>

      <div className="input-default">
        <input id="email" type="email" placeholder=" " />
        <label htmlFor="email">E-mail</label>
      </div>
      <div className="input-default" style={{ marginTop: "1.5rem" }}>
        <input id="password" type="password" placeholder=" " />
        <label htmlFor="password">Old password</label>
      </div>
      <div className="input-default" style={{ marginTop: "1.5rem" }}>
        <input id="new-password" type="password" placeholder=" " />
        <label htmlFor="new-password">New Password</label>
        <p>Leave empty to change only email</p>
      </div>
      <button className="btn-solid-large">Change</button>
    </div>
  );
}

export default PrivatyAndLoginContent;
