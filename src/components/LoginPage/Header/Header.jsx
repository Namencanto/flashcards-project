import { useState } from "react";

import { Link } from "react-router-dom";

import classes from "../../MainPage/Header/Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../images/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import NavbarIsVisible from "../../MainPage/Header/NavbarIsVisible";

import MediaQueries from "../../../HelperComponents/MediaQueries";

function Header() {
  const cx = classNames.bind(classes);
  const { minWidth1000 } = MediaQueries();

  const [headerContentRef, setHeaderContentRef] = useState();
  const setHeaderContentRefHandler = (ref) => {
    setHeaderContentRef(ref);
  };
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const setNavbarIsOpenHandler = () => {
    navbarIsOpen === true ? setNavbarIsOpen(false) : setNavbarIsOpen(true);
  };

  return (
    <>
      <nav className={classNames(cx("navbar"))}>
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
            <NavbarIsVisible />
          )}
          {navbarIsOpen && <NavbarIsVisible />}
        </div>
      </nav>
    </>
  );
}

export default Header;
