import classNames from "classnames/bind";
import classes from "../General.module.scss";
import React, { useState, useRef } from "react";
import { inputValidation } from "../../../../../../hooks/useInputValidation";

const GeneralUserInformation = ({ postGeneralNick, currentNick }) => {
  const cx = classNames.bind(classes);

  const [inputNickIsValid, setInputNickIsValid] = useState(true);
  const [inputNickErrorMessage, setInputNickErrorMessage] = useState("");

  const nickRef = useRef();

  const nickChangePostHandler = () => {
    const newNick = nickRef.current.value;
    if (newNick.length > 0 && inputNickIsValid) {
      postGeneralNick(newNick);
    } else {
      inputValidation(
        "nick",
        nickRef,
        setInputNickIsValid,
        setInputNickErrorMessage
      );
    }
  };

  return (
    <div className={classNames(cx("settings-general-user-info"))}>
      <div style={{ marginTop: "1.5rem" }} className="input-default">
        <input
          onChange={() => {
            inputValidation(
              "nick",
              nickRef,
              setInputNickIsValid,
              setInputNickErrorMessage
            );
          }}
          ref={nickRef}
          id="nick"
          type="text"
          defaultValue={currentNick}
          placeholder=" "
        />
        <label htmlFor="nick">Nick</label>
      </div>
      {inputNickIsValid || (
        <div className={classNames(cx("settings-general-user-info-error"))}>
          {inputNickErrorMessage}
        </div>
      )}

      <div className={classNames(cx("settings-general-user-info-btn-wrapper"))}>
        <button onClick={nickChangePostHandler} className="btn-solid-large">
          Change
        </button>
      </div>
    </div>
  );
};

export default GeneralUserInformation;
