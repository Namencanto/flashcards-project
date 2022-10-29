import React from "react";

import "../../../assets/Global.scss";

import classes from "./Details.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

import DetailsImage from "../../../images/details.png";

const Details = React.forwardRef((props, ref) => {
  const cx = classNames.bind(classes);
  return (
    <div ref={ref} className="grid-mainpage-details">
      <div className={classNames(cx("details-container"))}>
        <div className={classNames(cx("details-text-container"))}>
          <h2>Now Is The Time To Upgrade Your Marketing Solution</h2>
          <p>
            Target the right customers for your business with the help of Tivo's
            patented segmentation technology and deploy efficient marketing
            campaigns. Keep your customers happy and loyal.
          </p>
          <ul>
            <li>
              <FontAwesomeIcon className="icon-square" icon={faSquare} />
              <p>Understand customers and meet their requirements</p>
            </li>
            <li>
              <FontAwesomeIcon className="icon-square" icon={faSquare} />
              <p>Targeted client base with Tivo's efficient technology</p>
            </li>
          </ul>

          {!props.currentUser ? (
            <button className="btn-solid-medium">SIGN UP</button>
          ) : (
            ""
          )}
        </div>
        <div className={classNames(cx("details-image-container"))}>
          <img src={DetailsImage} alt="app illustration" />
        </div>
      </div>
    </div>
  );
});

export default Details;
