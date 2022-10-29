import classes from "./LastLearned.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faGear,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import MediaQueries from "../../../../HelperComponents/MediaQueries";

function LastLearned(props) {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  const content = (
    <div className={classNames(cx("last-learned-container"))}>
      <ul>
        <li>
          <Link to="/user/learn/id">
            <ReactCountryFlag svg countryCode="GB" />
            <p> English grammar 105/250</p>
          </Link>
        </li>
        <li>
          <Link to="/user/learn/id">
            <ReactCountryFlag svg countryCode="GB" />
            <p> English phrasal verbs 291/500</p>
          </Link>
        </li>
        <li>
          <Link to="/user/learn/id">
            <ReactCountryFlag svg countryCode="KR" />
            <p>Korean at the airport 64/100</p>
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <div className={classNames(cx("last-learned"))}>
      <div className="grid-mainpage-last-learned">
        {minWidth1000 ? (
          <UserMobileCard icon={faBookOpen}>{content}</UserMobileCard>
        ) : (
          content
        )}
      </div>
    </div>
  );
}

export default LastLearned;
