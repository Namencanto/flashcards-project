import "../../../assets/Global.scss";

import classes from "./SocialMedia.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
function SocialMedia() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("socialmedia"))}>
      <ul>
        <li>
          <FontAwesomeIcon
            className={classNames(cx("socialmedia-icon"))}
            icon={faFacebookF}
          />
        </li>
        <li>
          <FontAwesomeIcon
            className={classNames(cx("socialmedia-icon"))}
            icon={faTwitter}
          />
        </li>
        <li>
          <FontAwesomeIcon
            className={classNames(cx("socialmedia-icon"))}
            icon={faPinterestP}
          />
        </li>
        <li>
          <FontAwesomeIcon
            className={classNames(cx("socialmedia-icon"))}
            icon={faInstagram}
          />
        </li>
        <li>
          <FontAwesomeIcon
            className={classNames(cx("socialmedia-icon"))}
            icon={faLinkedinIn}
          />
        </li>
      </ul>
    </div>
  );
}

export default SocialMedia;
