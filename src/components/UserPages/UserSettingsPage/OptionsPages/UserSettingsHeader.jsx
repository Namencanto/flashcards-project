import classNames from "classnames/bind";
import classes from "../UserSettingsPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function UserSettingsHeader({ title }) {
  const cx = classNames.bind(classes);
  return (
    <header className={classNames(cx("settings-header"))}>
      <Link to="/user/settings">
        <FontAwesomeIcon style={{ fontSize: "3rem" }} icon={faArrowLeft} />
      </Link>
      <h1>{title}</h1>
    </header>
  );
}

export default UserSettingsHeader;
