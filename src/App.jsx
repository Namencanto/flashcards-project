import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import UserPages from "./components/UserPages/UserPages";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import { getCookie } from "./HelperComponents/getCookie";
import axios from "axios";

import PrivacyPolicyPage from "./components/PoliciesPages/PrivacyPolicyPage/PrivacyPolicyPage";
import TermsConditionsPage from "./components/PoliciesPages/TermsConditionsPage/TermsConditionsPage";
import HowItWorksPage from "./components/PoliciesPages/HowItWorksPage/HowItWorksPage";

function App() {
  if (process.env.REACT_APP_IS_PRODUCTION)
    axios.defaults.baseURL = `${process.env.REACT_APP_URL}/api`;

  const { currentUser } = useContext(AuthContext);

  // page loading spinner
  const handleLoading = () => {
    setTimeout(() => {
      const spinner = document.querySelector(".spinner");
      spinner.style.opacity = 0;
      setTimeout(() => {
        spinner.remove();
      }, 400);
    }, 500);
  };

  useEffect(() => {
    if (document.readyState === "complete") {
      handleLoading();
    } else {
      window.addEventListener("load", handleLoading);
    }
  }, []);

  const [allParts, setAllParts] = useState([]);

  const allPartsHandler = (...refs) => {
    setAllParts(...refs);
  };

  return (
    <BrowserRouter>
      <Routes>
        {!getCookie("jwtTime") && (
          <Route path="/user/*" element={<Navigate to="/login" />}></Route>
        )}

        <Route
          path="/*"
          element={<MainPage sendAllParts={allPartsHandler} />}
        ></Route>

        <Route
          path="/login"
          element={<LoginPage allParts={allParts} />}
        ></Route>
        <Route
          path="/register"
          element={<LoginPage allParts={allParts} />}
        ></Route>

        {currentUser && <Route path="/user/*" element={<UserPages />}></Route>}

        <Route path="privacy-policy" element={<PrivacyPolicyPage />}></Route>
        <Route
          path="terms-conditions"
          element={<TermsConditionsPage />}
        ></Route>
        <Route path="how-it-works" element={<HowItWorksPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
