import classNames from "classnames/bind";
import classes from "./UserSettingsPage.module.scss";
import { BsGear } from "react-icons/bs";
import { IoShieldHalfOutline } from "react-icons/io5";
import { TfiUnlock } from "react-icons/tfi";
import { AiOutlineInfoCircle } from "react-icons/ai";
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
      <Link to="security-login" className={classNames(cx("settings-option"))}>
        <IoShieldHalfOutline />
        <p>Security & login</p>
      </Link>
      <Link to="privaty" className={classNames(cx("settings-option"))}>
        <TfiUnlock />
        <p>Privaty</p>
      </Link>
      <Link to="information" className={classNames(cx("settings-option"))}>
        <AiOutlineInfoCircle />
        <p>Information</p>
      </Link>
      <Link to="delete-account" className={classNames(cx("settings-option"))}>
        <FiUserX />
        <p>Delete account</p>
      </Link>
    </>
  );
}

export default UserSettingsPageMainContent;
