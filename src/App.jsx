import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import UserPages from "./components/UserPages/UserPages";

//backend
import { collection, addDoc } from "firebase/firestore";
import { database } from "./firebase";

function App() {
  // backend
  const collectionRef = collection(database, "users");

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
        {/* <Route path="/" element={<Navigate to="/home" />}></Route> */}

        <Route
          path="/*"
          element={
            <AuthProvider>
              <MainPage sendAllParts={allPartsHandler} />
            </AuthProvider>
          }
        ></Route>

        <Route
          path="/login"
          element={
            <AuthProvider>
              <LoginPage allParts={allParts} />
            </AuthProvider>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <AuthProvider>
              <LoginPage allParts={allParts} />
            </AuthProvider>
          }
        ></Route>

        <Route
          path="/user/*"
          element={
            <AuthProvider>
              <UserPages />
            </AuthProvider>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
