import axios from "axios";
export const formValidation = async (
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
) => {
  e.preventDefault();

  const changeLoginData = async (email, password, newEmail, newPassword) => {
    setServerLoading(true);
    try {
      const res = await axios.post("/auth/change-login-data", {
        newEmail,
        newPassword,
        email,
        password,
      });
      setServerLoading(false);
      return res;
    } catch (err) {
      console.log(err);
      setServerMessage(err.response.data);
      setServerMessageClass("server-denied-medium");
      setServerLoading(false);
    }
  };

  // CHANGE PASSWORD AND EMAIL CASE
  if (
    inputNewEmailValue.length > 0 &&
    inputNewPasswordValue.length > 0 &&
    inputNewEmailIsValid &&
    inputNewPasswordIsValid
  ) {
    const res = await changeLoginData(
      inputEmailValue,
      inputPasswordValue,
      inputNewEmailValue,
      inputNewPasswordValue
    );
    if (res?.status === 200) {
      setServerMessage("Successfully changed email and password");
      setServerMessageClass("server-accepted-medium");
    }
  }

  // CHANGE EMAIL CASE
  else if (inputNewEmailValue.length > 0 && inputNewEmailIsValid) {
    const res = await changeLoginData(
      inputEmailValue,
      inputPasswordValue,
      inputNewEmailValue
    );
    if (res?.status === 200) {
      setServerMessage("Successfully changed email");
      setServerMessageClass("server-accepted-medium");
    }
  }

  // CHANGE PASSWORD CASE
  else if (inputNewPasswordValue.length > 0 && inputNewPasswordIsValid) {
    const res = await changeLoginData(
      inputEmailValue,
      inputPasswordValue,
      null,
      inputNewPasswordValue
    );
    if (res?.status === 200) {
      setServerMessage("Successfully changed password");
      setServerMessageClass("server-accepted-medium");
    }
  } else {
    if (inputNewPasswordValue.length > 0) {
      inputValidation(
        "password",
        inputNewPasswordValue,
        setInputNewPasswordIsValid,
        setInputNewPasswordErrorMessage
      );
    }
    if (inputNewEmailValue.length > 0) {
      inputValidation(
        "email",
        inputNewEmailValue,
        setInputNewEmailIsValid,
        setInputNewEmailErrorMessage
      );
    }
  }
};
