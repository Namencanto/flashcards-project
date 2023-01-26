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
import { countStatus } from "../../../HelperComponents/countStatus";

import { countFutureRepetitions } from "./CountFutureRepetitions";
import { isArray } from "highcharts";

import LearningModal from "../LearningModal/LearningModal";
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
  const [statisticsIds, setStatisticsIds] = useState([]);
  const [statisticsCreatedDate, setStatisticsCreatedDate] = useState("");
  const [statisticsTitle, setStatisticsTitle] = useState("");
  const [folderOrListStats, setFolderOrListStats] = useState("");

  const [learningModalIsVisible, setLearningModalIsVisible] = useState(false);
  const [techcardsInfo, setTechcardsInfo] = useState(false);

  const [repetitions, setRepetitions] = useState({});

  const [isFetched, setIsFetched] = useState(false);

  const hideLearningModal = () => {
    setLearningModalIsVisible(false);
  };

  const displayLearningModalHandler = (techcardsInfoFromList) => {
    setLearningModalIsVisible(true);
    setTechcardsInfo(techcardsInfoFromList);
  };

  const fetchTechcards = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get("/techcards/get");

      if (res.data.length > 0) {
        setTechcardsFolders(res.data[0]);
        setTechcardsLists(res.data[1]);
        setTechcardsAllSides(res.data[2]);

        const resRepetitionData = await axios.get("/repetitions/");
        const repetitionsData = resRepetitionData.data[0].repetitionsData;

        const statuses = repetitionsData.map((object) => object.status);

        const whenTheDataCanBeChangedArr = repetitionsData.map(
          (object) => object.when_the_status_can_be_changed
        );
        const nextRepetitionDate = repetitionsData.map(
          (object) => object.next_repetition_date
        );
        const ids = repetitionsData.map((object) => object.id);

        setRepetitions(
          countFutureRepetitions({
            ids,
            statuses,
            whenTheDataCanBeChangedArr,
            nextRepetitionDate,
            learningDifficult: resRepetitionData.data[0].learningDifficult,
          })
        );
      } else {
        setTechcardsFolders([]);
        setTechcardsLists([]);
        setTechcardsAllSides([]);
      }
    } catch (err) {
      console.log(err);
    }
    setIsFetched(true);
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
    let idArr = [];
    for (const allSides of techcardsAllSides) {
      // isArray for the one list case
      for (const side of isArray(allSides) ? allSides : [allSides]) {
        if (side.list_uid === id && type === "LIST") {
          statusesArr.push(side.status);
          idArr.push(side.id);
        }
        if (side.folder_uid === id && type === "FOLDER") {
          statusesArr.push(side.status);
          idArr.push(side.id);
        }
      }
    }
    setStatisticsIds(idArr);
    if (statusesArr.length > 0) {
      setStatisticsStatuses(countStatus(statusesArr));
    } else setStatisticsStatuses(countStatus([]));
    setStatisticsID(id);
    setFolderOrListStats(type);
    setStatisticsModalIsVisible(true);
  };

  const displayFolderStatisticsModalHandler = (folderID) => {
    console.log("displayFolderStatisticsModal");
    setDataToStatistics(folderID, "FOLDER");

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

  const statsAddHandler = async (
    isWrongAnswer,
    isRightAnswer,
    time,
    currentTechcardId
  ) => {
    let listId = null;
    let folderId = null;
    for (let i = 0; i < techcardsAllSides.length; i++) {
      for (let j = 0; j < techcardsAllSides[i].length; j++) {
        if (currentTechcardId === techcardsAllSides[i][j].id) {
          folderId = techcardsAllSides[i][j].folder_uid;
          listId = techcardsAllSides[i][j].list_uid;
        }
      }
    }
    const statsAddPost = async (whatId, folder, list) => {
      const res = await axios.post("/statistics/folderOrList/add", {
        id: whatId,
        folder,
        list,
        right: isRightAnswer,
        wrong: isWrongAnswer,
        time,
      });
      return res;
    };

    try {
      const resList = await statsAddPost(listId, false, true);
      const resFolder = await statsAddPost(folderId, true, false);

      console.log(resList);
      console.log(resFolder);
    } catch (err) {
      console.log(err);
    }
  };

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
    isFetched,
    repetitions,
    displayLearningModal: displayLearningModalHandler,
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
                statisticsIds={statisticsIds}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
        {learningModalIsVisible
          ? ReactDOM.createPortal(
              <LearningModal
                listImage={null}
                learningModalIsVisible={learningModalIsVisible}
                hideLearningModal={hideLearningModal}
                techcardsInfo={techcardsInfo}
                statsAdd={statsAddHandler}
              />,
              document.getElementById("overlay-root")
            )
          : ""}
      </div>
    </div>
  );
}

export default UserTechcards;
