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

  const [userIsVisible, setUserIsVisible] = useState(false);
  const [videoIsVisible, setVideoIsVisible] = useState(false);

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
            id="video"
            onMouseEnter={() => {
              setVideoIsVisible(true);
            }}
            onMouseLeave={() => {
              setVideoIsVisible(false);
            }}
            onClick={(e) => {
              if (videoIsVisible) {
                e.target.id === "video" && scrollHandler("player");
              } else {
                e.preventDefault();
              }
            }}
            className={classNames(
              cx("navbar-nav-link"),
              cx("navbar-dropdown-toggle")
            )}
            disabled={videoIsVisible}
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
                  onClick={() => {
                    window.scroll({ top: 0, left: 0 });
                  }}
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/how-it-works"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    HOW IT WORKS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  onClick={() => {
                    window.scroll({ top: 0, left: 0 });
                  }}
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/terms-conditions"
                >
                  <span className={classNames(cx("navbar-nav-item-text"))}>
                    TERMS CONDITIONS
                  </span>
                </NavLink>
                <div className={classNames(cx("navbar-dropdown-items"))}></div>
                <NavLink
                  onClick={() => {
                    window.scroll({ top: 0, left: 0 });
                  }}
                  className={classNames(cx("navbar-dropdown-items-item"))}
                  to="/privacy-policy"
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
        {props.currentUser && props.currentUser.nick !== null ? (
          <li className={classNames(cx("navbar-nav-item"))}>
            <NavLink
              onClick={(e) => {
                if (!userIsVisible) {
                  e.preventDefault();
                }
              }}
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
              {props.currentUser.nick.toUpperCase()}
              <FontAwesomeIcon
                className={classNames(cx("navbar-nav-video-icon"))}
                icon={faCaretDown}
              />
              {userIsVisible && (
                <div className={classNames(cx("navbar-dropdown-menu"))}>
                  <NavLink
                    className={classNames(cx("navbar-dropdown-items-item"))}
                    to="user/settings"
                  >
                    <span className={classNames(cx("navbar-nav-item-text"))}>
                      SETTINGS
                    </span>
                  </NavLink>
                  <div
                    className={classNames(cx("navbar-dropdown-items"))}
                  ></div>
                  <NavLink
                    className={classNames(cx("navbar-dropdown-items-item"))}
                    to="/how-it-works"
                  >
                    <span className={classNames(cx("navbar-nav-item-text"))}>
                      HOW IT WORKS
                    </span>
                  </NavLink>
                  <div
                    className={classNames(cx("navbar-dropdown-items"))}
                  ></div>
                  <NavLink
                    onClick={() => {
                      scrollHandler("pricing");
                    }}
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
