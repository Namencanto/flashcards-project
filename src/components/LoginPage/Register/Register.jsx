import "../../../assets/Global.scss";

import classes from "./Register.module.scss";
import classNames from "classnames/bind";

import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { inputValidation } from "../../../hooks/useInputValidation";

import { useAuth } from "../../../context/AuthContext";

function Register() {
  const cx = classNames.bind(classes);
  const navigate = useNavigate();
  const { signup, currentUser } = useAuth();
  /**
   * * INPUTS STATES
   */
  console.log(currentUser);
  const [inputEmailIsValid, setInputEmailIsValid] = useState(true);
  const [inputPasswordIsValid, setInputPasswordIsValid] = useState(true);
  const [inputPasswordConfirmIsValid, setInputPasswordConfirmIsValid] =
    useState(true);
  const [inputNickIsValid, setInputNickIsValid] = useState(true);
  const [inputCheckboxIsValid, setInputCheckboxIsValid] = useState(true);

  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState("");
  const [inputPasswordErrorMessage, setInputPasswordErrorMessage] =
    useState("");
  const [
    inputPasswordConfirmErrorMessage,
    setInputPasswordConfirmErrorMessage,
  ] = useState("");
  const [inputNickErrorMessage, setInputNickErrorMessage] = useState("");

  /**
   * * REFS
   */
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const inputPasswordConfirmRef = useRef();
  const inputNickRef = useRef();
  const inputCheckboxRef = useRef();

  /**
   * * SERVER MESSAGES STATES
   */
  const [serverMessage, setServerMessage] = useState("");
  const [serverMessageClass, setServerMessageClass] = useState("");
  const [serverLoading, setServerLoading] = useState(false);

  /**
   * * INPUTS VALIDATIONS
   */
  const inputCheckboxValidation = () => {
    setInputCheckboxIsValid(inputCheckboxRef.current.checked);
  };

  const passwordConfirmValidation = () => {
    if (inputPasswordConfirmRef.current.value !== "") {
      if (
        inputPasswordRef.current.value !== inputPasswordConfirmRef.current.value
      ) {
        setInputPasswordConfirmIsValid(false);
        setInputPasswordConfirmErrorMessage("Passwords are not the same");
      } else {
        setInputPasswordConfirmIsValid(true);
        setInputPasswordConfirmErrorMessage("");
      }
    }
  };

  const passwordValidation = () => {
    inputValidation(
      "password",
      inputPasswordRef,
      setInputPasswordIsValid,
      setInputPasswordErrorMessage
    );
    passwordConfirmValidation();
  };

  const formValidation = async (e) => {
    e.preventDefault();

    if (
      inputEmailRef.current.value !== "" &&
      inputEmailIsValid === true &&
      inputPasswordConfirmIsValid === true &&
      inputCheckboxIsValid === true
    ) {
      /**
       * * REGISTER POST
       */
      try {
        setServerLoading(true);

        await signup(
          inputEmailRef.current.value,
          inputPasswordRef.current.value,
          inputNickRef.current.value
        ).then(function (response) {
          setServerMessage("Successfully registered!");
          setServerMessageClass("register-server-accepted");
          navigate("/user");
        });
      } catch (error) {
        setServerMessage(error.message.split(":")[1].split(".")[0]);
        console.log(error);
        setServerMessageClass("register-server-denied");
        setServerLoading(false);
      }

      setServerLoading(false);
    } else {
      inputCheckboxValidation();
      inputValidation(
        "password",
        inputPasswordRef,
        setInputPasswordIsValid,
        setInputPasswordErrorMessage
      );
      passwordConfirmValidation();
      inputValidation(
        "email",
        inputEmailRef,
        setInputEmailIsValid,
        setInputEmailErrorMessage
      );
      inputValidation(
        "nick",
        inputNickRef,
        setInputNickIsValid,
        setInputNickErrorMessage
      );
    }
  };

  return (
    <div className={classNames(cx("register"))}>
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
            id="remail"
            type="email"
            placeholder=" "
          />
          <label htmlFor="remail">Email</label>
        </div>
        {inputEmailIsValid || (
          <div className={classNames(cx("register-error"))}>
            {inputEmailErrorMessage}
          </div>
        )}
        <div className="input-default">
          <input
            className="input-default"
            onChange={() => {
              inputValidation(
                "nick",
                inputNickRef,
                setInputNickIsValid,
                setInputNickErrorMessage
              );
            }}
            ref={inputNickRef}
            id="rnick"
            type="text"
            placeholder=" "
          />
          <label htmlFor="rnick">Nick</label>
        </div>

        {inputNickIsValid || (
          <div className={classNames(cx("register-error"))}>
            {inputNickErrorMessage}
          </div>
        )}

        <div className="input-default">
          <input
            className="input-default"
            onChange={passwordValidation}
            ref={inputPasswordRef}
            id="rpassword"
            type="password"
            placeholder=" "
          />
          <label htmlFor="rpassword">Password</label>
        </div>

        {inputPasswordIsValid || (
          <div className={classNames(cx("register-error"))}>
            {inputPasswordErrorMessage}
          </div>
        )}

        <div className="input-default">
          <input
            className="input-default"
            onChange={passwordConfirmValidation}
            ref={inputPasswordConfirmRef}
            id="rpasswordConfirm"
            type="password"
            placeholder=" "
          />
          <label htmlFor="rpasswordConfirm">Confirm Password</label>
        </div>

        {inputPasswordConfirmIsValid || (
          <div className={classNames(cx("register-error"))}>
            {inputPasswordConfirmErrorMessage}
          </div>
        )}

        <div className="checkbox-default">
          <input
            onClick={inputCheckboxValidation}
            ref={inputCheckboxRef}
            type="checkbox"
          />
          <p>
            I've read and agree to Tivo's written
            <Link to="privacy-policy"> Privacy Policy </Link> and
            <Link to="terms-conditions"> Terms Conditions </Link>.
          </p>
        </div>
        {inputCheckboxIsValid || (
          <div className={classNames(cx("register-error"))}>
            Check this box, if you want to continue.
          </div>
        )}

        <button
          // disabled={serverLoading}
          onClick={formValidation}
          type="submit"
          className="btn-solid-large"
        >
          SIGN UP
        </button>
      </form>

      {serverMessage !== "" ? (
        <p className={classNames(cx(serverMessageClass))}>{serverMessage}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Register;
