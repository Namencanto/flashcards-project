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
  const defaultImage =
    "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg";
  const cx = classNames.bind(classes);
  const webpageURL = process.env.REACT_APP_URL + "/";

  const { folder, list } = useParams();

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

  const [messageToUser, setMessageToUser] = useState([]);

  const [image, setImage] = useState(defaultImage);
  const [imageChangeDefaultValue, setImageChangeDefaultValue] = useState("");
  const [isImageInForm, setIsImageInForm] = useState();

  const fileInputRef = useRef();
  const fetchTechcards = async () => {
    try {
      const res = await axios.get("/techcards/lists/get", {
        params: {
          folder: folder,
          list: list,
        },
      });
      res.data.forEach(({ first_side, second_side, techcard_image }) => {
        if (first_side.length === 0) {
          return (
            setFirstSides(null), setSecondSides(null), setTechcardsImages(null)
          );
        } else {
          setFirstSides(first_side);
          setSecondSides(second_side);
          setTechcardsImages(techcard_image);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTechcards();
  }, []);

  const changeListHandler = () => {
    setImage(defaultImage);
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

    const image = e.target.file?.files[0];

    const oldFirstSide = e.target.firstSide?.attributes.oldValue.value;
    const oldSecondSide = e.target.firstSide?.attributes.oldValue.value;
    const techcardIndex = e.target.firstSide?.attributes.index.value;
    const firstSide = e.target.firstSide?.value;
    const secondSide = e.target.secondSide?.value;
    const techcardsToDelete = e.target?.techcardToDelete;

    let firstSidesArr = firstSides ? firstSides.split("/") : [];
    let secondSidesArr = secondSides ? secondSides.split("/") : [];
    let imagesPathArr = techcardsImages ? techcardsImages.split("|") : [];
    let imagePath;

    const data = new FormData();

    data.append("file", image);
    try {
      if (isImageInForm) {
        const resImage = await axios.post("/techcards/lists/upload", data);
        imagePath = resImage.data;
      }

      let firstSidesToUpdate;
      let secondSidesToUpdate;
      let imagesToUpdate = [];
      let imagesToRemove = [];

      if (formType === "ADD") {
        firstSidesArr.push(firstSide);
        secondSidesArr.push(secondSide);
        if (!imagePath) imagesPathArr.push("");
        else imagesPathArr.push(imagePath);

        firstSidesToUpdate = firstSidesArr;
        secondSidesToUpdate = secondSidesArr;
        imagesToUpdate = imagesPathArr;
      }

      if (formType === "CHANGE") {
        firstSidesArr[techcardIndex] = firstSide;
        firstSidesToUpdate = firstSidesArr;

        secondSidesArr[techcardIndex] = secondSide;
        secondSidesToUpdate = secondSidesArr;

        if (isImageInForm) {
          imagesToRemove.push(imagesPathArr[techcardIndex]);
          imagesPathArr[techcardIndex] = imagePath;
        }
        if (isImageInForm === false) {
          imagesToRemove.push(imagesPathArr[techcardIndex]);
          imagesPathArr[techcardIndex] = "";
        }
        imagesToUpdate = imagesPathArr;
      }
      if (formType === "DELETE") {
        if (techcardsToDelete.length === undefined) {
          imagesToRemove.push(imagesPathArr[0]);
          firstSidesArr[techcardsToDelete.value] = "";
          secondSidesArr[techcardsToDelete.value] = "";
          imagesPathArr[techcardsToDelete.value] = "toDelete";
        } else {
          for (const techcardToDelete of techcardsToDelete) {
            if (techcardToDelete.checked === true) {
              imagesToRemove.push(imagesPathArr[techcardToDelete.value]);
              firstSidesArr[techcardToDelete.value] = "";
              secondSidesArr[techcardToDelete.value] = "";
              imagesPathArr[techcardToDelete.value] = "toDelete";
            }
          }
        }

        if (firstSidesArr[0] === "" && secondSidesArr[0] === "") {
          firstSidesToUpdate = "";
          secondSidesToUpdate = "";
          imagesToUpdate = "";
        } else {
          firstSidesToUpdate = firstSidesArr.filter((tCard) => tCard !== "");
          secondSidesToUpdate = secondSidesArr.filter((tCard) => tCard !== "");
          imagesToUpdate = imagesPathArr.filter(
            (tCard) => tCard !== "toDelete"
          );
        }
      }

      const resData = await axios.post("/techcards/lists/upload", {
        list,
        folder,
        imagesToUpdate,
        firstSidesToUpdate,
        secondSidesToUpdate,
        imagesToRemove,
        formType,
      });
      fetchTechcards();

      if (resData.status === 200) {
        setTechcardsImages(imagePath);
        fetchTechcards();
        setImage(defaultImage);
        setFormIsVisible(false);
      }
      console.log(resData);
    } catch (err) {
      console.log(err);
    }
  };

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
            <div
              style={{ border: firstSides === null ? "none" : "" }}
              className={classNames(cx("techcards-list-main-header"))}
            >
              {firstSides === null ? (
                <p style={{ marginTop: "1rem" }} className="message-to-user">
                  It's looks like you don't have any techcards, click gear on
                  top, to add some
                </p>
              ) : (
                <>
                  <div>
                    <b>First side </b>
                    <ReactCountryFlag svg countryCode={"US"} />
                  </div>
                  <div>
                    <b>Second side </b>
                    <ReactCountryFlag svg countryCode={"PL"} />
                  </div>
                </>
              )}
            </div>
            <form onSubmit={formListHandler}>
              <ul>
                {firstSides?.split("/").map((side, i) => {
                  if (!renderAll && i > 15) return;
                  return (
                    <li key={i}>
                      <div>
                        <p>{side}</p>
                        <p>{secondSides.split("/")[i]}</p>
                        {techcardsImages?.split("|")[i] !== "" ? (
                          <figure>
                            <img
                              src={
                                techcardsImages?.split("|")[i] !== ""
                                  ? webpageURL + techcardsImages?.split("|")[i]
                                  : ""
                              }
                              alt="techcard illustration"
                            />
                          </figure>
                        ) : (
                          ""
                        )}
                      </div>

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
                              if (techcardsImages.split("|")[i] !== "") {
                                setImage(
                                  webpageURL + techcardsImages.split("|")[i]
                                );
                              } else {
                                setImage(defaultImage);
                              }
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
                        <input
                          type="checkbox"
                          id="techcardToDelete"
                          value={i}
                        />
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
                      onClick={() => {
                        setFormType("DELETE");
                      }}
                      disabled={!firstSides ? true : false}
                      className={classNames(cx("techcards-list-btn-form"))}
                    >
                      {firstSides === null
                        ? "You don't have any techcards which you can delete"
                        : "Delete selected"}
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
                      setIsImageInForm(true);
                    }}
                    type="file"
                    id="file"
                    defaultValue={imageChangeDefaultValue}
                  />

                  <figure>
                    <img src={image} alt="techcard illustration" />
                    <figcaption>
                      <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                    </figcaption>
                  </figure>
                  <button
                    onClick={() => {
                      setImage(defaultImage);
                      setIsImageInForm(false);
                    }}
                    type="button"
                  >
                    Delete illustration
                  </button>
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
              {formListIcon == faTrashCan ? (
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
          ) : firstSides !== null ? (
            <button className="btn-solid-small">Start</button>
          ) : (
            ""
          )
        ) : (
          ""
        )}
        <p
          className="message-to-user"
          style={{
            color:
              messageToUser[0] === "SUCCESS"
                ? "green"
                : messageToUser[0] === "ERROR"
                ? "red"
                : "",
          }}
        >
          {messageToUser[1]}
        </p>
      </main>
    </div>
  );
}

export default UserTechcardsListContent;
