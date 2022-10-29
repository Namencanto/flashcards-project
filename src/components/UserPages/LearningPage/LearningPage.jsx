import "../../../assets/Global.scss";

import classes from "./LearningPage.module.scss";
import classNames from "classnames/bind";

function LearningPage() {
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("learning"))}>
      <div className="grid-mainpage-learning">
        <div className={classNames(cx("learning-container"))}></div>
      </div>
    </div>
  );
}

export default LearningPage;
