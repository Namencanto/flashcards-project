import "../../../assets/Global.scss";

import classes from "./UserTechcardsList.module.scss";
import classNames from "classnames/bind";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
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
  const { currentUser } = useContext(AuthContext);

  const { folder, list, id } = useParams();
  const [folderID, setFolderID] = useState();
  const [listImage, setlistImage] = useState("");
  const [techcardsIDS, setTechcardsIDS] = useState();
  const [firstSides, setFirstSides] = useState();
  const [secondSides, setSecondSides] = useState();
  const [techcardsImages, setTechcardsImages] = useState();

  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/lists/get", {
        params: {
          id,
        },
      });
      setlistImage(res.data.listImage);

      let firstSidesArr = [];
      let secondSidesArr = [];
      let idsArr = [];
      let imagesArr = [];

      for (const { id, first_side, second_side, image } of res.data
        .techcardsData) {
        firstSidesArr.push(first_side);
        secondSidesArr.push(second_side);
        imagesArr.push(image);
        idsArr.push(id);
      }
      setTechcardsIDS(idsArr);
      setFirstSides(firstSidesArr);
      setSecondSides(secondSidesArr);
      setTechcardsImages(imagesArr);
      setFolderID(res.data.folderID);
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

  return (
    <div className={classNames(cx("techcards-list"))}>
      <div className="grid-mainpage-ranking">
        {minWidth1000 ? (
          <UserMobileCard icon={faRocket} backPath="/user/techcards">
            <UserTechcardsListContent
              fetchTechcards={fetchTechcards}
              folder={folder}
              list={list}
              id={id}
              folderID={folderID}
              listImage={listImage}
              techcardsIDS={techcardsIDS}
              firstSides={firstSides}
              secondSides={secondSides}
              techcardsImages={techcardsImages}
              displayLearningModal={displayLearningModalHandler}
            />
          </UserMobileCard>
        ) : (
          <UserTechcardsListContent
            fetchTechcards={fetchTechcards}
            folder={folder}
            list={list}
            id={id}
            folderID={folderID}
            listImage={listImage}
            techcardsIDS={techcardsIDS}
            firstSides={firstSides}
            secondSides={secondSides}
            techcardsImages={techcardsImages}
            displayLearningModal={displayLearningModalHandler}
          />
        )}
        {learningModalIsVisible
          ? ReactDOM.createPortal(
              <LearningModal
                listImage={listImage}
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
