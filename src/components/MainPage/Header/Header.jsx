import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useScrollPosition from "../../../hooks/useScrollPosition";

import { Link } from "react-router-dom";

import classes from "./Header.module.scss";
import classNames from "classnames/bind";
import logo from "../../../images/logo.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import NavbarIsVisible from "./NavbarIsVisible";
import HeaderContent from "./HeaderContent/HeaderContent";
import MediaQueries from "../../../HelperComponents/MediaQueries";

function Header(props) {
  const cx = classNames.bind(classes);
  let pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [headerContentRef, setHeaderContentRef] = useState();
  const [headerClassName, setHeaderClassName] = useState("");

  const { minWidth1000 } = MediaQueries();

  // all refs used for check elements position
  const [featuresPart, detailsPart, playerPart, pricingPart] = props.allParts;
  const scrollPosition = useScrollPosition();

  const setHeaderContentRefHandler = (ref) => {
    setHeaderContentRef(ref);
  };

  // chlop sobie ustawil komentarze zeby ktos wiedzial o co chodzi, a prawda jest taka ze sam sie zgubi za 2 dni w tym xD

  /**
   * * NAVBAR LINKS ACTIVE LOGIC
   */

  // useEffect to select specified components when page loaded depending on specified url

  useEffect(() => {
    if (pathName === "/home") window.scroll({ top: 0, left: 0 });
    if (pathName === "/features") featuresPart.current.scrollIntoView();
    if (pathName === "/details") detailsPart.current.scrollIntoView();
    if (pathName === "/video") playerPart.current.scrollIntoView();
    if (pathName === "/pricing") pricingPart.current.scrollIntoView();
    window.addEventListener("load", function () {
      // i put this in event listener and settimout for execute after load and to move execution in stack for sure to execute in slow internet connection
      setTimeout(() => {
        if (pathName === "/home") window.scroll({ top: 0, left: 0 });
        if (pathName === "/features") featuresPart.current.scrollIntoView();
        if (pathName === "/details") detailsPart.current.scrollIntoView();
        if (pathName === "/video") playerPart.current.scrollIntoView();
        if (pathName === "/pricing") pricingPart.current.scrollIntoView();
      }, 10);
    });
  }, [featuresPart, detailsPart, playerPart, pricingPart]);

  /**
   * SCROLLING BEHAVIOUR
   */

  // all counters used for avoiding infinite loop
  const [countHome, setCountHome] = useState(0);
  const [countFeatures, setCountFeatures] = useState(0);
  const [countDetails, setCountDetails] = useState(0);
  const [countVideo, setCountVideo] = useState(0);
  const [countPricing, setCountPricing] = useState(0);

  const ScrollLogic = (
    path, // specific path to navigate and check whether it is already here
    counter, // counter which stop function recalling when function called once
    firstPart, // first part of a specific element
    secondPart, //  second part of a specific element
    firstHeight = 100, // these two elements we used for a little previous call function
    secondHeight = 100
  ) => {
    if (pathName === path) {
      return;
    }
    const ScrollLogicResult = () => {
      // checking whether we are already in specific path, if function called once counter is greater than
      // one and this logic protects us against the infinite loop, and that we could to go to different path
      if (pathName !== path && counter < 1) {
        // navigate to setted path
        navigate(path);

        // we reset all counters and check what path is set, setted path do not reset, to avoid infinite loop
        path === "/home" ? setCountHome(1) : setCountHome(0);
        path === "/features" ? setCountFeatures(1) : setCountFeatures(0);
        path === "/details" ? setCountDetails(1) : setCountDetails(0);
        path === "/video" ? setCountVideo(1) : setCountVideo(0);
        path === "/pricing" ? setCountPricing(1) : setCountPricing(0);
      }
    };

    // if second part is setted
    if (secondPart !== undefined) {
      if (
        scrollPosition > firstPart.current.offsetTop - firstHeight &&
        scrollPosition < secondPart.current.offsetTop - secondHeight
      ) {
        ScrollLogicResult();
      }
      // pricing path has different height conditions
    } else if (path === "/pricing") {
      if (scrollPosition > firstPart.current.offsetTop - firstHeight) {
        ScrollLogicResult();
      }
    } else {
      // if second part is not setted, set different conditions
      if (scrollPosition < firstPart.current.offsetTop - firstHeight) {
        ScrollLogicResult();
      }
    }
  };

  // if scrollposition loaded
  if (scrollPosition) {
    // if path is not at path which we want set, that awoid endless calling and
    // if scroll is in specified height between in which start and in which next element start
    // I subtracted from this some px to select component little earlier

    ScrollLogic("/home", countHome, featuresPart);
    ScrollLogic("/features", countFeatures, featuresPart, detailsPart);
    ScrollLogic("/details", countDetails, detailsPart, playerPart, 100, 125);
    ScrollLogic("/video", countVideo, playerPart, pricingPart, 125);
    ScrollLogic("/pricing", countPricing, pricingPart);

    // header hide logic depending on width.
    if (!minWidth1000) {
      // if the class is not already set, if scroll position is in specific height
      if (
        headerClassName !== "navbar-narrower" &&
        scrollPosition > headerContentRef.current.offsetTop - 150
      ) {
        setHeaderClassName("navbar-narrower");
      }
      // reverse logic
      if (
        headerClassName !== "" &&
        scrollPosition < headerContentRef.current.offsetTop - 150
      ) {
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
            <NavbarIsVisible
              currentUser={props.currentUser}
              logout={props.logout}
              allParts={props.allParts}
            />
          )}
          {navbarIsOpen && (
            <NavbarIsVisible
              currentUser={props.currentUser}
              logout={props.logout}
              allParts={props.allParts}
            />
          )}
        </div>
      </nav>
      <HeaderContent
        currentUser={props.currentUser}
        giveHeaderContentRef={setHeaderContentRefHandler}
      />
    </>
  );
}

export default Header;
