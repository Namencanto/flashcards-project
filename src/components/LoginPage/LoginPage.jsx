import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { useLocation } from "react-router-dom";

import classes from "./LoginPage.module.scss";
import classNames from "classnames/bind";

import { Link } from "react-router-dom";
function LoginPage(props) {
  const cx = classNames.bind(classes);
  const [loginIsVisible, setLoginIsVisible] = useState(true);

  let pathName = useLocation().pathname;

  if (loginIsVisible !== false && pathName === "/register") {
    setLoginIsVisible(false);
  }
  if (loginIsVisible !== true && pathName === "/login") {
    setLoginIsVisible(true);
  }

  return (
    <>
      {/* login && header login : reszta */}

      <Header allParts={props.allParts} />
      <div className={classNames(cx("loginpage-container"))}>
        <div className={classNames(cx("loginpage"))}>
          <div className={classNames(cx("loginpage-wrapper"))}>
            {loginIsVisible === true ? <h1>Log In</h1> : <h1>Sign Up</h1>}
            {loginIsVisible === true ? (
              <p className={classNames(cx("loginpage-description"))}>
                You don't have a password? Then please{" "}
                <Link
                  className={classNames(cx("loginpage-description"))}
                  to="/register"
                  onClick={() => {
                    setLoginIsVisible(false);
                  }}
                >
                  Sign Up
                </Link>
              </p>
            ) : (
              <p className={classNames(cx("loginpage-description"))}>
                Fill out the form below to sign up for Tivo. Already signed up?
                Then just{" "}
                <Link
                  className={classNames(cx("loginpage-description"))}
                  to="/login"
                  onClick={() => {
                    setLoginIsVisible(true);
                  }}
                >
                  Log In
                </Link>
              </p>
            )}
            {loginIsVisible === true ? <Login /> : <Register />}
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
