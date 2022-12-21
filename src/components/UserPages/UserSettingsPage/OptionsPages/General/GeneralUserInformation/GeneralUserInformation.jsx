import classNames from "classnames/bind";
import classes from "../General.module.scss";
import React, { useState, useRef } from "react";

const GeneralUserInformation = ({ postGeneralNick, currentNick }) => {
  const cx = classNames.bind(classes);
  const nickRef = useRef();

  const nickChangePostHandler = () => {
    const newNick = nickRef.current.value;
    if (newNick.length > 0) {
      postGeneralNick(newNick);
    }
  };
  return (
    <div className={classNames(cx("settings-general-user-info"))}>
      <div style={{ marginTop: "1.5rem" }} className="input-default">
        <input
          ref={nickRef}
          className="input-default"
          id="nick"
          type="text"
          defaultValue={currentNick}
          placeholder=" "
        />
        <label htmlFor="nick">Nick</label>
      </div>

      <div className={classNames(cx("settings-general-user-info-btn-wrapper"))}>
        <button onClick={nickChangePostHandler} className="btn-solid-large">
          Change
        </button>
      </div>
    </div>
  );
};

export default GeneralUserInformation;
