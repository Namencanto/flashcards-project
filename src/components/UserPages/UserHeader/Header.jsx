import { useState } from "react";
import useScrollPosition from "../../../hooks/useScrollPosition";

import { Link } from "react-router-dom";

import classes from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../images/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import NavbarIsVisible from "./NavbarIsVisible";

import MediaQueries from "../../../HelperComponents/MediaQueries";

function Header(props) {
  const cx = classNames.bind(classes);

  const [headerContentRef, setHeaderContentRef] = useState();
  const [headerClassName, setHeaderClassName] = useState("");

  const { minWidth1000 } = MediaQueries();

  const scrollPosition = useScrollPosition();

  const setHeaderContentRefHandler = (ref) => {
    setHeaderContentRef(ref);
  };

  // if scrollposition loaded
  if (scrollPosition) {
    // header hide logic depending on width.
    if (!minWidth1000) {
      // if the class is not already set, if scroll position is in specific height
      if (headerClassName !== "navbar-narrower" && scrollPosition > 150) {
        setHeaderClassName("navbar-narrower");
      }
      // reverse logic
      if (headerClassName !== "" && scrollPosition < 1) {
        setHeaderClassName("");
      }
    }
  }

  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const setNavbarIsOpenHandler = () => {
    navbarIsOpen === true ? setNavbarIsOpen(false) : setNavbarIsOpen(true);
  };

  return (
    <>
      <nav className={classNames(cx("navbar", headerClassName))}>
        <div className={classNames(cx("navbar-container"))}>
          <Link className={classNames(cx("navbar-logo"))} to="/">
            <img src={logo} alt="logo" />
          </Link>

          {minWidth1000 === true ? (
            <button
              onClick={setNavbarIsOpenHandler}
              className={classNames(cx("navbar-icon"))}
            >
              {!navbarIsOpen && <FontAwesomeIcon icon={faBars} />}
              {navbarIsOpen && <FontAwesomeIcon icon={faTimes} />}
            </button>
          ) : (
            <NavbarIsVisible allParts={props.allParts} />
          )}
          {navbarIsOpen && <NavbarIsVisible allParts={props.allParts} />}
        </div>
      </nav>
    </>
  );
}

export default Header;
