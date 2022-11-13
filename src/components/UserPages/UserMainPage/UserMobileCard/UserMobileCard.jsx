import classes from "./UserMobileCard.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
function UserMobileCard(props) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("card"))}>
      <div className={classNames(cx("card-navbar"))}>
        <Link to={props.backPath ? props.backPath : "/user"}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>

        <FontAwesomeIcon icon={props.icon} />
      </div>

      {props.children}
    </div>
  );
}

export default UserMobileCard;
