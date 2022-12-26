import classes from "./LoadingSpinner.module.scss";
import classNames from "classnames/bind";

function LoadingSpinner() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("spinner"))}>
      <p>Loading, please wait...</p>

      <div className={classNames(cx("spinner-container"))}>
        <div className={classNames(cx("spinner-bounce"))}></div>
        <div
          style={{ "animation-delay": "0.16s" }}
          className={classNames(cx("spinner-bounce"))}
        ></div>
        <div
          style={{ "animation-delay": "0.32s" }}
          className={classNames(cx("spinner-bounce"))}
        ></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
