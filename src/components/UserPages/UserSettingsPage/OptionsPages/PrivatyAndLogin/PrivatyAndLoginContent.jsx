import "../../../../../assets/Global.scss";

import classNames from "classnames/bind";
import classes from "./PrivatyAndLogin.module.scss";

import { inputValidation } from "../../../../../hooks/useInputValidation";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import LoadingSpinner from "../../../../LoadingSpinner/LoadingSpinner";
import PrivatyAndLoginCheckboxes from "./PrivatyAndLoginCheckboxes/PrivatyAndLoginCheckboxes";
import PrivatyAndLoginChangeLoginData from "./PrivatyAndLoginChangeLoginData/PrivatyAndLoginChangeLoginData";
import { formValidation } from "./PrivatyAndLoginChangeLoginData/PrivatyAndLoginChangeLoginDataFormValidation";
function PrivatyAndLoginContent() {
  const cx = classNames.bind(classes);

  const [inputNewEmailIsValid, setInputNewEmailIsValid] = useState(true);
  const [inputNewPasswordIsValid, setInputNewPasswordIsValid] = useState(true);

  const [inputNewEmailValue, setInputNewEmailValue] = useState("");
  const [inputNewPasswordValue, setInputNewPasswordValue] = useState("");
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");

  const [isFetched, setIsFetched] = useState(false);

  const [inputNewEmailErrorMessage, setInputNewEmailErrorMessage] =
    useState("");
  const [inputNewPasswordErrorMessage, setInputNewPasswordErrorMessage] =
    useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageClass, setServerMessageClass] = useState("");
  const [serverLoading, setServerLoading] = useState(false);

  const [displayBtnToSubmitChanges, setDisplayBtnToSubmitChanges] =
    useState(false);

  const [emailNotificationsDefaultValue, setEmailNotificationsDefaultValue] =
    useState(0);
  const [publicProfileDefaultValue, setPublicProfileDefaultValue] = useState(0);

  useEffect(() => {
    if (
      inputEmailValue.length > 0 &&
      inputPasswordValue.length > 0 &&
      inputNewEmailValue.length > 0 &&
      inputNewEmailIsValid
    ) {
      setDisplayBtnToSubmitChanges(true);
    } else if (
      inputEmailValue.length > 0 &&
      inputPasswordValue.length > 0 &&
      inputNewPasswordValue.length > 0 &&
      inputNewPasswordIsValid
    ) {
      setDisplayBtnToSubmitChanges(true);
    } else setDisplayBtnToSubmitChanges(false);
  }, [
    inputEmailValue,
    inputPasswordValue,
    inputNewPasswordValue,
    inputNewEmailValue,
  ]);

  useEffect(() => {
    const getDefaultCheckboxes = async () => {
      setIsFetched(false);
      try {
        const res = await axios.get("/users/privaty-login");
        if (res.data.notifications) {
        }
        setEmailNotificationsDefaultValue(res.data.notifications);
        setPublicProfileDefaultValue(res.data.public);
      } catch (err) {
        setIsFetched(true);
        console.log(err);
      }
      setIsFetched(true);
    };
    getDefaultCheckboxes();
  }, []);

  const loginDataProps = {
    setInputEmailValue,
    inputEmailValue,
    setInputPasswordValue,
    inputPasswordValue,
    setInputNewEmailValue,
    inputValidation,
    inputNewEmailValue,
    setInputNewEmailIsValid,
    setInputNewEmailErrorMessage,
    inputNewEmailIsValid,
    inputNewEmailErrorMessage,
    setInputNewPasswordValue,
    inputNewPasswordValue,
    setInputNewPasswordIsValid,
    setInputNewPasswordErrorMessage,
    inputNewPasswordIsValid,
    inputNewPasswordErrorMessage,
  };

  return (
    <div className={classNames(cx("privaty-login-content"))}>
      {isFetched ? (
        <>
          <form
            onSubmit={(e) => {
              formValidation(
                e,
                inputEmailValue,
                inputPasswordValue,
                inputNewEmailValue,
                inputNewPasswordValue,
                inputNewEmailIsValid,
                inputNewPasswordIsValid,
                setServerLoading,
                setServerMessage,
                setServerMessageClass,
                inputValidation,
                setInputNewPasswordIsValid,
                setInputNewPasswordErrorMessage,
                setInputNewEmailIsValid,
                setInputNewEmailErrorMessage
              );
            }}
          >
            <PrivatyAndLoginCheckboxes
              emailNotificationsDefaultValue={emailNotificationsDefaultValue}
              publicProfileDefaultValue={publicProfileDefaultValue}
            />
            <PrivatyAndLoginChangeLoginData {...loginDataProps} />
            {displayBtnToSubmitChanges ? (
              <button disabled={serverLoading} className="btn-solid-large">
                Submit
              </button>
            ) : (
              ""
            )}
          </form>
          {serverMessage !== "" ? (
            <p style={{ marginTop: "1rem" }} className={serverMessageClass}>
              {serverMessage}
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default PrivatyAndLoginContent;
