import "../../../assets/Global.scss";

import classes from "./FeaturesContent.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

function FeaturesContent(props) {
  const cx = classNames.bind(classes);
  return (
    <div className={classNames(cx("content"))}>
      <div className={classNames(cx("content-image-container"))}>
        <img src={props.image} alt="feature illustration" />
      </div>

      <div className={classNames(cx("content-text-container"))}>
        <h3>List Building Is Easier Than Ever</h3>
        <p className={classNames(cx("content-text-container-description"))}>
          It's very easy to start using Tivo. You just need to fill out and
          submit the&nbsp;
          <Link
            className={classNames(cx("content-text-container-register-link"))}
            to="register"
          >
            Sign Up Form
          </Link>
          &nbsp;and you will receive access to the app and all of its features
          in no more than 24h.
        </p>
        <ul>
          <li>
            <FontAwesomeIcon
              className={classNames(cx("content-text-container-icon"))}
              icon={faSquare}
            />
            <p>Create and embed on websites newsletter sign up forms</p>
          </li>
          <li>
            <FontAwesomeIcon
              className={classNames(cx("content-text-container-icon"))}
              icon={faSquare}
            />
            <p>Manage forms and landing pages for your services</p>
          </li>
          <li>
            <FontAwesomeIcon
              className={classNames(cx("content-text-container-icon"))}
              icon={faSquare}
            />
            <p>Add and remove subscribers using the control panel</p>
          </li>
        </ul>
        <button className="btn-solid-medium">LIGHTBOX</button>
      </div>
    </div>
  );
}

export default FeaturesContent;
