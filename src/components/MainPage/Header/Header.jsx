import { useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

import { Link } from "react-router-dom";

import classes from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../images/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import NavbarIsVisible from "./NavbarIsVisible";
import HeaderContent from "./HeaderContent/HeaderContent";

function Header() {
  const cx = classNames.bind(classes);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);

  const setNavbarIsOpenHandler = () => {
    navbarIsOpen === true ? setNavbarIsOpen(false) : setNavbarIsOpen(true);
  };
  const minWidth1000 = useWindowDimensions().width < 1000;

  return (
    <>
      <nav className={classNames(cx("navbar"), cx("navbar-custom"))}>
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
      <HeaderContent />
    </>
  );
}

export default Header;
