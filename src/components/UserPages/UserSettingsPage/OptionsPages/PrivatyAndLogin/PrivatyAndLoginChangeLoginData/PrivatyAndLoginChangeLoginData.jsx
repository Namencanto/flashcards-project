import "../../../../../../assets/Global.scss";

import classNames from "classnames/bind";
import classes from "../PrivatyAndLogin.module.scss";
function PrivatyAndLoginChangeLoginData({
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
}) {
  const cx = classNames.bind(classes);
  return (
    <>
      <div className={classNames(cx("privaty-login-content-input-wrapper"))}>
        <div className="input-default" style={{ margin: " 0.5rem" }}>
          <input
            onChange={(e) => {
              setInputEmailValue(e.target.value);
            }}
            value={inputEmailValue}
            id="old-email"
            type="email"
            placeholder=" "
          />
          <label htmlFor="old-email">E-mail</label>
        </div>
        <div className="input-default" style={{ margin: " 0.5rem" }}>
          <input
            onChange={(e) => {
              setInputPasswordValue(e.target.value);
            }}
            value={inputPasswordValue}
            id="password"
            type="password"
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <div className={classNames(cx("privaty-login-content-input-wrapper"))}>
        <div className="input-default" style={{ margin: " 0.5rem" }}>
          <input
            onChange={(e) => {
              console.log(e.target.value);
              console.log(inputNewEmailErrorMessage);
              setInputNewEmailValue(e.target.value);

              inputValidation(
                "email",
                e.target.value,
                setInputNewEmailIsValid,
                setInputNewEmailErrorMessage,
                true
              );
              if (e.target.value.length < 1) {
                setInputNewEmailErrorMessage("");
              }
            }}
            value={inputNewEmailValue}
            id="new-email"
            type="email"
            placeholder=" "
          />
          <label htmlFor="new-email">New e-mail</label>
          {inputNewEmailIsValid || (
            <p
              className={classNames(cx("privaty-login-content-error-message"))}
            >
              {inputNewEmailErrorMessage}
            </p>
          )}
          <p>Leave empty to change only password</p>
        </div>
        <div className="input-default" style={{ margin: " 0.5rem" }}>
          <input
            onChange={(e) => {
              setInputNewPasswordValue(e.target.value);

              inputValidation(
                "password",
                e.target.value,
                setInputNewPasswordIsValid,
                setInputNewPasswordErrorMessage,
                true
              );
              if (e.target.value.length < 1) {
                setInputNewPasswordErrorMessage("");
              }
            }}
            value={inputNewPasswordValue}
            id="new-password"
            type="password"
            placeholder=" "
          />
          <label htmlFor="new-password">New password</label>
          {inputNewPasswordIsValid || (
            <p
              className={classNames(cx("privaty-login-content-error-message"))}
            >
              {inputNewPasswordErrorMessage}
            </p>
          )}
          <p>Leave empty to change only email</p>
        </div>
      </div>
    </>
  );
}

export default PrivatyAndLoginChangeLoginData;
