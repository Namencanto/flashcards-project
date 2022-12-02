import "../../../assets/Global.scss";

import classes from "./UserTechcardsList.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";
import UserTechcardsListContent from "./UserTechcardsListContent/UserTechcardsListContent";
import LearningModal from "../LearningModal/LearningModal";

import ReactDOM from "react-dom";
function UserTechcards() {
  const { minWidth1000 } = MediaQueries();
  const { currentUser } = useContext(AuthContext);

  const [learningModalIsVisible, setLearningModalIsVisible] = useState(false);
  const [techcardsInfo, setTechcardsInfo] = useState(false);
  const displayLearningModalHandler = (techcardsInfoFromList) => {
    setLearningModalIsVisible(true);
    setTechcardsInfo(techcardsInfoFromList);
  };
  const hideLearningModal = () => {
    setLearningModalIsVisible(false);
  };
  const cx = classNames.bind(classes);

  return (
    <div className={classNames(cx("techcards-list"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket} backPath="/user/techcards">
            <UserTechcardsListContent
              displayLearningModal={displayLearningModalHandler}
            />
          </UserMobileCard>
        ) : (
          <UserTechcardsListContent
            displayLearningModal={displayLearningModalHandler}
          />
        )}
        {learningModalIsVisible
          ? ReactDOM.createPortal(
              <LearningModal
                learningModalIsVisible={learningModalIsVisible}
                hideLearningModal={hideLearningModal}
                techcardsInfo={techcardsInfo}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
      </div>
    </div>
  );
}

export default UserTechcards;
