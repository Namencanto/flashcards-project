import "../../assets/Global.scss";

import classes from "./PageScrollBtn.module.scss";
import classNames from "classnames/bind";

import ReactDOM from "react-dom";

import { Link } from "react-router-dom";

import useScrollPosition from "../../hooks/useScrollPosition";
import { useState } from "react";
function PageScrollBtn(props) {
  const cx = classNames.bind(classes);

  const scrollPosition = useScrollPosition();

  console.log(scrollPosition);

  const [opacity, setOpacity] = useState("");
  if (opacity !== "visible" && scrollPosition > 600) {
    setOpacity("visible");
  }
  if (opacity !== "" && scrollPosition < 600) {
    setOpacity("");
  }

  return (
    <>
      {ReactDOM.createPortal(
        <Link
          onClick={() => {
            window.scroll(0, 0);
          }}
          className={classNames(cx("back-to-top", opacity))}
          to="home"
        >
          Back to top!
        </Link>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}

export default PageScrollBtn;
