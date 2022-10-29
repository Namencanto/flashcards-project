import classes from "./Header.module.scss";
import "../../../assets/Global.scss";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames/bind";

import MediaQueries from "../../../HelperComponents/MediaQueries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const NavbarIsVisible = (props) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await props.logout();
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // function which handling a logic of navbar links navigate at page
  const scrollHandler = (part) => {
    const scrollFunction = () => {
      const [featuresPart, detailsPart, playerPart, pricingPart] =
        props.allParts;

      if (part === "features") featuresPart.current.scrollIntoView();
      if (part === "details") detailsPart.current.scrollIntoView();
      if (part === "player") playerPart.current.scrollIntoView();
      if (part === "pricing") pricingPart.current.scrollIntoView();
    };

    if (!props.allParts) {
      window.addEventListener("load", function () {
        scrollFunction();
      });
    } else scrollFunction();
  };

  let pathName = useLocation().pathname;

  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();

  const [videoIsVisible, setVideoIsVisible] = useState(false);

  return (
    <div className={classNames(cx("navbar-nav-visible"))}>
      <ul className={classNames(cx("navbar-nav"))}>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onClick={() => {
              // addEventListener for execute after components loaded

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
          <NavLink
            onClick={() => {
              scrollHandler("features");
            }}
            className={classNames(cx("navbar-nav-link"))}
            to="/features"
          >
            FEATURES
          </NavLink>
        </li>
        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onClick={() => {
              scrollHandler("details");
            }}
            className={classNames(cx("navbar-nav-link"))}
            to="/details"
          >
            DETAILS
          </NavLink>
        </li>

        <li className={classNames(cx("navbar-nav-item"))}>
          <NavLink
            onMouseEnter={() => {
              setVideoIsVisible(true);
            }}
            onMouseLeave={() => {
              setVideoIsVisible(false);
            }}
            onClick={() => {
              scrollHandler("player");
            }}
            className={classNames(
              cx("navbar-nav-link"),
              cx("navbar-dropdown-toggle")
            )}
            to="/video"
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
                  to="/video/article"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    ARTICLE DETAILS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/video/terms"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    TERMS CONDITIONS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/video/policy"
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
          <NavLink
            onClick={() => {
              scrollHandler("pricing");
            }}
            className={classNames(cx("navbar-nav-link"))}
            to="/pricing"
          >
            PRICING
          </NavLink>
        </li>
        {props.currentUser && props.currentUser.displayName !== null ? (
          <li className={classNames(cx("navbar-nav-item"))}>
            <NavLink className={classNames(cx("navbar-nav-link"))} to="/user">
              {props.currentUser.displayName.toUpperCase()}
            </NavLink>
          </li>
        ) : (
          ""
        )}
        {!minWidth1000 && (
          <span className={classNames(cx("navbar-nav-item"))}>
            {props.currentUser ? (
              <button
                onClick={handleLogout}
                className="btn-outline-small-header"
              >
                LOG OUT
              </button>
            ) : (
              <NavLink className="btn-outline-small-header" to="/login">
                LOG IN
              </NavLink>
            )}
          </span>
        )}
      </ul>

      {minWidth1000 && (
        <span className={classNames(cx("navbar-nav-item"))}>
          {props.currentUser ? (
            <button onClick={handleLogout} className="btn-outline-small-header">
              LOG OUT
            </button>
          ) : (
            <NavLink className="btn-outline-small-header" to="/login">
              LOG IN
            </NavLink>
          )}
        </span>
      )}
    </div>
  );
};
export default NavbarIsVisible;
