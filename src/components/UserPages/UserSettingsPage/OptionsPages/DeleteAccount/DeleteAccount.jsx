import axios from "axios";
import classNames from "classnames/bind";
import { useState } from "react";
import { useRef } from "react";
import classes from "./DeleteAccount.module.scss";
import { useNavigate } from "react-router-dom";

import { inputValidation } from "../../../../../hooks/useInputValidation";
function DeleteAccount() {
  const navigate = useNavigate();
  const cx = classNames.bind(classes);
  const [deleteAccountErrorMessage, setDeleteAccountErrorMessage] =
    useState("");
  const [inputEmailIsValid, setInputEmailIsValid] = useState(true);
  const [inputPasswordIsValid, setInputPasswordIsValid] = useState(true);
  const [inputCheckboxIsValid, setInputCheckboxIsValid] = useState(true);

  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState("");
  const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
    useState("");

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputCheckboxRef = useRef();
  const deleteAccountHandler = async () => {
    if (
      inputEmailIsValid &&
      inputPasswordIsValid &&
      inputCheckboxIsValid &&
      inputEmailRef.current.value.length > 0
    ) {
      try {
        const res = await axios.post("/auth/delete-account", {
          email: inputEmailRef.current.value,
          password: inputPasswordRef.current.value,
        });
        if (res.status === 200) {
          navigate("/login");
        }
      } catch (e) {
        setDeleteAccountErrorMessage(e.response.data);
      }
    } else {
      inputValidation(
        "password",
        inputPasswordRef,
        setInputPasswordIsValid,
        setInputPasswordErrorMessage
      );
      inputValidation(
        "email",
        inputEmailRef,
        setInputEmailIsValid,
        setInputEmailErrorMessage
      );
      inputCheckboxValidation();
    }
  };
  const inputCheckboxValidation = () => {
    setInputCheckboxIsValid(inputCheckboxRef.current.checked);
  };
  return (
    <div className={classNames(cx("delete-account"))}>
      <h1>Delete account</h1>
      <div className={classNames(cx("delete-account-container"))}>
        <div className={classNames(cx("delete-account-content"))}>
          <div style={{ maxWidth: "19.84rem" }} className="input-default">
            <input
              onChange={() => {
                inputValidation(
                  "email",
                  inputEmailRef,
                  setInputEmailIsValid,
                  setInputEmailErrorMessage
                );
              }}
              ref={inputEmailRef}
              id="email"
              type="email"
              placeholder=" "
            />
            <label htmlFor="email">E-mail</label>
            <p style={{ color: "red" }}>{inputEmailErrorMessage}</p>
          </div>
          <div
            className="input-default"
            style={{ marginTop: "1.5rem", maxWidth: "19.84rem" }}
          >
            <input
              onChange={() => {
                inputValidation(
                  "password",
                  inputPasswordRef,
                  setInputPasswordIsValid,
                  setInputPasswordErrorMessage
                );
              }}
              ref={inputPasswordRef}
              id="password"
              type="password"
              placeholder=" "
            />
            <label htmlFor="password">Password</label>
            <p style={{ color: "red" }}>{inputPasswordErrorMessage}</p>
          </div>
          <div className={classNames(cx("delete-account-content-checkbox"))}>
            <div
              className={classNames(
                cx("delete-account-content-checkbox-input-wrapper")
              )}
            >
              <label htmlFor="delete-account">
                Account will be deleted permamently
              </label>
              <input
                onClick={inputCheckboxValidation}
                ref={inputCheckboxRef}
                id="delete-account"
                type="checkbox"
              />
            </div>
            {inputCheckboxIsValid || (
              <p style={{ color: "red" }}>
                Check this box, if you want to continue.
              </p>
            )}
          </div>
        </div>
        <button onClick={deleteAccountHandler} className="btn-solid-large">
          Submit
        </button>
      </div>
      <p className="server-denied-medium" style={{ marginTop: "1rem" }}>
        {deleteAccountErrorMessage}
      </p>
    </div>
  );
}

export default DeleteAccount;
