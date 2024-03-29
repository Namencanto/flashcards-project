import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
function AboutMeLanguages({
  userLanguagesLevels,
  changeTextIsVisible,
  userLanguages,
  changeLanguagesSubmitHandler,
  fetchUserInformation,

  setError,
}) {
  const cx = classNames.bind(classes);
  const allLanguages = useRef();
  const languagesInputRef = useRef();
  const languagesLevelInputRef = useRef();

  const [errorLanguages, setErrorLanguages] = useState({
    message: "",
    type: "",
  });

  // * CHANGE LANGUAGES
  const addLanguageSubmitHandler = async (e) => {
    e.preventDefault();

    if (
      languagesInputRef.current.value !== "" &&
      languagesInputRef.current.value.length < 30 &&
      /[a-zA-Z]+/.test(languagesInputRef.current.value)
    ) {
      try {
        await axios.post("/users/addLanguage", {
          language: languagesInputRef.current.value,
          level:
            languagesLevelInputRef.current.options[
              languagesLevelInputRef.current.selectedIndex
            ].text,
        });
        fetchUserInformation();
      } catch (err) {
        console.log(err);
        setError({
          message: "Something went wrong...",
          type: "server-denied-large",
        });
      }
    } else
      setErrorLanguages({
        message: "Language must contain only letters and length from 1 to 30",
        type: "server-denied-small",
      });
  };

  // * REMOVE LANGUAGES
  const removeLanguageHandler = async (e) => {
    e.preventDefault();

    const languageToDelete = e.target.attributes.language.value;
    let index;
    for (let i = 0; i < userLanguages.length; i++) {
      if (languageToDelete === userLanguages[i]) index = i;
    }

    const newLanguagesArr = userLanguages.filter(
      (lang, i) => lang !== languageToDelete
    );
    const newLanguagesLevelsArr = userLanguagesLevels.filter(
      (lev, i) => i !== index
    );

    let newLanguages = "";
    let newLanguagesLevels = "";
    for (let i = 0; i < newLanguagesArr.length; i++) {
      if (newLanguagesArr[i] !== "") {
        if (newLanguagesArr[i].length < 30) {
          newLanguagesLevels += newLanguagesLevelsArr[i] + "/";
          newLanguages += newLanguagesArr[i] + "/";
        } else
          return setErrorLanguages({
            message:
              "you have too many languages entered, if you are that good, contact us, we will change this restriction specially for you ;)",
            type: "server-denied-small",
          });
      }
    }

    try {
      await axios.post("/users/addLanguage", {
        language: newLanguages,
        level: newLanguagesLevels,
        change: true,
      });
      fetchUserInformation();
    } catch (err) {
      console.log(err);
      setError({
        message: "Something went wrong...",
        type: "server-denied-large",
      });
    }
  };

  return changeTextIsVisible === true ? (
    <>
      {userLanguages[0] !== "" ? (
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
                <div
                  className={classNames(
                    cx("aboutme-form-languages-change-input-box")
                  )}
                >
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
                  <FontAwesomeIcon
                    className={classNames(
                      cx("aboutme-form-languages-change-button-remove")
                    )}
                    onClick={removeLanguageHandler}
                    icon={faRemove}
                    language={language}
                    level={userLanguagesLevels[i]}
                  />
                </div>
              );
            })}
          </div>

          <button style={{ marginTop: "1rem" }} className="btn-solid-small">
            Change languages
          </button>
        </form>
      ) : (
        ""
      )}
      <form
        className={classNames(cx("aboutme-form-languages"))}
        onSubmit={addLanguageSubmitHandler}
      >
        <label htmlFor="languages">Enter your language:</label>{" "}
        <div className={classNames(cx("aboutme-form-languages-change-inputs"))}>
          <input
            id="languages"
            ref={languagesInputRef}
            className={classNames(cx("aboutme-form-languages-change-language"))}
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
        <button style={{ marginTop: "1rem" }} className="btn-solid-small">
          Add new language
        </button>
        <div style={{ marginTop: "1rem" }} className={errorLanguages.type}>
          {errorLanguages.message}
        </div>
      </form>
    </>
  ) : (
    <ul>
      {userLanguages.map((language, i) => {
        return (
          <li key={i}>
            <p>
              {language} {userLanguagesLevels[i]}
              {language === "" ? "Add languages which you know" : ""}
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default AboutMeLanguages;
