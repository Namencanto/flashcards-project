import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutMeText from "./AboutMeText";
import AboutMeLanguages from "./AboutMeLanguages";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";
function AboutMeContent({
  changeTextIconHandler,
  textareaIcon,
  changeTextIsVisible,
  fetchUserInformation,
  aboutMeText,
  userLanguagesLevels,
  userLanguages,
  changeLanguagesSubmitHandler,
  isFetched,
  error,
  setError,
}) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("aboutme-container"))}>
      <div className={classNames(cx("aboutme-container-header"))}>
        <FontAwesomeIcon
          style={{ cursor: isFetched ? "pointer" : "default" }}
          onClick={isFetched && changeTextIconHandler}
          icon={textareaIcon}
        />
        <h2>About me</h2>
      </div>
      {isFetched ? (
        <>
          <div className={classNames(cx("aboutme-container-info"))}>
            <AboutMeText
              changeTextIsVisible={changeTextIsVisible}
              fetchUserInformation={fetchUserInformation}
              aboutMeText={aboutMeText}
              setError={setError}
            />
          </div>
          <div className={classNames(cx("aboutme-container-languages"))}>
            <h3 style={{ marginTop: "1rem" }}>Languages:</h3>
            {
              <AboutMeLanguages
                fetchUserInformation={fetchUserInformation}
                userLanguagesLevels={userLanguagesLevels}
                changeTextIsVisible={changeTextIsVisible}
                userLanguages={userLanguages}
                changeLanguagesSubmitHandler={changeLanguagesSubmitHandler}
                setError={setError}
              />
            }
            <div className={error.type}>{error.message}</div>
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default AboutMeContent;
