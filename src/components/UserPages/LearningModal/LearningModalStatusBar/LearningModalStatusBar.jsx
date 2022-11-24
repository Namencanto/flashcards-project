import "../../../../assets/Global.scss";

import classes from "./LearningModalStatusBar.module.scss";
import classNames from "classnames/bind";

function LearningModalStatusBar({ all, unknown, known }) {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("learning-progress-bar"))}>
      <div
        style={{
          width: `${(known * 100) / all}%`,
        }}
        className={classNames(cx("learning-progress-bar-known"))}
      >
        {/* <span>New techcards:{known}</span> */}
      </div>
      <div
        style={{
          width: `${(unknown * 100) / all}%`,
        }}
        className={classNames(cx("learning-progress-bar-unknown"))}
      >
        {/* <span>Hard techcards:{known}</span> */}
      </div>
    </div>
  );
}

export default LearningModalStatusBar;
