import "../../../assets/Global.scss";

import classes from "./UserTechcardsList.module.scss";
import classNames from "classnames/bind";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import MediaQueries from "../../../HelperComponents/MediaQueries";
import UserMobileCard from "../UserMainPage/UserMobileCard/UserMobileCard";
import UserTechcardsListContent from "./UserTechcardsListContent/UserTechcardsListContent";
import LearningModal from "../LearningModal/LearningModal";
import axios from "axios";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
function UserTechcards() {
  const { minWidth1000 } = MediaQueries();
  const URL = process.env.REACT_APP_URL;

  const { folder, list, id } = useParams();
  const [folderID, setFolderID] = useState();
  const [listImage, setlistImage] = useState("");
  const [techcardsIDS, setTechcardsIDS] = useState();
  const [firstSides, setFirstSides] = useState();
  const [secondSides, setSecondSides] = useState();
  const [techcardsImages, setTechcardsImages] = useState();
  const [firstSidesFlag, setFirstSidesFlag] = useState("");
  const [secondSidesFlag, setSecondSidesFlag] = useState("");

  const [isFetched, setIsFetched] = useState(false);

  const fetchTechcards = async () => {
    setIsFetched(false);
    try {
      const res = await axios.get("/techcards/lists/get", {
        params: {
          id,
          folder,
        },
      });

      if (res.data.listImage) {
        setlistImage(
          res.data.listImage.startsWith("list-image-")
            ? `${URL}/${res.data.listImage}`
            : res.data.listImage
        );
      }

      let firstSidesArr = [];
      let secondSidesArr = [];
      let idsArr = [];
      let imagesArr = [];

      for (const { id, first_side, second_side, image } of res.data
        .techcardsData) {
        firstSidesArr.push(first_side);
        secondSidesArr.push(second_side);
        idsArr.push(id);
        if (image) {
          imagesArr.push(
            image?.startsWith("techcard-image-") ? `${URL}/${image}` : image
          );
        } else imagesArr.push(null);
      }

      setTechcardsIDS(idsArr);
      setFirstSides(firstSidesArr);
      setSecondSides(secondSidesArr);
      setTechcardsImages(imagesArr);
      setFolderID(res.data.folderID);
      setFirstSidesFlag(res.data.firstSidesFlag);
      setSecondSidesFlag(res.data.secondSidesFlag);
    } catch (err) {
      console.log(err);
    }
    setIsFetched(true);
  };

  const statsAddHandler = async (isWrongAnswer, isRightAnswer, time) => {
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
      const resList = statsAddPost(id, false, true);
      const resFolder = statsAddPost(folderID, true, false);

      console.log(resList);
      console.log(resFolder);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

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

  const props = {
    fetchTechcards,
    folder,
    list,
    id,
    folderID,
    listImage,
    techcardsIDS,
    firstSides,
    secondSides,
    techcardsImages,
    displayLearningModal: displayLearningModalHandler,
    firstSidesFlag,
    secondSidesFlag,
    isFetched,
  };

  return (
    <div className={classNames(cx("techcards-list"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket} backPath="/user/techcards">
            <UserTechcardsListContent {...props} />
          </UserMobileCard>
        ) : (
          <UserTechcardsListContent {...props} />
        )}
        {learningModalIsVisible
          ? ReactDOM.createPortal(
              <LearningModal
                listImage={listImage}
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
