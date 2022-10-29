import classes from "./Header.module.scss";
import "../../../assets/Global.scss";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";

import MediaQueries from "../../../HelperComponents/MediaQueries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../context/AuthContext";

const NavbarIsVisible = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  let pathName = useLocation().pathname;

  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();

  const [userIsVisible, setUserIsVisible] = useState(false);

  return (
    <div className={classNames(cx("navbar-nav-visible"))}>
      <ul className={classNames(cx("navbar-nav"))}>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onClick={() => {
              window.scroll({ top: 0, left: 0 });
            }}
            className={
              (({ isActive }) => (isActive ? "active" : undefined),
              classNames(
                cx("navbar-nav-link"),
                `${pathName === "/" ? "active" : ""}`
              ))
            }
            to="/home"
          >
            HOME
          </NavLink>
        </li>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink className={classNames(cx("navbar-nav-link"))} to="techcards">
            MY TECHCARDS
          </NavLink>
        </li>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink className={classNames(cx("navbar-nav-link"))} to="courses">
            OUR COURSES
          </NavLink>
        </li>

        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onMouseEnter={() => {
              setUserIsVisible(true);
            }}
            onMouseLeave={() => {
              setUserIsVisible(false);
            }}
            className={classNames(
              cx("navbar-nav-link"),
              cx("navbar-dropdown-toggle")
            )}
            to="/user"
          >
            {currentUser.displayName.toUpperCase()}
            <FontAwesomeIcon
              className={classNames(cx("navbar-nav-video-icon"))}
              icon={faCaretDown}
            />
            {userIsVisible && (
              <div className={classNames(cx("navbar-dropdown-menu"))}>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="settings"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    SETTINGS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/how-it-works"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    HOW IT WORKS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/pricing"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    PREMIUM ACCESS
                  </span>
                </NavLink>
              </div>
            )}
          </NavLink>
        </li>

        {!minWidth1000 && (
          <span className={classNames(cx("navbar-nav-item"))}>
            <button onClick={handleLogout} className="btn-outline-small-header">
              LOG OUT
            </button>
          </span>
        )}
      </ul>

      {minWidth1000 && (
        <span className={classNames(cx("navbar-nav-item"))}>
          <button onClick={handleLogout} className="btn-outline-small-header">
            LOG OUT
          </button>
        </span>
      )}
    </div>
  );
};
export default NavbarIsVisible;
