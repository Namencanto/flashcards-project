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
import { countStatus } from "../../../HelperComponents/countStatus";

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
  const [statisticsCreatedDate, setStatisticsCreatedDate] = useState("");
  const [statisticsTitle, setStatisticsTitle] = useState("");
  const [folderOrListStats, setFolderOrListStats] = useState("");

  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/get");

      setTechcardsFolders(res.data[0]);
      setTechcardsLists(res.data[1]);
      setTechcardsAllSides(res.data[2]);
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

  const setDataToStatistics = (id, type) => {
    let statusesArr = [];
    for (const allSides of techcardsAllSides) {
      for (const side of allSides) {
        if (side.uid === id && type === "LIST") statusesArr.push(side.status);
        if (side.folder_uid === id && type === "FOLDER")
          statusesArr.push(side.status);
      }
    }
    if (statusesArr.length > 0) {
      setStatisticsStatuses(countStatus(statusesArr));
    } else setStatisticsStatuses(countStatus([]));
    setStatisticsID(id);
    setFolderOrListStats(type);
    setStatisticsModalIsVisible(true);
  };

  const displayFolderStatisticsModalHandler = (folderID) => {
    setDataToStatistics(folderID, "FOLDER");
    console.log(techcardsFolders);
    for (const techcardsFolder of techcardsFolders) {
      if (techcardsFolder.id === folderID) {
        setStatisticsTitle(techcardsFolder.folder);
        const date = new Date(techcardsFolder.created_date);
        setStatisticsCreatedDate(date);
      }
    }
  };
  const displayListStatisticsModalHandler = (listID) => {
    setDataToStatistics(listID, "LIST");
    for (const techcardsListArr of techcardsLists) {
      for (const techcardsList of techcardsListArr) {
        if (techcardsList.id === listID) {
          setStatisticsTitle(techcardsList.list);
          const date = new Date(techcardsList.created_date);
          setStatisticsCreatedDate(date);
        }
      }
    }
  };
  const hideStatisticsModal = () => {
    setStatisticsModalIsVisible(false);
  };
  console.log("cjuj", statisticsStatuses);

  const props = {
    deleteFormIsSelected,
    changeFormIsSelected,
    addFormIsSelected,
    techcardsFolders,
    techcardsLists,
    techcardsAllSides,
    userMessage,
    techcardsChangeIcon,
    changeTechcardsIsVisible,
    setUserMessage,
    setAddFormIsSelected,
    setDeleteFormIsSelected,
    setChangeFormIsSelected,
    changeTechcardsconHandler,
    clearFormStates,
    fetchTechcards,
    displayFolderStatisticsModal: displayFolderStatisticsModalHandler,
    displayListStatisticsModal: displayListStatisticsModalHandler,
  };
  return (
    <div className={classNames(cx("techcards"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket}>
            {<UserTechcardsContent {...props} />}
          </UserMobileCard>
        ) : (
          <UserTechcardsContent {...props} />
        )}
        {statisticsModalIsVisible
          ? ReactDOM.createPortal(
              <StatisticsModal
                type={folderOrListStats}
                id={statisticsID}
                statuses={statisticsStatuses}
                hideStatisticsModal={hideStatisticsModal}
                statisticsModalIsVisible={statisticsModalIsVisible}
                created_date={statisticsCreatedDate}
                title={statisticsTitle}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
      </div>
    </div>
  );
}

export default UserTechcards;
