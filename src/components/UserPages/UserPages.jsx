import { Routes, Route } from "react-router-dom";

import UserMainPage from "./UserMainPage/UserMainPage";
// import LearningPage from "./LearningPage/LearningPage";
import UserSettingsPage from "./UserSettingsPage/UserSettingsPage";
import UserHeader from "./UserHeader/Header";

import AboutMe from "./UserMainPage/AboutMe/AboutMe";
import LastLearned from "./UserMainPage/LastLearned/LastLearned";
import Statistics from "./UserMainPage/Statistics/Statistics";
import Ranking from "./UserMainPage/Ranking/Ranking";
import UserTechcards from "./UserTechcards/UserTechcards";
import UserTechcardsList from "./UserTechcardsList/UserTechcardsList";
function UserPages() {
  return (
    <>
      <UserHeader />

      <Routes>
        {/* mobile way */}
        <Route path="about-me" element={<AboutMe />}></Route>
        <Route path="last-learned" element={<LastLearned />}></Route>
        <Route path="statistics" element={<Statistics />}></Route>
        <Route path="ranking" element={<Ranking />}></Route>
        <Route path="techcards" element={<UserTechcards />}></Route>
        <Route
          path="techcards/:folder/:list/:id"
          element={<UserTechcardsList />}
        ></Route>

        {/* desktop way */}
        <Route path="" element={<UserMainPage />}></Route>
        {/* <Route path="learning" element={<LearningPage />}></Route> */}
        <Route path="settings/*" element={<UserSettingsPage />}></Route>
      </Routes>
    </>
  );
}

export default UserPages;
