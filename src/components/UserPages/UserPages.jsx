import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import UserMainPage from "./UserMainPage/UserMainPage";

import UserSettingsPage from "./UserSettingsPage/UserSettingsPage";
import UserHeader from "./UserHeader/Header";

import AboutMe from "./UserMainPage/AboutMe/AboutMe";
import LastLearned from "./UserMainPage/LastLearned/LastLearned";
import Statistics from "./UserMainPage/Statistics/Statistics";
import Ranking from "./UserMainPage/Ranking/Ranking";
import UserTechcards from "./UserTechcards/UserTechcards";
import UserTechcardsList from "./UserTechcardsList/UserTechcardsList";
import Courses from "./Courses/Courses";

import { RepetitionsContextProvider } from "../../context/RepetitionsContext";
import { useEffect } from "react";

import MediaQueries from "../../HelperComponents/MediaQueries";
function UserPages() {
  const { minWidth1000 } = MediaQueries();

  let navigate = useNavigate();
  const path = useLocation().pathname;
  const mobilePaths = ["about-me", "last-learned", "statistics", "ranking"];
  useEffect(() => {
    if (
      !minWidth1000 &&
      mobilePaths.some((mobilePath) => path.includes(`/user/${mobilePath}`))
    ) {
      navigate("/user");
    }
  }, [path, navigate, minWidth1000]);

  return (
    <RepetitionsContextProvider>
      <UserHeader />

      <Routes>
        {/* mobile way */}

        <Route path="about-me" element={<AboutMe />}></Route>
        <Route path="last-learned" element={<LastLearned />}></Route>
        <Route path="statistics" element={<Statistics />}></Route>
        <Route path="ranking" element={<Ranking />}></Route>
        <Route path="techcards" element={<UserTechcards />}></Route>
        <Route path="courses" element={<Courses />}></Route>
        <Route
          path="techcards/:folder/:list/:id"
          element={<UserTechcardsList />}
        ></Route>

        {/* desktop way */}
        <Route path="" element={<UserMainPage />}></Route>
        {/* <Route path="learning" element={<LearningPage />}></Route> */}
        <Route path="settings/*" element={<UserSettingsPage />}></Route>
      </Routes>
    </RepetitionsContextProvider>
  );
}

export default UserPages;
