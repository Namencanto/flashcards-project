import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { useEffect, useState, useRef, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import MediaQueries from "../../../../HelperComponents/MediaQueries";

import axios from "axios";

import { AuthContext } from "../../../../context/AuthContext";
function AboutMe() {
  const { minWidth1000 } = MediaQueries();

  const cx = classNames.bind(classes);

  const [changeTextIsVisible, setChangeTextIsVisible] = useState(false);
  const [textareaIcon, setTextareaIcon] = useState(faGear);
  const [aboutMeText, setAboutMeText] = useState("insert any value");
  const [userLanguages, setUserLanguages] = useState([]);
  const [userLanguagesLevels, setUserLanguagesLevels] = useState([]);

  const textareaRef = useRef();
  const aboutMeRef = useRef();
  const allLanguages = useRef();

  const fetchUserInformation = async () => {
    try {
      const res = await axios.get("/users/getInformation");
      console.log(res.data);
      setChangeTextIsVisible(false);
      setTextareaIcon(faGear);
      setAboutMeText(res.data[0].about_me_info);

      setUserLanguages(res.data[0].languages.slice(0, -1).split("/"));
      setUserLanguagesLevels(res.data[0].levels.slice(0, -1).split("/"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserInformation();
  }, []);

  const changeTextIconHandler = () => {
    if (changeTextIsVisible === true) {
      setTextareaIcon(faGear);
      setChangeTextIsVisible(false);
    } else {
      setTextareaIcon(faArrowLeft);
      setChangeTextIsVisible(true);
    }
  };

  const changeAboutMeTextSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      textareaRef.current.value.length !== 0 &&
      textareaRef.current.value.length <= 500
    ) {
      try {
        const res = await axios.post("/users/addInformation", {
          aboutMeText: textareaRef.current.value,
        });
        fetchUserInformation();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("0 500");
    }
  };

  const aboutMeTextComponent =
    changeTextIsVisible === true ? (
      <form
        className={classNames(cx("aboutme-form-about-me"))}
        onSubmit={changeAboutMeTextSubmitHandler}
      >
        <textarea
          style={{
            height:
              aboutMeRef.current === null
                ? "10rem"
                : aboutMeRef.current.clientHeight,
          }}
          ref={textareaRef}
          placeholder={aboutMeText || "Write some about yourself"}
          className={classNames(cx("aboutme-textarea"))}
          name="aboutMeText"
        />
        <button className="btn-outline-small">Change</button>
      </form>
    ) : (
      <p ref={aboutMeRef}>{aboutMeText || "Write some about yourself"}</p>
    );

  // * languages

  const languagesInputRef = useRef();
  const languagesLevelInputRef = useRef();

  const changeLanguagesSubmitHandler = async (e) => {
    e.preventDefault();
    let newLanguages = "";
    let newLanguagesLevels = "";
    for (let i = 0; i < e.target.length; i++) {
      if (e.target[i].value !== "") {
        i % 2 === 0
          ? (newLanguagesLevels += e.target[i].value + "/")
          : (newLanguages += e.target[i].value + "/");
      }
    }

    // if (
    //   languagesInputRef.current.value !== "" &&
    //   languagesInputRef.current.value.length < 30 &&
    //   /[a-zA-Z]+/.test(languagesInputRef.current.value)
    // ) {
    // } else console.log("dupsko");
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

  const addLanguageSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      languagesInputRef.current.value !== "" &&
      languagesInputRef.current.value.length < 30 &&
      /[a-zA-Z]+/.test(languagesInputRef.current.value)
    ) {
      try {
        const res = await axios.post("/users/addLanguage", {
          language: languagesInputRef.current.value,
          level:
            languagesLevelInputRef.current.options[
              languagesLevelInputRef.current.selectedIndex
            ].text,
        });
        fetchUserInformation();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else console.log("dupsko");
  };

  const aboutMeLanguages =
    changeTextIsVisible === true ? (
      <>
        <form
          className={classNames(cx("aboutme-form-languages"))}
          onSubmit={changeLanguagesSubmitHandler}
        >
          <div
            ref={allLanguages}
            className={classNames(cx("aboutme-form-languages-change-inputs"))}
          >
            {userLanguages.map((language, i) => {
              return (
                <>
                  <input
                    key={i}
                    id="changeLanguages"
                    ref={languagesInputRef}
                    defaultValue={language}
                    className={classNames(
                      cx("aboutme-form-languages-change-language")
                    )}
                  />
                  <select
                    ref={languagesLevelInputRef}
                    name="languagesLevel"
                    className={classNames(
                      cx("aboutme-form-languages-change-level")
                    )}
                  >
                    <option
                      selected={userLanguagesLevels[i] === "A1"}
                      value="A1"
                    >
                      A1
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "A2"}
                      value="A2"
                    >
                      A2
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "B1"}
                      value="B1"
                    >
                      B1
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "B2"}
                      value="B2"
                    >
                      B2
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "C1"}
                      value="C1"
                    >
                      C1
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "C2"}
                      value="C2"
                    >
                      C2
                    </option>
                    <option
                      selected={userLanguagesLevels[i] === "Native"}
                      value="Native"
                    >
                      Native
                    </option>
                  </select>
                </>
              );
            })}
          </div>

          <button style={{ marginTop: "1rem" }} className="btn-outline-small">
            Change languages
          </button>
        </form>

        <form
          className={classNames(cx("aboutme-form-languages"))}
          onSubmit={addLanguageSubmitHandler}
        >
          <label htmlFor="languages">Enter your language:</label>{" "}
          <div
            className={classNames(cx("aboutme-form-languages-change-inputs"))}
          >
            <input
              id="languages"
              ref={languagesInputRef}
              className={classNames(
                cx("aboutme-form-languages-change-language")
              )}
            />

            <select
              ref={languagesLevelInputRef}
              name="languagesLevel"
              className={classNames(cx("aboutme-form-languages-change-level"))}
            >
              <option value="1">A1</option>
              <option value="2">A2</option>
              <option value="3">B1</option>
              <option value="4">B2</option>
              <option value="5">C1</option>
              <option value="5">C2</option>
              <option value="5">Native</option>
            </select>
          </div>
          <button style={{ marginTop: "1rem" }} className="btn-outline-small">
            Add new language
          </button>
        </form>
      </>
    ) : (
      <ul>
        {userLanguages.map((language, i) => {
          return (
            <li key={i}>
              <p>
                {language} {userLanguagesLevels[i]}
              </p>
            </li>
          );
        })}
      </ul>
    );
  console.log(allLanguages.current);
  const content = (
    <div className={classNames(cx("aboutme-container"))}>
      <FontAwesomeIcon onClick={changeTextIconHandler} icon={textareaIcon} />
      <div className={classNames(cx("aboutme-container-info"))}>
        <h1>About Me:</h1>
        {aboutMeTextComponent}
      </div>
      <div className={classNames(cx("aboutme-container-languages"))}>
        <h3 style={{ marginTop: "1rem" }}>Languages:</h3>
        {aboutMeLanguages}
      </div>
    </div>
  );

  return (
    <div className={classNames(cx("aboutme"))}>
      {minWidth1000 ? (
        <UserMobileCard icon={faUser}>{content}</UserMobileCard>
      ) : (
        content
      )}
    </div>
  );
}

export default AboutMe;
