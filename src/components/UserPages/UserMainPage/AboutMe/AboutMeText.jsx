import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";
import { useRef, useState } from "react";
import axios from "axios";

function AboutMeText({
  changeTextIsVisible,
  fetchUserInformation,
  aboutMeText,
  setError,
}) {
  const cx = classNames.bind(classes);
  const [errorAboutMe, setErrorAboutMe] = useState({
    message: "",
    type: "",
  });
  const textareaRef = useRef();
  const aboutMeRef = useRef();

  // * UPDATE ABOUT ME INFO
  const changeAboutMeTextSubmitHandler = async (e) => {
    e.preventDefault();
    if (
      textareaRef.current.value.length !== 0 &&
      textareaRef.current.value.length <= 500
    ) {
      try {
        await axios.post("/users/addInformation", {
          aboutMeText: textareaRef.current.value,
        });
        fetchUserInformation();
      } catch (err) {
        console.log(err);
        setError({
          message: "Something went wrong...",
          type: "server-denied-small",
        });
      }
    } else {
      setErrorAboutMe({
        message: "About me must contain only letters and length from 1 to 255",
        type: "server-denied-small",
      });
    }
  };

  return changeTextIsVisible === true ? (
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
      <button className="btn-solid-small">Change</button>
      <div style={{ marginTop: "1rem" }} className={errorAboutMe.type}>
        {errorAboutMe.message}
      </div>
    </form>
  ) : (
    <p ref={aboutMeRef}>{aboutMeText || "Write some about yourself"}</p>
  );
}

export default AboutMeText;
