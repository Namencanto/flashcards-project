import classNames from "classnames/bind";
import classes from "../PrivatyAndLogin.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import {
  emailNotificationsHandler,
  publicProfileHandler,
} from "./PrivatyAndLoginCheckboxesBackendFunctions";

function PrivatyAndLoginCheckboxes({
  emailNotificationsDefaultValue,
  publicProfileDefaultValue,
}) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("privaty-login-content-checkboxes"))}>
      <div className={classNames(cx("privaty-login-content-checkbox-content"))}>
        <label htmlFor="notifications">Email notifications </label>
        <div
          className={classNames(cx("privaty-login-content-checkbox-tooltip"))}
        >
          <span>We will send you our offers and discounts</span>
          <FontAwesomeIcon
            style={{ marginLeft: "-2.75rem" }}
            icon={faQuestionCircle}
          />
        </div>
        <input
          onChange={(e) => {
            emailNotificationsHandler(e.target.checked);
          }}
          defaultChecked={emailNotificationsDefaultValue}
          id="notifications"
          type="checkbox"
        />
      </div>
      <div className={classNames(cx("privaty-login-content-checkbox-content"))}>
        <label htmlFor="public-profile">Public profile </label>
        <div
          className={classNames(cx("privaty-login-content-checkbox-tooltip"))}
        >
          <span>This option allow other users to view your profile</span>
          <FontAwesomeIcon
            style={{ marginLeft: "-6.5rem" }}
            icon={faQuestionCircle}
          />
        </div>
        <input
          onChange={(e) => {
            publicProfileHandler(e.target.checked);
          }}
          defaultChecked={publicProfileDefaultValue}
          id="public-profile"
          type="checkbox"
        />
      </div>
    </div>
  );
}

export default PrivatyAndLoginCheckboxes;
