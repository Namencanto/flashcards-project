import classNames from "classnames/bind";
import classes from "../General.module.scss";
import React, { useState, useRef } from "react";
import { inputValidation } from "../../../../../../hooks/useInputValidation";
import { useEffect } from "react";

const GeneralUserInformation = ({
  postGeneralNick,
  currentNick,
  serverMessage,
  serverMessageTypeIsError,
  resetServerMessage,
}) => {
  const cx = classNames.bind(classes);

  const [inputNickIsValid, setInputNickIsValid] = useState(true);
  const [inputNickErrorMessage, setInputNickErrorMessage] = useState("");
  const [displayBtnToSubmitChanges, setDisplayBtnToSubmitChanges] =
    useState(false);
  const [inputNickValue, setInputNickValue] = useState("");
  console.log(currentNick);

  useEffect(() => {
    if (inputNickValue !== currentNick && inputNickIsValid) {
      setDisplayBtnToSubmitChanges(true);
    } else {
      setDisplayBtnToSubmitChanges(false);
    }
  }, [inputNickValue]);

  console.log(inputNickErrorMessage);
  const nickChangePostHandler = () => {
    const newNick = inputNickValue;
    if (setInputNickIsValid && newNick.length > 0 && inputNickIsValid) {
      postGeneralNick(newNick);
    } else {
      inputValidation(
        "nick",
        inputNickValue,
        setInputNickIsValid,
        setInputNickErrorMessage
      );
    }
  };

  return (
    <div className={classNames(cx("settings-general-user-info"))}>
      <div style={{ marginTop: "1.5rem" }} className="input-default">
        <input
          onChange={(e) => {
            inputValidation(
              "nick",
              e.target.value,
              setInputNickIsValid,
              setInputNickErrorMessage
            );
            resetServerMessage();
            setInputNickValue(e.target.value);
            if (e.target.value !== currentNick && inputNickIsValid) {
              setDisplayBtnToSubmitChanges(true);
            } else {
              setDisplayBtnToSubmitChanges(false);
            }
            console.log(displayBtnToSubmitChanges);
            if (e.target.value === currentNick) {
              setInputNickIsValid(false);
              setDisplayBtnToSubmitChanges(false);
              setInputNickErrorMessage("Nick cannot be the same as previous");
            } else {
              inputValidation(
                "nick",
                e.target.value,
                setInputNickIsValid,
                setInputNickErrorMessage
              );
            }
          }}
          value={inputNickValue}
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
        {displayBtnToSubmitChanges ? (
          <button onClick={nickChangePostHandler} className="btn-solid-large">
            Change
          </button>
        ) : (
          ""
        )}
      </div>
      <p style={{ color: serverMessageTypeIsError ? "red" : "green" }}>
        {serverMessage}
      </p>
    </div>
  );
};

export default GeneralUserInformation;
