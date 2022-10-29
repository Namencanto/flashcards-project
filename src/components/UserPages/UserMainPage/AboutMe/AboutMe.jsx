import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";

import UserMobileCard from "../UserMobileCard/UserMobileCard";

import { useEffect, useState, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../../../../context/AuthContext";

import MediaQueries from "../../../../HelperComponents/MediaQueries";

function AboutMe() {
  const { minWidth1000 } = MediaQueries();

  const cx = classNames.bind(classes);
  const { updateAboutMe } = useAuth();

  const [changeTextIsVisible, setChangeTextIsVisible] = useState(false);
  const [textareaIcon, setTextareaIcon] = useState(faGear);

  const textareaRef = useRef();
  const aboutMeRef = useRef();

  const changeTextIconHandler = () => {
    if (changeTextIsVisible === true) {
      setTextareaIcon(faGear);
      setChangeTextIsVisible(false);
    } else {
      setTextareaIcon(faArrowLeft);
      setChangeTextIsVisible(true);
    }
  };

  const changeAboutMeTextSubmitHandler = (e) => {
    e.preventDefault();

    if (textareaRef.current.value !== "") {
      updateAboutMe(textareaRef.current.value);
    }
  };

  const aboutMeText =
    changeTextIsVisible === true ? (
      <form onSubmit={changeAboutMeTextSubmitHandler} action="#">
        <textarea
          style={{
            height:
              aboutMeRef.current.clientHeight !== undefined
                ? aboutMeRef.current.clientHeight
                : "10rem",
          }}
          ref={textareaRef}
          placeholder="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis repudianda non ex eaque aliquid libero, id, sunt laborum quasi numquam sequi ipsam reiciendis quibusdam recusandae fuga illum optio perferendis et."
          className={classNames(cx("aboutme-textarea"))}
        />
        <button className="btn-outline-small">Change</button>
      </form>
    ) : (
      <p ref={aboutMeRef}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
        repudiandae non ex eaque aliquid libero, id, sunt laborum quasi numquam
        sequi ipsam reiciendis quibusdam, recusandae fuga illum optio
        perferendis et.
      </p>
    );

  // languages

  const languagesInputRef = useRef();
  const languagesLevelInputRef = useRef();

  const changeLanguagesSubmitHandler = (e) => {
    e.preventDefault();

    if (
      languagesInputRef.current.value !== "" &&
      languagesInputRef.current.value.length < 30 &&
      /[a-zA-Z]+/.test(languagesInputRef.current.value)
    ) {
      const newLanguage =
        languagesInputRef.current.value +
        " " +
        languagesLevelInputRef.current.options[
          languagesLevelInputRef.current.selectedIndex
        ].text;

      updateAboutMe(newLanguage);
    } else console.log("dupsko");
  };

  const aboutMeLanguages =
    changeTextIsVisible === true ? (
      <form
        className={classNames(cx("aboutme-languages-form"))}
        onSubmit={changeLanguagesSubmitHandler}
        action="#"
      >
        <label htmlFor="languages">Enter your language:</label>
        <input
          id="languages"
          ref={languagesInputRef}
          className={classNames(cx("aboutme-input-language"))}
        />

        <label htmlFor="languagesLevel">Enter your level:</label>
        <select
          ref={languagesLevelInputRef}
          name="languagesLevel"
          className={classNames(cx("aboutme-input-language"))}
        >
          <option value="1">A1</option>
          <option value="2">A2</option>
          <option value="3">B1</option>
          <option value="4">B2</option>
          <option value="5">C1</option>
          <option value="5">C2</option>
          <option value="5">Native</option>
        </select>

        <button style={{ marginTop: "1rem" }} className="btn-outline-small">
          Add language
        </button>
      </form>
    ) : (
      <ul>
        <li>Spanish Native</li>
        <li>French B2</li>
        <li>English C1</li>
      </ul>
    );

  const content = (
    <div className={classNames(cx("aboutme-container"))}>
      <FontAwesomeIcon onClick={changeTextIconHandler} icon={textareaIcon} />
      <h1>About Me:</h1>
      {aboutMeText}

      <h3 style={{ marginTop: "2rem" }}>Languages:</h3>
      {aboutMeLanguages}
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
