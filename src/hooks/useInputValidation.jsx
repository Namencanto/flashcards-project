export function passwordValidation(password) {
  // that's why it's so stupidly done, because this regex doesn't know why it doesn't catch that you still need to include the special character ...
  const regex1 =
    /^(?=.*[!~@#$%^/&?*()_+-={}|[\]\\:\";'<>,.])(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!~@#$%^/&?*()_+-={}|[\]\\:\";'<>,.]{10,5128}$/;
  const regex2 = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return regex1.test(password) && regex2.test(password);
}

export function emailValidation(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
export function nickValidation(nick) {
  return /^[a-zA-Z0-9_.]{3,25}$/.test(nick);
}

export function inputValidation(type, input, setIsValid, setErrorMsg) {
  if (type === "password") {
    setIsValid(passwordValidation(input.current.value));

    if (input.current.value === "") {
      setErrorMsg("Please fill out this field.");
    } else if (input.current.value.length < 10) {
      setErrorMsg("Password must have at least 10 characters");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(input.current.value)) {
      setErrorMsg(
        "Password must have at least one lowercase and uppercase letter"
      );
    } else if (!/.*[0-9].*/.test(input.current.value)) {
      setErrorMsg("Password must have at least one number 0-9");
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(input.current.value)
    ) {
      setErrorMsg("Password must have at least one special character");
    }
  }

  if (type === "email") {
    setIsValid(emailValidation(input.current.value));

    if (input.current.value === "") {
      setErrorMsg("Please fill out this field.");
    } else if (!input.current.value.includes("@")) {
      setErrorMsg("Email must includes @");
    } else if (!emailValidation(input.current.value))
      setErrorMsg("Invalid email.");
  }

  if (type === "nick") {
    setIsValid(nickValidation(input.current.value));

    if (input.current.value === "") {
      setErrorMsg("Please fill out this field.");
    } else if (
      input.current.value.length < 3 ||
      input.current.value.length > 25
    ) {
      setErrorMsg("Nick must be between 3-25 length");
    } else if (!nickValidation(input.current.value))
      setErrorMsg(
        "Nick may contain only letters, numbers, dots and underscores"
      );
  }
}
