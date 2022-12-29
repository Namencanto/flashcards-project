import classNames from "classnames/bind";
import classes from "./UserSettingsPage.module.scss";
import { BsGear } from "react-icons/bs";
import { IoShieldHalfOutline } from "react-icons/io5";
import { BsSliders } from "react-icons/bs";
import { FiUserX } from "react-icons/fi";
import { Link } from "react-router-dom";
function UserSettingsPageMainContent() {
  const cx = classNames.bind(classes);

  return (
    <>
      <h1>Settings</h1>
      <Link to="general" className={classNames(cx("settings-option"))}>
        <BsGear />
        <p>General</p>
      </Link>
      <Link to="privaty-login" className={classNames(cx("settings-option"))}>
        <IoShieldHalfOutline />
        <p>Privaty & Login</p>
      </Link>
      <Link to="learning" className={classNames(cx("settings-option"))}>
        <BsSliders />
        <p>Learning</p>
      </Link>
      <Link to="delete-account" className={classNames(cx("settings-option"))}>
        <FiUserX />
        <p>Delete account</p>
      </Link>
    </>
  );
}

export default UserSettingsPageMainContent;
