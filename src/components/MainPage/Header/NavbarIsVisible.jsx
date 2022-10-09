import classes from "./Header.module.scss";
import "../../../assets/Global.scss";

import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const NavbarIsVisible = () => {
  let cx = classNames.bind(classes);

  const pathName = useLocation().pathname;

  const [videoIsVisible, setVideoIsVisible] = useState(false);
  const minWidth1000 = useWindowDimensions().width < 1000;

  const setVideoIsVisibleHandler = () => {
    videoIsVisible === false
      ? setVideoIsVisible(true)
      : setVideoIsVisible(false);
  };

  return (
    <div className={classNames(cx("navbar-nav-visible"))}>
      <ul className={classNames(cx("navbar-nav"))}>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            className={
              (({ isActive }) => (isActive ? "active" : undefined),
              classNames(
                cx("navbar-nav-link"),
                `${pathName === "/" ? "active" : ""}`
              ))
            }
            to="home"
          >
            HOME
          </NavLink>
        </li>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink className={classNames(cx("navbar-nav-link"))} to="features">
            FEATURES
          </NavLink>
        </li>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink className={classNames(cx("navbar-nav-link"))} to="details">
            DETAILS
          </NavLink>
        </li>

        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onClick={setVideoIsVisibleHandler}
            className={classNames(
              cx("navbar-nav-link"),
              cx("navbar-dropdown-toggle")
            )}
            to="video"
          >
            VIDEO
            <FontAwesomeIcon
              className={classNames(cx("navbar-nav-video-icon"))}
              icon={faCaretDown}
            />
            {videoIsVisible && (
              <div className={classNames(cx("navbar-dropdown-menu"))}>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="video/article"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    ARTICLE DETAILS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="video/terms"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    TERMS CONDITIONS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="video/policy"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    PRIVACY POLICY
                  </span>
                </NavLink>
              </div>
            )}
          </NavLink>
        </li>

        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink className={classNames(cx("navbar-nav-link"))} to="pricing">
            PRICING
          </NavLink>
        </li>
        {!minWidth1000 && (
          <span className={classNames(cx("navbar-nav-item"))}>
            <NavLink className="btn-outline-small-header" to="login">
              LOG IN
            </NavLink>
          </span>
        )}
      </ul>

      {minWidth1000 && (
        <span className={classNames(cx("navbar-nav-item"))}>
          <NavLink className="btn-outline-small-header" to="">
            LOG IN
          </NavLink>
        </span>
      )}
    </div>
  );
};
export default NavbarIsVisible;
