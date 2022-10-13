import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import MainPage from "./components/MainPage/MainPage";

function App() {
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
    window.addEventListener("load", handleLoading);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/home" />}></Route> */}
        <Route path="/*" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
