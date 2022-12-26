import classes from "./AboutMe.module.scss";
import classNames from "classnames/bind";
import { useRef } from "react";
import axios from "axios";

function AboutMeText({
  changeTextIsVisible,
  fetchUserInformation,
  aboutMeText,
}) {
  const cx = classNames.bind(classes);

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
        const res = await axios.post("/users/addInformation", {
          aboutMeText: textareaRef.current.value,
        });
        fetchUserInformation();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("za duzo");
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
    </form>
  ) : (
    <p ref={aboutMeRef}>{aboutMeText || "Write some about yourself"}</p>
  );
}

export default AboutMeText;
