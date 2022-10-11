import "../../../assets/Global.scss";

import classes from "./FeaturesPopup.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { propTypes } from "infinite-react-carousel/lib/carousel/types";

import lightBoxImg from "../../../images/details-lightbox.png";
import { useState, useRef, useEffect } from "react";
function FeaturesPopup(props) {
  const cx = classNames.bind(classes);

  const popupRef = useRef();
  const containerPopupRef = useRef();

  useEffect(() => {
    if (props.popupIsVisible === true) {
      setTimeout(() => {
        popupRef.current.style.opacity = 0.8;

        containerPopupRef.current.style.opacity = 1;
        containerPopupRef.current.style.transform = `translateY(${0}rem) perspective(${75}rem) rotateX(${0}deg)`;
      });
    }
  }, [props.popupIsVisible]);

  const exitPopupAnimation = () => {
    popupRef.current.style.opacity = 0;

    containerPopupRef.current.style.opacity = 0;
    containerPopupRef.current.style.transform = `translateY(${-2}rem) perspective(${75}rem) rotateX(${10}deg)`;

    setTimeout(() => {
      props.hide();
    }, 200);
  };

  let title;

  if (props.title === "List Building Is Easier Than Ever") {
    title = "List Building";
  }
  if (props.title === "Campaigns Monitoring Tools") {
    title = "Campaign Monitoring";
  }
  if (props.title === "Analytics Control Panel") {
    title = "Analytics Tools";
  }

  return (
    <>
      <div className={classNames(cx("popup"))} ref={popupRef}></div>

      <div className={classNames(cx("popup-container"))}>
        <div
          ref={containerPopupRef}
          className={classNames(cx("popup-content"))}
        >
          <FontAwesomeIcon
            onClick={exitPopupAnimation}
            className={classNames(cx("popup-content-icon"))}
            icon={faX}
          />
          <div className={classNames(cx("popup-content-main"))}>
            <div className={classNames(cx("popup-content-main-img-container"))}>
              <img src={lightBoxImg} alt="app illustration" />
            </div>
            <div className={classNames(cx("popup-content-main-underimg"))}>
              <h3>{title}</h3>
              <hr />
              <h5>Core service</h5>
              <p>
                It's very easy to start using Tivo. You just need to fill out
                and submit the Sign Up Form and you will receive access to the
                app.
              </p>

              <ul>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>List building framework</p>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>Easy database browsing</p>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>User administration</p>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>Automate user signup</p>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>Quick formatting tools</p>
                </li>
                <li>
                  <FontAwesomeIcon className="icon-square" icon={faSquare} />
                  <p>Fast email checking</p>
                </li>
              </ul>
              <div className={classNames(cx("popup-content-main-buttonbox"))}>
                <button className="btn-solid-medium">SIGN UP</button>
                <button
                  onClick={exitPopupAnimation}
                  className="btn-outline-medium"
                >
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturesPopup;
