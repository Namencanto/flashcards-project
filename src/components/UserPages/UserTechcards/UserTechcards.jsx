import "../../../assets/Global.scss";

import classes from "./UserTechcards.module.scss";
import classNames from "classnames/bind";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";
import StatisticsModal from "./UserTechcardsContent/StatisticsModal/StatisticsModal";
import UserTechcardsContent from "./UserTechcardsContent/UserTechcardsContent";
import ReactDOM from "react-dom";
import { faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function UserTechcards() {
  const { minWidth1000 } = MediaQueries();

  const cx = classNames.bind(classes);

  // * Handling the form states
  const [addFormIsSelected, setAddFormIsSelected] = useState(false);
  const [changeFormIsSelected, setChangeFormIsSelected] = useState(false);
  const [deleteFormIsSelected, setDeleteFormIsSelected] = useState(false);

  const [statisticsModalIsVisible, setStatisticsModalIsVisible] =
    useState(false);

  const [techcardsFolders, setTechcardsFolders] = useState([]);
  const [techcardsLists, setTechcardsLists] = useState([]);
  const [techcardsAllSides, setTechcardsAllSides] = useState([]);

  const [userMessage, setUserMessage] = useState([]);

  const [techcardsChangeIcon, setTechcardsChangeIcon] = useState(faGear);
  const [changeTechcardsIsVisible, setTechcardsIsVisible] = useState(false);
  const [StatisticsFolderID, setStatisticsFolderID] = useState();
  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/get");

      setTechcardsFolders(res.data[0]);
      setTechcardsLists(res.data[1]);
      setTechcardsAllSides(res?.data[2]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

  const changeTechcardsconHandler = () => {
    if (changeTechcardsIsVisible === true) {
      setUserMessage([]);
      setTechcardsChangeIcon(faGear);
      setTechcardsIsVisible(false);
      clearFormStates();
    } else {
      setTechcardsChangeIcon(faArrowLeft);
      setTechcardsIsVisible(true);
      setAddFormIsSelected(true);
    }
  };
  const clearFormStates = () => {
    setAddFormIsSelected(false);
    setChangeFormIsSelected(false);
    setDeleteFormIsSelected(false);
  };
  const displayStatisticsModalHandler = (folderID) => {
    setStatisticsModalIsVisible(true);
    setStatisticsFolderID(folderID);
  };
  const hideStatisticsModal = () => {
    setStatisticsModalIsVisible(false);
  };

  return (
    <div className={classNames(cx("techcards"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket}>
            {
              <UserTechcardsContent
                deleteFormIsSelected={deleteFormIsSelected}
                changeFormIsSelected={changeFormIsSelected}
                addFormIsSelected={addFormIsSelected}
                techcardsFolders={techcardsFolders}
                techcardsLists={techcardsLists}
                techcardsAllSides={techcardsAllSides}
                userMessage={userMessage}
                techcardsChangeIcon={techcardsChangeIcon}
                changeTechcardsIsVisible={changeTechcardsIsVisible}
                setUserMessage={setUserMessage}
                setAddFormIsSelected={setAddFormIsSelected}
                setChangeFormIsSelected={setChangeFormIsSelected}
                setDeleteFormIsSelected={setDeleteFormIsSelected}
                changeTechcardsconHandler={changeTechcardsconHandler}
                clearFormStates={clearFormStates}
                fetchTechcards={fetchTechcards}
                displayStatisticsModal={displayStatisticsModalHandler}
              />
            }
          </UserMobileCard>
        ) : (
          <UserTechcardsContent
            deleteFormIsSelected={deleteFormIsSelected}
            changeFormIsSelected={changeFormIsSelected}
            addFormIsSelected={addFormIsSelected}
            techcardsFolders={techcardsFolders}
            techcardsLists={techcardsLists}
            techcardsAllSides={techcardsAllSides}
            userMessage={userMessage}
            techcardsChangeIcon={techcardsChangeIcon}
            changeTechcardsIsVisible={changeTechcardsIsVisible}
            setUserMessage={setUserMessage}
            setAddFormIsSelected={setAddFormIsSelected}
            setDeleteFormIsSelected={setDeleteFormIsSelected}
            setChangeFormIsSelected={setChangeFormIsSelected}
            changeTechcardsconHandler={changeTechcardsconHandler}
            clearFormStates={clearFormStates}
            fetchTechcards={fetchTechcards}
            displayStatisticsModal={displayStatisticsModalHandler}
          />
        )}
        {statisticsModalIsVisible
          ? ReactDOM.createPortal(
              <StatisticsModal
                folderID={StatisticsFolderID}
                hideStatisticsModal={hideStatisticsModal}
                statisticsModalIsVisible={statisticsModalIsVisible}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
      </div>
    </div>
  );
}

export default UserTechcards;
