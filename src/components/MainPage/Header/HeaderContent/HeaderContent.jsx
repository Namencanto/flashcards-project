import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import classes from "./HeaderContent.module.scss";
import classNames from "classnames/bind";
import "../../../../assets/Global.scss";

import softwareApp from "../../../../images/header-software-app.png";

function HeaderContent(props) {
  const cx = classNames.bind(classes);

  /**
   * * TRANSFERING REF TO PARENT
   */
  const headerContentRef = useRef();

  useEffect(() => {
    props.giveHeaderContentRef(headerContentRef);
  }, [headerContentRef]);

  return (
    <>
      <main
        className={classNames("grid-mainpage-header-content", cx("content"))}
      >
        <div className={cx("content-text-container")}>
          <h1>Your best flashcards site!</h1>
          <p>Use TechCards to take your skills to the next level </p>
          <Link
            className="btn-solid-large-reverse btn-solid-large-header-content"
            to={props.currentUser ? "/user" : "/register"}
          >
            {props.currentUser
              ? props.currentUser.nick.toUpperCase()
              : "SIGN UP"}
          </Link>
        </div>
        <div ref={headerContentRef} className={cx("content-image-container")}>
          <img src={softwareApp} alt="software app" />
        </div>
      </main>

      <div className={cx("content-frame")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 1920 310"
        >
          <path d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z"></path>
        </svg>
      </div>
    </>
  );
}

export default HeaderContent;
