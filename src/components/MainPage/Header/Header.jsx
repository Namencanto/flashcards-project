import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useScrollPosition from "../../../hooks/useScrollPosition";

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
import MediaQueries from "../../../HelperComponents/MediaQueries";

function Header(props) {
  const [featuresPart, detailsPart, playerPart, pricingPart] = props.allParts;
  const scrollPosition = useScrollPosition();
  let pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [headerContentRef, setHeaderContentRef] = useState();
  const [headerClassName, setHeaderClassName] = useState("");

  const { minWidth1000 } = MediaQueries();

  const setHeaderContentRefHandler = (ref) => {
    setHeaderContentRef(ref);
  };

  // useEffect to select specified components when page loaded depending on specified url
  useEffect(() => {
    window.addEventListener("load", function () {
      setTimeout(() => {
        if (pathName === "/home") window.scroll({ top: 0, left: 0 });
        if (pathName === "/features") featuresPart.current.scrollIntoView();
        if (pathName === "/details") detailsPart.current.scrollIntoView();
        if (pathName === "/video") playerPart.current.scrollIntoView();
        if (pathName === "/pricing") pricingPart.current.scrollIntoView();
      }, 250);
    });
  }, [featuresPart, detailsPart, playerPart, pricingPart]);

  const cx = classNames.bind(classes);
  const [navbarIsOpen, setNavbarIsOpen] = useState(false);
  const [countHome, setCountHome] = useState();
  const [countFeatures, setCountFeatures] = useState();

  /**
   * * NAVBAR LINKS ACTIVE LOGIC
   * SCROLLING BEHAVIOUR
   */

  // if scrollposition loaded
  if (scrollPosition) {
    // if path is not at path which we want set, that awoid endless calling and
    // if scroll is in specified height between in which start and in which next element start
    // I subtracted from this some px to select component little earlier

    /**
     * TODO: finish this logic ↓
     */
    if (
      pathName !== "/home" &&
      countHome < 1 &&
      scrollPosition < featuresPart.current.offsetTop - 100
    ) {
      setCountHome(1);
      setCountFeatures(0);
      navigate("/home");
    }

    if (
      pathName !== "/features" &&
      countFeatures < 1 &&
      scrollPosition > featuresPart.current.offsetTop - 100 &&
      scrollPosition < detailsPart.current.offsetTop - 100
    ) {
      setCountFeatures(1);
      setCountHome(0);

      navigate("/features");
    }
    if (
      pathName !== "/details" &&
      scrollPosition > detailsPart.current.offsetTop - 100 &&
      scrollPosition < playerPart.current.offsetTop - 150
    ) {
      navigate("/details");
    }
    if (
      pathName !== "/video" &&
      scrollPosition > playerPart.current.offsetTop - 150 &&
      scrollPosition < pricingPart.current.offsetTop - 100
    ) {
      navigate("/video");
    }
    if (
      pathName !== "/pricing" &&
      scrollPosition > pricingPart.current.offsetTop - 100
    ) {
      navigate("/pricing");
    }

    /**
     * PLUS HEADER HIDE LOGIC
     */
    if (!minWidth1000) {
      if (
        headerClassName !== "navbar-narrower" &&
        scrollPosition > headerContentRef.current.offsetTop - 150
      ) {
        setHeaderClassName("navbar-narrower");
      }
      if (
        headerClassName !== "" &&
        scrollPosition < headerContentRef.current.offsetTop - 150
      ) {
        setHeaderClassName("");
      }
    }
  }

  /**
   * * MAIN COMPONENT LOGIC
   */
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
      <HeaderContent giveHeaderContentRef={setHeaderContentRefHandler} />
    </>
  );
}

export default Header;
