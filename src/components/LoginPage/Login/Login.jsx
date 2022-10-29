import "../../../assets/Global.scss";

import classes from "./Login.module.scss";
import classNames from "classnames/bind";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { inputValidation } from "../../../hooks/useInputValidation";

import { useAuth } from "../../../context/AuthContext";

function Login() {
  const cx = classNames.bind(classes);
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  const [inputEmailIsValid, setInputEmailIsValid] = useState(true);
  const [inputPasswordIsValid, setInputPasswordIsValid] = useState(true);

  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState("");
  const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
    useState("");

  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  /**
   * * SERVER MESSAGES STATES
   */
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageClass, setServerMessageClass] = useState("");
  const [serverLoading, setServerLoading] = useState(false);

  const formValidation = async (e) => {
    e.preventDefault();

    if (
      inputEmailRef.current.value !== "" &&
      inputEmailIsValid === true &&
      inputPasswordIsValid === true
    ) {
      try {
        setServerLoading(true);
        await login(
          inputEmailRef.current.value,
          inputPasswordRef.current.value
        ).then(function (response) {
          setServerMessage("Successfully logged!");
          setServerMessageClass("login-server-accepted");
          navigate("/user");
        });
      } catch (error) {
        setServerMessage(error.message.split(":")[1].split(".")[0]);
        setServerMessageClass("login-server-denied");
        setServerLoading(false);
      }
      setServerLoading(false);
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
    }
  };

  return (
    <div className={classNames(cx("login"))}>
      <form>
        <div className="input-default">
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
            id="lemail"
            type="email"
            placeholder=" "
          />
          <label htmlFor="lemail">Email</label>
        </div>
        {inputEmailIsValid || (
          <div className={classNames(cx("login-error"))}>
            {inputEmailErrorMessage}
          </div>
        )}
        <div className="input-default">
          <input
            className="input-default"
            onChange={() => {
              inputValidation(
                "password",
                inputPasswordRef,
                setInputPasswordIsValid,
                setInputPasswordErrorMessage
              );
            }}
            ref={inputPasswordRef}
            id="lpassword"
            type="password"
            placeholder=" "
          />
          <label htmlFor="lpassword">Password</label>
        </div>

        {inputPasswordIsValid || (
          <div className={classNames(cx("login-error"))}>
            {inputPasswordErrorMessage}
          </div>
        )}

        <button
          disabled={serverLoading}
          onClick={formValidation}
          type="submit"
          className="btn-solid-large"
        >
          LOG IN
        </button>
        {serverMessage !== "" ? (
          <p className={classNames(cx(serverMessageClass))}>{serverMessage}</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
}

export default Login;