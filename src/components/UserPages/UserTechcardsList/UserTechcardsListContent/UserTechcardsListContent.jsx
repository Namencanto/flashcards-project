import "../../../../assets/Global.scss";

import classes from ".././UserTechcardsList.module.scss";
import classNames from "classnames/bind";

import { faRocket } from "@fortawesome/free-solid-svg-icons";

import { useContext, useState } from "react";

import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowLeft,
  faPencil,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useRef } from "react";
import { handleFileSelect } from "./UserTechcardsListContentHelpers";
function UserTechcardsListContent() {
  const cx = classNames.bind(classes);
  const { folder, list } = useParams();

  const [listData, setListData] = useState();

  const [firstSides, setFirstSides] = useState();
  const [secondSides, setSecondSides] = useState();
  const [techcardsImages, setTechcardsImages] = useState();

  const [renderAll, setRenderAll] = useState(false);
  const [listChangeIcon, setChangeIcon] = useState(faGear);
  const [changeListIsVisible, setListIsVisible] = useState(false);

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formType, setFormType] = useState();
  const [formDefaultFirstSide, setFormDefaultFirstSide] = useState("");
  const [formDefaultSecondSide, setFormDefaultSecondSide] = useState("");
  const [formDefaultTechcardIndex, setFormDefaultTechcardIndex] = useState("");

  const [formListIcon, setFormListIcon] = useState(faTrashCan);
  const [formListTypeIsDelete, setFormListTypeIsDelete] = useState(false);

  const [image, setImage] = useState(
    "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg"
  );

  const fileInputRef = useRef();
  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/lists/get", {
        params: {
          folder: folder,
          list: list,
        },
      });
      res.data.forEach(({ first_side, second_side }) => {
        setFirstSides(first_side);
        setSecondSides(second_side);
      });

      setListData(res.data.first_side.split("/"));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

  const changeListHandler = () => {
    if (formIsVisible) return setFormIsVisible(false);
    if (changeListIsVisible === true) {
      setChangeIcon(faGear);
      setListIsVisible(false);
    } else {
      setChangeIcon(faArrowLeft);
      setListIsVisible(true);
    }
  };

  const changeListElementHandler = () => {
    formIsVisible ? setFormIsVisible(false) : setFormIsVisible(true);
  };
  const formListHandler = async (e) => {
    e.preventDefault();

    const image = e.target.file.files[0];

    const oldFirstSide = e.target.firstSide.attributes.oldValue.value;
    const oldSecondSide = e.target.firstSide.attributes.oldValue.value;
    const techcardIndex = e.target.firstSide.attributes.index.value;
    const firstSide = e.target.firstSide.value;
    const secondSide = e.target.secondSide.value;

    const data = new FormData();
    data.append("file", fileInputRef.current.files[0]);
    try {
      let imagePath;
      if (image) {
        const resImage = await axios.post("/techcards/lists/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imagePath = resImage.data;
      }

      let firstSidesToUpdate;
      let secondSidesToUpdate;
      if (firstSide.includes("/") || secondSide.includes("/")) {
        return;
      }
      if (firstSides === null && formType === "ADD") {
        firstSidesToUpdate = firstSide;
        secondSidesToUpdate = secondSide;
      }
      if (firstSides !== null && formType === "ADD") {
        firstSidesToUpdate = firstSides + "/" + firstSide;
        secondSidesToUpdate = secondSides + "/" + secondSide;
      }

      if (formType === "CHANGE") {
        let firstSidesArr = firstSides.split("/");
        firstSidesArr[techcardIndex] = firstSide;
        firstSidesToUpdate = firstSidesArr.join("/");

        let secondSidesArr = secondSides.split("/");
        secondSidesArr[techcardIndex] = secondSide;
        secondSidesToUpdate = secondSidesArr.join("/");
      }
      //TODO: delete logic
      const resData = await axios.post("/techcards/lists/upload", {
        list,
        folder,
        imagePath,
        firstSidesToUpdate,
        secondSidesToUpdate,
      });
      fetchTechcards();

      if (resData.status === 200) {
        setTechcardsImages(imagePath);
        fetchTechcards();
        setFormIsVisible(false);
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

  // const deleteTechcardsHandler = (e) => {
  //   e.preventDefault();
  //   const techcardsToDelete = e.target.techcardToDelete.value;

  //   for (techcardToDelete of techcardsToDelete) {
  //   }
  //   console.log(e.target.techcardToDelete);
  // };

  return (
    <div className={classNames(cx("techcards-list-container"))}>
      <div className={classNames(cx("techcards-list-title"))}>
        <FontAwesomeIcon
          className={classNames(cx("techcards-list-title-icon"))}
          onClick={() => {
            changeListHandler();
            setFormListTypeIsDelete(false);
          }}
          icon={listChangeIcon}
        />
        {/* <p>{folder}</p> */}
        <div style={{ display: "flex" }}>
          <h1>{list}</h1>
          {console.log(formIsVisible)}
          {changeListIsVisible ? (
            <FontAwesomeIcon
              className={classNames(cx("techcards-list-title-icon-form"))}
              icon={formListIcon}
              onClick={() => {
                return formListIcon === faTrashCan
                  ? (setFormListIcon(faPencil), setFormListTypeIsDelete(true))
                  : (setFormListIcon(faTrashCan),
                    setFormListTypeIsDelete(false));
              }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <main className={classNames(cx("techcards-list-main"))}>
        {!formIsVisible ? (
          <>
            <div className={classNames(cx("techcards-list-main-header"))}>
              <div>
                First side <ReactCountryFlag svg countryCode={"US"} />
              </div>
              <div>
                Second side <ReactCountryFlag svg countryCode={"PL"} />
              </div>
            </div>
            <form onSubmit={formListHandler}>
              <ul>
                {firstSides?.split("/").map((side, i) => {
                  if (!renderAll && i > 15) return;
                  return (
                    <li>
                      <div>{side}</div>
                      <div>{secondSides.split("/")[i]}</div>
                      {changeListIsVisible ? (
                        !formListTypeIsDelete ? (
                          <FontAwesomeIcon
                            onClick={() => {
                              changeListElementHandler();
                              setFormType("CHANGE");
                              setFormDefaultFirstSide(side);
                              setFormDefaultSecondSide(
                                secondSides.split("/")[i]
                              );
                              setFormDefaultTechcardIndex([i]);
                            }}
                            icon={faPencil}
                          />
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                      {formListTypeIsDelete ? (
                        <input type="checkbox" id="techcardToDelete" />
                      ) : (
                        ""
                      )}
                    </li>
                  );
                })}
              </ul>
              <>
                {changeListIsVisible && formListIcon !== faTrashCan ? (
                  <div
                    className={classNames(
                      cx("techcards-list-btn-form-container")
                    )}
                  >
                    <button
                      style={{ color: "darkred" }}
                      onClick={setFormType("ADD")}
                      className={classNames(cx("techcards-list-btn-form"))}
                    >
                      Delete selected
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </>
            </form>
          </>
        ) : (
          <form
            className={classNames(cx("techcards-list-main-form"))}
            onSubmit={formListHandler}
            encType="multipart/form-data"
          >
            <div
              className={classNames(cx("techcards-list-main-form-container"))}
            >
              <div className={classNames(cx("techcards-list-main-form-image"))}>
                <label>
                  <input
                    onChange={(e) => {
                      handleFileSelect(e, setImage);
                      // setImage(techcardsImages);
                    }}
                    type="file"
                    id="file"
                    ref={fileInputRef}
                  />
                  <figure>
                    <img src={image} alt="techcard illustration" />
                    <figcaption>
                      <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                    </figcaption>
                  </figure>
                </label>
              </div>

              <div
                className={classNames(cx("techcards-list-main-form-element"))}
              >
                <label htmlFor="firstSide">First side</label>
                <input
                  defaultValue={formDefaultFirstSide}
                  oldValue={formDefaultFirstSide}
                  index={formDefaultTechcardIndex}
                  type="text"
                  id="firstSide"
                />
              </div>
              <div
                className={classNames(cx("techcards-list-main-form-element"))}
              >
                <label htmlFor="secondSide">Second side</label>
                <input
                  defaultValue={formDefaultSecondSide}
                  oldValue={formDefaultSecondSide}
                  type="text"
                  id="secondSide"
                />
              </div>
            </div>
            <button className="btn-solid-medium">Submit</button>
          </form>
        )}

        {!formIsVisible ? (
          changeListIsVisible ? (
            <>
              {formListIcon === faTrashCan ? (
                <div
                  className={classNames(
                    cx("techcards-list-btn-form-container")
                  )}
                >
                  <button
                    onClick={() => {
                      setFormType("ADD");
                      setFormDefaultSecondSide("");
                      setFormDefaultFirstSide("");

                      changeListElementHandler();
                    }}
                    className={classNames(cx("techcards-list-btn-form"))}
                  >
                    Add new...
                  </button>
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <button className="btn-solid-small">Start</button>
          )
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default UserTechcardsListContent;
