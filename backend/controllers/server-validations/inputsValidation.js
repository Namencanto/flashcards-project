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
