import classes from "./Price.module.scss";
import classNames from "classnames/bind";

import "../../../assets/Global.scss";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionModal from "./TransactionModal/TransactionModal";
import { useEffect } from "react";
import axios from "axios";

export const premiumTypes = [
  {
    premiumType: "Trial",
    price: 0,
  },
  {
    premiumType: "Advanced",
    price: 59.88,
  },
  {
    premiumType: "Complete",
    price: 83.88,
  },
];

const Price = React.forwardRef((props, ref) => {
  const cx = classNames.bind(classes);

  const [userPremium, setUserPremium] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [membership, setMembership] = useState("");

  useEffect(() => {
    const checkUserPremium = async () => {
      console.log("asfasffassfsf");
      if (props.currentUser) {
        try {
          const res = await axios.get("/premium/check-user");
          console.log(res);
          const currentDate = new Date();
          const expiryDate = new Date(res.data);
          console.log(expiryDate);
          if (expiryDate.getTime() > currentDate.getTime()) {
            setUserPremium(true);
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkUserPremium();
  });
  console.log(userPremium);

  const setModalIsVisibleHandler = () => {
    setModalIsVisible(true);
  };
  const setModalIsUnvisibleHandler = () => {
    setModalIsVisible(false);
  };

  return (
    <>
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
                    {premiumTypes[0].premiumType.toUpperCase()}
                  </div>
                  <div className={classNames(cx("price-card-body-price"))}>
                    <span
                      className={classNames(
                        cx("price-card-body-price-currency")
                      )}
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
                <div
                  className={classNames(cx("price-card-body-divider"))}
                ></div>
                <ul>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />{" "}
                    <p>Support</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Learning analytics</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Discounts</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Unlimited techcards</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-x"))}
                      icon={faTimes}
                    />
                    <p>Premium courses</p>
                  </li>
                </ul>
                {props.currentUser ? (
                  userPremium ? (
                    ""
                  ) : (
                    <button
                      onClick={() => {
                        setMembership(premiumTypes[2]);
                        setModalIsVisibleHandler();
                      }}
                      className="btn-solid-medium"
                    >
                      CHOOSE
                    </button>
                  )
                ) : (
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <button className="btn-solid-medium">SIGN UP</button>
                  </Link>
                )}
              </div>
            </div>

            <div className={classNames(cx("price-card"))}>
              <div className={classNames(cx("price-card-body"))}>
                <div className={classNames(cx("price-card-body-text-box"))}>
                  <div className={classNames(cx("price-card-body-title"))}>
                    {premiumTypes[1].premiumType.toUpperCase()}
                  </div>
                  <div className={classNames(cx("price-card-body-price"))}>
                    <span
                      className={classNames(
                        cx("price-card-body-price-currency")
                      )}
                    >
                      $
                    </span>
                    <span
                      className={classNames(cx("price-card-body-price-value"))}
                    >
                      4.99
                    </span>
                  </div>
                  <div className={classNames(cx("price-card-body-frequency"))}>
                    monthly
                  </div>
                </div>
                <div
                  className={classNames(cx("price-card-body-divider"))}
                ></div>
                <ul>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Support</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Learning analytics</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Discounts</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Unlimited techcards</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-x"))}
                      icon={faTimes}
                    />
                    <p>Premium courses</p>
                  </li>
                </ul>
                {props.currentUser ? (
                  userPremium ? (
                    ""
                  ) : (
                    <button
                      onClick={() => {
                        setMembership(premiumTypes[2]);
                        setModalIsVisibleHandler();
                      }}
                      className="btn-solid-medium"
                    >
                      CHOOSE
                    </button>
                  )
                ) : (
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <button className="btn-solid-medium">SIGN UP</button>
                  </Link>
                )}
              </div>
            </div>

            <div className={classNames(cx("price-card"))}>
              <div className={classNames(cx("price-card-body"))}>
                <div className={classNames(cx("price-card-body-text-box"))}>
                  <div className={classNames(cx("price-card-body-title"))}>
                    {premiumTypes[2].premiumType.toUpperCase()}
                  </div>
                  <div className={classNames(cx("price-card-body-price"))}>
                    <span
                      className={classNames(
                        cx("price-card-body-price-currency")
                      )}
                    >
                      $
                    </span>
                    <span
                      className={classNames(cx("price-card-body-price-value"))}
                    >
                      6.99
                    </span>
                  </div>
                  <div className={classNames(cx("price-card-body-frequency"))}>
                    monthly
                  </div>
                </div>
                <div
                  className={classNames(cx("price-card-body-divider"))}
                ></div>
                <ul>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />{" "}
                    <p>Support</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Learning analytics</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Discounts</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Unlimited techcards</p>
                  </li>
                  <li>
                    <FontAwesomeIcon
                      className={classNames(cx("price-card-body-icons-check"))}
                      icon={faCheck}
                    />
                    <p>Premium courses</p>
                  </li>
                </ul>
                {props.currentUser ? (
                  userPremium ? (
                    ""
                  ) : (
                    <button
                      onClick={() => {
                        setMembership(premiumTypes[2]);
                        setModalIsVisibleHandler();
                      }}
                      className="btn-solid-medium"
                    >
                      CHOOSE
                    </button>
                  )
                ) : (
                  <Link style={{ textDecoration: "none" }} to="/register">
                    <button className="btn-solid-medium">SIGN UP</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalIsVisible &&
        ReactDOM.createPortal(
          <TransactionModal
            hide={setModalIsUnvisibleHandler}
            membership={membership}
            modalIsVisible={modalIsVisible}
          />,
          document.getElementById("overlay-root")
        )}
    </>
  );
});
export default Price;
