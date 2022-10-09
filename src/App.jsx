import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import MainPage from "./components/MainPage/MainPage";

function App() {
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
