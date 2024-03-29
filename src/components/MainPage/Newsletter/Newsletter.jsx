import "../../../assets/Global.scss";

import classes from "./Newsletter.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
import { useRef, useState } from "react";

import { emailValidation } from "../../../hooks/useInputValidation";
import axios from "axios";
function Newsletter() {
  const cx = classNames.bind(classes);

  const [inputEmailIsValid, setInputEmailIsValid] = useState(true);
  const [inputCheckboxIsValid, setInputCheckboxIsValid] = useState(true);

  const [inputEmailErrorMessage, setInputEmailErrorMessage] = useState("");
  const [serverResponse, setServerResponse] = useState({});

  const inputEmailRef = useRef();
  const inputCheckboxRef = useRef();

  const inputEmailValidation = () => {
    setInputEmailIsValid(emailValidation(inputEmailRef.current.value));
    inputEmailRef.current.value === ""
      ? setInputEmailErrorMessage("Please fill out this field.")
      : setInputEmailErrorMessage("Invalid email.");
  };
  const inputCheckboxValidation = () => {
    setInputCheckboxIsValid(inputCheckboxRef.current.checked);
  };
  const formValidation = async (e) => {
    e.preventDefault();
    const email = inputEmailRef.current.value;
    if (
      email !== "" &&
      inputEmailIsValid === true &&
      inputCheckboxIsValid === true
    ) {
      try {
        const res = await axios.post("/newsletter/", {
          email,
        });
        setServerResponse({
          message: res.data,
          type: "server-accepted-large",
        });
      } catch (err) {
        setServerResponse({
          message: err.response.data,
          type: "server-denied-large",
        });
      }
    } else {
      inputCheckboxValidation();
      inputEmailValidation();
    }
  };

  return (
    <div className="grid-mainpage-newsletter">
      <div className={classNames(cx("newsletter"))}>
        <div className={classNames(cx("newsletter-container"))}>
          <p>NEWSLETTER</p>
          <h2>Stay Updated With The Latest News To Get More Qualified Leads</h2>
          <form className={classNames(cx("newsletter-form"))}>
            <input
              onChange={inputEmailValidation}
              ref={inputEmailRef}
              id="nemail"
              type="email"
              placeholder=" "
            />
            <label htmlFor="nemail">Email</label>
            {inputEmailIsValid || (
              <div className={classNames(cx("newsletter-form-errors-email"))}>
                {inputEmailErrorMessage}
              </div>
            )}

            <div className={classNames(cx("newsletter-form-confirm"))}>
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
              <div
                className={classNames(cx("newsletter-form-errors-checkbox"))}
              >
                Check this box, if you want to continue.
              </div>
            )}
            <button
              onClick={formValidation}
              type="submit"
              className="btn-solid-large"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
        <p className={serverResponse.type}>{serverResponse.message}</p>
      </div>
    </div>
  );
}

export default Newsletter;
