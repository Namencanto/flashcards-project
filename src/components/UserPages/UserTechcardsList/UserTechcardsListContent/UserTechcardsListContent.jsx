import "../../../../assets/Global.scss";

import classes from ".././UserTechcardsList.module.scss";
import classNames from "classnames/bind";

import { useState, useContext } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faArrowLeft,
  faPencil,
  faTrashCan,
  faRepeat,
  faLeaf,
  faHammer,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ReactCountryFlag from "react-country-flag";
import { useRef } from "react";
import { handleFileSelect } from "./UserTechcardsListContentHelpers";
import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

import { RepetitionsContext } from "../../../../context/RepetitionsContext";
import StartButtons from "./StartButtons";

function UserTechcardsListContent({
  fetchTechcards,
  list,
  id,
  folderID,
  listImage,
  techcardsIDS,
  firstSides,
  secondSides,
  techcardsImages,
  displayLearningModal,
  firstSidesFlag,
  secondSidesFlag,
  isFetched,
  statuses,
}) {
  const defaultImage =
    "https://miro.medium.com/max/250/1*DSNfSDcOe33E2Aup1Sww2w.jpeg";

  const cx = classNames.bind(classes);

  const { filteredRepetitions } = useContext(RepetitionsContext);

  const [howManyTechcardsRender, setHowManyTechcardsRender] = useState(10);
  const howManyTechcardsLeft = firstSides?.length - howManyTechcardsRender;
  const [listChangeIcon, setChangeIcon] = useState(faGear);
  const [changeListIsVisible, setListIsVisible] = useState(false);

  const [formIsVisible, setFormIsVisible] = useState(false);
  const [formType, setFormType] = useState();
  const [formDefaultFirstSide, setFormDefaultFirstSide] = useState("");
  const [formDefaultSecondSide, setFormDefaultSecondSide] = useState("");
  const [formTechcardIndex, setFormTechcardIndex] = useState("");
  const [formTechcardID, setFormTechcardID] = useState("");

  const [formListIcon, setFormListIcon] = useState(faTrashCan);
  const [formListTypeIsDelete, setFormListTypeIsDelete] = useState(false);

  const [messageToUser, setMessageToUser] = useState({});
  const messageSuccess = (message) => {
    setMessageToUser({ type: "MESSAGE_SUCCESS", message: message });
  };
  const messageError = (message) => {
    setMessageToUser({ type: "MESSAGE_ERROR", message: message });
  };

  const imageInLinkRef = useRef();
  const [image, setImage] = useState(defaultImage);
  const [imageFormTypeIsFile, setImageFormTypeIsFile] = useState(true);
  const [isImageInForm, setIsImageInForm] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);

  const changeListHandler = () => {
    setFormListTypeIsDelete(false);
    setFormListIcon(faTrashCan);
    setMessageToUser({});

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

  /////////////////////////////////////////////////////////////////

  // * SUBMIT FORM HANDLER
  const changeListElementHandler = () => {
    formIsVisible ? setFormIsVisible(false) : setFormIsVisible(true);
  };

  const formListHandler = async (e) => {
    e.preventDefault();

    // * VARIABLES FROM INPUTS
    const imageInLink = imageInLinkRef.current?.value;
    const image = e.target.file?.files[0];
    const oldFirstSide = e.target.firstSide?.attributes.oldValue.value;
    const oldSecondSide = e.target.secondSide?.attributes.oldValue.value;
    const techcardID = e.target.firstSide?.attributes.techcardID.value;
    const techcardIndex = e.target.firstSide?.attributes.index.value;
    const firstSide = e.target.firstSide?.value;
    const secondSide = e.target.secondSide?.value;
    const techcardsToDeleteInputs = e.target?.techcardToDelete;

    let imagePath;
    if (image) {
      const data = new FormData();
      data.append("file", image);
      try {
        if (isImageInForm) {
          if (formType === "LIST_IMAGE") {
            const resImage = await axios.post(
              "/techcards/lists/upload/to-list",
              data
            );
            imagePath = resImage.data;
          } else {
            const resImage = await axios.post("/techcards/lists/upload", data);
            imagePath = resImage.data;
          }
        }
      } catch (err) {
        // * IMAGE UPLOAD ERROR MESSAGES
        const filetypes = /jpeg|jpg|png|gif/;
        if (filetypes.test(image.name.toLowerCase()) === false)
          return messageError(
            "The file can only be a (.jpeg, .jpg, .png, .gif)"
          );
        else if (image.size > 25000000)
          return messageError("The file can be a maximum of 25MB");
        else return messageError("Something went wrong in file upload...");
      }
    }

    // * VARIABLES TO SERVER
    let techcardsToAdd;
    let techcardsToDelete;
    let techcardsToUpdate;

    // * INPUTS VALIDATION
    if (formType === "ADD" || formType === "CHANGE") {
      if (firstSide.length === 0 || secondSide.length === 0)
        return messageError("Sides fields cannot be empty");
      if (firstSide.length > 255 || secondSide.length > 255)
        return messageError("Maximum side length is 255");
    }

    // * FORM TYPE IS ADD LOGIC
    if (formType === "ADD") {
      techcardsToAdd = {
        firstSide,
        secondSide,
        image: imagePath ? imagePath : imageInLink ? imageInLink : false,
      };
    }

    // * FORM TYPE IS CHANGE LOGIC
    if (formType === "CHANGE") {
      if (
        firstSide === oldFirstSide &&
        secondSide === oldSecondSide &&
        !deleteImage &&
        !imagePath
      )
        return messageError("Change something before you update");

      techcardsToUpdate = {
        firstSide,
        secondSide,
        image: imagePath ? imagePath : imageInLink ? imageInLink : false,
        deleteImage,
        oldImage: techcardsImages[techcardIndex],
        techcardID,
      };
    }

    // * FORM TYPE IS CHANGE DELETE
    if (formType === "DELETE") {
      const techcardToDeleteToIterable = techcardsToDeleteInputs.length
        ? techcardsToDeleteInputs
        : [techcardsToDeleteInputs];
      let images = [];
      let techcardsIDS = [];

      for (const techcardToDeleteInput of techcardToDeleteToIterable) {
        if (techcardToDeleteInput.checked === true) {
          images.push(
            techcardsImages[techcardToDeleteInput.attributes.index.value]
          );
          techcardsIDS.push(techcardToDeleteInput.value);
        }

        techcardsToDelete = {
          techcardsIDS,
          images,
        };
      }
    }

    if (formType === "LIST_IMAGE") {
      if (!imageInLink && !imagePath && !deleteImage)
        return messageError("Change something before you update");
    }

    try {
      if (formType === "LIST_IMAGE") {
        const resData = await axios.post(
          "/techcards/lists/upload/to-list/save-in-user",
          {
            image: !imagePath ? imageInLink : imagePath,
            id,
            oldImage: listImage,
            deleteType: !imagePath && !imageInLink && listImage ? true : false,
            setType: imageInLink || imagePath ? true : false,
          }
        );
        fetchTechcards();
        setDeleteImage(false);
        setMessageToUser({});

        if (resData.status === 200) {
          setFormIsVisible(false);
        }
      } else {
        const resData = await axios.post("/techcards/lists/upload", {
          folderID,
          id,
          techcardsToAdd,
          techcardsToUpdate,
          techcardsToDelete,
        });
        fetchTechcards();
        setDeleteImage(false);
        setMessageToUser({});

        if (resData.status === 200) {
          setFormIsVisible(false);
        }
      }
    } catch (err) {
      // * TECHCARDS ERROR MESSAGES
      console.log(err);
      return messageError("Something went wrong...");
    }
  };

  return (
    <div className={classNames(cx("techcards-list-container"))}>
      {isFetched ? (
        <>
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
              {!changeListIsVisible && listImage ? (
                <img
                  style={{ marginLeft: "auto", cursor: "default" }}
                  className={classNames(cx("techcards-list-title-icon-img"))}
                  src={listImage}
                  alt="list illustration"
                />
              ) : (
                ""
              )}

              {changeListIsVisible && !formIsVisible ? (
                <div className={classNames(cx("techcards-list-title-icons"))}>
                  <FontAwesomeIcon
                    className={classNames(cx("techcards-list-title-icon-form"))}
                    icon={formListIcon}
                    onClick={() => {
                      return formListIcon === faTrashCan
                        ? (setFormListIcon(faPencil),
                          setFormListTypeIsDelete(true))
                        : (setFormListIcon(faTrashCan),
                          setFormListTypeIsDelete(false));
                    }}
                  />
                  <div
                    style={{ width: "auto", height: "auto" }}
                    className={classNames(cx("techcards-list-main-form-image"))}
                  >
                    <label>
                      <figure style={{ width: "auto", height: "auto" }}>
                        <img
                          className={classNames(
                            cx("techcards-list-title-icon-img")
                          )}
                          src={listImage ? listImage : defaultImage}
                          alt="list illustration"
                        />

                        <figcaption
                          onClick={() => {
                            setFormType("LIST_IMAGE");
                            setImageFormTypeIsFile(true);
                            setImage(listImage ? listImage : defaultImage);
                            changeListElementHandler();
                          }}
                          style={{
                            margin: "-2rem 0rem 0 1.2rem",
                            height: "7.3rem",
                            width: "7.5rem",
                          }}
                        >
                          <p style={{ color: "white" }}>
                            Click to change image
                          </p>
                        </figcaption>
                      </figure>
                    </label>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <main className={classNames(cx("techcards-list-main"))}>
            {!formIsVisible ? (
              <>
                <div
                  style={{ border: firstSides?.length === 0 ? "none" : "" }}
                  className={classNames(cx("techcards-list-main-header"))}
                >
                  {firstSides?.length === 0 ? (
                    <p
                      style={{ marginTop: "1rem" }}
                      className="message-to-user"
                    >
                      It looks like you don't have any techcards, click
                      {!changeListIsVisible
                        ? " gear on the top, "
                        : ' "Add new...", '}
                      to add some
                    </p>
                  ) : (
                    <>
                      <div>
                        <b>First side </b>
                        <ReactCountryFlag svg countryCode={firstSidesFlag} />
                      </div>
                      <div>
                        <b>Second side </b>
                        <ReactCountryFlag svg countryCode={secondSidesFlag} />
                      </div>
                    </>
                  )}
                </div>
                <form onSubmit={formListHandler}>
                  <ul>
                    {firstSides?.map((side, i) => {
                      if (i > howManyTechcardsRender) return;
                      return (
                        <li key={i}>
                          <div>
                            <p>{side}</p>
                            <p>{secondSides[i]}</p>
                            {techcardsImages?.[i] ? (
                              <figure>
                                <img
                                  src={techcardsImages?.[i]}
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
                                  setFormDefaultSecondSide(secondSides[i]);
                                  setFormTechcardIndex(i);
                                  setFormTechcardID(techcardsIDS[i]);
                                  setImageFormTypeIsFile(true);
                                  if (techcardsImages[i]) {
                                    setImage(techcardsImages[i]);
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
                              value={techcardsIDS[i]}
                              index={i}
                            />
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {firstSides?.length > 10 &&
                  howManyTechcardsRender !== firstSides?.length ? (
                    <div
                      className={classNames(cx("techcards-list-main-render"))}
                    >
                      <p>{howManyTechcardsLeft} cards left in this list</p>
                      <button
                        type="button"
                        onClick={() => {
                          setHowManyTechcardsRender(firstSides?.length);
                        }}
                      >
                        Render all
                      </button>
                      {howManyTechcardsLeft > 10 ? (
                        <button
                          type="button"
                          onClick={() => {
                            setHowManyTechcardsRender(
                              howManyTechcardsRender + 10
                            );
                          }}
                        >
                          Render next 10
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
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
                  className={classNames(
                    cx("techcards-list-main-form-container")
                  )}
                >
                  <div
                    className={classNames(cx("techcards-list-main-form-image"))}
                  >
                    <label>
                      {imageFormTypeIsFile ? (
                        <input
                          onChange={(e) => {
                            handleFileSelect(e, setImage);
                            setIsImageInForm(true);
                          }}
                          type="file"
                          id="file"
                        />
                      ) : (
                        ""
                      )}

                      <figure>
                        <img
                          style={{
                            cursor: imageFormTypeIsFile ? "pointer" : "default",
                          }}
                          src={image}
                          alt="techcard illustration"
                        />
                        {imageFormTypeIsFile ? (
                          <figcaption>
                            <img src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png" />
                          </figcaption>
                        ) : (
                          ""
                        )}
                      </figure>
                    </label>
                    {image !== defaultImage ? (
                      <button
                        style={{ color: "darkred" }}
                        onClick={() => {
                          setImage(defaultImage);
                          setIsImageInForm(false);
                          setDeleteImage(true);
                        }}
                        type="button"
                      >
                        Delete illustration
                      </button>
                    ) : (
                      <button
                        style={{ color: "#333" }}
                        onClick={() => {
                          imageFormTypeIsFile
                            ? setImageFormTypeIsFile(false)
                            : setImageFormTypeIsFile(true);
                        }}
                        type="button"
                      >
                        {imageFormTypeIsFile
                          ? "I want to add image by link"
                          : "I want to add image by file"}
                      </button>
                    )}
                    {!imageFormTypeIsFile ? (
                      <div
                        className={classNames(
                          cx("techcards-list-main-form-image-link-input")
                        )}
                      >
                        <input
                          ref={imageInLinkRef}
                          placeholder="Enter image url"
                          type="text"
                          id="imageInLink"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImage(imageInLinkRef.current.value);
                          }}
                        >
                          Check
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {formType !== "LIST_IMAGE" ? (
                    <>
                      <div
                        className={classNames(
                          cx("techcards-list-main-form-element")
                        )}
                      >
                        <label htmlFor="firstSide">First side</label>
                        <input
                          defaultValue={formDefaultFirstSide}
                          oldValue={formDefaultFirstSide}
                          techcardID={formTechcardID}
                          index={formTechcardIndex}
                          type="text"
                          id="firstSide"
                        />
                      </div>
                      <div
                        className={classNames(
                          cx("techcards-list-main-form-element")
                        )}
                      >
                        <label htmlFor="secondSide">Second side</label>
                        <input
                          defaultValue={formDefaultSecondSide}
                          oldValue={formDefaultSecondSide}
                          type="text"
                          id="secondSide"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div
                  className={classNames(
                    cx("techcards-list-main-form-submit-btn")
                  )}
                >
                  <button className="btn-solid-large">Submit</button>
                </div>
              </form>
            )}
            {!formIsVisible ? (
              changeListIsVisible ? (
                <>
                  {formListIcon == faTrashCan ? (
                    <div
                      style={{ flexDirection: "column" }}
                      className={classNames(
                        cx("techcards-list-btn-form-container")
                      )}
                    >
                      <button
                        onClick={() => {
                          setFormType("ADD");
                          setFormDefaultSecondSide("");
                          setFormDefaultFirstSide("");
                          setImageFormTypeIsFile(true);
                          setImage(defaultImage);
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
              ) : firstSides !== null &&
                firstSides?.length !== 0 &&
                filteredRepetitions ? (
                <StartButtons
                  techcardsIDS={techcardsIDS}
                  firstSides={firstSides}
                  secondSides={secondSides}
                  techcardsImages={techcardsImages}
                  list={list}
                  displayLearningModal={displayLearningModal}
                  statuses={statuses}
                  filteredRepetitions={filteredRepetitions}
                />
              ) : (
                ""
              )
            ) : (
              ""
            )}

            {/* MESSAGE TO USER */}
            {formIsVisible ? (
              <p
                className="message-to-user"
                style={{
                  color:
                    messageToUser.type === "MESSAGE_SUCCESS"
                      ? "green"
                      : messageToUser.type === "MESSAGE_ERROR"
                      ? "red"
                      : "",
                }}
              >
                {messageToUser.message}
              </p>
            ) : (
              ""
            )}
          </main>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default UserTechcardsListContent;
