import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { useEffect, useState, useRef } from "react";

import {
  faUser,
  faGear,
  faArrowLeft,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";

import MediaQueries from "../../../../HelperComponents/MediaQueries";

import axios from "axios";
import AboutMeLanguages from "./AboutMeLanguages";
import AboutMeContent from "./AboutMeContent";

function AboutMe() {
  const { minWidth1000 } = MediaQueries();
  const cx = classNames.bind(classes);

  const [changeTextIsVisible, setChangeTextIsVisible] = useState(false);
  const [textareaIcon, setTextareaIcon] = useState(faGear);
  const [aboutMeText, setAboutMeText] = useState("insert any value");
  const [userLanguages, setUserLanguages] = useState([]);
  const [userLanguagesLevels, setUserLanguagesLevels] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  // * FETCHING USER DATA
  const fetchUserInformation = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get("/users/getInformation");

      setChangeTextIsVisible(false);
      setTextareaIcon(faGear);
      setAboutMeText(res.data[0].about_me_info);

      setUserLanguages(res.data[0].languages.slice(0, -1).split("/"));
      setUserLanguagesLevels(res.data[0].levels.slice(0, -1).split("/"));
    } catch (err) {
      console.log(err);
    }
    setIsFetched(true);
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  // * CHANGE ICON AFTER CLICK
  const changeTextIconHandler = () => {
    if (changeTextIsVisible === true) {
      setTextareaIcon(faGear);
      setChangeTextIsVisible(false);
    } else {
      setTextareaIcon(faArrowLeft);
      setChangeTextIsVisible(true);
    }
  };

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  // * lANGUAGES PART

  // * CHANGE LANGUAGES
  const changeLanguagesSubmitHandler = async (e) => {
    e.preventDefault();
    let newLanguages = "";
    let newLanguagesLevels = "";
    for (let i = 0; i < e.target.length; i++) {
      console.log(e.target[i].value.length);
      if (e.target[i].value !== "") {
        if (e.target[i].value.length < 30) {
          i % 2 === 0
            ? (newLanguagesLevels += e.target[i].value + "/")
            : (newLanguages += e.target[i].value + "/");
        } else return console.log("30let");
      }
    }

    try {
      const res = await axios.post("/users/addLanguage", {
        language: newLanguagesLevels,
        level: newLanguages,
        change: true,
      });
      fetchUserInformation();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////

  // * COMPONTENTS

  // * ALL INFORMATION RENDERED DEPENDING ON MOBILE OR DESKTOP VERSION
  const props = {
    textareaIcon,
    changeTextIconHandler,
    changeTextIsVisible,
    fetchUserInformation,
    aboutMeText,
    userLanguagesLevels,
    changeTextIsVisible,
    userLanguages,
    changeLanguagesSubmitHandler,
    isFetched,
  };
  return (
    <div className={classNames(cx("aboutme"))}>
      {minWidth1000 ? (
        <UserMobileCard icon={faUser}>
          {<AboutMeContent {...props} />}
        </UserMobileCard>
      ) : (
        <AboutMeContent {...props} />
      )}
    </div>
  );
}

export default AboutMe;
