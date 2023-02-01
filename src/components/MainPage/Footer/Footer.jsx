import "../../../assets/Global.scss";

import classes from "./Footer.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
function Footer({ backgroundColor }) {
  const cx = classNames.bind(classes);

  return (
    <>
      <div className={cx("footer-frame")}>
        <svg
          style={backgroundColor && { backgroundColor }}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 79"
        >
          <path
            d="M0,72.427C143,12.138,255.5,4.577,328.644,7.943c147.721,6.8,183.881,60.242,320.83,53.737,143-6.793,167.826-68.128,293-60.9,109.095,6.3,115.68,54.364,225.251,57.319,113.58,3.064,138.8-47.711,251.189-41.8,104.012,5.474,109.713,50.4,197.369,46.572,89.549-3.91,124.375-52.563,227.622-50.155A338.646,338.646,0,0,1,1920,23.467V79.75H0V72.427Z"
            transform="translate(0 -0.188)"
          ></path>
        </svg>
      </div>

      <div className={classNames(cx("footer"))}>
        <div className={classNames(cx("footer-container"))}>
          <div className={classNames(cx("footer-main"))}>
            <div className={classNames(cx("footer-main-box"))}>
              <h4>About Techcards</h4>
              <p>
                We're passionate about designing and developing one of the best
                flashcards apps in the market
              </p>
            </div>

            <div className={classNames(cx("footer-main-box"))}>
              <h4>Important Links</h4>
              <ul>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("footer-main-box-icon", "square"))}
                    icon={faSquare}
                  />
                  <p>
                    Created by{" "}
                    <a href="https://github.com/Namencanto">Namencanto</a>
                  </p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("footer-main-box-icon", "square"))}
                    icon={faSquare}
                  />
                  <p>
                    Read our <Link>Terms & Conditions</Link>,
                    <Link>Privacy Policy</Link>
                  </p>
                </li>
              </ul>
            </div>

            <div className={classNames(cx("footer-main-box"))}>
              <h4>Contact</h4>
              <ul>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("footer-main-box-icon"))}
                    icon={faMapMarkerAlt}
                  />
                  <p>22 Innovative, San Francisco, CA 94043, US</p>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("footer-main-box-icon"))}
                    icon={faEnvelope}
                  />
                  <a
                    style={{ marginRight: "1.6rem" }}
                    href="mailto:mateusz.ordon22@gmail.com"
                  >
                    mateusz.ordon22@gmail.com
                  </a>
                </li>
                <li>
                  <FontAwesomeIcon
                    className={classNames(cx("footer-main-box-icon", "github"))}
                    icon={faGithub}
                  />

                  <a href="https://github.com/Namencanto">
                    github.com/Namencanto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={classNames(cx("footer-copyright"))}>
            <div className={classNames(cx("footer-copyright-container"))}>
              <p>
                Copyright © 2023 Origin version created by
                <a href="https://www.landingfolio.com/templates/post/tivo">
                  {" "}
                  Inovatik
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
