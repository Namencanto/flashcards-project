import "../../../assets/Global.scss";

import classes from "./Features.module.scss";
import classNames from "classnames/bind";

import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { faChartColumn } from "@fortawesome/free-solid-svg-icons";

import FeaturesContent from "./FeaturesContent";

import FeaturesImage1 from "../../../images/features-1.png";
import FeaturesImage2 from "../../../images/features-2.png";
import FeaturesImage3 from "../../../images/features-3.png";

function Features() {
  const cx = classNames.bind(classes);
  const [feature, setFeature] = useState(FeaturesImage1);

  const pathName = useLocation().pathname;

  const setFeatureHandler = (img) => {
    setFeature(img);
  };

  const iconStyling = classNames(cx("features-nav-item-icon"));
  const navLinkStyling = classNames(
    cx("features-nav-item-link"),
    "features-active"
  );

  return (
    <div className={classNames(cx("features"))}>
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
              <NavLink
                className={`${navLinkStyling} ${
                  pathName === "/" ? "active" : ""
                }`}
                to="listbuilder-nav"
              >
                <FontAwesomeIcon className={iconStyling} icon={faList} />
                List Builder
              </NavLink>
            </li>
            <li className={classNames(cx("features-nav-item"))}>
              <NavLink className={navLinkStyling} to="campaigns-nav">
                <FontAwesomeIcon
                  className={iconStyling}
                  icon={faEnvelopeOpenText}
                />
                Campaigns
              </NavLink>
            </li>
            <li className={classNames(cx("features-nav-item"))}>
              <NavLink className={navLinkStyling} to="analytics-nav">
                <FontAwesomeIcon className={iconStyling} icon={faChartColumn} />
                Analytics
              </NavLink>
            </li>
          </ul>

          {/* content */}
          <Routes>
            <Route
              path="/"
              element={<FeaturesContent image={FeaturesImage1} />}
            ></Route>
            <Route
              path="listbuilder-nav/*"
              element={<FeaturesContent image={FeaturesImage1} />}
            ></Route>

            <Route
              path="campaigns-nav/*"
              element={<FeaturesContent image={FeaturesImage2} />}
            ></Route>
            <Route
              path="analytics-nav/*"
              element={<FeaturesContent image={FeaturesImage3} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Features;
