import "../../../assets/Global.scss";
import React from "react";

import classes from "./Features.module.scss";
import classNames from "classnames/bind";

import { NavLink, Routes, Route, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";

import FeaturesContent from "./FeaturesContent";

import FeaturesImage1 from "../../../images/features-1.png";
import FeaturesImage2 from "../../../images/features-2.png";
import FeaturesImage3 from "../../../images/features-3.png";

const Features = React.forwardRef((props, ref) => {
  const cx = classNames.bind(classes);

  const pathName = useLocation().pathname;

  const iconStyling = classNames(cx("features-nav-item-icon"));
  const navLinkStyling = classNames(
    cx("features-nav-item-link"),
    "features-active"
  );

  const setdefaultFeatureActiveHandler = () => {
    if (
      pathName !== "/features/campaigns-nav" &&
      pathName !== "/features/analytics-nav"
    ) {
      return (
        <NavLink
          className={classNames(
            cx("features-nav-item-link"),
            "features-active",
            "active"
          )}
          to="features/listbuilder-nav"
        >
          <FontAwesomeIcon className={iconStyling} icon={faList} />
          List Builder
        </NavLink>
      );
    } else {
      return (
        <NavLink
          className={classNames(
            cx("features-nav-item-link"),
            "features-active"
          )}
          to="features/listbuilder-nav"
        >
          <FontAwesomeIcon className={iconStyling} icon={faList} />
          List Builder
        </NavLink>
      );
    }
  };
  // te hendlerki to mozna jeszcze ulepszyc ale pierdole to jak na razie
  setdefaultFeatureActiveHandler();

  return (
    <div ref={ref} id="features-part" className={classNames(cx("features"))}>
      <div className="grid-mainpage-features">
        <div className={classNames(cx("features-container"))}>
          <div className={classNames(cx("features-title"))}>
            <div className={classNames(cx("features-title-heading"))}>
              FEATURES
            </div>
            <h2>Marketing Automation</h2>
            <p>
              Take your business strategy to the next level and automatize your
              marketing tasks to save time for product development. Tivo can
              provide results in less than 2 weeks
            </p>
          </div>

          <ul className={classNames(cx("features-nav-tabs"))}>
            <li className={classNames(cx("features-nav-item"))}>
              {/* default link */}
              {setdefaultFeatureActiveHandler()}
            </li>
            <li className={classNames(cx("features-nav-item"))}>
              <NavLink className={navLinkStyling} to="features/campaigns-nav">
                <FontAwesomeIcon
                  className={iconStyling}
                  icon={faEnvelopeOpenText}
                />
                Campaigns
              </NavLink>
            </li>
            <li className={classNames(cx("features-nav-item"))}>
              <NavLink className={navLinkStyling} to="features/analytics-nav">
                <FontAwesomeIcon className={iconStyling} icon={faChartColumn} />
                Analytics
              </NavLink>
            </li>
          </ul>

          {/* content */}

          <Routes>
            <Route
              path="/*"
              element={
                <FeaturesContent
                  image={FeaturesImage1}
                  title={"List Building Is Easier Than Ever"}
                />
              }
            ></Route>
            <Route
              path="/features"
              element={
                <FeaturesContent
                  image={FeaturesImage1}
                  title={"List Building Is Easier Than Ever"}
                />
              }
            ></Route>
            <Route
              path="features/listbuilder-nav"
              element={
                <FeaturesContent
                  image={FeaturesImage1}
                  title={"List Building Is Easier Than Ever"}
                />
              }
            ></Route>

            <Route
              path="features/campaigns-nav"
              element={
                <FeaturesContent
                  image={FeaturesImage2}
                  title={"Campaigns Monitoring Tools"}
                />
              }
            ></Route>
            <Route
              path="features/analytics-nav"
              element={
                <FeaturesContent
                  image={FeaturesImage3}
                  title={"Analytics Control Panel"}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
});
export default Features;
