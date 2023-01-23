import classes from "./PoliciesPages.module.scss";
import classNames from "classnames/bind";

import "../../assets/Global.scss";

import Header from "../MainPage/Header/Header";
import Footer from "../MainPage/Footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";

function PoliciesPages({ children, title }) {
  const { currentUser, logout } = useContext(AuthContext);
  const cx = classNames.bind(classes);
  let navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <>
      <Header
        allParts={[false, false, false, false]}
        currentUser={currentUser}
        logout={logout}
        policiesHeader={title}
      />

      <nav className={classNames(cx("policies-nav"))}>
        <div className={classNames(cx("policies-nav-text"))}>
          <Link to="/home">Home</Link>
          <FontAwesomeIcon icon={faAnglesRight} />
          <p>{title}</p>
        </div>
      </nav>
      <main className={classNames(cx("policies-main"))}>
        {children}
        <button onClick={handleBack} className="btn-outline-medium">
          BACK
        </button>
      </main>
      <nav className={classNames(cx("policies-nav"))}>
        <div className={classNames(cx("policies-nav-text"))}>
          <Link to="/home">Home</Link>
          <FontAwesomeIcon icon={faAnglesRight} />
          <p>{title}</p>
        </div>
      </nav>

      <Footer backgroundColor={"#f3f7fd"} />
    </>
  );
}

export default PoliciesPages;
