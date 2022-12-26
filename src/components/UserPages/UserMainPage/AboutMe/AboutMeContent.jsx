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
}) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("aboutme-container"))}>
      {isFetched ? (
        <>
          <div className={classNames(cx("aboutme-container-header"))}>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              onClick={changeTextIconHandler}
              icon={textareaIcon}
            />
            <h2>About me</h2>
          </div>

          <div className={classNames(cx("aboutme-container-info"))}>
            <AboutMeText
              changeTextIsVisible={changeTextIsVisible}
              fetchUserInformation={fetchUserInformation}
              aboutMeText={aboutMeText}
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
              />
            }
          </div>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default AboutMeContent;
