import React from "react";

import classes from "./Price.module.scss";
import classNames from "classnames/bind";

import "../../../assets/Global.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Price = React.forwardRef((props, ref) => {
  const cx = classNames.bind(classes);
  return (
    <div ref={ref} className="grid-mainpage-price">
      <div className={classNames(cx("price"))}>
        <div className={classNames(cx("price-heading"))}>
          <p>PRICING</p>
          <h2>Pricing Options Table</h2>
        </div>
        <div className={classNames(cx("price-cards"))}>
          <div className={classNames(cx("price-card"))}>
            <div className={classNames(cx("price-card-body"))}>
              <div className={classNames(cx("price-card-body-text-box"))}>
                <div className={classNames(cx("price-card-body-title"))}>
                  BASIC
                </div>
                <div className={classNames(cx("price-card-body-price"))}>
                  <span
                    className={classNames(cx("price-card-body-price-currency"))}
                  >
                    $
                  </span>
                  <span
                    className={classNames(cx("price-card-body-price-value"))}
                  >
                    Free
                  </span>
                </div>
                <div className={classNames(cx("price-card-body-frequency"))}>
                  14 days trial
                </div>
              </div>
              <div className={classNames(cx("price-card-body-divider"))}></div>
              <ul>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>Email Marketing Module</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>User Control Management</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>List Building And Cleaning</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Collected Data Reports</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Planning And Evaluation</p>
                </li>
              </ul>
              <button className="btn-solid-medium">SIGN UP</button>
            </div>
          </div>

          <div className={classNames(cx("price-card"))}>
            <div className={classNames(cx("price-card-body"))}>
              <div className={classNames(cx("price-card-body-text-box"))}>
                <div className={classNames(cx("price-card-body-title"))}>
                  ADVANCED
                </div>
                <div className={classNames(cx("price-card-body-price"))}>
                  <span
                    className={classNames(cx("price-card-body-price-currency"))}
                  >
                    $
                  </span>
                  <span
                    className={classNames(cx("price-card-body-price-value"))}
                  >
                    29.99
                  </span>
                </div>
                <div className={classNames(cx("price-card-body-frequency"))}>
                  monthly
                </div>
              </div>
              <div className={classNames(cx("price-card-body-divider"))}></div>
              <ul>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>Email Marketing Module</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>User Control Management</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>List Building And Cleaning</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Collected Data Reports</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Planning And Evaluation</p>
                </li>
              </ul>
              <button className="btn-solid-medium">SIGN UP</button>
            </div>
          </div>

          <div className={classNames(cx("price-card"))}>
            <div className={classNames(cx("price-card-body"))}>
              <div className={classNames(cx("price-card-body-text-box"))}>
                <div className={classNames(cx("price-card-body-title"))}>
                  COMPLETE
                </div>
                <div className={classNames(cx("price-card-body-price"))}>
                  <span
                    className={classNames(cx("price-card-body-price-currency"))}
                  >
                    $
                  </span>
                  <span
                    className={classNames(cx("price-card-body-price-value"))}
                  >
                    39.99
                  </span>
                </div>
                <div className={classNames(cx("price-card-body-frequency"))}>
                  monthly
                </div>
              </div>
              <div className={classNames(cx("price-card-body-divider"))}></div>
              <ul>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>Email Marketing Module</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-check"))}
                    icon={faCheck}
                  />
                  <p>User Control Management</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>List Building And Cleaning</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Collected Data Reports</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("price-card-body-icons-x"))}
                    icon={faTimes}
                  />
                  <p>Planning And Evaluation</p>
                </li>
              </ul>
              <button className="btn-solid-medium">SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Price;
