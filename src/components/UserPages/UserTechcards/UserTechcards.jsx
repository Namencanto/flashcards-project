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
import { useCountStatus } from "../../../hooks/useCountStatus";

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
  const [statisticsID, setStatisticsID] = useState();
  const [statisticsStatuses, setStatisticsStatuses] = useState([]);

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

  const displayFolderStatisticsModalHandler = (folderID) => {
    setStatisticsModalIsVisible(true);
    let statusesArr = [];
    for (const allSides of techcardsAllSides) {
      for (const side of allSides) {
        if (side.folder_uid === folderID) statusesArr.push(side.status);
      }
    }
    if (statusesArr.length > 1) {
      setStatisticsStatuses(statusesArr);
    }
    setStatisticsID(folderID);
  };
  const displayListStatisticsModalHandler = (listID) => {
    setStatisticsModalIsVisible(true);
    let statusesArr = [];
    for (const allSides of techcardsAllSides) {
      for (const side of allSides) {
        if (side.uid === listID) statusesArr.push(side.status);
        console.log(side);
      }
    }
    if (statusesArr.length > 0) {
      setStatisticsStatuses(statusesArr);
    }
    setStatisticsID(listID);
  };

  const hideStatisticsModal = () => {
    setStatisticsModalIsVisible(false);
  };
  const statuses = useCountStatus(statisticsStatuses);
  console.log(statuses);
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
                displayFolderStatisticsModal={
                  displayFolderStatisticsModalHandler
                }
                displayListStatisticsModal={displayListStatisticsModalHandler}
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
            displayFolderStatisticsModal={displayFolderStatisticsModalHandler}
            displayListStatisticsModal={displayListStatisticsModalHandler}
          />
        )}
        {statisticsModalIsVisible
          ? ReactDOM.createPortal(
              <StatisticsModal
                type={"FOLDER"}
                id={statisticsID}
                statuses={statuses}
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
