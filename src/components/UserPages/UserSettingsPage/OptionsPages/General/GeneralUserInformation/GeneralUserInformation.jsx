import classNames from "classnames/bind";
import classes from "../General.module.scss";
import React, { useState, useRef } from "react";
import { inputValidation } from "../../../../../../hooks/useInputValidation";

const GeneralUserInformation = ({
  postGeneralNick,
  currentNick,
  serverMessage,
  serverMessageTypeIsError,
}) => {
  const cx = classNames.bind(classes);

  const [inputNickIsValid, setInputNickIsValid] = useState(true);
  const [inputNickErrorMessage, setInputNickErrorMessage] = useState("");

  const nickRef = useRef();

  const nickChangePostHandler = () => {
    const newNick = nickRef.current.value;
    if (setInputNickIsValid && newNick.length > 0 && inputNickIsValid) {
      postGeneralNick(newNick);
    } else {
      inputValidation(
        "nick",
        nickRef,
        setInputNickIsValid,
        setInputNickErrorMessage
      );
      checkPreviousIdentity();
    }
  };
  const checkPreviousIdentity = () => {
    if (nickRef.current.value === currentNick) {
      setInputNickIsValid(false);
      setInputNickErrorMessage(
        "The nick must not be the same as the previous one"
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
            checkPreviousIdentity();
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
      <p style={{ color: serverMessageTypeIsError ? "red" : "green" }}>
        {serverMessage}
      </p>
    </div>
  );
};

export default GeneralUserInformation;
