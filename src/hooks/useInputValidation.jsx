export function passwordValidation(password) {
  return /^(?=.*[0-9])(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{10,5128}$/.test(
    password
  );
}

export function emailValidation(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
export function nickValidation(Nick) {
  return /^[a-zA-Z0-9_.]{3,20}$/.test(Nick);
}

export function inputValidation(type, input, setIsValid, setErrorMsg) {
  if (type === "password") {
    setIsValid(passwordValidation(input.current.value));

    if (input.current.value === "") {
      setErrorMsg("Please fill out this field.");
    } else if (input.current.value.length < 10) {
      setErrorMsg("Password must have at least 10 characters");
    } else if (!/(?=.*[A-Z][a-z])+/.test(input.current.value)) {
      setErrorMsg(
        "Password must have at least one lowercase and uppercase letter"
      );
    } else if (!/.*[0-9].*/.test(input.current.value)) {
      setErrorMsg("Password must have at least one number 0-9");
    } else if (
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(input.current.value)
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
      input.current.value.length > 20
    ) {
      setErrorMsg("Nick must be between 3-20 length");
    } else if (!nickValidation(input.current.value))
      setErrorMsg(
        "Nick may contain only letters, numbers, dots and underscores"
      );
  }
}
